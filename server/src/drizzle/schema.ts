import { pgTable, serial, varchar, text, integer, timestamp, index, vector } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { nanoid } from "@/lib/utils";

export const resources = pgTable("resources", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const embeddings = pgTable(
  "embeddings",
  {
    id: varchar("id", { length: 255 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    resourceId: varchar("resource_id", { length: 255 }).references(() => resources.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    embedding: vector("embedding", { dimensions: 1536 }).notNull(),
  },
  (table) => [index("embeddingIndex").using("hnsw", table.embedding.op("vector_cosine_ops"))]
);

// Schema for resources - used to validate API requests
export const insertResourceSchema = createSelectSchema(resources).extend({}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Type for resources - used to type API request params and within Components
export type NewResourceParams = z.infer<typeof insertResourceSchema>;

export const googleFile = pgTable("google_file", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  mimetype: varchar("mimetype", { length: 255 }).notNull(),
  size: integer("size").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  destination: varchar("destination", { length: 255 }).notNull(),
  content: text("content").notNull(),
});
