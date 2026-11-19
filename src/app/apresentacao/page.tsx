import { AppShell } from "@/components/AppShell";

export default function ApresentacaoPage() {
  return (
    <AppShell
      title="Apresentação"
      subtitle="Conheça a plataforma ETEon"
    >
      <section className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <h1 className="text-2xl font-bold tracking-tight">
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
      </section>
    </AppShell>
  );
}
