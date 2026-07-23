import { and, eq } from "drizzle-orm";
import type { CategoryId } from "../../business/categories/category.ts";
import type {
  CategorySelection,
  CategoryStorageContract,
} from "../contracts/category-storage.ts";
import type { CategoryRecord } from "../records/category-record.ts";
import { categoriesTable, transactionsTable } from "./schema.ts";
import type { getDb } from "./client.ts";

type Db = ReturnType<typeof getDb>;
type CategoryRow = typeof categoriesTable.$inferSelect;

export class SqliteCategoryStorage implements CategoryStorageContract {
  private readonly db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async getById(id: CategoryId): Promise<CategoryRecord | null> {
    const [row] = await this.db.select().from(categoriesTable).where(eq(categoriesTable.id, id));
    return row ? toRecord(row) : null;
  }

  async list(selection: CategorySelection = {}): Promise<readonly CategoryRecord[]> {
    const conditions = [
      selection.kind === undefined ? undefined : eq(categoriesTable.kind, selection.kind),
      selection.isActive === undefined ? undefined : eq(categoriesTable.isActive, selection.isActive),
    ].filter((condition) => condition !== undefined);

    const rows = await this.db
      .select()
      .from(categoriesTable)
      .where(conditions.length ? and(...conditions) : undefined);
    const records = rows.map(toRecord);

    const normalizedName = selection.name?.trim().toLocaleLowerCase("ru");
    if (normalizedName === undefined) return records;
    return records.filter((record) => record.name.toLocaleLowerCase("ru") === normalizedName);
  }

  async hasTransactions(id: CategoryId): Promise<boolean> {
    const [row] = await this.db
      .select({ id: transactionsTable.id })
      .from(transactionsTable)
      .where(eq(transactionsTable.categoryId, id))
      .limit(1);
    return Boolean(row);
  }

  async create(record: CategoryRecord): Promise<CategoryRecord> {
    const existing = await this.getById(record.id as CategoryId);
    if (existing) {
      throw new Error("Category identifier already exists");
    }
    await this.db.insert(categoriesTable).values(toRow(record));
    return record;
  }

  async update(record: CategoryRecord): Promise<CategoryRecord> {
    const existing = await this.getById(record.id as CategoryId);
    if (!existing) {
      throw new Error("Category does not exist");
    }
    await this.db.update(categoriesTable).set(toRow(record)).where(eq(categoriesTable.id, record.id));
    return record;
  }
}

function toRecord(row: CategoryRow): CategoryRecord {
  return {
    id: row.id,
    name: row.name,
    kind: row.kind as CategoryRecord["kind"],
    isActive: row.isActive,
  };
}

function toRow(record: CategoryRecord): typeof categoriesTable.$inferInsert {
  return {
    id: record.id,
    name: record.name,
    kind: record.kind,
    isActive: record.isActive,
  };
}
