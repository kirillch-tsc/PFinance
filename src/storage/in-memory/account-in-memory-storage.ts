import type { AccountId } from "../../business/accounts/account.ts";
import type {
  AccountSelection,
  AccountStorageContract,
} from "../contracts/account-storage.ts";
import type { AccountRecord } from "../records/account-record.ts";
import type { TransactionReferenceIndex } from "./transaction-reference-index.ts";

export type InMemoryAccountStorageOptions = Readonly<{
  records?: readonly AccountRecord[];
  accountIdsWithTransactions?: readonly string[];
  transactionReferences?: TransactionReferenceIndex;
}>;

export class InMemoryAccountStorage implements AccountStorageContract {
  private readonly records = new Map<string, AccountRecord>();
  private readonly accountIdsWithTransactions = new Set<string>();
  private readonly transactionReferences?: TransactionReferenceIndex;

  constructor(options: InMemoryAccountStorageOptions = {}) {
    this.transactionReferences = options.transactionReferences;
    for (const record of options.records ?? []) {
      this.records.set(record.id, copyRecord(record));
    }
    for (const id of options.accountIdsWithTransactions ?? []) {
      this.accountIdsWithTransactions.add(id);
    }
  }

  async getById(id: AccountId): Promise<AccountRecord | null> {
    const record = this.records.get(id);
    return record ? copyRecord(record) : null;
  }

  async list(selection: AccountSelection = {}): Promise<readonly AccountRecord[]> {
    return [...this.records.values()]
      .filter((record) => selection.isActive === undefined || record.isActive === selection.isActive)
      .filter((record) => selection.currency === undefined || record.currency === selection.currency)
      .map(copyRecord);
  }

  async hasTransactions(id: AccountId): Promise<boolean> {
    return this.accountIdsWithTransactions.has(id) || Boolean(this.transactionReferences?.hasAccount(id));
  }

  async create(record: AccountRecord): Promise<AccountRecord> {
    if (this.records.has(record.id)) {
      throw new Error("Account identifier already exists");
    }
    const stored = copyRecord(record);
    this.records.set(stored.id, stored);
    return copyRecord(stored);
  }

  async update(record: AccountRecord): Promise<AccountRecord> {
    if (!this.records.has(record.id)) {
      throw new Error("Account does not exist");
    }
    const stored = copyRecord(record);
    this.records.set(stored.id, stored);
    return copyRecord(stored);
  }
}

function copyRecord(record: AccountRecord): AccountRecord {
  return {
    ...record,
    ...(record.importMetadata ? { importMetadata: { ...record.importMetadata } } : {}),
  };
}
