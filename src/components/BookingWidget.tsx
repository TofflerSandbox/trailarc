"use client";

import Link from "next/link";
import { useState } from "react";
import { CloudDownload, Minus, Navigation, Plus, ShieldCheck } from "lucide-react";
import { Listing } from "@/lib/data";

export function BookingWidget({ l }: { l: Listing }) {
  const [vehicles, setVehicles] = useState(1);
  const [downloaded, setDownloaded] = useState(false);

  if (!l.price) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-sand-200">
        <p className="font-display text-2xl font-bold text-forest-700">Free public access</p>
        <p className="mt-1 text-sm text-ink-500">Designated route for street-legal vehicles. {l.season}.</p>
        <button onClick={() => setDownloaded(true)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-forest-700 py-3.5 font-semibold text-white hover:bg-forest-800">
          <CloudDownload size={18} /> {downloaded ? "Saved for offline · 42 MB" : "Download offline map"}
        </button>
        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-sand-100 py-3.5 font-semibold text-ink-900 hover:bg-sand-200">
          <Navigation size={18} /> Navigate to trailhead
        </button>
        <p className="mt-4 text-xs leading-relaxed text-ink-500">Legality shown from sample data. In production this is sourced from official motor-vehicle-use maps and refreshed daily.</p>
      </div>
    );
  }

  const total = l.price * vehicles;
  const fee = Math.round(total * 0.08);
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-sand-200">
      <p className="text-sm text-ink-500">{l.kind === "event" ? l.date : "Day access"}</p>
      <p className="font-display text-3xl font-bold">${l.price}<span className="text-base font-medium text-ink-500"> / vehicle</span></p>
      <div className="mt-5 flex items-center justify-between rounded-2xl bg-sand-100 px-4 py-3">
        <div>
          <p className="text-sm font-semibold">Vehicles</p>
          <p className="text-xs text-ink-500">Up to {l.capacity} per booking</p>
        </div>
        <div className="flex items-center gap-3">
          <button aria-label="Fewer vehicles" onClick={() => setVehicles((v) => Math.max(1, v - 1))} className="flex h-8 w-8 items-center justify-center rounded-full bg-white ring-1 ring-sand-300 hover:bg-sand-50"><Minus size={14} /></button>
          <span className="w-4 text-center font-semibold">{vehicles}</span>
          <button aria-label="More vehicles" onClick={() => setVehicles((v) => Math.min(l.capacity, v + 1))} className="flex h-8 w-8 items-center justify-center rounded-full bg-white ring-1 ring-sand-300 hover:bg-sand-50"><Plus size={14} /></button>
        </div>
      </div>
      <dl className="mt-5 space-y-2 text-sm">
        <div className="flex justify-between"><dt className="text-ink-500">${l.price} × {vehicles} vehicle{vehicles > 1 ? "s" : ""}</dt><dd>${total}</dd></div>
        <div className="flex justify-between"><dt className="text-ink-500">Access assurance (insurance + waivers)</dt><dd>${fee}</dd></div>
        <div className="flex justify-between border-t border-sand-200 pt-2 font-semibold"><dt>Total</dt><dd>${total + fee}</dd></div>
      </dl>
      <Link href={`/book/${l.slug}/?v=${vehicles}`} className="mt-5 flex w-full items-center justify-center rounded-full bg-amber-500 py-3.5 font-semibold text-white shadow-md shadow-amber-900/20 hover:bg-amber-600">
        {l.kind === "event" ? "Reserve your spot" : "Reserve access"}
      </Link>
      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-ink-500"><ShieldCheck size={14} className="text-forest-600" /> Free cancellation up to 72 hours before</p>
    </div>
  );
}
