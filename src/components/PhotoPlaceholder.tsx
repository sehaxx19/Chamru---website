import { ImageIcon } from "lucide-react";

const GRADIENTS = [
  "from-forest-800 to-forest-950",
  "from-emerald-500 to-forest-900",
  "from-gold-500 to-forest-800",
  "from-forest-700 to-forest-950",
];

export default function PhotoPlaceholder({
  label,
  className = "",
  gradientIndex = 0,
}: {
  label: string;
  className?: string;
  gradientIndex?: number;
}) {
  const gradient = GRADIENTS[gradientIndex % GRADIENTS.length];
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} ${className}`}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center text-sand-100/80">
        <ImageIcon size={20} strokeWidth={1.5} />
        <span className="text-xs font-medium">{label}</span>
      </div>
    </div>
  );
}
