import { Anchor, Compass, Footprints, Gem, Leaf, LucideProps, Moon, Mountain, Shield, Sprout, Waves } from "lucide-react";
import { badges } from "@/lib/data";

const icons: Record<string, React.ComponentType<LucideProps>> = { Anchor, Compass, Footprints, Gem, Leaf, Moon, Mountain, Shield, Sprout, Waves };

export function BadgeIcon({ id, earned = true, size = "md" }: { id: string; earned?: boolean; size?: "sm" | "md" | "lg" }) {
  const b = badges.find((x) => x.id === id);
  const Icon = b ? icons[b.icon] : Compass;
  const dims = { sm: "h-10 w-10", md: "h-14 w-14", lg: "h-24 w-24" }[size];
  const icon = { sm: 18, md: 24, lg: 40 }[size];
  const tone = !earned
    ? "bg-sand-200 text-sand-500 ring-sand-300"
    : b?.partner
      ? "bg-ink-900 text-amber-400 ring-amber-400/60"
      : b?.secret
        ? "bg-amber-500 text-white ring-amber-200"
        : "bg-forest-700 text-white ring-forest-200";
  return (
    <span className={`relative inline-flex ${dims} items-center justify-center rounded-full ring-4 ${tone}`}>
      <Icon size={icon} strokeWidth={2} />
    </span>
  );
}
