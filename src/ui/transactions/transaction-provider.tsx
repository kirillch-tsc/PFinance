"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { createIdentifier } from "@/src/business/model-values";
import type { TransactionDraft, TransactionFilters, TransactionService, TransactionView } from "@/src/business/transactions";

type TransactionContextValue = Readonly<{
  version: number;
  list: (filters?: TransactionFilters) => Promise<readonly TransactionView[]>;
  get: (id: string) => Promise<TransactionView>;
  create: (draft: TransactionDraft) => Promise<TransactionView>;
  update: (id: string, draft: TransactionDraft) => Promise<TransactionView>;
  remove: (id: string) => Promise<void>;
}>;

const TransactionContext = createContext<TransactionContextValue | null>(null);

export function TransactionProvider({ service, children }: Readonly<{ service: TransactionService; children: React.ReactNode }>) {
  const [version, setVersion] = useState(0);
  const changed = useCallback(() => setVersion((value) => value + 1), []);
  const value = useMemo<TransactionContextValue>(() => ({
    version,
    list: (filters) => service.list(filters),
    get: (id) => service.get(createIdentifier<"Transaction">(id)),
    create: async (draft) => { const result = await service.create(draft); changed(); return result; },
    update: async (id, draft) => { const result = await service.update(createIdentifier<"Transaction">(id), draft); changed(); return result; },
    remove: async (id) => { await service.delete(createIdentifier<"Transaction">(id)); changed(); },
  }), [changed, service, version]);
  return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>;
}

export function useTransactions(): TransactionContextValue {
  const value = useContext(TransactionContext);
  if (!value) throw new Error("TransactionProvider is missing");
  return value;
}

export function formatTransactionError(error: unknown): string {
  if (!(error instanceof Error)) return "Не удалось выполнить действие с операцией";
  const messages: Record<string, string> = {
    "Identifier must not be empty": "Выберите обязательный счёт или категорию",
    "Money must be a canonical decimal string": "Введите корректную сумму через точку",
    "Money must not be negative zero": "Сумма не может быть отрицательным нулём",
    "Transaction amount must be greater than zero": "Сумма должна быть больше нуля",
    "DateTime must include a date, time and UTC offset": "Введите дату и время операции",
    "DateTime must be valid": "Введите корректную дату и время",
    "Transaction date must not be before the account opening balance date": "Дата операции раньше даты начального баланса счёта",
    "Transaction date must not be before the destination account opening balance date": "Дата перевода раньше даты начального баланса счёта назначения",
    "Transfer accounts must be different": "Для перевода выберите разные счета",
    "Transfer accounts must use the same currency": "Перевод возможен только между счетами в одной валюте",
    "Income transaction requires a matching category": "Выберите категорию дохода",
    "Expense transaction requires a matching category": "Выберите категорию расхода",
    "Currency must be a valid ISO 4217 code": "Выберите корректную валюту",
  };
  if (error.message.startsWith("Money has more fractional digits")) return "У суммы слишком много знаков после запятой для валюты счёта";
  return messages[error.message] ?? error.message;
}
