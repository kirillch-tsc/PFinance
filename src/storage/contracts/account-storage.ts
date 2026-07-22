import type { AccountId } from "../../business/accounts/account.ts";
import type { CurrencyCode } from "../../business/model-values.ts";
import type { AccountRecord } from "../records/account-record.ts";

export type AccountSelection = Readonly<{
  isActive?: boolean;
  currency?: CurrencyCode;
}>;

export interface AccountStorageContract {
  getById(id: AccountId): Promise<AccountRecord | null>;
  list(selection?: AccountSelection): Promise<readonly AccountRecord[]>;
  hasTransactions(id: AccountId): Promise<boolean>;
  create(record: AccountRecord): Promise<AccountRecord>;
  update(record: AccountRecord): Promise<AccountRecord>;
}
