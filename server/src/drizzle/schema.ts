import { pgTable, serial, varchar, text, integer, boolean, unique, jsonb, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  sub: varchar("sub", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
