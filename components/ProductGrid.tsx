import Link from "next/link";
import { products } from "@/lib/data";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  return (
    <section id="produtos" className="px-4 sm:px-6 py-8">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="font-display text-xl sm:text-2xl text-ink">recomendados pra você</h2>
        <Link href="/categoria/todos" className="text-xs sm:text-sm text-ink font-semibold hover:underline">
          Ver tudo
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-6">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
