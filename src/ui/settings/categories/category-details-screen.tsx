"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Category } from "@/src/business/categories";
import { formatCategoryError, useCategories } from "./category-provider";

export function CategoryDetailsScreen({ categoryId }: Readonly<{ categoryId: string }>) {
  const { get, deactivate, reactivate } = useCategories();
  const [category, setCategory] = useState<Category | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    let isCurrent = true;
    void get(categoryId)
      .then((loaded) => {
        if (isCurrent) setCategory(loaded);
      })
      .catch((loadError) => {
        if (isCurrent) setError(formatCategoryError(loadError));
      });
    return () => {
      isCurrent = false;
    };
  }, [categoryId, get]);

  async function changeActivity() {
    if (!category) return;
    if (category.isActive && !window.confirm(`Сделать категорию «${category.name}» неактивной? История сохранится.`)) {
      return;
    }

    setIsChanging(true);
    setError(null);
    try {
      setCategory(category.isActive ? await deactivate(categoryId) : await reactivate(categoryId));
    } catch (changeError) {
      setError(formatCategoryError(changeError));
    } finally {
      setIsChanging(false);
    }
  }

  if (error && !category) {
    return <CategoryLoadError message={error} />;
  }
  if (!category) {
    return <p className="m-auto text-slate-600">Загрузка категории…</p>;
  }

  return (
    <section className="mx-auto w-full max-w-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Настройки · Категории</p>
          <h1 className="mt-1 font-serif text-3xl font-bold text-emerald-950">{category.name}</h1>
        </div>
        <span className={`rounded-full px-3 py-1 text-sm ${category.isActive ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"}`}>
          {category.isActive ? "Активная" : "Неактивная"}
        </span>
      </div>

      <dl className="mt-8 rounded-2xl border border-emerald-950/10 bg-white px-5">
        <div className="flex justify-between gap-4 py-4">
          <dt className="text-slate-500">Тип</dt>
          <dd className="font-semibold text-emerald-950">{category.kind === "income" ? "Доход" : "Расход"}</dd>
        </div>
      </dl>

      {error ? <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p> : null}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Link href={`/transactions?categoryId=${category.id}`} className="rounded-xl border border-emerald-950/15 px-5 py-3 text-center text-sm font-semibold text-emerald-950">
          Операции категории
        </Link>
        <Link href={`/settings/categories/${category.id}/edit`} className="rounded-xl bg-emerald-950 px-5 py-3 text-center text-sm font-semibold text-white">
          Редактировать
        </Link>
        <button type="button" disabled={isChanging} onClick={() => void changeActivity()} className="rounded-xl border border-emerald-950/15 px-5 py-3 text-sm font-semibold text-emerald-950 disabled:opacity-60">
          {category.isActive ? "Сделать неактивной" : "Снова активировать"}
        </button>
        <Link href="/settings/categories" className="rounded-xl px-5 py-3 text-center text-sm font-semibold text-slate-600">
          К списку
        </Link>
      </div>
    </section>
  );
}

function CategoryLoadError({ message }: Readonly<{ message: string }>) {
  return (
    <section className="m-auto text-center">
      <h1 className="font-serif text-2xl font-bold text-emerald-950">Не удалось открыть категорию</h1>
      <p role="alert" className="mt-3 text-red-800">{message}</p>
      <Link href="/settings/categories" className="mt-6 inline-flex rounded-xl bg-emerald-950 px-5 py-3 text-sm font-semibold text-white">
        Вернуться к категориям
      </Link>
    </section>
  );
}
