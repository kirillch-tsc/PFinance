import assert from "node:assert/strict";
import test from "node:test";

import { AccountService, CategoryService, ModelValidationError, TransactionService, TransactionUseCaseError } from "../src/business/index.ts";
import { InMemoryAccountStorage, InMemoryCategoryStorage, InMemoryTransactionStorage, TransactionReferenceIndex } from "../src/storage/in-memory/index.ts";

async function scenario() {
  const references = new TransactionReferenceIndex();
  const accountStorage = new InMemoryAccountStorage({ transactionReferences: references });
  const categoryStorage = new InMemoryCategoryStorage({ transactionReferences: references });
  const transactionStorage = new InMemoryTransactionStorage(references);
  let accountSequence = 0; let categorySequence = 0; let transactionSequence = 0;
  const accounts = new AccountService(accountStorage, () => `account-${++accountSequence}`);
  const categories = new CategoryService(categoryStorage, () => `category-${++categorySequence}`);
  const transactions = new TransactionService(transactionStorage, accountStorage, categoryStorage, () => `transaction-${++transactionSequence}`);
  const euro = await accounts.create({ name: "Основной", currency: "EUR", openingBalance: "0.00", openingBalanceDate: "2026-01-01" });
  const savings = await accounts.create({ name: "Накопления", currency: "EUR", openingBalance: "0.00", openingBalanceDate: "2026-02-01" });
  const dollars = await accounts.create({ name: "Доллары", currency: "USD", openingBalance: "0.00", openingBalanceDate: "2026-01-01" });
  const salary = await categories.create({ name: "Зарплата", kind: "income" });
  const food = await categories.create({ name: "Продукты", kind: "expense" });
  const transport = await categories.create({ name: "Транспорт", kind: "expense" });
  return { references, accountStorage, categoryStorage, transactionStorage, accounts, categories, transactions, euro, savings, dollars, salary, food, transport };
}

const at = "2026-07-20T12:30:00.000Z";

test("creates income, expense and transfer with exact relationships", async () => {
  const s = await scenario();
  const income = await s.transactions.create({ type: "income", amount: "1200.50", occurredAt: at, accountId: s.euro.id, categoryId: s.salary.id, note: "Июль" });
  const expense = await s.transactions.create({ type: "expense", amount: "45.20", occurredAt: "2026-07-21T10:00:00.000Z", accountId: s.euro.id, categoryId: s.food.id });
  const transfer = await s.transactions.create({ type: "transfer", amount: "300.00", occurredAt: "2026-07-22T09:00:00.000Z", accountId: s.euro.id, destinationAccountId: s.savings.id });
  assert.equal(income.transaction.type, "income"); assert.equal(income.category?.id, s.salary.id);
  assert.equal(expense.transaction.type, "expense"); assert.equal(expense.category?.id, s.food.id);
  assert.equal(transfer.transaction.type, "transfer"); assert.equal(transfer.destinationAccount?.id, s.savings.id); assert.equal("categoryId" in transfer.transaction, false);
  assert.deepEqual((await s.transactions.list()).map((item) => item.transaction.id), [transfer.transaction.id, expense.transaction.id, income.transaction.id]);
});

test("rejects invalid amounts, dates, category kinds and transfer relationships without partial writes", async () => {
  const s = await scenario();
  const invalid = [
    s.transactions.create({ type: "expense", amount: "0", occurredAt: at, accountId: s.euro.id, categoryId: s.food.id }),
    s.transactions.create({ type: "expense", amount: "-1", occurredAt: at, accountId: s.euro.id, categoryId: s.food.id }),
    s.transactions.create({ type: "expense", amount: "1.001", occurredAt: at, accountId: s.euro.id, categoryId: s.food.id }),
    s.transactions.create({ type: "expense", amount: "1", occurredAt: "2025-12-31T10:00:00.000Z", accountId: s.euro.id, categoryId: s.food.id }),
    s.transactions.create({ type: "income", amount: "1", occurredAt: at, accountId: s.euro.id, categoryId: s.food.id }),
    s.transactions.create({ type: "transfer", amount: "1", occurredAt: at, accountId: s.euro.id, destinationAccountId: s.euro.id }),
    s.transactions.create({ type: "transfer", amount: "1", occurredAt: at, accountId: s.euro.id, destinationAccountId: s.dollars.id }),
    s.transactions.create({ type: "transfer", amount: "1", occurredAt: "2026-01-15T10:00:00.000Z", accountId: s.euro.id, destinationAccountId: s.savings.id }),
  ];
  for (const attempt of invalid) await assert.rejects(attempt, ModelValidationError);
  assert.equal((await s.transactions.list()).length, 0);
});

test("inactive references are forbidden for new operations", async () => {
  const s = await scenario(); await s.accounts.deactivate(s.euro.id);
  await assert.rejects(s.transactions.create({ type: "expense", amount: "1", occurredAt: at, accountId: s.euro.id, categoryId: s.food.id }), (error: unknown) => error instanceof TransactionUseCaseError && error.code === "inactive_account");
  await s.accounts.reactivate(s.euro.id); await s.categories.deactivate(s.food.id);
  await assert.rejects(s.transactions.create({ type: "expense", amount: "1", occurredAt: at, accountId: s.euro.id, categoryId: s.food.id }), (error: unknown) => error instanceof TransactionUseCaseError && error.code === "inactive_category");
  await s.accounts.deactivate(s.savings.id);
  await assert.rejects(s.transactions.create({ type: "transfer", amount: "1", occurredAt: at, accountId: s.euro.id, destinationAccountId: s.savings.id }), (error: unknown) => error instanceof TransactionUseCaseError && error.code === "inactive_destination");
  assert.equal((await s.transactions.list()).length, 0);
});

