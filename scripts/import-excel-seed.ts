import { getDb } from "../src/storage/sqlite/client.ts";
import { SqliteAccountStorage } from "../src/storage/sqlite/account-sqlite-storage.ts";
import { SqliteCategoryStorage } from "../src/storage/sqlite/category-sqlite-storage.ts";
import { SqliteTransactionStorage } from "../src/storage/sqlite/transaction-sqlite-storage.ts";
import {
  BALANCE_IMPORT_ACCOUNT,
  BALANCE_IMPORT_CATEGORIES,
  BALANCE_IMPORT_TRANSACTIONS,
} from "../src/storage/imports/balance-import.ts";

// One-time import of the historical Баланс.xlsx data (see docs/DECISIONS.md, D-008).
// Run once against a freshly migrated, empty database: npm run db:import-excel-seed
const force = process.argv.includes("--force");

const db = getDb();
const accounts = new SqliteAccountStorage(db);
const categories = new SqliteCategoryStorage(db);
const transactions = new SqliteTransactionStorage(db);

const existingAccounts = await accounts.list();
if (existingAccounts.length > 0 && !force) {
  console.error(
    "В базе уже есть счета — импорт Баланс.xlsx пропущен, чтобы не создать дубликаты.\n" +
      "Если это осознанно (например, чистый тестовый прогон), повторите команду с флагом --force.",
  );
  process.exit(1);
}

await accounts.create(BALANCE_IMPORT_ACCOUNT);
for (const category of BALANCE_IMPORT_CATEGORIES) {
  await categories.create(category);
}
for (const transaction of BALANCE_IMPORT_TRANSACTIONS) {
  await transactions.create(transaction);
}

console.log(
  `Импортировано: 1 счёт, ${BALANCE_IMPORT_CATEGORIES.length} категорий, ${BALANCE_IMPORT_TRANSACTIONS.length} операций из Баланс.xlsx.`,
);
