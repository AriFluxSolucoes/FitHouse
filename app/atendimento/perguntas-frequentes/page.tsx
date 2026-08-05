"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import BackButton from "@/components/BackButton";

const faqs = [
  {
    q: "Quanto tempo leva para minha compra ser entregue?",
    a: "O prazo médio de entrega é de 5 a 10 dias úteis, dependendo da sua região. Você pode acompanhar o status em \"Rastrear pedido\".",
  },
  {
    q: "Quais formas de pagamento vocês aceitam?",
    a: "Aceitamos cartão de crédito (Visa, Mastercard e Elo), Pix e boleto bancário.",
  },
  {
    q: "Como faço para trocar o tamanho de uma peça?",
    a: "Acesse \"Meus pedidos\" no seu perfil, selecione o item desejado e escolha a opção de troca, indicando o novo tamanho.",
  },
  {
    q: "Vocês entregam para todo o Brasil?",
    a: "Sim, entregamos para todos os estados brasileiros. O prazo e o valor do frete variam conforme o CEP.",
  },
  {
    q: "Como cancelo um pedido?",
    a: "Enquanto o pedido ainda não foi enviado, você pode cancelá-lo em \"Meus pedidos\". Após o envio, é necessário aguardar a entrega e solicitar devolução.",
  },
  {
    q: "Os produtos têm garantia?",
    a: "Sim, todos os produtos têm garantia contra defeitos de fabricação por 90 dias a partir da data de entrega.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="flex flex-col min-h-screen bg-paper">
      <div className="sticky top-0 z-30 shadow-sm">
        <TopBar />
        <Header />
        <CategoryNav />
      </div>

      <section className="px-4 sm:px-6 py-10 max-w-2xl mx-auto w-full flex-1">
        <BackButton className="mb-6" />
        <h1 className="font-display text-2xl text-ink mb-1">perguntas frequentes</h1>
        <p className="text-sm text-ink-soft mb-8">
          Reunimos as dúvidas mais comuns dos nossos clientes. Não encontrou o que procurava?{" "}
          <a href="/atendimento/fale-conosco" className="text-ink font-semibold underline">
            Fale conosco
          </a>
          .
        </p>

        <div className="flex flex-col">
          {faqs.map((faq, i) => {
            const open = openIndex === i;
            return (
              <div key={faq.q} className="border-b border-hair">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-4 text-left"
                  aria-expanded={open}
                >
                  <span className="text-sm font-medium text-ink">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-ink-soft transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open && (
                  <p className="text-sm text-ink-soft leading-relaxed pb-4 pr-6">{faq.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
