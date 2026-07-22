import type { Account, AccountId } from "../accounts/account.ts";
import type { Category, CategoryId } from "../categories/category.ts";
import { createCalendarDate, createCurrencyCode, createIdentifier, type TransactionType } from "../model-values.ts";
import type { AccountStorageContract } from "../../storage/contracts/account-storage.ts";
import type { CategoryStorageContract } from "../../storage/contracts/category-storage.ts";
import type { TransactionSelection, TransactionStorageContract } from "../../storage/contracts/transaction-storage.ts";
import { accountFromRecord } from "../../storage/mappings/account-mapping.ts";
import { categoryFromRecord } from "../../storage/mappings/category-mapping.ts";
import { transactionFromRecord, transactionToRecord } from "../../storage/mappings/transaction-mapping.ts";
import type { TransactionRecord } from "../../storage/records/transaction-record.ts";
import { createTransaction, type Transaction, type TransactionId } from "./transaction.ts";

export type TransactionDraft = Readonly<{ type: string; amount: string; occurredAt: string; accountId: string; destinationAccountId?: string; categoryId?: string; note?: string }>;
export type TransactionFilters = Readonly<{ periodStart?: string; periodEnd?: string; type?: TransactionType; accountId?: string; categoryId?: string; currency?: string; search?: string }>;
export type TransactionView = Readonly<{ transaction: Transaction; account: Account; destinationAccount?: Account; category?: Category }>;

export class TransactionUseCaseError extends Error {
  readonly code: string;
  constructor(code: string, message: string) { super(message); this.name = "TransactionUseCaseError"; this.code = code; }
}

export class TransactionService {
  private readonly storage: TransactionStorageContract;
  private readonly accounts: AccountStorageContract;
  private readonly categories: CategoryStorageContract;
  private readonly createId: () => string;

  constructor(storage: TransactionStorageContract, accounts: AccountStorageContract, categories: CategoryStorageContract, createId: () => string) {
    this.storage = storage;
    this.accounts = accounts;
    this.categories = categories;
    this.createId = createId;
  }

  async list(filters: TransactionFilters = {}): Promise<readonly TransactionView[]> {
    const selection: TransactionSelection = {
      ...(filters.periodStart ? { periodStart: createCalendarDate(filters.periodStart) } : {}),
      ...(filters.periodEnd ? { periodEnd: createCalendarDate(filters.periodEnd) } : {}),
      ...(filters.type ? { types: [filters.type] } : {}),
      ...(filters.accountId ? { accountIds: [createIdentifier<"Account">(filters.accountId)] } : {}),
      ...(filters.categoryId ? { categoryIds: [createIdentifier<"Category">(filters.categoryId)] } : {}),
    };
    if (selection.periodStart && selection.periodEnd && selection.periodStart > selection.periodEnd) throw new TransactionUseCaseError("invalid_period", "Начало периода не может быть позже конца");
    const views = await Promise.all((await this.storage.list(selection)).map((record) => this.hydrate(record)));
    const currency = filters.currency ? createCurrencyCode(filters.currency) : undefined;
    const search = filters.search?.trim().toLocaleLowerCase("ru");
    return views.filter((view) => !currency || view.account.currency === currency).filter((view) => {
      if (!search) return true;
      return [view.transaction.note, view.account.name, view.destinationAccount?.name, view.category?.name].some((value) => value?.toLocaleLowerCase("ru").includes(search));
    });
  }

  async get(id: TransactionId): Promise<TransactionView> {
    const record = await this.storage.getById(id);
    if (!record) throw new TransactionUseCaseError("transaction_not_found", "Операция не найдена");
    return this.hydrate(record);
  }

  async create(draft: TransactionDraft): Promise<TransactionView> {
    const transaction = await this.build(this.createId(), draft);
    await this.assertReferencesAvailable(transaction);
    return this.hydrate(await this.storage.create(transactionToRecord(transaction)));
  }

  async update(id: TransactionId, draft: TransactionDraft): Promise<TransactionView> {
    const current = await this.get(id);
    const transaction = await this.build(current.transaction.id, draft);
    await this.assertReferencesAvailable(transaction, current.transaction);
    return this.hydrate(await this.storage.update(transactionToRecord(transaction)));
  }

  async delete(id: TransactionId): Promise<void> { await this.get(id); await this.storage.delete(id); }

  private async build(id: string, draft: TransactionDraft): Promise<Transaction> {
    if (draft.type !== "income" && draft.type !== "expense" && draft.type !== "transfer") throw new TransactionUseCaseError("invalid_type", "Выберите тип операции");
    const account = await this.getAccount(draft.accountId);
    if (draft.type === "transfer") {
      const destinationAccount = await this.getAccount(draft.destinationAccountId ?? "");
      return createTransaction({ id, type: "transfer", amount: draft.amount, occurredAt: draft.occurredAt, account, destinationAccount, note: draft.note });
    }
    const category = await this.getCategory(draft.categoryId ?? "");
    return createTransaction({ id, type: draft.type, amount: draft.amount, occurredAt: draft.occurredAt, account, category, note: draft.note });
  }

  private async assertReferencesAvailable(candidate: Transaction, current?: Transaction): Promise<void> {
    const source = await this.getAccount(candidate.accountId);
    if (!source.isActive && current?.accountId !== source.id) throw new TransactionUseCaseError("inactive_account", "Выбранный счёт неактивен");
    if (candidate.type === "transfer") {
      const destination = await this.getAccount(candidate.destinationAccountId);
      const wasDestination = current?.type === "transfer" && current.destinationAccountId === destination.id;
      if (!destination.isActive && !wasDestination) throw new TransactionUseCaseError("inactive_destination", "Счёт назначения неактивен");
      return;
    }
    const category = await this.getCategory(candidate.categoryId);
    const wasCategory = current?.type !== "transfer" && current?.categoryId === category.id;
    if (!category.isActive && !wasCategory) throw new TransactionUseCaseError("inactive_category", "Выбранная категория неактивна");
  }

  private async hydrate(record: TransactionRecord): Promise<TransactionView> {
    const account = await this.getAccount(record.accountId);
    const destinationAccount = record.destinationAccountId ? await this.getAccount(record.destinationAccountId) : undefined;
    const category = record.categoryId ? await this.getCategory(record.categoryId) : undefined;
    return { transaction: transactionFromRecord(record, { account, destinationAccount, category }), account, ...(destinationAccount ? { destinationAccount } : {}), ...(category ? { category } : {}) };
  }

  private async getAccount(value: string | AccountId): Promise<Account> {
    const id = createIdentifier<"Account">(value);
    const record = await this.accounts.getById(id);
    if (!record) throw new TransactionUseCaseError("account_not_found", "Счёт не найден");
    return accountFromRecord(record);
  }

  private async getCategory(value: string | CategoryId): Promise<Category> {
    const id = createIdentifier<"Category">(value);
    const record = await this.categories.getById(id);
    if (!record) throw new TransactionUseCaseError("category_not_found", "Категория не найдена");
    return categoryFromRecord(record);
  }
}
