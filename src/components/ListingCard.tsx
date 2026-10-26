import Link from "next/link";
import { Star } from "lucide-react";
import { Listing } from "@/lib/data";
import { Scene } from "./Scene";
import { DifficultyPill, KindPill } from "./Pills";

export function ListingCard({ l, compact = false }: { l: Listing; compact?: boolean }) {
  return (
    <Link href={`/trails/${l.slug}/`} className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sand-200 transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className={`relative ${compact ? "h-32" : "h-44"} overflow-hidden`}>
        <Scene scene={l.scene} seed={l.seed} className="h-full w-full transition duration-500 group-hover:scale-105" />
        <div className="absolute left-3 top-3 flex gap-1.5">
          <KindPill k={l.kind} />
        </div>
        <div className="absolute bottom-3 left-3">
          <DifficultyPill d={l.difficulty} dark />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-base font-bold leading-tight text-ink-900">{l.name}</h3>
          <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-ink-700">
            <Star size={14} className="fill-amber-500 text-amber-500" /> {l.rating.toFixed(1)}
          </span>
        </div>
        <p className="mt-0.5 text-sm text-ink-500">{l.county} · {l.miles} mi</p>
        {!compact && <p className="mt-2 line-clamp-2 text-sm text-ink-700">{l.tagline}</p>}
        <p className="mt-3 text-sm">
          {l.price ? (
            <><span className="font-bold text-ink-900">${l.price}</span> <span className="text-ink-500">{l.kind === "event" ? "per vehicle" : "per vehicle / day"}</span></>
          ) : (
            <span className="font-semibold text-forest-600">Free · legal public access</span>
          )}
        </p>
      </div>
    </Link>
  );
}
