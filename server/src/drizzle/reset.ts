import pool from "./pool";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { reset } from "drizzle-seed";

const main = async () => {
  const client = await pool.connect();
  const db = drizzle({ client: client });

  await reset(db, schema);

  console.log("done");
};

main();
