"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { explorer, getListing } from "./data";

export interface Booking {
  id: string;
  slug: string;
  date: string;
  vehicles: number;
  people: number;
  total: number;
  createdAt: number;
}

interface DemoState {
  points: number;
  badges: string[];
  bookings: Booking[];
}

interface DemoApi extends DemoState {
  ready: boolean;
  book: (b: Omit<Booking, "id" | "createdAt">) => { booking: Booking; newBadge?: string; pointsEarned: number };
  unlockBadge: (id: string, points: number) => boolean;
  reset: () => void;
}

const KEY = "trailarc-demo-v1";

const initial: DemoState = {
  points: explorer.startingPoints,
  badges: explorer.startingBadges,
  bookings: [],
};

const Ctx = createContext<DemoApi | null>(null);

function load(): DemoState {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...initial, ...JSON.parse(raw) };
  } catch {
    // private mode / blocked storage — fall back to defaults
  }
  return initial;
}

export const BOOKING_POINTS = 200;

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoState>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(load());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state, ready]);

  const book: DemoApi["book"] = useCallback(
    (b) => {
      const booking: Booking = { ...b, id: `TA-${Math.random().toString(36).slice(2, 7).toUpperCase()}`, createdAt: Date.now() };
      const listing = getListing(b.slug);
      const badgeId = listing?.badge;
      const isNew = !!badgeId && !state.badges.includes(badgeId);
      setState((s) => ({
        points: s.points + BOOKING_POINTS,
        badges: isNew && badgeId ? [...s.badges, badgeId] : s.badges,
        bookings: [booking, ...s.bookings],
      }));
      return { booking, newBadge: isNew ? badgeId : undefined, pointsEarned: BOOKING_POINTS };
    },
    [state.badges],
  );

  const unlockBadge = useCallback(
    (id: string, points: number) => {
      if (state.badges.includes(id)) return false;
      setState((s) => ({ ...s, points: s.points + points, badges: [...s.badges, id] }));
      return true;
    },
    [state.badges],
  );

  const reset = useCallback(() => setState(initial), []);

  const value = useMemo(() => ({ ...state, ready, book, unlockBadge, reset }), [state, ready, book, unlockBadge, reset]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDemo() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useDemo must be used inside DemoProvider");
  return v;
}
