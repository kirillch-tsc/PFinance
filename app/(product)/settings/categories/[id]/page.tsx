import { CategoryDetailsScreen } from "@/src/ui/settings/categories";

export default async function CategoryPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;
  return <CategoryDetailsScreen categoryId={id} />;
}
