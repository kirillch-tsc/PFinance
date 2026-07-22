import { TransactionDetailsScreen } from "@/src/ui/transactions";
export default async function TransactionPage({ params }: Readonly<{ params: Promise<{ id: string }> }>) { const { id } = await params; return <TransactionDetailsScreen transactionId={id} />; }
