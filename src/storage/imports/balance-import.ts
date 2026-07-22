import type { AccountRecord, CategoryRecord, TransactionRecord } from "../records/index.ts";

export const BALANCE_IMPORT_ACCOUNT: AccountRecord = {
  "id": "balance-account-main",
  "name": "Основной баланс",
  "currency": "RUB",
  "openingBalance": "548253",
  "openingBalanceDate": "2025-10-01",
  "isActive": true,
  "importMetadata": {
    "sourceWorkbook": "Баланс.xlsx",
    "accountType": "cash"
  }
};

export const BALANCE_IMPORT_CATEGORIES: readonly CategoryRecord[] = [
  {
    "id": "balance-category-income-1",
    "name": "Катя ЗП",
    "kind": "income",
    "isActive": true
  },
  {
    "id": "balance-category-income-2",
    "name": "Кирилл ЗП",
    "kind": "income",
    "isActive": true
  },
  {
    "id": "balance-category-income-3",
    "name": "АА",
    "kind": "income",
    "isActive": true
  },
  {
    "id": "balance-category-income-4",
    "name": "TSC",
    "kind": "income",
    "isActive": true
  },
  {
    "id": "balance-category-income-5",
    "name": "Прочее",
    "kind": "income",
    "isActive": true
  },
  {
    "id": "balance-category-expense-6",
    "name": "Прочее",
    "kind": "expense",
    "isActive": true
  },
  {
    "id": "balance-category-income-7",
    "name": "Квартира",
    "kind": "income",
    "isActive": true
  },
  {
    "id": "balance-category-income-8",
    "name": "Банк",
    "kind": "income",
    "isActive": true
  },
  {
    "id": "balance-category-expense-9",
    "name": "Кредиты",
    "kind": "expense",
    "isActive": true
  },
  {
    "id": "balance-category-income-10",
    "name": "Долги",
    "kind": "income",
    "isActive": true
  },
  {
    "id": "balance-category-expense-11",
    "name": "Долги",
    "kind": "expense",
    "isActive": true
  },
  {
    "id": "balance-category-expense-12",
    "name": "Катя",
    "kind": "expense",
    "isActive": true
  },
  {
    "id": "balance-category-expense-13",
    "name": "Кирилл",
    "kind": "expense",
    "isActive": true
  },
  {
    "id": "balance-category-expense-14",
    "name": "Алиса",
    "kind": "expense",
    "isActive": true
  },
  {
    "id": "balance-category-expense-15",
    "name": "Италия",
    "kind": "expense",
    "isActive": true
  },
  {
    "id": "balance-category-expense-16",
    "name": "Врачи",
    "kind": "expense",
    "isActive": true
  },
  {
    "id": "balance-category-expense-17",
    "name": "Страховки/Налоги",
    "kind": "expense",
    "isActive": true
  },
  {
    "id": "balance-category-expense-18",
    "name": "Подарки",
    "kind": "expense",
    "isActive": true
  },
  {
    "id": "balance-category-expense-19",
    "name": "Шопинг",
    "kind": "expense",
    "isActive": true
  },
  {
    "id": "balance-category-expense-20",
    "name": "Отдых",
    "kind": "expense",
    "isActive": true
  },
  {
    "id": "balance-category-income-uncategorized",
    "name": "Без категории",
    "kind": "income",
    "isActive": true
  },
  {
    "id": "balance-category-expense-uncategorized",
    "name": "Без категории",
    "kind": "expense",
    "isActive": true
  }
];

