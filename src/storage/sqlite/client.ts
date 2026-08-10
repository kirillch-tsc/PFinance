import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { drizzle, type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { resolveDbPath } from "./db-path.ts";
import * as schema from "./schema.ts";

export class StorageNotReadyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StorageNotReadyError";
  }
}

const REQUIRED_TABLES = ["accounts", "categories", "transactions"] as const;

type Db = BetterSQLite3Database<typeof schema>;

let cached: Db | null = null;

export function getDb(): Db {
  if (cached) return cached;

  const dbPath = resolveDbPath();

  if (!fs.existsSync(path.dirname(dbPath))) {
    throw new StorageNotReadyError(
      `Не найден каталог для базы данных: ${path.dirname(dbPath)}. Создайте каталог "data" в корне проекта.`,
    );
  }

  const dbFileExisted = fs.existsSync(dbPath);

  let sqlite: Database.Database;
  try {
    sqlite = new Database(dbPath);
  } catch (error) {
    throw new StorageNotReadyError(
      `Не удалось открыть базу данных по пути ${dbPath}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");

  assertMigrated(sqlite, dbPath, dbFileExisted);

  cached = drizzle(sqlite, { schema });
  return cached;
}

function assertMigrated(sqlite: Database.Database, dbPath: string, dbFileExisted: boolean): void {
  const existingTables = new Set(
    sqlite
      .prepare("SELECT name FROM sqlite_master WHERE type = 'table'")
      .all()
      .map((row) => (row as { name: string }).name),
  );

  const missingTables = REQUIRED_TABLES.filter((table) => !existingTables.has(table));
  if (missingTables.length === 0) return;

  const reason = dbFileExisted
    ? `в базе данных (${dbPath}) отсутствуют таблицы: ${missingTables.join(", ")}`
    : `база данных ещё не создана (${dbPath})`;

  throw new StorageNotReadyError(
    `Хранилище не готово: ${reason}. Примените миграции командой "npm run db:migrate" и повторите запуск.`,
  );
}

export function resetDbCacheForTests(): void {
  cached = null;
}
