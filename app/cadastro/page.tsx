"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import BackButton from "@/components/BackButton";

function SignupForm() {
  const { signup } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    const result = signup(name, email, password);
    if (!result.ok) {
      setError(result.error ?? "Não foi possível criar sua conta.");
      return;
    }

    // Conta criada com sucesso: volta para a tela de login para o usuário entrar.
    router.push(`/login?redirect=${encodeURIComponent(redirect)}&cadastro=sucesso`);
  }

  return (
    <section className="px-4 sm:px-6 py-12 max-w-sm mx-auto w-full flex-1">
      <BackButton className="mb-6" />
      <h1 className="font-display text-2xl text-ink mb-1">criar conta</h1>
      <p className="text-sm text-ink-soft mb-8">
        Cadastre-se para favoritar, comprar e acompanhar seus pedidos.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink">Nome</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome completo"
            className="border border-hair focus:border-ink outline-none px-3 py-2.5 text-sm transition-colors"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink">E-mail</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seuemail@exemplo.com"
            className="border border-hair focus:border-ink outline-none px-3 py-2.5 text-sm transition-colors"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink">Senha</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres"
            className="border border-hair focus:border-ink outline-none px-3 py-2.5 text-sm transition-colors"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink">Confirmar senha</span>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="border border-hair focus:border-ink outline-none px-3 py-2.5 text-sm transition-colors"
          />
        </label>

        {error && <p className="text-xs text-red-600">{error}</p>}

        <button
          type="submit"
          className="bg-ink text-white text-sm font-semibold uppercase tracking-wide py-3 mt-2 hover:bg-ink-soft transition-colors"
        >
          Criar conta
        </button>
      </form>

      <p className="text-sm text-ink-soft mt-6 text-center">
        Já tem conta?{" "}
        <Link href={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-ink font-semibold underline">
          Entrar
        </Link>
      </p>
    </section>
  );
}

export default function SignupPage() {
  return (
    <main className="flex flex-col min-h-screen bg-paper">
      <div className="sticky top-0 z-30 shadow-sm">
        <TopBar />
        <Header />
        <CategoryNav />
      </div>

      <Suspense fallback={null}>
        <SignupForm />
      </Suspense>
    </main>
  );
}