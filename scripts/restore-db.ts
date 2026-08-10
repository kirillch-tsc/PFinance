import fs from "node:fs";
import path from "node:path";
import { resolveDbPath } from "../src/storage/sqlite/db-path.ts";

const dbPath = resolveDbPath();
const backupsDir = path.join(path.dirname(dbPath), "backups");

function listBackups(): string[] {
  if (!fs.existsSync(backupsDir)) return [];
  return fs
    .readdirSync(backupsDir)
    .filter((name) => name.endsWith(".db"))
    .sort();
}

const requested = process.argv[2];
const backups = listBackups();

if (!requested) {
  console.log("Укажите файл резервной копии: npm run db:restore -- <файл|latest>");
  console.log(backups.length ? `Доступные копии в ${backupsDir}:\n  ${backups.join("\n  ")}` : `В ${backupsDir} копий не найдено.`);
  process.exit(1);
}

const chosenName = requested === "latest" ? backups.at(-1) : requested;
if (!chosenName) {
  console.error(`В ${backupsDir} нет резервных копий для восстановления.`);
  process.exit(1);
}

const sourcePath = path.isAbsolute(chosenName) ? chosenName : path.join(backupsDir, chosenName);
if (!fs.existsSync(sourcePath)) {
  console.error(`Файл резервной копии не найден: ${sourcePath}`);
  process.exit(1);
}

// Safety net: keep whatever is currently live before overwriting it.
if (fs.existsSync(dbPath)) {
  const preRestoreBackup = path.join(backupsDir, `pre-restore-${Date.now()}.db`);
  fs.mkdirSync(backupsDir, { recursive: true });
  fs.copyFileSync(dbPath, preRestoreBackup);
  console.log(`Текущая база сохранена перед восстановлением: ${preRestoreBackup}`);
}

fs.copyFileSync(sourcePath, dbPath);
for (const suffix of ["-wal", "-shm"]) {
  const stalePath = `${dbPath}${suffix}`;
  if (fs.existsSync(stalePath)) fs.rmSync(stalePath);
}

console.log(`База данных восстановлена из ${sourcePath} → ${dbPath}`);
