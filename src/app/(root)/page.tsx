"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_LANG, LANGS, LANG_META, isLang, matchLang } from "@/i18n/config";

// Order of precedence: saved user choice -> browser languages -> default. IP is never used.
function detectLang() {
  try {
    const saved = localStorage.getItem("lang");
    if (saved && isLang(saved)) return saved;
    const cookie = document.cookie.split("; ").find((c) => c.startsWith("lang="))?.split("=")[1];
    if (cookie && isLang(cookie)) return cookie;
  } catch {}
  for (const tag of navigator.languages ?? [navigator.language]) {
    const match = matchLang(tag);
    if (match) return match;
  }
  return DEFAULT_LANG;
}

export default function RootRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace(`/${detectLang()}/`);
  }, [router]);

  return (
    <main className="mx-auto max-w-page p-8">
      <p className="mb-4 text-muted">History &amp; Civilizations</p>
      <ul className="flex flex-wrap gap-4">
        {LANGS.map((l) => (
          <li key={l}>
            <a className="underline" href={`./${l}/`} hrefLang={LANG_META[l].hreflang}>
              {LANG_META[l].label}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
