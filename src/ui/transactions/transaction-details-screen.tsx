"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { TransactionView } from "@/src/business/transactions";
import { formatTransactionError, useTransactions } from "./transaction-provider";
import styles from "./transaction-details-screen.module.css";

export function TransactionDetailsScreen({ transactionId }: Readonly<{ transactionId: string }>) {
  const router = useRouter();
  const { get, remove, version } = useTransactions();
  const [view, setView] = useState<TransactionView | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { let current = true; void get(transactionId).then((item) => { if (current) setView(item); }).catch((caught) => { if (current) setError(formatTransactionError(caught)); }); return () => { current = false; }; }, [get, transactionId, version]);
  async function deleteTransaction() { if (!view || !window.confirm("Удалить операцию? Это действие нельзя отменить.")) return; setDeleting(true); setError(null); try { await remove(transactionId); router.push("/transactions"); } catch (caught) { setError(formatTransactionError(caught)); setDeleting(false); } }

  if (error && !view) return <State title="Не удалось открыть операцию" message={error}/>;
  if (!view) return <State title="Загрузка операции…"/>;

  const { transaction } = view;
  const typeLabel = transaction.type === "income" ? "Доход" : transaction.type === "expense" ? "Расход" : "Перевод";
  const sign = transaction.type === "income" ? "+" : transaction.type === "expense" ? "−" : "";
  return <section className={styles.page}>
    <header><Link href="/transactions" aria-label="Назад">←</Link><div><p>Операции</p><h1>Детали операции</h1></div><span className={`${styles.badge} ${styles[transaction.type]}`}>{typeLabel}</span></header>
    <article className={styles.card}>
      <div className={styles.amount}><span className={styles.typeIcon}>{transaction.type === "income" ? "↓" : transaction.type === "expense" ? "↑" : "↔"}</span><small>{typeLabel}</small><strong className={styles[transaction.type]}>{sign} {formatAmount(transaction.amount, view.account.currency)}</strong></div>
      <dl><Value label="Дата и время" value={new Date(transaction.occurredAt).toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" })}/><Value label="Счёт" value={`${safe(view.account.name)}${view.account.isActive ? "" : " · неактивный"}`}/>{view.destinationAccount ? <Value label="Счёт назначения" value={`${safe(view.destinationAccount.name)}${view.destinationAccount.isActive ? "" : " · неактивный"}`}/> : null}<Value label="Категория" value={view.category ? `${safe(view.category.name)}${view.category.isActive ? "" : " · неактивная"}` : "—"}/><Value label="Комментарий" value={safe(transaction.note)}/></dl>
      {error ? <p role="alert" className={styles.error}>{error}</p> : null}
      <div className={styles.actions}><Link href={`/transactions/${transaction.id}/edit`}>Редактировать</Link><button disabled={deleting} onClick={() => void deleteTransaction()}>{deleting ? "Удаление…" : "Удалить"}</button></div>
    </article>
  </section>;
}

function Value({label,value}:{label:string;value:string}){return <div><dt>{label}</dt><dd title={value}>{value}</dd></div>}
function State({title,message}:{title:string;message?:string}){return <section className={styles.state}><h1>{title}</h1>{message?<p role="alert">{message}</p>:null}<Link href="/transactions">Вернуться к операциям</Link></section>}
function safe(value?:string){return value?.trim() || "—"}
function formatAmount(value:string,currency:string){return `${new Intl.NumberFormat("ru-RU",{maximumFractionDigits:2}).format(Number(value))} ${currency === "RUB" ? "₽" : currency}`}
