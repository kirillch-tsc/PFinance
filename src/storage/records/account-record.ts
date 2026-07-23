export type AccountRecord = Readonly<{
  id: string;
  name: string;
  currency: string;
  openingBalance: string;
  openingBalanceDate: string;
  isActive: boolean;
  importMetadata?: Readonly<{
    sourceWorkbook: string;
    accountType: "cash";
  }>;
}>;
