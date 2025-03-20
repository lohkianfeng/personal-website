import config from "./config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  dbCredentials: {
    host: config.db.pghost,
    port: config.db.pgport,
    user: config.db.pguser,
    password: config.db.pgpassword,
    database: config.db.pgdatabase,
    ssl: false,
  },
  migrations: {
    schema: "public",
  },
  strict: true,
  verbose: true,
});
