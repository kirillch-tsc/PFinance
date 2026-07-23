import type { AccountStorageContract } from "../../storage/contracts/account-storage.ts";
import { accountFromRecord, accountToRecord } from "../../storage/mappings/account-mapping.ts";
import { createAccount, type Account, type AccountId } from "./account.ts";

export type AccountDraft = Readonly<{
  name: string;
  currency: string;
  openingBalance: string;
  openingBalanceDate: string;
}>;

export type AccountEditPolicy = Readonly<{
  canChangeCurrency: boolean;
}>;

export type AccountUseCaseErrorCode = "account_not_found" | "currency_locked";

export class AccountUseCaseError extends Error {
  readonly code: AccountUseCaseErrorCode;

  constructor(code: AccountUseCaseErrorCode, message: string) {
    super(message);
    this.name = "AccountUseCaseError";
    this.code = code;
  }
}

export class AccountService {
  private readonly storage: AccountStorageContract;
  private readonly createId: () => string;

  constructor(storage: AccountStorageContract, createId: () => string) {
    this.storage = storage;
    this.createId = createId;
  }

  async list(): Promise<readonly Account[]> {
    const records = await this.storage.list();
    return records.map(accountFromRecord);
  }

  async get(id: AccountId): Promise<Account> {
    const record = await this.storage.getById(id);
    if (!record) {
      throw new AccountUseCaseError("account_not_found", "Счёт не найден");
    }
    return accountFromRecord(record);
  }

  async getEditPolicy(id: AccountId): Promise<AccountEditPolicy> {
    await this.get(id);
    return { canChangeCurrency: !(await this.storage.hasTransactions(id)) };
  }

  async create(draft: AccountDraft): Promise<Account> {
    const account = createAccount({
      id: this.createId(),
      ...draft,
      isActive: true,
    });
    return accountFromRecord(await this.storage.create(accountToRecord(account)));
  }

  async update(id: AccountId, draft: AccountDraft): Promise<Account> {
    const current = await this.get(id);
    const candidate = createAccount({
      id: current.id,
      ...draft,
      isActive: current.isActive,
    });

    if (candidate.currency !== current.currency && (await this.storage.hasTransactions(id))) {
      throw new AccountUseCaseError(
        "currency_locked",
        "Нельзя изменить валюту счёта после появления операций",
      );
    }

    return accountFromRecord(await this.storage.update(accountToRecord(candidate)));
  }

  async deactivate(id: AccountId): Promise<Account> {
    const current = await this.get(id);
    if (!current.isActive) {
      return current;
    }

    return accountFromRecord(
      await this.storage.update(accountToRecord({ ...current, isActive: false })),
    );
  }

  async reactivate(id: AccountId): Promise<Account> {
    const current = await this.get(id);
    if (current.isActive) {
      return current;
    }

    return accountFromRecord(
      await this.storage.update(accountToRecord({ ...current, isActive: true })),
    );
  }
}
