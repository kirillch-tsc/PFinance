import { AppShell } from "@/src/ui/shared/app-shell";
import { ClientRuntime } from "./client-runtime";

export default function ProductLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClientRuntime>
      <AppShell>{children}</AppShell>
    </ClientRuntime>
  );
}
