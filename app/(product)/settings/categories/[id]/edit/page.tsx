import { CategoryEditScreen } from "@/src/ui/settings/categories";

export default async function EditCategoryPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;
  return <CategoryEditScreen categoryId={id} />;
}
