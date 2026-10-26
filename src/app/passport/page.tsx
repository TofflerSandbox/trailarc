"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CalendarDays, CheckCircle2, Circle, Footprints, Gift, Lock, MapPin, Route, Star, Trophy, Truck, Users } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Scene } from "@/components/Scene";
import { BadgeIcon } from "@/components/BadgeIcon";
import { DifficultyMark } from "@/components/Pills";
import { badges, explorer, getListing, rankFor, ranks } from "@/lib/data";
import { useDemo } from "@/lib/store";

export default function PassportPage() {
  const demo = useDemo();
  const [bigfoot, setBigfoot] = useState(false);
  const { current, next, index } = rankFor(demo.points);
  const pct = next ? Math.round(((demo.points - current.min) / (next.min - current.min)) * 100) : 100;
  const past = explorer.pastTrips.map((t) => ({ ...t, l: getListing(t.slug)! }));
  const miles = past.reduce((s, t) => s + t.l.miles, 0);

  const findBigfoot = () => {
    if (demo.unlockBadge("bigfoot", 250)) setBigfoot(true);
  };

  return (
    <>
      <SiteHeader />
      <section className="relative overflow-hidden bg-forest-900 text-white">
        <Scene scene="mist" seed={3} road={false} className="absolute inset-0 h-full w-full opacity-30" />
        <div className="topo-bg absolute inset-0" />
        <button onClick={findBigfoot} aria-label="Something moved on the ridge" className="absolute right-[8%] top-6 z-10 text-white/15 transition hover:scale-125 hover:text-white/40">
          <Footprints size={18} />
        </button>
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-center gap-5">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-500 font-display text-3xl font-bold ring-4 ring-white/20">AM</span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-amber-400">Explorer Passport</p>
                <h1 className="font-display text-4xl font-bold">{explorer.name}</h1>
                <p className="mt-1 flex items-center gap-3 text-white/70"><span className="flex items-center gap-1"><MapPin size={15} /> {explorer.home}</span><span>Member since {explorer.memberSince}</span></p>
              </div>
            </div>
            <div className="w-full max-w-md rounded-3xl bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/60">Rank</p>
                  <p className="font-display text-2xl font-bold">{current.name}</p>
                </div>
                <p className="flex items-center gap-1.5 font-display text-2xl font-bold" suppressHydrationWarning>
                  <Star size={20} className="fill-amber-400 text-amber-400" /> {demo.points.toLocaleString()}
                </p>
              </div>
              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-amber-400 transition-all duration-700" style={{ width: `${pct}%` }} /></div>
              <div className="mt-3 flex justify-between gap-1">
                {ranks.map((r, i) => (
                  <span key={r.name} className={`text-[10px] font-semibold uppercase tracking-wide sm:text-[11px] ${i <= index ? "text-amber-400" : "text-white/40"}`}>{r.name}</span>
                ))}
              </div>
            </div>
          </div>
          {bigfoot && (
            <div className="mt-6 flex animate-pop-in items-center gap-4 rounded-2xl bg-amber-500 p-4">
              <BadgeIcon id="bigfoot" size="sm" />
              <p className="font-semibold">You found Bigfoot! Secret badge unlocked · +250 pts</p>
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:px-6">
        <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { Icon: Route, k: "Trips completed", v: past.length },
            { Icon: Truck, k: "Off-road miles", v: miles.toFixed(0) },
            { Icon: Trophy, k: "Badges earned", v: `${demo.badges.length} / ${badges.length}` },
            { Icon: Users, k: "Stewardship hours", v: 6 },
          ].map(({ Icon, k, v }) => (
            <div key={k} className="rounded-3xl bg-white p-5 ring-1 ring-sand-200">
              <Icon size={20} className="text-forest-600" />
              <dd className="mt-3 font-display text-3xl font-bold" suppressHydrationWarning>{v}</dd>
              <dt className="text-sm text-ink-500">{k}</dt>
            </div>
          ))}
        </dl>

        <section>
          <h2 className="font-display text-2xl font-bold">Upcoming trips</h2>
          {demo.bookings.length === 0 ? (
            <div className="mt-4 flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-sand-300 p-10 text-center">
              <CalendarDays className="text-ink-400" />
              <p className="text-ink-700">No trips booked yet.</p>
              <Link href="/explore/" className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-600">Find a trail <ArrowRight size={16} /></Link>
            </div>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {demo.bookings.map((b) => {
                const l = getListing(b.slug)!;
                return (
                  <Link key={b.id} href={`/trails/${l.slug}/`} className="flex overflow-hidden rounded-3xl bg-white ring-1 ring-sand-200 transition hover:shadow-lg">
                    <div className="w-36 shrink-0"><Scene scene={l.scene} seed={l.seed} className="h-full w-full" /></div>
                    <div className="flex-1 p-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-forest-600">Confirmed · {b.id}</p>
                      <p className="mt-1 font-display text-lg font-bold">{l.name}</p>
                      <p className="text-sm text-ink-500">{b.date} · {b.vehicles} vehicle{b.vehicles > 1 ? "s" : ""} · {b.people} people</p>
                      <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-forest-50 px-2.5 py-1 text-xs font-semibold text-forest-800"><CheckCircle2 size={13} /> Waivers signed · gate code pending</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        <section>
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold">Badges</h2>
            <p className="text-sm text-ink-500">Earned for trails, skills and stewardship</p>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {badges.map((b) => {
              const earned = demo.badges.includes(b.id);
              const hidden = b.secret && !earned;
              return (
                <div key={b.id} className={`flex flex-col items-center rounded-3xl p-5 text-center ring-1 ${earned ? "bg-white ring-sand-200" : "bg-sand-50 ring-sand-200/60"}`}>
                  {hidden ? (
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sand-200 text-sand-500 ring-4 ring-sand-300"><Lock size={22} /></span>
                  ) : (
                    <BadgeIcon id={b.id} earned={earned} />
                  )}
                  <p className={`mt-3 text-sm font-semibold ${earned ? "" : "text-ink-500"}`}>{hidden ? "Secret badge" : b.name}</p>
                  <p className="mt-1 text-xs leading-snug text-ink-500">{hidden ? "Keep your eyes open…" : b.description}</p>
                  {b.partner && <span className="mt-2 rounded-full bg-ink-900 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-400">Partner badge</span>}
                </div>
              );
            })}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-sand-200">
            <div className="relative h-44 bg-ink-900">
              <Scene scene="autumn" seed={21} className="h-full w-full opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">My Garage</p>
                <p className="font-display text-2xl font-bold">“{explorer.vehicle.name}”</p>
                <p className="text-sm text-white/80">{explorer.vehicle.model} · {explorer.vehicle.mileage.toLocaleString()} mi</p>
              </div>
            </div>
            <div className="grid gap-6 p-6 sm:grid-cols-2">
              <div>
                <p className="mb-3 text-sm font-semibold">Trail readiness</p>
                <ul className="space-y-2.5">
                  {explorer.vehicle.readiness.map((r) => (
                    <li key={r.label} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">{r.ok ? <CheckCircle2 size={16} className="text-forest-600" /> : <Circle size={16} className="text-amber-500" />}{r.label}</span>
                      <span className={r.ok ? "text-ink-500" : "font-semibold text-amber-600"}>{r.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold">Build</p>
                <div className="flex flex-wrap gap-2">
                  {explorer.vehicle.mods.map((m) => <span key={m} className="rounded-full bg-sand-100 px-3 py-1 text-xs text-ink-700">{m}</span>)}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-ink-900 p-6 text-white">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400"><Gift size={15} /> Owner perks</p>
            <p className="mt-2 font-display text-2xl font-bold">Unlocked by your vehicle</p>
            <ul className="mt-5 space-y-3">
              {[
                ["Grenadier Owners Skills Day", "Priority registration · Jun 7", "/trails/grenadier-owners-skills-day/"],
                ["Post-trip inspection", "Complimentary at participating dealers", null],
                ["Recovery gear", "15% off partner outfitters (sample offer)", null],
              ].map(([t, d, href]) => {
                const inner = (
                  <>
                    <div>
                      <p className="font-semibold">{t}</p>
                      <p className="text-sm text-white/60">{d}</p>
                    </div>
                    {href && <ArrowRight size={18} className="text-amber-400" />}
                  </>
                );
                return (
                  <li key={t}>
                    {href ? (
                      <Link href={href} className="flex items-center justify-between rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 hover:bg-white/10">{inner}</Link>
                    ) : (
                      <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold">Trip log</h2>
          <ol className="mt-5 space-y-3">
            {past.slice().reverse().map((t) => (
              <li key={t.slug + t.date}>
                <Link href={`/trails/${t.slug}/`} className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-sand-200 hover:shadow-md">
                  <div className="h-14 w-20 shrink-0 overflow-hidden rounded-xl"><Scene scene={t.l.scene} seed={t.l.seed} className="h-full w-full" /></div>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 font-semibold"><DifficultyMark d={t.l.difficulty} className="h-3 w-3" /> {t.l.name}</p>
                    <p className="truncate text-sm text-ink-500">{t.date} · {t.l.miles} mi · “{t.note}”</p>
                  </div>
                  <ArrowRight size={18} className="text-ink-400" />
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </div>
      <SiteFooter />
    </>
  );
}
