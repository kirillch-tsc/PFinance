import type { BudgetId } from "../../business/budgets/budget.ts";
import type { CategoryId } from "../../business/categories/category.ts";
import type { CalendarDate, CurrencyCode } from "../../business/model-values.ts";
import type { BudgetRecord } from "../records/budget-record.ts";

export type BudgetSelection = Readonly<{
  categoryIds?: readonly CategoryId[];
  currency?: CurrencyCode;
  periodStart?: CalendarDate;
  periodEnd?: CalendarDate;
}>;

export interface BudgetStorageContract {
  getById(id: BudgetId): Promise<BudgetRecord | null>;
  list(selection?: BudgetSelection): Promise<readonly BudgetRecord[]>;
  create(record: BudgetRecord): Promise<BudgetRecord>;
  update(record: BudgetRecord): Promise<BudgetRecord>;
}
