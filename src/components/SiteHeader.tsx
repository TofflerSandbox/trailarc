"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Star } from "lucide-react";
import { Logo } from "./Logo";
import { useDemo } from "@/lib/store";

const nav = [
  { href: "/explore/", label: "Explore" },
  { href: "/passport/", label: "Passport" },
  { href: "/host/", label: "For Landowners" },
  { href: "/partners/", label: "For Partners" },
];

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const path = usePathname();
  const { points, ready } = useDemo();
  const light = overlay;
  return (
    <header className={`${overlay ? "absolute inset-x-0 top-0 z-30" : "sticky top-0 z-30 border-b border-sand-200 bg-sand-50/90 backdrop-blur"}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" aria-label="TrailArc home"><Logo light={light} /></Link>
        <nav className="hidden flex-1 items-center gap-1 md:flex">
          {nav.map((n) => {
            const active = path?.startsWith(n.href.replace(/\/$/, ""));
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                  active
                    ? light ? "bg-white/20 text-white" : "bg-forest-700 text-white"
                    : light ? "text-white/85 hover:bg-white/10 hover:text-white" : "text-ink-700 hover:bg-sand-200"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <Link href="/passport/" className={`hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold sm:flex ${light ? "bg-white/15 text-white" : "bg-amber-50 text-amber-700"}`}>
            <Star size={15} className="fill-amber-500 text-amber-500" />
            <span suppressHydrationWarning>{ready ? points.toLocaleString() : "—"}</span> pts
          </Link>
          <Link href="/passport/" className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white ring-2 ring-white/60" aria-label="Your passport">
            AM
          </Link>
        </div>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-4 pb-2 md:hidden">
        {nav.map((n) => (
          <Link key={n.href} href={n.href} className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium ${light ? "bg-white/15 text-white" : "bg-sand-200 text-ink-700"}`}>
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
