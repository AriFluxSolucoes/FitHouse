"use client";

import { useState } from "react";
import { Mail, Phone, MessageCircle } from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import BackButton from "@/components/BackButton";

export default function FaleConoscoPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <main className="flex flex-col min-h-screen bg-paper">
      <div className="sticky top-0 z-30 shadow-sm">
        <TopBar />
        <Header />
        <CategoryNav />
      </div>

      <section className="px-4 sm:px-6 py-10 max-w-2xl mx-auto w-full flex-1">
        <BackButton className="mb-6" />
        <h1 className="font-display text-2xl text-ink mb-1">fale conosco</h1>
        <p className="text-sm text-ink-soft mb-8">
          Tem alguma dúvida, sugestão ou problema? Preencha o formulário abaixo ou use um dos
          nossos outros canais.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <div className="border border-hair p-4 flex flex-col items-start gap-2">
            <Mail size={18} className="text-ink" strokeWidth={1.5} />
            <p className="text-sm font-semibold text-ink">E-mail</p>
            <p className="text-xs text-ink-soft">contato@fithouse.com.br</p>
          </div>
          <div className="border border-hair p-4 flex flex-col items-start gap-2">
            <Phone size={18} className="text-ink" strokeWidth={1.5} />
            <p className="text-sm font-semibold text-ink">Telefone</p>
            <p className="text-xs text-ink-soft">(11) 4000-0000</p>
          </div>
          <div className="border border-hair p-4 flex flex-col items-start gap-2">
            <MessageCircle size={18} className="text-ink" strokeWidth={1.5} />
            <p className="text-sm font-semibold text-ink">Chat</p>
            <p className="text-xs text-ink-soft">Seg. a sex., 9h às 18h</p>
          </div>
        </div>

        {sent ? (
          <div className="border border-ink p-6 text-center">
            <p className="font-display text-lg text-ink mb-2">mensagem enviada!</p>
            <p className="text-sm text-ink-soft">
              Obrigado por entrar em contato. Este é um site de portfólio, então nenhuma
              mensagem real é enviada, mas o formulário funciona normalmente. 😉
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-4 text-sm font-semibold text-ink underline underline-offset-2"
            >
              Enviar outra mensagem
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink">Nome</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
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
              <span className="text-xs font-semibold uppercase tracking-wide text-ink">Mensagem</span>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Como podemos ajudar?"
                rows={5}
                className="border border-hair focus:border-ink outline-none px-3 py-2.5 text-sm transition-colors resize-none"
              />
            </label>

            <button
              type="submit"
              className="bg-ink text-white text-sm font-semibold uppercase tracking-wide py-3 mt-2 hover:bg-ink-soft transition-colors"
            >
              Enviar mensagem
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
