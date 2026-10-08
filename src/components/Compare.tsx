"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Lang } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

export interface CompareCiv {
  slug: string;
  name: string;
  period: string;
  region: string;
  rows: Record<string, { text: string; fb: boolean }>;
}

interface Props {
  lang: Lang;
  dict: Dictionary["cmp"];
  civs: CompareCiv[];
  dims: string[]; // order of the text rows
  pairs: [string, string][]; // quick comparisons (slugs)
  fallbackNote: string;
}

export default function Compare({ lang, dict, civs, dims, pairs, fallbackNote }: Props) {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const bySlug = (s: string | null) => civs.find((c) => c.slug === s);
  const a = bySlug(sp.get("a")) ?? civs[0];
  const b = bySlug(sp.get("b")) ?? civs.find((c) => c.slug !== a.slug) ?? civs[0];

  function set(key: "a" | "b", value: string) {
    const next = new URLSearchParams({ a: a.slug, b: b.slug, [key]: value });
    router.replace(`${pathname}?${next}`, { scroll: false });
  }
  const select = "h-10 w-full rounded-md border border-control bg-surface px-2";
  const anyFallback = dims.some((d) => a.rows[d]?.fb || b.rows[d]?.fb);
  const labelOf = (d: string) => (dict.dims as Record<string, string>)[d] ?? d;

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1 block text-muted">{dict.civA}</span>
          <select value={a.slug} onChange={(e) => set("a", e.target.value)} className={select}>
            {civs.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-muted">{dict.civB}</span>
          <select value={b.slug} onChange={(e) => set("b", e.target.value)} className={select}>
            {civs.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </label>
      </div>

      <p className="mt-4 text-sm text-muted">{dict.quick}:{" "}
        {pairs.map(([x, y], i) => {
          const cx = bySlug(x), cy = bySlug(y);
          if (!cx || !cy) return null;
          return (
            <span key={x + y}>
              {i > 0 && " · "}
              <Link href={`/${lang}/compare/?a=${x}&b=${y}`} className="text-lapis underline underline-offset-4">{cx.name} / {cy.name}</Link>
            </span>
          );
        })}
      </p>

      {anyFallback && <p role="note" className="mt-4 rounded-md border border-line bg-surface p-3 text-sm">{fallbackNote}</p>}

      <div className="mt-6 overflow-x-auto rounded-md border border-line bg-surface">
        <table className="w-full min-w-[34rem] border-collapse text-start">
          <caption className="sr-only">{a.name} / {b.name}</caption>
          <thead>
            <tr className="border-b border-line">
              <td className="w-1/5 p-3" />
              <th scope="col" className="p-3 text-start font-display text-xl"><Link href={`/${lang}/civilizations/${a.slug}/`} className="hover:text-lapis">{a.name}</Link></th>
              <th scope="col" className="p-3 text-start font-display text-xl"><Link href={`/${lang}/civilizations/${b.slug}/`} className="hover:text-lapis">{b.name}</Link></th>
            </tr>
          </thead>
          <tbody>
            {[
              { key: "period", av: a.period, bv: b.period },
              { key: "region", av: a.region, bv: b.region },
            ].map((r) => (
              <tr key={r.key} className="border-b border-line align-top">
                <th scope="row" className="p-3 text-start text-sm font-medium text-muted">{labelOf(r.key)}</th>
                <td className="p-3">{r.av}</td>
                <td className="p-3">{r.bv}</td>
              </tr>
            ))}
            {dims.map((d) => (
              <tr key={d} className="border-b border-line align-top last:border-0">
                <th scope="row" className="p-3 text-start text-sm font-medium text-muted">{labelOf(d)}</th>
                {[a, b].map((c) => (
                  <td key={c.slug} className="p-3" lang={c.rows[d]?.fb ? "en" : undefined} dir={c.rows[d]?.fb ? "ltr" : undefined}>{c.rows[d]?.text}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 max-w-[68ch] text-sm text-muted">{dict.note}</p>
    </div>
  );
}
