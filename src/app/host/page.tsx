"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BadgeCheck, CalendarDays, CheckCircle2, Clock, Eye, FileSignature, KeyRound, MessageSquareWarning, Plus, ShieldCheck, Star, TreePine,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Scene } from "@/components/Scene";
import { ColumnChart, StatTile } from "@/components/Charts";
import { getListing } from "@/lib/data";

const payouts = [
  { month: "Apr", payout: 1240 }, { month: "May", payout: 2380 }, { month: "Jun", payout: 3110 },
  { month: "Jul", payout: 3420 }, { month: "Aug", payout: 3050 }, { month: "Sep", payout: 2790 }, { month: "Oct", payout: 2430 },
];

const guests = [
  { name: "Alex M.", rig: "INEOS Grenadier", date: "Sat, Nov 7", vehicles: 2, waivers: "4/4", ready: true },
  { name: "Jordan T.", rig: "Toyota 4Runner", date: "Sat, Nov 7", vehicles: 1, waivers: "2/2", ready: true },
  { name: "Priya S.", rig: "Ford Bronco", date: "Sun, Nov 8", vehicles: 3, waivers: "5/7", ready: false },
  { name: "Highlands 4x4 Club", rig: "Club run · mixed", date: "Sat, Nov 14", vehicles: 6, waivers: "9/14", ready: false },
];

const reports = [
  { t: "Fallen oak across the ridge road near mile 4.2", who: "Jordan T.", when: "2 days ago" },
  { t: "Second creek crossing ~18\" after Tuesday's rain", who: "Sam R.", when: "5 days ago" },
  { t: "Gate 3 latch sticking — closed it with rope", who: "Dana K.", when: "1 week ago" },
];

