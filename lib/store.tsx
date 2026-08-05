"use client";

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import type { Product } from "./data";
import { useAuth } from "./auth";

export type CartItem = { product: Product; qty: number };

type StoreContextType = {
  cart: CartItem[];
  favorites: string[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearCart: () => void;
  clearFavorites: () => void;
  cartCount: number;
  cartTotal: number;
};

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const { isLoggedIn } = useAuth();
  const wasLoggedIn = useRef(isLoggedIn);

  useEffect(() => {
    const savedCart = localStorage.getItem("fh_cart");
    const savedFav = localStorage.getItem("fh_favorites");
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedFav) setFavorites(JSON.parse(savedFav));
    setLoaded(true);
  }, []);

  // Quando o usuário desloga, limpa carrinho e favoritos (tanto em memória
  // quanto no localStorage), para que essas informações não "vazem" para
  // a próxima sessão/usuário.
  useEffect(() => {
    if (wasLoggedIn.current && !isLoggedIn) {
      setCart([]);
      setFavorites([]);
      localStorage.removeItem("fh_cart");
      localStorage.removeItem("fh_favorites");
    }
    wasLoggedIn.current = isLoggedIn;
  }, [isLoggedIn]);

  useEffect(() => {
    if (loaded) localStorage.setItem("fh_cart", JSON.stringify(cart));
  }, [cart, loaded]);

  useEffect(() => {
    if (loaded) localStorage.setItem("fh_favorites", JSON.stringify(favorites));
  }, [favorites, loaded]);

  function addToCart(product: Product, qty = 1) {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) => (i.product.id === product.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { product, qty }];
    });
  }

  function removeFromCart(productId: string) {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  }

  function updateQty(productId: string, qty: number) {
    if (qty < 1) return removeFromCart(productId);
    setCart((prev) => prev.map((i) => (i.product.id === productId ? { ...i, qty } : i)));
  }

  function toggleFavorite(productId: string) {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }

  function isFavorite(productId: string) {
    return favorites.includes(productId);
  }

  function clearCart() {
    setCart([]);
  }

  function clearFavorites() {
    setFavorites([]);
  }

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.qty * i.product.price, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        removeFromCart,
        updateQty,
        toggleFavorite,
        isFavorite,
        clearCart,
        clearFavorites,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore precisa estar dentro de StoreProvider");
  return ctx;
}