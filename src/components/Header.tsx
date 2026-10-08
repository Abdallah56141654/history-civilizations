import Link from "next/link";
import type { Lang } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileNav from "./MobileNav";
import NavMore from "./NavMore";
import SearchBox from "./SearchBox";
import { searchBoxProps } from "@/lib/search-index";

export default function Header({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const items = [
    { href: `/${lang}/`, label: dict.nav.home },
    { href: `/${lang}/civilizations/`, label: dict.nav.civilizations },
    { href: `/${lang}/people/`, label: dict.nav.people },
    { href: `/${lang}/events/`, label: dict.nav.events },
    { href: `/${lang}/places/`, label: dict.nav.places },
    { href: `/${lang}/articles/`, label: dict.nav.articles },
    { href: `/${lang}/timeline/`, label: dict.nav.timeline },
    { href: `/${lang}/map/`, label: dict.nav.map },
    { href: `/${lang}/quizzes/`, label: dict.nav.quizzes },
    { href: `/${lang}/compare/`, label: dict.nav.compare },
    { href: `/${lang}/on-this-day/`, label: dict.nav.onThisDay },
    { href: `/${lang}/mysteries/`, label: dict.nav.mysteries },
    { href: `/${lang}/archaeology/`, label: dict.nav.archaeology },
    { href: `/${lang}/technology/`, label: dict.nav.technology },
    { href: `/${lang}/family-trees/`, label: dict.nav.familyTrees },
    { href: `/${lang}/search/`, label: dict.nav.search },
    { href: `/${lang}/about/`, label: dict.nav.about },
  ];
  const moreHrefs = ["/quizzes/", "/compare/", "/on-this-day/", "/mysteries/", "/archaeology/", "/technology/", "/family-trees/", "/about/"];
  const isMore = (h: string) => moreHrefs.some((m) => h.endsWith(m));
  const desktop = items.filter((i) => !isMore(i.href) && !i.href.endsWith("/search/") && !i.href.endsWith(`/${lang}/`));
  const more = items.filter((i) => isMore(i.href));
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <div className="relative mx-auto flex max-w-page items-center gap-3 px-4 py-2">
        <Link href={`/${lang}/`} className="me-2 font-display text-xl font-bold leading-tight">
          {dict.site.name}
        </Link>
        <nav aria-label={dict.nav.primary} className="hidden items-center gap-4 xl:flex">
          {desktop.map((i) => (
            <Link key={i.href} href={i.href} className="text-sm hover:text-lapis">
              {i.label}
            </Link>
          ))}
          <NavMore label={dict.nav.more} items={more} />
        </nav>
        <div className="ms-auto hidden w-56 2xl:block">
          <SearchBox {...searchBoxProps(lang, dict)} placeholder={dict.nav.search} size="compact" />
        </div>
        <div className="ms-auto flex items-center gap-2 22xl:ms-0">
          <Link href={`/${lang}/search/`} className="grid h-10 w-10 place-items-center rounded-md border border-line 2xl:hidden" aria-label={dict.nav.search}>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4-4" />
            </svg>
          </Link>
          <LanguageSwitcher lang={lang} label={dict.lang.label} />
          <ThemeToggle label={dict.theme.toggle} />
          <MobileNav items={items} menuLabel={dict.nav.menu} />
        </div>
      </div>
    </header>
  );
}
