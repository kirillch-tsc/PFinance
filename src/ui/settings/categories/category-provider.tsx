"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  type Category,
  type CategoryDraft,
  type CategoryEditPolicy,
  type CategoryService,
} from "@/src/business/categories";
import { createIdentifier } from "@/src/business/model-values";

type CategoryContextValue = Readonly<{
  categories: readonly Category[];
  isLoading: boolean;
  loadError: string | null;
  refresh: () => Promise<void>;
  get: (id: string) => Promise<Category>;
  getEditPolicy: (id: string) => Promise<CategoryEditPolicy>;
  create: (draft: CategoryDraft) => Promise<Category>;
  update: (id: string, draft: CategoryDraft) => Promise<Category>;
  deactivate: (id: string) => Promise<Category>;
  reactivate: (id: string) => Promise<Category>;
}>;

const CategoryContext = createContext<CategoryContextValue | null>(null);

export function CategoryProvider({
  service,
  children,
}: Readonly<{ service: CategoryService; children: React.ReactNode }>) {
  const [categories, setCategories] = useState<readonly Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      setCategories(await service.list());
      setLoadError(null);
    } catch (error) {
      setLoadError(formatCategoryError(error));
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  useEffect(() => {
    let isCurrent = true;
    void service
      .list()
      .then((loadedCategories) => {
        if (isCurrent) {
          setCategories(loadedCategories);
          setLoadError(null);
        }
      })
      .catch((error) => {
        if (isCurrent) setLoadError(formatCategoryError(error));
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });
    return () => {
      isCurrent = false;
    };
  }, [service]);

  const value = useMemo<CategoryContextValue>(
    () => ({
      categories,
      isLoading,
      loadError,
      refresh,
      get: (id) => service.get(createIdentifier<"Category">(id)),
      getEditPolicy: (id) => service.getEditPolicy(createIdentifier<"Category">(id)),
      create: async (draft) => {
        const category = await service.create(draft);
        await refresh();
        return category;
      },
      update: async (id, draft) => {
        const category = await service.update(createIdentifier<"Category">(id), draft);
        await refresh();
        return category;
      },
      deactivate: async (id) => {
        const category = await service.deactivate(createIdentifier<"Category">(id));
        await refresh();
        return category;
      },
      reactivate: async (id) => {
        const category = await service.reactivate(createIdentifier<"Category">(id));
        await refresh();
        return category;
      },
    }),
    [categories, isLoading, loadError, refresh, service],
  );

  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
}

export function useCategories(): CategoryContextValue {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("CategoryProvider is missing");
  }
  return context;
}

export function formatCategoryError(error: unknown): string {
  if (!(error instanceof Error)) {
    return "Не удалось выполнить действие с категорией";
  }

  const messages: Record<string, string> = {
    "Identifier must not be empty": "Некорректный идентификатор категории",
    "Name must not be empty": "Введите название категории",
    "Category kind must be income or expense": "Выберите тип категории",
    "Active category name must be unique within its kind":
      "Активная категория с таким названием и типом уже существует",
  };

  return messages[error.message] ?? error.message;
}
