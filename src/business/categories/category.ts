import {
  CATEGORY_KINDS,
  createEntityName,
  createIdentifier,
  type CategoryKind,
  type Identifier,
} from "../model-values.ts";
import { assertModel } from "../validation/model-validation-error.ts";

export type CategoryId = Identifier<"Category">;

export type Category = Readonly<{
  id: CategoryId;
  name: string;
  kind: CategoryKind;
  isActive: boolean;
}>;

export type CategoryInput = Readonly<{
  id: string;
  name: string;
  kind: string;
  isActive: boolean;
}>;

export function createCategory(input: CategoryInput): Category {
  assertModel(
    CATEGORY_KINDS.includes(input.kind as CategoryKind),
    "Category kind must be income or expense",
  );

  return Object.freeze({
    id: createIdentifier<"Category">(input.id),
    name: createEntityName(input.name),
    kind: input.kind as CategoryKind,
    isActive: input.isActive,
  });
}

export function assertUniqueActiveCategoryName(
  candidate: Category,
  existingCategories: readonly Category[],
): void {
  if (!candidate.isActive) {
    return;
  }

  const normalizedName = candidate.name.toLocaleLowerCase("ru");
  const hasDuplicate = existingCategories.some(
    (category) =>
      category.id !== candidate.id &&
      category.isActive &&
      category.kind === candidate.kind &&
      category.name.toLocaleLowerCase("ru") === normalizedName,
  );

  assertModel(!hasDuplicate, "Active category name must be unique within its kind");
}
