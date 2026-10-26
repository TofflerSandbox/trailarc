// MapLibre resolves its web worker relative to its own bundle, which breaks
// once Next.js re-bundles it. Ship the worker as a static file instead.
import { copyFileSync, mkdirSync } from "node:fs";

mkdirSync("public/maplibre", { recursive: true });
copyFileSync("node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs", "public/maplibre/maplibre-gl-worker.mjs");
