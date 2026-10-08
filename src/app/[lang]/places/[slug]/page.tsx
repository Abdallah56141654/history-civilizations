import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGS, isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { articlesAbout, civsOf, eventsAtPlace, getPlace, loc, places, sourcesFor } from "@/lib/content";
import { absoluteUrl, formatDate } from "@/lib/site";
import { JsonLd, breadcrumbLd, detailMetadata } from "@/lib/seo";
import { DetailShell, Facts, Lead, LinkGroup, SourcesBlock } from "@/components/Detail";

type P = { params: Promise<{ lang: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return LANGS.flatMap((lang) => places.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = getPlace(slug);
  if (!p || !isLang(lang)) return {};
  return detailMetadata({ lang, path: `/places/${slug}`, title: p.names[lang], description: loc(p.summary, lang).text, draft: p.status === "draft" });
}

export default async function PlacePage({ params }: P) {
  const { lang: raw, slug } = await params;
  const p = getPlace(slug);
  if (!isLang(raw) || !p) notFound();
  const lang: Lang = raw;
  const dict = getDictionary(lang);
  const s = loc(p.summary, lang);
  const coords = `${p.lat.toFixed(4)}°, ${p.lng.toFixed(4)}°`;
  const osm = `https://www.openstreetmap.org/?mlat=${p.lat}&mlon=${p.lng}#map=11/${p.lat}/${p.lng}`;

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Place", name: p.names[lang], description: s.text, geo: { "@type": "GeoCoordinates", latitude: p.lat, longitude: p.lng } }} />
      <JsonLd data={breadcrumbLd([{ name: dict.breadcrumb.home, url: absoluteUrl(lang) }, { name: dict.pages.places.title, url: absoluteUrl(lang, "/places") }, { name: p.names[lang] }])} />
      <DetailShell
        dict={dict}
        crumbs={[{ label: dict.breadcrumb.home, href: `/${lang}/` }, { label: dict.pages.places.title, href: `/${lang}/places/` }, { label: p.names[lang] }]}
        title={p.names[lang]}
        fallback={s.fb}
        draft={p.status === "draft"}
      >
        <Lead text={s.text} fallback={s.fb} />
        <Facts rows={[{ label: dict.lbl.coordinates, value: coords }]} />
        <p className="mt-3">
          <a href={osm} target="_blank" rel="noopener noreferrer" className="text-lapis underline underline-offset-4">{dict.lbl.openMap}</a>
        </p>
        <LinkGroup title={dict.rel.civilizations} items={civsOf(p.civIds).map((c) => ({ key: c.id, href: `/${lang}/civilizations/${c.slug}/`, label: c.names[lang] }))} />
        <LinkGroup title={dict.rel.events} items={eventsAtPlace(p.id).map((e) => ({ key: e.id, href: `/${lang}/events/${e.slug}/`, label: e.names[lang], hint: formatDate(e.year, e.approx, lang, dict.era) }))} />
        <LinkGroup title={dict.rel.articles} items={articlesAbout.place(p.id).map((a) => ({ key: a.id, href: `/${lang}/articles/${a.slug}/`, label: loc(a.title, lang).text }))} />
        <SourcesBlock dict={dict} sources={sourcesFor(p.sourceIds)} />
      </DetailShell>
    </>
  );
}
