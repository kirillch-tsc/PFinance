"use client";

import Link from "next/link";
import type { Category } from "@/src/business/categories";
import type { CategoryKind } from "@/src/business/model-values";
import { useCategories } from "./category-provider";

export function CategoryListScreen() {
  const { categories, isLoading, loadError, refresh } = useCategories();

  return (
    <section className="mx-auto w-full max-w-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Настройки</p>
          <h1 className="mt-1 font-serif text-3xl font-bold text-emerald-950">Категории</h1>
        </div>
        <Link href="/settings/categories/new" className="rounded-xl bg-emerald-950 px-4 py-3 text-sm font-semibold text-white">
          Создать категорию
        </Link>
      </div>

      {isLoading ? <p className="mt-8 rounded-2xl bg-white p-5 text-slate-600">Загрузка категорий…</p> : null}

      {loadError ? (
        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800">
          <p>{loadError}</p>
          <button type="button" onClick={() => void refresh()} className="mt-3 text-sm font-semibold underline">
            Повторить
          </button>
        </div>
      ) : null}

      {!isLoading && !loadError && categories.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-emerald-950/10 bg-white p-7 text-center">
          <h2 className="font-serif text-2xl font-bold text-emerald-950">Категорий пока нет</h2>
          <p className="mt-3 text-slate-600">Создайте категории доходов и расходов для будущих операций.</p>
          <Link href="/settings/categories/new" className="mt-6 inline-flex rounded-xl bg-emerald-950 px-5 py-3 text-sm font-semibold text-white">
            Создать первую категорию
          </Link>
        </div>
      ) : null}

      {!isLoading && !loadError && categories.length > 0 ? (
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <KindGroup title="Доходы" kind="income" categories={categories} />
          <KindGroup title="Расходы" kind="expense" categories={categories} />
        </div>
      ) : null}
    </section>
  );
}

function KindGroup({
  title,
  kind,
  categories,
}: Readonly<{ title: string; kind: CategoryKind; categories: readonly Category[] }>) {
  const active = categories.filter((category) => category.kind === kind && category.isActive);
  const inactive = categories.filter((category) => category.kind === kind && !category.isActive);

  return (
    <section>
      <h2 className="font-serif text-2xl font-bold text-emerald-950">{title}</h2>
      {active.length === 0 && inactive.length === 0 ? (
        <p className="mt-3 rounded-2xl border border-dashed border-emerald-950/15 p-5 text-sm text-slate-500">
          Категорий этого типа пока нет.
        </p>
      ) : null}
      <CategoryItems title="Активные" categories={active} />
      <CategoryItems title="Неактивные" categories={inactive} />
    </section>
  );
}

function CategoryItems({ title, categories }: Readonly<{ title: string; categories: readonly Category[] }>) {
  if (categories.length === 0) return null;

  return (
    <div className="mt-5">
      <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{title}</h3>
      <ul className="mt-2 space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`/settings/categories/${category.id}`} className="flex items-center justify-between rounded-2xl border border-emerald-950/10 bg-white p-4 hover:border-emerald-950/25">
              <span className="font-semibold text-emerald-950">{category.name}</span>
              <span className="text-sm text-slate-500">Открыть</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
