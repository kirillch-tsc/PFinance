"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import type { AccountDraft } from "@/src/business/accounts";
import { Button, Field, Input, MoneyInput } from "@/src/ui/system";
import { useUnsavedChanges } from "../use-unsaved-changes";

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
    <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
      <Field label="Название" htmlFor="account-name">
        <Input
          id="account-name"
          name="name"
          required
          autoComplete="off"
          value={draft.name}
          onChange={(event) => setDraft({ ...draft, name: event.target.value })}
        />
      </Field>

      <Field label="Валюта" htmlFor="account-currency">
        <Input
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
          <p className="mt-2 text-sm text-slate-500">Валюту нельзя изменить после появления операций.</p>
        ) : null}
      </Field>

      <Field label="Начальный баланс" htmlFor="account-opening-balance">
        <MoneyInput
          id="account-opening-balance"
          name="openingBalance"
          required
          inputMode="decimal"
          placeholder="0.00"
          value={draft.openingBalance}
          onChange={(event) => setDraft({ ...draft, openingBalance: event.target.value })}
        />
      </Field>

      <Field label="Дата начального баланса" htmlFor="account-opening-date">
        <Input
          id="account-opening-date"
          name="openingBalanceDate"
          required
          inputMode="numeric"
          placeholder="ГГГГ-ММ-ДД"
          value={draft.openingBalanceDate}
          onChange={(event) => setDraft({ ...draft, openingBalanceDate: event.target.value })}
        />
      </Field>

      <p className="text-sm leading-6 text-slate-500">
        Изменение начального баланса или его даты влияет на будущий расчёт истории счёта.
      </p>

      {error ? (
          <p role="alert" className="rounded-xl bg-[var(--danger-soft)] px-4 py-3 text-sm text-[var(--danger)]">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link href={cancelHref} className="rounded-xl px-5 py-3 text-center text-sm font-semibold text-[var(--text-muted)]">
          Отмена
        </Link>
        <Button
          type="submit"
          disabled={isSaving}
        >
          {isSaving ? "Сохранение…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
