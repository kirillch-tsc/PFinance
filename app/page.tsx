"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Account = "Наличные" | "Кредитка";
type OperationType = "Доход" | "Расход" | "Перевод";
type Tab = "home" | "operations" | "budget" | "settings";

type Operation = {
  id: number;
  date: string;
  account: Account;
  type: OperationType;
  category: string;
  amount: number;
  comment?: string;
  target?: Account;
};

const initialOperations: Operation[] = [
  { id: 1, date: "2026-07-20", account: "Наличные", type: "Расход", category: "Алиса", amount: 9120, comment: "Танцы" },
  { id: 2, date: "2026-07-19", account: "Наличные", type: "Доход", category: "Катя ЗП", amount: 151725 },
  { id: 3, date: "2026-07-16", account: "Кредитка", type: "Расход", category: "Продукты", amount: 4860, comment: "Перекрёсток" },
  { id: 4, date: "2026-07-12", account: "Наличные", type: "Перевод", category: "Между счетами", amount: 30000, target: "Кредитка" },
  { id: 5, date: "2026-07-10", account: "Кредитка", type: "Расход", category: "Кредиты", amount: 28055 },
  { id: 6, date: "2026-07-06", account: "Наличные", type: "Доход", category: "Кирилл ЗП", amount: 457420 },
  { id: 7, date: "2026-07-04", account: "Кредитка", type: "Расход", category: "Катя", amount: 175880 },
  { id: 8, date: "2026-07-03", account: "Наличные", type: "Расход", category: "Кирилл", amount: 24800 },
];

const limits: Record<string, number> = {
  "Продукты": 30000,
  "Катя": 235000,
  "Кирилл": 30000,
  "Алиса": 15000,
  "Кредиты": 110000,
};

const startBalances: Record<Account, number> = { "Наличные": 90000, "Кредитка": 62271 };
const money = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });
const rub = (value: number) => `${money.format(value)} ₽`;

function Icon({ name }: { name: string }) {
  const icons: Record<string, string> = { home: "⌂", operations: "⇅", budget: "◔", settings: "⚙", plus: "+", eye: "◉", wallet: "▣", card: "▭", trend: "↗" };
  return <span aria-hidden="true">{icons[name]}</span>;
}

