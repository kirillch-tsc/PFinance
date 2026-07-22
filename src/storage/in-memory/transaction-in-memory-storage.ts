import type { TransactionId } from "../../business/transactions/transaction.ts";
import type { TransactionSelection, TransactionStorageContract } from "../contracts/transaction-storage.ts";
import type { TransactionRecord } from "../records/transaction-record.ts";
import { TransactionReferenceIndex } from "./transaction-reference-index.ts";

export class InMemoryTransactionStorage implements TransactionStorageContract {
  private readonly records = new Map<string, TransactionRecord>();
  private readonly references: TransactionReferenceIndex;

  constructor(references: TransactionReferenceIndex, records: readonly TransactionRecord[] = []) {
    this.references = references;
    for (const record of records) {
      this.records.set(record.id, copyRecord(record));
      this.references.mark(record);
    }
  }

  async getById(id: TransactionId): Promise<TransactionRecord | null> {
    const record = this.records.get(id);
    return record ? copyRecord(record) : null;
  }

  async list(selection: TransactionSelection = {}): Promise<readonly TransactionRecord[]> {
    return [...this.records.values()]
      .filter((record) => !selection.periodStart || record.occurredAt.slice(0, 10) >= selection.periodStart)
      .filter((record) => !selection.periodEnd || record.occurredAt.slice(0, 10) <= selection.periodEnd)
      .filter((record) => !selection.types?.length || selection.types.includes(record.type))
      .filter((record) => !selection.accountIds?.length || selection.accountIds.some((id) => id === record.accountId || id === record.destinationAccountId))
      .filter((record) => !selection.categoryIds?.length || selection.categoryIds.some((id) => id === record.categoryId))
      .sort((left, right) => right.occurredAt.localeCompare(left.occurredAt) || right.id.localeCompare(left.id))
      .slice(0, selection.limit)
      .map(copyRecord);
  }

  async create(record: TransactionRecord): Promise<TransactionRecord> {
    if (this.records.has(record.id)) throw new Error("Transaction identifier already exists");
    const stored = copyRecord(record);
    this.records.set(stored.id, stored);
    this.references.mark(stored);
    return copyRecord(stored);
  }

  async update(record: TransactionRecord): Promise<TransactionRecord> {
    if (!this.records.has(record.id)) throw new Error("Transaction does not exist");
    const stored = copyRecord(record);
    this.records.set(stored.id, stored);
    this.references.mark(stored);
    return copyRecord(stored);
  }

  async delete(id: TransactionId): Promise<void> {
    this.records.delete(id);
  }
}

function copyRecord(record: TransactionRecord): TransactionRecord {
  return { ...record };
}
