export default function Home() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-5 py-10">
      <section className="w-full max-w-md rounded-3xl border border-emerald-950/10 bg-white p-7 shadow-[0_24px_80px_rgba(18,55,43,0.10)] sm:p-9">
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-2xl bg-emerald-950 font-serif text-2xl font-bold text-white">
            P
          </div>
          <div>
            <p className="font-serif text-xl font-bold tracking-tight text-emerald-950">
              PFinance
            </p>
            <p className="text-xs text-slate-500">Семейные финансы</p>
          </div>
        </div>

        <div className="mt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Проект подготовлен
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight tracking-tight text-emerald-950">
            Простое управление семейными финансами
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-600">
            Стартовая версия PFinance. Продуктовые функции будут
            добавляться последовательно, начиная с базовой модели
            данных.
          </p>
        </div>

        <div className="mt-12 flex items-center gap-2 border-t border-slate-100 pt-5 text-sm text-slate-500">
          <span className="size-2 rounded-full bg-emerald-500" />
          Production environment is ready
        </div>
      </section>
    </main>
  );
}
