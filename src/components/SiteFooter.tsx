"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { Logo } from "./Logo";
import { useDemo } from "@/lib/store";

export function SiteFooter() {
  const { reset } = useDemo();
  return (
    <footer className="topo-bg mt-24 bg-forest-950 text-white/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Safe, legal and extraordinary off-road adventure for the middle 80% of 4×4 owners. Technology for the adventurous.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold text-white">Platform</p>
          <ul className="space-y-2">
            <li><Link href="/explore/" className="hover:text-white">Explore Virginia</Link></li>
            <li><Link href="/passport/" className="hover:text-white">Explorer Passport</Link></li>
            <li><Link href="/host/" className="hover:text-white">Host your land</Link></li>
            <li><Link href="/partners/" className="hover:text-white">OEM &amp; brand partners</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold text-white">About this demo</p>
          <p className="leading-relaxed">
            Concept demo for partner and investor review. All properties, hosts, routes and metrics are illustrative sample data.
          </p>
          <button onClick={reset} className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10">
            <RotateCcw size={13} /> Reset demo
          </button>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs">© 2026 TrailArc · Concept demo</div>
    </footer>
  );
}
