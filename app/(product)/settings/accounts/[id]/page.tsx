import { AccountDetailsScreen } from "@/src/ui/settings/accounts";

export default async function AccountPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;
  return <AccountDetailsScreen accountId={id} />;
}
