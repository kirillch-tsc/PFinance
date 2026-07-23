"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Account, AccountDraft, AccountEditPolicy } from "@/src/business/accounts";
import { AccountForm } from "./account-form";
import { formatAccountError, useAccounts } from "./account-provider";
import styles from "./accounts.module.css";

export function AccountEditScreen({ accountId }: Readonly<{ accountId: string }>) {
  const router = useRouter();
  const { get, getEditPolicy, update } = useAccounts();
  const [account, setAccount] = useState<Account | null>(null);
  const [policy, setPolicy] = useState<AccountEditPolicy | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;
    void Promise.all([get(accountId), getEditPolicy(accountId)])
      .then(([loadedAccount, loadedPolicy]) => {
        if (isCurrent) {
          setAccount(loadedAccount);
          setPolicy(loadedPolicy);
        }
      })
      .catch((loadError) => {
        if (isCurrent) setError(formatAccountError(loadError));
      });
    return () => {
      isCurrent = false;
    };
  }, [accountId, get, getEditPolicy]);

  async function handleUpdate(draft: AccountDraft) {
    try {
      const updated = await update(accountId, draft);
      router.push(`/settings/accounts/${updated.id}`);
    } catch (updateError) {
      throw new Error(formatAccountError(updateError));
    }
  }

  if (error) {
    return <p role="alert" className={styles.error}>{error}</p>;
  }

  if (!account || !policy) {
    return <p className={styles.status}>Загрузка счёта…</p>;
  }

  return (
    <section className={styles.formPage}>
      <p>Настройки · Счета</p>
      <h1>Редактирование счёта</h1>
      <AccountForm
        initialValue={{
          name: account.name,
          currency: account.currency,
          openingBalance: account.openingBalance,
          openingBalanceDate: account.openingBalanceDate,
        }}
        currencyLocked={!policy.canChangeCurrency}
        submitLabel="Сохранить изменения"
        cancelHref={`/settings/accounts/${account.id}`}
        onSubmit={handleUpdate}
      />
    </section>
  );
}
