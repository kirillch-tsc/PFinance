"use client";

import { AccountService } from "@/src/business/accounts";
import { CategoryService } from "@/src/business/categories";
import { TransactionService } from "@/src/business/transactions";
import { InMemoryAccountStorage, InMemoryCategoryStorage, InMemoryTransactionStorage, TransactionReferenceIndex } from "@/src/storage/in-memory";
import { AccountProvider } from "@/src/ui/settings/accounts/account-provider";
import { CategoryProvider } from "@/src/ui/settings/categories/category-provider";
import { TransactionProvider } from "@/src/ui/transactions";

const transactionReferences = new TransactionReferenceIndex();
const accountStorage = new InMemoryAccountStorage({ transactionReferences });
const accountService = new AccountService(accountStorage, () => crypto.randomUUID());
const categoryStorage = new InMemoryCategoryStorage({ transactionReferences });
const categoryService = new CategoryService(categoryStorage, () => crypto.randomUUID());
const transactionStorage = new InMemoryTransactionStorage(transactionReferences);
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
