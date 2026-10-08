import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGS, isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { articlesAbout, civsOf, eventsAboutPerson, getPerson, loc, people, sourcesFor } from "@/lib/content";
import { absoluteUrl, formatDate, formatLife } from "@/lib/site";
import { JsonLd, breadcrumbLd, detailMetadata } from "@/lib/seo";
import { DetailShell, Facts, Lead, LinkGroup, SourcesBlock } from "@/components/Detail";

type P = { params: Promise<{ lang: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return LANGS.flatMap((lang) => people.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = getPerson(slug);
  if (!p || !isLang(lang)) return {};
  return detailMetadata({ lang, path: `/people/${slug}`, title: p.names[lang], description: loc(p.summary, lang).text, draft: p.status === "draft" });
}

export default async function PersonPage({ params }: P) {
  const { lang: raw, slug } = await params;
  const p = getPerson(slug);
  if (!isLang(raw) || !p) notFound();
  const lang: Lang = raw;
  const dict = getDictionary(lang);
  const s = loc(p.summary, lang);
  const era = dict.era;
  const civs = civsOf(p.civIds);

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Person", name: p.names[lang], description: s.text, url: absoluteUrl(lang, `/people/${slug}`) }} />
      <JsonLd data={breadcrumbLd([{ name: dict.breadcrumb.home, url: absoluteUrl(lang) }, { name: dict.pages.people.title, url: absoluteUrl(lang, "/people") }, { name: p.names[lang] }])} />
      <DetailShell
        dict={dict}
        crumbs={[{ label: dict.breadcrumb.home, href: `/${lang}/` }, { label: dict.pages.people.title, href: `/${lang}/people/` }, { label: p.names[lang] }]}
        title={p.names[lang]}
        meta={formatLife(p.birthYear, p.deathYear, p.approx, lang, era, dict.lbl.unknown)}
        fallback={s.fb}
        draft={p.status === "draft"}
      >
        <Lead text={s.text} fallback={s.fb} />
        <Facts
          rows={[
            { label: dict.lbl.role, value: dict.roles[p.role] },
            { label: dict.lbl.born, value: p.birthYear === null ? dict.lbl.unknown : formatDate(p.birthYear, p.approx, lang, era) },
            { label: dict.lbl.died, value: formatDate(p.deathYear, p.approx, lang, era) },
          ]}
        />
        <LinkGroup title={dict.rel.civilizations} items={civs.map((c) => ({ key: c.id, href: `/${lang}/civilizations/${c.slug}/`, label: c.names[lang] }))} />
        <LinkGroup title={dict.rel.events} items={eventsAboutPerson(p.id).map((e) => ({ key: e.id, href: `/${lang}/events/${e.slug}/`, label: e.names[lang], hint: formatDate(e.year, e.approx, lang, era) }))} />
        <LinkGroup title={dict.rel.articles} items={articlesAbout.person(p.id).map((a) => ({ key: a.id, href: `/${lang}/articles/${a.slug}/`, label: loc(a.title, lang).text }))} />
        <SourcesBlock dict={dict} sources={sourcesFor(p.sourceIds)} />
      </DetailShell>
    </>
  );
}
