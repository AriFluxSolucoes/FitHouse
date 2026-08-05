"use client";

import { products } from "@/lib/data";
import { useStore } from "@/lib/store";
import ProductCard from "@/components/ProductCard";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import BackButton from "@/components/BackButton";

export default function FavoritesPage() {
  const { favorites } = useStore();
  const favProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <main className="flex flex-col min-h-screen bg-paper">
      <div className="sticky top-0 z-30 shadow-sm">
        <TopBar />
        <Header />
        <CategoryNav />
      </div>

      <section className="px-4 sm:px-6 py-8 flex-1">
        <BackButton className="mb-4" />
        <h1 className="font-display text-2xl text-ink mb-6">seus favoritos</h1>

        {favProducts.length === 0 ? (
          <p className="text-ink-soft">Você ainda não favoritou nenhum produto.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-6">
            {favProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </section>

    </main>
  );
}