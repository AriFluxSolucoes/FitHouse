import { Newspaper, Download, Mail } from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import BackButton from "@/components/BackButton";

const news = [
  { outlet: "Moda & Cia", date: "Jun/2026", title: "Fit House aposta em tecidos tecnológicos para nova coleção" },
  { outlet: "Esporte Total", date: "Mar/2026", title: "Marcas de moda fitness crescem no e-commerce brasileiro" },
  { outlet: "Varejo Hoje", date: "Jan/2026", title: "Fit House amplia catálogo com linha plus size" },
];

export default function ImprensaPage() {
  return (
    <main className="flex flex-col min-h-screen bg-paper">
      <div className="sticky top-0 z-30 shadow-sm">
        <TopBar />
        <Header />
        <CategoryNav />
      </div>

      <section className="px-4 sm:px-6 py-10 max-w-2xl mx-auto w-full flex-1">
        <BackButton className="mb-6" />
        <h1 className="font-display text-2xl text-ink mb-1">imprensa</h1>
        <p className="text-sm text-ink-soft mb-8">
          Materiais de apoio para jornalistas e parceiros de imprensa, além de menções recentes
          sobre a Fit House.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="border border-hair p-4 flex flex-col items-start gap-2">
            <Download size={18} className="text-ink" strokeWidth={1.5} />
            <p className="text-sm font-semibold text-ink">Kit de imprensa</p>
            <p className="text-xs text-ink-soft">Logos, imagens e informações institucionais.</p>
          </div>
          <div className="border border-hair p-4 flex flex-col items-start gap-2">
            <Mail size={18} className="text-ink" strokeWidth={1.5} />
            <p className="text-sm font-semibold text-ink">Contato de imprensa</p>
            <p className="text-xs text-ink-soft">imprensa@fithouse.com.br</p>
          </div>
        </div>

        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink mb-3">
          Na mídia
        </h2>
        <div className="flex flex-col">
          {news.map((n) => (
            <div key={n.title} className="flex items-start gap-3 border-b border-hair py-4 last:border-b-0">
              <Newspaper size={16} className="text-ink-soft mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-ink">{n.title}</p>
                <p className="text-xs text-ink-soft mt-1">{n.outlet} · {n.date}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-ink-soft mt-8 border-t border-hair pt-4">
          Site de portfólio: as matérias listadas acima são fictícias.
        </p>
      </section>
    </main>
  );
}