test("edits one record without duplication and failed edits preserve the original", async () => {
  const s = await scenario(); const created = await s.transactions.create({ type: "expense", amount: "10.00", occurredAt: at, accountId: s.euro.id, categoryId: s.food.id });
  const updated = await s.transactions.update(created.transaction.id, { type: "income", amount: "25.00", occurredAt: at, accountId: s.euro.id, categoryId: s.salary.id, note: "Исправлено" });
  assert.equal(updated.transaction.id, created.transaction.id); assert.equal(updated.transaction.type, "income"); assert.equal((await s.transactions.list()).length, 1);
  await assert.rejects(s.transactions.update(created.transaction.id, { type: "transfer", amount: "25.00", occurredAt: at, accountId: s.euro.id, destinationAccountId: s.dollars.id }), ModelValidationError);
  assert.equal((await s.transactions.get(created.transaction.id)).transaction.type, "income"); assert.equal((await s.transactions.list()).length, 1);
});

test("deletes completely and repeated deletion does not mutate other records", async () => {
  const s = await scenario(); const first = await s.transactions.create({ type: "income", amount: "10", occurredAt: at, accountId: s.euro.id, categoryId: s.salary.id }); const second = await s.transactions.create({ type: "expense", amount: "2", occurredAt: at, accountId: s.euro.id, categoryId: s.food.id });
  await s.transactions.delete(first.transaction.id); assert.deepEqual((await s.transactions.list()).map((item) => item.transaction.id), [second.transaction.id]);
  await assert.rejects(s.transactions.delete(first.transaction.id), (error: unknown) => error instanceof TransactionUseCaseError && error.code === "transaction_not_found");
  assert.equal((await s.transactions.list()).length, 1);
});

test("search covers note, category and both account names", async () => {
  const s = await scenario(); await s.transactions.create({ type: "expense", amount: "5", occurredAt: at, accountId: s.euro.id, categoryId: s.food.id, note: "Ужин с друзьями" }); await s.transactions.create({ type: "transfer", amount: "10", occurredAt: at, accountId: s.euro.id, destinationAccountId: s.savings.id });
  assert.equal((await s.transactions.list({ search: "друзья" })).length, 1); assert.equal((await s.transactions.list({ search: "продукты" })).length, 1); assert.equal((await s.transactions.list({ search: "основной" })).length, 2); assert.equal((await s.transactions.list({ search: "накопления" })).length, 1);
});

test("each filter and their combination selects only matching operations", async () => {
  const s = await scenario(); await s.transactions.create({ type: "income", amount: "100", occurredAt: "2026-06-01T10:00:00.000Z", accountId: s.euro.id, categoryId: s.salary.id, note: "Премия" }); await s.transactions.create({ type: "expense", amount: "10", occurredAt: "2026-07-10T10:00:00.000Z", accountId: s.euro.id, categoryId: s.food.id, note: "Магазин" }); await s.transactions.create({ type: "expense", amount: "20", occurredAt: "2026-07-20T10:00:00.000Z", accountId: s.dollars.id, categoryId: s.transport.id, note: "Такси" });
  assert.equal((await s.transactions.list({ periodStart: "2026-07-01", periodEnd: "2026-07-31" })).length, 2);
  assert.equal((await s.transactions.list({ type: "income" })).length, 1); assert.equal((await s.transactions.list({ accountId: s.dollars.id })).length, 1); assert.equal((await s.transactions.list({ categoryId: s.food.id })).length, 1); assert.equal((await s.transactions.list({ currency: "USD" })).length, 1);
  const combined = await s.transactions.list({ periodStart: "2026-07-01", type: "expense", accountId: s.euro.id, categoryId: s.food.id, currency: "EUR", search: "магаз" }); assert.equal(combined.length, 1); assert.equal(combined[0]?.transaction.note, "Магазин");
  await assert.rejects(s.transactions.list({ periodStart: "2026-08-01", periodEnd: "2026-07-01" }), (error: unknown) => error instanceof TransactionUseCaseError && error.code === "invalid_period");
});

test("historical operations retain inactive account and category relationships", async () => {
  const s = await scenario(); const created = await s.transactions.create({ type: "expense", amount: "10", occurredAt: at, accountId: s.euro.id, categoryId: s.food.id }); await s.accounts.deactivate(s.euro.id); await s.categories.deactivate(s.food.id);
  const historical = await s.transactions.get(created.transaction.id); assert.equal(historical.account.isActive, false); assert.equal(historical.category?.isActive, false);
  const updated = await s.transactions.update(created.transaction.id, { type: "expense", amount: "11", occurredAt: at, accountId: s.euro.id, categoryId: s.food.id }); assert.equal(updated.transaction.amount, "11");
});

test("transaction history permanently locks account currency and category kind", async () => {
  const s = await scenario(); const created = await s.transactions.create({ type: "expense", amount: "10", occurredAt: at, accountId: s.euro.id, categoryId: s.food.id });
  assert.deepEqual(await s.accounts.getEditPolicy(s.euro.id), { canChangeCurrency: false }); assert.deepEqual(await s.categories.getEditPolicy(s.food.id), { canChangeKind: false });
  await s.transactions.delete(created.transaction.id);
  assert.deepEqual(await s.accounts.getEditPolicy(s.euro.id), { canChangeCurrency: false }); assert.deepEqual(await s.categories.getEditPolicy(s.food.id), { canChangeKind: false });
});