export default function HostPage() {
  const l = getListing("hollow-creek-ranch")!;
  const [overnight, setOvernight] = useState(true);
  const [price, setPrice] = useState(l.price!);
  const days = Array.from({ length: 14 }, (_, i) => i);

  return (
    <>
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">Host dashboard · sample</p>
            <h1 className="mt-1 font-display text-4xl font-bold">Good morning, Ruth.</h1>
            <p className="mt-1 text-ink-500">Hollow Creek Ranch · {l.acres?.toLocaleString()} acres · Highland County</p>
          </div>
          <div className="flex gap-3">
            <Link href={`/trails/${l.slug}/`} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold ring-1 ring-sand-300 hover:bg-sand-50"><Eye size={16} /> View listing</Link>
            <button className="inline-flex items-center gap-2 rounded-full bg-forest-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-forest-800"><Plus size={16} /> Add a trail</button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatTile label="Season payouts" value="$18,420" delta="34%" sub="vs. last season" />
          <StatTile label="Bookings" value="142" sub="Apr – Oct" />
          <StatTile label="Guest rating" value="4.9 ★" sub="128 reviews" />
          <StatTile label="Weekend occupancy" value="68%" delta="12 pts" sub="since joining" />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr] [&>*]:min-w-0">
          <section className="rounded-3xl bg-white p-6 ring-1 ring-sand-200">
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-xl font-bold">Monthly payouts</h2>
              <p className="text-sm text-ink-500">After TrailArc&apos;s 18% fee</p>
            </div>
            <div className="mt-4">
              <ColumnChart data={payouts} x="month" y="payout" label="Payout" format={(v) => `$${v.toLocaleString()}`} />
            </div>
          </section>

          <section className="rounded-3xl bg-forest-900 p-6 text-white">
            <h2 className="font-display text-xl font-bold">Your protection</h2>
            <ul className="mt-5 space-y-4">
              {[
                [ShieldCheck, "$2M liability coverage", "Active on every booking through Dec 31, 2026"],
                [FileSignature, "Waivers before entry", "Gate code is released only when all guests sign"],
                [BadgeCheck, "Verified guests", "ID and driver's licence checked at sign-up"],
                [KeyRound, "Access agreement", "Renews Mar 2027 · you can pause any time"],
              ].map(([Icon, t, d]) => {
                const I = Icon as typeof ShieldCheck;
                return (
                  <li key={t as string} className="flex gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-amber-400"><I size={18} /></span>
                    <div><p className="font-semibold">{t as string}</p><p className="text-sm text-white/65">{d as string}</p></div>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr] [&>*]:min-w-0">
          <section className="rounded-3xl bg-white p-6 ring-1 ring-sand-200">
            <h2 className="font-display text-xl font-bold">Upcoming guests</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[520px] text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-ink-500">
                    <th className="pb-3 font-semibold">Guest</th><th className="pb-3 font-semibold">Date</th><th className="pb-3 font-semibold">Vehicles</th><th className="pb-3 font-semibold">Waivers</th><th className="pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-200">
                  {guests.map((g) => (
                    <tr key={g.name}>
                      <td className="py-3"><p className="font-semibold">{g.name}</p><p className="text-xs text-ink-500">{g.rig}</p></td>
                      <td className="py-3">{g.date}</td>
                      <td className="py-3">{g.vehicles}</td>
                      <td className="py-3">{g.waivers}</td>
                      <td className="py-3">
                        {g.ready ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-forest-50 px-2.5 py-1 text-xs font-semibold text-forest-800"><CheckCircle2 size={13} /> Ready</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700"><Clock size={13} /> Waivers pending</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold"><CalendarDays size={16} /> Next 14 days</p>
              <div className="grid grid-cols-7 gap-1.5">
                {days.map((d) => {
                  const date = new Date(2026, 10, 1 + d);
                  const wk = date.getDay() === 0 || date.getDay() === 6;
                  const state = d === 9 ? "blocked" : wk ? "booked" : d % 4 === 1 ? "booked" : "open";
                  return (
                    <div key={d} title={`${date.toDateString()} — ${state}`} className={`rounded-lg px-1 py-2 text-center text-xs ${state === "booked" ? "bg-forest-700 text-white" : state === "blocked" ? "bg-sand-300 text-ink-500 line-through" : "bg-sand-100 text-ink-700"}`}>
                      <span className="block text-[10px] opacity-70">{date.toLocaleDateString("en-US", { weekday: "short" })}</span>
                      {date.getDate()}
                    </div>
                  );
                })}
              </div>
              <div className="mt-2 flex gap-4 text-xs text-ink-500">
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-forest-700" /> Booked</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-sand-100 ring-1 ring-sand-300" /> Open</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-sand-300" /> Blocked (hunting)</span>
              </div>
            </div>
          </section>

          <div className="space-y-6">
            <section className="overflow-hidden rounded-3xl bg-white ring-1 ring-sand-200">
              <div className="relative h-28"><Scene scene={l.scene} seed={l.seed} className="h-full w-full" /></div>
              <div className="space-y-4 p-6">
                <h2 className="font-display text-xl font-bold">Listing settings</h2>
                <label className="block">
                  <span className="flex justify-between text-sm"><span className="font-semibold">Price per vehicle</span><b>${price}</b></span>
                  <input type="range" min={30} max={150} step={5} value={price} onChange={(e) => setPrice(+e.target.value)} className="mt-2 w-full accent-[var(--color-forest-700)]" />
                  <span className="text-xs text-ink-500">Similar Highlands properties: $55–$80</span>
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Accept overnight bookings</span>
                  <button role="switch" aria-checked={overnight} onClick={() => setOvernight((o) => !o)} className={`relative h-6 w-11 rounded-full transition ${overnight ? "bg-forest-700" : "bg-sand-300"}`}>
                    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${overnight ? "left-[22px]" : "left-0.5"}`} />
                  </button>
                </label>
                <p className="flex items-center gap-2 text-sm text-ink-500"><Star size={15} className="fill-amber-500 text-amber-500" /> Superhost status at 4.8+ with 50 trips</p>
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 ring-1 ring-sand-200">
              <h2 className="flex items-center gap-2 font-display text-xl font-bold"><TreePine size={20} className="text-forest-600" /> Trail reports</h2>
              <p className="text-sm text-ink-500">Guests flag conditions so you don&apos;t have to patrol.</p>
              <ul className="mt-4 space-y-3">
                {reports.map((r) => (
                  <li key={r.t} className="flex gap-3 rounded-2xl bg-sand-50 p-3">
                    <MessageSquareWarning size={18} className="mt-0.5 shrink-0 text-amber-600" />
                    <div className="text-sm"><p>{r.t}</p><p className="text-xs text-ink-500">{r.who} · {r.when}</p></div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
