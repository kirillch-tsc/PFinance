import type { TransactionRecord } from "../records/transaction-record.ts";

export class TransactionReferenceIndex {
  private readonly accountIds = new Set<string>();
  private readonly categoryIds = new Set<string>();

  mark(record: TransactionRecord): void {
    this.accountIds.add(record.accountId);
    if (record.destinationAccountId) this.accountIds.add(record.destinationAccountId);
    if (record.categoryId) this.categoryIds.add(record.categoryId);
  }

  hasAccount(id: string): boolean {
    return this.accountIds.has(id);
  }

  hasCategory(id: string): boolean {
    return this.categoryIds.has(id);
  }
}
