import Link from "next/link";
import { Mail } from "lucide-react";

const columns = [
  {
    title: "Atendimento",
    links: [
      { label: "Fale conosco", href: "/atendimento/fale-conosco" },
      { label: "Trocas e devoluções", href: "/atendimento/trocas-devolucoes" },
      { label: "Rastrear pedido", href: "/atendimento/rastrear-pedido" },
      { label: "Perguntas frequentes", href: "/atendimento/perguntas-frequentes" },
    ],
  },
  {
    title: "Sobre a Fit House",
    links: [
      { label: "Quem somos", href: "/sobre/quem-somos" },
      { label: "Sustentabilidade", href: "/sobre/sustentabilidade" },
    ],
  },
  {
    title: "Minha conta",
    links: [
      { label: "Meus pedidos", href: "/pedidos" },
      { label: "Favoritos", href: "/favoritos" },
      { label: "Cupons", href: "/cupons" },
      { label: "Cartão de presente", href: "/cartao-presente" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-8 bg-paper text-ink border-t border-hair">
      <div className="px-4 sm:px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <p className="font-display text-lg text-ink mb-2">fique por dentro</p>
          <p className="text-sm text-ink-soft mb-3">Ofertas e novidades direto no seu e-mail.</p>
          <form className="flex items-center border border-ink pl-3">
            <Mail size={16} className="text-ink-soft" />
            <input
              type="email"
              placeholder="seu@email.com"
              className="bg-transparent px-3 py-2 text-sm outline-none placeholder:text-ink-soft/50 flex-1 min-w-0"
            />
            <button
              type="submit"
              className="bg-ink text-white text-xs font-semibold px-4 py-2.5 hover:bg-ink-soft transition-colors"
            >
              Assinar
            </button>
          </form>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-ink font-semibold text-sm mb-3">{col.title}</p>
            <ul className="space-y-2 text-sm text-ink-soft">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-ink hover:underline transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-hair px-4 sm:px-6 py-4 text-xs text-ink-soft flex flex-col sm:flex-row gap-2 justify-between">
        <span>© {new Date().getFullYear()} Fit House. Todos os direitos reservados.</span>
        <span>Visa · Mastercard · Pix · Boleto</span>
      </div>
    </footer>
  );
}
