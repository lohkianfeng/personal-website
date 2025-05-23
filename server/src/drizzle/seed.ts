import pool from "./pool";
import { drizzle } from "drizzle-orm/node-postgres";

const main = async () => {
  const client = await pool.connect();
  const db = drizzle({ client: client });

  try {
    await client.query("BEGIN");

    await client.query("CREATE EXTENSION IF NOT EXISTS vector CASCADE;");
    console.log("✅ pgvector extension enabled successfully.");

    await client.query("COMMIT");
    console.log("✅ Seeding completed successfully.");
    process.exit(1);
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  } finally {
    client.release();
  }
};

main();
