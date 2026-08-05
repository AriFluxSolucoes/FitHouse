"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import BackButton from "@/components/BackButton";

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const cadastroSucesso = searchParams.get("cadastro") === "sucesso";
  const resetSucesso = searchParams.get("reset") === "sucesso";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const result = login(email, password);
    if (!result.ok) {
      setError(result.error ?? "Não foi possível entrar.");
      return;
    }

    router.push(redirect);
  }

  return (
    <section className="px-4 sm:px-6 py-12 max-w-sm mx-auto w-full flex-1">
      <BackButton className="mb-6" />
      <h1 className="font-display text-2xl text-ink mb-1">entrar</h1>
      <p className="text-sm text-ink-soft mb-4">
        Acesse sua conta para continuar comprando.
      </p>

      {cadastroSucesso && (
        <p className="text-sm text-green-700 bg-green-50 border border-green-200 px-3 py-2 mb-4">
          Conta criada com sucesso! Faça login para continuar.
        </p>
      )}

      {resetSucesso && (
        <p className="text-sm text-green-700 bg-green-50 border border-green-200 px-3 py-2 mb-4">
          Senha redefinida com sucesso! Faça login com sua nova senha.
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            placeholder="••••••••"
            className="border border-hair focus:border-ink outline-none px-3 py-2.5 text-sm transition-colors"
          />
        </label>

        <Link href="/esqueci-senha" className="text-xs text-ink-soft hover:text-ink underline self-end -mt-2">
          Esqueceu sua senha?
        </Link>

        {error && <p className="text-xs text-red-600">{error}</p>}

        <button
          type="submit"
          className="bg-ink text-white text-sm font-semibold uppercase tracking-wide py-3 mt-2 hover:bg-ink-soft transition-colors"
        >
          Entrar
        </button>
      </form>

      <p className="text-sm text-ink-soft mt-6 text-center">
        Ainda não tem conta?{" "}
        <Link href={`/cadastro?redirect=${encodeURIComponent(redirect)}`} className="text-ink font-semibold underline">
          Cadastre-se
        </Link>
      </p>
    </section>
  );
}

export default function LoginPage() {
  return (
    <main className="flex flex-col min-h-screen bg-paper">
      <div className="sticky top-0 z-30 shadow-sm">
        <TopBar />
        <Header />
        <CategoryNav />
      </div>

      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </main>
  );
}