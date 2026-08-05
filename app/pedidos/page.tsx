"use client";

import Link from "next/link";
import { Package } from "lucide-react";
import { useAuth } from "@/lib/auth";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import BackButton from "@/components/BackButton";

export default function MeusPedidosPage() {
  const { isLoggedIn, loaded } = useAuth();

  if (loaded && !isLoggedIn) {
    return (
      <main className="flex flex-col min-h-screen bg-paper">
        <div className="sticky top-0 z-30 shadow-sm">
          <TopBar />
          <Header />
          <CategoryNav />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center gap-4">
          <BackButton />
          <p className="text-ink-soft">Você precisa entrar para ver seus pedidos.</p>
          <Link
            href="/login?redirect=/pedidos"
            className="bg-ink text-white text-sm font-semibold uppercase tracking-wide py-3 px-6 hover:bg-ink-soft transition-colors"
          >
            Entrar
          </Link>
        </div>
      </main>
    );
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
        <h1 className="font-display text-2xl text-ink mb-6">meus pedidos</h1>

        <div className="border border-hair py-16 flex flex-col items-center gap-4 text-center px-4">
          <div className="w-14 h-14 border border-hair rounded-full flex items-center justify-center">
            <Package size={24} className="text-ink-soft" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-ink font-semibold mb-1">Você ainda não fez nenhum pedido</p>
            <p className="text-sm text-ink-soft max-w-xs">
              Este é um site de portfólio: o checkout é apenas demonstrativo, então nenhum
              pedido real é gerado por aqui.
            </p>
          </div>
          <Link
            href="/"
            className="mt-2 border border-ink text-ink text-xs font-semibold uppercase tracking-wide px-5 py-2.5 hover:bg-ink hover:text-white transition-colors"
          >
            Continuar comprando
          </Link>
        </div>
      </section>
    </main>
  );
}
