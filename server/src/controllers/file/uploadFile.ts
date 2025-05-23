import pool from "../../drizzle/pool";
import { drizzle } from "drizzle-orm/node-postgres";
import { googleFile } from "../../drizzle/schema";
import bucket from "../../google/bucket";

import extractPdf from "../../extract/extractPdf";

import { Request, Response } from "express";
import { CustomError } from "../../types/error";

type FileT = {
  id: number;
  name: string;
  mimetype: string;
  size: number;
};

const uploadFile = async (req: Request, res: Response): Promise<any> => {
  const client = await pool.connect();
  const db = drizzle(client);

  try {
    await client.query("BEGIN");

    const { location } = req.body as { location: string };
    if (!location) throw { status: 400 }; // Bad Request

    if (!Array.isArray(req.files) || req.files.length === 0) throw { status: 400 }; // Bad Request
    const files = req.files as Express.Multer.File[];

    const uploadedFiles: FileT[] = [];

    await Promise.all(
      files.map(async (file) => {
        const destination = `${location}/${Date.now()}-${file.originalname}`;

        // https://cloud.google.com/storage/docs/uploading-objects-from-memory
        await bucket //
          .file(destination)
          .save(file.buffer, {
            metadata: { contentType: file.mimetype },
          });

        let content = "";
        if (file.mimetype === "application/pdf") {
          content = await extractPdf(file.buffer, file.originalname);
        }

        const result = await db
          .insert(googleFile)
          .values({
            name: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            location: location,
            destination: destination,
            content: content,
          })
          .returning();
        const { id, name, mimetype, size } = result[0];

        uploadedFiles.push({ id, name, mimetype, size });
      })
    );

    await client.query("COMMIT");

    return res.status(200).json(uploadedFiles);
  } catch (error: unknown) {
    const err = error as CustomError;
    await client.query("ROLLBACK");
    console.log("uploadFile:", err);
    const status = err.status || 500;
    return res.status(status).json({ message: "uploadFile", error: err.message });
  } finally {
    client.release();
  }
};

export default uploadFile;
