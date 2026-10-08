"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/i18n/config";
import type { SearchDoc } from "./types";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
const cache = new Map<string, Promise<SearchDoc[]>>();

export function loadIndex(lang: Lang): Promise<SearchDoc[]> {
  let p = cache.get(lang);
  if (!p) {
    p = fetch(`${BASE}/${lang}/search-index.json`).then((r) => {
      if (!r.ok) throw new Error(`search index ${r.status}`);
      return r.json() as Promise<SearchDoc[]>;
    });
    p.catch(() => cache.delete(lang)); // allow retry after a failure
    cache.set(lang, p);
  }
  return p;
}

/** Loads the index once `enabled` becomes true (e.g. on first focus). */
export function useSearchIndex(lang: Lang, enabled: boolean) {
  const [docs, setDocs] = useState<SearchDoc[] | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    loadIndex(lang).then((d) => alive && setDocs(d)).catch(() => alive && setFailed(true));
    return () => { alive = false; };
  }, [lang, enabled]);
  return { docs, failed };
}
