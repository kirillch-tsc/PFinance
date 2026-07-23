"use client";

import { AccountService } from "@/src/business/accounts";
import { CategoryService } from "@/src/business/categories";
import { TransactionService } from "@/src/business/transactions";
import { RemoteAccountStorage, RemoteCategoryStorage, RemoteTransactionStorage } from "@/src/storage/remote";
import { AccountProvider } from "@/src/ui/settings/accounts/account-provider";
import { CategoryProvider } from "@/src/ui/settings/categories/category-provider";
import { TransactionProvider } from "@/src/ui/transactions";

// Persistent runtime: storage reaches SQLite (data/pfinance.db) through the
// app/api/** route handlers, since SQLite is only accessible on the server.
// See docs/DECISIONS.md, D-008.
const accountStorage = new RemoteAccountStorage();
const accountService = new AccountService(accountStorage, () => crypto.randomUUID());
const categoryStorage = new RemoteCategoryStorage();
const categoryService = new CategoryService(categoryStorage, () => crypto.randomUUID());
const transactionStorage = new RemoteTransactionStorage();
const transactionService = new TransactionService(transactionStorage, accountStorage, categoryStorage, () => crypto.randomUUID());

export function ClientRuntime({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AccountProvider service={accountService}>
      <CategoryProvider service={categoryService}>
        <TransactionProvider service={transactionService}>{children}</TransactionProvider>
      </CategoryProvider>
    </AccountProvider>
  );
}
