"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Minus, Plus, X, Shirt, Ticket, Check } from "lucide-react";
import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import SwatchTile from "@/components/SwatchTile";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import BackButton from "@/components/BackButton";
import PortfolioModal from "@/components/PortfolioModal";

export default function CartPage() {
  const { cart, updateQty, removeFromCart } = useStore();
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  // guarda apenas os itens que o usuário desmarcou; novos itens
  // entram selecionados por padrão, sem precisar de um efeito de sincronização
  const [deselected, setDeselected] = useState<string[]>([]);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);

  const selected = cart.map((i) => i.product.id).filter((id) => !deselected.includes(id));

  function toggleSelect(id: string) {
    setDeselected((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }

  const allSelected = cart.length > 0 && selected.length === cart.length;

  function toggleSelectAll() {
    setDeselected(allSelected ? cart.map((i) => i.product.id) : []);
  }

  const selectedItems = cart.filter((i) => selected.includes(i.product.id));
  const selectedCount = selectedItems.reduce((sum, i) => sum + i.qty, 0);
  const selectedTotal = selectedItems.reduce((sum, i) => sum + i.qty * i.product.price, 0);

  function handleCheckout() {
    if (!isLoggedIn) {
      router.push("/login?redirect=/carrinho");
      return;
    }
    setShowPortfolioModal(true);
  }

  return (
    <main className="flex flex-col min-h-screen bg-paper">
      <div className="sticky top-0 z-30 shadow-sm">
        <TopBar />
        <Header />
        <CategoryNav />
      </div>

      <section className="px-4 sm:px-6 py-8 max-w-3xl mx-auto w-full flex-1">
        <BackButton className="mb-4" />
        <h1 className="font-display text-2xl text-ink mb-1">sua sacola</h1>
        <p className="text-sm text-ink-soft mb-6">
          {cart.length} {cart.length === 1 ? "item" : "itens"}
        </p>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-ink-soft mb-4">Sua sacola está vazia.</p>
            <Link href="/" className="text-sm font-semibold text-ink underline">
              Continuar comprando
            </Link>
          </div>
        ) : (
          <>
            {/* selecionar tudo */}
            <div className="flex items-center gap-3 pb-4 border-b border-hair">
              <button
                onClick={toggleSelectAll}
                aria-label="Selecionar todos os itens"
                className={`w-5 h-5 border flex items-center justify-center shrink-0 transition-colors ${
                  allSelected ? "bg-ink border-ink" : "border-hair hover:border-ink"
                }`}
              >
                {allSelected && <Check size={13} className="text-white" strokeWidth={3} />}
              </button>
              <span className="text-sm text-ink">
                Selecionar tudo ({selected.length}/{cart.length})
              </span>
            </div>

            <div className="flex flex-col">
              {cart.map(({ product, qty }) => {
                const isSelected = selected.includes(product.id);
                return (
                  <div key={product.id} className="flex items-start gap-3 border-b border-hair py-4">
                    <button
                      onClick={() => toggleSelect(product.id)}
                      aria-label="Selecionar produto"
                      className={`w-5 h-5 border flex items-center justify-center shrink-0 mt-1 transition-colors ${
                        isSelected ? "bg-ink border-ink" : "border-hair hover:border-ink"
                      }`}
                    >
                      {isSelected && <Check size={13} className="text-white" strokeWidth={3} />}
                    </button>

                    <Link href={`/produto/${product.id}`} className="w-20 h-24 shrink-0">
                      {product.image ? (
                        <Image src={product.image} alt={product.name} width={80} height={96} className="w-full h-full object-cover" />
                      ) : (
                        <SwatchTile icon={Shirt} className="w-full h-full" />
                      )}
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link href={`/produto/${product.id}`}>
                        <p className="text-sm text-ink line-clamp-2">{product.name}</p>
                      </Link>
                      <p className="text-sm font-bold text-ink mt-1">
                        R${product.price.toFixed(2).replace(".", ",")}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-hair">
                          <button onClick={() => updateQty(product.id, qty - 1)} className="p-1 hover:bg-fog" aria-label="Diminuir">
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs">{qty}</span>
                          <button onClick={() => updateQty(product.id, qty + 1)} className="p-1 hover:bg-fog" aria-label="Aumentar">
                            <Plus size={12} />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(product.id)} aria-label="Remover" className="text-ink-soft hover:text-ink">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* cupom de desconto */}
            <button
              type="button"
              className="w-full flex items-center justify-between border-b border-hair py-4 text-left hover:bg-fog/60 transition-colors"
            >
              <span className="flex items-center gap-2 text-sm text-ink">
                <Ticket size={16} />
                Cupom de desconto
              </span>
              <span className="text-xs text-ink-soft">Selecionar ou inserir código &gt;</span>
            </button>
          </>
        )}
      </section>

      {cart.length > 0 && (
        <div className="sticky bottom-0 z-20 bg-paper border-t border-hair">
          <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleSelectAll}
                aria-label="Selecionar todos os itens"
                className={`w-5 h-5 border flex items-center justify-center shrink-0 transition-colors ${
                  allSelected ? "bg-ink border-ink" : "border-hair hover:border-ink"
                }`}
              >
                {allSelected && <Check size={13} className="text-white" strokeWidth={3} />}
              </button>
              <div>
                <p className="text-xs text-ink-soft leading-none mb-1">Total</p>
                <p className="text-ink font-bold text-lg leading-none">
                  R${selectedTotal.toFixed(2).replace(".", ",")}
                </p>
              </div>
            </div>

            <button
              disabled={selectedCount === 0}
              onClick={handleCheckout}
              className="bg-ink text-white text-sm font-semibold uppercase tracking-wide py-3 px-6 hover:bg-ink-soft transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              {isLoggedIn ? `Finalizar compra (${selectedCount})` : "Entrar para finalizar"}
            </button>
          </div>
        </div>
      )}

      <PortfolioModal open={showPortfolioModal} onClose={() => setShowPortfolioModal(false)} />
    </main>
  );
}
