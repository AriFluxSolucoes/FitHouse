"use client";

import { useState } from "react";
import { Briefcase, MapPin } from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import BackButton from "@/components/BackButton";

const openings = [
  { title: "Analista de E-commerce", team: "Marketing", location: "São Paulo, SP · Híbrido" },
  { title: "Designer de Produto (Moda)", team: "Produto", location: "São Paulo, SP · Presencial" },
  { title: "Desenvolvedor(a) Frontend", team: "Tecnologia", location: "Remoto" },
  { title: "Analista de Logística", team: "Operações", location: "Guarulhos, SP · Presencial" },
];

export default function TrabalheConoscoPage() {
  const [applied, setApplied] = useState<string | null>(null);

  return (
    <main className="flex flex-col min-h-screen bg-paper">
      <div className="sticky top-0 z-30 shadow-sm">
        <TopBar />
        <Header />
        <CategoryNav />
      </div>

      <section className="px-4 sm:px-6 py-10 max-w-2xl mx-auto w-full flex-1">
        <BackButton className="mb-6" />
        <h1 className="font-display text-2xl text-ink mb-1">trabalhe conosco</h1>
        <p className="text-sm text-ink-soft mb-8">
          Buscamos pessoas apaixonadas por moda, esporte e tecnologia para fazer parte do nosso
          time. Confira as vagas abertas abaixo.
        </p>

        <div className="flex flex-col gap-3">
          {openings.map((job) => (
            <div
              key={job.title}
              className="border border-hair p-4 flex items-center justify-between gap-4 flex-wrap"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase size={14} className="text-ink-soft" />
                  <p className="text-sm font-semibold text-ink">{job.title}</p>
                </div>
                <p className="text-xs text-ink-soft">{job.team}</p>
                <div className="flex items-center gap-1 text-xs text-ink-soft mt-1">
                  <MapPin size={12} />
                  {job.location}
                </div>
              </div>

              {applied === job.title ? (
                <span className="text-xs font-semibold text-green-700">Candidatura enviada ✓</span>
              ) : (
                <button
                  onClick={() => setApplied(job.title)}
                  className="border border-ink text-ink text-xs font-semibold uppercase tracking-wide px-4 py-2 hover:bg-ink hover:text-white transition-colors shrink-0"
                >
                  Candidatar-se
                </button>
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-ink-soft mt-8 border-t border-hair pt-4">
          Site de portfólio: as vagas acima são fictícias e a candidatura não é enviada de
          verdade.
        </p>
      </section>
    </main>
  );
}
