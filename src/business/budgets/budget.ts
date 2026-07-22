import type { Category } from "../categories/category.ts";
import {
  assertMoneyMatchesCurrency,
  assertNonNegativeMoney,
  createCalendarDate,
  createCurrencyCode,
  createIdentifier,
  createMoney,
  isDateBefore,
  type CalendarDate,
  type CurrencyCode,
  type Identifier,
  type Money,
} from "../model-values.ts";
import { assertModel } from "../validation/model-validation-error.ts";

export type BudgetId = Identifier<"Budget">;

export type BudgetPeriod = Readonly<{
  start: CalendarDate;
  end: CalendarDate;
}>;

export type Budget = Readonly<{
  id: BudgetId;
  categoryId: Category["id"];
  periodStart: CalendarDate;
  periodEnd: CalendarDate;
  limit: Money;
  currency: CurrencyCode;
}>;

export type BudgetInput = Readonly<{
  id: string;
  category: Category;
  periodStart: string;
  periodEnd: string;
  limit: string;
  currency: string;
}>;

export function createBudgetPeriod(start: string, end: string): BudgetPeriod {
  const period = Object.freeze({
    start: createCalendarDate(start),
    end: createCalendarDate(end),
  });

  assertModel(!isDateBefore(period.end, period.start), "Budget period end must not be before start");
  return period;
}

export function createBudget(input: BudgetInput): Budget {
  assertModel(input.category.kind === "expense", "Budget requires an expense category");

  const period = createBudgetPeriod(input.periodStart, input.periodEnd);
  const currency = createCurrencyCode(input.currency);
  const limit = createMoney(input.limit);
  assertNonNegativeMoney(limit, "Budget limit");
  assertMoneyMatchesCurrency(limit, currency);

  return Object.freeze({
    id: createIdentifier<"Budget">(input.id),
    categoryId: input.category.id,
    periodStart: period.start,
    periodEnd: period.end,
    limit,
    currency,
  });
}

export function assertNonOverlappingBudgetPeriod(
  candidate: Budget,
  existingBudgets: readonly Budget[],
): void {
  const overlaps = existingBudgets.some(
    (budget) =>
      budget.id !== candidate.id &&
      budget.categoryId === candidate.categoryId &&
      !isDateBefore(candidate.periodEnd, budget.periodStart) &&
      !isDateBefore(budget.periodEnd, candidate.periodStart),
  );

  assertModel(!overlaps, "Budget periods for one category must not overlap");
}
