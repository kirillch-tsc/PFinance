import { AccountEditScreen } from "@/src/ui/settings/accounts";

export default async function EditAccountPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;
  return <AccountEditScreen accountId={id} />;
}
