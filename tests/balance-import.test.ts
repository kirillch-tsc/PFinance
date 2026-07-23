import assert from "node:assert/strict";
import test from "node:test";

import { createAccount } from "../src/business/accounts/account.ts";
import { calculateAccountBalance } from "../src/business/calculations/finance-calculations.ts";
import { categoryFromRecord } from "../src/storage/mappings/category-mapping.ts";
import { transactionFromRecord } from "../src/storage/mappings/transaction-mapping.ts";
import {
  BALANCE_IMPORT_ACCOUNT,
  BALANCE_IMPORT_CATEGORIES,
  BALANCE_IMPORT_SUMMARY,
  BALANCE_IMPORT_TRANSACTIONS,
} from "../src/storage/imports/balance-import.ts";

test("imports the approved Balance.xlsx rows without losing source metadata", () => {
  assert.equal(BALANCE_IMPORT_SUMMARY.sourceRows, 212);
  assert.equal(BALANCE_IMPORT_TRANSACTIONS.length, 214);
  assert.equal(BALANCE_IMPORT_TRANSACTIONS.filter((item) => item.type === "income").length, 88);
  assert.equal(BALANCE_IMPORT_TRANSACTIONS.filter((item) => item.type === "expense").length, 126);

  const grouped = new Map<string, typeof BALANCE_IMPORT_TRANSACTIONS>();
  for (const record of BALANCE_IMPORT_TRANSACTIONS) {
    const group = record.importMetadata?.importGroupId;
    if (group) grouped.set(group, [...(grouped.get(group) ?? []), record]);
  }
  assert.equal(grouped.size, 2);
  for (const records of grouped.values()) {
    assert.equal(records.length, 2);
    assert.deepEqual(new Set(records.map((item) => item.type)), new Set(["income", "expense"]));
    assert.equal(records[0]?.occurredAt, records[1]?.occurredAt);
    assert.equal(records[0]?.importMetadata?.sourceRowId, records[1]?.importMetadata?.sourceRowId);
  }
});

test("reconciles the imported account to 548032 RUB", () => {
  const account = createAccount(BALANCE_IMPORT_ACCOUNT);
  const categories = new Map(BALANCE_IMPORT_CATEGORIES.map((record) => [record.id, categoryFromRecord(record)]));
  const views = BALANCE_IMPORT_TRANSACTIONS.map((record) => ({
    transaction: transactionFromRecord(record, {
      account,
      category: record.categoryId ? categories.get(record.categoryId) : undefined,
    }),
    account,
    ...(record.categoryId ? { category: categories.get(record.categoryId) } : {}),
  }));
  assert.equal(calculateAccountBalance(account, views), 54_803_200n);
});
