import Link from "next/link";
import { EmptyState } from "@/src/ui/system";

export function HomeScreen() {
  return (
    <section className="m-auto w-full max-w-2xl"><EmptyState
      title="Главная"
      message="Чтобы увидеть состояние финансов, сначала добавьте свой первый счёт."
      action={<Link href="/settings" className="inline-flex min-h-11 items-center rounded-xl bg-[var(--accent)] px-5 text-sm font-semibold text-white">Перейти в настройки</Link>}
    /></section>
  );
}
