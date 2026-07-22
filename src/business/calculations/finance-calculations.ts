import type { Account } from "../accounts/account.ts";
import type { TransactionView } from "../transactions/transaction-service.ts";

export type MoneyUnits = bigint;

export type PeriodTotals = Readonly<{
  income: MoneyUnits;
  expense: MoneyUnits;
  cashFlow: MoneyUnits;
}>;

export type ExpenseCategoryTotal = Readonly<{
  categoryId: string;
  categoryName: string;
  amount: MoneyUnits;
}>;

export type BalancePoint = Readonly<{
  date: string;
  balance: MoneyUnits;
}>;

export function moneyToUnits(value: string, fractionDigits = 2): MoneyUnits {
  const negative = value.startsWith("-");
  const unsigned = negative ? value.slice(1) : value;
  const [whole, fraction = ""] = unsigned.split(".");
  const units = BigInt(whole) * 10n ** BigInt(fractionDigits) + BigInt(fraction.padEnd(fractionDigits, "0"));
  return negative ? -units : units;
}

export function calculateAccountBalance(
  account: Account,
  transactions: readonly TransactionView[],
  throughDate?: string,
): MoneyUnits {
  let balance = moneyToUnits(account.openingBalance);
  for (const view of transactions) {
    const transaction = view.transaction;
    if (throughDate && transaction.occurredAt.slice(0, 10) > throughDate) continue;
    const amount = moneyToUnits(transaction.amount);
    if (transaction.type === "income" && transaction.accountId === account.id) balance += amount;
    if (transaction.type === "expense" && transaction.accountId === account.id) balance -= amount;
    if (transaction.type === "transfer") {
      if (transaction.accountId === account.id) balance -= amount;
      if (transaction.destinationAccountId === account.id) balance += amount;
    }
  }
  return balance;
}

export function calculatePeriodTotals(
  transactions: readonly TransactionView[],
  periodStart: string,
  periodEnd: string,
): PeriodTotals {
  let income = 0n;
  let expense = 0n;
  for (const { transaction } of transactions) {
    const date = transaction.occurredAt.slice(0, 10);
    if (date < periodStart || date > periodEnd) continue;
    const amount = moneyToUnits(transaction.amount);
    if (transaction.type === "income") income += amount;
    if (transaction.type === "expense") expense += amount;
  }
  return { income, expense, cashFlow: income - expense };
}

export function calculateExpensesByCategory(
  transactions: readonly TransactionView[],
  periodStart: string,
  periodEnd: string,
): readonly ExpenseCategoryTotal[] {
  const totals = new Map<string, ExpenseCategoryTotal>();
  for (const view of transactions) {
    const date = view.transaction.occurredAt.slice(0, 10);
    if (view.transaction.type !== "expense" || date < periodStart || date > periodEnd) continue;
    const id = view.category?.id ?? "uncategorized";
    const current = totals.get(id);
    totals.set(id, {
      categoryId: id,
      categoryName: view.category?.name ?? "Без категории",
      amount: (current?.amount ?? 0n) + moneyToUnits(view.transaction.amount),
    });
  }
  return [...totals.values()].sort((left, right) => left.amount === right.amount ? left.categoryName.localeCompare(right.categoryName, "ru") : left.amount > right.amount ? -1 : 1);
}

export function calculateBalanceSeries(
  account: Account,
  transactions: readonly TransactionView[],
  periodStart: string,
  periodEnd: string,
): readonly BalancePoint[] {
  let balance = calculateAccountBalance(account, transactions, previousDate(periodStart));
  const dailyChanges = new Map<string, bigint>();
  for (const { transaction } of transactions) {
    const date = transaction.occurredAt.slice(0, 10);
    if (date < periodStart || date > periodEnd) continue;
    const amount = moneyToUnits(transaction.amount);
    const effect = transaction.type === "income" ? amount : transaction.type === "expense" ? -amount : 0n;
    dailyChanges.set(date, (dailyChanges.get(date) ?? 0n) + effect);
  }
  const points: BalancePoint[] = [{ date: periodStart, balance }];
  for (const [date, change] of [...dailyChanges].sort(([left], [right]) => left.localeCompare(right))) {
    balance += change;
    points.push({ date, balance });
  }
  if (points.at(-1)?.date !== periodEnd) points.push({ date: periodEnd, balance });
  return points;
}

function previousDate(value: string): string {
  const date = new Date(`${value}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() - 1);
  return date.toISOString().slice(0, 10);
}
