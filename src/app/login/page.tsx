"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GraduationCap, LockKeyhole, Moon, Sun, UserRound, Video } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function LoginPage() {
  const { session, ready, login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isSubmitting = loading && Boolean(session);

  useEffect(() => {
    if (ready && session) {
      router.replace(session.role === "admin" ? "/admin" : "/aluno");
    }
  }, [ready, router, session]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (!username.trim() || !password) { setError("Preencha usuário e senha."); return; }
    setLoading(true);
    const result = login(username, password);
    if (!result.success) { setError(result.message); setLoading(false); }
  };

  return <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,64,175,0.14),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(185,28,28,0.08),transparent_30%)]" />
    <button onClick={toggleTheme} aria-label="Alternar tema" className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white/80 text-slate-600 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300">{theme === "light" ? <Moon size={19} /> : <Sun size={19} />}</button>
    <div className="relative mx-auto grid min-h-screen max-w-6xl items-center px-5 py-12 lg:grid-cols-[1fr_440px] lg:px-8">
      <section className="hidden pr-16 lg:block">
        <div className="mb-8 flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-700 text-white shadow-xl shadow-blue-900/20"><GraduationCap size={25} /></div><div><p className="text-xl font-bold">ETEon</p><p className="text-sm text-slate-500 dark:text-slate-400">Escolas Técnicas de Pernambuco</p></div></div>
        <h1 className="max-w-xl text-5xl font-bold leading-[1.08] tracking-tight">Toda sua jornada escolar em um só lugar.</h1>
        <p className="mt-5 max-w-lg text-lg leading-8 text-slate-500 dark:text-slate-400">Acompanhe desempenho, notas e situações acadêmicas com uma experiência clara, rápida e segura.</p>
      </section>
      <section className="mx-auto w-full max-w-md rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-2xl shadow-slate-900/5 backdrop-blur sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
        <div className="mb-7 flex items-center gap-3 lg:hidden"><div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-700 text-white"><GraduationCap size={22} /></div><div><p className="font-bold">ETEon</p><p className="text-xs text-slate-500">Escolas Técnicas de Pernambuco</p></div></div>
        <h2 className="text-2xl font-bold">Bem-vindo de volta</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Entre com suas credenciais para continuar.</p>
        <form onSubmit={submit} autoComplete="off" className="mt-7 space-y-5">
          <div><label className="mb-2 block text-sm font-medium">Usuário</label><div className="relative"><UserRound className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input name="username" autoComplete="off" value={username} onChange={(event) => { setUsername(event.target.value); setError(""); }} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950" placeholder="Seu identificador" /></div></div>
          <div><label className="mb-2 block text-sm font-medium">Senha</label><div className="relative"><LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input name="password" type="password" autoComplete="off" value={password} onChange={(event) => { setPassword(event.target.value); setError(""); }} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950" placeholder="Sua senha" /></div></div>
          {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">{error}</div>}
          <button disabled={isSubmitting} className="h-12 w-full rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700 disabled:cursor-wait disabled:opacity-70">{isSubmitting ? "Entrando..." : "Entrar no portal"}</button>
        </form>
        <section className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Video size={17} className="text-indigo-600 dark:text-indigo-400" />
            Apresentação da plataforma
          </h3>
          <video
            className="aspect-video w-full rounded-xl bg-slate-950"
            controls
            preload="metadata"
            width="1280"
            height="720"
          >
            <source src="/apresentacao.mp4" type="video/mp4" />
            Seu navegador não oferece suporte à reprodução de vídeo.
          </video>
        </section>
        <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
          Ainda não tem uma conta?{" "}
          <Link href="/cadastro" className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
            Cadastre-se
          </Link>
        </p>
        <div className="mt-6 rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-500 dark:bg-slate-950 dark:text-slate-400"><p className="mb-1 font-semibold text-slate-700 dark:text-slate-300">Credenciais demonstrativas</p><p>Administrador: <b>admin</b> / <b>admin123</b></p><p>Aluno: <b>eduardo.coutinho</b> / <b>aluno1</b></p></div>
      </section>
    </div>
  </main>;
}
