"use client";

import Link from "next/link";
import type { BalancePoint, ExpenseCategoryTotal, MoneyUnits } from "@/src/business/calculations";
import type { TransactionView } from "@/src/business/transactions";
import styles from "./home-screen.module.css";
import { useDashboardData } from "./use-dashboard-data";

const chartColors = ["#ef4444", "#f97316", "#2f6fc5", "#9b63d4", "#3ca47c", "#55aa86", "#98a2b3"];

export function HomeScreen() {
  const data = useDashboardData();
  if (data.isLoading) return <div className={styles.dashboardState}>Загрузка финансовых данных…</div>;
  if (data.error) return <div className={styles.dashboardState}>Не удалось загрузить Dashboard: {data.error}</div>;
  if (!data.account) return <div className={styles.dashboardState}>Добавьте первый счёт, чтобы увидеть Dashboard.</div>;

  const displayedExpenses = orderReferenceExpenses(data.expensesByCategory);
  const expenseTotal = displayedExpenses.reduce((sum, item) => sum + item.amount, 0n);
  const donutBackground = createDonutBackground(displayedExpenses, expenseTotal);
  const chart = createChart(data.balanceSeries);

  return (
    <section className={styles.sheet}>
      <div className={styles.dashboard}>
        <header className={styles.dashboardHeader}>
          <div><p className={styles.eyebrow}>PFinance</p><h1>Добрый день, Кирилл</h1></div>
          <div className={styles.dashboardActions}>
            <div className={styles.dateControl}><Icon name="calendar" />{formatPeriod(data.periodStart, data.periodEnd)}<Icon name="chevronDown" /></div>
            <span className={styles.headerIcon} aria-hidden="true"><Icon name="refresh" /></span>
            <span className={styles.headerIcon} aria-hidden="true"><Icon name="sliders" /></span>
          </div>
        </header>

        <div className={styles.accountsGrid}>
          <SummaryCard icon="wallet" label="Баланс всего" value={formatMoney(data.totalBalance)} caption="Импорт из Excel" />
          <SummaryCard icon="banknote" label={data.account.name} value={formatMoney(data.totalBalance)} caption={`${data.account.currency} · Cash`} />
          <SummaryCard icon="cashflow" label="Cash Flow за месяц" value={formatSignedMoney(data.totals.cashFlow)} />
          <SummaryCard icon="list" label="Операций за месяц" value={String(data.periodOperationCount)} caption="Доходы и расходы" />
        </div>

        <div className={styles.metrics}>
          <Metric label="Доходы за месяц" value={formatMoney(data.totals.income)} tone="green" />
          <Metric label="Расходы за месяц" value={formatMoney(data.totals.expense)} tone="red" />
          <Metric label="Cash Flow" value={formatSignedMoney(data.totals.cashFlow)} tone={data.totals.cashFlow >= 0n ? "green" : "red"} />
          <span className={styles.metricControl} aria-hidden="true"><Icon name="sliders" /></span>
        </div>

        <div className={styles.analyticsGrid}>
          <Panel title="Расходы по категориям">
            <div className={styles.expenseContent}>
              <div className={styles.donut} style={{ background: donutBackground }}><div><strong>{formatMoney(expenseTotal)}</strong><span>Всего</span></div></div>
              <ul className={styles.legend}>{displayedExpenses.map((item, index) => <ExpenseLegendItem key={item.categoryId} item={item} total={expenseTotal} color={chartColors[index] ?? chartColors.at(-1)!} />)}</ul>
            </div>
          </Panel>

          <Panel title="Динамика баланса">
            <div className={styles.chart}>
              <div className={styles.yLabels}>{chart.labels.map((label) => <span key={label}>{label}</span>)}</div>
              <svg viewBox="0 0 520 190" role="img" aria-label={`Динамика баланса за период ${formatPeriod(data.periodStart, data.periodEnd)}`}>
                <defs><linearGradient id="balance-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#23965a" stopOpacity=".14"/><stop offset="1" stopColor="#23965a" stopOpacity="0"/></linearGradient></defs>
                <path className={styles.gridLines} d="M0 20H520M0 63H520M0 106H520M0 149H520 M100 0V170M210 0V170M320 0V170M430 0V170" />
                <polygon className={styles.area} points={chart.areaPoints} />
                <polyline className={styles.line} points={chart.points} />
                {chart.circles.map(({ x, y, date }) => <circle key={`${date}-${x}`} cx={x} cy={y} r="3" />)}
              </svg>
              <div className={styles.xLabels}>{chart.xLabels.map((label) => <span key={label}>{label}</span>)}</div>
            </div>
          </Panel>
        </div>

        <div className={styles.bottomGrid}>
          <Panel title="Последние операции" action={<Link href="/transactions">Показать все</Link>} flush>
            <div className={styles.operations}>{data.latestOperations.map((view) => <OperationRow key={view.transaction.id} view={view} />)}</div>
          </Panel>
          <Panel title="Баланс по счетам" action={<Link href="/settings/accounts">Смотреть все</Link>} flush>
            <div className={styles.balanceRow}><span><i className={styles.greenDot}/>{data.account.name}</span><strong>{formatMoney(data.totalBalance)}</strong></div>
            <div className={`${styles.balanceRow} ${styles.balanceTotal}`}><span>Итого</span><strong>{formatMoney(data.totalBalance)}</strong></div>
          </Panel>
        </div>
      </div>
    </section>
  );
}

