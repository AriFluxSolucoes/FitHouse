import { Gift, Truck, Undo2 } from "lucide-react";

const items = [
  { icon: Gift, label: "VENDA NA FIT HOUSE", sub: "Cadastre-se agora" },
  { icon: Truck, label: "FRETE GRÁTIS", sub: "Acima de R$149" },
  { icon: Undo2, label: "TROCA GRÁTIS", sub: "Em até 30 dias" },
];

export default function TopBar() {
  return (
    <div className="hidden sm:flex items-center justify-center gap-8 bg-paper text-[11px] text-ink-soft py-2 px-4 border-b border-hair">
      {items.map(({ icon: Icon, label, sub }) => (
        <div key={label} className="flex items-center gap-1.5">
          <Icon size={13} className="text-ink" strokeWidth={1.5} />
          <span className="font-semibold tracking-wide text-ink">{label}</span>
          <span className="underline underline-offset-2 decoration-hair">{sub}</span>
        </div>
      ))}
    </div>
  );
}
