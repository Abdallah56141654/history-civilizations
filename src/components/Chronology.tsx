import Link from "next/link";
import type { Civilization } from "@/lib/types";
import type { Lang } from "@/i18n/config";

const MIN = -3500;
const MAX = 1950;
const pct = (y: number) => ((y - MIN) / (MAX - MIN)) * 100;

// Data-driven: every civilization in the dataset becomes a bar. Direction is always left-to-right (time axis).
export default function Chronology({ lang, civs, title, intro }: { lang: Lang; civs: Civilization[]; title: string; intro: string }) {
  const sorted = [...civs].sort((a, b) => a.startYear - b.startYear);
  const ticks = [-3000, -2000, -1000, 0, 1000, 1900];
  return (
    <section aria-labelledby="chrono-title" className="mt-14">
      <h2 id="chrono-title" className="font-display text-2xl font-bold">{title}</h2>
      <p className="mt-1 max-w-[68ch] text-muted">{intro}</p>
      <div className="mt-6 overflow-x-auto rounded-md border border-line bg-surface">
        <div dir="ltr" className="relative min-w-[680px] px-4 pb-4 pt-8">
          {ticks.map((t) => (
            <div key={t} className="absolute bottom-0 top-0 border-s border-line text-xs text-muted" style={{ left: `calc(1rem + (100% - 2rem) * ${pct(t) / 100})` }}>
              <span className="absolute start-1 top-1 whitespace-nowrap">{t === 0 ? "0" : Math.abs(t)}</span>
            </div>
          ))}
          <ul className="relative space-y-2">
            {sorted.map((c) => {
              const left = pct(c.startYear);
              const width = Math.max(pct(c.endYear) - left, 2.5);
              const labelInside = width > 24;
              return (
                <li key={c.id} className="relative h-9">
                  <Link
                    href={`/${lang}/civilizations/${c.slug}/`}
                    className={`absolute top-0 flex h-9 items-center rounded-sm bg-lapis text-sm font-medium text-bg hover:opacity-85 ${labelInside ? "px-2" : ""}`}
                    style={{ left: `${left}%`, width: `${width}%` }}
                    aria-label={c.names[lang]}
                  >
                    {labelInside && <span dir="auto" className="truncate">{c.names[lang]}</span>}
                  </Link>
                  {!labelInside && (
                    <span dir="auto" className="pointer-events-none absolute top-1.5 whitespace-nowrap text-sm" style={{ left: `calc(${left + width}% + 0.5rem)` }}>
                      {c.names[lang]}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
