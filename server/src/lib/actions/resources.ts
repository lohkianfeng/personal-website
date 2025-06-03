import pool from "@/drizzle/pool";
import { drizzle } from "drizzle-orm/node-postgres";
import { NewResourceParams, insertResourceSchema, resources } from "@/drizzle/schema";

import { generateEmbeddings } from "@/lib/ai/embedding";
import { embeddings as embeddingsTable } from "@/drizzle/schema";

import { Request, Response } from "express";
import { CustomError } from "@/types/error";

const createResource = async (input: NewResourceParams) => {
  const client = await pool.connect();
  const db = drizzle({ client: client });

  try {
    await client.query("BEGIN");

    const { content } = insertResourceSchema.parse(input);

    const [resource] = await db //
      .insert(resources)
      .values({ content })
      .returning();

    const embeddings = await generateEmbeddings(content);
    await db //
      .insert(embeddingsTable)
      .values(
        embeddings.map((embedding) => ({
          resourceId: resource.id,
          ...embedding,
        }))
      );

    await client.query("COMMIT");

    return "Resource successfully created.";
  } catch (error: unknown) {
    const err = error as CustomError;
    await client.query("ROLLBACK");
    console.log("createResource:", err);
    if (err instanceof Error)
      return err.message.length > 0 //
        ? err.message
        : "Error, please try again.";
  } finally {
    client.release();
  }
};

export default createResource;
