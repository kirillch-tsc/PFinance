import { TransactionEditScreen } from "@/src/ui/transactions";
export default async function EditTransactionPage({ params }: Readonly<{ params: Promise<{ id: string }> }>) { const { id } = await params; return <TransactionEditScreen transactionId={id} />; }
