"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, User, Heart, ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth";

export default function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const { favorites, cartCount } = useStore();
  const { isLoggedIn, user } = useAuth();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/busca?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <div className="bg-paper px-4 sm:px-6 py-3 flex items-center gap-4 sm:gap-8 border-b border-hair">
      <Link href="/" className="shrink-0 flex items-center">
        <Image src="/logo.png" alt="Fit House" width={140} height={21} className="h-5 sm:h-6 w-auto" priority />
      </Link>

      <form role="search" onSubmit={handleSearch} className="flex-1 max-w-2xl flex items-center bg-paper border border-ink">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar legging, conjunto, tênis..."
          aria-label="Buscar produtos"
          className="flex-1 min-w-0 px-4 py-2 text-sm outline-none placeholder:text-ink-soft/60"
        />
        <button type="submit" aria-label="Buscar" className="bg-ink text-white h-full px-4 sm:px-5 py-2.5 flex items-center justify-center hover:bg-ink-soft transition-colors">
          <Search size={18} />
        </button>
      </form>

      <div className="hidden md:flex items-center gap-5 text-ink shrink-0">
        <Link
          href={isLoggedIn ? "/perfil" : "/login"}
          aria-label={isLoggedIn ? "Meu perfil" : "Entrar"}
          className="hover:opacity-60 transition-opacity flex items-center gap-1.5"
        >
          <User size={22} strokeWidth={1.4} />
          {isLoggedIn && user && (
            <span className="text-xs font-semibold max-w-[80px] truncate">{user.name.split(" ")[0]}</span>
          )}
        </Link>
        <Link href="/favoritos" aria-label="Favoritos" className="relative hover:opacity-60 transition-opacity">
          <Heart size={22} strokeWidth={1.4} />
          <span className="absolute -top-1.5 -right-1.5 bg-ink text-white text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center">
            {favorites.length}
          </span>
        </Link>
        <Link href="/carrinho" aria-label="Sacola" className="relative hover:opacity-60 transition-opacity">
          <ShoppingBag size={22} strokeWidth={1.4} />
          <span className="absolute -top-1.5 -right-1.5 bg-ink text-white text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center">
            {cartCount}
          </span>
        </Link>
      </div>

      <Link href="/carrinho" aria-label="Sacola" className="md:hidden relative text-ink shrink-0">
        <ShoppingBag size={22} strokeWidth={1.4} />
        <span className="absolute -top-1.5 -right-1.5 bg-ink text-white text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center">
          {cartCount}
        </span>
      </Link>
    </div>
  );
}