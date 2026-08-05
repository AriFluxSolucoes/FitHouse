"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Star, Heart, Shirt, Minus, Plus } from "lucide-react";
import { products } from "@/lib/data";
import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import SwatchTile from "@/components/SwatchTile";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import BackButton from "@/components/BackButton";
import ProductCard from "@/components/ProductCard";

const REVIEWS_PAGE_SIZE = 2;

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const product = products.find((p) => p.id === id);
  const { addToCart, toggleFavorite, isFavorite } = useStore();
  const { isLoggedIn } = useAuth();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(REVIEWS_PAGE_SIZE);

  // Reinicia a quantidade de avaliações visíveis e a quantidade selecionada
  // ao navegar de um produto para outro (padrão recomendado pelo React para
  // "resetar" estado quando uma prop muda, sem precisar de useEffect).
  const [lastId, setLastId] = useState(id);
  if (id !== lastId) {
    setLastId(id);
    setVisibleReviews(REVIEWS_PAGE_SIZE);
    setQty(1);
  }

  const related = product
    ? products
        .filter((p) => p.id !== product.id && p.category.some((c) => product.category.includes(c)))
        .slice(0, 10)
    : [];

  if (!product) {
    return (
      <main className="flex flex-col min-h-screen bg-paper">
        <TopBar />
        <Header />
        <CategoryNav />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
          <p className="text-ink-soft">Produto não encontrado.</p>
          <BackButton />
        </div>
      </main>
    );
  }

  const discount = product.originalPrice
    ? Math.round(100 - (product.price / product.originalPrice) * 100)
    : null;
  const favorited = isFavorite(product.id);

  function handleAddToCart() {
    if (!isLoggedIn) {
      router.push(`/login?redirect=/produto/${product!.id}`);
      return;
    }
    addToCart(product!, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleBuyNow() {
    if (!isLoggedIn) {
      router.push(`/login?redirect=/produto/${product!.id}`);
      return;
    }
    addToCart(product!, qty);
    router.push("/carrinho");
  }

  return (
    <main className="flex flex-col min-h-screen bg-paper">
      <div className="sticky top-0 z-30 shadow-sm">
        <TopBar />
        <Header />
        <CategoryNav />
      </div>

      <section className="px-4 sm:px-6 py-8 max-w-5xl mx-auto w-full">
        <BackButton className="mb-4" />

        <div className="grid sm:grid-cols-2 gap-8 mt-4">
          <div className="relative">
            {product.image ? (
              <Image src={product.image} alt={product.name} width={600} height={800} className="w-full aspect-[3/4] object-cover" />
            ) : (
              <SwatchTile icon={Shirt} className="aspect-[3/4] w-full" />
            )}
            {discount && (
              <span className="absolute top-3 left-3 bg-ink text-white text-xs font-bold px-2 py-1">
                -{discount}%
              </span>
            )}
          </div>

          <div>
            <h1 className="font-display text-2xl sm:text-3xl text-ink mb-2">{product.name}</h1>

            <button
              onClick={() => document.getElementById("avaliacoes")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-1 mb-4 text-sm text-ink-soft hover:text-ink transition-colors"
            >
              <Star size={14} className="fill-ink text-ink" />
              <span>{product.rating}</span>
              <span className="underline underline-offset-2">({product.reviews} avaliações)</span>
            </button>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-ink font-bold text-2xl">
                R${product.price.toFixed(2).replace(".", ",")}
              </span>
              {product.originalPrice && (
                <span className="text-ink-soft/60 text-base line-through">
                  R${product.originalPrice.toFixed(2).replace(".", ",")}
                </span>
              )}
            </div>

            {product.colors && (
              <p className="text-sm text-ink-soft mb-6">Disponível em {product.colors} cores</p>
            )}

            {product.description && (
              <div className="mb-6 pb-6 border-b border-hair">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-ink mb-2">Descrição</h2>
                <p className="text-sm text-ink-soft leading-relaxed">{product.description}</p>
              </div>
            )}

            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm text-ink">Quantidade:</span>
              <div className="flex items-center border border-hair">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2 hover:bg-fog" aria-label="Diminuir">
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="p-2 hover:bg-fog" aria-label="Aumentar">
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-ink text-white text-sm font-semibold uppercase tracking-wide py-3 hover:bg-ink-soft transition-colors"
              >
                {added ? "Adicionado! ✓" : isLoggedIn ? "Adicionar ao carrinho" : "Entrar para comprar"}
              </button>
              <button
                onClick={() => toggleFavorite(product.id)}
                aria-label={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                className="border border-hair hover:border-ink p-3 transition-colors"
              >
                <Heart size={20} className={favorited ? "fill-ink" : ""} />
              </button>
            </div>
            {!isLoggedIn && (
              <p className="text-xs text-ink-soft mt-2">
                Você precisa{" "}
                <Link href={`/login?redirect=/produto/${product.id}`} className="text-ink font-semibold underline">
                  entrar
                </Link>{" "}
                para adicionar itens ao carrinho.
              </p>
            )}
            <p className="text-xs text-ink-soft mt-2">
              {favorited ? "❤ Este produto está nos seus favoritos" : "Toque no coração para salvar nos favoritos"}
            </p>

            <button
              onClick={handleBuyNow}
              className="w-full border border-ink text-ink text-sm font-semibold uppercase tracking-wide py-3 mt-3 hover:bg-ink hover:text-white transition-colors"
            >
              {isLoggedIn ? "Comprar agora" : "Entrar para comprar"}
            </button>
          </div>
        </div>

        {/* Avaliações */}
        <div id="avaliacoes" className="mt-14 pt-8 border-t border-hair scroll-mt-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl text-ink">Avaliações</h2>
            <div className="flex items-center gap-1.5 text-sm text-ink-soft">
              <Star size={16} className="fill-ink text-ink" />
              <span className="font-semibold text-ink">{product.rating}</span>
              <span>· {product.reviews} avaliações</span>
            </div>
          </div>

          {product.reviewList && product.reviewList.length > 0 ? (
            <>
              <div className="flex flex-col gap-5">
                {product.reviewList.slice(0, visibleReviews).map((review, i) => (
                  <div key={i} className="border-b border-hair pb-5 last:border-b-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-semibold text-ink">{review.author}</span>
                      <span className="text-xs text-ink-soft">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-0.5 mb-2">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          size={13}
                          className={idx < review.rating ? "fill-ink text-ink" : "text-hair"}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-ink-soft leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>

              {visibleReviews < product.reviewList.length && (
                <button
                  onClick={() => setVisibleReviews((v) => v + REVIEWS_PAGE_SIZE)}
                  className="mt-2 text-sm font-semibold text-ink underline underline-offset-2 hover:opacity-70 transition-opacity"
                >
                  Ver mais avaliações
                </button>
              )}
            </>
          ) : (
            <p className="text-sm text-ink-soft">Ainda não há avaliações para este produto.</p>
          )}
        </div>

        {/* Produtos relacionados */}
        {related.length > 0 && (
          <div className="mt-14 pt-8 border-t border-hair">
            <h2 className="font-display text-xl text-ink mb-6">você também pode gostar</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}