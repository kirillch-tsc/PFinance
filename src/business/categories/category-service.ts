import type { CategoryStorageContract } from "../../storage/contracts/category-storage.ts";
import { categoryFromRecord, categoryToRecord } from "../../storage/mappings/category-mapping.ts";
import {
  assertUniqueActiveCategoryName,
  createCategory,
  type Category,
  type CategoryId,
} from "./category.ts";

export type CategoryDraft = Readonly<{
  name: string;
  kind: string;
}>;

export type CategoryEditPolicy = Readonly<{
  canChangeKind: boolean;
}>;

export type CategoryUseCaseErrorCode = "category_not_found" | "kind_locked";

export class CategoryUseCaseError extends Error {
  readonly code: CategoryUseCaseErrorCode;

  constructor(code: CategoryUseCaseErrorCode, message: string) {
    super(message);
    this.name = "CategoryUseCaseError";
    this.code = code;
  }
}

export class CategoryService {
  private readonly storage: CategoryStorageContract;
  private readonly createId: () => string;

  constructor(storage: CategoryStorageContract, createId: () => string) {
    this.storage = storage;
    this.createId = createId;
  }

  async list(): Promise<readonly Category[]> {
    return (await this.storage.list()).map(categoryFromRecord);
  }

  async get(id: CategoryId): Promise<Category> {
    const record = await this.storage.getById(id);
    if (!record) {
      throw new CategoryUseCaseError("category_not_found", "Категория не найдена");
    }
    return categoryFromRecord(record);
  }

  async getEditPolicy(id: CategoryId): Promise<CategoryEditPolicy> {
    await this.get(id);
    return { canChangeKind: !(await this.storage.hasTransactions(id)) };
  }

  async create(draft: CategoryDraft): Promise<Category> {
    const category = createCategory({
      id: this.createId(),
      ...draft,
      isActive: true,
    });
    assertUniqueActiveCategoryName(category, await this.list());
    return categoryFromRecord(await this.storage.create(categoryToRecord(category)));
  }

  async update(id: CategoryId, draft: CategoryDraft): Promise<Category> {
    const current = await this.get(id);
    const candidate = createCategory({
      id: current.id,
      ...draft,
      isActive: current.isActive,
    });

    if (candidate.kind !== current.kind && (await this.storage.hasTransactions(id))) {
      throw new CategoryUseCaseError(
        "kind_locked",
        "Нельзя изменить тип категории после появления связанных операций",
      );
    }

    assertUniqueActiveCategoryName(candidate, await this.list());
    return categoryFromRecord(await this.storage.update(categoryToRecord(candidate)));
  }

  async deactivate(id: CategoryId): Promise<Category> {
    const current = await this.get(id);
    if (!current.isActive) {
      return current;
    }
    return categoryFromRecord(
      await this.storage.update(categoryToRecord({ ...current, isActive: false })),
    );
  }

  async reactivate(id: CategoryId): Promise<Category> {
    const current = await this.get(id);
    if (current.isActive) {
      return current;
    }

    const candidate = { ...current, isActive: true };
    assertUniqueActiveCategoryName(candidate, await this.list());
    return categoryFromRecord(await this.storage.update(categoryToRecord(candidate)));
  }
}
