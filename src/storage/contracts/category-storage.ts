import type { CategoryId } from "../../business/categories/category.ts";
import type { CategoryKind } from "../../business/model-values.ts";
import type { CategoryRecord } from "../records/category-record.ts";

export type CategorySelection = Readonly<{
  kind?: CategoryKind;
  isActive?: boolean;
  name?: string;
}>;

export interface CategoryStorageContract {
  getById(id: CategoryId): Promise<CategoryRecord | null>;
  list(selection?: CategorySelection): Promise<readonly CategoryRecord[]>;
  hasTransactions(id: CategoryId): Promise<boolean>;
  create(record: CategoryRecord): Promise<CategoryRecord>;
  update(record: CategoryRecord): Promise<CategoryRecord>;
}
