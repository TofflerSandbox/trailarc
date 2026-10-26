"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Search, ShieldCheck, Star } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Scene } from "@/components/Scene";
import { DifficultyMark, KindPill } from "@/components/Pills";
import { Difficulty, Kind, difficultyLabel, listings } from "@/lib/data";

const TrailMap = dynamic(() => import("@/components/TrailMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-sand-200" />,
});

const kinds: { id: Kind | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "private", label: "Private land" },
  { id: "public", label: "Public routes" },
  { id: "event", label: "Guided events" },
];

export default function ExplorePage() {
  const [kind, setKind] = useState<Kind | "all">("all");
  const [diffs, setDiffs] = useState<Difficulty[]>(["green", "blue", "black"]);
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const results = useMemo(
    () =>
      listings.filter(
        (l) =>
          (kind === "all" || l.kind === kind) &&
          diffs.includes(l.difficulty) &&
          (q === "" || `${l.name} ${l.county} ${l.region} ${l.terrain.join(" ")}`.toLowerCase().includes(q.toLowerCase())),
      ),
    [kind, diffs, q],
  );

  const toggleDiff = (d: Difficulty) =>
    setDiffs((cur) => (cur.includes(d) ? (cur.length > 1 ? cur.filter((x) => x !== d) : cur) : [...cur, d]));

  return (
    <div className="flex h-screen flex-col">
      <SiteHeader />
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="order-2 flex min-h-0 flex-1 flex-col border-r border-sand-200 bg-sand-50 lg:order-1 lg:w-[440px] lg:flex-none">
          <div className="space-y-4 border-b border-sand-200 p-4">
            <div>
              <h1 className="font-display text-2xl font-bold">Explore Virginia</h1>
              <p className="text-sm text-ink-500">{results.length} trails, properties & events · sample data</p>
            </div>
            <label className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 ring-1 ring-sand-200 focus-within:ring-2 focus-within:ring-forest-500">
              <Search size={17} className="text-ink-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, county or terrain" className="w-full bg-transparent text-sm outline-none placeholder:text-ink-400" />
            </label>
            <div className="flex flex-wrap gap-1.5">
              {kinds.map((k) => (
                <button key={k.id} onClick={() => setKind(k.id)} className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${kind === k.id ? "bg-forest-700 text-white" : "bg-white text-ink-700 ring-1 ring-sand-200 hover:bg-sand-100"}`}>
                  {k.label}
                </button>
              ))}
            </div>
            <div className="flex gap-1.5">
              {(["green", "blue", "black"] as Difficulty[]).map((d) => (
                <button key={d} onClick={() => toggleDiff(d)} aria-pressed={diffs.includes(d)} className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-sm font-medium ring-1 transition ${diffs.includes(d) ? "bg-white text-ink-900 ring-ink-900/20" : "bg-transparent text-ink-400 ring-sand-200"}`}>
                  <DifficultyMark d={d} className={`h-3 w-3 ${diffs.includes(d) ? "" : "opacity-40"}`} /> {difficultyLabel[d]}
                </button>
              ))}
            </div>
          </div>
          <ul className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
            {results.map((l) => {
              const on = selected === l.slug;
              return (
                <li key={l.slug}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelected(l.slug)}
                    onKeyDown={(e) => e.key === "Enter" && setSelected(l.slug)}
                    className={`flex cursor-pointer gap-3 rounded-2xl bg-white p-3 ring-1 transition ${on ? "ring-2 ring-forest-600 shadow-md" : "ring-sand-200 hover:shadow-md"}`}
                  >
                    <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl">
                      <Scene scene={l.scene} seed={l.seed} className="h-full w-full" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <KindPill k={l.kind} />
                        <DifficultyMark d={l.difficulty} className="h-3 w-3" />
                      </div>
                      <p className="mt-1.5 truncate font-display font-bold">{l.name}</p>
                      <p className="truncate text-xs text-ink-500">{l.county} · {l.miles} mi · {l.hours}</p>
                      <div className="mt-1.5 flex items-center justify-between text-sm">
                        <span>{l.price ? <><b>${l.price}</b><span className="text-ink-500"> / vehicle</span></> : <span className="font-semibold text-forest-600">Free</span>}</span>
                        <span className="flex items-center gap-1 text-xs text-ink-700"><Star size={12} className="fill-amber-500 text-amber-500" />{l.rating} ({l.reviews})</span>
                      </div>
                    </div>
                  </div>
                  {on && (
                    <Link href={`/trails/${l.slug}/`} className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-forest-700 py-2.5 text-sm font-semibold text-white hover:bg-forest-800">
                      View details {l.kind !== "public" && "& book"} <ArrowRight size={16} />
                    </Link>
                  )}
                </li>
              );
            })}
            {results.length === 0 && <li className="py-10 text-center text-sm text-ink-500">No matches — try widening your filters.</li>}
          </ul>
          <div className="flex items-center gap-2 border-t border-sand-200 bg-forest-50 px-4 py-3 text-xs text-forest-800">
            <ShieldCheck size={16} /> Every listing is verified for legal access before it appears.
          </div>
        </aside>

        {/* Map */}
        <div className="relative order-1 h-[42vh] shrink-0 lg:order-2 lg:h-auto lg:flex-1">
          <TrailMap listings={results} selected={selected} onSelect={setSelected} className="h-full w-full" />
          <div className="pointer-events-none absolute bottom-8 left-3 hidden sm:flex flex-col gap-1.5 rounded-xl bg-white/95 p-3 text-xs shadow-md ring-1 ring-black/5">
            {[["#1d5c43", "Private land"], ["#2563eb", "Public route"], ["#e08a1e", "Guided event"]].map(([c, t]) => (
              <span key={t} className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
