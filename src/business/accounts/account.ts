import {
  assertMoneyMatchesCurrency,
  createCalendarDate,
  createCurrencyCode,
  createEntityName,
  createIdentifier,
  createMoney,
  type CalendarDate,
  type CurrencyCode,
  type Identifier,
  type Money,
} from "../model-values.ts";

export type AccountId = Identifier<"Account">;

export type Account = Readonly<{
  id: AccountId;
  name: string;
  currency: CurrencyCode;
  openingBalance: Money;
  openingBalanceDate: CalendarDate;
  isActive: boolean;
}>;

export type AccountInput = Readonly<{
  id: string;
  name: string;
  currency: string;
  openingBalance: string;
  openingBalanceDate: string;
  isActive: boolean;
}>;

export function createAccount(input: AccountInput): Account {
  const currency = createCurrencyCode(input.currency);
  const openingBalance = createMoney(input.openingBalance);
  assertMoneyMatchesCurrency(openingBalance, currency);

  return Object.freeze({
    id: createIdentifier<"Account">(input.id),
    name: createEntityName(input.name),
    currency,
    openingBalance,
    openingBalanceDate: createCalendarDate(input.openingBalanceDate),
    isActive: input.isActive,
  });
}
