"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerAccount } from "@/services/storage";
import { useTheme } from "@/contexts/ThemeContext";

export default function Cadastro() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const escuro = theme === "dark";

  const [nome, setNome] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState<"aluno" | "admin">("aluno");
  const [cpf, setCpf] = useState("");
  const [matricula, setMatricula] = useState("");
  const [erro, setErro] = useState("");

  function cadastrar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");

    const usuarioFinal = usuario.trim();
    const result = registerAccount({
      name: nome,
      username: usuarioFinal,
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
    <main
      className={`min-h-screen flex items-center justify-center p-5 transition-colors duration-300 ${
        escuro ? "bg-[#111827]" : "bg-gray-50"
      }`}
    >
      <div className="w-full max-w-md">

        <div className="flex justify-end mb-5">
          <button
            type="button"
            onClick={toggleTheme}
            className={`text-sm px-4 py-2 rounded-lg transition ${
              escuro
                ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            {escuro ? "☀ Modo claro" : "☾ Modo escuro"}
          </button>
        </div>

        <div
          className={`p-8 rounded-2xl border shadow-sm transition-colors duration-300 ${
            escuro
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-gray-100"
          }`}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              <span className={escuro ? "text-white" : "text-gray-900"}>ETE</span>
              <span className="text-blue-700">on</span>
            </h1>

            <p className={`text-sm mt-2 ${
              escuro ? "text-gray-400" : "text-gray-500"
            }`}>
              Crie sua conta para continuar.
            </p>
          </div>

          <form onSubmit={cadastrar} className="space-y-5">

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                escuro ? "text-gray-200" : "text-gray-700"
              }`}>
                Tipo de conta
              </label>

              <select
                value={tipo}
                onChange={(event) => {
                  const value = event.target.value;
                  if (value === "aluno" || value === "admin") setTipo(value);
                }}
                className={`w-full p-3 rounded-lg border outline-none focus:ring-2 focus:ring-green-500 ${
                  escuro
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-gray-50 border-gray-200 text-gray-800"
                }`}
              >
                <option value="aluno">Aluno</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                escuro ? "text-gray-200" : "text-gray-700"
              }`}>
                Nome completo
              </label>

              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite seu nome"
                required
                className={`w-full p-3 rounded-lg border outline-none focus:ring-2 focus:ring-green-500 ${
                  escuro
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    : "bg-gray-50 border-gray-200 text-gray-800"
                }`}
              />
            </div>

            {tipo === "admin" && (
              <>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    escuro ? "text-gray-200" : "text-gray-700"
                  }`}>
                    CPF
                  </label>

                  <input
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder="Digite seu CPF"
                    required
                    className={`w-full p-3 rounded-lg border outline-none focus:ring-2 focus:ring-green-500 ${
                      escuro
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        : "bg-gray-50 border-gray-200 text-gray-800"
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    escuro ? "text-gray-200" : "text-gray-700"
                  }`}>
                    Matrícula
                  </label>

                  <input
                    type="text"
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                    placeholder="Digite sua matrícula"
                    required
                    className={`w-full p-3 rounded-lg border outline-none focus:ring-2 focus:ring-green-500 ${
                      escuro
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        : "bg-gray-50 border-gray-200 text-gray-800"
                    }`}
                  />
                </div>
              </>
            )}

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                escuro ? "text-gray-200" : "text-gray-700"
              }`}>
                Usuário
              </label>

              <input
                type="text"
                value={usuario}
                onChange={(e) => {
                  setUsuario(e.target.value);
                  setErro("");
                }}
                placeholder="Escolha um usuário"
                required
                className={`w-full p-3 rounded-lg border outline-none focus:ring-2 focus:ring-green-500 ${
                  escuro
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    : "bg-gray-50 border-gray-200 text-gray-800"
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                escuro ? "text-gray-200" : "text-gray-700"
              }`}>
                Senha
              </label>

              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Crie uma senha"
                required
                className={`w-full p-3 rounded-lg border outline-none focus:ring-2 focus:ring-green-500 ${
                  escuro
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    : "bg-gray-50 border-gray-200 text-gray-800"
                }`}
              />
            </div>

            {erro && (
              <p className="text-sm text-red-500">
                {erro}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold p-3 rounded-lg transition duration-200"
            >
              Cadastrar
            </button>

            <p className={`text-sm text-center ${
              escuro ? "text-gray-400" : "text-gray-500"
            }`}>
              Já tem conta?{" "}
              <Link
                href="/login"
                className="text-green-600 font-semibold hover:underline"
              >
                Fazer login
              </Link>
            </p>

          </form>
        </div>

        <p className={`text-xs text-center mt-6 ${
          escuro ? "text-gray-600" : "text-gray-400"
        }`}>
          © 2026 ETEon — Escolas Técnicas de Pernambuco
        </p>

      </div>
    </main>
  );
}
