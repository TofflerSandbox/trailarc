"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const INK_MUTED = "#8a948f";
const GRID = "#ebe4d8";
const SERIES = "#1d5c43";

const tooltipStyle = { borderRadius: 10, border: "none", boxShadow: "0 6px 20px rgb(0 0 0/.15)", fontSize: 12 };

type Row = Record<string, string | number>;

export function ColumnChart({ data, x, y, format = (v) => String(v), height = 220, label }: { data: Row[]; x: string; y: string; format?: (v: number) => string; height?: number; label: string }) {
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: 0 }} barCategoryGap="22%">
          <CartesianGrid vertical={false} stroke={GRID} />
          <XAxis dataKey={x} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: INK_MUTED }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: INK_MUTED }} tickFormatter={(v) => format(Number(v))} width={56} />
          <Tooltip cursor={{ fill: "rgb(29 92 67 / 0.06)" }} contentStyle={tooltipStyle} formatter={(v) => [format(Number(v)), label]} />
          <Bar dataKey={y} fill={SERIES} radius={[4, 4, 0, 0]} activeBar={{ fill: "#164a36" }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TrendChart({ data, x, y, format = (v) => String(v), height = 220, label }: { data: Row[]; x: string; y: string; format?: (v: number) => string; height?: number; label: string }) {
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="trend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={SERIES} stopOpacity={0.22} />
              <stop offset="1" stopColor={SERIES} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke={GRID} />
          <XAxis dataKey={x} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: INK_MUTED }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: INK_MUTED }} tickFormatter={(v) => format(Number(v))} width={48} />
          <Tooltip cursor={{ stroke: "#18211d", strokeDasharray: "3 3" }} contentStyle={tooltipStyle} formatter={(v) => [format(Number(v)), label]} />
          <Area type="monotone" dataKey={y} stroke={SERIES} strokeWidth={2} fill="url(#trend)" activeDot={{ r: 5, stroke: "#fff", strokeWidth: 2 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Horizontal share bars in plain HTML — readable labels, no legend needed. */
export function ShareBars({ rows, format = (v) => `${v}%` }: { rows: { label: string; value: number; note?: string }[]; format?: (v: number) => string }) {
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <ul className="space-y-3">
      {rows.map((r) => (
        <li key={r.label} className="group" title={`${r.label}: ${format(r.value)}`}>
          <div className="mb-1 flex justify-between text-sm">
            <span className="text-ink-700">{r.label}</span>
            <span className="font-semibold text-ink-900">{format(r.value)}{r.note && <span className="ml-1 font-normal text-ink-500">{r.note}</span>}</span>
          </div>
          <div className="h-2.5 rounded-full bg-sand-100">
            <div className="h-full rounded-full bg-forest-700 transition group-hover:bg-forest-800" style={{ width: `${(r.value / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function StatTile({ label, value, delta, sub }: { label: string; value: string; delta?: string; sub?: string }) {
  return (
    <div className="rounded-3xl bg-white p-5 ring-1 ring-sand-200">
      <p className="text-sm text-ink-500">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold text-ink-900">{value}</p>
      {(delta || sub) && (
        <p className="mt-1 text-xs text-ink-500">
          {delta && <span className="mr-1 font-semibold text-forest-600">▲ {delta}</span>}
          {sub}
        </p>
      )}
    </div>
  );
}
