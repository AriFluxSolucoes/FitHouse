import { RotateCcw, Clock, PackageCheck, CircleDollarSign } from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import BackButton from "@/components/BackButton";

const steps = [
  {
    icon: Clock,
    title: "1. Prazo",
    text: "Você tem até 30 dias corridos após o recebimento para solicitar troca ou devolução.",
  },
  {
    icon: PackageCheck,
    title: "2. Condições",
    text: "O produto deve estar sem uso, com etiquetas originais e na embalagem original.",
  },
  {
    icon: RotateCcw,
    title: "3. Solicitação",
    text: "Acesse \"Meus pedidos\" no seu perfil, selecione o item e escolha o motivo da troca ou devolução.",
  },
  {
    icon: CircleDollarSign,
    title: "4. Reembolso",
    text: "Após recebermos o produto, o reembolso é feito em até 7 dias úteis, no mesmo método de pagamento.",
  },
];

export default function TrocasDevolucoesPage() {
  return (
    <main className="flex flex-col min-h-screen bg-paper">
      <div className="sticky top-0 z-30 shadow-sm">
        <TopBar />
        <Header />
        <CategoryNav />
      </div>

      <section className="px-4 sm:px-6 py-10 max-w-2xl mx-auto w-full flex-1">
        <BackButton className="mb-6" />
        <h1 className="font-display text-2xl text-ink mb-1">trocas e devoluções</h1>
        <p className="text-sm text-ink-soft mb-8">
          Queremos que você fique satisfeito com sua compra. Confira como funciona o nosso
          processo de troca e devolução.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {steps.map((s) => (
            <div key={s.title} className="border border-hair p-4 flex flex-col gap-2">
              <s.icon size={20} className="text-ink" strokeWidth={1.5} />
              <p className="text-sm font-semibold text-ink">{s.title}</p>
              <p className="text-xs text-ink-soft leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-hair pt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink mb-3">
            Perguntas comuns
          </h2>
          <div className="flex flex-col gap-4 text-sm text-ink-soft">
            <div>
              <p className="text-ink font-medium mb-1">Quem paga o frete da devolução?</p>
              <p>
                Se o motivo for defeito ou erro no envio, o frete de devolução é por nossa
                conta. Em caso de arrependimento, o frete de retorno é do cliente.
              </p>
            </div>
            <div>
              <p className="text-ink font-medium mb-1">Posso trocar por outro tamanho?</p>
              <p>Sim! Basta indicar o novo tamanho na solicitação de troca dentro do seu pedido.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
