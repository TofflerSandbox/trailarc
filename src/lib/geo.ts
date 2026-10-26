export type LngLat = [number, number];

// Small deterministic PRNG so generated geometry is stable between renders/builds.
export function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const MI_PER_DEG_LAT = 69;
const miPerDegLng = (lat: number) => 69 * Math.cos((lat * Math.PI) / 180);

/** Irregular property boundary around a centre, sized roughly to `acres`. */
export function parcel(center: LngLat, acres: number, seed: number): LngLat[] {
  const rand = seeded(seed);
  const radiusMi = Math.sqrt(acres / 640 / Math.PI);
  const pts: LngLat[] = [];
  const n = 9;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + rand() * 0.3;
    const r = radiusMi * (0.75 + rand() * 0.45);
    pts.push([
      center[0] + (Math.cos(a) * r) / miPerDegLng(center[1]),
      center[1] + (Math.sin(a) * r) / MI_PER_DEG_LAT,
    ]);
  }
  pts.push(pts[0]);
  return pts;
}

/** Wiggly closed loop approximating a trail of `miles` length. */
export function loopRoute(center: LngLat, miles: number, seed: number, closed = true): LngLat[] {
  const rand = seeded(seed * 7 + 3);
  const steps = 64;
  const baseR = miles / (2 * Math.PI) * 0.82;
  const phase = rand() * Math.PI * 2;
  const k1 = 2 + Math.floor(rand() * 3);
  const k2 = 5 + Math.floor(rand() * 4);
  const pts: LngLat[] = [];
  const span = closed ? Math.PI * 2 : Math.PI * 1.3;
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * span + phase;
    const r =
      baseR *
      (1 + 0.28 * Math.sin(k1 * a + phase) + 0.1 * Math.sin(k2 * a)) *
      (closed ? 1 : 1.6);
    pts.push([
      center[0] + (Math.cos(a) * r) / miPerDegLng(center[1]),
      center[1] + (Math.sin(a) * r * 0.8) / MI_PER_DEG_LAT,
    ]);
  }
  return pts;
}

/** Fake elevation profile (ft) along a route, for the detail page chart. */
export function elevationProfile(minFt: number, gainFt: number, seed: number, n = 48) {
  const rand = seeded(seed * 13 + 1);
  const p1 = rand() * Math.PI;
  const p2 = rand() * Math.PI;
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    const shape =
      0.5 + 0.38 * Math.sin(Math.PI * t * 1.6 + p1) + 0.12 * Math.sin(Math.PI * t * 5 + p2);
    return { mile: t, ft: Math.round(minFt + gainFt * Math.max(0, Math.min(1, shape))) };
  });
}

export function bounds(points: LngLat[]): [LngLat, LngLat] {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const [x, y] of points) {
    minX = Math.min(minX, x); minY = Math.min(minY, y);
    maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
  }
  return [[minX, minY], [maxX, maxY]];
}
