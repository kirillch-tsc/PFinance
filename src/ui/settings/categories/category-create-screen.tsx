"use client";

import { useRouter } from "next/navigation";
import type { CategoryDraft } from "@/src/business/categories";
import { CategoryForm } from "./category-form";
import { formatCategoryError, useCategories } from "./category-provider";
import styles from "./categories.module.css";

export function CategoryCreateScreen() {
  const router = useRouter();
  const { create } = useCategories();

  async function handleCreate(draft: CategoryDraft) {
    try {
      const category = await create(draft);
      router.push(`/settings/categories/${category.id}`);
    } catch (error) {
      throw new Error(formatCategoryError(error));
    }
  }

  return (
    <section className={styles.formPage}>
      <p>Настройки · Категории</p>
      <h1>Новая категория</h1>
      <CategoryForm submitLabel="Создать категорию" cancelHref="/settings/categories" onSubmit={handleCreate} />
    </section>
  );
}
