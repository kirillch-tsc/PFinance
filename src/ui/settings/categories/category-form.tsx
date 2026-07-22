"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import type { CategoryDraft } from "@/src/business/categories";
import { Button, Field, Input, Select } from "@/src/ui/system";
import { useUnsavedChanges } from "../use-unsaved-changes";

type CategoryFormProps = Readonly<{
  initialValue?: CategoryDraft;
  kindLocked?: boolean;
  submitLabel: string;
  cancelHref: string;
  onSubmit: (draft: CategoryDraft) => Promise<void>;
}>;

const emptyDraft: CategoryDraft = { name: "", kind: "" };

export function CategoryForm({
  initialValue = emptyDraft,
  kindLocked = false,
  submitLabel,
  cancelHref,
  onSubmit,
}: CategoryFormProps) {
  const [draft, setDraft] = useState<CategoryDraft>(initialValue);
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
      setError(submitError instanceof Error ? submitError.message : "Не удалось сохранить категорию");
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
      <Field label="Название" htmlFor="category-name">
        <Input
          id="category-name"
          name="name"
          required
          autoComplete="off"
          value={draft.name}
          onChange={(event) => setDraft({ ...draft, name: event.target.value })}
        />
      </Field>

      <Field label="Тип" htmlFor="category-kind" hint={kindLocked ? "Тип нельзя изменить после появления связанных операций." : undefined}>
        <Select
          id="category-kind"
          name="kind"
          required
          disabled={kindLocked}
          value={draft.kind}
          onChange={(event) => setDraft({ ...draft, kind: event.target.value })}
        >
          <option value="">Выберите тип</option>
          <option value="income">Доход</option>
          <option value="expense">Расход</option>
        </Select>
      </Field>

      {error ? <p role="alert" className="rounded-xl bg-[var(--danger-soft)] px-4 py-3 text-sm text-[var(--danger)]">{error}</p> : null}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link href={cancelHref} className="rounded-xl px-5 py-3 text-center text-sm font-semibold text-[var(--text-muted)]">
          Отмена
        </Link>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Сохранение…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
