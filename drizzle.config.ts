import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";

loadEnvConfig(process.cwd());

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/server/lib/drizzle/schema.ts",
  out: "./migrations",
  dbCredentials: { url: process.env.DATABASE_URL! },
});
