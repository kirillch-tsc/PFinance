import type { TransactionId } from "../../business/transactions/transaction.ts";
import type {
  TransactionSelection,
  TransactionStorageContract,
} from "../contracts/transaction-storage.ts";
import type { TransactionRecord } from "../records/transaction-record.ts";
import { requestJson, requestOptionalJson, selectionQuery } from "./http.ts";

export class RemoteTransactionStorage implements TransactionStorageContract {
  async getById(id: TransactionId): Promise<TransactionRecord | null> {
    return requestOptionalJson<TransactionRecord>(`/api/transactions/${encodeURIComponent(id)}`);
  }

  async list(selection: TransactionSelection = {}): Promise<readonly TransactionRecord[]> {
    return requestJson<readonly TransactionRecord[]>(`/api/transactions${selectionQuery(selection)}`);
  }

  async create(record: TransactionRecord): Promise<TransactionRecord> {
    return requestJson<TransactionRecord>("/api/transactions", {
      method: "POST",
      body: JSON.stringify(record),
    });
  }

  async update(record: TransactionRecord): Promise<TransactionRecord> {
    return requestJson<TransactionRecord>(`/api/transactions/${encodeURIComponent(record.id)}`, {
      method: "PUT",
      body: JSON.stringify(record),
    });
  }

  async delete(id: TransactionId): Promise<void> {
    await requestJson<void>(`/api/transactions/${encodeURIComponent(id)}`, { method: "DELETE" });
  }
}
