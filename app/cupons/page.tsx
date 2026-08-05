"use client";

import { useState } from "react";
import { Ticket, Copy, Check } from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import BackButton from "@/components/BackButton";

const coupons = [
  { code: "BEMVINDO10", desc: "10% off na primeira compra", expires: "Válido até 31/12/2026" },
  { code: "FRETEGRATIS", desc: "Frete grátis em compras acima de R$150", expires: "Válido até 31/12/2026" },
  { code: "TREINO20", desc: "20% off em leggings e conjuntos", expires: "Válido até 30/09/2026" },
];

export default function CuponsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  function handleCopy(code: string) {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <main className="flex flex-col min-h-screen bg-paper">
      <div className="sticky top-0 z-30 shadow-sm">
        <TopBar />
        <Header />
        <CategoryNav />
      </div>

      <section className="px-4 sm:px-6 py-10 max-w-2xl mx-auto w-full flex-1">
        <BackButton className="mb-6" />
        <h1 className="font-display text-2xl text-ink mb-1">cupons</h1>
        <p className="text-sm text-ink-soft mb-8">
          Aproveite os cupons disponíveis e aplique o código na sua sacola na hora de finalizar
          a compra.
        </p>

        <div className="flex flex-col gap-3">
          {coupons.map((c) => (
            <div
              key={c.code}
              className="border border-dashed border-hair p-4 flex items-center justify-between gap-4 flex-wrap"
            >
              <div className="flex items-start gap-3">
                <Ticket size={18} className="text-ink mt-0.5 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-bold text-ink tracking-wide">{c.code}</p>
                  <p className="text-xs text-ink-soft">{c.desc}</p>
                  <p className="text-[11px] text-ink-soft/70 mt-0.5">{c.expires}</p>
                </div>
              </div>
              <button
                onClick={() => handleCopy(c.code)}
                className="flex items-center gap-1.5 border border-ink text-ink text-xs font-semibold uppercase tracking-wide px-4 py-2 hover:bg-ink hover:text-white transition-colors shrink-0"
              >
                {copied === c.code ? (
                  <>
                    <Check size={13} /> Copiado
                  </>
                ) : (
                  <>
                    <Copy size={13} /> Copiar
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        <p className="text-xs text-ink-soft mt-8 border-t border-hair pt-4">
          Site de portfólio: os cupons acima não geram descontos reais, já que o checkout é
          apenas demonstrativo.
        </p>
      </section>
    </main>
  );
}
