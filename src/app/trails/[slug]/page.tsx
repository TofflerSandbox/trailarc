import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, BadgeCheck, CalendarDays, Clock, FileSignature, Gauge, Landmark, MapPinned, Mountain, Route,
  ShieldCheck, Star, TriangleAlert,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Scene } from "@/components/Scene";
import { DifficultyPill, KindPill } from "@/components/Pills";
import { BadgeIcon } from "@/components/BadgeIcon";
import { BookingWidget } from "@/components/BookingWidget";
import { DetailMap } from "@/components/DetailMap";
import ElevationChart from "@/components/ElevationChart";
import { ListingCard } from "@/components/ListingCard";
import { badges, getListing, listings } from "@/lib/data";
import { seeded } from "@/lib/geo";

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = getListing(slug);
  return { title: l ? `${l.name} — TrailArc` : "TrailArc" };
}

const reviewPool = [
  { who: "Jordan T.", rig: "Toyota 4Runner TRD Off-Road", text: "Exactly what I was looking for — challenging enough to learn something, never sketchy. The host met us at the gate and pointed out the best line through the creek." },
  { who: "Priya S.", rig: "Ford Bronco Badlands", text: "First time airing down. The skills checklist in the app before we left made all the difference. Kids are already asking when we're going back." },
  { who: "Marcus W.", rig: "INEOS Grenadier", text: "Booking, waiver and gate code all in one place. Felt like a premium experience from start to finish. The overlook alone is worth it." },
  { who: "Dana K.", rig: "Jeep Wrangler Rubicon", text: "Well-marked, well-maintained and way less crowded than the public trails. Stewardship rules are clear and the landowner clearly cares." },
  { who: "Sam R.", rig: "Land Rover Defender 110", text: "Downloaded the offline map before leaving the Beltway — zero signal on the ridge and it didn't matter." },
];

