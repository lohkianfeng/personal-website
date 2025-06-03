import config from "@/config";
import { Pool } from "pg";

const pool = new Pool({
  host: config.db.pghost,
  port: config.db.pgport,
  user: config.db.pguser,
  password: config.db.pgpassword,
  database: config.db.pgdatabase,
});

export default pool;
