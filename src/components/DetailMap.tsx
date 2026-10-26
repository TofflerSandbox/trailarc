"use client";

import dynamic from "next/dynamic";
import { getListing } from "@/lib/data";

const TrailMap = dynamic(() => import("./TrailMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-sand-200" />,
});

export function DetailMap({ slug }: { slug: string }) {
  const l = getListing(slug)!;
  return <TrailMap listings={[l]} focus={l} className="h-full w-full" />;
}
