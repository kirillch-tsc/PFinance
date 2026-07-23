import { and, eq } from "drizzle-orm";
import type { AccountId } from "../../business/accounts/account.ts";
import type {
  AccountSelection,
  AccountStorageContract,
} from "../contracts/account-storage.ts";
import type { AccountRecord } from "../records/account-record.ts";
import { accountsTable, transactionsTable } from "./schema.ts";
import type { getDb } from "./client.ts";

type Db = ReturnType<typeof getDb>;
type AccountRow = typeof accountsTable.$inferSelect;

export class SqliteAccountStorage implements AccountStorageContract {
  private readonly db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async getById(id: AccountId): Promise<AccountRecord | null> {
    const [row] = await this.db.select().from(accountsTable).where(eq(accountsTable.id, id));
    return row ? toRecord(row) : null;
  }

  async list(selection: AccountSelection = {}): Promise<readonly AccountRecord[]> {
    const conditions = [
      selection.isActive === undefined ? undefined : eq(accountsTable.isActive, selection.isActive),
      selection.currency === undefined ? undefined : eq(accountsTable.currency, selection.currency),
    ].filter((condition) => condition !== undefined);

    const rows = await this.db
      .select()
      .from(accountsTable)
      .where(conditions.length ? and(...conditions) : undefined);
    return rows.map(toRecord);
  }

  async hasTransactions(id: AccountId): Promise<boolean> {
    const [row] = await this.db
      .select({ id: transactionsTable.id })
      .from(transactionsTable)
      .where(eq(transactionsTable.accountId, id))
      .limit(1);
    if (row) return true;

    const [destinationRow] = await this.db
      .select({ id: transactionsTable.id })
      .from(transactionsTable)
      .where(eq(transactionsTable.destinationAccountId, id))
      .limit(1);
    return Boolean(destinationRow);
  }

  async create(record: AccountRecord): Promise<AccountRecord> {
    const existing = await this.getById(record.id as AccountId);
    if (existing) {
      throw new Error("Account identifier already exists");
    }
    await this.db.insert(accountsTable).values(toRow(record));
    return record;
  }

  async update(record: AccountRecord): Promise<AccountRecord> {
    const existing = await this.getById(record.id as AccountId);
    if (!existing) {
      throw new Error("Account does not exist");
    }
    await this.db.update(accountsTable).set(toRow(record)).where(eq(accountsTable.id, record.id));
    return record;
  }
}

function toRecord(row: AccountRow): AccountRecord {
  return {
    id: row.id,
    name: row.name,
    currency: row.currency,
    openingBalance: row.openingBalance,
    openingBalanceDate: row.openingBalanceDate,
    isActive: row.isActive,
    ...(row.importMetadataJson
      ? { importMetadata: JSON.parse(row.importMetadataJson) as AccountRecord["importMetadata"] }
      : {}),
  };
}

function toRow(record: AccountRecord): typeof accountsTable.$inferInsert {
  return {
    id: record.id,
    name: record.name,
    currency: record.currency,
    openingBalance: record.openingBalance,
    openingBalanceDate: record.openingBalanceDate,
    isActive: record.isActive,
    importMetadataJson: record.importMetadata ? JSON.stringify(record.importMetadata) : null,
  };
}
