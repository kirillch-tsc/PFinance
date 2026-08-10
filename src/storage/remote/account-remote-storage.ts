import type { AccountId } from "../../business/accounts/account.ts";
import type {
  AccountSelection,
  AccountStorageContract,
} from "../contracts/account-storage.ts";
import type { AccountRecord } from "../records/account-record.ts";
import { requestJson, requestOptionalJson, selectionQuery } from "./http.ts";

export class RemoteAccountStorage implements AccountStorageContract {
  async getById(id: AccountId): Promise<AccountRecord | null> {
    return requestOptionalJson<AccountRecord>(`/api/accounts/${encodeURIComponent(id)}`);
  }

  async list(selection: AccountSelection = {}): Promise<readonly AccountRecord[]> {
    return requestJson<readonly AccountRecord[]>(`/api/accounts${selectionQuery(selection)}`);
  }

  async hasTransactions(id: AccountId): Promise<boolean> {
    const result = await requestJson<{ hasTransactions: boolean }>(
      `/api/accounts/${encodeURIComponent(id)}/has-transactions`,
    );
    return result.hasTransactions;
  }

  async create(record: AccountRecord): Promise<AccountRecord> {
    return requestJson<AccountRecord>("/api/accounts", {
      method: "POST",
      body: JSON.stringify(record),
    });
  }

  async update(record: AccountRecord): Promise<AccountRecord> {
    return requestJson<AccountRecord>(`/api/accounts/${encodeURIComponent(record.id)}`, {
      method: "PUT",
      body: JSON.stringify(record),
    });
  }
}
