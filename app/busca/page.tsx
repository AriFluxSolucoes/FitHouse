"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import BackButton from "@/components/BackButton";

function SearchResults() {
  const searchParams = useSearchParams();
  const q = (searchParams.get("q") || "").toLowerCase();
  const results = products.filter((p) => p.name.toLowerCase().includes(q));

  return (
    <section className="px-4 sm:px-6 py-8 flex-1">
      <BackButton className="mb-4" />
      <h1 className="font-display text-2xl text-ink mb-2">resultados para &quot;{q}&quot;</h1>
      <p className="text-sm text-ink-soft mb-6">{results.length} produto(s) encontrado(s)</p>

      {results.length === 0 ? (
        <p className="text-ink-soft">Nenhum produto encontrado.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-6">
          {results.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}

export default function SearchPage() {
  return (
    <main className="flex flex-col min-h-screen bg-paper">
      <div className="sticky top-0 z-30 shadow-sm">
        <TopBar />
        <Header />
        <CategoryNav />
      </div>

      <Suspense fallback={<div className="px-6 py-8">Carregando...</div>}>
        <SearchResults />
      </Suspense>

    </main>
  );
}