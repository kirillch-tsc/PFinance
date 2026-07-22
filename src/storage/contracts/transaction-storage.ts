import type { AccountId } from "../../business/accounts/account.ts";
import type { CategoryId } from "../../business/categories/category.ts";
import type {
  CalendarDate,
  CurrencyCode,
  TransactionType,
} from "../../business/model-values.ts";
import type { TransactionId } from "../../business/transactions/transaction.ts";
import type { TransactionRecord } from "../records/transaction-record.ts";

export type TransactionSelection = Readonly<{
  periodStart?: CalendarDate;
  periodEnd?: CalendarDate;
  types?: readonly TransactionType[];
  accountIds?: readonly AccountId[];
  categoryIds?: readonly CategoryId[];
  currency?: CurrencyCode;
  search?: string;
  limit?: number;
}>;

export interface TransactionStorageContract {
  getById(id: TransactionId): Promise<TransactionRecord | null>;
  list(selection?: TransactionSelection): Promise<readonly TransactionRecord[]>;
  create(record: TransactionRecord): Promise<TransactionRecord>;
  update(record: TransactionRecord): Promise<TransactionRecord>;
  delete(id: TransactionId): Promise<void>;
}
