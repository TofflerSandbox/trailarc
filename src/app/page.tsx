import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, BadgeCheck, CalendarCheck, Compass, FileSignature, Handshake, LandPlot, Map, MapPinned,
  ShieldCheck, Trophy, Users, Car,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Scene } from "@/components/Scene";
import { ListingCard } from "@/components/ListingCard";
import { DifficultyPill } from "@/components/Pills";
import { getListing, listings } from "@/lib/data";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Home() {
  const hero = getListing("hollow-creek-ranch")!;
  const featured = ["hollow-creek-ranch", "cedar-bluff-farm", "blue-ridge-overland-weekend"].map((s) => getListing(s)!);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest-950 text-white">
        <Scene scene="dawn" seed={7} road={false} className="absolute inset-0 h-full w-full opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/80 to-forest-950/10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-forest-950/70 to-transparent" />
        <SiteHeader overlay />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-36 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:pb-28 lg:pt-44">
          <div className="animate-rise">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400 ring-1 ring-white/15">
              <MapPinned size={14} /> Now piloting in Virginia
            </p>
            <h1 className="font-display text-5xl font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">
              From the driveway<br />to the <span className="text-amber-400">dirt.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              TrailArc shows 4×4 owners where they can legally go, books access to private land no map can, and turns every trip into skills, badges and community.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/explore/" className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-amber-900/30 transition hover:bg-amber-600">
                Explore Virginia trails <ArrowRight size={18} />
              </Link>
              <Link href="#how" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3.5 font-semibold text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white/20">
                How it works
              </Link>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/15 pt-6">
              {[
                ["13–20M", "U.S. 4×4 owners interested in off-road"],
                ["<20%", "of off-road capability ever used"],
                ["$1.5–2B", "annual addressable opportunity"],
              ].map(([v, l]) => (
                <div key={v}>
                  <dt className="font-display text-2xl font-bold text-white sm:text-3xl">{v}</dt>
                  <dd className="mt-1 text-xs leading-snug text-white/60">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Floating booking card */}
          <div className="relative mx-auto w-full max-w-md animate-rise [animation-delay:150ms]">
            <div className="absolute -inset-6 rounded-[2rem] bg-amber-400/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl bg-white text-ink-900 shadow-2xl">
              <div className="relative h-48">
                <Scene scene={hero.scene} seed={hero.seed} className="h-full w-full" />
                <span className="absolute left-4 top-4 rounded-full bg-forest-700 px-2.5 py-1 text-xs font-semibold text-white">Private land</span>
                <span className="absolute bottom-4 left-4"><DifficultyPill d={hero.difficulty} dark /></span>
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-lg font-bold">{hero.name}</h3>
                  <span className="text-sm"><b>${hero.price}</b> <span className="text-ink-500">/ vehicle</span></span>
                </div>
                <p className="text-sm text-ink-500">{hero.county} · {hero.acres?.toLocaleString()} acres · {hero.miles} mi loop</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {[
                    [ShieldCheck, "Legal access confirmed with landowner"],
                    [FileSignature, "Digital waiver signed by all occupants"],
                    [BadgeCheck, "$2M per-booking liability coverage"],
                  ].map(([Icon, t], i) => {
                    const I = Icon as typeof ShieldCheck;
                    return (
                      <li key={i} className="flex items-center gap-2.5 text-ink-700">
                        <I size={17} className="text-forest-600" /> {t as string}
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-5 flex items-center justify-between rounded-2xl bg-forest-50 px-4 py-3">
                  <div className="text-sm">
                    <p className="font-semibold text-forest-800">Sat, May 9 · 2 vehicles</p>
                    <p className="text-forest-700/80">Gate code sent 24h before</p>
                  </div>
                  <span className="rounded-full bg-forest-700 px-3 py-1 text-xs font-bold text-white">Booked</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-12 -left-6 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 text-ink-900 shadow-xl sm:flex">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-white"><Trophy size={20} /></span>
              <div className="text-sm">
                <p className="font-semibold">Badge unlocked</p>
                <p className="text-ink-500">Creek Crosser · +100 pts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The middle 80% */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">The middle 80%</p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight">They bought the capability. Nobody showed them where to use it.</h2>
          <p className="mt-4 text-lg text-ink-700">
            Millions of owners have lockers, low range and all-terrain tires — and drive them to the grocery store. Not because they don&apos;t want adventure, but because three questions stop them.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            { q: "“Where am I allowed to go?”", a: "Every route is checked for legality — public motor-vehicle-use data, seasonal closures and land-ownership boundaries, all offline.", Icon: Map },
            { q: "“What if something goes wrong?”", a: "Private access comes with waivers, insurance and a host who knows you're coming. Skills modules build confidence before you need it.", Icon: ShieldCheck },
            { q: "“Who do I go with?”", a: "Clubs, guided weekends and a community that rewards stewardship — not just horsepower.", Icon: Users },
          ].map(({ q, a, Icon }) => (
            <div key={q} className="rounded-3xl bg-white p-7 ring-1 ring-sand-200">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-50 text-forest-700"><Icon size={24} /></span>
              <p className="mt-5 font-display text-xl font-bold">{q}</p>
              <p className="mt-2 leading-relaxed text-ink-700">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars with photography */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="max-w-2xl font-display text-4xl font-bold leading-tight">One app for the whole adventure.</h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              { img: "dirt-road", title: "Know it's legal", body: "Trail difficulty, legality and closures layered on aviation-grade maps. Download a region and go — no signal required." },
              { img: "ar-nav", title: "Grow your skills", body: "Step-by-step skills challenges for winching, hill climbs and water crossings, with camera-based AR guidance on the trail." },
              { img: "camp-meetup", title: "Find your people", body: "Clubs, guided overland weekends and events. Earn badges for trails, skills and volunteer trail work." },
            ].map((p) => (
              <article key={p.img} className="overflow-hidden rounded-3xl bg-sand-50 ring-1 ring-sand-200">
                <div className="relative h-56">
                  <Image src={`${base}/img/${p.img}.jpg`} alt="" fill className="object-cover" sizes="(min-width: 1024px) 33vw, 100vw" />
                </div>
                <div className="p-7">
                  <h3 className="font-display text-xl font-bold">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-700">{p.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">Virginia pilot</p>
            <h2 className="mt-3 font-display text-4xl font-bold">Featured this season</h2>
          </div>
          <Link href="/explore/" className="inline-flex items-center gap-2 font-semibold text-forest-700 hover:text-forest-900">
            See all {listings.length} on the map <ArrowRight size={18} />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((l) => <ListingCard key={l.slug} l={l} />)}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="topo-bg scroll-mt-10 bg-forest-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-4xl font-bold">Four steps from driveway to dirt.</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", t: "Discover", b: "Filter legal public routes and private properties by difficulty, terrain and your vehicle.", Icon: Compass },
              { n: "02", t: "Book", b: "Reserve private access in a tap. Waivers, insurance and payment are handled for you.", Icon: CalendarCheck },
              { n: "03", t: "Drive", b: "Offline navigation, gate codes, checkpoints and skills guidance on the trail.", Icon: Car },
              { n: "04", t: "Earn", b: "Badges, ranks and rewards — and partner perks from the brands you already own.", Icon: Trophy },
            ].map(({ n, t, b, Icon }) => (
              <div key={n} className="rounded-3xl bg-white/5 p-7 ring-1 ring-white/10">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white"><Icon size={22} /></span>
                  <span className="font-display text-3xl font-bold text-white/15">{n}</span>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold">{t}</h3>
                <p className="mt-2 leading-relaxed text-white/70">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three-sided platform */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">The platform</p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight">A marketplace where every side wins.</h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            { href: "/passport/", Icon: Compass, who: "Explorers", t: "Confidence to use the vehicle they bought", pts: ["Legal routes & offline maps", "Private land in a tap", "Skills, badges & community"], cta: "See the Explorer Passport" },
            { href: "/host/", Icon: LandPlot, who: "Landowners", t: "New income without new risk", pts: ["Set your price, dates & rules", "Waivers, vetting & insurance included", "Payouts every week"], cta: "See the Host dashboard" },
            { href: "/partners/", Icon: Handshake, who: "OEM & brand partners", t: "A relationship that starts after the sale", pts: ["Co-branded owner events", "Anonymized usage insights", "Dealer service referrals"], cta: "See Partner insights" },
          ].map(({ href, Icon, who, t, pts, cta }) => (
            <Link key={href} href={href} className="group flex flex-col rounded-3xl bg-white p-8 ring-1 ring-sand-200 transition hover:shadow-xl">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-700 text-white"><Icon size={22} /></span>
              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-ink-500">{who}</p>
              <h3 className="mt-1 font-display text-2xl font-bold leading-snug">{t}</h3>
              <ul className="mt-5 flex-1 space-y-2.5">
                {pts.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-ink-700"><BadgeCheck size={18} className="text-forest-500" /> {p}</li>
                ))}
              </ul>
              <span className="mt-7 inline-flex items-center gap-2 font-semibold text-forest-700 group-hover:gap-3 transition-all">{cta} <ArrowRight size={18} /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* Pilot targets */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-amber-500 px-8 py-14 text-white sm:px-14">
          <Scene scene="dusk" seed={5} road={false} className="absolute inset-0 h-full w-full opacity-25 mix-blend-multiply" />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-4xl font-bold leading-tight">Virginia first. Then every state with a dirt road.</h2>
              <p className="mt-4 max-w-md text-white/90">Year-one pilot targets from the TrailArc plan — proving the marketplace on both sides before national scale.</p>
            </div>
            <dl className="grid grid-cols-2 gap-4">
              {[
                ["10K+", "active explorers"],
                ["600", "land partners onboarded"],
                ["25M+", "acres mapped for legal access"],
                ["1 + 4", "OEM and brand partners"],
              ].map(([v, l]) => (
                <div key={l} className="rounded-2xl bg-white/15 p-5 ring-1 ring-white/25 backdrop-blur">
                  <dt className="font-display text-3xl font-bold">{v}</dt>
                  <dd className="mt-1 text-sm text-white/90">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
