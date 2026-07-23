"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TransactionForm } from "./transaction-form";
import { useTransactions } from "./transaction-provider";
import styles from "./transaction-form.module.css";
export function TransactionCreateScreen() { const router = useRouter(); const { create } = useTransactions(); return <section className={styles.page}><header><Link href="/transactions" aria-label="Назад">←</Link><div><p>Операции</p><h1>Новая операция</h1></div></header><TransactionForm submitLabel="Создать операцию" cancelHref="/transactions" onSubmit={async (draft) => { const view = await create(draft); router.push(`/transactions/${view.transaction.id}`); }} /></section>; }
