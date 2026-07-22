type TransactionRecordBase = Readonly<{
  id: string;
  amount: string;
  occurredAt: string;
  accountId: string;
  note: string | null;
}>;

export type IncomeTransactionRecord = TransactionRecordBase &
  Readonly<{
    type: "income";
    destinationAccountId: null;
    categoryId: string;
  }>;

export type ExpenseTransactionRecord = TransactionRecordBase &
  Readonly<{
    type: "expense";
    destinationAccountId: null;
    categoryId: string;
  }>;

export type TransferTransactionRecord = TransactionRecordBase &
  Readonly<{
    type: "transfer";
    destinationAccountId: string;
    categoryId: null;
  }>;

export type TransactionRecord =
  | IncomeTransactionRecord
  | ExpenseTransactionRecord
  | TransferTransactionRecord;
