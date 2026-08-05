import { Recycle, Droplets, Factory } from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import BackButton from "@/components/BackButton";

const pillars = [
  {
    icon: Recycle,
    title: "Tecidos reciclados",
    text: "Parte da nossa coleção utiliza fibras recicladas de poliéster e algodão orgânico.",
  },
  {
    icon: Droplets,
    title: "Uso consciente de água",
    text: "Processos de tingimento com tecnologia de baixo consumo de água em parceria com fornecedores certificados.",
  },
  {
    icon: Factory,
    title: "Produção responsável",
    text: "Fábricas parceiras auditadas, com boas práticas trabalhistas e ambientais.",
  },
];

export default function SustentabilidadePage() {
  return (
    <main className="flex flex-col min-h-screen bg-paper">
      <div className="sticky top-0 z-30 shadow-sm">
        <TopBar />
        <Header />
        <CategoryNav />
      </div>

      <section className="px-4 sm:px-6 py-10 max-w-2xl mx-auto w-full flex-1">
        <BackButton className="mb-6" />
        <h1 className="font-display text-2xl text-ink mb-4">sustentabilidade</h1>

        <p className="text-sm text-ink-soft leading-relaxed mb-8">
          Acreditamos que moda fitness e responsabilidade ambiental podem — e devem — caminhar
          juntas. Estamos em constante evolução para reduzir nosso impacto em cada etapa da
          cadeia produtiva.
        </p>

        <div className="flex flex-col gap-4">
          {pillars.map((p) => (
            <div key={p.title} className="border border-hair p-4 flex gap-4 items-start">
              <div className="w-10 h-10 border border-hair flex items-center justify-center shrink-0">
                <p.icon size={18} className="text-ink" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink mb-1">{p.title}</p>
                <p className="text-xs text-ink-soft leading-relaxed">{p.text}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-ink-soft mt-8 border-t border-hair pt-4">
          A Fit House é um projeto de portfólio. As iniciativas de sustentabilidade acima são
          fictícias, criadas apenas para fins de demonstração.
        </p>
      </section>
    </main>
  );
}
