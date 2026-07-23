"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { calculateAccountBalance, calculatePeriodTotals } from "@/src/business/calculations";
import type { TransactionFilters, TransactionView } from "@/src/business/transactions";
import { useDashboardData } from "@/src/ui/home/use-dashboard-data";
import { useAccounts } from "@/src/ui/settings/accounts/account-provider";
import { useCategories } from "@/src/ui/settings/categories/category-provider";
import { EmptyState, ErrorState, Loading } from "@/src/ui/system";
import { formatTransactionError, useTransactions } from "./transaction-provider";
import styles from "./transactions-screen.module.css";

const PAGE_SIZE = 10;

export function TransactionsScreen() {
  const params = useSearchParams();
  const dashboard = useDashboardData();
  const { accounts } = useAccounts();
  const { categories } = useCategories();
  const { list, version } = useTransactions();
  const [filters, setFilters] = useState<TransactionFilters>(() => ({ accountId: params.get("accountId") ?? undefined, categoryId: params.get("categoryId") ?? undefined }));
  const [items, setItems] = useState<readonly TransactionView[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let current = true;
    void Promise.resolve().then(() => { if (current) { setIsLoading(true); setError(null); } return list(filters); }).then((loaded) => { if (current) setItems(loaded); }).catch((caught) => { if (current) setError(formatTransactionError(caught)); }).finally(() => { if (current) setIsLoading(false); });
    return () => { current = false; };
  }, [filters, list, version]);
  const periodStart = items.at(-1)?.transaction.occurredAt.slice(0, 10) ?? dashboard.periodStart;
  const periodEnd = items[0]?.transaction.occurredAt.slice(0, 10) ?? dashboard.periodEnd;
  const totals = calculatePeriodTotals(items, periodStart, periodEnd);
  const pageItems = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));

  return <section className={styles.page}>
    <header className={styles.header}>
      <div><h1>Финансы</h1><p>Обзор и операции</p></div>
      <div className={styles.headerActions}>
        <button className={styles.periodButton}><Icon name="calendar" />{formatPeriod(periodStart, periodEnd)}<Icon name="chevron" /></button>
        <button className={styles.filterButton} onClick={() => setShowFilters((value) => !value)} aria-expanded={showFilters}><Icon name="filter" />Фильтры</button>
      </div>
    </header>

    <div className={styles.mobileTitle}><button aria-label="Открыть меню"><Icon name="menu" /></button><strong>Операции</strong><span><Icon name="search" /><button onClick={() => setShowFilters((value) => !value)} aria-label="Фильтры"><Icon name="filter" /></button></span></div>
    <button className={styles.mobilePeriod}><span>{formatPeriod(periodStart, periodEnd)}</span><Icon name="chevron" /></button>

    <div className={styles.overview}>
      <section className={styles.accounts}><h2>Счета</h2><div className={styles.accountGrid}>
        {accounts.map((account, index) => <article className={styles.accountCard} key={account.id}><span className={`${styles.accountIcon} ${index % 3 === 1 ? styles.green : index % 3 === 2 ? styles.orange : styles.blue}`}><Icon name="wallet" /></span><small>{account.name}</small><b>{formatMoney(calculateAccountBalance(account, dashboard.transactions), account.currency)}</b><em>—</em></article>)}
        <article className={`${styles.accountCard} ${styles.totalCard}`}><small>Итого активы</small><b>{formatMoney(dashboard.totalBalance, dashboard.account?.currency ?? "RUB")}</b><em>—</em></article>
      </div></section>
      <section className={styles.cashChart}><div className={styles.chartHead}><h2>Кэшфлоу за период</h2><div><i className={styles.incomeDot}/>Поступления<i className={styles.expenseDot}/>Расходы<i className={styles.flowDot}/>Кэшфлоу</div></div><CashflowChart items={items} /><aside><span>Поступления<b className={styles.income}>{formatMoney(totals.income)}</b></span><span>Расходы<b className={styles.expense}>− {formatMoney(totals.expense)}</b></span><span>Кэшфлоу<b className={styles.flow}>{formatSignedMoney(totals.cashFlow)}</b></span></aside></section>
    </div>

    <section className={styles.mobileSummary}><Metric label="Поступления" value={formatMoney(totals.income)} tone="income"/><Metric label="Расходы" value={formatMoney(totals.expense)} tone="expense"/><Metric label="Кэшфлоу" value={formatSignedMoney(totals.cashFlow)} tone="flow"/></section>

    <section className={styles.transactions}>
      <div className={styles.toolbar}>
        <div className={styles.tabs}>{([undefined, "income", "expense"] as const).map((type) => <button key={type ?? "all"} className={filters.type === type ? styles.activeTab : ""} onClick={() => setFilters({ ...filters, type })}>{type === "income" ? "Доходы" : type === "expense" ? "Расходы" : "Все операции"}</button>)}</div>
        <div className={styles.tools}><label><Icon name="search"/><input aria-label="Поиск" placeholder="Поиск..." value={filters.search ?? ""} onChange={(event) => setFilters({ ...filters, search: event.target.value || undefined })}/></label><button><Icon name="download"/>Импорт</button><Link href="/transactions/new"><span>＋</span>Новая операция</Link></div>
      </div>
      {showFilters ? <Filters filters={filters} setFilters={setFilters} accounts={accounts} categories={categories}/> : null}
      {isLoading ? <Loading label="Загрузка операций…"/> : error ? <ErrorState message={error} onRetry={() => setFilters({ ...filters })}/> : items.length === 0 ? <EmptyState title="Операции не найдены" message="Измените параметры фильтрации или создайте новую операцию." action={<Link href="/transactions/new">Новая операция</Link>}/> : <>
        <div className={styles.desktopTable}><table><thead><tr><th>Дата　↕</th><th>Тип</th><th>Категория</th><th>Описание</th><th>Счёт</th><th>Сумма</th><th>Комментарий</th><th/></tr></thead><tbody>{pageItems.map((view) => <DesktopRow key={view.transaction.id} view={view}/>)}</tbody></table></div>
        <div className={styles.mobileList}>{groupByDate(pageItems).map(([date, views]) => <section key={date}><h3>{formatMobileDate(date)}</h3>{views.map((view) => <MobileRow key={view.transaction.id} view={view}/>)}</section>)}</div>
        <footer className={styles.footer}><span>Показано {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, items.length)} из {items.length} операций</span><div className={styles.pagination}><button disabled={page === 1} onClick={() => setPage(page - 1)}>←</button><b>{page} / {pageCount}</b><button disabled={page === pageCount} onClick={() => setPage(page + 1)}>→</button></div><div><span>Итого за период:</span><b className={styles.income}>+ {formatMoney(totals.income)}</b><b className={styles.expense}>− {formatMoney(totals.expense)}</b><b className={styles.flow}>{formatSignedMoney(totals.cashFlow)}</b></div></footer>
      </>}
    </section>
  </section>;
}

