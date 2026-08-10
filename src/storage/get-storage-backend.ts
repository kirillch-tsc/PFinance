import type {
  AccountStorageContract,
  CategoryStorageContract,
  TransactionStorageContract,
} from "./contracts/index.ts";
import { InMemoryAccountStorage, InMemoryCategoryStorage, InMemoryTransactionStorage, TransactionReferenceIndex } from "./in-memory/index.ts";
import { getDb, SqliteAccountStorage, SqliteCategoryStorage, SqliteTransactionStorage } from "./sqlite/index.ts";

export type StorageBackendName = "sqlite" | "in-memory";

export type StorageBackend = Readonly<{
  accounts: AccountStorageContract;
  categories: CategoryStorageContract;
  transactions: TransactionStorageContract;
}>;

function resolveBackendName(): StorageBackendName {
  const raw = process.env.STORAGE_BACKEND?.trim().toLowerCase();
  if (raw === undefined || raw === "" || raw === "sqlite") return "sqlite";
  if (raw === "in-memory") return "in-memory";
  throw new Error(
    `Неизвестное значение STORAGE_BACKEND: "${process.env.STORAGE_BACKEND}". Допустимые значения: "sqlite" (по умолчанию) или "in-memory".`,
  );
}

let cachedBackend: StorageBackend | null = null;

/**
 * STORAGE_BACKEND=in-memory keeps a single process-wide in-memory store
 * (unlike sqlite, it never touches the filesystem) — intended for tests and debugging only.
 */
export function getStorageBackend(): StorageBackend {
  if (cachedBackend) return cachedBackend;

  const name = resolveBackendName();
  cachedBackend =
    name === "sqlite"
      ? buildSqliteBackend()
      : buildInMemoryBackend();
  return cachedBackend;
}

function buildSqliteBackend(): StorageBackend {
  const db = getDb();
  return {
    accounts: new SqliteAccountStorage(db),
    categories: new SqliteCategoryStorage(db),
    transactions: new SqliteTransactionStorage(db),
  };
}

function buildInMemoryBackend(): StorageBackend {
  const transactionReferences = new TransactionReferenceIndex();
  return {
    accounts: new InMemoryAccountStorage({ transactionReferences }),
    categories: new InMemoryCategoryStorage({ transactionReferences }),
    transactions: new InMemoryTransactionStorage(transactionReferences),
  };
}

export function resetStorageBackendForTests(): void {
  cachedBackend = null;
}
