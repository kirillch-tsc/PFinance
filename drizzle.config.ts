import path from "node:path";
import { defineConfig } from "drizzle-kit";

const configuredPath = process.env.PFINANCE_DB_PATH?.trim();
const dbPath =
  configuredPath && configuredPath.length > 0 ? configuredPath : "data/pfinance.db";

export default defineConfig({
  schema: "./src/storage/sqlite/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: path.isAbsolute(dbPath) ? dbPath : path.join(process.cwd(), dbPath),
  },
});
