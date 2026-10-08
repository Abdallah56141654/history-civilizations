"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { Lang } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { NO_FILTERS, PERIODS, passesFilters, scoreItem, type Filters } from "@/lib/search";
import { formatYear } from "@/lib/site";
import { useSearchIndex } from "@/lib/use-search-index";
import SearchBox, { type SearchBoxProps } from "./SearchBox";

interface Props {
  lang: Lang;
  labels: Dictionary["search"];
  era: Dictionary["era"];
  typeLabels: Record<string, string>;
  regionLabels: Record<string, string>;
  civs: { id: string; name: string }[];
  box: Omit<SearchBoxProps, "defaultValue" | "size">;
}

const TYPES = ["civilization", "person", "event", "place", "article", "mystery", "artifact", "technology"] as const;

export default function SearchResults({ lang, labels, era, typeLabels, regionLabels, civs, box }: Props) {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const q = (sp.get("q") ?? "").trim();
  const f: Filters = { type: sp.get("type") ?? "", civ: sp.get("civ") ?? "", period: sp.get("period") ?? "", region: sp.get("region") ?? "" };
  const active = Object.values(f).some(Boolean);
  const { docs, failed } = useSearchIndex(lang, true);

  function setParam(key: keyof Filters | "q", value: string) {
    const next = new URLSearchParams(sp.toString());
    if (value) next.set(key, value); else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const scored = useMemo(() => {
    if (!docs) return [];
    if (!q) return docs.map((d) => ({ d, s: 1 }));
    return docs.map((d) => ({ d, s: scoreItem(d, q) })).filter((x) => x.s > 0);
  }, [docs, q]);

  const hits = useMemo(
    () => scored.filter((x) => passesFilters(x.d, f)).sort((a, b) => b.s - a.s || a.d.title.localeCompare(b.d.title, lang)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scored, f.type, f.civ, f.period, f.region, lang],
  );
  const typeCounts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const x of scored) if (passesFilters(x.d, f, "type")) c[x.d.type] = (c[x.d.type] ?? 0) + 1;
    return c;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scored, f.civ, f.period, f.region]);

  const periodLabel = (id: string) => {
    const p = PERIODS.find((x) => x.id === id)!;
    if (p.from === -Infinity) return labels.before.replace("{y}", formatYear(p.to + 1, lang, era));
    if (p.to === Infinity) return labels.after.replace("{y}", formatYear(p.from - 1, lang, era));
    return `${formatYear(p.from, lang, era)} – ${formatYear(p.to === 0 ? 1 : p.to, lang, era)}`;
  };

  const select = "h-10 w-full rounded-md border border-control bg-surface px-2 text-sm";
  const countText = q ? labels.results.replace("{q}", q) : labels.resultsBrowse;

  return (
    <div>
      <SearchBox key={q} {...box} defaultValue={q} />

      <section aria-label={labels.filters} className="mt-6 rounded-md border border-line bg-surface p-4">
        <div role="group" aria-label={labels.typeFilter} className="flex flex-wrap gap-2">
          <button type="button" aria-pressed={!f.type} onClick={() => setParam("type", "")} className={`h-9 rounded-md border px-3 text-sm ${!f.type ? "border-lapis bg-lapis text-bg" : "border-control hover:border-lapis"}`}>
            {labels.all}
          </button>
          {TYPES.map((t) => (
            <button key={t} type="button" aria-pressed={f.type === t} onClick={() => setParam("type", f.type === t ? "" : t)} className={`h-9 rounded-md border px-3 text-sm ${f.type === t ? "border-lapis bg-lapis text-bg" : "border-control hover:border-lapis"}`}>
              {typeLabels[t]} <span className="opacity-70">({typeCounts[t] ?? 0})</span>
            </button>
          ))}
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <label className="text-sm">
            <span className="mb-1 block text-muted">{labels.civFilter}</span>
            <select value={f.civ} onChange={(e) => setParam("civ", e.target.value)} className={select}>
              <option value="">{labels.all}</option>
              {civs.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-muted">{labels.periodFilter}</span>
            <select value={f.period} onChange={(e) => setParam("period", e.target.value)} className={select}>
              <option value="">{labels.all}</option>
              {PERIODS.map((p) => <option key={p.id} value={p.id}>{periodLabel(p.id)}</option>)}
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-muted">{labels.regionFilter}</span>
            <select value={f.region} onChange={(e) => setParam("region", e.target.value)} className={select}>
              <option value="">{labels.all}</option>
              {Object.entries(regionLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </label>
        </div>
        {active && (
          <button type="button" onClick={() => { const next = new URLSearchParams(); if (q) next.set("q", q); router.replace(next.toString() ? `${pathname}?${next}` : pathname, { scroll: false }); }} className="mt-3 text-sm text-lapis underline underline-offset-4">
            {labels.reset}
          </button>
        )}
      </section>

      <div className="mt-6" aria-live="polite">
        {failed && <p>{labels.none.replace("{q}", q)}</p>}
        {!failed && !q && !active && <p className="text-muted">{labels.hint}</p>}
        {!failed && docs && (q || active) && hits.length === 0 && <p>{q ? labels.none.replace("{q}", q) : labels.noneFilters}</p>}
        {!failed && docs && hits.length > 0 && (q || active) && (
          <>
            <p className="text-sm text-muted">{countText.replace("{n}", String(hits.length))}</p>
            <ul className="mt-4 space-y-3">
              {hits.map(({ d }) => (
                <li key={d.id} className="relative rounded-md border border-line bg-surface p-4 hover:border-lapis">
                  <p className="text-xs text-muted">{typeLabels[d.type]}{d.meta ? ` · ${d.meta}` : ""}</p>
                  <h2 className="font-display text-xl font-bold">
                    <Link href={`/${lang}${d.path}/`} className="after:absolute after:inset-0">{d.title}</Link>
                  </h2>
                  <p className="clamp-3 mt-1 text-sm text-muted" lang={d.summaryFb ? "en" : undefined} dir={d.summaryFb ? "ltr" : undefined}>{d.summary}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
