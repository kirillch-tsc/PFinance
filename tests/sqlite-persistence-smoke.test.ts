import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import Database from "better-sqlite3";
import { drizzle, type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

import { AccountService } from "../src/business/accounts/index.ts";
import { calculateAccountBalance } from "../src/business/calculations/finance-calculations.ts";
import { CategoryService } from "../src/business/categories/index.ts";
import { TransactionService } from "../src/business/transactions/index.ts";
import { SqliteAccountStorage } from "../src/storage/sqlite/account-sqlite-storage.ts";
import { SqliteCategoryStorage } from "../src/storage/sqlite/category-sqlite-storage.ts";
import { SqliteTransactionStorage } from "../src/storage/sqlite/transaction-sqlite-storage.ts";

function openDb(dbPath: string) {
  const sqlite = new Database(dbPath);
  sqlite.pragma("journal_mode = WAL");
  return { sqlite, db: drizzle(sqlite) };
}

function buildServices(db: BetterSQLite3Database) {
  const accountStorage = new SqliteAccountStorage(db);
  const categoryStorage = new SqliteCategoryStorage(db);
  const transactionStorage = new SqliteTransactionStorage(db);
  let counter = 0;
  const createId = () => `smoke-${++counter}-${Math.random().toString(36).slice(2)}`;
  return {
    accounts: new AccountService(accountStorage, createId),
    categories: new CategoryService(categoryStorage, createId),
    transactions: new TransactionService(transactionStorage, accountStorage, categoryStorage, createId),
  };
}

test("full user scenario persists through a real SQLite file and survives a restart", async (t) => {
  const dbDir = fs.mkdtempSync(path.join(os.tmpdir(), "pfinance-smoke-"));
  const dbPath = path.join(dbDir, "pfinance.db");
  t.after(() => fs.rmSync(dbDir, { recursive: true, force: true }));

  // 1. Apply migrations against a fresh file, exactly like a first-time deploy.
  const migrationConnection = openDb(dbPath);
  migrate(migrationConnection.db, { migrationsFolder: path.join(process.cwd(), "drizzle") });
  migrationConnection.sqlite.close();

  // 2. First "process": create, edit and delete data through the full Business layer.
  let session = openDb(dbPath);
  let services = buildServices(session.db);

  const account = await services.accounts.create({
    name: "Общий счёт",
    currency: "RUB",
    openingBalance: "1000",
    openingBalanceDate: "2026-01-01",
  });
  const secondAccount = await services.accounts.create({
    name: "Накопительный счёт",
    currency: "RUB",
    openingBalance: "0",
    openingBalanceDate: "2026-01-01",
  });
  const salary = await services.categories.create({ name: "Зарплата", kind: "income" });
  const groceries = await services.categories.create({ name: "Продукты", kind: "expense" });

  await services.transactions.create({
    type: "income",
    amount: "500",
    occurredAt: "2026-01-02T10:00:00.000Z",
    accountId: account.id,
    categoryId: salary.id,
  });
  const expense = await services.transactions.create({
    type: "expense",
    amount: "120",
    occurredAt: "2026-01-03T10:00:00.000Z",
    accountId: account.id,
    categoryId: groceries.id,
    note: "черновик",
  });
  const toDelete = await services.transactions.create({
    type: "expense",
    amount: "50",
    occurredAt: "2026-01-04T10:00:00.000Z",
    accountId: account.id,
    categoryId: groceries.id,
  });
  await services.transactions.create({
    type: "transfer",
    amount: "200",
    occurredAt: "2026-01-05T10:00:00.000Z",
    accountId: account.id,
    destinationAccountId: secondAccount.id,
  });

  await services.transactions.update(expense.transaction.id, {
    type: "expense",
    amount: "150",
    occurredAt: "2026-01-03T10:00:00.000Z",
    accountId: account.id,
    categoryId: groceries.id,
    note: "исправлено",
  });
  await services.transactions.delete(toDelete.transaction.id);

  const balanceBeforeRestart = calculateAccountBalance(account, await services.transactions.list());
  assert.equal(balanceBeforeRestart, 115_000n); // (1000 + 500 - 150 - 200) RUB, in cents

  session.sqlite.close();

  // 3. "Restart": open a brand-new connection to the same file and rebuild everything from scratch —
  // nothing here is shared in-process with step 2, so this only passes if data actually reached disk.
  session = openDb(dbPath);
  services = buildServices(session.db);

  const accountsAfterRestart = await services.accounts.list();
  assert.equal(accountsAfterRestart.length, 2);

  const categoriesAfterRestart = await services.categories.list();
  assert.equal(categoriesAfterRestart.length, 2);

  const transactionsAfterRestart = await services.transactions.list();
  assert.equal(transactionsAfterRestart.length, 3, "income + edited expense + transfer; the deleted expense must be gone");

  const editedExpense = transactionsAfterRestart.find(
    (view) => view.transaction.id === expense.transaction.id,
  );
  assert.equal(editedExpense?.transaction.amount, "150");
  assert.equal(editedExpense?.transaction.note, "исправлено");
  assert.equal(
    transactionsAfterRestart.some((view) => view.transaction.id === toDelete.transaction.id),
    false,
    "deleted transaction must not come back after restart",
  );

  const restartedAccount = accountsAfterRestart.find((item) => item.id === account.id);
  assert.ok(restartedAccount);
  const balanceAfterRestart = calculateAccountBalance(restartedAccount, transactionsAfterRestart);
  assert.equal(balanceAfterRestart, balanceBeforeRestart);

  const restartedSecondAccount = accountsAfterRestart.find((item) => item.id === secondAccount.id);
  assert.ok(restartedSecondAccount);
  const secondBalanceAfterRestart = calculateAccountBalance(restartedSecondAccount, transactionsAfterRestart);
  assert.equal(secondBalanceAfterRestart, 20_000n); // received the 200 RUB transfer

  session.sqlite.close();
});
