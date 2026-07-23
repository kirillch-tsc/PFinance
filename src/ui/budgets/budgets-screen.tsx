import Link from "next/link";
import { EmptyState } from "@/src/ui/system";

export function BudgetsScreen() {
  return (
    <section className="m-auto w-full max-w-2xl"><EmptyState
      title="Бюджет"
      message="Бюджеты появятся здесь после создания категорий расходов."
      action={<Link href="/settings/categories" className="inline-flex min-h-11 items-center rounded-xl bg-[var(--accent)] px-5 text-sm font-semibold text-white">Перейти к категориям</Link>}
    /></section>
  );
}
