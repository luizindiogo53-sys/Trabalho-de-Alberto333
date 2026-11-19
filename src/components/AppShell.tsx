"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import {
  Award, BookOpen, ChevronRight, GraduationCap, LayoutDashboard, LogOut, Menu,
  Settings, Sun, Moon, Users, UserRound, ClipboardList, Video, X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

interface AppShellProps { children: ReactNode; title: string; subtitle?: string; }

export function AppShell({ children, title, subtitle }: AppShellProps) {
  const { session, ready, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!ready) return;
    if (!session) { router.replace("/login"); return; }
    if (pathname.startsWith("/admin") && session.role !== "admin") router.replace("/aluno");
  }, [pathname, ready, router, session]);

  if (!ready || !session) return <div className="min-h-screen grid place-items-center bg-slate-50 dark:bg-slate-950"><div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" /></div>;

  const adminLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/alunos", label: "Alunos", icon: Users },
    { href: "/admin/disciplinas", label: "Disciplinas", icon: BookOpen },
    { href: "/admin/notas", label: "Notas e médias", icon: ClipboardList },
    { href: "/equipe", label: "Equipe", icon: Award },
    { href: "/apresentacao", label: "Apresentação", icon: Video },
  ];
  const studentLinks = [
    { href: "/aluno", label: "Início", icon: LayoutDashboard },
    { href: "/aluno/boletim", label: "Meu boletim", icon: ClipboardList },
    { href: "/aluno/boletim", label: "Minha situação", icon: GraduationCap },
    { href: "/apresentacao", label: "Apresentação", icon: Video },
  ];
  const links = session.role === "admin" ? adminLinks : studentLinks;
  const commonLinks = [{ href: "/configuracoes", label: "Configurações", icon: Settings }];

  const sidebar = (
    <aside className="flex h-full w-[272px] flex-col bg-[#111827] px-4 py-5 text-white">
      <div className="flex items-center gap-3 px-2 pb-7">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-500 shadow-lg shadow-indigo-950/30"><GraduationCap size={22} /></div>
        <div><p className="font-bold leading-tight">ETEon</p><p className="mt-0.5 text-xs text-slate-400">Escolas Técnicas de Pernambuco</p></div>
      </div>
      <nav className="space-y-1">
        {links.map((item) => {
          const active = pathname === item.href || (item.href !== "/admin" && item.href !== "/aluno" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)} className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${active ? "bg-indigo-500 text-white shadow-sm" : "text-slate-300 hover:bg-white/7 hover:text-white"}`}><Icon size={18} /><span className="flex-1">{item.label}</span>{active && <ChevronRight size={14} />}</Link>;
        })}
      </nav>
      <div className="mt-6 border-t border-white/10 pt-4">
        {commonLinks.map((item) => { const Icon = item.icon; return <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/7 hover:text-white"><Icon size={18} />{item.label}</Link>; })}
        <button onClick={logout} className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 transition hover:bg-red-500/10 hover:text-red-300"><LogOut size={18} />Sair</button>
      </div>
      <div className="mt-auto rounded-xl border border-white/8 bg-white/5 p-3">
        <div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-full bg-indigo-500/20 text-indigo-200"><UserRound size={17} /></div><div className="min-w-0"><p className="truncate text-sm font-semibold">{session.name}</p><p className="text-xs capitalize text-slate-400">{session.role}</p></div></div>
      </div>
    </aside>
  );

  return <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
    <div className="fixed inset-y-0 left-0 z-30 hidden lg:block">{sidebar}</div>
    {mobileOpen && <div className="fixed inset-0 z-50 lg:hidden"><button aria-label="Fechar menu" className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} /><div className="relative h-full w-[272px]">{sidebar}<button aria-label="Fechar" onClick={() => setMobileOpen(false)} className="absolute right-3 top-5 rounded-lg p-2 text-slate-300 hover:bg-white/10"><X size={20} /></button></div></div>}
    <div className="lg:pl-[272px]">
      <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90 sm:px-7">
        <div className="flex items-center gap-3"><button onClick={() => setMobileOpen(true)} className="rounded-lg border border-slate-200 p-2 lg:hidden dark:border-slate-800" aria-label="Abrir menu"><Menu size={20} /></button><div className="hidden sm:block"><p className="text-sm font-semibold">{title}</p>{subtitle && <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>}</div></div>
        <div className="flex items-center gap-2"><button onClick={toggleTheme} aria-label="Alternar tema" className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900">{theme === "light" ? <Moon size={18} /> : <Sun size={18} />}</button><div className="ml-1 hidden items-center gap-2 border-l border-slate-200 pl-4 sm:flex dark:border-slate-800"><div className="grid h-9 w-9 place-items-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300"><UserRound size={17} /></div><div><p className="max-w-28 truncate text-sm font-semibold">{session.name}</p><p className="text-xs capitalize text-slate-500">{session.role}</p></div></div></div>
      </header>
      <main className="mx-auto max-w-[1400px] p-4 sm:p-7">{children}</main>
    </div>
  </div>;
}
