import type { Account } from "../../business/accounts/account.ts";
import type { Category } from "../../business/categories/category.ts";
import {
  createTransaction,
  type Transaction,
} from "../../business/transactions/transaction.ts";
import { assertModel } from "../../business/validation/model-validation-error.ts";
import type { TransactionRecord } from "../records/transaction-record.ts";

export type TransactionReferences = Readonly<{
  account: Account;
  destinationAccount?: Account;
  category?: Category;
}>;

export function transactionToRecord(transaction: Transaction): TransactionRecord {
  const common = {
    id: transaction.id,
    amount: transaction.amount,
    occurredAt: transaction.occurredAt,
    accountId: transaction.accountId,
    note: transaction.note ?? null,
  };

  if (transaction.type === "transfer") {
    return {
      ...common,
      type: "transfer",
      destinationAccountId: transaction.destinationAccountId,
      categoryId: null,
    };
  }

  return {
    ...common,
    type: transaction.type,
    destinationAccountId: null,
    categoryId: transaction.categoryId,
  };
}

export function transactionFromRecord(
  record: TransactionRecord,
  references: TransactionReferences,
): Transaction {
  assertModel(references.account.id === record.accountId, "Source account reference does not match");

  if (record.type === "transfer") {
    assertModel(
      references.destinationAccount?.id === record.destinationAccountId,
      "Destination account reference does not match",
    );
    assertModel(references.category === undefined, "Transfer must not have a category reference");

    return createTransaction({
      id: record.id,
      type: "transfer",
      amount: record.amount,
      occurredAt: record.occurredAt,
      account: references.account,
      destinationAccount: references.destinationAccount,
      note: record.note ?? undefined,
    });
  }

  assertModel(references.destinationAccount === undefined, "Categorized transaction has no destination");
  assertModel(references.category?.id === record.categoryId, "Category reference does not match");

  return createTransaction({
    id: record.id,
    type: record.type,
    amount: record.amount,
    occurredAt: record.occurredAt,
    account: references.account,
    category: references.category,
    note: record.note ?? undefined,
  });
}
