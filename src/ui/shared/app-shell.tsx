"use client";

import Link from "next/link";
import { useDashboardData } from "@/src/ui/home/use-dashboard-data";
import { AppNavigation } from "./app-navigation";

export function AppShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const dashboard = useDashboardData();
  return (
    <div className="min-h-dvh bg-white text-[#101828]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[235px] border-r border-[#edf1ef] bg-white px-[17.5px] py-[27.5px] lg:flex lg:flex-col">
        <Link href="/" className="flex h-[55px] items-center gap-[15px] px-2.5 text-[22.5px] font-bold leading-none tracking-tight">
          <span className="flex h-[32px] items-end gap-[3px]" aria-hidden><i className="h-[10px] w-[6.25px] rounded-sm bg-[#22a660]"/><i className="h-[20px] w-[6.25px] rounded-sm bg-[#22a660]"/><i className="h-[27.5px] w-[6.25px] rounded-sm bg-[#22a660]"/></span>
          PFinance
        </Link>
        <div className="mt-[17.5px]"><AppNavigation variant="desktop" /></div>
        <section className="mt-auto min-h-[189px] rounded-[15px] border border-[#e7e9ed] p-[17.5px] text-[13.75px] leading-[18px] shadow-[0_2px_10px_rgba(15,23,42,0.025)]">
          <div className="mb-[15px] flex items-center justify-between"><strong className="font-semibold">Мои счета</strong><span className="text-[#98a2b3]">⌃</span></div>
          {dashboard.account ? <div className="flex h-10 items-center justify-between gap-2.5"><span className="flex min-w-0 items-center gap-2.5"><i className="size-2.5 shrink-0 rounded-full bg-[#22a660]"/><span className="truncate">{dashboard.account.name}</span></span><b className="shrink-0">{formatSidebarMoney(dashboard.totalBalance)}</b></div> : null}
          <div className="mt-2.5 flex h-[45px] items-center justify-between border-t border-[#eef0ef] pt-2.5"><span>Итого</span><b>{formatSidebarMoney(dashboard.totalBalance)}</b></div>
        </section>
        <div className="mt-5 flex h-[55px] items-center gap-[15px] rounded-[15px] border border-[#e7e9ed] px-[15px] text-[13.75px] leading-[18px] text-[#667085] shadow-[0_2px_10px_rgba(15,23,42,0.025)]"><span className="text-xl" aria-hidden>☼</span>Светлая тема</div>
      </aside>

      <main className="mx-auto min-h-dvh w-full max-w-[1440px] px-3 pb-20 sm:px-5 lg:mx-0 lg:ml-[190px] lg:w-[calc(100%-190px)] lg:px-4 lg:pb-0">{children}</main>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#e8ece9] bg-white px-2 pb-[max(.25rem,env(safe-area-inset-bottom))] lg:hidden"><AppNavigation variant="mobile" /></div>
      <Link href="/transactions/new" aria-label="Добавить операцию" className="fixed bottom-20 right-4 z-30 grid size-13 place-items-center rounded-full bg-[#169653] text-2xl text-white shadow-md lg:hidden">＋</Link>
    </div>
  );
}

function formatSidebarMoney(units: bigint): string {
  return `${new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(Number(units / 100n))} ₽`;
}
