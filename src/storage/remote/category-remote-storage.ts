import type { CategoryId } from "../../business/categories/category.ts";
import type {
  CategorySelection,
  CategoryStorageContract,
} from "../contracts/category-storage.ts";
import type { CategoryRecord } from "../records/category-record.ts";
import { requestJson, requestOptionalJson, selectionQuery } from "./http.ts";

export class RemoteCategoryStorage implements CategoryStorageContract {
  async getById(id: CategoryId): Promise<CategoryRecord | null> {
    return requestOptionalJson<CategoryRecord>(`/api/categories/${encodeURIComponent(id)}`);
  }

  async list(selection: CategorySelection = {}): Promise<readonly CategoryRecord[]> {
    return requestJson<readonly CategoryRecord[]>(`/api/categories${selectionQuery(selection)}`);
  }

  async hasTransactions(id: CategoryId): Promise<boolean> {
    const result = await requestJson<{ hasTransactions: boolean }>(
      `/api/categories/${encodeURIComponent(id)}/has-transactions`,
    );
    return result.hasTransactions;
  }

  async create(record: CategoryRecord): Promise<CategoryRecord> {
    return requestJson<CategoryRecord>("/api/categories", {
      method: "POST",
      body: JSON.stringify(record),
    });
  }

  async update(record: CategoryRecord): Promise<CategoryRecord> {
    return requestJson<CategoryRecord>(`/api/categories/${encodeURIComponent(record.id)}`, {
      method: "PUT",
      body: JSON.stringify(record),
    });
  }
}
