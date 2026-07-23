"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import type { AccountDraft } from "@/src/business/accounts";
import { useUnsavedChanges } from "../use-unsaved-changes";
import styles from "./accounts.module.css";

type AccountFormProps = Readonly<{
  initialValue?: AccountDraft;
  currencyLocked?: boolean;
  submitLabel: string;
  cancelHref: string;
  onSubmit: (draft: AccountDraft) => Promise<void>;
}>;

const emptyDraft: AccountDraft = {
  name: "",
  currency: "",
  openingBalance: "",
  openingBalanceDate: "",
};

export function AccountForm({
  initialValue = emptyDraft,
  currencyLocked = false,
  submitLabel,
  cancelHref,
  onSubmit,
}: AccountFormProps) {
  const [draft, setDraft] = useState<AccountDraft>(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const isDirty = useMemo(
    () => !isSaved && JSON.stringify(draft) !== JSON.stringify(initialValue),
    [draft, initialValue, isSaved],
  );
  useUnsavedChanges(isDirty);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSaving(true);
    try {
      await onSubmit(draft);
      setIsSaved(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Не удалось сохранить счёт");
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.form}>
      <FormField label="Название" htmlFor="account-name">
        <input
          id="account-name"
          name="name"
          required
          autoComplete="off"
          value={draft.name}
          onChange={(event) => setDraft({ ...draft, name: event.target.value })}
        />
      </FormField>

      <FormField label="Валюта" htmlFor="account-currency">
        <input
          id="account-currency"
          name="currency"
          required
          maxLength={3}
          autoCapitalize="characters"
          autoComplete="off"
          disabled={currencyLocked}
          placeholder="EUR"
          value={draft.currency}
          onChange={(event) => setDraft({ ...draft, currency: event.target.value.toUpperCase() })}
        />
        {currencyLocked ? (
          <p className={styles.hint}>Валюту нельзя изменить после появления операций.</p>
        ) : null}
      </FormField>

      <FormField label="Начальный баланс" htmlFor="account-opening-balance">
        <input
          id="account-opening-balance"
          name="openingBalance"
          required
          inputMode="decimal"
          placeholder="0.00"
          value={draft.openingBalance}
          onChange={(event) => setDraft({ ...draft, openingBalance: event.target.value })}
        />
      </FormField>

      <FormField label="Дата начального баланса" htmlFor="account-opening-date">
        <input
          id="account-opening-date"
          name="openingBalanceDate"
          required
          inputMode="numeric"
          placeholder="ГГГГ-ММ-ДД"
          value={draft.openingBalanceDate}
          onChange={(event) => setDraft({ ...draft, openingBalanceDate: event.target.value })}
        />
      </FormField>

      <p className={styles.hint}>
        Изменение начального баланса или его даты влияет на будущий расчёт истории счёта.
      </p>

      {error ? (
          <p role="alert" className={styles.error}>
          {error}
        </p>
      ) : null}

      <div className={styles.formActions}>
        <Link href={cancelHref}>
          Отмена
        </Link>
        <button
          type="submit"
          disabled={isSaving}
        >
          {isSaving ? "Сохранение…" : submitLabel}
        </button>
      </div>
    </form>
  );
}

function FormField({label,htmlFor,children}:{label:string;htmlFor:string;children:React.ReactNode}){return <div className={styles.formField}><label htmlFor={htmlFor}>{label}</label>{children}</div>}