export default function Home() {
  const [operations, setOperations] = useState<Operation[]>(initialOperations);
  const [tab, setTab] = useState<Tab>("home");
  const [showForm, setShowForm] = useState(false);
  const [privateMode, setPrivateMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("pfinance-operations");
    if (saved) setOperations(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("pfinance-operations", JSON.stringify(operations));
  }, [operations]);

  const stats = useMemo(() => {
    const balances = { ...startBalances };
    let income = 0;
    let expense = 0;
    const spent: Record<string, number> = {};

    operations.forEach((op) => {
      if (op.type === "Доход") { balances[op.account] += op.amount; income += op.amount; }
      if (op.type === "Расход") { balances[op.account] -= op.amount; expense += op.amount; spent[op.category] = (spent[op.category] || 0) + op.amount; }
      if (op.type === "Перевод" && op.target) { balances[op.account] -= op.amount; balances[op.target] += op.amount; }
    });

    return { balances, income, expense, spent, total: balances["Наличные"] + balances["Кредитка"] };
  }, [operations]);

  const hidden = privateMode ? "••••••" : null;

  function addOperation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const type = data.get("type") as OperationType;
    const account = data.get("account") as Account;
    setOperations((current) => [{
      id: Date.now(),
      date: String(data.get("date")),
      account,
      type,
      category: type === "Перевод" ? "Между счетами" : String(data.get("category")),
      amount: Number(data.get("amount")),
      comment: String(data.get("comment") || ""),
      target: type === "Перевод" ? (account === "Наличные" ? "Кредитка" : "Наличные") : undefined,
    }, ...current]);
    setShowForm(false);
    setTab("home");
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand"><div className="brand-mark">P</div><div><strong>PFinance</strong><span>Июль 2026</span></div></div>
        <button className="icon-button" onClick={() => setPrivateMode((value) => !value)} aria-label="Скрыть суммы"><Icon name="eye" /></button>
      </header>

      <section className="content">
        {tab === "home" && <>
          <section className="hero-card">
            <div className="hero-label"><span>ОБЩИЙ БАЛАНС</span><span className="live-dot">Актуально</span></div>
            <div className="hero-value">{hidden || rub(stats.total)}</div>
            <div className="hero-change"><Icon name="trend" /> +{rub(stats.income - stats.expense)} за месяц</div>
            <div className="account-grid">
              <div><span className="account-icon"><Icon name="wallet" /></span><p>Наличные</p><strong>{hidden || rub(stats.balances["Наличные"])}</strong></div>
              <div><span className="account-icon purple"><Icon name="card" /></span><p>Кредитка</p><strong>{hidden || rub(stats.balances["Кредитка"])}</strong></div>
            </div>
          </section>

          <section className="metrics-grid">
            <article><span>ДОХОДЫ</span><strong className="positive">+{hidden || rub(stats.income)}</strong><small>↑ 12% к июню</small></article>
            <article><span>РАСХОДЫ</span><strong className="negative">−{hidden || rub(stats.expense)}</strong><small>↓ 4% к июню</small></article>
            <article className="cashflow"><div><span>CASH FLOW</span><strong>+{hidden || rub(stats.income - stats.expense)}</strong></div><div className="sparkline"><i /><i /><i /><i /><i /><i /><i /></div></article>
          </section>

          <section className="section-block">
            <div className="section-heading"><div><span>БЮДЖЕТ НА ИЮЛЬ</span><h2>Расходы по категориям</h2></div><button onClick={() => setTab("budget")}>Все →</button></div>
            <BudgetRows spent={stats.spent} compact />
          </section>

          <section className="section-block operations-block">
            <div className="section-heading"><div><span>ЛЕНТА</span><h2>Последние операции</h2></div><button onClick={() => setTab("operations")}>Все →</button></div>
            <OperationList operations={operations.slice(0, 4)} hidden={Boolean(hidden)} />
          </section>
        </>}

        {tab === "operations" && <section className="page-panel"><div className="page-title"><span>ИЮЛЬ 2026</span><h1>Операции</h1><p>{operations.length} записей · данные хранятся на этом устройстве</p></div><OperationList operations={operations} hidden={Boolean(hidden)} /></section>}
        {tab === "budget" && <section className="page-panel"><div className="page-title"><span>БЮДЖЕТ</span><h1>План на июль</h1><p>Лимиты и остатки по категориям</p></div><BudgetRows spent={stats.spent} /></section>}
        {tab === "settings" && <section className="page-panel"><div className="page-title"><span>PFINANCE</span><h1>Настройки</h1><p>Простой семейный учёт без лишних функций</p></div><div className="settings-card"><div><strong>Валюта</strong><span>Российский рубль (₽)</span></div><div><strong>Счета</strong><span>Наличные, Кредитка</span></div><button onClick={() => { localStorage.removeItem("pfinance-operations"); setOperations(initialOperations); }}>Восстановить демо-данные</button></div></section>}
      </section>

      <button className="fab" onClick={() => setShowForm(true)} aria-label="Добавить операцию"><Icon name="plus" /></button>
      <nav className="bottom-nav" aria-label="Основная навигация">
        {([ ["home", "home", "Главная"], ["operations", "operations", "Операции"], ["budget", "budget", "Бюджет"], ["settings", "settings", "Ещё"] ] as [Tab,string,string][]).map(([id, icon, label]) => <button key={id} className={tab === id ? "active" : ""} onClick={() => setTab(id)}><Icon name={icon} /><small>{label}</small></button>)}
      </nav>

      {showForm && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowForm(false); }}><form className="operation-form" onSubmit={addOperation}><div className="form-handle" /><div className="form-heading"><div><span>НОВАЯ ЗАПИСЬ</span><h2>Добавить операцию</h2></div><button type="button" onClick={() => setShowForm(false)}>×</button></div><div className="form-grid"><label>Тип<select name="type"><option>Расход</option><option>Доход</option><option>Перевод</option></select></label><label>Счёт<select name="account"><option>Наличные</option><option>Кредитка</option></select></label><label>Категория<select name="category">{Object.keys(limits).map((item) => <option key={item}>{item}</option>)}<option>Прочее</option></select></label><label>Сумма<input required name="amount" type="number" min="1" inputMode="decimal" placeholder="0 ₽" /></label><label>Дата<input required name="date" type="date" defaultValue="2026-07-22" /></label><label>Комментарий<input name="comment" placeholder="Необязательно" /></label></div><button className="submit-button" type="submit">Сохранить операцию</button></form></div>}
    </main>
  );
}

function BudgetRows({ spent, compact = false }: { spent: Record<string, number>; compact?: boolean }) {
  const rows = Object.entries(limits).map(([category, limit]) => ({ category, limit, spent: spent[category] || 0 })).sort((a, b) => b.spent / b.limit - a.spent / a.limit);
  return <div className="budget-list">{rows.slice(0, compact ? 4 : rows.length).map((row) => { const percent = Math.min(Math.round(row.spent / row.limit * 100), 100); return <article className="budget-row" key={row.category}><div className={`category-badge c-${row.category.length % 4}`}>{row.category[0]}</div><div className="budget-main"><div><strong>{row.category}</strong><span>{rub(row.spent)} <small>из {rub(row.limit)}</small></span></div><div className="progress"><i style={{ width: `${percent}%` }} /></div></div><b>{percent}%</b></article>; })}</div>;
}

function OperationList({ operations, hidden }: { operations: Operation[]; hidden: boolean }) {
  return <div className="operation-list">{operations.map((op) => <article className="operation-row" key={op.id}><div className={`operation-icon ${op.type === "Доход" ? "income" : op.type === "Перевод" ? "transfer" : "expense"}`}>{op.type === "Доход" ? "↓" : op.type === "Перевод" ? "⇄" : "↑"}</div><div className="operation-info"><strong>{op.category}</strong><span>{new Date(`${op.date}T12:00:00`).toLocaleDateString("ru-RU", { day: "numeric", month: "short" })} · {op.account}{op.comment ? ` · ${op.comment}` : ""}</span></div><div className={`operation-amount ${op.type === "Доход" ? "positive" : op.type === "Расход" ? "negative" : ""}`}><strong>{hidden ? "••••" : `${op.type === "Доход" ? "+" : op.type === "Расход" ? "−" : ""}${rub(op.amount)}`}</strong><span>{op.type}</span></div></article>)}</div>;
}
