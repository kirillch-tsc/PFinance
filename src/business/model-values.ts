import { assertModel } from "./validation/model-validation-error.ts";

declare const identifierBrand: unique symbol;
declare const moneyBrand: unique symbol;
declare const currencyBrand: unique symbol;
declare const calendarDateBrand: unique symbol;
declare const dateTimeBrand: unique symbol;

export type Identifier<Entity extends string = string> = string & {
  readonly [identifierBrand]: Entity;
};

export type Money = string & { readonly [moneyBrand]: true };
export type CurrencyCode = string & { readonly [currencyBrand]: true };
export type CalendarDate = string & { readonly [calendarDateBrand]: true };
export type DateTime = string & { readonly [dateTimeBrand]: true };

export const CATEGORY_KINDS = ["income", "expense"] as const;
export type CategoryKind = (typeof CATEGORY_KINDS)[number];

export const TRANSACTION_TYPES = ["income", "expense", "transfer"] as const;
export type TransactionType = (typeof TRANSACTION_TYPES)[number];

const moneyPattern = /^-?(?:0|[1-9]\d*)(?:\.\d+)?$/;
const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;
const dateTimePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2})$/;
const supportedCurrencies = new Set(Intl.supportedValuesOf("currency"));

export function createIdentifier<Entity extends string>(value: string): Identifier<Entity> {
  const normalized = value.trim();
  assertModel(normalized.length > 0, "Identifier must not be empty");
  return normalized as Identifier<Entity>;
}

export function createMoney(value: string): Money {
  assertModel(moneyPattern.test(value), "Money must be a canonical decimal string");
  assertModel(!value.startsWith("-0") || !isZeroMoney(value), "Money must not be negative zero");
  return value as Money;
}

export function createCurrencyCode(value: string): CurrencyCode {
  const normalized = value.trim().toUpperCase();
  assertModel(supportedCurrencies.has(normalized), "Currency must be a valid ISO 4217 code");
  return normalized as CurrencyCode;
}

export function createCalendarDate(value: string): CalendarDate {
  const match = datePattern.exec(value);
  assertModel(match !== null, "Date must use YYYY-MM-DD format");

  const [, year, month, day] = match;
  const parsed = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  const isSameDate =
    parsed.getUTCFullYear() === Number(year) &&
    parsed.getUTCMonth() === Number(month) - 1 &&
    parsed.getUTCDate() === Number(day);

  assertModel(isSameDate, "Date must be a real calendar date");
  return value as CalendarDate;
}

export function createDateTime(value: string): DateTime {
  assertModel(dateTimePattern.test(value), "DateTime must include a date, time and UTC offset");
  assertModel(Number.isFinite(Date.parse(value)), "DateTime must be valid");
  return value as DateTime;
}

export function createEntityName(value: string): string {
  const normalized = value.trim();
  assertModel(normalized.length > 0, "Name must not be empty");
  return normalized;
}

export function createOptionalNote(value: string | undefined): string | undefined {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

export function assertPositiveMoney(value: Money, fieldName: string): void {
  assertModel(!value.startsWith("-") && !isZeroMoney(value), `${fieldName} must be greater than zero`);
}

export function assertNonNegativeMoney(value: Money, fieldName: string): void {
  assertModel(!value.startsWith("-"), `${fieldName} must be zero or greater`);
}

export function assertMoneyMatchesCurrency(value: Money, currency: CurrencyCode): void {
  const fraction = value.split(".")[1]?.length ?? 0;
  const allowedFraction = new Intl.NumberFormat("en", {
    style: "currency",
    currency,
  }).resolvedOptions().maximumFractionDigits ?? 0;

  assertModel(
    fraction <= allowedFraction,
    `Money has more fractional digits than ${currency} allows`,
  );
}

export function datePart(value: DateTime): CalendarDate {
  return createCalendarDate(value.slice(0, 10));
}

export function isDateBefore(left: CalendarDate, right: CalendarDate): boolean {
  return left < right;
}

function isZeroMoney(value: string): boolean {
  return value.replace("-", "").replace(".", "").split("").every((digit) => digit === "0");
}
