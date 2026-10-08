"use client";

import { useEffect, useMemo, useState } from "react";
import type { Lang } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { CardGrid, type ListItem } from "./ListCard";

export interface OtdEntry { month: number; day: number; item: ListItem }

const intlLocale = (lang: Lang) => (lang === "zh" ? "zh-CN" : lang);
const daysIn = (m: number) => new Date(Date.UTC(2024, m, 0)).getUTCDate(); // 2024 is a leap year, so Feb has 29

export default function OnThisDay({ lang, dict, entries }: { lang: Lang; dict: Dictionary["otd"]; entries: OtdEntry[] }) {
  const [md, setMd] = useState<{ m: number; d: number } | null>(null);
  const [isToday, setIsToday] = useState(true);

  // "Today" is the visitor's local date, so it is read in the browser, not at build time.
  useEffect(() => {
    const t = new Date();
    setMd({ m: t.getMonth() + 1, d: t.getDate() });
  }, []);

  const fmt = useMemo(() => new Intl.DateTimeFormat(intlLocale(lang), { month: "long", day: "numeric", timeZone: "UTC" }), [lang]);
  const monthFmt = useMemo(() => new Intl.DateTimeFormat(intlLocale(lang), { month: "long", timeZone: "UTC" }), [lang]);

  if (!md) return <p className="text-muted" aria-busy="true">…</p>;

  const dayOfYear = (m: number, d: number) => Math.round((Date.UTC(2024, m - 1, d) - Date.UTC(2024, 0, 1)) / 86400000);
  const here = dayOfYear(md.m, md.d);
  const matches = entries.filter((e) => e.month === md.m && e.day === md.d);
  const upcoming = entries
    .filter((e) => !(e.month === md.m && e.day === md.d))
    .map((e) => ({ e, delta: (dayOfYear(e.month, e.day) - here + 366) % 366 }))
    .sort((a, b) => a.delta - b.delta)
    .slice(0, 3)
    .map((x) => x.e);
  const label = (e: OtdEntry) => ({ ...e.item, tag: fmt.format(new Date(Date.UTC(2024, e.month - 1, e.day))) });
  const select = "h-10 rounded-md border border-control bg-surface px-2";

  return (
    <div>
      <div className="flex flex-wrap items-end gap-3">
        <label className="text-sm">
          <span className="mb-1 block text-muted">{dict.month}</span>
          <select value={md.m} onChange={(e) => { const m = Number(e.target.value); setMd({ m, d: Math.min(md.d, daysIn(m)) }); setIsToday(false); }} className={select}>
            {Array.from({ length: 12 }, (_, i) => <option key={i} value={i + 1}>{monthFmt.format(new Date(Date.UTC(2024, i, 1)))}</option>)}
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-muted">{dict.day}</span>
          <select value={md.d} onChange={(e) => { setMd({ m: md.m, d: Number(e.target.value) }); setIsToday(false); }} className={select}>
            {Array.from({ length: daysIn(md.m) }, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
          </select>
        </label>
        {!isToday && (
          <button type="button" onClick={() => { const t = new Date(); setMd({ m: t.getMonth() + 1, d: t.getDate() }); setIsToday(true); }} className="h-10 rounded-md border border-control px-4 text-sm hover:border-lapis">{dict.today}</button>
        )}
      </div>

      <h2 className="mt-8 font-display text-2xl font-bold">{isToday ? `${dict.today}: ` : ""}{fmt.format(new Date(Date.UTC(2024, md.m - 1, md.d)))}</h2>
      <div className="mt-4" aria-live="polite">
        {matches.length > 0 ? <CardGrid items={matches.map(label)} /> : <p className="text-muted">{dict.none}</p>}
      </div>

      {upcoming.length > 0 && (
        <>
          <h2 className="mt-10 font-display text-2xl font-bold">{dict.upcoming}</h2>
          <div className="mt-4"><CardGrid items={upcoming.map(label)} /></div>
        </>
      )}
      <p className="mt-8 max-w-[68ch] text-sm text-muted">{dict.note}</p>
    </div>
  );
}
