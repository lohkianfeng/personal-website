import pool from "../../drizzle/pool";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { googleFile } from "../../drizzle/schema";

import extractOpenai from "../../extract/extractOpenai";

import { Request, Response } from "express";
import { CustomError } from "../../types/error";

const ocrExtract = async (req: Request, res: Response): Promise<any> => {
  const client = await pool.connect();
  const db = drizzle(client);

  try {
    await client.query("BEGIN");

    const { fileId } = req.params;
    const file_id = Number(fileId);

    const { model, prompt, fields } = req.body;

    const result = await db //
      .select()
      .from(googleFile)
      .where(eq(googleFile.id, file_id));
    const { content } = result[0];

    const { object, usage } = await extractOpenai(model, prompt, fields, content);

    await client.query("COMMIT");

    return res.status(200).json({ object, usage });
  } catch (error: unknown) {
    const err = error as CustomError;
    await client.query("ROLLBACK");
    console.log("ocrExtract:", err);
    const status = err.status || 500;
    return res.status(status).json({ message: "ocrExtract", error: err.message });
  } finally {
    client.release();
  }
};

export default ocrExtract;