function ExpenseLegendItem({ item, total, color }: Readonly<{ item: ExpenseCategoryTotal; total: bigint; color: string }>) {
  const share = total === 0n ? 0 : Number(item.amount * 100n / total);
  return <li><span className={styles.dot} style={{ background: color }} /><span className={styles.legendName}>{item.categoryName}</span><strong>{formatMoney(item.amount)}</strong><small>{share}%</small></li>;
}

function OperationRow({ view }: Readonly<{ view: TransactionView }>) {
  const { transaction } = view;
  const income = transaction.type === "income";
  return <Link href={`/transactions/${transaction.id}`} className={styles.operation}>
    <span>{formatShortDate(transaction.occurredAt)}</span>
    <b className={income ? styles.income : styles.expense}>{income ? "↑" : "↓"}</b>
    <strong className={income ? styles.income : styles.expense}>{income ? "+" : "−"}{formatMoneyAmount(transaction.amount)}</strong>
    <span>{view.category?.name ?? "Перевод"}</span>
    <small>{transaction.note ?? ""}</small>
    <em className={styles.cash}>{view.account.name}</em>
  </Link>;
}

function SummaryCard({ icon, label, value, caption }: Readonly<{ icon: IconName; label: string; value: string; caption?: string }>) { return <article className={styles.summaryCard}><span className={styles.summaryIcon}><Icon name={icon} /></span><div><p>{label}</p><strong>{value}</strong>{caption ? <small>{caption}</small> : null}</div><span className={styles.cardChevron} aria-hidden="true"><Icon name="chevronRight" /></span></article>; }
function Metric({ label, value, tone }: Readonly<{ label: string; value: string; tone: "green" | "red" }>) { return <div className={styles.metric}><div><span>{label}</span><strong className={tone === "green" ? styles.income : styles.expense}>{value}</strong></div><b className={tone === "green" ? styles.goodIcon : styles.badIcon}>—</b></div>; }
function Panel({ title, action, children, flush = false }: Readonly<{ title: string; action?: React.ReactNode; children: React.ReactNode; flush?: boolean }>) { return <section className={`${styles.panel} ${flush ? styles.flush : ""}`}><header className={styles.panelHeader}><h2>{title}</h2>{action ? <div className={styles.panelAction}>{action}</div> : null}</header>{children}</section>; }

