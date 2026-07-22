export type CategoryRecord = Readonly<{
  id: string;
  name: string;
  kind: "income" | "expense";
  isActive: boolean;
}>;
