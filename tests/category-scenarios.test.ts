import assert from "node:assert/strict";
import test from "node:test";

import {
  CategoryService,
  CategoryUseCaseError,
  ModelValidationError,
} from "../src/business/index.ts";
import { createIdentifier } from "../src/business/model-values.ts";
import { InMemoryCategoryStorage } from "../src/storage/in-memory/index.ts";
import type { CategoryRecord } from "../src/storage/records/category-record.ts";

const incomeDraft = { name: "Зарплата", kind: "income" } as const;
const expenseDraft = { name: "Продукты", kind: "expense" } as const;

function createScenario() {
  const storage = new InMemoryCategoryStorage();
  let sequence = 0;
  const service = new CategoryService(storage, () => `category-${++sequence}`);
  return { service, storage };
}

test("category scenario creates separate income and expense categories", async () => {
  const { service } = createScenario();

  const income = await service.create(incomeDraft);
  const expense = await service.create(expenseDraft);

  assert.equal(income.kind, "income");
  assert.equal(expense.kind, "expense");
  assert.equal(income.isActive, true);
  assert.equal(expense.isActive, true);
  assert.deepEqual(await service.list(), [income, expense]);
});

test("category scenario edits name and kind before history appears", async () => {
  const { service } = createScenario();
  const created = await service.create(incomeDraft);

  const updated = await service.update(created.id, {
    name: "Возврат",
    kind: "expense",
  });

  assert.equal(updated.id, created.id);
  assert.equal(updated.name, "Возврат");
  assert.equal(updated.kind, "expense");
  assert.equal(updated.isActive, true);
});

test("category scenario deactivates without deletion and reactivates", async () => {
  const { service } = createScenario();
  const created = await service.create(expenseDraft);

  const inactive = await service.deactivate(created.id);
  assert.equal(inactive.isActive, false);
  assert.equal(inactive.id, created.id);
  assert.equal(inactive.name, created.name);
  assert.equal(inactive.kind, created.kind);
  assert.deepEqual(await service.get(created.id), inactive);

  const activeAgain = await service.reactivate(created.id);
  assert.equal(activeAgain.isActive, true);
  assert.equal((await service.list()).length, 1);
});

test("active category names are unique within one kind and case-insensitive", async () => {
  const { service } = createScenario();
  await service.create(expenseDraft);

  await assert.rejects(
    service.create({ name: " продукты ", kind: "expense" }),
    /must be unique/,
  );

  const sameNameOtherKind = await service.create({ name: "Продукты", kind: "income" });
  assert.equal(sameNameOtherKind.kind, "income");
});

test("inactive duplicate can exist but cannot reactivate while active duplicate remains", async () => {
  const duplicateRecord: CategoryRecord = {
    id: "inactive-duplicate",
    name: "Продукты",
    kind: "expense",
    isActive: false,
  };
  const activeRecord: CategoryRecord = {
    id: "active-category",
    name: "Продукты",
    kind: "expense",
    isActive: true,
  };
  const storage = new InMemoryCategoryStorage({ records: [duplicateRecord, activeRecord] });
  const service = new CategoryService(storage, () => "unused-id");
  const id = createIdentifier<"Category">(duplicateRecord.id);

  await assert.rejects(service.reactivate(id), /must be unique/);
  assert.equal((await service.get(id)).isActive, false);
});

test("category kind cannot change after linked transaction history appears", async () => {
  const record: CategoryRecord = {
    id: "category-with-history",
    name: "Историческая категория",
    kind: "expense",
    isActive: true,
  };
  const storage = new InMemoryCategoryStorage({
    records: [record],
    categoryIdsWithTransactions: [record.id],
  });
  const service = new CategoryService(storage, () => "unused-id");
  const id = createIdentifier<"Category">(record.id);

  assert.deepEqual(await service.getEditPolicy(id), { canChangeKind: false });
  await assert.rejects(
    service.update(id, { name: record.name, kind: "income" }),
    (error: unknown) =>
      error instanceof CategoryUseCaseError && error.code === "kind_locked",
  );
  assert.deepEqual(await storage.getById(id), record);
});

test("category history survives editing, deactivation and external record copies", async () => {
  const { service, storage } = createScenario();
  const created = await service.create(expenseDraft);
  const externalCopy = await storage.getById(created.id);
  assert.ok(externalCopy);

  const changedCopy = { ...externalCopy, name: "Повреждённая копия" };
  assert.equal(changedCopy.name, "Повреждённая копия");
  assert.equal((await service.get(created.id)).name, created.name);

  await service.update(created.id, { name: "Еда", kind: "expense" });
  await service.deactivate(created.id);
  const stored = await service.get(created.id);
  assert.equal(stored.id, created.id);
  assert.equal(stored.kind, created.kind);
  assert.equal(stored.name, "Еда");
  assert.equal(stored.isActive, false);
});

test("category scenario rejects missing names, missing types and unknown categories", async () => {
  const { service } = createScenario();

  await assert.rejects(service.create({ name: " ", kind: "income" }), ModelValidationError);
  await assert.rejects(service.create({ name: "Категория", kind: "" }), ModelValidationError);
  await assert.rejects(service.create({ name: "Категория", kind: "other" }), ModelValidationError);
  await assert.rejects(
    service.get(createIdentifier<"Category">("missing-category")),
    (error: unknown) =>
      error instanceof CategoryUseCaseError && error.code === "category_not_found",
  );
  assert.deepEqual(await service.list(), []);
});
