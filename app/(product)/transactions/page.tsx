import { TransactionsScreen } from "@/src/ui/transactions";
import { Suspense } from "react";

export default function TransactionsPage() {
  return <Suspense fallback={<p className="m-auto text-slate-600">Загрузка операций…</p>}><TransactionsScreen /></Suspense>;
}
