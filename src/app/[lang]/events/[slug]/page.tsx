import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGS, isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { articlesAbout, civsOf, events, getEvent, loc, peopleOf, placesOf, sourcesFor } from "@/lib/content";
import { absoluteUrl, formatDate } from "@/lib/site";
import { JsonLd, breadcrumbLd, detailMetadata } from "@/lib/seo";
import { DetailShell, Facts, Lead, LinkGroup, SourcesBlock } from "@/components/Detail";

type P = { params: Promise<{ lang: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return LANGS.flatMap((lang) => events.map((e) => ({ lang, slug: e.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const e = getEvent(slug);
  if (!e || !isLang(lang)) return {};
  return detailMetadata({ lang, path: `/events/${slug}`, title: e.names[lang], description: loc(e.summary, lang).text, draft: e.status === "draft" });
}

export default async function EventPage({ params }: P) {
  const { lang: raw, slug } = await params;
  const e = getEvent(slug);
  if (!isLang(raw) || !e) notFound();
  const lang: Lang = raw;
  const dict = getDictionary(lang);
  const s = loc(e.summary, lang);
  const date = formatDate(e.year, e.approx, lang, dict.era);

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: dict.breadcrumb.home, url: absoluteUrl(lang) }, { name: dict.pages.events.title, url: absoluteUrl(lang, "/events") }, { name: e.names[lang] }])} />
      <DetailShell
        dict={dict}
        crumbs={[{ label: dict.breadcrumb.home, href: `/${lang}/` }, { label: dict.pages.events.title, href: `/${lang}/events/` }, { label: e.names[lang] }]}
        title={e.names[lang]}
        meta={date}
        fallback={s.fb}
        draft={e.status === "draft"}
      >
        <Lead text={s.text} fallback={s.fb} />
        <Facts rows={[{ label: dict.lbl.date, value: date }]} />
        <LinkGroup title={dict.rel.civilizations} items={civsOf(e.civIds).map((c) => ({ key: c.id, href: `/${lang}/civilizations/${c.slug}/`, label: c.names[lang] }))} />
        <LinkGroup title={dict.rel.people} items={peopleOf(e.personIds).map((p) => ({ key: p.id, href: `/${lang}/people/${p.slug}/`, label: p.names[lang] }))} />
        <LinkGroup title={dict.rel.places} items={placesOf(e.placeIds).map((p) => ({ key: p.id, href: `/${lang}/places/${p.slug}/`, label: p.names[lang] }))} />
        <LinkGroup title={dict.rel.articles} items={articlesAbout.event(e.id).map((a) => ({ key: a.id, href: `/${lang}/articles/${a.slug}/`, label: loc(a.title, lang).text }))} />
        <SourcesBlock dict={dict} sources={sourcesFor(e.sourceIds)} />
      </DetailShell>
    </>
  );
}
