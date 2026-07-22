"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import type { TransactionDraft, TransactionView } from "@/src/business/transactions";
import { useAccounts } from "@/src/ui/settings/accounts/account-provider";
import { useCategories } from "@/src/ui/settings/categories/category-provider";
import { useUnsavedChanges } from "@/src/ui/settings/use-unsaved-changes";
import { Button, Field, Input, MoneyInput, Select, fieldClass } from "@/src/ui/system";
import { formatTransactionError } from "./transaction-provider";

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

  return <form onSubmit={submit} noValidate className="mt-6 space-y-5">
    <Field label="Тип операции" htmlFor="transaction-type"><Select id="transaction-type" required value={draft.type} onChange={(event) => setDraft({ ...draft, type: event.target.value, categoryId: undefined, destinationAccountId: undefined })}><option value="income">Доход</option><option value="expense">Расход</option><option value="transfer">Перевод</option></Select></Field>
    <Field label="Сумма" htmlFor="transaction-amount"><MoneyInput id="transaction-amount" required value={draft.amount} onChange={(event) => setDraft({ ...draft, amount: event.target.value })} /></Field>
    <Field label="Дата и время" htmlFor="transaction-date"><Input id="transaction-date" type="datetime-local" required value={draft.occurredAt} onChange={(event) => setDraft({ ...draft, occurredAt: event.target.value })} /></Field>
    <Field label={draft.type === "income" ? "Счёт получения" : "Счёт"} htmlFor="transaction-account"><Select id="transaction-account" required value={draft.accountId} onChange={(event) => setDraft({ ...draft, accountId: event.target.value })}><option value="">Выберите счёт</option>{availableAccounts.map((account) => <option key={account.id} value={account.id}>{account.name} · {account.currency}{account.isActive ? "" : " · неактивный"}</option>)}</Select></Field>
    {draft.type === "transfer" ? <Field label="Счёт назначения" htmlFor="transaction-destination"><Select id="transaction-destination" required value={draft.destinationAccountId ?? ""} onChange={(event) => setDraft({ ...draft, destinationAccountId: event.target.value })}><option value="">Выберите счёт</option>{availableAccounts.map((account) => <option key={account.id} value={account.id}>{account.name} · {account.currency}{account.isActive ? "" : " · неактивный"}</option>)}</Select></Field> : <Field label="Категория" htmlFor="transaction-category"><Select id="transaction-category" required value={draft.categoryId ?? ""} onChange={(event) => setDraft({ ...draft, categoryId: event.target.value })}><option value="">Выберите категорию</option>{availableCategories.map((category) => <option key={category.id} value={category.id}>{category.name}{category.isActive ? "" : " · неактивная"}</option>)}</Select></Field>}
    <Field label="Комментарий (необязательно)" htmlFor="transaction-note"><textarea id="transaction-note" rows={3} value={draft.note ?? ""} onChange={(event) => setDraft({ ...draft, note: event.target.value })} className={fieldClass} /></Field>
    {error ? <p role="alert" className="rounded-xl bg-[var(--danger-soft)] px-4 py-3 text-sm text-[var(--danger)]">{error}</p> : null}
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Link href={cancelHref} className="rounded-xl px-5 py-3 text-center text-sm font-semibold text-[var(--text-muted)]">Отмена</Link><Button disabled={isSaving}>{isSaving ? "Сохранение…" : submitLabel}</Button></div>
  </form>;
}

export function toInputDateTime(value: string): string { const date = new Date(value); const offset = date.getTimezoneOffset() * 60_000; return new Date(date.getTime() - offset).toISOString().slice(0, 16); }
function toStoredDateTime(value: string): string { return new Date(value).toISOString(); }
export function draftFromView(view: TransactionView): TransactionDraft { const { transaction } = view; return { type: transaction.type, amount: transaction.amount, occurredAt: toInputDateTime(transaction.occurredAt), accountId: transaction.accountId, ...(transaction.type === "transfer" ? { destinationAccountId: transaction.destinationAccountId } : { categoryId: transaction.categoryId }), note: transaction.note ?? "" }; }
