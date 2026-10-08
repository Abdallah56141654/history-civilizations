import type { Metadata } from "next";
import Link from "next/link";
import { isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { civilizations, regionKeys } from "@/data/civilizations";
import { articles, loc, people } from "@/lib/content";
import { CardGrid } from "@/components/ListCard";
import { absoluteUrl, alternatesFor, formatLife, formatPeriod } from "@/lib/site";
import SearchBox from "@/components/SearchBox";
import { searchBoxProps } from "@/lib/search-index";
import { OPERATOR_NAME } from "@/lib/legal";
import Chronology from "@/components/Chronology";
import CivilizationCard from "@/components/CivilizationCard";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang as Lang);
  return {
    title: { absolute: `${dict.site.name}: ${dict.site.tagline}` },
    description: dict.hero.subtitle,
    alternates: alternatesFor(lang as Lang),
    openGraph: { url: absoluteUrl(lang as Lang) },
  };
}

export default async function Home({ params }: P) {
  const { lang: raw } = await params;
  if (!isLang(raw)) return null;
  const lang = raw;
  const dict = getDictionary(lang);

  const cards = civilizations.map((c) => ({
    slug: c.slug,
    name: c.names[lang],
    period: formatPeriod(c.startYear, c.endYear, lang, dict.era),
    region: dict.regions[c.region],
    summary: c.summary[lang] ?? c.summary.en ?? "",
  }));

  const featuredPeople = people.slice(0, 6).map((p) => {
    const t = loc(p.summary, lang);
    return { key: p.id, href: `/${lang}/people/${p.slug}/`, title: p.names[lang], meta: formatLife(p.birthYear, p.deathYear, p.approx, lang, dict.era, dict.lbl.unknown), summary: t.text, summaryFallback: t.fb };
  });
  const latestArticles = articles.slice(0, 3).map((a) => {
    const ex = loc(a.excerpt, lang);
    return { key: a.id, href: `/${lang}/articles/${a.slug}/`, title: loc(a.title, lang).text, summary: ex.text, summaryFallback: ex.fb };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: dict.site.name,
    url: absoluteUrl(lang),
    inLanguage: lang,
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl(lang, "/search")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: OPERATOR_NAME || dict.site.name, url: absoluteUrl(lang) }) }} />
      <section className="pb-2 pt-6 sm:pt-12">
        <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl sm:leading-[1.08]">{dict.hero.title}</h1>
        <p className="mt-5 max-w-[60ch] text-lg text-muted">{dict.hero.subtitle}</p>
        <div className="mt-8 max-w-3xl">
          <SearchBox {...searchBoxProps(lang, dict)} button={dict.hero.button} />
        </div>
      </section>

      <Chronology lang={lang} civs={civilizations} title={dict.home.chronologyTitle} intro={dict.home.chronologyIntro} />

      <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
        <Link href={`/${lang}/timeline/`} className="text-lapis underline underline-offset-4">{dict.nav.timeline}</Link>
        <Link href={`/${lang}/map/`} className="text-lapis underline underline-offset-4">{dict.nav.map}</Link>
      </p>

      <p className="mt-4"><Link href={`/${lang}/timeline/`} className="text-lapis underline underline-offset-4">{dict.tl.open}</Link></p>

      <section aria-labelledby="featured" className="mt-14">
        <div className="flex items-end justify-between gap-4">
          <h2 id="featured" className="font-display text-2xl font-bold">{dict.home.featured}</h2>
          <Link href={`/${lang}/civilizations/`} className="text-sm text-lapis underline underline-offset-4">{dict.home.viewAll}</Link>
        </div>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <li key={c.slug} className="relative">
              <CivilizationCard lang={lang} c={c} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="people-h" className="mt-14">
        <div className="flex items-end justify-between gap-4">
          <h2 id="people-h" className="font-display text-2xl font-bold">{dict.rel.people}</h2>
          <Link href={`/${lang}/people/`} className="text-sm text-lapis underline underline-offset-4">{dict.pages.people.title}</Link>
        </div>
        <div className="mt-5"><CardGrid items={featuredPeople} /></div>
      </section>

      <section aria-labelledby="articles-h" className="mt-14">
        <div className="flex items-end justify-between gap-4">
          <h2 id="articles-h" className="font-display text-2xl font-bold">{dict.pages.articles.title}</h2>
          <Link href={`/${lang}/articles/`} className="text-sm text-lapis underline underline-offset-4">{dict.pages.articles.title}</Link>
        </div>
        <div className="mt-5"><CardGrid items={latestArticles} /></div>
      </section>

      <section aria-label={dict.nav.more} className="mt-14">
        <CardGrid
          items={[
            { key: "quiz", href: `/${lang}/quizzes/`, title: dict.quiz.title, summary: dict.quiz.intro },
            { key: "cmp", href: `/${lang}/compare/`, title: dict.cmp.title, summary: dict.cmp.intro },
            { key: "otd", href: `/${lang}/on-this-day/`, title: dict.otd.title, summary: dict.otd.intro },
            { key: "mys", href: `/${lang}/mysteries/`, title: dict.mys.title, summary: dict.mys.intro },
            { key: "arch", href: `/${lang}/archaeology/`, title: dict.arch.title, summary: dict.arch.intro },
            { key: "tech", href: `/${lang}/technology/`, title: dict.tech.title, summary: dict.tech.intro },
            { key: "tree", href: `/${lang}/family-trees/`, title: dict.tree.title, summary: dict.tree.intro },
          ]}
        />
      </section>

      <section aria-labelledby="regions" className="mt-14">
        <div className="flex items-end justify-between gap-4">
          <h2 id="regions" className="font-display text-2xl font-bold">{dict.home.regions}</h2>
          <Link href={`/${lang}/map/`} className="text-sm text-lapis underline underline-offset-4">{dict.map.open}</Link>
        </div>
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {regionKeys.map((r) => {
            const n = civilizations.filter((c) => c.region === r).length;
            return (
              <li key={r}>
                {n > 0 ? (
                  <Link href={`/${lang}/civilizations/?region=${r}`} className="block rounded-md border border-line bg-surface p-4 hover:border-lapis">
                    <span className="font-display text-lg font-bold">{dict.regions[r]}</span>
                    <span className="mt-1 block text-sm text-muted">{dict.civ.count.replace("{n}", String(n))}</span>
                  </Link>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
