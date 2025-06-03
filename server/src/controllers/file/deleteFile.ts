import pool from "@/drizzle/pool";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { googleFile } from "@/drizzle/schema";

import { Request, Response } from "express";
import { CustomError } from "@/types/error";

const deleteFile = async (req: Request, res: Response): Promise<any> => {
  const client = await pool.connect();
  const db = drizzle(client);

  try {
    await client.query("BEGIN");

    const { fileId } = req.params;
    const file_id = Number(fileId);

    await db //
      .delete(googleFile)
      .where(eq(googleFile.id, file_id));

    await client.query("COMMIT");

    return res.status(200).json();
  } catch (error: unknown) {
    const err = error as CustomError;
    await client.query("ROLLBACK");
    console.log("deleteFile:", err);
    const status = err.status || 500;
    return res.status(status).json({ message: "deleteFile", error: err.message });
  } finally {
    client.release();
  }
};

export default deleteFile;
