import pool from "./pool";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const db = drizzle({
  client: pool,
  schema: {
    ...schema,
  },
});

export default db;

export type DbType = ReturnType<typeof drizzle>;