function DesktopRow({ view }: { view: TransactionView }) { const t = view.transaction; return <tr><td>{new Date(t.occurredAt).toLocaleDateString("ru-RU")}</td><td><TypeIcon type={t.type}/></td><td><Link href={`/transactions/${t.id}`}>{view.category?.name ?? (t.type === "transfer" ? "Перевод" : "Без категории")}</Link></td><td>{t.note || "—"}</td><td><span className={styles.accountName}><Icon name="wallet"/>{view.account.name}</span></td><td className={t.type === "income" ? styles.income : t.type === "expense" ? styles.expense : styles.flow}>{t.type === "income" ? "+ " : t.type === "expense" ? "− " : ""}{formatAmount(t.amount, view.account.currency)}</td><td>{t.note || "—"}</td><td><Link href={`/transactions/${t.id}/edit`} className={styles.more}>•••</Link></td></tr>; }
function MobileRow({ view }: { view: TransactionView }) { const t = view.transaction; return <Link href={`/transactions/${t.id}`} className={styles.mobileRow}><TypeIcon type={t.type}/><span className={styles.mobileText}><b>{view.category?.name ?? (t.type === "transfer" ? "Перевод" : "Без категории")}</b><small>{t.note || "Без описания"}</small><em><Icon name="wallet"/>{view.account.name}</em></span><strong className={t.type === "income" ? styles.income : t.type === "expense" ? styles.expense : styles.flow}>{t.type === "income" ? "+ " : t.type === "expense" ? "− " : ""}{formatAmount(t.amount, view.account.currency)}</strong><span className={styles.more}>•••</span></Link>; }
function TypeIcon({ type }: { type: string }) { return <span className={`${styles.typeIcon} ${type === "income" ? styles.typeIncome : type === "expense" ? styles.typeExpense : styles.typeTransfer}`}>{type === "income" ? "↓" : type === "expense" ? "↑" : "↔"}</span>; }
function Metric({ label, value, tone }: { label: string; value: string; tone: "income"|"expense"|"flow" }) { return <div><small>{label}</small><b className={styles[tone]}>{value}</b></div>; }
function Filters({ filters, setFilters, accounts, categories }: { filters: TransactionFilters; setFilters: (value: TransactionFilters) => void; accounts: readonly {id:string;name:string}[]; categories: readonly {id:string;name:string}[] }) { return <div className={styles.filters}><input type="date" value={filters.periodStart ?? ""} onChange={(e)=>setFilters({...filters,periodStart:e.target.value||undefined})}/><input type="date" value={filters.periodEnd ?? ""} onChange={(e)=>setFilters({...filters,periodEnd:e.target.value||undefined})}/><select value={filters.accountId ?? ""} onChange={(e)=>setFilters({...filters,accountId:e.target.value||undefined})}><option value="">Все счета</option>{accounts.map(a=><option key={a.id} value={a.id}>{a.name}</option>)}</select><select value={filters.categoryId ?? ""} onChange={(e)=>setFilters({...filters,categoryId:e.target.value||undefined})}><option value="">Все категории</option>{categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select><button onClick={()=>setFilters({})}>Сбросить</button></div>; }
function CashflowChart({ items }: { items: readonly TransactionView[] }) { const bars = items.slice(0, 16).reverse(); const max = Math.max(1,...bars.map(v=>Number(v.transaction.amount))); return <div className={styles.chart}><div className={styles.zero}/>{bars.map((view,index)=>{const h=Math.max(5,Math.round(Number(view.transaction.amount)/max*64));return <i key={view.transaction.id} style={{height:h,left:`${4+index*5.6}%`}} className={view.transaction.type === "income" ? styles.positiveBar : styles.negativeBar}/>})}<svg viewBox="0 0 100 50" preserveAspectRatio="none"><polyline points="0,29 8,32 16,26 24,28 32,20 40,17 48,21 56,19 64,30 72,18 80,25 88,21 96,29 100,24"/></svg></div>; }
function Icon({ name }: { name:string }) { const paths:Record<string,React.ReactNode>={calendar:<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,filter:<><path d="M4 5h16M7 12h10M10 19h4"/></>,chevron:<path d="m9 18 6-6-6-6"/>,search:<><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,download:<><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v3h16v-3"/></>,wallet:<><path d="M4 7h16v12H4zM4 7l2-3h12l2 3M16 12h4"/></>,menu:<path d="M3 6h18M3 12h18M3 18h18"/>};return <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>; }
function formatAmount(amount:string,currency="RUB"){return `${new Intl.NumberFormat("ru-RU",{maximumFractionDigits:2}).format(Number(amount))} ${currency === "RUB" ? "₽" : currency}`;}
function formatMoney(units:bigint,currency="RUB"){return `${new Intl.NumberFormat("ru-RU").format(Number(units/100n))} ${currency === "RUB" ? "₽" : currency}`;}
function formatSignedMoney(units:bigint){return `${units>=0n?"+ ":"− "}${formatMoney(units<0n?-units:units)}`;}
function formatPeriod(start:string,end:string){const a=new Date(`${start}T00:00:00`),b=new Date(`${end}T00:00:00`);return `${a.getDate()} – ${b.getDate()} ${b.toLocaleDateString("ru-RU",{month:"long",year:"numeric"}).replace(" г.","")}`;}
function groupByDate(items:readonly TransactionView[]){const map=new Map<string,TransactionView[]>();items.forEach(v=>{const d=v.transaction.occurredAt.slice(0,10);map.set(d,[...(map.get(d)??[]),v]);});return [...map.entries()];}
function formatMobileDate(value:string){return new Date(`${value}T00:00:00`).toLocaleDateString("ru-RU",{day:"numeric",month:"long",weekday:"long"});}
