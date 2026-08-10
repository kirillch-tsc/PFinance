import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { resolveDbPath } from "../src/storage/sqlite/db-path.ts";

const dbPath = resolveDbPath();
if (!fs.existsSync(dbPath)) {
  console.error(`База данных не найдена: ${dbPath}. Сначала выполните "npm run db:migrate".`);
  process.exit(1);
}

// Checkpoint the WAL into the main file so a plain file copy is a complete, consistent backup.
const sqlite = new Database(dbPath);
sqlite.pragma("wal_checkpoint(TRUNCATE)");
sqlite.close();

const backupsDir = path.join(path.dirname(dbPath), "backups");
fs.mkdirSync(backupsDir, { recursive: true });

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const backupPath = path.join(backupsDir, `${path.basename(dbPath, ".db")}-${timestamp}.db`);
fs.copyFileSync(dbPath, backupPath);

console.log(`Резервная копия создана: ${backupPath}`);
