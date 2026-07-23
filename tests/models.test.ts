import assert from "node:assert/strict";
import test from "node:test";

import {
  assertNonOverlappingBudgetPeriod,
  assertUniqueActiveCategoryName,
  createAccount,
  createBudget,
  createCategory,
  createTransaction,
  ModelValidationError,
  type TransactionInput,
} from "../src/business/index.ts";
import {
  accountFromRecord,
  accountToRecord,
  budgetFromRecord,
  budgetToRecord,
  categoryFromRecord,
  categoryToRecord,
  transactionFromRecord,
  transactionToRecord,
} from "../src/storage/mappings/index.ts";

const primaryAccount = createAccount({
  id: "account-primary",
  name: "Основной счёт",
  currency: "EUR",
  openingBalance: "9007199254740993.01",
  openingBalanceDate: "2026-01-01",
  isActive: true,
});

const reserveAccount = createAccount({
  id: "account-reserve",
  name: "Резерв",
  currency: "EUR",
  openingBalance: "0.00",
  openingBalanceDate: "2026-01-01",
  isActive: true,
});

const incomeCategory = createCategory({
  id: "category-income",
  name: "Зарплата",
  kind: "income",
  isActive: true,
});

const expenseCategory = createCategory({
  id: "category-expense",
  name: "Продукты",
  kind: "expense",
  isActive: true,
});

test("creates Account, Category, Transaction and Budget with documented fields", () => {
  const expense = createTransaction({
    id: "transaction-expense",
    type: "expense",
    amount: "42.35",
    occurredAt: "2026-07-22T10:30:00+02:00",
    account: primaryAccount,
    category: expenseCategory,
    note: " Магазин ",
  });
  const budget = createBudget({
    id: "budget-food",
    category: expenseCategory,
    periodStart: "2026-07-01",
    periodEnd: "2026-07-31",
    limit: "500.00",
    currency: "EUR",
  });

  assert.deepEqual(Object.keys(primaryAccount), [
    "id",
    "name",
    "currency",
    "openingBalance",
    "openingBalanceDate",
    "isActive",
  ]);
  assert.deepEqual(Object.keys(expenseCategory), ["id", "name", "kind", "isActive"]);
  assert.deepEqual(Object.keys(expense), [
    "id",
    "amount",
    "occurredAt",
    "accountId",
    "note",
    "type",
    "categoryId",
  ]);
  assert.deepEqual(Object.keys(budget), [
    "id",
    "categoryId",
    "periodStart",
    "periodEnd",
    "limit",
    "currency",
  ]);
  assert.equal(expense.note, "Магазин");
});

test("rejects invalid identifiers, money, currency, dates and names", () => {
  assert.throws(
    () =>
      createAccount({
        id: " ",
        name: "Счёт",
        currency: "EUR",
        openingBalance: "0.00",
        openingBalanceDate: "2026-01-01",
        isActive: true,
      }),
    ModelValidationError,
  );
  assert.throws(
    () =>
      createAccount({
        id: "account",
        name: " ",
        currency: "EUR",
        openingBalance: "0.00",
        openingBalanceDate: "2026-01-01",
        isActive: true,
      }),
    ModelValidationError,
  );
  assert.throws(
    () =>
      createAccount({
        id: "account",
        name: "Счёт",
        currency: "EURO",
        openingBalance: "0.00",
        openingBalanceDate: "2026-01-01",
        isActive: true,
      }),
    ModelValidationError,
  );
  assert.throws(
    () =>
      createAccount({
        id: "account",
        name: "Счёт",
        currency: "EUR",
        openingBalance: "01.00",
        openingBalanceDate: "2026-01-01",
        isActive: true,
      }),
    ModelValidationError,
  );
  assert.throws(
    () =>
      createAccount({
        id: "account",
        name: "Счёт",
        currency: "EUR",
        openingBalance: "0.001",
        openingBalanceDate: "2026-01-01",
        isActive: true,
      }),
    ModelValidationError,
  );
  assert.throws(
    () =>
      createAccount({
        id: "account",
        name: "Счёт",
        currency: "EUR",
        openingBalance: "0.00",
        openingBalanceDate: "2026-02-30",
        isActive: true,
      }),
    ModelValidationError,
  );
});

