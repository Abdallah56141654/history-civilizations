"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { Lang } from "@/i18n/config";
import { scoreItem } from "@/lib/search";
import { useSearchIndex } from "@/lib/use-search-index";

export interface SearchBoxProps {
  lang: Lang;
  placeholder: string;
  button: string;
  defaultValue?: string;
  size?: "large" | "compact";
  popular?: string[];
  labels: { recent: string; popular: string; clear: string; suggestions: string; types: Record<string, string> };
}

interface Option {
  key: string;
  label: string;
  sub?: string;
  path?: string; // go to a page
  query?: string; // run a search
}

const RECENT_KEY = "recentSearches";
const readRecent = (): string[] => {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"); } catch { return []; }
};
const writeRecent = (list: string[]) => {
  try { localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, 5))); } catch {}
};

export default function SearchBox({ lang, placeholder, button, defaultValue = "", size = "large", popular = [], labels }: SearchBoxProps) {
  const router = useRouter();
  const uid = useId();
  const listId = `${uid}-list`;
  const wrap = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [recent, setRecent] = useState<string[]>([]);
  const [wanted, setWanted] = useState(false);
  const { docs } = useSearchIndex(lang, wanted);
  const large = size === "large";
  const term = q.trim();

  useEffect(() => setRecent(readRecent()), []);

  const options: Option[] = useMemo(() => {
    if (term) {
      if (!docs) return [];
      return docs
        .map((d) => ({ d, s: scoreItem(d, term) }))
        .filter((x) => x.s > 0)
        .sort((a, b) => b.s - a.s)
        .slice(0, 6)
        .map(({ d }) => ({ key: d.id, label: d.title, sub: labels.types[d.type], path: d.path }));
    }
    return [
      ...recent.map((r) => ({ key: `r-${r}`, label: r, sub: labels.recent, query: r })),
      ...popular.map((r) => ({ key: `p-${r}`, label: r, sub: labels.popular, query: r })),
    ];
  }, [term, docs, recent, popular, labels]);

  function remember(value: string) {
    const next = [value, ...readRecent().filter((r) => r !== value)];
    writeRecent(next);
    setRecent(next.slice(0, 5));
  }

  function runSearch(value: string) {
    const v = value.trim();
    if (!v) return;
    remember(v);
    setOpen(false);
    router.push(`/${lang}/search/?q=${encodeURIComponent(v)}`);
  }

  function choose(o: Option) {
    setOpen(false);
    if (o.path) {
      if (term) remember(term);
      router.push(`/${lang}${o.path}/`);
    } else if (o.query) {
      setQ(o.query);
      runSearch(o.query);
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => (options.length ? (a + 1) % options.length : -1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (options.length ? (a <= 0 ? options.length - 1 : a - 1) : -1));
    } else if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
    } else if (e.key === "Enter" && open && active >= 0 && options[active]) {
      e.preventDefault();
      choose(options[active]);
    }
  }

  const showList = open && options.length > 0;
  const showClear = open && !term && recent.length > 0;

  return (
    <div
      ref={wrap}
      className="relative w-full"
      onBlur={(e) => {
        if (!wrap.current?.contains(e.relatedTarget as Node)) { setOpen(false); setActive(-1); }
      }}
    >
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          runSearch(q);
        }}
        className="flex w-full gap-2"
      >
        <input
          type="search"
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${uid}-opt-${active}` : undefined}
          autoComplete="off"
          value={q}
          onChange={(e) => { setQ(e.target.value); setActive(-1); setOpen(true); setWanted(true); }}
          onFocus={() => { setWanted(true); setOpen(true); }}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-label={placeholder}
          className={`min-w-0 flex-1 rounded-md border border-control bg-surface text-ink placeholder:text-muted ${large ? "h-14 px-4 text-lg" : "h-10 px-3 text-sm"}`}
        />
        <button type="submit" className={`rounded-md bg-lapis font-medium text-bg hover:opacity-90 ${large ? "h-14 px-6 text-lg" : "h-10 px-4 text-sm"}`}>
          {button}
        </button>
      </form>

      {showList && (
        <div className="absolute inset-x-0 top-full z-50 mt-1 overflow-hidden rounded-md border border-line bg-surface shadow-lg">
          <ul id={listId} role="listbox" aria-label={labels.suggestions} className="max-h-80 overflow-y-auto">
            {options.map((o, i) => (
              <li
                key={o.key}
                id={`${uid}-opt-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(o)}
                onMouseEnter={() => setActive(i)}
                className={`flex cursor-pointer items-baseline justify-between gap-3 px-4 py-2 ${i === active ? "bg-bg" : ""}`}
              >
                <span dir="auto" className="truncate">{o.label}</span>
                {o.sub && <span className="shrink-0 text-xs text-muted">{o.sub}</span>}
              </li>
            ))}
          </ul>
          {showClear && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => { writeRecent([]); setRecent([]); }}
              className="w-full border-t border-control px-4 py-2 text-start text-sm text-lapis"
            >
              {labels.clear}: {labels.recent}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
