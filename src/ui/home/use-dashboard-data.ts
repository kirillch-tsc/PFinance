"use client";

import { useEffect, useMemo, useState } from "react";
import {
  calculateAccountBalance,
  calculateBalanceSeries,
  calculateExpensesByCategory,
  calculatePeriodTotals,
} from "@/src/business/calculations";
import type { TransactionView } from "@/src/business/transactions";
import { useAccounts } from "@/src/ui/settings/accounts/account-provider";
import { useTransactions } from "@/src/ui/transactions/transaction-provider";

export function useDashboardData() {
  const { accounts, isLoading: accountsLoading, loadError: accountsError } = useAccounts();
  const { list, version } = useTransactions();
  const [transactions, setTransactions] = useState<readonly TransactionView[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let current = true;
    void list()
      .then((items) => { if (current) { setTransactions(items); setError(null); } })
      .catch((caught: unknown) => { if (current) setError(caught instanceof Error ? caught.message : "Не удалось загрузить данные"); })
      .finally(() => { if (current) setIsLoading(false); });
    return () => { current = false; };
  }, [list, version]);

  return useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const periodStart = `${year}-${String(month).padStart(2, "0")}-01`;
    const periodEnd = `${year}-${String(month).padStart(2, "0")}-${String(new Date(year, month, 0).getDate()).padStart(2, "0")}`;
    const account = accounts[0];
    const totals = calculatePeriodTotals(transactions, periodStart, periodEnd);
    return {
      account,
      transactions,
      totalBalance: account ? calculateAccountBalance(account, transactions) : 0n,
      periodStart,
      periodEnd,
      totals,
      expensesByCategory: calculateExpensesByCategory(transactions, periodStart, periodEnd),
      balanceSeries: account ? calculateBalanceSeries(account, transactions, periodStart, periodEnd) : [],
      latestOperations: transactions.slice(0, 5),
      periodOperationCount: transactions.filter(({ transaction }) => {
        const date = transaction.occurredAt.slice(0, 10);
        return date >= periodStart && date <= periodEnd;
      }).length,
      isLoading: accountsLoading || isLoading,
      error: accountsError ?? error,
    };
  }, [accounts, accountsError, accountsLoading, error, isLoading, transactions]);
}
