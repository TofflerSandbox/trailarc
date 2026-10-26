import { Difficulty, Kind, difficultyLabel, kindLabel } from "@/lib/data";

export function DifficultyMark({ d, className = "h-3.5 w-3.5" }: { d: Difficulty; className?: string }) {
  if (d === "green") return <svg viewBox="0 0 10 10" className={className}><circle cx="5" cy="5" r="4.5" fill="var(--color-diff-green)" /></svg>;
  if (d === "blue") return <svg viewBox="0 0 10 10" className={className}><rect x="1" y="1" width="8" height="8" rx="0.8" fill="var(--color-diff-blue)" /></svg>;
  return <svg viewBox="0 0 10 10" className={className}><path d="M5 0.3 L9.7 5 L5 9.7 L0.3 5 Z" fill="var(--color-diff-black)" /></svg>;
}

export function DifficultyPill({ d, dark = false }: { d: Difficulty; dark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${dark ? "bg-white/90 text-ink-900" : "bg-sand-100 text-ink-700"}`}>
      <DifficultyMark d={d} className="h-3 w-3" />
      {difficultyLabel[d]}
    </span>
  );
}

const kindStyles: Record<Kind, string> = {
  private: "bg-forest-700 text-white",
  public: "bg-white/90 text-ink-900",
  event: "bg-amber-500 text-white",
};

export function KindPill({ k }: { k: Kind }) {
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${kindStyles[k]}`}>{kindLabel[k]}</span>;
}
