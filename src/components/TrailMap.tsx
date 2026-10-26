"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import type { StyleSpecification } from "maplibre-gl";
import { Layers } from "lucide-react";
import { Listing } from "@/lib/data";
import { bounds, LngLat } from "@/lib/geo";

type Basemap = "topo" | "satellite";

const ESRI = "https://server.arcgisonline.com/ArcGIS/rest/services";

maplibregl.setWorkerUrl(`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/maplibre/maplibre-gl-worker.mjs`);

function styleFor(basemap: Basemap): StyleSpecification {
  const raster = (id: string, url: string) => ({
    [id]: { type: "raster" as const, tiles: [url], tileSize: 256, attribution: "Tiles © Esri and contributors" },
  });
  return {
    version: 8,
    sources:
      basemap === "topo"
        ? raster("base", `${ESRI}/World_Topo_Map/MapServer/tile/{z}/{y}/{x}`)
        : {
            ...raster("base", `${ESRI}/World_Imagery/MapServer/tile/{z}/{y}/{x}`),
            ...raster("labels", `${ESRI}/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}`),
          },
    layers: [
      { id: "bg", type: "background", paint: { "background-color": basemap === "topo" ? "#e9e4d6" : "#25332b" } },
      { id: "base", type: "raster", source: "base" },
      ...(basemap === "satellite" ? [{ id: "labels", type: "raster" as const, source: "labels" }] : []),
    ],
  };
}

const kindColor = { private: "#1d5c43", public: "#2563eb", event: "#e08a1e" } as const;

const VIRGINIA: [LngLat, LngLat] = [[-83.5, 36.5], [-75.6, 39.5]];

function geo(listings: Listing[]) {
  return {
    routes: {
      type: "FeatureCollection" as const,
      features: listings.map((l) => ({
        type: "Feature" as const,
        properties: { slug: l.slug, color: kindColor[l.kind] },
        geometry: { type: "LineString" as const, coordinates: l.route },
      })),
    },
    parcels: {
      type: "FeatureCollection" as const,
      features: listings
        .filter((l) => l.boundary)
        .map((l) => ({
          type: "Feature" as const,
          properties: { slug: l.slug, color: kindColor[l.kind] },
          geometry: { type: "Polygon" as const, coordinates: [l.boundary!] },
        })),
    },
  };
}

interface Props {
  listings: Listing[];
  selected?: string | null;
  onSelect?: (slug: string) => void;
  focus?: Listing; // detail mode: fit to this listing's route
  className?: string;
}

export default function TrailMap({ listings, selected, onSelect, focus, className = "" }: Props) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markers = useRef<Record<string, { m: maplibregl.Marker; node: HTMLDivElement }>>({});
  const [basemap, setBasemap] = useState<Basemap>(focus ? "satellite" : "topo");
  const firstStyle = useRef(true);
  const data = useRef(geo(listings));
  data.current = geo(listings);

  // init
  useEffect(() => {
    if (!el.current) return;
    const m = new maplibregl.Map({
      container: el.current,
      style: styleFor(basemap),
      bounds: focus ? bounds(focus.boundary ?? focus.route) : VIRGINIA,
      fitBoundsOptions: { padding: focus ? 60 : 30 },
      attributionControl: { compact: true },
      cooperativeGestures: false,
    });
    m.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    map.current = m;
    return () => {
      m.remove();
      map.current = null;
      markers.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // overlays — re-applied whenever the style changes
  useEffect(() => {
    const m = map.current;
    if (!m) return;
    const apply = () => {
      if (!m.getSource("parcels")) {
        m.addSource("parcels", { type: "geojson", data: data.current.parcels });
        m.addSource("routes", { type: "geojson", data: data.current.routes });
        m.addLayer({ id: "parcel-fill", type: "fill", source: "parcels", paint: { "fill-color": ["get", "color"], "fill-opacity": 0.14 } });
        m.addLayer({
          id: "parcel-line", type: "line", source: "parcels",
          paint: { "line-color": ["get", "color"], "line-width": 1.5, "line-dasharray": [3, 2] },
        });
        m.addLayer({
          id: "route-casing", type: "line", source: "routes",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": "#ffffff", "line-width": focus ? 8 : 5, "line-opacity": 0.9 },
        });
        m.addLayer({
          id: "route", type: "line", source: "routes",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": ["get", "color"], "line-width": focus ? 4.5 : 2.5 },
        });
      }
    };
    if (m.isStyleLoaded()) apply();
    m.on("style.load", apply);
    return () => {
      m.off("style.load", apply);
    };
  }, [focus]);

  // keep data fresh when filters change
  useEffect(() => {
    const m = map.current;
    if (!m) return;
    const set = () => {
      (m.getSource("routes") as maplibregl.GeoJSONSource | undefined)?.setData(data.current.routes);
      (m.getSource("parcels") as maplibregl.GeoJSONSource | undefined)?.setData(data.current.parcels);
    };
    if (m.isStyleLoaded()) set();
    else m.once("style.load", set);
  }, [listings]);

  // basemap switch
  useEffect(() => {
    const m = map.current;
    if (!m) return;
    if (firstStyle.current) {
      firstStyle.current = false;
      return;
    }
    m.setStyle(styleFor(basemap));
  }, [basemap]);

  // price-tag markers
  useEffect(() => {
    const m = map.current;
    if (!m) return;
    const keep = new Set(listings.map((l) => l.slug));
    for (const [slug, { m: mk }] of Object.entries(markers.current)) {
      if (!keep.has(slug)) {
        mk.remove();
        delete markers.current[slug];
      }
    }
    for (const l of listings) {
      if (markers.current[l.slug]) continue;
      const node = document.createElement("div");
      node.className = "ta-marker";
      node.textContent = focus ? "Trailhead" : l.price ? `$${l.price}` : "Free";
      node.style.cssText = `cursor:pointer;padding:4px 10px;border-radius:999px;font:600 12px/1.4 'Inter Variable',sans-serif;box-shadow:0 2px 8px rgb(0 0 0/.25);border:2px solid #fff;transition:transform .15s;white-space:nowrap;`;
      node.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelect?.(l.slug);
      });
      const start = focus ? l.route[0] : l.center;
      const mk = new maplibregl.Marker({ element: node }).setLngLat(start).addTo(m);
      markers.current[l.slug] = { m: mk, node };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listings, focus]);

  // selection styling + fly
  useEffect(() => {
    for (const l of listings) {
      const entry = markers.current[l.slug];
      if (!entry) continue;
      const on = l.slug === selected || !!focus;
      entry.node.style.background = on ? "#18211d" : kindColor[l.kind];
      entry.node.style.color = "#fff";
      entry.node.style.transform = l.slug === selected ? "scale(1.15)" : "scale(1)";
      entry.node.style.zIndex = l.slug === selected ? "10" : "1";
    }
    const m = map.current;
    const l = listings.find((x) => x.slug === selected);
    if (m && l && !focus) {
      m.fitBounds(bounds(l.boundary ?? l.route), { padding: 120, maxZoom: 12.5, duration: 900 });
    }
  }, [selected, listings, focus]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div ref={el} className="h-full w-full" />
      <button
        onClick={() => setBasemap((b) => (b === "topo" ? "satellite" : "topo"))}
        className="absolute left-3 top-3 z-10 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-ink-900 shadow-md ring-1 ring-black/5 hover:bg-sand-50"
      >
        <Layers size={14} /> {basemap === "topo" ? "Satellite" : "Topo"}
      </button>
    </div>
  );
}
