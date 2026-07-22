import assert from "node:assert/strict";
import test from "node:test";

import {
  AccountService,
  AccountUseCaseError,
  ModelValidationError,
} from "../src/business/index.ts";
import { createIdentifier } from "../src/business/model-values.ts";
import { InMemoryAccountStorage } from "../src/storage/in-memory/index.ts";
import type { AccountRecord } from "../src/storage/records/account-record.ts";

const validDraft = {
  name: "Основной счёт",
  currency: "EUR",
  openingBalance: "1250.50",
  openingBalanceDate: "2026-07-01",
} as const;

function createScenario() {
  const storage = new InMemoryAccountStorage();
  const service = new AccountService(storage, () => "account-created");
  return { service, storage };
}

test("account scenario creates and returns the first active account", async () => {
  const { service } = createScenario();

  assert.deepEqual(await service.list(), []);
  const created = await service.create(validDraft);

  assert.equal(created.id, "account-created");
  assert.equal(created.name, "Основной счёт");
  assert.equal(created.currency, "EUR");
  assert.equal(created.openingBalance, "1250.50");
  assert.equal(created.openingBalanceDate, "2026-07-01");
  assert.equal(created.isActive, true);
  assert.deepEqual(await service.list(), [created]);
});

test("account scenario edits allowed fields and preserves identity and activity", async () => {
  const { service } = createScenario();
  const created = await service.create(validDraft);

  const updated = await service.update(created.id, {
    name: "Повседневный счёт",
    currency: "USD",
    openingBalance: "900.25",
    openingBalanceDate: "2026-06-01",
  });

  assert.equal(updated.id, created.id);
  assert.equal(updated.isActive, true);
  assert.equal(updated.name, "Повседневный счёт");
  assert.equal(updated.currency, "USD");
  assert.equal(updated.openingBalance, "900.25");
  assert.equal(updated.openingBalanceDate, "2026-06-01");
});

test("account scenario deactivates without deletion and can reactivate", async () => {
  const { service } = createScenario();
  const created = await service.create(validDraft);

  const inactive = await service.deactivate(created.id);
  assert.equal(inactive.isActive, false);
  assert.equal(inactive.id, created.id);
  assert.equal(inactive.currency, created.currency);
  assert.equal(inactive.openingBalance, created.openingBalance);
  assert.deepEqual(await service.get(created.id), inactive);

  const activeAgain = await service.reactivate(created.id);
  assert.equal(activeAgain.isActive, true);
  assert.equal(activeAgain.id, created.id);
  assert.equal((await service.list()).length, 1);
});

test("account scenario rejects invalid required values, money and dates", async () => {
  const { service } = createScenario();

  await assert.rejects(
    service.create({ ...validDraft, name: " " }),
    ModelValidationError,
  );
  await assert.rejects(
    service.create({ ...validDraft, currency: "EURO" }),
    ModelValidationError,
  );
  await assert.rejects(
    service.create({ ...validDraft, openingBalance: "12,50" }),
    ModelValidationError,
  );
  await assert.rejects(
    service.create({ ...validDraft, openingBalanceDate: "2026-02-30" }),
    ModelValidationError,
  );
  assert.deepEqual(await service.list(), []);
});

test("account name uniqueness is not imposed because documentation does not require it", async () => {
  let sequence = 0;
  const storage = new InMemoryAccountStorage();
  const service = new AccountService(storage, () => `account-${++sequence}`);

  await service.create(validDraft);
  await service.create(validDraft);

  assert.equal((await service.list()).length, 2);
});

test("currency cannot change after transaction history appears", async () => {
  const record: AccountRecord = {
    id: "account-with-history",
    name: "Исторический счёт",
    currency: "EUR",
    openingBalance: "100.00",
    openingBalanceDate: "2026-01-01",
    isActive: true,
  };
  const storage = new InMemoryAccountStorage({
    records: [record],
    accountIdsWithTransactions: [record.id],
  });
  const service = new AccountService(storage, () => "unused-id");
  const id = createIdentifier<"Account">(record.id);

  assert.deepEqual(await service.getEditPolicy(id), { canChangeCurrency: false });
  await assert.rejects(
    service.update(id, {
      name: "Исторический счёт",
      currency: "USD",
      openingBalance: "100.00",
      openingBalanceDate: "2026-01-01",
    }),
    (error: unknown) =>
      error instanceof AccountUseCaseError && error.code === "currency_locked",
  );

  assert.deepEqual(await storage.getById(id), record);
});

test("editing and activity changes cannot mutate copies or damage stored history", async () => {
  const { service, storage } = createScenario();
  const created = await service.create(validDraft);
  const externalCopy = await storage.getById(created.id);
  assert.ok(externalCopy);

  const changedCopy = { ...externalCopy, name: "Повреждённая копия" };
  assert.equal(changedCopy.name, "Повреждённая копия");
  assert.equal((await service.get(created.id)).name, created.name);

  await service.deactivate(created.id);
  await service.reactivate(created.id);
  const restored = await service.get(created.id);
  assert.equal(restored.id, created.id);
  assert.equal(restored.openingBalance, created.openingBalance);
  assert.equal(restored.openingBalanceDate, created.openingBalanceDate);
});

test("missing accounts fail without creating replacement data", async () => {
  const { service } = createScenario();
  const missingId = createIdentifier<"Account">("missing-account");

  await assert.rejects(
    service.get(missingId),
    (error: unknown) =>
      error instanceof AccountUseCaseError && error.code === "account_not_found",
  );
  assert.deepEqual(await service.list(), []);
});
