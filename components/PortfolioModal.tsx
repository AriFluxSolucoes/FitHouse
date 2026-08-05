"use client";

import { Sparkles } from "lucide-react";

export default function PortfolioModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-paper border border-ink max-w-sm w-full p-6 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-10 border border-ink flex items-center justify-center mb-4">
          <Sparkles size={18} />
        </div>

        <h2 id="portfolio-modal-title" className="font-display text-xl text-ink mb-2">
          este site é um portfólio
        </h2>

        <p className="text-sm text-ink-soft leading-relaxed mb-6">
          A Fit House é um projeto de portfólio, feito apenas para fins de demonstração. Os
          produtos, preços e formas de pagamento são fictícios — nenhuma compra real é
          processada e nenhum valor será cobrado.
        </p>

        <button
          onClick={onClose}
          className="w-full bg-ink text-white text-sm font-semibold uppercase tracking-wide py-3 hover:bg-ink-soft transition-colors"
        >
          Entendi
        </button>
      </div>
    </div>
  );
}
