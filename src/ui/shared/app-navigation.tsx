"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const desktopSections = [
  { href: "/", label: "Главная", icon: "home" },
  { href: "/transactions", label: "Операции", icon: "list" },
  { href: "/budgets", label: "Бюджет", icon: "pie" },
  { href: "/settings/accounts", label: "Счета", icon: "wallet" },
  { href: "/settings/categories", label: "Категории", icon: "grid" },
  { href: "#goals", label: "Цели", icon: "target" },
  { href: "#analytics", label: "Аналитика", icon: "analytics" },
  { href: "#reports", label: "Отчёты", icon: "reports" },
  { href: "/settings", label: "Настройки", icon: "settings" },
] as const;
const mobileSections = desktopSections.slice(0, 4);
function current(pathname: string, href: string) { return href === "/" ? pathname === href : pathname.startsWith(href); }

export function AppNavigation({ variant }: Readonly<{ variant: "mobile" | "desktop" }>) {
  const pathname = usePathname();
  const sections = variant === "mobile" ? mobileSections : desktopSections;
  return <nav aria-label="Основная навигация"><ul className={variant === "mobile" ? "grid grid-cols-4" : "space-y-0"}>{sections.map((item) => { const active = current(pathname, item.href); return <li key={item.href}><Link href={item.href} aria-current={active ? "page" : undefined} className={variant === "mobile" ? `flex min-h-14 flex-col items-center justify-center gap-0.5 text-[10px] font-medium ${active ? "text-[#169653]" : "text-[#778195]"}` : `flex min-h-[45px] items-center gap-[18px] rounded-[10px] px-[15px] text-[13.75px] font-normal leading-[18px] transition ${active ? "bg-[#eff8f2] text-[#146e42]" : "text-[#344054] hover:bg-[#f7f9f8]"}`}><NavIcon name={item.icon} variant={variant} />{item.label}</Link></li>; })}</ul></nav>;
}

type NavIconName = (typeof desktopSections)[number]["icon"];
function NavIcon({ name, variant }: Readonly<{ name: NavIconName; variant: "mobile" | "desktop" }>) {
  const paths: Record<NavIconName, React.ReactNode> = {
    home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></>,
    list: <><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></>,
    pie: <><path d="M21 12a9 9 0 1 1-9-9v9z"/><path d="M15 3.5A9 9 0 0 1 20.5 9H15z"/></>,
    wallet: <><path d="M4 7h15a2 2 0 0 1 2 2v10H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h13v4"/><path d="M16 12h5"/></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    target: <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 2v3M22 12h-3"/></>,
    analytics: <><path d="M5 20v-7M12 20V4M19 20V9"/></>,
    reports: <><path d="M6 2h9l4 4v16H6z"/><path d="M14 2v5h5M9 13h6M9 17h6"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.1A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.1A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.1A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.15.36.39.7.7.96.3.26.68.4 1.1.4h.1v4h-.1c-.42 0-.8.14-1.1.4-.31.26-.55.6-.7.96z"/></>,
  };
  return <svg aria-hidden viewBox="0 0 24 24" className={`${variant === "desktop" ? "size-[21.25px]" : "size-[17px]"} shrink-0`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}