export const BALANCE_IMPORT_TRANSACTIONS: readonly TransactionRecord[] = [
  {
    "id": "balance-transaction-row-4-income",
    "type": "income",
    "amount": "251000",
    "occurredAt": "2026-08-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-1",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 4,
      "sourceRowId": "balance.xlsx:Лист1:4",
      "originalCategory": "Катя ЗП",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-5-expense",
    "type": "expense",
    "amount": "136039",
    "occurredAt": "2026-08-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-9",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 5,
      "sourceRowId": "balance.xlsx:Лист1:5",
      "originalCategory": "Кредиты",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-6-expense",
    "type": "expense",
    "amount": "235000",
    "occurredAt": "2026-08-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-12",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 6,
      "sourceRowId": "balance.xlsx:Лист1:6",
      "originalCategory": "Катя",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-7-income",
    "type": "income",
    "amount": "100000",
    "occurredAt": "2026-08-10T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-2",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 7,
      "sourceRowId": "balance.xlsx:Лист1:7",
      "originalCategory": "Кирилл ЗП",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-8-expense",
    "type": "expense",
    "amount": "20000",
    "occurredAt": "2026-08-10T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-13",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 8,
      "sourceRowId": "balance.xlsx:Лист1:8",
      "originalCategory": "Кирилл",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-15-income",
    "type": "income",
    "amount": "143000",
    "occurredAt": "2026-08-19T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-1",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 15,
      "sourceRowId": "balance.xlsx:Лист1:15",
      "originalCategory": "Катя ЗП",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-21-income",
    "type": "income",
    "amount": "25000",
    "occurredAt": "2026-08-28T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-7",
    "note": "Халтуринская",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 21,
      "sourceRowId": "balance.xlsx:Лист1:21",
      "originalCategory": "Квартира",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-27-income",
    "type": "income",
    "amount": "132420",
    "occurredAt": "2026-07-03T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-1",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 27,
      "sourceRowId": "balance.xlsx:Лист1:27",
      "originalCategory": "Катя ЗП",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-28-expense",
    "type": "expense",
    "amount": "107979",
    "occurredAt": "2026-07-03T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-9",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 28,
      "sourceRowId": "balance.xlsx:Лист1:28",
      "originalCategory": "Кредиты",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-29-expense",
    "type": "expense",
    "amount": "50000",
    "occurredAt": "2026-07-03T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-12",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 29,
      "sourceRowId": "balance.xlsx:Лист1:29",
      "originalCategory": "Катя",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-30-income",
    "type": "income",
    "amount": "10000",
    "occurredAt": "2026-07-04T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-2",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 30,
      "sourceRowId": "balance.xlsx:Лист1:30",
      "originalCategory": "Кирилл ЗП",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-31-expense",
    "type": "expense",
    "amount": "24800",
    "occurredAt": "2026-07-31T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-13",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 31,
      "sourceRowId": "balance.xlsx:Лист1:31",
      "originalCategory": "Кирилл",
      "dateWasImputed": true
    }
  },
  {
    "id": "balance-transaction-row-32-expense",
    "type": "expense",
    "amount": "10202",
    "occurredAt": "2026-07-04T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-17",
    "note": "Страховка по ипотеке",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 32,
      "sourceRowId": "balance.xlsx:Лист1:32",
      "originalCategory": "Страховки/Налоги",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-33-expense",
    "type": "expense",
    "amount": "10000",
    "occurredAt": "2026-07-08T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-12",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 33,
      "sourceRowId": "balance.xlsx:Лист1:33",
      "originalCategory": "Катя",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-34-income",
    "type": "income",
    "amount": "200000",
    "occurredAt": "2026-07-31T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-3",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 34,
      "sourceRowId": "balance.xlsx:Лист1:34",
      "originalCategory": "АА",
      "dateWasImputed": true
    }
  },
  {
    "id": "balance-transaction-row-35-expense",
    "type": "expense",
    "amount": "175000",
    "occurredAt": "2026-07-31T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-12",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 35,
      "sourceRowId": "balance.xlsx:Лист1:35",
      "originalCategory": "Катя",
      "dateWasImputed": true
    }
  },
  {
    "id": "balance-transaction-row-36-expense",
    "type": "expense",
    "amount": "28055",
    "occurredAt": "2026-07-10T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-9",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 36,
      "sourceRowId": "balance.xlsx:Лист1:36",
      "originalCategory": "Кредиты",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-37-income",
    "type": "income",
    "amount": "90000",
    "occurredAt": "2026-07-31T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-2",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 37,
      "sourceRowId": "balance.xlsx:Лист1:37",
      "originalCategory": "Кирилл ЗП",
      "dateWasImputed": true
    }
  },
  {
    "id": "balance-transaction-row-38-income",
    "type": "income",
    "amount": "151725",
    "occurredAt": "2026-07-19T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-1",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 38,
      "sourceRowId": "balance.xlsx:Лист1:38",
      "originalCategory": "Катя ЗП",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-39-expense",
    "type": "expense",
    "amount": "9120",
    "occurredAt": "2026-07-20T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-14",
    "note": "английский",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 39,
      "sourceRowId": "balance.xlsx:Лист1:39",
      "originalCategory": "Алиса",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-44-income",
    "type": "income",
    "amount": "25000",
    "occurredAt": "2026-07-28T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-7",
    "note": "Халтуринская",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 44,
      "sourceRowId": "balance.xlsx:Лист1:44",
      "originalCategory": "Квартира",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-50-expense",
    "type": "expense",
    "amount": "600",
    "occurredAt": "2026-06-01T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-16",
    "note": "оплата франшизы",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 50,
      "sourceRowId": "balance.xlsx:Лист1:50",
      "originalCategory": "Врачи",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-51-income",
    "type": "income",
    "amount": "79000",
    "occurredAt": "2026-06-04T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-uncategorized",
    "note": "Кирилл Др",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 51,
      "sourceRowId": "balance.xlsx:Лист1:51",
      "originalCategory": "Подарки",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-52-expense",
    "type": "expense",
    "amount": "3089",
    "occurredAt": "2026-06-04T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-18",
    "note": "цветы ТВ",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 52,
      "sourceRowId": "balance.xlsx:Лист1:52",
      "originalCategory": "Подарки",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-53-income",
    "type": "income",
    "amount": "244121",
    "occurredAt": "2026-06-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-1",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 53,
      "sourceRowId": "balance.xlsx:Лист1:53",
      "originalCategory": "Катя ЗП",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-54-expense",
    "type": "expense",
    "amount": "136039",
    "occurredAt": "2026-06-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-9",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 54,
      "sourceRowId": "balance.xlsx:Лист1:54",
      "originalCategory": "Кредиты",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-55-expense",
    "type": "expense",
    "amount": "180000",
    "occurredAt": "2026-06-13T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-12",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 55,
      "sourceRowId": "balance.xlsx:Лист1:55",
      "originalCategory": "Катя",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-56-income",
    "type": "income",
    "amount": "100000",
    "occurredAt": "2026-06-10T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-2",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 56,
      "sourceRowId": "balance.xlsx:Лист1:56",
      "originalCategory": "Кирилл ЗП",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-57-expense",
    "type": "expense",
    "amount": "14800",
    "occurredAt": "2026-06-14T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-13",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 57,
      "sourceRowId": "balance.xlsx:Лист1:57",
      "originalCategory": "Кирилл",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-59-expense",
    "type": "expense",
    "amount": "9120",
    "occurredAt": "2026-06-30T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-14",
    "note": "Английский",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 59,
      "sourceRowId": "balance.xlsx:Лист1:59",
      "originalCategory": "Алиса",
      "dateWasImputed": true
    }
  },
  {
    "id": "balance-transaction-row-61-income",
    "type": "income",
    "amount": "1575",
    "occurredAt": "2026-06-30T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-uncategorized",
    "note": "перевод от НП",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 61,
      "sourceRowId": "balance.xlsx:Лист1:61",
      "originalCategory": null,
      "dateWasImputed": true
    }
  },
  {
    "id": "balance-transaction-row-62-expense",
    "type": "expense",
    "amount": "169000",
    "occurredAt": "2026-06-16T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-15",
    "note": "возврат долга",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 62,
      "sourceRowId": "balance.xlsx:Лист1:62",
      "originalCategory": "Италия",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-63-expense",
    "type": "expense",
    "amount": "131000",
    "occurredAt": "2026-06-30T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-20",
    "note": "Отель",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 63,
      "sourceRowId": "balance.xlsx:Лист1:63",
      "originalCategory": "Отдых",
      "dateWasImputed": true
    }
  },
  {
    "id": "balance-transaction-row-64-income",
    "type": "income",
    "amount": "73381",
    "occurredAt": "2026-06-19T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-1",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 64,
      "sourceRowId": "balance.xlsx:Лист1:64",
      "originalCategory": "Катя ЗП",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-65-income",
    "type": "income",
    "amount": "40000",
    "occurredAt": "2026-06-20T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-5",
    "note": "ИЗЛИШЕК…..",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 65,
      "sourceRowId": "balance.xlsx:Лист1:65",
      "originalCategory": "Прочее",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-66-income",
    "type": "income",
    "amount": "20000",
    "occurredAt": "2026-06-20T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-uncategorized",
    "note": "заначка Кати",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 66,
      "sourceRowId": "balance.xlsx:Лист1:66",
      "originalCategory": null,
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-68-expense",
    "type": "expense",
    "amount": "96103",
    "occurredAt": "2026-06-24T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-11",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 68,
      "sourceRowId": "balance.xlsx:Лист1:68",
      "originalCategory": "Долги",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-69-income",
    "type": "income",
    "amount": "1984",
    "occurredAt": "2026-06-26T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-5",
    "note": "капитализация",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 69,
      "sourceRowId": "balance.xlsx:Лист1:69",
      "originalCategory": "Прочее",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-70-income",
    "type": "income",
    "amount": "25000",
    "occurredAt": "2026-06-28T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-7",
    "note": "Халтуринская",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 70,
      "sourceRowId": "balance.xlsx:Лист1:70",
      "originalCategory": "Квартира",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-77-income",
    "type": "income",
    "amount": "18445",
    "occurredAt": "2026-05-04T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-1",
    "note": "отпускные",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 77,
      "sourceRowId": "balance.xlsx:Лист1:77",
      "originalCategory": "Катя ЗП",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-78-income",
    "type": "income",
    "amount": "100000",
    "occurredAt": "2026-05-04T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-3",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 78,
      "sourceRowId": "balance.xlsx:Лист1:78",
      "originalCategory": "АА",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-79-income",
    "type": "income",
    "amount": "262025",
    "occurredAt": "2026-05-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-1",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 79,
      "sourceRowId": "balance.xlsx:Лист1:79",
      "originalCategory": "Катя ЗП",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-80-expense",
    "type": "expense",
    "amount": "136039",
    "occurredAt": "2026-05-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-9",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 80,
      "sourceRowId": "balance.xlsx:Лист1:80",
      "originalCategory": "Кредиты",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-81-expense",
    "type": "expense",
    "amount": "241500",
    "occurredAt": "2026-05-06T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-20",
    "note": "День рождения Алисы",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 81,
      "sourceRowId": "balance.xlsx:Лист1:81",
      "originalCategory": "Отдых",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-82-expense",
    "type": "expense",
    "amount": "11590",
    "occurredAt": "2026-05-06T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-20",
    "note": "шарики Алисе",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 82,
      "sourceRowId": "balance.xlsx:Лист1:82",
      "originalCategory": "Отдых",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-83-expense",
    "type": "expense",
    "amount": "8258",
    "occurredAt": "2026-05-12T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-18",
    "note": "подарки Алисе",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 83,
      "sourceRowId": "balance.xlsx:Лист1:83",
      "originalCategory": "Подарки",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-84-expense",
    "type": "expense",
    "amount": "35280",
    "occurredAt": "2026-05-13T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-18",
    "note": "Подарок на др НП и Алена",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 84,
      "sourceRowId": "balance.xlsx:Лист1:84",
      "originalCategory": "Подарки",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-85-expense",
    "type": "expense",
    "amount": "15000",
    "occurredAt": "2026-05-13T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-13",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 85,
      "sourceRowId": "balance.xlsx:Лист1:85",
      "originalCategory": "Кирилл",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-86-expense",
    "type": "expense",
    "amount": "8850",
    "occurredAt": "2026-05-13T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-20",
    "note": "Коломна",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 86,
      "sourceRowId": "balance.xlsx:Лист1:86",
      "originalCategory": "Отдых",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-87-expense",
    "type": "expense",
    "amount": "17376",
    "occurredAt": "2026-05-13T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-20",
    "note": "Экспериментариум + ребята",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 87,
      "sourceRowId": "balance.xlsx:Лист1:87",
      "originalCategory": "Отдых",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-88-expense",
    "type": "expense",
    "amount": "27000",
    "occurredAt": "2026-05-13T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-13",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 88,
      "sourceRowId": "balance.xlsx:Лист1:88",
      "originalCategory": "Кирилл",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-89-income",
    "type": "income",
    "amount": "9532",
    "occurredAt": "2026-05-13T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-5",
    "note": "корректировка",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 89,
      "sourceRowId": "balance.xlsx:Лист1:89",
      "originalCategory": "Прочее",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-90-income",
    "type": "income",
    "amount": "100000",
    "occurredAt": "2026-05-10T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-2",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 90,
      "sourceRowId": "balance.xlsx:Лист1:90",
      "originalCategory": "Кирилл ЗП",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-91-expense",
    "type": "expense",
    "amount": "6000",
    "occurredAt": "2026-05-14T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-11",
    "note": "продукты на др НП и Алена",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 91,
      "sourceRowId": "balance.xlsx:Лист1:91",
      "originalCategory": "Долги",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-92-expense",
    "type": "expense",
    "amount": "35000",
    "occurredAt": "2026-05-14T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-13",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 92,
      "sourceRowId": "balance.xlsx:Лист1:92",
      "originalCategory": "Кирилл",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-93-expense",
    "type": "expense",
    "amount": "38280",
    "occurredAt": "2026-05-16T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-18",
    "note": "Подарок на др НП и Алена",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 93,
      "sourceRowId": "balance.xlsx:Лист1:93",
      "originalCategory": "Подарки",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-94-expense",
    "type": "expense",
    "amount": "3000",
    "occurredAt": "2026-05-17T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-14",
    "note": "Паспорт",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 94,
      "sourceRowId": "balance.xlsx:Лист1:94",
      "originalCategory": "Алиса",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-95-expense",
    "type": "expense",
    "amount": "15600",
    "occurredAt": "2026-05-31T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-12",
    "note": "(заправки, и прочее)",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 95,
      "sourceRowId": "balance.xlsx:Лист1:95",
      "originalCategory": "Катя",
      "dateWasImputed": true
    }
  },
  {
    "id": "balance-transaction-row-96-expense",
    "type": "expense",
    "amount": "2275",
    "occurredAt": "2026-05-18T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-16",
    "note": "Алиса",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 96,
      "sourceRowId": "balance.xlsx:Лист1:96",
      "originalCategory": "Врачи",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-97-expense",
    "type": "expense",
    "amount": "23000",
    "occurredAt": "2026-05-19T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-18",
    "note": "др Игорь",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 97,
      "sourceRowId": "balance.xlsx:Лист1:97",
      "originalCategory": "Подарки",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-98-income",
    "type": "income",
    "amount": "135841",
    "occurredAt": "2026-05-20T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-1",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 98,
      "sourceRowId": "balance.xlsx:Лист1:98",
      "originalCategory": "Катя ЗП",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-99-expense",
    "type": "expense",
    "amount": "105500",
    "occurredAt": "2026-05-20T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-12",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 99,
      "sourceRowId": "balance.xlsx:Лист1:99",
      "originalCategory": "Катя",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-100-income",
    "type": "income",
    "amount": "24372",
    "occurredAt": "2026-05-20T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-10",
    "note": "Долг Фурба",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 100,
      "sourceRowId": "balance.xlsx:Лист1:100",
      "originalCategory": "Долги",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-101-income",
    "type": "income",
    "amount": "6000",
    "occurredAt": "2026-05-22T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-10",
    "note": "продукты на др НП и Алена",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 101,
      "sourceRowId": "balance.xlsx:Лист1:101",
      "originalCategory": "Долги",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-102-expense",
    "type": "expense",
    "amount": "17000",
    "occurredAt": "2026-05-22T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-18",
    "note": "Коля",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 102,
      "sourceRowId": "balance.xlsx:Лист1:102",
      "originalCategory": "Подарки",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-103-expense",
    "type": "expense",
    "amount": "2000",
    "occurredAt": "2026-05-22T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-20",
    "note": "Такси от Коли",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 103,
      "sourceRowId": "balance.xlsx:Лист1:103",
      "originalCategory": "Отдых",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-104-income",
    "type": "income",
    "amount": "50000",
    "occurredAt": "2026-05-22T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-3",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 104,
      "sourceRowId": "balance.xlsx:Лист1:104",
      "originalCategory": "АА",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-105-expense",
    "type": "expense",
    "amount": "9462",
    "occurredAt": "2026-05-22T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-20",
    "note": "суши",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 105,
      "sourceRowId": "balance.xlsx:Лист1:105",
      "originalCategory": "Отдых",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-106-expense",
    "type": "expense",
    "amount": "258590",
    "occurredAt": "2026-05-25T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-20",
    "note": "Билеты",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 106,
      "sourceRowId": "balance.xlsx:Лист1:106",
      "originalCategory": "Отдых",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-107-expense",
    "type": "expense",
    "amount": "7040",
    "occurredAt": "2026-05-25T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-20",
    "note": "поездка к Коле",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 107,
      "sourceRowId": "balance.xlsx:Лист1:107",
      "originalCategory": "Отдых",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-108-expense",
    "type": "expense",
    "amount": "5480",
    "occurredAt": "2026-05-26T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-16",
    "note": "Кирилл аптека",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 108,
      "sourceRowId": "balance.xlsx:Лист1:108",
      "originalCategory": "Врачи",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-109-income",
    "type": "income",
    "amount": "252722",
    "occurredAt": "2026-05-26T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-1",
    "note": "отпускные",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 109,
      "sourceRowId": "balance.xlsx:Лист1:109",
      "originalCategory": "Катя ЗП",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-110-income",
    "type": "income",
    "amount": "10000",
    "occurredAt": "2026-05-26T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-uncategorized",
    "note": "возврат за суши",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 110,
      "sourceRowId": "balance.xlsx:Лист1:110",
      "originalCategory": "Отдых",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-111-expense",
    "type": "expense",
    "amount": "13370",
    "occurredAt": "2026-05-27T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-14",
    "note": "английский",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 111,
      "sourceRowId": "balance.xlsx:Лист1:111",
      "originalCategory": "Алиса",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-112-expense",
    "type": "expense",
    "amount": "9432",
    "occurredAt": "2026-05-27T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-20",
    "note": "купальник и панамка Кате",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 112,
      "sourceRowId": "balance.xlsx:Лист1:112",
      "originalCategory": "Отдых",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-113-expense",
    "type": "expense",
    "amount": "9739",
    "occurredAt": "2026-05-27T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-17",
    "note": "Машина",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 113,
      "sourceRowId": "balance.xlsx:Лист1:113",
      "originalCategory": "Страховки/Налоги",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-114-expense",
    "type": "expense",
    "amount": "76400",
    "occurredAt": "2026-05-27T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-20",
    "note": "покупка $",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 114,
      "sourceRowId": "balance.xlsx:Лист1:114",
      "originalCategory": "Отдых",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-115-income",
    "type": "income",
    "amount": "25000",
    "occurredAt": "2026-05-28T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-7",
    "note": "Халтуринская",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 115,
      "sourceRowId": "balance.xlsx:Лист1:115",
      "originalCategory": "Квартира",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-116-income",
    "type": "income",
    "amount": "1260",
    "occurredAt": "2026-05-27T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-5",
    "note": "проценты по вкладу",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 116,
      "sourceRowId": "balance.xlsx:Лист1:116",
      "originalCategory": "Прочее",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-117-income",
    "type": "income",
    "amount": "166740",
    "occurredAt": "2026-05-30T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-uncategorized",
    "note": "Кредитка",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 117,
      "sourceRowId": "balance.xlsx:Лист1:117",
      "importGroupId": "balance-import-group-117",
      "originalCategory": "Кредиты",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-117-expense",
    "type": "expense",
    "amount": "166740",
    "occurredAt": "2026-05-30T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-9",
    "note": "Кредитка",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 117,
      "sourceRowId": "balance.xlsx:Лист1:117",
      "importGroupId": "balance-import-group-117",
      "originalCategory": "Кредиты",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-123-income",
    "type": "income",
    "amount": "100000",
    "occurredAt": "2026-04-01T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-4",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 123,
      "sourceRowId": "balance.xlsx:Лист1:123",
      "originalCategory": "TSC",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-124-expense",
    "type": "expense",
    "amount": "100000",
    "occurredAt": "2026-04-01T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-12",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 124,
      "sourceRowId": "balance.xlsx:Лист1:124",
      "originalCategory": "Катя",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-125-income",
    "type": "income",
    "amount": "257049",
    "occurredAt": "2026-04-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-1",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 125,
      "sourceRowId": "balance.xlsx:Лист1:125",
      "originalCategory": "Катя ЗП",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-126-income",
    "type": "income",
    "amount": "100000",
    "occurredAt": "2026-04-30T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-2",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 126,
      "sourceRowId": "balance.xlsx:Лист1:126",
      "originalCategory": "Кирилл ЗП",
      "dateWasImputed": true
    }
  },
  {
    "id": "balance-transaction-row-127-expense",
    "type": "expense",
    "amount": "70000",
    "occurredAt": "2026-04-30T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-15",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 127,
      "sourceRowId": "balance.xlsx:Лист1:127",
      "originalCategory": "Италия",
      "dateWasImputed": true
    }
  },
  {
    "id": "balance-transaction-row-128-expense",
    "type": "expense",
    "amount": "109020",
    "occurredAt": "2026-04-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-12",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 128,
      "sourceRowId": "balance.xlsx:Лист1:128",
      "originalCategory": "Катя",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-129-expense",
    "type": "expense",
    "amount": "136039",
    "occurredAt": "2026-04-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-9",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 129,
      "sourceRowId": "balance.xlsx:Лист1:129",
      "originalCategory": "Кредиты",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-130-expense",
    "type": "expense",
    "amount": "3385",
    "occurredAt": "2026-04-06T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-16",
    "note": "оплата франшизы",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 130,
      "sourceRowId": "balance.xlsx:Лист1:130",
      "originalCategory": "Врачи",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-131-expense",
    "type": "expense",
    "amount": "16500",
    "occurredAt": "2026-04-06T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-6",
    "note": "Долг Фурба",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 131,
      "sourceRowId": "balance.xlsx:Лист1:131",
      "originalCategory": "Прочее",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-132-expense",
    "type": "expense",
    "amount": "10000",
    "occurredAt": "2026-04-10T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-6",
    "note": "Долг Кирилл работа",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 132,
      "sourceRowId": "balance.xlsx:Лист1:132",
      "originalCategory": "Прочее",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-133-income",
    "type": "income",
    "amount": "143389",
    "occurredAt": "2026-04-20T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-1",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 133,
      "sourceRowId": "balance.xlsx:Лист1:133",
      "originalCategory": "Катя ЗП",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-134-expense",
    "type": "expense",
    "amount": "118578",
    "occurredAt": "2026-04-20T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-12",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 134,
      "sourceRowId": "balance.xlsx:Лист1:134",
      "originalCategory": "Катя",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-135-expense",
    "type": "expense",
    "amount": "34000",
    "occurredAt": "2026-04-24T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-20",
    "note": "День рождения Алисы",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 135,
      "sourceRowId": "balance.xlsx:Лист1:135",
      "originalCategory": "Отдых",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-136-income",
    "type": "income",
    "amount": "10000",
    "occurredAt": "2026-04-24T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-5",
    "note": "возврат долга Кирилл работа",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 136,
      "sourceRowId": "balance.xlsx:Лист1:136",
      "originalCategory": "Прочее",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-137-expense",
    "type": "expense",
    "amount": "30000",
    "occurredAt": "2026-04-26T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-13",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 137,
      "sourceRowId": "balance.xlsx:Лист1:137",
      "originalCategory": "Кирилл",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-138-income",
    "type": "income",
    "amount": "25000",
    "occurredAt": "2026-04-28T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-7",
    "note": "Халтуринская",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 138,
      "sourceRowId": "balance.xlsx:Лист1:138",
      "originalCategory": "Квартира",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-145-expense",
    "type": "expense",
    "amount": "12500",
    "occurredAt": "2026-03-01T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-16",
    "note": "Катя стоматолог (чистка)",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 145,
      "sourceRowId": "balance.xlsx:Лист1:145",
      "originalCategory": "Врачи",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-146-income",
    "type": "income",
    "amount": "251267",
    "occurredAt": "2026-03-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-1",
    "note": "Катя зп",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 146,
      "sourceRowId": "balance.xlsx:Лист1:146",
      "originalCategory": "Катя ЗП",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-147-expense",
    "type": "expense",
    "amount": "136055",
    "occurredAt": "2026-03-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-9",
    "note": "кредиты",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 147,
      "sourceRowId": "balance.xlsx:Лист1:147",
      "originalCategory": "Кредиты",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-148-income",
    "type": "income",
    "amount": "74990",
    "occurredAt": "2026-03-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-10",
    "note": "возврат долга за подарок Инне",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 148,
      "sourceRowId": "balance.xlsx:Лист1:148",
      "originalCategory": "Долги",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-149-expense",
    "type": "expense",
    "amount": "142155",
    "occurredAt": "2026-03-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-12",
    "note": "Катя",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 149,
      "sourceRowId": "balance.xlsx:Лист1:149",
      "originalCategory": "Катя",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-150-income",
    "type": "income",
    "amount": "100000",
    "occurredAt": "2026-03-10T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-uncategorized",
    "note": "Кирилл зп",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 150,
      "sourceRowId": "balance.xlsx:Лист1:150",
      "originalCategory": "Кирилл",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-151-expense",
    "type": "expense",
    "amount": "64845",
    "occurredAt": "2026-03-20T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-12",
    "note": "Катя",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 151,
      "sourceRowId": "balance.xlsx:Лист1:151",
      "originalCategory": "Катя",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-152-income",
    "type": "income",
    "amount": "143389",
    "occurredAt": "2026-03-20T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-1",
    "note": "Катя зп",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 152,
      "sourceRowId": "balance.xlsx:Лист1:152",
      "originalCategory": "Катя ЗП",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-153-expense",
    "type": "expense",
    "amount": "7034",
    "occurredAt": "2026-03-20T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-19",
    "note": "шкаф Алисе в комнату",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 153,
      "sourceRowId": "balance.xlsx:Лист1:153",
      "originalCategory": "Шопинг",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-154-expense",
    "type": "expense",
    "amount": "15000",
    "occurredAt": "2026-03-24T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-6",
    "note": "ТВ на Халтуринскую",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 154,
      "sourceRowId": "balance.xlsx:Лист1:154",
      "originalCategory": "Прочее",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-155-expense",
    "type": "expense",
    "amount": "5000",
    "occurredAt": "2026-03-24T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-6",
    "note": "Халтуринская (для уборки и тд)",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 155,
      "sourceRowId": "balance.xlsx:Лист1:155",
      "originalCategory": "Прочее",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-156-income",
    "type": "income",
    "amount": "1845",
    "occurredAt": "2026-03-26T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-5",
    "note": "капитализация",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 156,
      "sourceRowId": "balance.xlsx:Лист1:156",
      "originalCategory": "Прочее",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-157-income",
    "type": "income",
    "amount": "100000",
    "occurredAt": "2026-03-26T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-4",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 157,
      "sourceRowId": "balance.xlsx:Лист1:157",
      "originalCategory": "TSC",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-159-expense",
    "type": "expense",
    "amount": "391962",
    "occurredAt": "2026-03-30T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": "Кредитка",
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 159,
      "sourceRowId": "balance.xlsx:Лист1:159",
      "originalCategory": null,
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-165-income",
    "type": "income",
    "amount": "81750",
    "occurredAt": "2026-02-01T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 165,
      "sourceRowId": "balance.xlsx:Лист1:165",
      "originalCategory": "Катя стоматолог (долг Кате)",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-166-expense",
    "type": "expense",
    "amount": "228096",
    "occurredAt": "2026-02-01T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-12",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 166,
      "sourceRowId": "balance.xlsx:Лист1:166",
      "originalCategory": "Катя",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-167-expense",
    "type": "expense",
    "amount": "14145",
    "occurredAt": "2026-02-01T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-13",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 167,
      "sourceRowId": "balance.xlsx:Лист1:167",
      "originalCategory": "кирилл",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-168-expense",
    "type": "expense",
    "amount": "27679",
    "occurredAt": "2026-02-01T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 168,
      "sourceRowId": "balance.xlsx:Лист1:168",
      "originalCategory": "кирилл врачи аптека",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-169-expense",
    "type": "expense",
    "amount": "15320",
    "occurredAt": "2026-02-01T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 169,
      "sourceRowId": "balance.xlsx:Лист1:169",
      "originalCategory": "кредит сбер",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-170-income",
    "type": "income",
    "amount": "2939",
    "occurredAt": "2026-02-01T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 170,
      "sourceRowId": "balance.xlsx:Лист1:170",
      "originalCategory": "капитализация",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-171-expense",
    "type": "expense",
    "amount": "10139",
    "occurredAt": "2026-02-01T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 171,
      "sourceRowId": "balance.xlsx:Лист1:171",
      "originalCategory": "колонка",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-172-income",
    "type": "income",
    "amount": "135296",
    "occurredAt": "2026-02-01T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-1",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 172,
      "sourceRowId": "balance.xlsx:Лист1:172",
      "originalCategory": "катя зп",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-173-income",
    "type": "income",
    "amount": "20000",
    "occurredAt": "2026-02-01T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 173,
      "sourceRowId": "balance.xlsx:Лист1:173",
      "originalCategory": "Халтуринская",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-174-expense",
    "type": "expense",
    "amount": "16337",
    "occurredAt": "2026-02-04T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 174,
      "sourceRowId": "balance.xlsx:Лист1:174",
      "originalCategory": "алкотека",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-175-expense",
    "type": "expense",
    "amount": "7791",
    "occurredAt": "2026-02-04T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 175,
      "sourceRowId": "balance.xlsx:Лист1:175",
      "originalCategory": "суши",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-176-income",
    "type": "income",
    "amount": "11800",
    "occurredAt": "2026-02-04T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 176,
      "sourceRowId": "balance.xlsx:Лист1:176",
      "originalCategory": "стол",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-177-expense",
    "type": "expense",
    "amount": "45000",
    "occurredAt": "2026-02-04T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 177,
      "sourceRowId": "balance.xlsx:Лист1:177",
      "originalCategory": "кирилл италия",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-178-expense",
    "type": "expense",
    "amount": "95000",
    "occurredAt": "2026-02-04T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 178,
      "sourceRowId": "balance.xlsx:Лист1:178",
      "originalCategory": "ноутбук",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-179-income",
    "type": "income",
    "amount": "79735",
    "occurredAt": "2026-02-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-1",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 179,
      "sourceRowId": "balance.xlsx:Лист1:179",
      "originalCategory": "Катя зп",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-180-expense",
    "type": "expense",
    "amount": "12635",
    "occurredAt": "2026-02-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 180,
      "sourceRowId": "balance.xlsx:Лист1:180",
      "originalCategory": "подарок Наташе",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-181-expense",
    "type": "expense",
    "amount": "5800",
    "occurredAt": "2026-02-07T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 181,
      "sourceRowId": "balance.xlsx:Лист1:181",
      "originalCategory": "замена фильтра",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-182-expense",
    "type": "expense",
    "amount": "44329",
    "occurredAt": "2026-02-08T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 182,
      "sourceRowId": "balance.xlsx:Лист1:182",
      "originalCategory": "кредит сбер",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-183-income",
    "type": "income",
    "amount": "64000",
    "occurredAt": "2026-02-08T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 183,
      "sourceRowId": "balance.xlsx:Лист1:183",
      "importGroupId": "balance-import-group-183",
      "originalCategory": "кредит втб",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-183-expense",
    "type": "expense",
    "amount": "64000",
    "occurredAt": "2026-02-08T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 183,
      "sourceRowId": "balance.xlsx:Лист1:183",
      "importGroupId": "balance-import-group-183",
      "originalCategory": "кредит втб",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-184-expense",
    "type": "expense",
    "amount": "5000",
    "occurredAt": "2026-02-08T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 184,
      "sourceRowId": "balance.xlsx:Лист1:184",
      "originalCategory": "подарок суворову др",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-185-income",
    "type": "income",
    "amount": "450000",
    "occurredAt": "2026-02-09T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 185,
      "sourceRowId": "balance.xlsx:Лист1:185",
      "originalCategory": "НП вернул долг",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-186-expense",
    "type": "expense",
    "amount": "200000",
    "occurredAt": "2026-02-09T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 186,
      "sourceRowId": "balance.xlsx:Лист1:186",
      "originalCategory": "возврат долга за отдых",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-187-expense",
    "type": "expense",
    "amount": "5501",
    "occurredAt": "2026-02-12T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 187,
      "sourceRowId": "balance.xlsx:Лист1:187",
      "originalCategory": "азбука",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-188-income",
    "type": "income",
    "amount": "4000",
    "occurredAt": "2026-02-14T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 188,
      "sourceRowId": "balance.xlsx:Лист1:188",
      "originalCategory": "Настя перевела",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-189-expense",
    "type": "expense",
    "amount": "8400",
    "occurredAt": "2026-02-13T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 189,
      "sourceRowId": "balance.xlsx:Лист1:189",
      "originalCategory": "икра",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-190-expense",
    "type": "expense",
    "amount": "9647",
    "occurredAt": "2026-02-13T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 190,
      "sourceRowId": "balance.xlsx:Лист1:190",
      "originalCategory": "икра",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-191-expense",
    "type": "expense",
    "amount": "22000",
    "occurredAt": "2026-02-13T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 191,
      "sourceRowId": "balance.xlsx:Лист1:191",
      "originalCategory": "сушка",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-192-expense",
    "type": "expense",
    "amount": "10600",
    "occurredAt": "2026-02-13T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 192,
      "sourceRowId": "balance.xlsx:Лист1:192",
      "originalCategory": "подарок аришке",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-193-income",
    "type": "income",
    "amount": "100000",
    "occurredAt": "2026-02-13T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-2",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 193,
      "sourceRowId": "balance.xlsx:Лист1:193",
      "originalCategory": "кирилл зп",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-194-expense",
    "type": "expense",
    "amount": "74990",
    "occurredAt": "2026-02-13T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 194,
      "sourceRowId": "balance.xlsx:Лист1:194",
      "originalCategory": "долг за подарок Инне",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-195-expense",
    "type": "expense",
    "amount": "14997",
    "occurredAt": "2026-02-13T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 195,
      "sourceRowId": "balance.xlsx:Лист1:195",
      "originalCategory": "подарок Инне",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-196-income",
    "type": "income",
    "amount": "21719",
    "occurredAt": "2026-02-13T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 196,
      "sourceRowId": "balance.xlsx:Лист1:196",
      "originalCategory": "???(чтобы выровнять остаток)",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-202-income",
    "type": "income",
    "amount": "1700000",
    "occurredAt": "2026-01-01T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 202,
      "sourceRowId": "balance.xlsx:Лист1:202",
      "originalCategory": "Катя премия",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-203-expense",
    "type": "expense",
    "amount": "400000",
    "occurredAt": "2026-01-01T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 203,
      "sourceRowId": "balance.xlsx:Лист1:203",
      "originalCategory": "Кредит",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-204-expense",
    "type": "expense",
    "amount": "661436",
    "occurredAt": "2026-01-01T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 204,
      "sourceRowId": "balance.xlsx:Лист1:204",
      "originalCategory": "Отпуск",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-206-income",
    "type": "income",
    "amount": "90720",
    "occurredAt": "2026-01-01T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 206,
      "sourceRowId": "balance.xlsx:Лист1:206",
      "originalCategory": "возврат за ку",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-207-income",
    "type": "income",
    "amount": "12000",
    "occurredAt": "2026-01-01T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 207,
      "sourceRowId": "balance.xlsx:Лист1:207",
      "originalCategory": "Велотренажер Юра",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-208-income",
    "type": "income",
    "amount": "20000",
    "occurredAt": "2026-01-01T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 208,
      "sourceRowId": "balance.xlsx:Лист1:208",
      "originalCategory": "Халтуринская",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-210-income",
    "type": "income",
    "amount": "216229",
    "occurredAt": "2026-01-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-1",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 210,
      "sourceRowId": "balance.xlsx:Лист1:210",
      "originalCategory": "Катя зп",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-211-expense",
    "type": "expense",
    "amount": "118163",
    "occurredAt": "2026-01-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-9",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 211,
      "sourceRowId": "balance.xlsx:Лист1:211",
      "originalCategory": "кредиты",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-212-expense",
    "type": "expense",
    "amount": "93600",
    "occurredAt": "2026-01-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 212,
      "sourceRowId": "balance.xlsx:Лист1:212",
      "originalCategory": "Кирилл спортзал",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-213-expense",
    "type": "expense",
    "amount": "495000",
    "occurredAt": "2026-01-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 213,
      "sourceRowId": "balance.xlsx:Лист1:213",
      "originalCategory": "погасить кредиткку",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-214-expense",
    "type": "expense",
    "amount": "106092",
    "occurredAt": "2026-01-07T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 214,
      "sourceRowId": "balance.xlsx:Лист1:214",
      "originalCategory": "погуляли НГ (итог)",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-216-income",
    "type": "income",
    "amount": "43137",
    "occurredAt": "2026-01-20T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-1",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 216,
      "sourceRowId": "balance.xlsx:Лист1:216",
      "originalCategory": "Катя зп",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-217-expense",
    "type": "expense",
    "amount": "48700",
    "occurredAt": "2026-01-20T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 217,
      "sourceRowId": "balance.xlsx:Лист1:217",
      "originalCategory": "цум",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-218-expense",
    "type": "expense",
    "amount": "5491",
    "occurredAt": "2026-01-20T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 218,
      "sourceRowId": "balance.xlsx:Лист1:218",
      "originalCategory": "такси аэропорт",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-219-expense",
    "type": "expense",
    "amount": "5226",
    "occurredAt": "2026-01-30T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 219,
      "sourceRowId": "balance.xlsx:Лист1:219",
      "originalCategory": "такси из аэропорта",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-220-expense",
    "type": "expense",
    "amount": "20000",
    "occurredAt": "2026-01-30T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-13",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 220,
      "sourceRowId": "balance.xlsx:Лист1:220",
      "originalCategory": "Кирилл",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-221-expense",
    "type": "expense",
    "amount": "100000",
    "occurredAt": "2026-01-31T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 221,
      "sourceRowId": "balance.xlsx:Лист1:221",
      "originalCategory": "долг Кирилл работа",
      "dateWasImputed": true
    }
  },
  {
    "id": "balance-transaction-row-222-expense",
    "type": "expense",
    "amount": "122000",
    "occurredAt": "2026-01-31T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 222,
      "sourceRowId": "balance.xlsx:Лист1:222",
      "originalCategory": "потрачено отдых",
      "dateWasImputed": true
    }
  },
  {
    "id": "balance-transaction-row-233-income",
    "type": "income",
    "amount": "20000",
    "occurredAt": "2025-12-01T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 233,
      "sourceRowId": "balance.xlsx:Лист1:233",
      "originalCategory": "Халтуринская",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-234-income",
    "type": "income",
    "amount": "95000",
    "occurredAt": "2025-12-01T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-2",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 234,
      "sourceRowId": "balance.xlsx:Лист1:234",
      "originalCategory": "Кирилл зп",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-235-expense",
    "type": "expense",
    "amount": "40000",
    "occurredAt": "2025-12-01T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 235,
      "sourceRowId": "balance.xlsx:Лист1:235",
      "originalCategory": "Кирилл Италия",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-236-income",
    "type": "income",
    "amount": "234812",
    "occurredAt": "2025-12-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-1",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 236,
      "sourceRowId": "balance.xlsx:Лист1:236",
      "originalCategory": "Катя зп",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-237-expense",
    "type": "expense",
    "amount": "130684",
    "occurredAt": "2025-12-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-9",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 237,
      "sourceRowId": "balance.xlsx:Лист1:237",
      "originalCategory": "кредиты",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-239-income",
    "type": "income",
    "amount": "814",
    "occurredAt": "2025-12-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 239,
      "sourceRowId": "balance.xlsx:Лист1:239",
      "originalCategory": "капитализация",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-240-income",
    "type": "income",
    "amount": "12207",
    "occurredAt": "2025-12-09T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 240,
      "sourceRowId": "balance.xlsx:Лист1:240",
      "originalCategory": "Катя отпускные",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-241-expense",
    "type": "expense",
    "amount": "116307",
    "occurredAt": "2025-12-09T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-12",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 241,
      "sourceRowId": "balance.xlsx:Лист1:241",
      "originalCategory": "Катя",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-242-expense",
    "type": "expense",
    "amount": "90693",
    "occurredAt": "2025-12-20T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-12",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 242,
      "sourceRowId": "balance.xlsx:Лист1:242",
      "originalCategory": "Катя",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-243-income",
    "type": "income",
    "amount": "120690",
    "occurredAt": "2025-12-20T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-1",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 243,
      "sourceRowId": "balance.xlsx:Лист1:243",
      "originalCategory": "Катя зп",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-244-expense",
    "type": "expense",
    "amount": "28790",
    "occurredAt": "2025-12-22T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-13",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 244,
      "sourceRowId": "balance.xlsx:Лист1:244",
      "originalCategory": "Кирилл",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-245-income",
    "type": "income",
    "amount": "150000",
    "occurredAt": "2025-12-24T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 245,
      "sourceRowId": "balance.xlsx:Лист1:245",
      "originalCategory": "тск",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-246-income",
    "type": "income",
    "amount": "15000",
    "occurredAt": "2025-12-24T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-2",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 246,
      "sourceRowId": "balance.xlsx:Лист1:246",
      "originalCategory": "Кирилл зп",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-247-expense",
    "type": "expense",
    "amount": "150000",
    "occurredAt": "2025-12-26T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 247,
      "sourceRowId": "balance.xlsx:Лист1:247",
      "originalCategory": "кредитка",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-248-income",
    "type": "income",
    "amount": "150000",
    "occurredAt": "2025-12-30T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-3",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 248,
      "sourceRowId": "balance.xlsx:Лист1:248",
      "originalCategory": "аа",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-249-expense",
    "type": "expense",
    "amount": "79100",
    "occurredAt": "2025-12-30T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 249,
      "sourceRowId": "balance.xlsx:Лист1:249",
      "originalCategory": "Кредитка",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-253-income",
    "type": "income",
    "amount": "20000",
    "occurredAt": "2025-11-01T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 253,
      "sourceRowId": "balance.xlsx:Лист1:253",
      "originalCategory": "Халтуринская",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-254-income",
    "type": "income",
    "amount": "78250",
    "occurredAt": "2025-11-01T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-2",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 254,
      "sourceRowId": "balance.xlsx:Лист1:254",
      "originalCategory": "Кирилл зп",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-255-expense",
    "type": "expense",
    "amount": "62200",
    "occurredAt": "2025-11-01T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 255,
      "sourceRowId": "balance.xlsx:Лист1:255",
      "originalCategory": "Кирилл Италия",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-256-income",
    "type": "income",
    "amount": "761",
    "occurredAt": "2025-11-02T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 256,
      "sourceRowId": "balance.xlsx:Лист1:256",
      "originalCategory": "капитализация",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-257-income",
    "type": "income",
    "amount": "240338",
    "occurredAt": "2025-11-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-1",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 257,
      "sourceRowId": "balance.xlsx:Лист1:257",
      "originalCategory": "Катя зп",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-258-expense",
    "type": "expense",
    "amount": "108000",
    "occurredAt": "2025-11-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-9",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 258,
      "sourceRowId": "balance.xlsx:Лист1:258",
      "originalCategory": "Кредиты",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-259-expense",
    "type": "expense",
    "amount": "132356",
    "occurredAt": "2025-11-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-12",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 259,
      "sourceRowId": "balance.xlsx:Лист1:259",
      "originalCategory": "Катя",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-260-income",
    "type": "income",
    "amount": "7000",
    "occurredAt": "2025-11-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-2",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 260,
      "sourceRowId": "balance.xlsx:Лист1:260",
      "originalCategory": "Кирилл зп",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-261-expense",
    "type": "expense",
    "amount": "16050",
    "occurredAt": "2025-11-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 261,
      "sourceRowId": "balance.xlsx:Лист1:261",
      "originalCategory": "Кирилл потратил",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-262-income",
    "type": "income",
    "amount": "127422",
    "occurredAt": "2025-11-20T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-1",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 262,
      "sourceRowId": "balance.xlsx:Лист1:262",
      "originalCategory": "Катя зп",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-263-expense",
    "type": "expense",
    "amount": "74644",
    "occurredAt": "2025-11-20T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-12",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 263,
      "sourceRowId": "balance.xlsx:Лист1:263",
      "originalCategory": "катя",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-264-income",
    "type": "income",
    "amount": "15000",
    "occurredAt": "2025-11-20T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-2",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 264,
      "sourceRowId": "balance.xlsx:Лист1:264",
      "originalCategory": "Кирилл зп",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-265-income",
    "type": "income",
    "amount": "60000",
    "occurredAt": "2025-11-22T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-3",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 265,
      "sourceRowId": "balance.xlsx:Лист1:265",
      "originalCategory": "АА",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-266-expense",
    "type": "expense",
    "amount": "28800",
    "occurredAt": "2025-11-24T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 266,
      "sourceRowId": "balance.xlsx:Лист1:266",
      "originalCategory": "Налоги Кирилл",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-267-expense",
    "type": "expense",
    "amount": "26608",
    "occurredAt": "2025-11-24T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 267,
      "sourceRowId": "balance.xlsx:Лист1:267",
      "originalCategory": "Налоги Катя",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-268-income",
    "type": "income",
    "amount": "4800",
    "occurredAt": "2025-11-26T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 268,
      "sourceRowId": "balance.xlsx:Лист1:268",
      "originalCategory": "обмен валюты(разница)",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-270-expense",
    "type": "expense",
    "amount": "139052",
    "occurredAt": "2025-11-30T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 270,
      "sourceRowId": "balance.xlsx:Лист1:270",
      "originalCategory": "Кредитка",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-273-expense",
    "type": "expense",
    "amount": "8000",
    "occurredAt": "2025-10-01T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 273,
      "sourceRowId": "balance.xlsx:Лист1:273",
      "originalCategory": "билеты в театр",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-274-income",
    "type": "income",
    "amount": "20000",
    "occurredAt": "2025-10-01T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 274,
      "sourceRowId": "balance.xlsx:Лист1:274",
      "originalCategory": "Халтуринская",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-275-income",
    "type": "income",
    "amount": "240338",
    "occurredAt": "2025-10-03T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-1",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 275,
      "sourceRowId": "balance.xlsx:Лист1:275",
      "originalCategory": "Катя зп",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-276-expense",
    "type": "expense",
    "amount": "132338",
    "occurredAt": "2025-10-05T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-12",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 276,
      "sourceRowId": "balance.xlsx:Лист1:276",
      "originalCategory": "Катя",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-277-expense",
    "type": "expense",
    "amount": "108000",
    "occurredAt": "2025-10-03T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-9",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 277,
      "sourceRowId": "balance.xlsx:Лист1:277",
      "originalCategory": "кредиты",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-278-income",
    "type": "income",
    "amount": "8000",
    "occurredAt": "2025-10-07T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 278,
      "sourceRowId": "balance.xlsx:Лист1:278",
      "originalCategory": "билеты в театр",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-279-income",
    "type": "income",
    "amount": "1000",
    "occurredAt": "2025-10-09T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 279,
      "sourceRowId": "balance.xlsx:Лист1:279",
      "originalCategory": "продление домена",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-280-expense",
    "type": "expense",
    "amount": "9856",
    "occurredAt": "2025-10-10T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 280,
      "sourceRowId": "balance.xlsx:Лист1:280",
      "originalCategory": "Италия (списание долга)",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-281-income",
    "type": "income",
    "amount": "78250",
    "occurredAt": "2025-10-10T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-2",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 281,
      "sourceRowId": "balance.xlsx:Лист1:281",
      "originalCategory": "Кирилл зп",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-282-expense",
    "type": "expense",
    "amount": "46800",
    "occurredAt": "2025-10-10T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-12",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 282,
      "sourceRowId": "balance.xlsx:Лист1:282",
      "originalCategory": "Катя",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-283-income",
    "type": "income",
    "amount": "129412",
    "occurredAt": "2025-10-20T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-1",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 283,
      "sourceRowId": "balance.xlsx:Лист1:283",
      "originalCategory": "Катя зп",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-284-expense",
    "type": "expense",
    "amount": "30000",
    "occurredAt": "2025-10-20T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-12",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 284,
      "sourceRowId": "balance.xlsx:Лист1:284",
      "originalCategory": "Катя",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-285-expense",
    "type": "expense",
    "amount": "62300",
    "occurredAt": "2025-10-20T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 285,
      "sourceRowId": "balance.xlsx:Лист1:285",
      "originalCategory": "Кирилл Италия",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-286-expense",
    "type": "expense",
    "amount": "5000",
    "occurredAt": "2025-10-22T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 286,
      "sourceRowId": "balance.xlsx:Лист1:286",
      "originalCategory": "гели,мыло",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-287-income",
    "type": "income",
    "amount": "15000",
    "occurredAt": "2025-10-24T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-2",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 287,
      "sourceRowId": "balance.xlsx:Лист1:287",
      "originalCategory": "Кирилл зп",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-288-expense",
    "type": "expense",
    "amount": "15000",
    "occurredAt": "2025-10-24T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-12",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 288,
      "sourceRowId": "balance.xlsx:Лист1:288",
      "originalCategory": "Катя",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-289-income",
    "type": "income",
    "amount": "30000",
    "occurredAt": "2025-10-26T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-income-3",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 289,
      "sourceRowId": "balance.xlsx:Лист1:289",
      "originalCategory": "АА",
      "dateWasImputed": false
    }
  },
  {
    "id": "balance-transaction-row-290-expense",
    "type": "expense",
    "amount": "90000",
    "occurredAt": "2025-10-31T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 290,
      "sourceRowId": "balance.xlsx:Лист1:290",
      "originalCategory": null,
      "dateWasImputed": true
    }
  },
  {
    "id": "balance-transaction-row-291-expense",
    "type": "expense",
    "amount": "13200",
    "occurredAt": "2025-10-30T12:00:00.000Z",
    "accountId": "balance-account-main",
    "destinationAccountId": null,
    "categoryId": "balance-category-expense-uncategorized",
    "note": null,
    "importMetadata": {
      "sourceWorkbook": "Баланс.xlsx",
      "sourceSheet": "Лист1",
      "sourceRow": 291,
      "sourceRowId": "balance.xlsx:Лист1:291",
      "originalCategory": "кредитка",
      "dateWasImputed": false
    }
  }
];

export const BALANCE_IMPORT_SUMMARY = Object.freeze({ sourceRows: 212, transactionRecords: 214, incomeRecords: 88, expenseRecords: 126, controlPoints: 11, finalBalance: "548032" });

