"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { TransactionFilters, TransactionView } from "@/src/business/transactions";
import { useAccounts } from "@/src/ui/settings/accounts/account-provider";
import { useCategories } from "@/src/ui/settings/categories/category-provider";
import { Card, DatePicker, EmptyState, ErrorState, Loading, Search, Select } from "@/src/ui/system";
import { formatTransactionError, useTransactions } from "./transaction-provider";

export function TransactionsScreen() {
  const params = useSearchParams();
  const { accounts } = useAccounts(); const { categories } = useCategories(); const { list, version } = useTransactions();
  const initial = useMemo<TransactionFilters>(() => ({ accountId: params.get("accountId") ?? undefined, categoryId: params.get("categoryId") ?? undefined }), [params]);
  const [filters, setFilters] = useState<TransactionFilters>(initial);
  const [items, setItems] = useState<readonly TransactionView[]>([]);
  const [isLoading, setIsLoading] = useState(true); const [error, setError] = useState<string | null>(null);

  useEffect(() => { let current = true; void Promise.resolve().then(() => { if (current) { setIsLoading(true); setError(null); } return list(filters); }).then((loaded) => { if (current) setItems(loaded); }).catch((caught) => { if (current) setError(formatTransactionError(caught)); }).finally(() => { if (current) setIsLoading(false); }); return () => { current = false; }; }, [filters, list, version]);
  const currencies = [...new Set(accounts.map((account) => account.currency))].sort();
  const hasFilters = Object.values(filters).some(Boolean);

  return <section className="w-full">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm text-slate-500">Учёт финансов</p><h1 className="mt-1 font-serif text-3xl font-bold text-emerald-950">Операции</h1></div><Link href="/transactions/new" className="rounded-xl bg-emerald-950 px-5 py-3 text-center text-sm font-semibold text-white">Добавить операцию</Link></div>
    <Card className="mt-6 p-4">
      <label className="block text-sm font-semibold text-[var(--text)]" htmlFor="transaction-search">Поиск</label><div className="mt-2"><Search id="transaction-search" placeholder="Комментарий, категория или счёт" value={filters.search ?? ""} onChange={(event) => setFilters({ ...filters, search: event.target.value || undefined })} /></div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Filter label="С даты"><DatePicker value={filters.periodStart ?? ""} onChange={(event) => setFilters({ ...filters, periodStart: event.target.value || undefined })} /></Filter>
        <Filter label="По дату"><DatePicker value={filters.periodEnd ?? ""} onChange={(event) => setFilters({ ...filters, periodEnd: event.target.value || undefined })} /></Filter>
        <Filter label="Тип"><Select value={filters.type ?? ""} onChange={(event) => setFilters({ ...filters, type: (event.target.value || undefined) as TransactionFilters["type"] })}><option value="">Все</option><option value="income">Доход</option><option value="expense">Расход</option><option value="transfer">Перевод</option></Select></Filter>
        <Filter label="Счёт"><Select value={filters.accountId ?? ""} onChange={(event) => setFilters({ ...filters, accountId: event.target.value || undefined })}><option value="">Все</option>{accounts.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</Select></Filter>
        <Filter label="Категория"><Select value={filters.categoryId ?? ""} onChange={(event) => setFilters({ ...filters, categoryId: event.target.value || undefined })}><option value="">Все</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</Select></Filter>
        <Filter label="Валюта"><Select value={filters.currency ?? ""} onChange={(event) => setFilters({ ...filters, currency: event.target.value || undefined })}><option value="">Все</option>{currencies.map((currency) => <option key={currency} value={currency}>{currency}</option>)}</Select></Filter>
      </div>
      {hasFilters ? <button type="button" onClick={() => setFilters({})} className="mt-4 text-sm font-semibold text-emerald-800">Сбросить поиск и фильтры</button> : null}
    </Card>
    {isLoading ? <Loading label="Загрузка операций…" /> : error ? <div className="mt-8"><ErrorState message={error} onRetry={() => setFilters({ ...filters })} /></div> : items.length === 0 ? <div className="mt-8"><EmptyState title={hasFilters ? "Ничего не найдено" : "Операций пока нет"} message={hasFilters ? "Измените условия поиска или сбросьте фильтры." : "Добавьте первый доход, расход или перевод."} action={hasFilters ? <button onClick={() => setFilters({})} className="rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white">Сбросить фильтры</button> : <Link href={accounts.some((a) => a.isActive) ? "/transactions/new" : "/settings/accounts/new"} className="inline-flex rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white">{accounts.some((a) => a.isActive) ? "Добавить операцию" : "Создать счёт"}</Link>} /></div> : <ul className="mt-6 space-y-3">{items.map((view) => <TransactionRow key={view.transaction.id} view={view} />)}</ul>}
  </section>;
}

function TransactionRow({ view }: Readonly<{ view: TransactionView }>) { const transaction = view.transaction; const label = transaction.type === "income" ? "Доход" : transaction.type === "expense" ? "Расход" : "Перевод"; return <li><Link href={`/transactions/${transaction.id}`} className="flex items-center justify-between gap-4 rounded-2xl border border-emerald-950/10 bg-white p-4"><div><p className="font-semibold text-emerald-950">{transaction.note || view.category?.name || label}</p><p className="mt-1 text-sm text-slate-500">{label} · {view.account.name}{view.destinationAccount ? ` → ${view.destinationAccount.name}` : view.category ? ` · ${view.category.name}` : ""} · {new Date(transaction.occurredAt).toLocaleString("ru")}</p></div><strong className={transaction.type === "income" ? "text-emerald-700" : transaction.type === "expense" ? "text-red-700" : "text-emerald-950"}>{transaction.type === "income" ? "+" : transaction.type === "expense" ? "−" : ""}{transaction.amount} {view.account.currency}</strong></Link></li>; }
function Filter({ label, children }: Readonly<{ label: string; children: React.ReactNode }>) { return <label className="space-y-2 text-sm font-semibold text-[var(--text)]">{label}{children}</label>; }
