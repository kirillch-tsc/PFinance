import type { CategoryId } from "../../business/categories/category.ts";
import type {
  CategorySelection,
  CategoryStorageContract,
} from "../contracts/category-storage.ts";
import type { CategoryRecord } from "../records/category-record.ts";
import type { TransactionReferenceIndex } from "./transaction-reference-index.ts";

export type InMemoryCategoryStorageOptions = Readonly<{
  records?: readonly CategoryRecord[];
  categoryIdsWithTransactions?: readonly string[];
  transactionReferences?: TransactionReferenceIndex;
}>;

export class InMemoryCategoryStorage implements CategoryStorageContract {
  private readonly records = new Map<string, CategoryRecord>();
  private readonly categoryIdsWithTransactions = new Set<string>();
  private readonly transactionReferences?: TransactionReferenceIndex;

  constructor(options: InMemoryCategoryStorageOptions = {}) {
    this.transactionReferences = options.transactionReferences;
    for (const record of options.records ?? []) {
      this.records.set(record.id, copyRecord(record));
    }
    for (const id of options.categoryIdsWithTransactions ?? []) {
      this.categoryIdsWithTransactions.add(id);
    }
  }

  async getById(id: CategoryId): Promise<CategoryRecord | null> {
    const record = this.records.get(id);
    return record ? copyRecord(record) : null;
  }

  async list(selection: CategorySelection = {}): Promise<readonly CategoryRecord[]> {
    const normalizedName = selection.name?.trim().toLocaleLowerCase("ru");
    return [...this.records.values()]
      .filter((record) => selection.kind === undefined || record.kind === selection.kind)
      .filter((record) => selection.isActive === undefined || record.isActive === selection.isActive)
      .filter(
        (record) =>
          normalizedName === undefined ||
          record.name.toLocaleLowerCase("ru") === normalizedName,
      )
      .map(copyRecord);
  }

  async hasTransactions(id: CategoryId): Promise<boolean> {
    return this.categoryIdsWithTransactions.has(id) || Boolean(this.transactionReferences?.hasCategory(id));
  }

  async create(record: CategoryRecord): Promise<CategoryRecord> {
    if (this.records.has(record.id)) {
      throw new Error("Category identifier already exists");
    }
    const stored = copyRecord(record);
    this.records.set(stored.id, stored);
    return copyRecord(stored);
  }

  async update(record: CategoryRecord): Promise<CategoryRecord> {
    if (!this.records.has(record.id)) {
      throw new Error("Category does not exist");
    }
    const stored = copyRecord(record);
    this.records.set(stored.id, stored);
    return copyRecord(stored);
  }
}

function copyRecord(record: CategoryRecord): CategoryRecord {
  return { ...record };
}
