export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect width="40" height="40" rx="10" fill="var(--color-forest-700)" />
      <path d="M7 28 L15.5 16 L20.5 22 L25 15.5 L33 28 Z" fill="var(--color-forest-300)" />
      <path d="M7 28 L15.5 16 L20.5 22" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 13 A 13 13 0 0 1 31 13" fill="none" stroke="var(--color-amber-400)" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className={`font-display text-xl font-bold ${light ? "text-white" : "text-ink-900"}`}>
        Trail<span className="text-amber-500">Arc</span>
      </span>
    </span>
  );
}
