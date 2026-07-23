"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type {
  Category,
  CategoryDraft,
  CategoryEditPolicy,
} from "@/src/business/categories";
import { CategoryForm } from "./category-form";
import { formatCategoryError, useCategories } from "./category-provider";
import styles from "./categories.module.css";

export function CategoryEditScreen({ categoryId }: Readonly<{ categoryId: string }>) {
  const router = useRouter();
  const { get, getEditPolicy, update } = useCategories();
  const [category, setCategory] = useState<Category | null>(null);
  const [policy, setPolicy] = useState<CategoryEditPolicy | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;
    void Promise.all([get(categoryId), getEditPolicy(categoryId)])
      .then(([loadedCategory, loadedPolicy]) => {
        if (isCurrent) {
          setCategory(loadedCategory);
          setPolicy(loadedPolicy);
        }
      })
      .catch((loadError) => {
        if (isCurrent) setError(formatCategoryError(loadError));
      });
    return () => {
      isCurrent = false;
    };
  }, [categoryId, get, getEditPolicy]);

  async function handleUpdate(draft: CategoryDraft) {
    try {
      const updated = await update(categoryId, draft);
      router.push(`/settings/categories/${updated.id}`);
    } catch (updateError) {
      throw new Error(formatCategoryError(updateError));
    }
  }

  if (error) {
    return <p role="alert" className={styles.error}>{error}</p>;
  }
  if (!category || !policy) {
    return <p className={styles.status}>Загрузка категории…</p>;
  }

  return (
    <section className={styles.formPage}>
      <p>Настройки · Категории</p>
      <h1>Редактирование категории</h1>
      <CategoryForm
        initialValue={{ name: category.name, kind: category.kind }}
        kindLocked={!policy.canChangeKind}
        submitLabel="Сохранить изменения"
        cancelHref={`/settings/categories/${category.id}`}
        onSubmit={handleUpdate}
      />
    </section>
  );
}
