"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  type Account,
  type AccountDraft,
  type AccountEditPolicy,
  type AccountService,
} from "@/src/business/accounts";
import { createIdentifier } from "@/src/business/model-values";

type AccountContextValue = Readonly<{
  accounts: readonly Account[];
  isLoading: boolean;
  loadError: string | null;
  refresh: () => Promise<void>;
  get: (id: string) => Promise<Account>;
  getEditPolicy: (id: string) => Promise<AccountEditPolicy>;
  create: (draft: AccountDraft) => Promise<Account>;
  update: (id: string, draft: AccountDraft) => Promise<Account>;
  deactivate: (id: string) => Promise<Account>;
  reactivate: (id: string) => Promise<Account>;
}>;

const AccountContext = createContext<AccountContextValue | null>(null);

export function AccountProvider({
  service,
  children,
}: Readonly<{ service: AccountService; children: React.ReactNode }>) {
  const [accounts, setAccounts] = useState<readonly Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      setAccounts(await service.list());
      setLoadError(null);
    } catch (error) {
      setLoadError(formatAccountError(error));
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  useEffect(() => {
    let isCurrent = true;
    void service
      .list()
      .then((loadedAccounts) => {
        if (isCurrent) {
          setAccounts(loadedAccounts);
          setLoadError(null);
        }
      })
      .catch((error) => {
        if (isCurrent) setLoadError(formatAccountError(error));
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });
    return () => {
      isCurrent = false;
    };
  }, [service]);

  const value = useMemo<AccountContextValue>(
    () => ({
      accounts,
      isLoading,
      loadError,
      refresh,
      get: (id) => service.get(createIdentifier<"Account">(id)),
      getEditPolicy: (id) => service.getEditPolicy(createIdentifier<"Account">(id)),
      create: async (draft) => {
        const account = await service.create(draft);
        await refresh();
        return account;
      },
      update: async (id, draft) => {
        const account = await service.update(createIdentifier<"Account">(id), draft);
        await refresh();
        return account;
      },
      deactivate: async (id) => {
        const account = await service.deactivate(createIdentifier<"Account">(id));
        await refresh();
        return account;
      },
      reactivate: async (id) => {
        const account = await service.reactivate(createIdentifier<"Account">(id));
        await refresh();
        return account;
      },
    }),
    [accounts, isLoading, loadError, refresh, service],
  );

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccounts(): AccountContextValue {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("AccountProvider is missing");
  }
  return context;
}

export function formatAccountError(error: unknown): string {
  if (!(error instanceof Error)) {
    return "Не удалось выполнить действие со счётом";
  }

  const messages: Record<string, string> = {
    "Identifier must not be empty": "Некорректный идентификатор счёта",
    "Name must not be empty": "Введите название счёта",
    "Currency must be a valid ISO 4217 code": "Введите корректный трёхбуквенный код валюты",
    "Money must be a canonical decimal string": "Введите корректный начальный баланс",
    "Money must not be negative zero": "Начальный баланс не может быть отрицательным нулём",
    "Date must use YYYY-MM-DD format": "Введите дату в формате ГГГГ-ММ-ДД",
    "Date must be a real calendar date": "Введите существующую календарную дату",
  };

  if (error.message.startsWith("Money has more fractional digits")) {
    return "У начального баланса слишком много знаков после запятой для выбранной валюты";
  }

  return messages[error.message] ?? error.message;
}
