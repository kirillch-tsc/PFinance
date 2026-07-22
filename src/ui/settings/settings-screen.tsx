import Link from "next/link";

export function SettingsScreen() {
  return (
    <section className="mx-auto w-full max-w-2xl">
      <p className="text-sm text-slate-500">PFinance</p>
      <h1 className="mt-1 font-serif text-3xl font-bold text-emerald-950">Настройки</h1>
      <p className="mt-3 text-slate-600">Управление счетами и категориями финансового учёта.</p>

      <div className="mt-8 space-y-3">
        <SettingsLink
          href="/settings/accounts"
          title="Счета"
          description="Создание, просмотр и управление активностью"
        />
        <SettingsLink
          href="/settings/categories"
          title="Категории"
          description="Отдельные категории доходов и расходов"
        />
      </div>
    </section>
  );
}

function SettingsLink({
  href,
  title,
  description,
}: Readonly<{ href: string; title: string; description: string }>) {
  return (
    <Link href={href} className="flex items-center justify-between gap-4 rounded-2xl border border-emerald-950/10 bg-white p-5 hover:border-emerald-950/25">
      <div>
        <h2 className="font-semibold text-emerald-950">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      <span className="text-sm text-slate-500">Открыть</span>
    </Link>
  );
}
