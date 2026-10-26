# TrailArc

**From the driveway to the dirt.** TrailArc helps 4×4 owners find legal trails,
book access to private land, build skills and join a community — and gives
landowners and vehicle brands a reason to be part of it.

This repository currently holds a **clickable concept demo** for partner and
investor review, set in a Virginia pilot. All properties, hosts and metrics are
illustrative sample data.

## Demo tour

| Page | What it shows |
|---|---|
| `/` | The story: the middle-80% problem, the platform, pilot targets |
| `/explore/` | Map of Virginia trails, private properties and events with filters |
| `/trails/[slug]/` | Trail detail: route map, elevation, access assurance, host, reviews |
| `/book/[slug]/` | Booking: trip → waiver → payment → badge unlock & rank-up |
| `/passport/` | Explorer profile: rank, badges, garage (Grenadier), trips. Find Bigfoot. |
| `/host/` | Landowner dashboard: payouts, guests, protection, trail reports |
| `/partners/` | OEM partner insights: owner activity, terrain mix, flywheel, events |

Suggested walkthrough: Explore → Hollow Creek Ranch → Reserve → complete the
booking → Passport → For Landowners → For Partners. Use **Reset demo** in the
footer to start over.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
```

## Deploy

The site is a static export, so any static host works:

- **GitHub Pages** — enable Pages (Settings → Pages → Source: GitHub Actions);
  the included workflow builds and publishes on every push to `main`.
- **Vercel / Netlify** — import the repo; build command `npm run build`,
  output directory `out`.

See `docs/product-brief.md` for the product context and `CLAUDE.md` for
development notes.
