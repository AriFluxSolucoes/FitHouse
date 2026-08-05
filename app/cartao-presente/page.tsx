"use client";

import { useState } from "react";
import { Gift } from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import BackButton from "@/components/BackButton";

const amounts = [50, 100, 150, 200, 300];

export default function CartaoPresentePage() {
  const [amount, setAmount] = useState(100);
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!recipientName.trim() || !recipientEmail.trim()) return;
    setSent(true);
  }

  return (
    <main className="flex flex-col min-h-screen bg-paper">
      <div className="sticky top-0 z-30 shadow-sm">
        <TopBar />
        <Header />
        <CategoryNav />
      </div>

      <section className="px-4 sm:px-6 py-10 max-w-md mx-auto w-full flex-1">
        <BackButton className="mb-6" />
        <h1 className="font-display text-2xl text-ink mb-1">cartão de presente</h1>
        <p className="text-sm text-ink-soft mb-8">
          Presenteie alguém especial com um cartão-presente Fit House, entregue por e-mail.
        </p>

        {sent ? (
          <div className="border border-ink p-6 text-center">
            <Gift size={28} className="text-ink mx-auto mb-3" strokeWidth={1.5} />
            <p className="font-display text-lg text-ink mb-2">presente enviado!</p>
            <p className="text-sm text-ink-soft">
              Um cartão de R${amount.toFixed(2).replace(".", ",")} seria enviado para{" "}
              <strong className="text-ink">{recipientEmail}</strong>. Como este é um site de
              portfólio, nenhum e-mail real é disparado.
            </p>
            <button
              onClick={() => {
                setSent(false);
                setRecipientName("");
                setRecipientEmail("");
                setMessage("");
              }}
              className="mt-4 text-sm font-semibold text-ink underline underline-offset-2"
            >
              Enviar outro cartão
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-ink block mb-2">
                Valor
              </span>
              <div className="grid grid-cols-3 gap-2">
                {amounts.map((v) => (
                  <button
                    type="button"
                    key={v}
                    onClick={() => setAmount(v)}
                    className={`border py-2.5 text-sm font-semibold transition-colors ${
                      amount === v
                        ? "bg-ink text-white border-ink"
                        : "border-hair text-ink hover:border-ink"
                    }`}
                  >
                    R${v}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink">
                Nome de quem vai receber
              </span>
              <input
                required
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Nome do presenteado"
                className="border border-hair focus:border-ink outline-none px-3 py-2.5 text-sm transition-colors"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink">
                E-mail de quem vai receber
              </span>
              <input
                type="email"
                required
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="email@exemplo.com"
                className="border border-hair focus:border-ink outline-none px-3 py-2.5 text-sm transition-colors"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink">
                Mensagem (opcional)
              </span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escreva uma mensagem especial..."
                rows={3}
                className="border border-hair focus:border-ink outline-none px-3 py-2.5 text-sm transition-colors resize-none"
              />
            </label>

            <button
              type="submit"
              className="bg-ink text-white text-sm font-semibold uppercase tracking-wide py-3 mt-2 hover:bg-ink-soft transition-colors"
            >
              Enviar cartão de R${amount.toFixed(2).replace(".", ",")}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
