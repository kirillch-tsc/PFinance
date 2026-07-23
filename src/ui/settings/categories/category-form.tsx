"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import type { CategoryDraft } from "@/src/business/categories";
import { useUnsavedChanges } from "../use-unsaved-changes";
import styles from "./categories.module.css";

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
    <form onSubmit={handleSubmit} noValidate className={styles.form}>
      <FormField label="Название" htmlFor="category-name">
        <input
          id="category-name"
          name="name"
          required
          autoComplete="off"
          value={draft.name}
          onChange={(event) => setDraft({ ...draft, name: event.target.value })}
        />
      </FormField>

      <FormField label="Тип" htmlFor="category-kind" hint={kindLocked ? "Тип нельзя изменить после появления связанных операций." : undefined}>
        <select
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
        </select>
      </FormField>

      {error ? <p role="alert" className={styles.error}>{error}</p> : null}

      <div className={styles.formActions}>
        <Link href={cancelHref}>
          Отмена
        </Link>
        <button type="submit" disabled={isSaving}>
          {isSaving ? "Сохранение…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
function FormField({label,htmlFor,hint,children}:{label:string;htmlFor:string;hint?:string;children:React.ReactNode}){return <div className={styles.formField}><label htmlFor={htmlFor}>{label}</label>{children}{hint?<p>{hint}</p>:null}</div>}
