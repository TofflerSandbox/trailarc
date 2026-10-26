import { seeded } from "@/lib/geo";
import type { Scene as SceneName } from "@/lib/data";

const palettes: Record<SceneName, { sky: [string, string, string]; ridges: string[]; sun: string; sunY: number }> = {
  dawn: { sky: ["#c9a7c0", "#f4c9a4", "#fbe7cf"], ridges: ["#b9a6bb", "#927f9f", "#655f80", "#3e4560", "#20283a"], sun: "#fff3dc", sunY: 0.55 },
  day: { sky: ["#7fb3dc", "#b9d8ec", "#e8f2f6"], ridges: ["#a7c1cd", "#7ea0ae", "#557d86", "#345d58", "#1e3e34"], sun: "#ffffff", sunY: 0.22 },
  dusk: { sky: ["#4d3866", "#d9735a", "#f7c27a"], ridges: ["#8a5a7a", "#6a4466", "#4a3253", "#2e2240", "#18142a"], sun: "#ffd9a0", sunY: 0.6 },
  autumn: { sky: ["#a9c8db", "#d8e4e6", "#f3ead7"], ridges: ["#b8b39b", "#c98d43", "#a35e27", "#64401f", "#2f2416"], sun: "#fffaf0", sunY: 0.25 },
  mist: { sky: ["#c3ccd2", "#dde3e5", "#f0f2f1"], ridges: ["#c5cdd1", "#a0acb2", "#77878e", "#4f6168", "#2b3a3f"], sun: "#ffffff", sunY: 0.35 },
};

function ridgePath(seed: number, layer: number, w: number, h: number) {
  const rand = seeded(seed * 31 + layer * 97);
  const base = h * (0.38 + layer * 0.13);
  const amp = h * (0.13 - layer * 0.012);
  const f1 = 1.2 + rand() * 1.4, f2 = 3 + rand() * 3, f3 = 9 + rand() * 6;
  const p1 = rand() * 6, p2 = rand() * 6, p3 = rand() * 6;
  let d = `M0 ${h} `;
  for (let x = 0; x <= w; x += 8) {
    const t = x / w;
    const y =
      base -
      amp * Math.sin(t * Math.PI * f1 + p1) -
      amp * 0.45 * Math.sin(t * Math.PI * f2 + p2) -
      amp * 0.12 * Math.sin(t * Math.PI * f3 + p3);
    d += `L${x} ${y.toFixed(1)} `;
  }
  return d + `L${w} ${h} Z`;
}

/** Generated Blue Ridge landscape used as listing imagery. */
export function Scene({ scene, seed, className = "", road = true }: { scene: SceneName; seed: number; className?: string; road?: boolean }) {
  const p = palettes[scene];
  const w = 800, h = 450;
  const id = `sc-${scene}-${seed}`;
  const rand = seeded(seed);
  const sunX = w * (0.2 + rand() * 0.6);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.sky[0]} />
          <stop offset="0.55" stopColor={p.sky[1]} />
          <stop offset="1" stopColor={p.sky[2]} />
        </linearGradient>
        <radialGradient id={`${id}-sun`}>
          <stop offset="0" stopColor={p.sun} stopOpacity="1" />
          <stop offset="0.25" stopColor={p.sun} stopOpacity="0.9" />
          <stop offset="1" stopColor={p.sun} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-haze`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.sky[2]} stopOpacity="0" />
          <stop offset="1" stopColor={p.sky[2]} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill={`url(#${id}-sky)`} />
      <circle cx={sunX} cy={h * p.sunY} r={120} fill={`url(#${id}-sun)`} />
      {p.ridges.map((c, i) => (
        <g key={i}>
          <path d={ridgePath(seed, i, w, h)} fill={c} />
          {i < p.ridges.length - 1 && <rect y={h * (0.3 + i * 0.13)} width={w} height={h} fill={`url(#${id}-haze)`} opacity={0.5} />}
        </g>
      ))}
      {road && (
        <path
          d={`M${w * 0.42} ${h} C ${w * 0.5} ${h * 0.88}, ${w * 0.62} ${h * 0.9}, ${w * 0.58} ${h * 0.82} S ${w * 0.5} ${h * 0.76}, ${w * 0.56} ${h * 0.72}`}
          fill="none"
          stroke="#e9dcc3"
          strokeOpacity="0.55"
          strokeWidth="10"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
