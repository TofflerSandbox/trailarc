# TrailArc

Off-road adventure platform for the "middle 80%" of 4×4 owners: legal trail
discovery, a private-land access marketplace, skills/badges, and OEM partner
insights. Read `docs/product-brief.md` for the product context before making
product decisions.

## Current stage

A **polished click-through demo** for INEOS and investors — not production.
- Static Next.js export, no backend. All data is illustrative sample data in
  `src/lib/data.ts` (fictional Virginia properties, hosts, metrics). Keep it
  clearly labeled as sample data; never present it as real traction.
- Demo state (bookings, points, badges) lives in `localStorage` via
  `src/lib/store.tsx`; "Reset demo" in the footer clears it.
- The demo explorer starts at 1,340 pts so one booking (+200) triggers the
  rank-up to Veteran Outfitter — keep that moment working.

## Stack

Next.js 15 (App Router, `output: "export"`), React 19, TypeScript, Tailwind v4
(brand tokens in `src/app/globals.css` `@theme`), MapLibre GL (Esri topo /
imagery raster tiles, no API key), Recharts, lucide-react, self-hosted fonts
(Inter + Archivo via @fontsource — no Google Fonts fetch at build).

## Commands

- `npm run dev` — local dev (copies the MapLibre worker into `public/` first)
- `npm run build` — static export to `out/` (also runs lint + type-check)
- `NEXT_PUBLIC_BASE_PATH=/trailarc npm run build` — for GitHub Pages sub-path

## Conventions & gotchas

- Brand: forest green primary, amber accent/CTAs, warm sand background,
  `font-display` (Archivo, widened) for headings. Difficulty uses ski-style
  marks (green circle / blue square / black diamond) — `components/Pills.tsx`.
- Listing imagery is generated SVG landscapes (`components/Scene.tsx`), not photos.
- MapLibre's CSS forces `position: relative` on the map container — size the
  container with `h-full w-full`, never `absolute inset-0`.
- MapLibre's worker must be served from `public/maplibre/` (see
  `scripts/copy-maplibre-worker.mjs`); it's git-ignored and generated.
- Dynamic routes need `generateStaticParams` (static export).
- Internal links use trailing slashes (`trailingSlash: true`).

## Likely next steps

Real data (USFS MVUM for Virginia, parcel data), Supabase/PostGIS backend,
Stripe Connect for host payouts, auth, host listing wizard, Expo mobile app
with offline maps.
