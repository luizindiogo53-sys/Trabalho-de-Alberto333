"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, GraduationCap, Moon, Sun } from "lucide-react";
import { registerAccount } from "@/services/storage";
import { useTheme } from "@/contexts/ThemeContext";

export default function Cadastro() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [nome, setNome] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [tipo, setTipo] = useState<"aluno" | "admin">("aluno");
  const [cpf, setCpf] = useState("");
  const [matricula, setMatricula] = useState("");
  const [erro, setErro] = useState("");

  function cadastrar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");

    const result = registerAccount({
      name: nome,
      username: usuario.trim(),
      password: senha,
      role: tipo,
      registration: matricula,
    });

    if (!result.success) {
      setErro(result.message);
      return;
    }

    router.push("/login");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,64,175,0.14),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(185,28,28,0.08),transparent_30%)]" />
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Alternar tema"
        className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white/80 text-slate-600 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300"
      >
        {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
      </button>
      <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-8 px-5 py-20 lg:grid-cols-[1fr_440px] lg:px-8">
        <section className="hidden pr-16 lg:block">
          <div className="mb-8 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-700 text-white shadow-xl shadow-blue-900/20">
              <GraduationCap size={25} />
            </div>
            <div>
              <p className="text-xl font-bold">ETEon</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Escolas Técnicas de Pernambuco
              </p>
            </div>
          </div>
          <h1 className="max-w-xl text-5xl font-bold leading-[1.08] tracking-tight">
            Faça parte da sua comunidade escolar.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-slate-500 dark:text-slate-400">
            Crie sua conta para acompanhar sua jornada acadêmica com praticidade.
          </p>
        </section>

        <section className="mx-auto w-full max-w-md rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-2xl shadow-slate-900/5 backdrop-blur sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
          <div className="mb-7 flex items-center gap-3 lg:hidden">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-700 text-white">
              <GraduationCap size={22} />
            </div>
            <div>
              <p className="font-bold">ETEon</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Escolas Técnicas de Pernambuco
              </p>
            </div>
          </div>
          <h2 className="text-2xl font-bold">Crie sua conta</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Preencha seus dados para começar.
          </p>

          <form onSubmit={cadastrar} className="mt-7 space-y-4">
            <div>
              <label htmlFor="tipo" className="mb-2 block text-sm font-medium">
                Tipo de conta
              </label>
              <select
                id="tipo"
                value={tipo}
                onChange={(event) => {
                  const value = event.target.value;
                  if (value === "aluno" || value === "admin") setTipo(value);
                }}
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950"
              >
                <option value="aluno">Aluno</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <div>
              <label htmlFor="nome" className="mb-2 block text-sm font-medium">
                Nome completo
              </label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                placeholder="Digite seu nome"
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950"
              />
            </div>

            {tipo === "admin" && (
              <>
                <div>
                  <label htmlFor="cpf" className="mb-2 block text-sm font-medium">
                    CPF
                  </label>
                  <input
                    id="cpf"
                    type="text"
                    value={cpf}
                    onChange={(event) => setCpf(event.target.value)}
                    placeholder="Digite seu CPF"
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950"
                  />
                </div>
                <div>
                  <label htmlFor="matricula" className="mb-2 block text-sm font-medium">
                    Matrícula
                  </label>
                  <input
                    id="matricula"
                    type="text"
                    value={matricula}
                    onChange={(event) => setMatricula(event.target.value)}
                    placeholder="Digite sua matrícula"
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950"
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="usuario" className="mb-2 block text-sm font-medium">
                Usuário
              </label>
              <input
                id="usuario"
                type="text"
                value={usuario}
                onChange={(event) => {
                  setUsuario(event.target.value);
                  setErro("");
                }}
                placeholder="Escolha um usuário"
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950"
              />
            </div>

            <div>
              <label htmlFor="senha" className="mb-2 block text-sm font-medium">
                Senha
              </label>
              <div className="relative">
                <input
                  id="senha"
                  type={mostrarSenha ? "text" : "password"}
                  value={senha}
                  onChange={(event) => setSenha(event.target.value)}
                  placeholder="Crie uma senha"
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha((visivel) => !visivel)}
                  aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                >
                  {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {erro && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
              >
                {erro}
              </div>
            )}

            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700"
            >
              Cadastrar
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
            Já tem conta?{" "}
            <Link
              href="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Fazer login
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
