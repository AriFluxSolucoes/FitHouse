"use client";

import { useState } from "react";
import { Search, Check, Package, Truck, Home } from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import BackButton from "@/components/BackButton";

const trackingSteps = [
  { icon: Check, label: "Pedido confirmado" },
  { icon: Package, label: "Em separação" },
  { icon: Truck, label: "A caminho" },
  { icon: Home, label: "Entregue" },
];

export default function RastrearPedidoPage() {
  const [orderCode, setOrderCode] = useState("");
  const [result, setResult] = useState<null | { code: string; step: number }>(null);
  const [error, setError] = useState("");

  function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const code = orderCode.trim();
    if (!code) {
      setError("Digite o código do seu pedido.");
      return;
    }
    // Simulação de rastreamento (site de portfólio, sem backend real):
    // gera um passo "aleatório, porém consistente" a partir do código digitado.
    const hash = code.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
    const step = hash % trackingSteps.length;
    setResult({ code, step });
  }

  return (
    <main className="flex flex-col min-h-screen bg-paper">
      <div className="sticky top-0 z-30 shadow-sm">
        <TopBar />
        <Header />
        <CategoryNav />
      </div>

      <section className="px-4 sm:px-6 py-10 max-w-xl mx-auto w-full flex-1">
        <BackButton className="mb-6" />
        <h1 className="font-display text-2xl text-ink mb-1">rastrear pedido</h1>
        <p className="text-sm text-ink-soft mb-8">
          Digite o código de rastreio ou o número do pedido para acompanhar a entrega.
        </p>

        <form onSubmit={handleTrack} className="flex items-stretch border border-ink mb-4">
          <input
            value={orderCode}
            onChange={(e) => setOrderCode(e.target.value)}
            placeholder="Ex: FH123456789"
            className="flex-1 min-w-0 px-4 py-3 text-sm outline-none placeholder:text-ink-soft/60"
          />
          <button
            type="submit"
            className="bg-ink text-white px-5 flex items-center justify-center hover:bg-ink-soft transition-colors"
            aria-label="Rastrear"
          >
            <Search size={18} />
          </button>
        </form>

        {error && <p className="text-xs text-red-600 mb-4">{error}</p>}

        {result && (
          <div className="border border-hair p-5 mt-6">
            <p className="text-xs text-ink-soft mb-1">Pedido</p>
            <p className="text-sm font-semibold text-ink mb-6">{result.code}</p>

            <div className="flex items-center justify-between relative">
              <div className="absolute top-4 left-4 right-4 h-px bg-hair" />
              {trackingSteps.map((s, i) => {
                const done = i <= result.step;
                return (
                  <div key={s.label} className="relative flex flex-col items-center gap-2 z-10 flex-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                        done ? "bg-ink border-ink text-white" : "bg-paper border-hair text-ink-soft"
                      }`}
                    >
                      <s.icon size={14} />
                    </div>
                    <span className={`text-[11px] text-center ${done ? "text-ink font-medium" : "text-ink-soft"}`}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-ink-soft mt-6 text-center">
              Este é um site de portfólio — o status acima é apenas demonstrativo.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
