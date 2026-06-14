import * as relations from "@/server/lib/drizzle/relations";
import * as schema from "@/server/lib/drizzle/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema: { ...schema, ...relations } });
