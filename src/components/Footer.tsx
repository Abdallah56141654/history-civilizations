import Link from "next/link";
import { LANGS, LANG_META, type Lang } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { GA_ID } from "@/lib/legal";
import CookieSettings from "./CookieSettings";

export default function Footer({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto grid max-w-page gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold">{dict.site.name}</p>
          <p className="mt-2 text-sm text-muted">{dict.site.tagline}</p>
        </div>
        <div>
          <h2 className="font-display text-base font-bold">{dict.footer.explore}</h2>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link href={`/${lang}/civilizations/`} className="hover:text-lapis">{dict.nav.civilizations}</Link></li>
            <li><Link href={`/${lang}/people/`} className="hover:text-lapis">{dict.nav.people}</Link></li>
            <li><Link href={`/${lang}/events/`} className="hover:text-lapis">{dict.nav.events}</Link></li>
            <li><Link href={`/${lang}/places/`} className="hover:text-lapis">{dict.nav.places}</Link></li>
            <li><Link href={`/${lang}/articles/`} className="hover:text-lapis">{dict.nav.articles}</Link></li>
            <li><Link href={`/${lang}/timeline/`} className="hover:text-lapis">{dict.nav.timeline}</Link></li>
            <li><Link href={`/${lang}/map/`} className="hover:text-lapis">{dict.nav.map}</Link></li>
            <li><Link href={`/${lang}/quizzes/`} className="hover:text-lapis">{dict.nav.quizzes}</Link></li>
            <li><Link href={`/${lang}/compare/`} className="hover:text-lapis">{dict.nav.compare}</Link></li>
            <li><Link href={`/${lang}/on-this-day/`} className="hover:text-lapis">{dict.nav.onThisDay}</Link></li>
            <li><Link href={`/${lang}/mysteries/`} className="hover:text-lapis">{dict.nav.mysteries}</Link></li>
            <li><Link href={`/${lang}/archaeology/`} className="hover:text-lapis">{dict.nav.archaeology}</Link></li>
            <li><Link href={`/${lang}/technology/`} className="hover:text-lapis">{dict.nav.technology}</Link></li>
            <li><Link href={`/${lang}/family-trees/`} className="hover:text-lapis">{dict.nav.familyTrees}</Link></li>
            <li><Link href={`/${lang}/search/`} className="hover:text-lapis">{dict.nav.search}</Link></li>
            <li><Link href={`/${lang}/about/`} className="hover:text-lapis">{dict.nav.about}</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-base font-bold">{dict.footer.languages}</h2>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {LANGS.map((l) => (
              <li key={l}>
                <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/${l}/`} lang={LANG_META[l].hreflang} hrefLang={LANG_META[l].hreflang} className="hover:text-lapis">
                  {LANG_META[l].label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <nav aria-label={dict.legalNav.privacy} className="mx-auto max-w-page px-4 pb-4">
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {(["contact", "authors", "sources", "privacy", "terms", "disclaimer", "cookies"] as const).map((k) => (
            <li key={k}><Link href={`/${lang}/${k}/`} className="hover:text-lapis">{dict.legalNav[k]}</Link></li>
          ))}
          {GA_ID && <li><CookieSettings label={dict.consent.settings} /></li>}
        </ul>
      </nav>
      <p className="mx-auto max-w-page px-4 pb-8 text-xs text-muted">{dict.footer.disclaimer}</p>
    </footer>
  );
}
