"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MailCheck } from "lucide-react";
import { useAuth } from "@/lib/auth";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import BackButton from "@/components/BackButton";

const DEMO_CODE = "123456";

export default function ForgotPasswordPage() {
  const { checkEmailExists, resetPassword } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!checkEmailExists(email)) {
      setError("Não encontramos uma conta com este e-mail.");
      return;
    }

    setStep(2);
  }

  function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (code.trim() !== DEMO_CODE) {
      setError("Código inválido. Confira o código enviado por e-mail.");
      return;
    }

    setStep(3);
  }

  function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (newPassword.length < 6) {
      setError("A nova senha precisa ter pelo menos 6 caracteres.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    const result = resetPassword(email, newPassword);
    if (!result.ok) {
      setError(result.error ?? "Não foi possível redefinir a senha.");
      return;
    }

    router.push("/login?redirect=/&reset=sucesso");
  }

  return (
    <main className="flex flex-col min-h-screen bg-paper">
      <div className="sticky top-0 z-30 shadow-sm">
        <TopBar />
        <Header />
        <CategoryNav />
      </div>

      <section className="px-4 sm:px-6 py-12 max-w-sm mx-auto w-full flex-1">
        <BackButton className="mb-6" />
        <h1 className="font-display text-2xl text-ink mb-1">esqueci minha senha</h1>
        <p className="text-sm text-ink-soft mb-8">
          {step === 1 && "Informe o e-mail cadastrado para receber um código de verificação."}
          {step === 2 && "Digite o código de verificação que enviamos para você."}
          {step === 3 && "Crie uma nova senha para sua conta."}
        </p>

        {step === 1 && (
          <form onSubmit={handleSendCode} className="flex flex-col gap-4">
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

            {error && <p className="text-xs text-red-600">{error}</p>}

            <button
              type="submit"
              className="bg-ink text-white text-sm font-semibold uppercase tracking-wide py-3 mt-2 hover:bg-ink-soft transition-colors"
            >
              Enviar código
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyCode} className="flex flex-col gap-4">
            <div className="flex items-start gap-2 bg-fog/60 border border-hair px-3 py-2.5 text-xs text-ink-soft">
              <MailCheck size={16} className="shrink-0 mt-0.5" />
              <span>
                Enviamos um código para <strong className="text-ink">{email}</strong>. Como este
                é um site de portfólio (sem envio real de e-mail), use o código{" "}
                <strong className="text-ink">{DEMO_CODE}</strong> para continuar.
              </span>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink">Código de verificação</span>
              <input
                type="text"
                required
                inputMode="numeric"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="000000"
                className="border border-hair focus:border-ink outline-none px-3 py-2.5 text-sm transition-colors tracking-widest"
              />
            </label>

            {error && <p className="text-xs text-red-600">{error}</p>}

            <button
              type="submit"
              className="bg-ink text-white text-sm font-semibold uppercase tracking-wide py-3 mt-2 hover:bg-ink-soft transition-colors"
            >
              Verificar código
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs text-ink-soft hover:text-ink underline text-center"
            >
              Usar outro e-mail
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink">Nova senha</span>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="border border-hair focus:border-ink outline-none px-3 py-2.5 text-sm transition-colors"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink">Confirmar nova senha</span>
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
              Redefinir senha
            </button>
          </form>
        )}

        <p className="text-sm text-ink-soft mt-6 text-center">
          Lembrou a senha?{" "}
          <Link href="/login" className="text-ink font-semibold underline">
            Entrar
          </Link>
        </p>
      </section>
    </main>
  );
}
