"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { Lang } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { TLCiv, TLEvent } from "@/lib/timeline-data";
import { formatYear } from "@/lib/site";

const MIN = -3600;
const MAX = 1800;
const PAD = 180; // right padding so labels of late items are not clipped
const ZOOMS = [0.08, 0.16, 0.32, 0.64, 1.28, 2.56]; // pixels per year
// Conventional era boundaries; historians draw them differently (stated on the page).
const ERAS = [
  { id: "prehistory", from: MIN, to: -3000 },
  { id: "ancient", from: -3000, to: -800 },
  { id: "classical", from: -800, to: 300 },
  { id: "lateAntiquity", from: 300, to: 600 },
  { id: "middleAges", from: 600, to: 1500 },
  { id: "earlyModern", from: 1500, to: MAX },
] as const;
const TICK_STEPS = [1000, 500, 250, 100, 50, 25, 10];
const LANE_H = 46;
const LABEL_W = 170;

interface Props {
  lang: Lang;
  dict: Pick<Dictionary, "tl" | "periods" | "era" | "lbl" | "rel">;
  events: TLEvent[];
  civs: TLCiv[];
}

export default function Timeline({ lang, dict, events, civs }: Props) {
  const [zi, setZi] = useState(1);
  const [civ, setCiv] = useState("");
  const [sel, setSel] = useState<TLEvent | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const centerYear = useRef<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const ppy = ZOOMS[zi];
  const x = (y: number) => (y - MIN) * ppy;
  const width = (MAX - MIN) * ppy;

  function zoom(delta: number) {
    const next = Math.min(ZOOMS.length - 1, Math.max(0, zi + delta));
    if (next === zi) return;
    const el = scroller.current;
    if (el) centerYear.current = (el.scrollLeft + el.clientWidth / 2) / ppy + MIN;
    setZi(next);
  }
  // keep the same year centered after zooming
  useLayoutEffect(() => {
    const el = scroller.current;
    if (el && centerYear.current !== null) {
      el.scrollLeft = (centerYear.current - MIN) * ppy - el.clientWidth / 2;
      centerYear.current = null;
    }
  }, [ppy]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (sel && !d.open) d.showModal();
    if (!sel && d.open) d.close();
  }, [sel]);

  const shownEvents = useMemo(() => events.filter((e) => !civ || e.civIds.includes(civ)), [events, civ]);
  const shownCivs = useMemo(() => civs.filter((c) => !civ || c.id === civ), [civs, civ]);

  const { lanes, laneCount } = useMemo(() => {
    const right: number[] = [];
    const out = new Map<string, number>();
    for (const e of shownEvents) {
      const px = x(e.year) - 6;
      let lane = right.findIndex((r) => r + 8 <= px);
      if (lane === -1) { lane = right.length; right.push(0); }
      right[lane] = px + LABEL_W;
      out.set(e.id, lane);
    }
    return { lanes: out, laneCount: Math.max(1, right.length) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shownEvents, ppy]);

  const step = TICK_STEPS.find((s) => s * ppy >= 90) ?? 10;
  const ticks: number[] = [];
  for (let y = Math.ceil(MIN / step) * step; y <= MAX; y += step) ticks.push(y);
  const tickLabel = (y: number) => formatYear(y === 0 ? 1 : y, lang, dict.era);
  const btn = "h-10 w-10 rounded-md border border-control bg-surface text-lg hover:border-lapis disabled:opacity-40";

  return (
    <div>
      <div className="flex flex-wrap items-end gap-3">
        <label className="text-sm">
          <span className="mb-1 block text-muted">{dict.tl.civFilter}</span>
          <select value={civ} onChange={(e) => setCiv(e.target.value)} className="h-10 rounded-md border border-control bg-surface px-2">
            <option value="">{dict.tl.allCivs}</option>
            {civs.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </label>
        <div className="ms-auto flex gap-2" role="group" aria-label="Zoom">
          <button type="button" className={btn} onClick={() => zoom(-1)} disabled={zi === 0} aria-label={dict.tl.zoomOut}>−</button>
          <button type="button" className={btn} onClick={() => zoom(1)} disabled={zi === ZOOMS.length - 1} aria-label={dict.tl.zoomIn}>+</button>
        </div>
      </div>

      <div ref={scroller} dir="ltr" className="mt-4 overflow-x-auto rounded-md border border-line bg-surface">
        <div className="relative" style={{ width: width + PAD }}>
          {/* era bands */}
          <div className="relative h-9 border-b border-line">
            {ERAS.map((e, i) => (
              <div key={e.id} title={dict.periods[e.id]} className={`absolute top-0 h-9 overflow-hidden border-e border-line px-2 text-sm leading-9 ${i % 2 ? "bg-bg" : "bg-surface"}`} style={{ left: x(e.from), width: x(e.to) - x(e.from) }}>
                <span className="block truncate">{dict.periods[e.id]}</span>
              </div>
            ))}
          </div>

          {/* tick grid */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 top-9">
            {ticks.map((y) => (
              <div key={y} className="absolute bottom-0 top-0 border-s border-line/70" style={{ left: x(y) }}>
                <span className="absolute start-1 top-1 whitespace-nowrap text-xs text-muted">{tickLabel(y)}</span>
              </div>
            ))}
          </div>

          {/* events */}
          <div className="relative mt-7" style={{ height: laneCount * LANE_H + 8 }} role="group" aria-label={dict.tl.eventsRow}>
            {shownEvents.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => setSel(e)}
                className="absolute flex items-center gap-2 text-start hover:text-lapis"
                style={{ left: x(e.year) - 6, top: (lanes.get(e.id) ?? 0) * LANE_H + 4, maxWidth: LABEL_W }}
                aria-haspopup="dialog"
              >
                <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full border-2 border-ochre bg-surface" />
                <span dir="auto" className="text-sm leading-tight">
                  <span className="block font-medium">{e.title}</span>
                  <span className="block text-xs text-muted">{e.dateText}</span>
                </span>
              </button>
            ))}
          </div>

          {/* civilization spans */}
          <div className="relative mt-3 border-t border-line pb-3 pt-3" role="group" aria-label={dict.tl.civBars}>
            {shownCivs.map((c) => {
              const w = Math.max(x(c.end) - x(c.start), 6);
              const inside = w > 140;
              return (
                <div key={c.id} className="relative h-8">
                  <Link href={`/${lang}/civilizations/${c.slug}/`} className="absolute top-0 flex h-7 items-center rounded-sm bg-lapis px-2 text-sm text-bg hover:opacity-85" style={{ left: x(c.start), width: w }} aria-label={`${c.name}, ${c.period}`}>
                    {inside && <span dir="auto" className="truncate">{c.name}</span>}
                  </Link>
                  {!inside && <span dir="auto" className="pointer-events-none absolute top-1 whitespace-nowrap text-sm" style={{ left: x(c.start) + w + 8 }}>{c.name}</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <dialog
        ref={dialog}
        onClose={() => setSel(null)}
        onClick={(e) => { if (e.target === dialog.current) setSel(null); }}
        aria-labelledby="tl-dialog-title"
        className="w-[92vw] max-w-lg rounded-md border border-line bg-bg p-0 text-ink backdrop:bg-black/50"
      >
        {sel && (
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <h2 id="tl-dialog-title" className="font-display text-2xl font-bold">{sel.title}</h2>
              <button type="button" onClick={() => setSel(null)} className="h-9 shrink-0 rounded-md border border-control px-3 text-sm hover:border-lapis">{dict.tl.close}</button>
            </div>
            <p className="mt-1 font-display text-ochre">{dict.lbl.date}: {sel.dateText}</p>
            <p className="mt-3" lang={sel.fb ? "en" : undefined} dir={sel.fb ? "ltr" : undefined}>{sel.summary}</p>
            <dl className="mt-4 space-y-2 text-sm">
              {([
                [dict.rel.civilizations, "civilizations", sel.civs],
                [dict.rel.people, "people", sel.people],
                [dict.rel.places, "places", sel.places],
                [dict.rel.articles, "articles", sel.articles],
              ] as const).map(([label, route, items]) =>
                items.length ? (
                  <div key={route}>
                    <dt className="text-muted">{label}</dt>
                    <dd className="flex flex-wrap gap-x-3">
                      {items.map((r) => <Link key={r.slug} href={`/${lang}/${route}/${r.slug}/`} className="text-lapis underline underline-offset-4">{r.name}</Link>)}
                    </dd>
                  </div>
                ) : null,
              )}
            </dl>
            <p className="mt-5"><Link href={`/${lang}/events/${sel.slug}/`} className="rounded-md bg-lapis px-4 py-2 text-bg">{dict.tl.viewPage}</Link></p>
          </div>
        )}
      </dialog>
    </div>
  );
}
