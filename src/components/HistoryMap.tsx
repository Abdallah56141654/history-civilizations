"use client";

import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CircleMarker, LayerGroup, Map as LMap } from "leaflet";
import type { Lang } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { MapPlace } from "@/lib/timeline-data";

const TILE_URL = process.env.NEXT_PUBLIC_TILE_URL || "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const ATTRIBUTION = process.env.NEXT_PUBLIC_TILE_ATTRIBUTION || "© OpenStreetMap contributors";

type Leaflet = typeof import("leaflet");

interface Props {
  lang: Lang;
  dict: Pick<Dictionary, "map" | "rel">;
  places: MapPlace[];
  civs: { id: string; name: string }[];
}

export default function HistoryMap({ lang, dict, places, civs }: Props) {
  const el = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LMap | null>(null);
  const LRef = useRef<Leaflet | null>(null);
  const layer = useRef<LayerGroup | null>(null);
  const markers = useRef<Map<string, CircleMarker>>(new Map());
  const [ready, setReady] = useState(false);
  const [civ, setCiv] = useState("");
  const [selId, setSelId] = useState<string | null>(null);

  const shown = useMemo(() => places.filter((p) => !civ || p.civIds.includes(civ)), [places, civ]);
  const sel = places.find((p) => p.id === selId) ?? null;

  // create the map once (Leaflet touches `window`, so it is imported only in the browser)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mod = await import("leaflet");
      const L = ((mod as unknown as { default?: Leaflet }).default ?? mod) as Leaflet;
      if (cancelled || !el.current) return;
      const map = L.map(el.current, { worldCopyJump: true, scrollWheelZoom: false }).setView([30, 20], 2);
      L.tileLayer(TILE_URL, { attribution: ATTRIBUTION, maxZoom: 18 }).addTo(map);
      layer.current = L.layerGroup().addTo(map);
      mapRef.current = map;
      LRef.current = L;
      setReady(true);
    })();
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      setReady(false);
    };
  }, []);

  // (re)draw markers when the filter changes
  useEffect(() => {
    const L = LRef.current, map = mapRef.current, group = layer.current;
    if (!ready || !L || !map || !group) return;
    group.clearLayers();
    markers.current.clear();
    for (const p of shown) {
      const m = L.circleMarker([p.lat, p.lng], { radius: 9, weight: 2, color: "#1f4e8c", fillColor: "#e0b25a", fillOpacity: 0.9 });
      m.on("click", () => setSelId(p.id));
      m.bindTooltip(p.name, { direction: "top" });
      m.addTo(group);
      markers.current.set(p.id, m);
    }
    if (shown.length > 1) map.fitBounds(L.latLngBounds(shown.map((p) => [p.lat, p.lng] as [number, number])), { padding: [40, 40], maxZoom: 6 });
    else if (shown.length === 1) map.setView([shown[0].lat, shown[0].lng], 6);
    if (selId && !shown.some((p) => p.id === selId)) setSelId(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, shown]);

  // highlight + pan to the selected place
  useEffect(() => {
    const map = mapRef.current;
    if (!ready || !map) return;
    markers.current.forEach((m, id) => m.setStyle(id === selId ? { color: "#8f6212", fillColor: "#1f4e8c", radius: 12 } : { color: "#1f4e8c", fillColor: "#e0b25a", radius: 9 }));
    const p = places.find((x) => x.id === selId);
    if (p) map.panTo([p.lat, p.lng]);
  }, [ready, selId, places]);

  return (
    <div className="grid gap-6 lg:grid-cols-[19rem_1fr]">
      <div>
        <label className="text-sm">
          <span className="mb-1 block text-muted">{dict.map.civFilter}</span>
          <select value={civ} onChange={(e) => setCiv(e.target.value)} className="h-10 w-full rounded-md border border-control bg-surface px-2">
            <option value="">{dict.map.allCivs}</option>
            {civs.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </label>
        <h2 className="mt-5 font-display text-lg font-bold">{dict.map.list}</h2>
        <ul className="mt-2 max-h-72 space-y-1 overflow-y-auto">
          {shown.map((p) => (
            <li key={p.id}>
              <button type="button" aria-pressed={p.id === selId} onClick={() => setSelId(p.id)} className={`w-full rounded-md border px-3 py-2 text-start ${p.id === selId ? "border-lapis bg-surface" : "border-control hover:border-lapis"}`}>
                <span dir="auto" className="block font-medium">{p.name}</span>
                <span dir="auto" className="block text-xs text-muted">{p.civNames.join(" · ")}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div dir="ltr" className="relative h-[26rem] overflow-hidden rounded-md border border-line bg-surface sm:h-[32rem]">
          <div ref={el} className="h-full w-full" role="application" aria-label={dict.map.list} />
          {!ready && <p className="absolute inset-0 grid place-items-center text-muted">{dict.map.loading}</p>}
        </div>
        <p className="mt-2 text-xs text-muted">{dict.map.baseNote}</p>
        <div className="mt-4 rounded-md border border-line bg-surface p-4" aria-live="polite">
          {sel ? (
            <>
              <h3 className="font-display text-xl font-bold">{sel.name}</h3>
              <p className="mt-1 text-sm text-muted">{sel.civNames.join(" · ")} · {sel.lat.toFixed(3)}°, {sel.lng.toFixed(3)}°</p>
              <p className="mt-2" lang={sel.fb ? "en" : undefined} dir={sel.fb ? "ltr" : undefined}>{sel.summary}</p>
              <p className="mt-3"><Link href={`/${lang}/places/${sel.slug}/`} className="text-lapis underline underline-offset-4">{dict.map.viewPage}</Link></p>
            </>
          ) : (
            <p className="text-muted">{dict.map.hint}</p>
          )}
        </div>
      </div>
    </div>
  );
}