export default async function TrailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = getListing(slug);
  if (!l) notFound();
  const badge = badges.find((b) => b.id === l.badge)!;
  const rand = seeded(l.seed);
  const start = Math.floor(rand() * reviewPool.length);
  const reviews = [0, 1, 2].map((i) => reviewPool[(start + i) % reviewPool.length]);
  const nearby = listings.filter((x) => x.slug !== l.slug && x.region === l.region).concat(listings.filter((x) => x.slug !== l.slug && x.region !== l.region)).slice(0, 3);

  const assurance =
    l.kind === "public"
      ? [
          { Icon: Landmark, t: "Designated motor-vehicle route", d: "Open to street-legal 4×4s on the forest's motor vehicle use map." },
          { Icon: CalendarDays, t: "Seasonal gate tracked", d: `${l.season}. Closures pushed to your phone.` },
          { Icon: MapPinned, t: "Ownership boundaries shown", d: "Know exactly where public land ends and private begins." },
        ]
      : [
          { Icon: Landmark, t: "Landowner agreement on file", d: "Access verified and renewed annually by TrailArc." },
          { Icon: ShieldCheck, t: "$2M liability coverage", d: "Every booking covers guests and the landowner." },
          { Icon: FileSignature, t: "Digital waivers", d: "Signed by every occupant before the gate code is released." },
        ];

  return (
    <>
      <SiteHeader />
      <section className="relative h-[360px] overflow-hidden bg-forest-950 sm:h-[420px]">
        <Scene scene={l.scene} seed={l.seed} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-between px-4 py-6 sm:px-6">
          <Link href="/explore/" className="inline-flex w-fit items-center gap-2 rounded-full bg-white/90 px-3.5 py-2 text-sm font-semibold text-ink-900 hover:bg-white">
            <ArrowLeft size={16} /> Back to map
          </Link>
          <div className="text-white">
            <div className="flex flex-wrap items-center gap-2">
              <KindPill k={l.kind} />
              <DifficultyPill d={l.difficulty} dark />
            </div>
            <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">{l.name}</h1>
            <p className="mt-2 text-lg text-white/85">{l.tagline}</p>
            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/80">
              <span className="flex items-center gap-1"><Star size={15} className="fill-amber-400 text-amber-400" /> <b className="text-white">{l.rating}</b> ({l.reviews} reviews)</span>
              <span>{l.county}, Virginia</span>
              <span>{l.region}</span>
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0 space-y-10">
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { Icon: Route, k: "Distance", v: `${l.miles} mi` },
              { Icon: Mountain, k: "Elevation gain", v: `${l.gainFt.toLocaleString()} ft` },
              { Icon: Clock, k: "Time", v: l.hours },
              { Icon: Gauge, k: "Season", v: l.season },
            ].map(({ Icon, k, v }) => (
              <div key={k} className="rounded-2xl bg-white p-4 ring-1 ring-sand-200">
                <Icon size={18} className="text-forest-600" />
                <dt className="mt-2 text-xs text-ink-500">{k}</dt>
                <dd className="font-display font-bold leading-snug">{v}</dd>
              </div>
            ))}
          </dl>

          <section>
            <h2 className="font-display text-2xl font-bold">About this {l.kind === "event" ? "experience" : "trail"}</h2>
            <p className="mt-3 text-lg leading-relaxed text-ink-700">{l.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {l.terrain.map((t) => <span key={t} className="rounded-full bg-sand-200 px-3 py-1 text-sm text-ink-700">{t}</span>)}
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {l.highlights.map((h) => (
                <li key={h} className="rounded-2xl bg-white p-4 text-sm leading-relaxed text-ink-700 ring-1 ring-sand-200">
                  <BadgeCheck size={18} className="mb-2 text-amber-500" /> {h}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold">Route</h2>
            <div className="mt-4 h-[380px] overflow-hidden rounded-3xl ring-1 ring-sand-200">
              <DetailMap slug={l.slug} />
            </div>
            <div className="mt-4 rounded-3xl bg-white p-5 ring-1 ring-sand-200">
              <p className="mb-2 text-sm font-semibold">Elevation profile</p>
              <ElevationChart baseFt={l.baseFt} gainFt={l.gainFt} miles={l.miles} seed={l.seed} />
            </div>
          </section>

          <section className="rounded-3xl bg-forest-900 p-7 text-white">
            <h2 className="font-display text-2xl font-bold">Access assurance</h2>
            <p className="mt-1 text-white/70">Why you can drive this with confidence.</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {assurance.map(({ Icon, t, d }) => (
                <div key={t}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-amber-400"><Icon size={20} /></span>
                  <p className="mt-3 font-semibold">{t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/70">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold">Trail rules</h2>
            <ul className="mt-4 space-y-2.5">
              {l.rules.map((r) => (
                <li key={r} className="flex items-start gap-3 text-ink-700"><TriangleAlert size={18} className="mt-0.5 shrink-0 text-amber-600" /> {r}</li>
              ))}
            </ul>
          </section>

          {l.host && (
            <section className="flex flex-col gap-5 rounded-3xl bg-white p-7 ring-1 ring-sand-200 sm:flex-row sm:items-center">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-forest-100 font-display text-xl font-bold text-forest-800">
                {l.host.name.split(" ").filter((w) => /^[A-Z]/.test(w)).map((w) => w[0]).join("").slice(0, 2)}
              </span>
              <div className="flex-1">
                <p className="text-sm text-ink-500">Hosted by</p>
                <p className="font-display text-xl font-bold">{l.host.name}</p>
                <p className="mt-2 italic text-ink-700">“{l.host.quote}”</p>
                <p className="mt-2 flex flex-wrap gap-x-4 text-sm text-ink-500">
                  <span className="flex items-center gap-1"><BadgeCheck size={15} className="text-forest-600" /> Verified host</span>
                  <span>Responds {l.host.responseTime}</span>
                  <span>Host since {l.host.since}</span>
                </p>
              </div>
            </section>
          )}

          <section className="flex items-center gap-5 rounded-3xl bg-amber-50 p-6 ring-1 ring-amber-100">
            <BadgeIcon id={badge.id} size="md" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">Earn on this trip</p>
              <p className="font-display text-xl font-bold">{badge.name} · +{badge.points} pts</p>
              <p className="text-sm text-ink-700">{badge.description}</p>
            </div>
          </section>

          <section>
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold">
              <Star size={22} className="fill-amber-500 text-amber-500" /> {l.rating} · {l.reviews} reviews
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {reviews.map((r) => (
                <figure key={r.who} className="rounded-2xl bg-white p-5 ring-1 ring-sand-200">
                  <blockquote className="text-sm leading-relaxed text-ink-700">“{r.text}”</blockquote>
                  <figcaption className="mt-4 text-sm"><b>{r.who}</b><span className="block text-xs text-ink-500">{r.rig}</span></figcaption>
                </figure>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <BookingWidget l={l} />
        </aside>
      </div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-bold">More to explore</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {nearby.map((n) => <ListingCard key={n.slug} l={n} />)}
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
