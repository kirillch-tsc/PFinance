"use client";
import { useRouter } from "next/navigation";
import { TransactionForm } from "./transaction-form";
import { useTransactions } from "./transaction-provider";
export function TransactionCreateScreen() { const router = useRouter(); const { create } = useTransactions(); return <section className="mx-auto w-full max-w-xl"><p className="text-sm text-slate-500">Операции</p><h1 className="mt-1 font-serif text-3xl font-bold text-emerald-950">Новая операция</h1><TransactionForm submitLabel="Создать операцию" cancelHref="/transactions" onSubmit={async (draft) => { const view = await create(draft); router.push(`/transactions/${view.transaction.id}`); }} /></section>; }
