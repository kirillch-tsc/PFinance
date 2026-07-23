import { createCategory, type Category } from "../../business/categories/category.ts";
import type { CategoryRecord } from "../records/category-record.ts";

export function categoryToRecord(category: Category): CategoryRecord {
  return {
    id: category.id,
    name: category.name,
    kind: category.kind,
    isActive: category.isActive,
  };
}

export function categoryFromRecord(record: CategoryRecord): Category {
  return createCategory(record);
}
