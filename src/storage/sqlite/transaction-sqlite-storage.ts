import { eq } from "drizzle-orm";
import type { TransactionId } from "../../business/transactions/transaction.ts";
import type {
  TransactionSelection,
  TransactionStorageContract,
} from "../contracts/transaction-storage.ts";
import type { TransactionRecord } from "../records/transaction-record.ts";
import { transactionsTable } from "./schema.ts";
import type { getDb } from "./client.ts";

type Db = ReturnType<typeof getDb>;
type TransactionRow = typeof transactionsTable.$inferSelect;

export class SqliteTransactionStorage implements TransactionStorageContract {
  private readonly db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async getById(id: TransactionId): Promise<TransactionRecord | null> {
    const [row] = await this.db.select().from(transactionsTable).where(eq(transactionsTable.id, id));
    return row ? toRecord(row) : null;
  }

  async list(selection: TransactionSelection = {}): Promise<readonly TransactionRecord[]> {
    const rows = await this.db.select().from(transactionsTable);
    return rows
      .map(toRecord)
      .filter((record) => !selection.periodStart || record.occurredAt.slice(0, 10) >= selection.periodStart)
      .filter((record) => !selection.periodEnd || record.occurredAt.slice(0, 10) <= selection.periodEnd)
      .filter((record) => !selection.types?.length || selection.types.includes(record.type))
      .filter(
        (record) =>
          !selection.accountIds?.length ||
          selection.accountIds.some((id) => id === record.accountId || id === record.destinationAccountId),
      )
      .filter((record) => !selection.categoryIds?.length || selection.categoryIds.some((id) => id === record.categoryId))
      .sort((left, right) => right.occurredAt.localeCompare(left.occurredAt) || right.id.localeCompare(left.id))
      .slice(0, selection.limit);
  }

  async create(record: TransactionRecord): Promise<TransactionRecord> {
    const existing = await this.getById(record.id as TransactionId);
    if (existing) {
      throw new Error("Transaction identifier already exists");
    }
    await this.db.insert(transactionsTable).values(toRow(record));
    return record;
  }

  async update(record: TransactionRecord): Promise<TransactionRecord> {
    const existing = await this.getById(record.id as TransactionId);
    if (!existing) {
      throw new Error("Transaction does not exist");
    }
    await this.db.update(transactionsTable).set(toRow(record)).where(eq(transactionsTable.id, record.id));
    return record;
  }

  async delete(id: TransactionId): Promise<void> {
    await this.db.delete(transactionsTable).where(eq(transactionsTable.id, id));
  }
}

function toRecord(row: TransactionRow): TransactionRecord {
  const importMetadata = row.importMetadataJson
    ? (JSON.parse(row.importMetadataJson) as NonNullable<TransactionRecord["importMetadata"]>)
    : undefined;

  if (row.type === "transfer") {
    return {
      id: row.id,
      type: "transfer",
      amount: row.amount,
      occurredAt: row.occurredAt,
      accountId: row.accountId,
      destinationAccountId: row.destinationAccountId as string,
      categoryId: null,
      note: row.note,
      ...(importMetadata ? { importMetadata } : {}),
    };
  }

  return {
    id: row.id,
    type: row.type as "income" | "expense",
    amount: row.amount,
    occurredAt: row.occurredAt,
    accountId: row.accountId,
    destinationAccountId: null,
    categoryId: row.categoryId as string,
    note: row.note,
    ...(importMetadata ? { importMetadata } : {}),
  };
}

function toRow(record: TransactionRecord): typeof transactionsTable.$inferInsert {
  return {
    id: record.id,
    type: record.type,
    amount: record.amount,
    occurredAt: record.occurredAt,
    accountId: record.accountId,
    destinationAccountId: record.destinationAccountId,
    categoryId: record.categoryId,
    note: record.note,
    importMetadataJson: record.importMetadata ? JSON.stringify(record.importMetadata) : null,
  };
}
