"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppNavigation } from "./app-navigation";

export function AppShell({children}:{children:React.ReactNode}){
  const pathname=usePathname();
  const hideFab=pathname.startsWith("/transactions")||pathname.startsWith("/settings");
  return <div className="min-h-dvh bg-white text-[#111827]"><main className="min-h-dvh w-full pb-20 lg:pb-0">{children}</main><div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#e5e9ef] bg-white px-2 pb-[max(.25rem,env(safe-area-inset-bottom))] lg:hidden"><AppNavigation/></div>{!hideFab?<Link href="/transactions/new" aria-label="Добавить операцию" className="fixed bottom-20 right-4 z-30 grid size-13 place-items-center rounded-full bg-[#1f73db] text-2xl text-white shadow-md lg:hidden">＋</Link>:null}</div>
}
