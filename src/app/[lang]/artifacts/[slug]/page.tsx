import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGS, isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { artifacts, civsOf, loc, placesOf, sourcesFor } from "@/lib/content";
import { getArtifact } from "@/data/artifacts";
import { absoluteUrl } from "@/lib/site";
import { JsonLd, breadcrumbLd, detailMetadata } from "@/lib/seo";
import { DetailShell, Facts, Lead, LinkGroup, SourcesBlock } from "@/components/Detail";

type P = { params: Promise<{ lang: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return LANGS.flatMap((lang) => artifacts.map((a) => ({ lang, slug: a.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const a = getArtifact(slug);
  if (!a || !isLang(lang)) return {};
  return detailMetadata({ lang, path: `/artifacts/${slug}`, title: a.names[lang], description: loc(a.summary, lang).text, draft: a.status === "draft" });
}

export default async function ArtifactPage({ params }: P) {
  const { lang: raw, slug } = await params;
  const a = getArtifact(slug);
  if (!isLang(raw) || !a) notFound();
  const lang: Lang = raw;
  const dict = getDictionary(lang);
  const s = loc(a.summary, lang);
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: dict.breadcrumb.home, url: absoluteUrl(lang) }, { name: dict.arch.title, url: absoluteUrl(lang, "/archaeology") }, { name: a.names[lang] }])} />
      <DetailShell
        dict={dict}
        crumbs={[{ label: dict.breadcrumb.home, href: `/${lang}/` }, { label: dict.arch.title, href: `/${lang}/archaeology/` }, { label: a.names[lang] }]}
        title={a.names[lang]}
        fallback={s.fb}
        draft={a.status === "draft"}
      >
        <Lead text={s.text} fallback={s.fb} />
        <Facts rows={[{ label: dict.arch.heldAt, value: a.heldAt }]} />
        <LinkGroup title={dict.rel.civilizations} items={civsOf(a.civIds).map((c) => ({ key: c.id, href: `/${lang}/civilizations/${c.slug}/`, label: c.names[lang] }))} />
        <LinkGroup title={dict.rel.places} items={placesOf(a.placeIds).map((p) => ({ key: p.id, href: `/${lang}/places/${p.slug}/`, label: p.names[lang] }))} />
        <SourcesBlock dict={dict} sources={sourcesFor(a.sourceIds)} />
      </DetailShell>
    </>
  );
}
