"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/i18n/config";
import CivilizationCard, { type CardData } from "./CivilizationCard";

interface Props {
  lang: Lang;
  items: (CardData & { regionKey: string })[];
  regions: { key: string; label: string }[];
  allLabel: string;
  countTemplate: string;
}

export default function CivilizationsBrowser({ lang, items, regions, allLabel, countTemplate }: Props) {
  const [region, setRegion] = useState("all");

  // Deep link from the home page: /civilizations/?region=africa
  useEffect(() => {
    const r = new URLSearchParams(window.location.search).get("region");
    if (r && regions.some((x) => x.key === r)) setRegion(r);
  }, [regions]);

  const visible = region === "all" ? items : items.filter((i) => i.regionKey === region);
  const chips = [{ key: "all", label: allLabel }, ...regions];

  return (
    <div>
      <div role="group" className="flex flex-wrap gap-2">
        {chips.map((c) => (
          <button
            key={c.key}
            type="button"
            aria-pressed={region === c.key}
            onClick={() => setRegion(c.key)}
            className={`h-10 rounded-md border px-4 text-sm ${region === c.key ? "border-lapis bg-lapis text-bg" : "border-control bg-surface hover:border-lapis"}`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted" aria-live="polite">{countTemplate.replace("{n}", String(visible.length))}</p>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((c) => (
          <li key={c.slug} className="relative">
            <CivilizationCard lang={lang} c={c} />
          </li>
        ))}
      </ul>
    </div>
  );
}