test("requires matching categories for income and expense", () => {
  assert.throws(
    () =>
      createTransaction({
        id: "invalid-income",
        type: "income",
        amount: "100.00",
        occurredAt: "2026-07-22T10:30:00Z",
        account: primaryAccount,
        category: expenseCategory,
      }),
    /matching category/,
  );

  const income = createTransaction({
    id: "valid-income",
    type: "income",
    amount: "100.00",
    occurredAt: "2026-07-22T10:30:00Z",
    account: primaryAccount,
    category: incomeCategory,
  });

  assert.equal(income.type, "income");
  assert.equal(income.categoryId, incomeCategory.id);
  assert.equal("destinationAccountId" in income, false);
});

test("requires positive transaction amount and valid account dates", () => {
  assert.throws(
    () =>
      createTransaction({
        id: "zero-expense",
        type: "expense",
        amount: "0.00",
        occurredAt: "2026-07-22T10:30:00Z",
        account: primaryAccount,
        category: expenseCategory,
      }),
    /greater than zero/,
  );
  assert.throws(
    () =>
      createTransaction({
        id: "early-expense",
        type: "expense",
        amount: "1.00",
        occurredAt: "2025-12-31T23:00:00Z",
        account: primaryAccount,
        category: expenseCategory,
      }),
    /opening balance date/,
  );
});

test("requires transfer accounts to be different and use one currency", () => {
  assert.throws(
    () =>
      createTransaction({
        id: "same-account-transfer",
        type: "transfer",
        amount: "10.00",
        occurredAt: "2026-07-22T10:30:00Z",
        account: primaryAccount,
        destinationAccount: primaryAccount,
      }),
    /must be different/,
  );

  const otherCurrencyAccount = createAccount({
    id: "account-other-currency",
    name: "Другой счёт",
    currency: "USD",
    openingBalance: "0.00",
    openingBalanceDate: "2026-01-01",
    isActive: true,
  });

  assert.throws(
    () =>
      createTransaction({
        id: "cross-currency-transfer",
        type: "transfer",
        amount: "10.00",
        occurredAt: "2026-07-22T10:30:00Z",
        account: primaryAccount,
        destinationAccount: otherCurrencyAccount,
      }),
    /same currency/,
  );

  const transfer = createTransaction({
    id: "valid-transfer",
    type: "transfer",
    amount: "10.00",
    occurredAt: "2026-07-22T10:30:00Z",
    account: primaryAccount,
    destinationAccount: reserveAccount,
  });

  assert.equal(transfer.type, "transfer");
  assert.equal("categoryId" in transfer, false);
  assert.equal(transfer.destinationAccountId, reserveAccount.id);
});

test("rejects a category on a stored transfer", () => {
  const transfer = createTransaction({
    id: "transfer-with-reference-check",
    type: "transfer",
    amount: "10.00",
    occurredAt: "2026-07-22T10:30:00Z",
    account: primaryAccount,
    destinationAccount: reserveAccount,
  });
  const record = transactionToRecord(transfer);

  assert.throws(
    () =>
      transactionFromRecord(record, {
        account: primaryAccount,
        destinationAccount: reserveAccount,
        category: expenseCategory,
      }),
    /must not have a category/,
  );
});

test("requires expense category, valid period and non-negative budget limit", () => {
  assert.throws(
    () =>
      createBudget({
        id: "income-budget",
        category: incomeCategory,
        periodStart: "2026-07-01",
        periodEnd: "2026-07-31",
        limit: "100.00",
        currency: "EUR",
      }),
    /expense category/,
  );
  assert.throws(
    () =>
      createBudget({
        id: "backwards-budget",
        category: expenseCategory,
        periodStart: "2026-07-31",
        periodEnd: "2026-07-01",
        limit: "100.00",
        currency: "EUR",
      }),
    /must not be before start/,
  );
  assert.throws(
    () =>
      createBudget({
        id: "negative-budget",
        category: expenseCategory,
        periodStart: "2026-07-01",
        periodEnd: "2026-07-31",
        limit: "-1.00",
        currency: "EUR",
      }),
    /zero or greater/,
  );
});

