"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({
  label = "Voltar",
  fallbackHref = "/",
  className = "",
}: {
  label?: string;
  fallbackHref?: string;
  className?: string;
}) {
  const router = useRouter();

  function handleBack() {
    // Se existir histórico de navegação dentro do app, volta uma página;
    // caso contrário (ex: acesso direto pela URL), leva para uma rota segura.
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink transition-colors ${className}`}
    >
      <ArrowLeft size={16} />
      {label}
    </button>
  );
}
