import { LucideIcon } from "lucide-react";

export default function SwatchTile({
  icon: Icon,
  className = "",
}: {
  icon: LucideIcon;
  index?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-fog border border-hair ${className}`}
    >
      <Icon className="opacity-80" color="#0a0a0a" strokeWidth={1} />
    </div>
  );
}
