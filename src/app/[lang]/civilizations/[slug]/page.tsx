import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGS, isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { civilizations, forCiv, loc, sourcesFor } from "@/lib/content";
import { getCivilization } from "@/data/civilizations";
import { absoluteUrl, formatDate, formatPeriod } from "@/lib/site";
import { JsonLd, breadcrumbLd, detailMetadata } from "@/lib/seo";
import { DetailShell, Facts, Lead, LinkGroup, SourcesBlock } from "@/components/Detail";

type P = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return LANGS.flatMap((lang) => civilizations.map((c) => ({ lang, slug: c.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const civ = getCivilization(slug);
  if (!civ || !isLang(lang)) return {};
  return detailMetadata({ lang, path: `/civilizations/${slug}`, title: civ.names[lang], description: loc(civ.summary, lang).text, draft: civ.status === "draft" });
}

export default async function CivilizationPage({ params }: P) {
  const { lang: raw, slug } = await params;
  const civ = getCivilization(slug);
  if (!isLang(raw) || !civ) notFound();
  const lang: Lang = raw;
  const dict = getDictionary(lang);
  const era = dict.era;
  const s = loc(civ.summary, lang);
  const period = formatPeriod(civ.startYear, civ.endYear, lang, era);
  const related = civilizations.filter((c) => c.region === civ.region && c.id !== civ.id);

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: dict.breadcrumb.home, url: absoluteUrl(lang) }, { name: dict.civ.title, url: absoluteUrl(lang, "/civilizations") }, { name: civ.names[lang] }])} />
      <DetailShell
        dict={dict}
        crumbs={[{ label: dict.breadcrumb.home, href: `/${lang}/` }, { label: dict.civ.title, href: `/${lang}/civilizations/` }, { label: civ.names[lang] }]}
        title={civ.names[lang]}
        meta={period}
        fallback={s.fb}
        draft={civ.status === "draft"}
      >
        <Lead text={s.text} fallback={s.fb} />
        <Facts rows={[{ label: dict.civ.period, value: period }, { label: dict.civ.region, value: dict.regions[civ.region] }]} />
        <LinkGroup title={dict.rel.timeline} items={forCiv.events(civ.id).map((e) => ({ key: e.id, href: `/${lang}/events/${e.slug}/`, label: e.names[lang], hint: formatDate(e.year, e.approx, lang, era) }))} />
        <LinkGroup title={dict.rel.people} items={forCiv.people(civ.id).map((p) => ({ key: p.id, href: `/${lang}/people/${p.slug}/`, label: p.names[lang] }))} />
        <LinkGroup title={dict.rel.places} items={forCiv.places(civ.id).map((p) => ({ key: p.id, href: `/${lang}/places/${p.slug}/`, label: p.names[lang] }))} />
        <LinkGroup title={dict.rel.articles} items={forCiv.articles(civ.id).map((a) => ({ key: a.id, href: `/${lang}/articles/${a.slug}/`, label: loc(a.title, lang).text }))} />
        <LinkGroup title={dict.arch.artifacts} items={forCiv.artifacts(civ.id).map((a) => ({ key: a.id, href: `/${lang}/artifacts/${a.slug}/`, label: a.names[lang] }))} />
        <LinkGroup title={dict.tech.title} items={forCiv.technologies(civ.id).map((t) => ({ key: t.id, href: `/${lang}/technology/${t.slug}/`, label: t.names[lang] }))} />
        <LinkGroup title={dict.mys.title} items={forCiv.mysteries(civ.id).map((m) => ({ key: m.id, href: `/${lang}/mysteries/${m.slug}/`, label: m.names[lang] }))} />
        <LinkGroup title={dict.tree.title} items={forCiv.trees(civ.id).map((t) => ({ key: t.id, href: `/${lang}/family-trees/${t.slug}/`, label: loc(t.title, lang).text }))} />
        <LinkGroup title={dict.regions[civ.region]} items={related.map((c) => ({ key: c.id, href: `/${lang}/civilizations/${c.slug}/`, label: c.names[lang] }))} />
        <SourcesBlock dict={dict} sources={sourcesFor(civ.sourceIds)} />
      </DetailShell>
    </>
  );
}
