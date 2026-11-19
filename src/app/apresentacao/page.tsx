import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function ApresentacaoPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,64,175,0.14),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(185,28,28,0.08),transparent_30%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-5 py-12 sm:px-8">
        <header className="mb-8 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-700 text-white shadow-xl shadow-blue-900/20">
            <GraduationCap size={25} />
          </div>
          <div>
            <p className="text-xl font-bold">ETEon</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Escolas Técnicas de Pernambuco
            </p>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200/80 bg-white/95 p-5 shadow-2xl shadow-slate-900/5 backdrop-blur sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Apresentação da Escola Online
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Conheça a plataforma ETEon.
          </p>
          <video
            className="mt-6 aspect-video w-full rounded-2xl bg-slate-950"
            controls
            preload="metadata"
            width="1280"
            height="720"
          >
            <source src="/apresentacao.mp4" type="video/mp4" />
            Seu navegador não oferece suporte à reprodução de vídeo.
          </video>
          <div className="mt-6 flex justify-end">
            <Link
              href="/login"
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Ir para o login
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
