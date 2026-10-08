"use client";

import { usePathname, useRouter } from "next/navigation";
import { LANGS, LANG_META, type Lang } from "@/i18n/config";

export default function LanguageSwitcher({ lang, label }: { lang: Lang; label: string }) {
  const pathname = usePathname() || `/${lang}/`;
  const router = useRouter();

  function change(next: Lang) {
    try {
      localStorage.setItem("lang", next);
      document.cookie = `lang=${next}; path=/; max-age=31536000; samesite=lax`;
    } catch {}
    const parts = pathname.split("/");
    parts[1] = next; // ["", "<lang>", ...rest]
    router.push(parts.join("/") + (typeof window !== "undefined" ? window.location.search : ""));
  }

  return (
    <label className="inline-flex items-center">
      <span className="sr-only">{label}</span>
      <select
        value={lang}
        onChange={(e) => change(e.target.value as Lang)}
        className="h-10 rounded-md border border-control bg-surface px-2 text-sm text-ink hover:border-lapis"
      >
        {LANGS.map((l) => (
          <option key={l} value={l} lang={LANG_META[l].hreflang}>
            {LANG_META[l].label}
          </option>
        ))}
      </select>
    </label>
  );
}
