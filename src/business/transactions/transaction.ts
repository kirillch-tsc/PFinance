import type { Account } from "../accounts/account.ts";
import type { Category } from "../categories/category.ts";
import {
  assertMoneyMatchesCurrency,
  assertPositiveMoney,
  createDateTime,
  createIdentifier,
  createMoney,
  createOptionalNote,
  datePart,
  isDateBefore,
  type DateTime,
  type Identifier,
  type Money,
  type TransactionType,
} from "../model-values.ts";
import { assertModel } from "../validation/model-validation-error.ts";

export type TransactionId = Identifier<"Transaction">;

type TransactionBase = Readonly<{
  id: TransactionId;
  amount: Money;
  occurredAt: DateTime;
  accountId: Account["id"];
  note?: string;
}>;

export type IncomeTransaction = TransactionBase &
  Readonly<{
    type: "income";
    categoryId: Category["id"];
    destinationAccountId?: never;
  }>;

export type ExpenseTransaction = TransactionBase &
  Readonly<{
    type: "expense";
    categoryId: Category["id"];
    destinationAccountId?: never;
  }>;

export type TransferTransaction = TransactionBase &
  Readonly<{
    type: "transfer";
    destinationAccountId: Account["id"];
    categoryId?: never;
  }>;

export type Transaction = IncomeTransaction | ExpenseTransaction | TransferTransaction;

type TransactionInputBase = Readonly<{
  id: string;
  amount: string;
  occurredAt: string;
  account: Account;
  note?: string;
}>;

export type CategorizedTransactionInput = TransactionInputBase &
  Readonly<{
    type: "income" | "expense";
    category: Category;
    destinationAccount?: never;
  }>;

export type TransferTransactionInput = TransactionInputBase &
  Readonly<{
    type: "transfer";
    destinationAccount: Account;
    category?: never;
  }>;

export type TransactionInput = CategorizedTransactionInput | TransferTransactionInput;

export function createTransaction(input: TransactionInput): Transaction {
  const id = createIdentifier<"Transaction">(input.id);
  const amount = createMoney(input.amount);
  const occurredAt = createDateTime(input.occurredAt);
  const note = createOptionalNote(input.note);

  assertPositiveMoney(amount, "Transaction amount");
  assertMoneyMatchesCurrency(amount, input.account.currency);
  assertModel(
    !isDateBefore(datePart(occurredAt), input.account.openingBalanceDate),
    "Transaction date must not be before the account opening balance date",
  );

  const common = {
    id,
    amount,
    occurredAt,
    accountId: input.account.id,
    ...(note ? { note } : {}),
  };

  if (input.type === "transfer") {
    assertModel(
      !("category" in input) || input.category === undefined,
      "Transfer must not have a category",
    );
    assertModel(
      input.account.id !== input.destinationAccount.id,
      "Transfer accounts must be different",
    );
    assertModel(
      input.account.currency === input.destinationAccount.currency,
      "Transfer accounts must use the same currency",
    );
    assertModel(
      !isDateBefore(datePart(occurredAt), input.destinationAccount.openingBalanceDate),
      "Transaction date must not be before the destination account opening balance date",
    );

    return Object.freeze({
      ...common,
      type: "transfer",
      destinationAccountId: input.destinationAccount.id,
    });
  }

  assertModel(
    !("destinationAccount" in input) || input.destinationAccount === undefined,
    "Income and expense must not have a destination account",
  );
  assertModel(
    input.category.kind === input.type,
    `${capitalize(input.type)} transaction requires a matching category`,
  );

  return Object.freeze({
    ...common,
    type: input.type,
    categoryId: input.category.id,
  });
}

export function isTransactionType(value: string): value is TransactionType {
  return value === "income" || value === "expense" || value === "transfer";
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
