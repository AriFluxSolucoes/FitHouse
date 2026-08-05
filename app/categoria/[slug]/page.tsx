"use client";

import { useParams } from "next/navigation";
import { products, labelFromSlug } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import CategoryCircles from "@/components/CategoryCircles";
import BackButton from "@/components/BackButton";

export default function CategoriaPage() {
  const { slug } = useParams<{ slug: string }>();

  let results = products;
  let title = labelFromSlug(slug);

  if (slug === "todos") {
    title = "todos os produtos";
    results = products;
  } else if (slug === "ofertas") {
    results = products.filter((p) => p.originalPrice);
  } else if (slug === "novidades") {
    results = products.filter((p) => p.isNew);
  } else {
    results = products.filter((p) => p.category.includes(slug));
  }

  return (
    <main className="flex flex-col min-h-screen bg-paper">
      <div className="sticky top-0 z-30 shadow-sm">
        <TopBar />
        <Header />
        <CategoryNav />
      </div>

      <section className="px-4 sm:px-6 py-8 flex-1">
        <BackButton className="mb-4" />

        <h1 className="font-display text-2xl text-ink mb-2 capitalize">{title}</h1>
        <p className="text-sm text-ink-soft mb-6">{results.length} produto(s) encontrado(s)</p>

        {results.length === 0 ? (
          <p className="text-ink-soft">Nenhum produto encontrado nesta categoria.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-6">
            {results.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </section>

    </main>
  );
}
