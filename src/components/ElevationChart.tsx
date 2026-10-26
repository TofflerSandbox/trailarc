"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { elevationProfile } from "@/lib/geo";

export default function ElevationChart({ baseFt, gainFt, miles, seed }: { baseFt: number; gainFt: number; miles: number; seed: number }) {
  const data = elevationProfile(baseFt, gainFt, seed).map((p) => ({ mi: +(p.mile * miles).toFixed(1), ft: p.ft }));
  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="elev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2f7a57" stopOpacity={0.35} />
              <stop offset="1" stopColor="#2f7a57" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <XAxis dataKey="mi" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#8a948f" }} tickFormatter={(v) => `${v} mi`} minTickGap={40} />
          <YAxis dataKey="ft" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#8a948f" }} width={52} tickFormatter={(v) => `${v.toLocaleString()}′`} domain={["dataMin - 100", "dataMax + 100"]} />
          <Tooltip
            cursor={{ stroke: "#18211d", strokeDasharray: "3 3" }}
            contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 6px 20px rgb(0 0 0/.15)", fontSize: 12 }}
            formatter={(v) => [`${Number(v).toLocaleString()} ft`, "Elevation"]}
            labelFormatter={(l) => `Mile ${l}`}
          />
          <Area type="monotone" dataKey="ft" stroke="#1d5c43" strokeWidth={2} fill="url(#elev)" activeDot={{ r: 5, stroke: "#fff", strokeWidth: 2 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