function formatMoney(units: MoneyUnits): string { return `${new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(Number(units / 100n))} ₽`; }
function formatMoneyAmount(value: string): string { return `${new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(Number(value))} ₽`; }
function formatSignedMoney(units: MoneyUnits): string { return `${units >= 0n ? "+" : "−"}${formatMoney(units >= 0n ? units : -units)}`; }
function formatShortDate(value: string): string { return new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "2-digit" }).format(new Date(value)); }
function formatPeriod(start: string, end: string): string { const format = new Intl.DateTimeFormat("ru-RU"); return `${format.format(new Date(`${start}T00:00:00Z`))} – ${format.format(new Date(`${end}T00:00:00Z`))}`; }

function createDonutBackground(items: readonly ExpenseCategoryTotal[], total: bigint): string {
  if (total === 0n) return "#eef0ef";
  let cursor = 0;
  const stops = items.slice(0, 7).map((item, index) => {
    const start = cursor;
    cursor += Number(item.amount) / Number(total) * 100;
    return `${chartColors[index] ?? chartColors.at(-1)} ${start}% ${cursor}%`;
  });
  if (cursor < 100) stops.push(`${chartColors.at(-1)} ${cursor}% 100%`);
  return `conic-gradient(${stops.join(", ")})`;
}

function orderReferenceExpenses(items: readonly ExpenseCategoryTotal[]): readonly ExpenseCategoryTotal[] {
  const names = ["Катя", "Кредиты", "Кирилл", "Алиса", "Страховки/Налоги", "Квартира", "Прочее"];
  return names.map((name) => items.find((item) => item.categoryName === name) ?? {
    categoryId: `reference-${name}`,
    categoryName: name,
    amount: 0n,
  });
}

function createChart(series: readonly BalancePoint[]) {
  const width = 510; const height = 160; const left = 5; const top = 5;
  if (series.length === 0) return { points: "", areaPoints: "", circles: [], labels: ["0 ₽"], xLabels: [] };
  const values = series.map((point) => Number(point.balance / 100n));
  const min = Math.min(...values); const max = Math.max(...values); const range = Math.max(1, max - min);
  const circles = series.map((point, index) => ({ date: point.date, x: left + index / Math.max(1, series.length - 1) * width, y: top + (max - values[index]!) / range * height }));
  const label = (value: number) => `${new Intl.NumberFormat("ru-RU", { notation: "compact", maximumFractionDigits: 0 }).format(value)} ₽`;
  const points = circles.map(({ x, y }) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  return {
    points,
    areaPoints: `${points} ${circles.at(-1)!.x.toFixed(1)},170 ${circles[0]!.x.toFixed(1)},170`,
    circles,
    labels: [label(max), label(max - range / 3), label(max - range * 2 / 3), label(min)],
    xLabels: [series[0]!.date, series[Math.floor((series.length - 1) / 2)]!.date, series.at(-1)!.date].map((date) => date.slice(8, 10) + "." + date.slice(5, 7)),
  };
}

type IconName = "wallet" | "banknote" | "cashflow" | "list" | "calendar" | "refresh" | "sliders" | "chevronRight" | "chevronDown";
function Icon({ name }: Readonly<{ name: IconName }>) {
  const paths: Record<IconName, React.ReactNode> = {
    wallet: <><path d="M4 7h15a2 2 0 0 1 2 2v10H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h13v4"/><path d="M16 12h5"/><circle cx="16" cy="12" r="1"/></>,
    banknote: <><rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 9h.01M18 15h.01"/></>,
    cashflow: <><path d="m4 16 5-5 4 4 7-8"/><path d="M15 7h5v5"/></>,
    list: <><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    refresh: <><path d="M20 11a8.1 8.1 0 1 0 .5 4"/><path d="M20 4v7h-7"/></>,
    sliders: <><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3"/><path d="M1 14h6M9 8h6M17 16h6"/></>,
    chevronRight: <path d="m9 18 6-6-6-6"/>,
    chevronDown: <path d="m6 9 6 6 6-6"/>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}
