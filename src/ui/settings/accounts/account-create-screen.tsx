"use client";

import { useRouter } from "next/navigation";
import type { AccountDraft } from "@/src/business/accounts";
import { AccountForm } from "./account-form";
import { formatAccountError, useAccounts } from "./account-provider";
import styles from "./accounts.module.css";

export function AccountCreateScreen() {
  const router = useRouter();
  const { create } = useAccounts();

  async function handleCreate(draft: AccountDraft) {
    try {
      const account = await create(draft);
      router.push(`/settings/accounts/${account.id}`);
    } catch (error) {
      throw new Error(formatAccountError(error));
    }
  }

  return (
    <section className={styles.formPage}>
      <p>Настройки · Счета</p>
      <h1>Новый счёт</h1>
      <AccountForm
        submitLabel="Создать счёт"
        cancelHref="/settings/accounts"
        onSubmit={handleCreate}
      />
    </section>
  );
}
