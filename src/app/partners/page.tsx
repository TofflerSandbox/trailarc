"use client";

import Link from "next/link";
import { ArrowRight, Info, Lock, Megaphone, Sparkles, Wrench } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ShareBars, StatTile, TrendChart } from "@/components/Charts";

const active = [
  { m: "Mar", owners: 180 }, { m: "Apr", owners: 342 }, { m: "May", owners: 515 }, { m: "Jun", owners: 690 },
  { m: "Jul", owners: 812 }, { m: "Aug", owners: 940 }, { m: "Sep", owners: 1065 }, { m: "Oct", owners: 1284 },
];

const terrain = [
  { label: "Forest & ridge roads", value: 38 },
  { label: "Farm & ranch tracks", value: 24 },
  { label: "Water crossings", value: 14 },
  { label: "Rock gardens", value: 11 },
  { label: "Mud", value: 8 },
  { label: "Sand", value: 5 },
];

const funnel = [
  { label: "Owners invited at delivery", value: 100 },
  { label: "Activated TrailArc", value: 64 },
  { label: "Completed first trip", value: 41 },
  { label: "Repeat trips (3+)", value: 27 },
  { label: "Attended a branded event", value: 12 },
  { label: "Post-trip dealer service visit", value: 9 },
];

const regions = [
  { r: "Shenandoah Valley", owners: 412, trips: 1310, top: "Cedar Bluff Farm Trails" },
  { r: "Allegheny Highlands", owners: 298, trips: 960, top: "Hollow Creek Ranch" },
  { r: "Blue Ridge Foothills", owners: 254, trips: 702, top: "Rapidan Overlook Estate" },
  { r: "Southwest Virginia", owners: 171, trips: 588, top: "Clinch River Highlands" },
  { r: "Southside", owners: 149, trips: 400, top: "Tobacco Barn Run" },
];

export default function PartnersPage() {
  return (
    <>
      <SiteHeader />
      <section className="topo-bg bg-ink-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-400">OEM partner preview</p>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl">Your owners, after the sale.</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/75">
            How a vehicle brand would see its owner community on TrailArc: where they drive, what they need, and where the dealer fits in. Shown here for Grenadier owners in the Virginia pilot.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/80 ring-1 ring-white/15">
            <Info size={14} /> Illustrative sample data · aggregated & anonymized · owners opt in
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatTile label="Connected owners" value="1,284" delta="21%" sub="month over month" />
          <StatTile label="Trips logged" value="3,960" sub="since March" />
          <StatTile label="Off-road miles" value="48.2K" sub="avg 37.6 per owner" />
          <StatTile label="Dealer service referrals" value="312" sub="post-trip inspections" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] [&>*]:min-w-0">
          <section className="rounded-3xl bg-white p-6 ring-1 ring-sand-200">
            <h2 className="font-display text-xl font-bold">Monthly active owners</h2>
            <p className="text-sm text-ink-500">Owners who logged at least one trip or event</p>
            <div className="mt-4"><TrendChart data={active} x="m" y="owners" label="Active owners" format={(v) => v.toLocaleString()} height={240} /></div>
          </section>
          <section className="rounded-3xl bg-white p-6 ring-1 ring-sand-200">
            <h2 className="font-display text-xl font-bold">Terrain mix</h2>
            <p className="mb-5 text-sm text-ink-500">Share of owner off-road miles</p>
            <ShareBars rows={terrain} />
          </section>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr] [&>*]:min-w-0">
          <section className="rounded-3xl bg-white p-6 ring-1 ring-sand-200">
            <h2 className="font-display text-xl font-bold">The Adventure Flywheel</h2>
            <p className="mb-5 text-sm text-ink-500">Share of delivered vehicles reaching each stage</p>
            <ShareBars rows={funnel} />
          </section>
          <section className="rounded-3xl bg-white p-6 ring-1 ring-sand-200">
            <h2 className="font-display text-xl font-bold">Where owners explore</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-ink-500">
                    <th className="pb-3 font-semibold">Region</th><th className="pb-3 text-right font-semibold">Owners</th><th className="pb-3 text-right font-semibold">Trips</th><th className="pb-3 pl-6 font-semibold">Most-booked</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-200">
                  {regions.map((r) => (
                    <tr key={r.r}>
                      <td className="py-3 font-semibold">{r.r}</td>
                      <td className="py-3 text-right tabular-nums">{r.owners}</td>
                      <td className="py-3 text-right tabular-nums">{r.trips.toLocaleString()}</td>
                      <td className="py-3 pl-6 text-ink-700">{r.top}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-forest-50 p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-forest-800"><Wrench size={16} /> Service insight</p>
                <p className="mt-1 text-sm text-forest-900/80">Owners driving 3+ water crossings a month book post-trip inspections at 2.4× the rate of others.</p>
              </div>
              <div className="rounded-2xl bg-amber-50 p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-amber-700"><Sparkles size={16} /> Product insight</p>
                <p className="mt-1 text-sm text-amber-900/80">27% of owners added a winch within 60 days of their first black-diamond attempt.</p>
              </div>
            </div>
          </section>
        </div>

        <section className="grid gap-6 rounded-3xl bg-forest-900 p-8 text-white lg:grid-cols-3">
          <div className="lg:col-span-1">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-400"><Megaphone size={16} /> Co-branded activations</p>
            <h2 className="mt-2 font-display text-3xl font-bold">Turn ownership into a lifestyle.</h2>
            <p className="mt-3 text-white/70">Events and challenges the brand sponsors, TrailArc runs, and owners earn badges for.</p>
          </div>
          {[
            { t: "Grenadier Owners Skills Day", d: "Jun 7 · Shenandoah County", fill: 186, cap: 240, href: "/trails/grenadier-owners-skills-day/" },
            { t: "Highlands Challenge", d: "Season-long quest · 6 trails", fill: 402, cap: 600, href: "/explore/" },
          ].map((c) => (
            <Link key={c.t} href={c.href} className="group rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition hover:bg-white/10">
              <p className="font-display text-lg font-bold">{c.t}</p>
              <p className="text-sm text-white/60">{c.d}</p>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-amber-400" style={{ width: `${(c.fill / c.cap) * 100}%` }} /></div>
              <p className="mt-2 flex items-center justify-between text-sm text-white/80">
                <span>{c.fill} / {c.cap} registered</span>
                <ArrowRight size={16} className="text-amber-400 transition group-hover:translate-x-1" />
              </p>
            </Link>
          ))}
        </section>

        <section className="flex flex-col gap-4 rounded-3xl bg-white p-6 ring-1 ring-sand-200 sm:flex-row sm:items-center">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sand-100 text-ink-700"><Lock size={22} /></span>
          <div className="text-sm text-ink-700">
            <p className="font-semibold text-ink-900">Privacy by design</p>
            Partners see aggregated, anonymized trends only. Owners opt in to share trip data, can see exactly what&apos;s shared, and can withdraw at any time. Individual locations and identities are never sold.
          </div>
        </section>
      </div>
      <SiteFooter />
    </>
  );
}
