"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Account } from "@/src/business/accounts";
import { formatAccountError, useAccounts } from "./account-provider";

export function AccountDetailsScreen({ accountId }: Readonly<{ accountId: string }>) {
  const { get, deactivate, reactivate } = useAccounts();
  const [account, setAccount] = useState<Account | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    let isCurrent = true;
    void get(accountId)
      .then((loaded) => {
        if (isCurrent) setAccount(loaded);
      })
      .catch((loadError) => {
        if (isCurrent) setError(formatAccountError(loadError));
      });
    return () => {
      isCurrent = false;
    };
  }, [accountId, get]);

  async function changeActivity() {
    if (!account) return;
    if (account.isActive && !window.confirm(`Сделать счёт «${account.name}» неактивным? История сохранится.`)) {
      return;
    }

    setIsChanging(true);
    setError(null);
    try {
      setAccount(account.isActive ? await deactivate(accountId) : await reactivate(accountId));
    } catch (changeError) {
      setError(formatAccountError(changeError));
    } finally {
      setIsChanging(false);
    }
  }

  if (error && !account) {
    return <AccountLoadError message={error} />;
  }

  if (!account) {
    return <p className="m-auto text-slate-600">Загрузка счёта…</p>;
  }

  return (
    <section className="mx-auto w-full max-w-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Настройки · Счета</p>
          <h1 className="mt-1 font-serif text-3xl font-bold text-emerald-950">{account.name}</h1>
        </div>
        <span className={`rounded-full px-3 py-1 text-sm ${account.isActive ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"}`}>
          {account.isActive ? "Активный" : "Неактивный"}
        </span>
      </div>

      <dl className="mt-8 divide-y divide-emerald-950/10 rounded-2xl border border-emerald-950/10 bg-white px-5">
        <AccountValue label="Валюта" value={account.currency} />
        <AccountValue label="Начальный баланс" value={`${account.openingBalance} ${account.currency}`} />
        <AccountValue label="Дата начального баланса" value={account.openingBalanceDate} />
      </dl>

      {error ? <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p> : null}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Link href={`/transactions?accountId=${account.id}`} className="rounded-xl border border-emerald-950/15 px-5 py-3 text-center text-sm font-semibold text-emerald-950">
          Операции счёта
        </Link>
        <Link href={`/settings/accounts/${account.id}/edit`} className="rounded-xl bg-emerald-950 px-5 py-3 text-center text-sm font-semibold text-white">
          Редактировать
        </Link>
        <button
          type="button"
          disabled={isChanging}
          onClick={() => void changeActivity()}
          className="rounded-xl border border-emerald-950/15 px-5 py-3 text-sm font-semibold text-emerald-950 disabled:opacity-60"
        >
          {account.isActive ? "Сделать неактивным" : "Снова активировать"}
        </button>
        <Link href="/settings/accounts" className="rounded-xl px-5 py-3 text-center text-sm font-semibold text-slate-600">
          К списку
        </Link>
      </div>
    </section>
  );
}

function AccountValue({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="flex justify-between gap-4 py-4">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-right font-semibold text-emerald-950">{value}</dd>
    </div>
  );
}

function AccountLoadError({ message }: Readonly<{ message: string }>) {
  return (
    <section className="m-auto text-center">
      <h1 className="font-serif text-2xl font-bold text-emerald-950">Не удалось открыть счёт</h1>
      <p role="alert" className="mt-3 text-red-800">{message}</p>
      <Link href="/settings/accounts" className="mt-6 inline-flex rounded-xl bg-emerald-950 px-5 py-3 text-sm font-semibold text-white">
        Вернуться к счетам
      </Link>
    </section>
  );
}
