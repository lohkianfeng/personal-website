import { pgTable, varchar, text, timestamp, index, vector } from "drizzle-orm/pg-core";
import { nanoid } from "../lib/utils";

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
