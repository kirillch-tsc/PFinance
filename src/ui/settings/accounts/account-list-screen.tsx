"use client";

import Link from "next/link";
import { useAccounts } from "./account-provider";

export function AccountListScreen() {
  const { accounts, isLoading, loadError, refresh } = useAccounts();
  const activeAccounts = accounts.filter((account) => account.isActive);
  const inactiveAccounts = accounts.filter((account) => !account.isActive);

  return (
    <section className="mx-auto w-full max-w-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Настройки</p>
          <h1 className="mt-1 font-serif text-3xl font-bold text-emerald-950">Счета</h1>
        </div>
        <Link href="/settings/accounts/new" className="rounded-xl bg-emerald-950 px-4 py-3 text-sm font-semibold text-white">
          Создать счёт
        </Link>
      </div>

      {isLoading ? <StatusMessage>Загрузка счетов…</StatusMessage> : null}

      {loadError ? (
        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800">
          <p>{loadError}</p>
          <button type="button" onClick={() => void refresh()} className="mt-3 text-sm font-semibold underline">
            Повторить
          </button>
        </div>
      ) : null}

      {!isLoading && !loadError && accounts.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-emerald-950/10 bg-white p-7 text-center">
          <h2 className="font-serif text-2xl font-bold text-emerald-950">Счетов пока нет</h2>
          <p className="mt-3 text-slate-600">Создайте первый счёт, чтобы задать начальное состояние финансов.</p>
          <Link href="/settings/accounts/new" className="mt-6 inline-flex rounded-xl bg-emerald-950 px-5 py-3 text-sm font-semibold text-white">
            Создать первый счёт
          </Link>
        </div>
      ) : null}

      {activeAccounts.length > 0 ? (
        <AccountGroup title="Активные счета" accounts={activeAccounts} />
      ) : null}

      {inactiveAccounts.length > 0 ? (
        <AccountGroup title="Неактивные счета" accounts={inactiveAccounts} />
      ) : null}
    </section>
  );
}

function AccountGroup({
  title,
  accounts,
}: Readonly<{ title: string; accounts: ReturnType<typeof useAccounts>["accounts"] }>) {
  return (
    <div className="mt-8">
      <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">{title}</h2>
      <ul className="mt-3 space-y-3">
        {accounts.map((account) => (
          <li key={account.id}>
            <Link
              href={`/settings/accounts/${account.id}`}
              className="flex items-center justify-between gap-4 rounded-2xl border border-emerald-950/10 bg-white p-5 hover:border-emerald-950/25"
            >
              <div>
                <p className="font-semibold text-emerald-950">{account.name}</p>
                <p className="mt-1 text-sm text-slate-500">
                  Начальный баланс: {account.openingBalance} {account.currency}
                </p>
              </div>
              <span className="text-sm text-slate-500">Открыть</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatusMessage({ children }: Readonly<{ children: React.ReactNode }>) {
  return <p className="mt-8 rounded-2xl bg-white p-5 text-slate-600">{children}</p>;
}
