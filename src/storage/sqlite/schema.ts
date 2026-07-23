import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const accountsTable = sqliteTable("accounts", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  currency: text("currency").notNull(),
  openingBalance: text("opening_balance").notNull(),
  openingBalanceDate: text("opening_balance_date").notNull(),
  isActive: integer("is_active", { mode: "boolean" }).notNull(),
  importMetadataJson: text("import_metadata_json"),
});

export const categoriesTable = sqliteTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  kind: text("kind").notNull(),
  isActive: integer("is_active", { mode: "boolean" }).notNull(),
});

export const transactionsTable = sqliteTable(
  "transactions",
  {
    id: text("id").primaryKey(),
    type: text("type").notNull(),
    amount: text("amount").notNull(),
    occurredAt: text("occurred_at").notNull(),
    accountId: text("account_id").notNull(),
    destinationAccountId: text("destination_account_id"),
    categoryId: text("category_id"),
    note: text("note"),
    importMetadataJson: text("import_metadata_json"),
  },
  (table) => [
    index("transactions_occurred_at_idx").on(table.occurredAt),
    index("transactions_account_id_idx").on(table.accountId),
    index("transactions_destination_account_id_idx").on(table.destinationAccountId),
    index("transactions_category_id_idx").on(table.categoryId),
  ],
);
