import Image from "next/image";
import { Target, Heart, Leaf } from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import BackButton from "@/components/BackButton";

export default function QuemSomosPage() {
  return (
    <main className="flex flex-col min-h-screen bg-paper">
      <div className="sticky top-0 z-30 shadow-sm">
        <TopBar />
        <Header />
        <CategoryNav />
      </div>

      <section className="px-4 sm:px-6 py-10 max-w-2xl mx-auto w-full flex-1">
        <BackButton className="mb-6" />
        <Image src="/logo.png" alt="Fit House" width={160} height={24} className="h-6 w-auto mb-6" />

        <h1 className="font-display text-2xl text-ink mb-4">quem somos</h1>

        <p className="text-sm text-ink-soft leading-relaxed mb-4">
          A Fit House nasceu para vestir quem transforma suor em disciplina. Somos uma marca de
          moda fitness pensada para acompanhar cada tipo de treino — da corrida ao alongamento,
          da academia ao yoga — sem abrir mão de conforto, qualidade e estilo.
        </p>

        <p className="text-sm text-ink-soft leading-relaxed mb-8">
          Trabalhamos com tecidos tecnológicos, modelagens desenvolvidas para o movimento do
          corpo e um processo cuidadoso de produção, do desenho da peça até a entrega na sua
          casa.
        </p>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="border border-hair p-4 flex flex-col gap-2">
            <Target size={20} className="text-ink" strokeWidth={1.5} />
            <p className="text-sm font-semibold text-ink">Missão</p>
            <p className="text-xs text-ink-soft leading-relaxed">
              Vestir e impulsionar pessoas ativas com peças de alta performance e bom design.
            </p>
          </div>
          <div className="border border-hair p-4 flex flex-col gap-2">
            <Heart size={20} className="text-ink" strokeWidth={1.5} />
            <p className="text-sm font-semibold text-ink">Valores</p>
            <p className="text-xs text-ink-soft leading-relaxed">
              Qualidade, transparência e respeito por quem veste e por quem produz.
            </p>
          </div>
          <div className="border border-hair p-4 flex flex-col gap-2">
            <Leaf size={20} className="text-ink" strokeWidth={1.5} />
            <p className="text-sm font-semibold text-ink">Futuro</p>
            <p className="text-xs text-ink-soft leading-relaxed">
              Crescer de forma consciente, com foco em sustentabilidade e impacto positivo.
            </p>
          </div>
        </div>

        <p className="text-xs text-ink-soft mt-10 border-t border-hair pt-4">
          A Fit House é um projeto de portfólio criado para fins de demonstração. As informações
          desta página são fictícias.
        </p>
      </section>
    </main>
  );
}
