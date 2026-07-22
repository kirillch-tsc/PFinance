import { createAccount, type Account } from "../../business/accounts/account.ts";
import type { AccountRecord } from "../records/account-record.ts";

export function accountToRecord(account: Account): AccountRecord {
  return {
    id: account.id,
    name: account.name,
    currency: account.currency,
    openingBalance: account.openingBalance,
    openingBalanceDate: account.openingBalanceDate,
    isActive: account.isActive,
  };
}

export function accountFromRecord(record: AccountRecord): Account {
  return createAccount(record);
}
