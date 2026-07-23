export type BudgetRecord = Readonly<{
  id: string;
  categoryId: string;
  periodStart: string;
  periodEnd: string;
  limit: string;
  currency: string;
}>;
