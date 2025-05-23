import pool from "../../drizzle/pool";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { googleFile } from "../../drizzle/schema";
import bucket from "../../google/bucket";

import { Request, Response } from "express";
import { CustomError } from "../../types/error";

const getSignedUrl = async (req: Request, res: Response): Promise<any> => {
  const client = await pool.connect();
  const db = drizzle(client);

  try {
    await client.query("BEGIN");

    const { fileId } = req.params;
    const file_id = Number(fileId);

    const result = await db //
      .select()
      .from(googleFile)
      .where(eq(googleFile.id, file_id));
    const { destination } = result[0];

    // https://cloud.google.com/storage/docs/samples/storage-generate-signed-url-v4
    const [url] = await bucket //
      .file(destination)
      .getSignedUrl({
        version: "v4",
        action: "read",
        expires: Date.now() + 15 * 60 * 1000, // 15 min expiration
      });

    await client.query("COMMIT");

    return res.status(200).json({ url: url });
  } catch (error: unknown) {
    const err = error as CustomError;
    await client.query("ROLLBACK");
    console.log("getSignedUrl:", err);
    const status = err.status || 500;
    return res.status(status).json({ message: "getSignedUrl", error: err.message });
  } finally {
    client.release();
  }
};

export default getSignedUrl;
