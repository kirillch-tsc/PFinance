import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PFinance — семейные финансы",
  description: "Простое управление семейными финансами.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
