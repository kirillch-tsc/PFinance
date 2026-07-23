import { createBudget, type Budget } from "../../business/budgets/budget.ts";
import type { Category } from "../../business/categories/category.ts";
import { assertModel } from "../../business/validation/model-validation-error.ts";
import type { BudgetRecord } from "../records/budget-record.ts";

export function budgetToRecord(budget: Budget): BudgetRecord {
  return {
    id: budget.id,
    categoryId: budget.categoryId,
    periodStart: budget.periodStart,
    periodEnd: budget.periodEnd,
    limit: budget.limit,
    currency: budget.currency,
  };
}

export function budgetFromRecord(record: BudgetRecord, category: Category): Budget {
  assertModel(category.id === record.categoryId, "Budget category reference does not match");

  return createBudget({
    id: record.id,
    category,
    periodStart: record.periodStart,
    periodEnd: record.periodEnd,
    limit: record.limit,
    currency: record.currency,
  });
}