test("rejects duplicate active categories and overlapping category budgets", () => {
  const duplicateCategory = createCategory({
    id: "duplicate-category",
    name: "продукты",
    kind: "expense",
    isActive: true,
  });
  assert.throws(
    () => assertUniqueActiveCategoryName(duplicateCategory, [expenseCategory]),
    /must be unique/,
  );

  const july = createBudget({
    id: "budget-july",
    category: expenseCategory,
    periodStart: "2026-07-01",
    periodEnd: "2026-07-31",
    limit: "500.00",
    currency: "EUR",
  });
  const overlapping = createBudget({
    id: "budget-overlap",
    category: expenseCategory,
    periodStart: "2026-07-31",
    periodEnd: "2026-08-31",
    limit: "500.00",
    currency: "EUR",
  });
  assert.throws(() => assertNonOverlappingBudgetPeriod(overlapping, [july]), /must not overlap/);
});

test("round trips every model without losing money, currency, dates, types or links", () => {
  const expense = createTransaction({
    id: "round-trip-expense",
    type: "expense",
    amount: "9007199254740993.01",
    occurredAt: "2026-07-22T10:30:45.123+02:00",
    account: primaryAccount,
    category: expenseCategory,
    note: "Точная сумма",
  });
  const transfer = createTransaction({
    id: "round-trip-transfer",
    type: "transfer",
    amount: "1234567890123456.78",
    occurredAt: "2026-07-23T11:45:00+02:00",
    account: primaryAccount,
    destinationAccount: reserveAccount,
  });
  const budget = createBudget({
    id: "round-trip-budget",
    category: expenseCategory,
    periodStart: "2026-07-01",
    periodEnd: "2026-07-31",
    limit: "9999999999999999.99",
    currency: "EUR",
  });

  assert.deepEqual(accountFromRecord(accountToRecord(primaryAccount)), primaryAccount);
  assert.deepEqual(categoryFromRecord(categoryToRecord(expenseCategory)), expenseCategory);
  assert.deepEqual(
    transactionFromRecord(transactionToRecord(expense), {
      account: primaryAccount,
      category: expenseCategory,
    }),
    expense,
  );
  assert.deepEqual(
    transactionFromRecord(transactionToRecord(transfer), {
      account: primaryAccount,
      destinationAccount: reserveAccount,
    }),
    transfer,
  );
  assert.deepEqual(budgetFromRecord(budgetToRecord(budget), expenseCategory), budget);
});

test("stored records contain no computed financial indicators", () => {
  const expense = createTransaction({
    id: "record-fields-expense",
    type: "expense",
    amount: "25.00",
    occurredAt: "2026-07-22T10:30:00Z",
    account: primaryAccount,
    category: expenseCategory,
  });
  const budget = createBudget({
    id: "record-fields-budget",
    category: expenseCategory,
    periodStart: "2026-07-01",
    periodEnd: "2026-07-31",
    limit: "500.00",
    currency: "EUR",
  });
  const records = [
    accountToRecord(primaryAccount),
    categoryToRecord(expenseCategory),
    transactionToRecord(expense),
    budgetToRecord(budget),
  ];
  const forbiddenFields = [
    "balance",
    "currentBalance",
    "totalBalance",
    "incomeTotal",
    "expenseTotal",
    "cashFlow",
    "spent",
    "remaining",
    "overspent",
    "progress",
  ];

  for (const record of records) {
    for (const field of forbiddenFields) {
      assert.equal(field in record, false, `${field} must not be stored`);
    }
  }
});

test("runtime validation rejects a transfer-shaped input with a category", () => {
  const invalidInput = {
    id: "invalid-transfer-category",
    type: "transfer",
    amount: "10.00",
    occurredAt: "2026-07-22T10:30:00Z",
    account: primaryAccount,
    destinationAccount: reserveAccount,
    category: expenseCategory,
  } as unknown as TransactionInput;

  assert.throws(() => createTransaction(invalidInput), /must not have a category/);
});
