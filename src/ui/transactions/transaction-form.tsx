"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import type { TransactionDraft, TransactionView } from "@/src/business/transactions";
import { useAccounts } from "@/src/ui/settings/accounts/account-provider";
import { useCategories } from "@/src/ui/settings/categories/category-provider";
import { useUnsavedChanges } from "@/src/ui/settings/use-unsaved-changes";
import { formatTransactionError } from "./transaction-provider";
import styles from "./transaction-form.module.css";

export function TransactionForm({ initialValue, submitLabel, cancelHref, onSubmit }: Readonly<{ initialValue?: TransactionDraft; submitLabel: string; cancelHref: string; onSubmit: (draft: TransactionDraft) => Promise<void> }>) {
  const { accounts } = useAccounts();
  const { categories } = useCategories();
  const [baseline] = useState<TransactionDraft>(() => initialValue ?? { type: "expense", amount: "", occurredAt: toInputDateTime(new Date().toISOString()), accountId: "", categoryId: "", note: "" });
  const [draft, setDraft] = useState<TransactionDraft>(baseline);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const dirty = useMemo(() => !isSaved && JSON.stringify(draft) !== JSON.stringify(baseline), [baseline, draft, isSaved]);
  useUnsavedChanges(dirty);

  const availableAccounts = accounts.filter((account) => account.isActive || account.id === draft.accountId || account.id === draft.destinationAccountId);
  const availableCategories = categories.filter((category) => (category.isActive || category.id === draft.categoryId) && category.kind === draft.type);

  async function submit(event: FormEvent) {
    event.preventDefault(); setError(null); setIsSaving(true);
    try { await onSubmit({ ...draft, occurredAt: toStoredDateTime(draft.occurredAt) }); setIsSaved(true); }
    catch (caught) { setError(formatTransactionError(caught)); setIsSaving(false); }
  }

  return <form onSubmit={submit} noValidate className={styles.form}>
    <div className={styles.typeTabs}><button type="button" className={draft.type === "expense" ? styles.selected : ""} onClick={()=>setDraft({...draft,type:"expense",categoryId:undefined,destinationAccountId:undefined})}>Расход</button><button type="button" className={draft.type === "income" ? styles.selected : ""} onClick={()=>setDraft({...draft,type:"income",categoryId:undefined,destinationAccountId:undefined})}>Доход</button><button type="button" className={draft.type === "transfer" ? styles.selected : ""} onClick={()=>setDraft({...draft,type:"transfer",categoryId:undefined,destinationAccountId:undefined})}>Перевод</button></div>
    <div className={styles.amount}><label htmlFor="transaction-amount">Сумма</label><div><input id="transaction-amount" inputMode="decimal" required placeholder="0" value={draft.amount} onChange={(event) => setDraft({ ...draft, amount: event.target.value })}/><span>₽</span></div></div>
    <div className={styles.grid}><FormField label="Дата и время" id="transaction-date"><input id="transaction-date" type="datetime-local" required value={draft.occurredAt} onChange={(event) => setDraft({ ...draft, occurredAt: event.target.value })}/></FormField><FormField label={draft.type === "income" ? "Счёт получения" : "Счёт"} id="transaction-account"><select id="transaction-account" required value={draft.accountId} onChange={(event) => setDraft({ ...draft, accountId: event.target.value })}><option value="">Выберите счёт</option>{availableAccounts.map((account) => <option key={account.id} value={account.id}>{account.name} · {account.currency}{account.isActive ? "" : " · неактивный"}</option>)}</select></FormField>
    {draft.type === "transfer" ? <FormField label="Счёт назначения" id="transaction-destination"><select id="transaction-destination" required value={draft.destinationAccountId ?? ""} onChange={(event) => setDraft({ ...draft, destinationAccountId: event.target.value })}><option value="">Выберите счёт</option>{availableAccounts.map((account) => <option key={account.id} value={account.id}>{account.name} · {account.currency}{account.isActive ? "" : " · неактивный"}</option>)}</select></FormField> : <FormField label="Категория" id="transaction-category"><select id="transaction-category" required value={draft.categoryId ?? ""} onChange={(event) => setDraft({ ...draft, categoryId: event.target.value })}><option value="">Выберите категорию</option>{availableCategories.map((category) => <option key={category.id} value={category.id}>{category.name}{category.isActive ? "" : " · неактивная"}</option>)}</select></FormField>}</div>
    <FormField label="Комментарий" id="transaction-note"><textarea id="transaction-note" rows={3} placeholder="Добавьте описание операции" value={draft.note ?? ""} onChange={(event) => setDraft({ ...draft, note: event.target.value })}/></FormField>
    {error ? <p role="alert" className={styles.error}>{error}</p> : null}
    <div className={styles.actions}><Link href={cancelHref}>Отмена</Link><button disabled={isSaving}>{isSaving ? "Сохранение…" : submitLabel}</button></div>
  </form>;
}

function FormField({label,id,children}:{label:string;id:string;children:React.ReactNode}){return <div className={styles.field}><label htmlFor={id}>{label}</label>{children}</div>}

export function toInputDateTime(value: string): string { const date = new Date(value); const offset = date.getTimezoneOffset() * 60_000; return new Date(date.getTime() - offset).toISOString().slice(0, 16); }
function toStoredDateTime(value: string): string { return new Date(value).toISOString(); }
export function draftFromView(view: TransactionView): TransactionDraft { const { transaction } = view; return { type: transaction.type, amount: transaction.amount, occurredAt: toInputDateTime(transaction.occurredAt), accountId: transaction.accountId, ...(transaction.type === "transfer" ? { destinationAccountId: transaction.destinationAccountId } : { categoryId: transaction.categoryId }), note: transaction.note ?? "" }; }
