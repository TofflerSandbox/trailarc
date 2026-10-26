"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft, ArrowRight, Check, CheckCircle2, CreditCard, KeyRound, Loader2, Lock, Minus, Plus, Send, Star, TriangleAlert, Truck,
} from "lucide-react";
import { Scene } from "./Scene";
import { DifficultyPill } from "./Pills";
import { BadgeIcon } from "./BadgeIcon";
import { badges, explorer, getListing, rankFor } from "@/lib/data";
import { BOOKING_POINTS, useDemo } from "@/lib/store";

const steps = ["Trip", "Waiver", "Payment", "Confirmed"];

function upcomingWeekendDays(count: number) {
  const out: Date[] = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + 3);
  while (out.length < count) {
    if (d.getDay() === 6 || d.getDay() === 0) out.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return out;
}

const fmt = (d: Date) => d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

export function BookingFlow({ slug }: { slug: string }) {
  const l = getListing(slug)!;
  const params = useSearchParams();
  const demo = useDemo();
  const [step, setStep] = useState(0);
  const [vehicles, setVehicles] = useState(Math.max(1, Math.min(l.capacity, Number(params.get("v")) || 1)));
  const [people, setPeople] = useState(2);
  const dates = useMemo(() => upcomingWeekendDays(6), []);
  const [date, setDate] = useState<string>(l.date ?? fmt(dates[0]));
  const [agree, setAgree] = useState([false, false, false]);
  const [signature, setSignature] = useState("");
  const [paying, setPaying] = useState(false);
  const [result, setResult] = useState<{ ref: string; newBadge?: string; before: number; after: number } | null>(null);

  const subtotal = l.price! * vehicles;
  const fee = Math.round(subtotal * 0.08);
  const total = subtotal + fee;
  const waiverOk = agree.every(Boolean) && signature.trim().length > 3;

  const pay = () => {
    setPaying(true);
    setTimeout(() => {
      const before = demo.points;
      const r = demo.book({ slug, date, vehicles, people, total });
      setResult({ ref: r.booking.id, newBadge: r.newBadge, before, after: before + r.pointsEarned });
      setPaying(false);
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1400);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {step < 3 && (
        <Link href={`/trails/${slug}/`} className="inline-flex items-center gap-2 text-sm font-semibold text-ink-700 hover:text-ink-900">
          <ArrowLeft size={16} /> {l.name}
        </Link>
      )}

      {/* progress */}
      <ol className="mt-6 flex items-center gap-2">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-1 items-center gap-2">
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${i < step || step === 3 ? "bg-forest-700 text-white" : i === step ? "bg-amber-500 text-white" : "bg-sand-200 text-ink-500"}`}>
              {i < step || step === 3 ? <Check size={16} /> : i + 1}
            </span>
            <span className={`hidden text-sm font-semibold sm:block ${i === step ? "text-ink-900" : "text-ink-500"}`}>{s}</span>
            {i < steps.length - 1 && <span className={`h-0.5 flex-1 rounded ${i < step ? "bg-forest-600" : "bg-sand-300"}`} />}
          </li>
        ))}
      </ol>

      {step === 3 && result ? (
        <Confirmation slug={slug} result={result} date={date} vehicles={vehicles} total={total} />
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="rounded-3xl bg-white p-6 ring-1 ring-sand-200 sm:p-8">
            {step === 0 && (
              <div className="space-y-8">
                <div>
                  <h1 className="font-display text-3xl font-bold">Plan your trip</h1>
                  <p className="mt-1 text-ink-500">Choose a date and who&apos;s coming.</p>
                </div>
                <section>
                  <p className="mb-3 font-semibold">Date</p>
                  {l.date ? (
                    <p className="rounded-2xl bg-sand-100 px-4 py-3 font-semibold">{l.date}</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {dates.map((d) => {
                        const v = fmt(d);
                        return (
                          <button key={v} onClick={() => setDate(v)} className={`rounded-2xl px-4 py-3 text-left text-sm ring-1 transition ${date === v ? "bg-forest-700 font-semibold text-white ring-forest-700" : "ring-sand-300 hover:bg-sand-50"}`}>
                            {v}
                            <span className={`block text-xs ${date === v ? "text-white/75" : "text-ink-500"}`}>{Math.max(1, l.capacity - ((d.getDate() * 3) % (l.capacity + 1)))} of {l.capacity} spots left</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </section>
                <section className="grid gap-4 sm:grid-cols-2">
                  <Counter label="Vehicles" hint={`Max ${l.capacity}`} value={vehicles} set={setVehicles} min={1} max={l.capacity} />
                  <Counter label="People" hint="Everyone signs a waiver" value={people} set={setPeople} min={1} max={vehicles * 5} />
                </section>
                <section>
                  <p className="mb-3 font-semibold">Your vehicle</p>
                  <div className="flex items-center gap-4 rounded-2xl bg-sand-100 p-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-900 text-amber-400"><Truck size={22} /></span>
                    <div className="flex-1">
                      <p className="font-semibold">{explorer.vehicle.name}</p>
                      <p className="text-sm text-ink-500">{explorer.vehicle.model}</p>
                    </div>
                    <CheckCircle2 className="text-forest-600" />
                  </div>
                  {l.difficulty === "black" && (
                    <p className="mt-3 flex items-start gap-2 rounded-2xl bg-amber-50 p-4 text-sm text-amber-700 ring-1 ring-amber-100">
                      <TriangleAlert size={18} className="mt-0.5 shrink-0" />
                      Difficult trail: recovery gear required. Your garage shows your recovery kit at 4/5 items — add a tree saver before you go.
                    </p>
                  )}
                </section>
                <NextBtn onClick={() => setStep(1)}>Continue to waiver</NextBtn>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-7">
                <div>
                  <h1 className="font-display text-3xl font-bold">Sign the access waiver</h1>
                  <p className="mt-1 text-ink-500">Protects you, your passengers and the landowner. Takes about a minute.</p>
                </div>
                <div className="max-h-48 overflow-y-auto rounded-2xl bg-sand-100 p-5 text-sm leading-relaxed text-ink-700">
                  <p className="font-semibold text-ink-900">Release and Assumption of Risk — {l.name}</p>
                  <p className="mt-2">Off-road driving involves inherent risks including vehicle damage, rollover, water crossings, uneven terrain, wildlife and changing weather. I agree to follow posted trail rules and the host&apos;s instructions, stay on marked routes, and operate my vehicle within my ability and its capability.</p>
                  <p className="mt-2">Coverage for this booking includes general liability insurance up to $2,000,000 per occurrence for guests and landowner, administered by TrailArc&apos;s insurance partner. It does not cover damage to your own vehicle.</p>
                  <p className="mt-2 text-xs text-ink-500">Sample waiver text for demonstration only.</p>
                </div>
                <div className="space-y-3">
                  {[
                    "I have read and accept the release and assumption of risk.",
                    `I will follow the ${l.rules.length} trail rules for this property.`,
                    "I confirm my vehicle is street-legal, insured and suitable for this trail.",
                  ].map((t, i) => (
                    <label key={t} className="flex cursor-pointer items-start gap-3 rounded-xl p-2 hover:bg-sand-50">
                      <input type="checkbox" checked={agree[i]} onChange={() => setAgree((a) => a.map((x, j) => (j === i ? !x : x)))} className="mt-0.5 h-5 w-5 accent-[var(--color-forest-700)]" />
                      <span className="text-sm text-ink-700">{t}</span>
                    </label>
                  ))}
                </div>
                <label className="block">
                  <span className="text-sm font-semibold">Type your full name to sign</span>
                  <input value={signature} onChange={(e) => setSignature(e.target.value)} placeholder={explorer.name} className="mt-2 w-full rounded-xl bg-white px-4 py-3 font-display text-2xl italic ring-1 ring-sand-300 outline-none focus:ring-2 focus:ring-forest-500" />
                </label>
                {people > 1 && (
                  <p className="flex items-center gap-2 rounded-2xl bg-forest-50 p-4 text-sm text-forest-800">
                    <Send size={16} /> Waiver links will be texted to your {people - 1} passenger{people > 2 ? "s" : ""}. Gate code unlocks once everyone signs.
                  </p>
                )}
                <div className="flex gap-3">
                  <BackBtn onClick={() => setStep(0)} />
                  <NextBtn onClick={() => setStep(2)} disabled={!waiverOk}>Continue to payment</NextBtn>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-7">
                <div>
                  <h1 className="font-display text-3xl font-bold">Payment</h1>
                  <p className="mt-1 text-ink-500">Demo mode — no card is charged.</p>
                </div>
                <button className="w-full rounded-full bg-ink-900 py-3.5 font-semibold text-white">Express checkout</button>
                <div className="flex items-center gap-3 text-xs text-ink-400"><span className="h-px flex-1 bg-sand-300" />or card<span className="h-px flex-1 bg-sand-300" /></div>
                <div className="space-y-3">
                  <Field label="Card number" value="4242 4242 4242 4242" icon={<CreditCard size={18} className="text-ink-400" />} />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Expiry" value="08 / 29" />
                    <Field label="CVC" value="•••" />
                  </div>
                  <Field label="Name on card" value={signature || explorer.name} />
                </div>
                <p className="flex items-center gap-2 text-xs text-ink-500"><Lock size={14} /> Payments are processed securely. Hosts are paid out after your trip.</p>
                <div className="flex gap-3">
                  <BackBtn onClick={() => setStep(1)} />
                  <NextBtn onClick={pay} disabled={paying}>
                    {paying ? <><Loader2 size={18} className="animate-spin" /> Processing…</> : <>Pay ${total}</>}
                  </NextBtn>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <aside className="h-fit overflow-hidden rounded-3xl bg-white ring-1 ring-sand-200 lg:sticky lg:top-24">
            <div className="relative h-36">
              <Scene scene={l.scene} seed={l.seed} className="h-full w-full" />
              <span className="absolute bottom-3 left-3"><DifficultyPill d={l.difficulty} dark /></span>
            </div>
            <div className="space-y-4 p-5">
              <div>
                <p className="font-display text-lg font-bold">{l.name}</p>
                <p className="text-sm text-ink-500">{l.county} · {l.miles} mi · {l.hours}</p>
              </div>
              <dl className="space-y-1.5 border-t border-sand-200 pt-4 text-sm">
                <Row k="Date" v={date} />
                <Row k="Vehicles" v={String(vehicles)} />
                <Row k="People" v={String(people)} />
              </dl>
              <dl className="space-y-1.5 border-t border-sand-200 pt-4 text-sm">
                <Row k={`$${l.price} × ${vehicles}`} v={`$${subtotal}`} />
                <Row k="Access assurance" v={`$${fee}`} />
                <div className="flex justify-between pt-1 font-semibold"><dt>Total</dt><dd>${total}</dd></div>
              </dl>
              <p className="flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-700">
                <Star size={15} className="fill-amber-500 text-amber-500" /> Earn {BOOKING_POINTS} pts with this booking
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function Confirmation({ slug, result, date, vehicles, total }: { slug: string; result: { ref: string; newBadge?: string; before: number; after: number }; date: string; vehicles: number; total: number }) {
  const l = getListing(slug)!;
  const badge = result.newBadge ? badges.find((b) => b.id === result.newBadge) : undefined;
  const before = rankFor(result.before);
  const after = rankFor(result.after);
  const rankedUp = after.index > before.index;
  const pct = after.next ? Math.round(((result.after - after.current.min) / (after.next.min - after.current.min)) * 100) : 100;
  return (
    <div className="mx-auto mt-10 max-w-3xl text-center">
      <span className="mx-auto flex h-16 w-16 animate-pop-in items-center justify-center rounded-full bg-forest-700 text-white"><Check size={32} /></span>
      <h1 className="mt-6 font-display text-4xl font-bold">You&apos;re going to {l.name}.</h1>
      <p className="mt-2 text-ink-500">Booking {result.ref} · {date} · {vehicles} vehicle{vehicles > 1 ? "s" : ""} · ${total}</p>

      <div className="mt-10 grid gap-4 text-left sm:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 ring-1 ring-sand-200">
          <KeyRound className="text-forest-600" />
          <p className="mt-3 font-semibold">Gate code in 24h</p>
          <p className="mt-1 text-sm text-ink-500">Released to your phone the day before, once every passenger has signed.</p>
        </div>
        <div className="rounded-3xl bg-white p-6 ring-1 ring-sand-200">
          <Truck className="text-forest-600" />
          <p className="mt-3 font-semibold">Offline route saved</p>
          <p className="mt-1 text-sm text-ink-500">Map, checkpoints and the host&apos;s notes are on your device for zero-signal driving.</p>
        </div>
      </div>

      <div className="relative mt-6 overflow-hidden rounded-3xl bg-forest-900 p-8 text-white">
        <div className="topo-bg absolute inset-0" />
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-400">Passport updated</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-8">
            <div className="animate-pop-in [animation-delay:200ms]">
              <p className="font-display text-5xl font-extrabold text-amber-400">+{BOOKING_POINTS}</p>
              <p className="text-sm text-white/70">points</p>
            </div>
            {badge && (
              <div className="flex animate-pop-in flex-col items-center [animation-delay:450ms]">
                <BadgeIcon id={badge.id} size="lg" />
                <p className="mt-3 font-semibold">{badge.name}</p>
                <p className="text-xs text-white/60">New badge in your Passport</p>
              </div>
            )}
          </div>
          {rankedUp ? (
            <p className="mt-8 animate-pop-in font-display text-2xl font-bold [animation-delay:700ms]">New rank: {after.current.name} 🎉</p>
          ) : (
            <p className="mt-8 text-white/80">{after.current.name}</p>
          )}
          {after.next && (
            <div className="mx-auto mt-3 max-w-md">
              <div className="h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-amber-400 transition-all duration-1000" style={{ width: `${pct}%` }} /></div>
              <p className="mt-2 text-xs text-white/60">{(after.next.min - result.after).toLocaleString()} pts to {after.next.name}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/passport/" className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3.5 font-semibold text-white hover:bg-amber-600">View your Passport <ArrowRight size={18} /></Link>
        <Link href="/explore/" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold ring-1 ring-sand-300 hover:bg-sand-50">Keep exploring</Link>
      </div>
    </div>
  );
}

function Counter({ label, hint, value, set, min, max }: { label: string; hint: string; value: number; set: (n: number) => void; min: number; max: number }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-sand-100 px-4 py-3">
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-xs text-ink-500">{hint}</p>
      </div>
      <div className="flex items-center gap-3">
        <button aria-label={`Fewer ${label}`} onClick={() => set(Math.max(min, value - 1))} className="flex h-8 w-8 items-center justify-center rounded-full bg-white ring-1 ring-sand-300"><Minus size={14} /></button>
        <span className="w-4 text-center font-semibold">{value}</span>
        <button aria-label={`More ${label}`} onClick={() => set(Math.min(max, value + 1))} className="flex h-8 w-8 items-center justify-center rounded-full bg-white ring-1 ring-sand-300"><Plus size={14} /></button>
      </div>
    </div>
  );
}

function Field({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-ink-500">{label}</span>
      <span className="mt-1 flex items-center gap-2 rounded-xl bg-white px-4 py-3 ring-1 ring-sand-300">
        {icon}
        <input defaultValue={value} className="w-full bg-transparent outline-none" />
      </span>
    </label>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return <div className="flex justify-between"><dt className="text-ink-500">{k}</dt><dd>{v}</dd></div>;
}

function NextBtn({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled} className="inline-flex w-full flex-1 items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3.5 font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:bg-sand-300">
      {children}
    </button>
  );
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="rounded-full px-6 py-3.5 font-semibold ring-1 ring-sand-300 hover:bg-sand-50">Back</button>
  );
}
