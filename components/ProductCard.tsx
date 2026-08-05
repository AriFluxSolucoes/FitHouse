"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Shirt } from "lucide-react";
import SwatchTile from "./SwatchTile";
import { useStore } from "@/lib/store";
import type { Product } from "@/lib/data";

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  const { toggleFavorite, isFavorite } = useStore();
  const favorited = isFavorite(product.id);
  const discount = product.originalPrice
    ? Math.round(100 - (product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="group" data-index={index}>
      <div className="relative overflow-hidden">
        <Link href={`/produto/${product.id}`} className="block">
          {product.image ? (
            <Image src={product.image} alt={product.name} width={400} height={533} className="aspect-[3/4] w-full object-cover" />
          ) : (
            <SwatchTile icon={Shirt} className="aspect-[3/4] w-full" />
          )}
        </Link>

        <button
          aria-label="Adicionar aos favoritos"
          onClick={() => toggleFavorite(product.id)}
          className="absolute top-2 right-2 bg-paper border border-hair hover:border-ink text-ink p-1.5 transition-colors"
        >
          <Heart size={16} className={favorited ? "fill-ink" : ""} />
        </button>

        {discount && (
          <span className="absolute top-2 left-2 bg-ink text-white text-[11px] font-bold px-1.5 py-0.5">
            -{discount}%
          </span>
        )}
      </div>

      <Link href={`/produto/${product.id}`} className="pt-2 block">
        <p className="text-[13px] text-ink line-clamp-2 leading-snug">{product.name}</p>

        <div className="flex items-baseline gap-1.5 mt-1">
          <span className="text-ink font-bold text-sm">
            R${product.price.toFixed(2).replace(".", ",")}
          </span>
          {product.originalPrice && (
            <span className="text-ink-soft/60 text-xs line-through">
              R${product.originalPrice.toFixed(2).replace(".", ",")}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 mt-1 text-[11px] text-ink-soft">
          <Star size={12} className="fill-ink text-ink" />
          <span>{product.rating}</span>
          <span>({product.reviews})</span>
          {product.colors && <span className="ml-auto">+{product.colors} cores</span>}
        </div>
      </Link>
    </div>
  );
}