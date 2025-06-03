import pool from "@/drizzle/pool";
import { drizzle } from "drizzle-orm/node-postgres";
import { asc } from "drizzle-orm";
import { googleFile } from "@/drizzle/schema";

import { Request, Response } from "express";
import { CustomError } from "@/types/error";

const getFiles = async (req: Request, res: Response): Promise<any> => {
  const client = await pool.connect();
  const db = drizzle(client);

  try {
    await client.query("BEGIN");

    const result = await db //
      .select()
      .from(googleFile)
      .orderBy(asc(googleFile.id));

    await client.query("COMMIT");

    return res.status(200).json({ files: result });
  } catch (error: unknown) {
    const err = error as CustomError;
    await client.query("ROLLBACK");
    console.log("getFiles:", err);
    const status = err.status || 500;
    return res.status(status).json({ message: "getFiles", error: err.message });
  } finally {
    client.release();
  }
};

export default getFiles;
