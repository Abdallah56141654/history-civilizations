import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGS, isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { civsOf, loc, sourcesFor, technologies } from "@/lib/content";
import { getTechnology } from "@/data/technologies";
import { absoluteUrl } from "@/lib/site";
import { JsonLd, breadcrumbLd, detailMetadata } from "@/lib/seo";
import { DetailShell, Facts, Lead, LinkGroup, SourcesBlock } from "@/components/Detail";

type P = { params: Promise<{ lang: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return LANGS.flatMap((lang) => technologies.map((t) => ({ lang, slug: t.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const t = getTechnology(slug);
  if (!t || !isLang(lang)) return {};
  return detailMetadata({ lang, path: `/technology/${slug}`, title: t.names[lang], description: loc(t.summary, lang).text, draft: t.status === "draft" });
}

export default async function TechnologyDetail({ params }: P) {
  const { lang: raw, slug } = await params;
  const t = getTechnology(slug);
  if (!isLang(raw) || !t) notFound();
  const lang: Lang = raw;
  const dict = getDictionary(lang);
  const s = loc(t.summary, lang);
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: dict.breadcrumb.home, url: absoluteUrl(lang) }, { name: dict.tech.title, url: absoluteUrl(lang, "/technology") }, { name: t.names[lang] }])} />
      <DetailShell
        dict={dict}
        crumbs={[{ label: dict.breadcrumb.home, href: `/${lang}/` }, { label: dict.tech.title, href: `/${lang}/technology/` }, { label: t.names[lang] }]}
        title={t.names[lang]}
        fallback={s.fb}
        draft={t.status === "draft"}
      >
        <Lead text={s.text} fallback={s.fb} />
        <Facts rows={[{ label: dict.tech.category, value: dict.tech.categories[t.category] }]} />
        <LinkGroup title={dict.rel.civilizations} items={civsOf(t.civIds).map((c) => ({ key: c.id, href: `/${lang}/civilizations/${c.slug}/`, label: c.names[lang] }))} />
        <SourcesBlock dict={dict} sources={sourcesFor(t.sourceIds)} />
      </DetailShell>
    </>
  );
}
