import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LANGS, isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { articles, civsOf, eventsOf, getArticle, loc, peopleOf, placesOf, readingMinutes, sourcesFor } from "@/lib/content";
import { getAuthor } from "@/data/authors";
import { absoluteUrl, formatDate } from "@/lib/site";
import { JsonLd, breadcrumbLd, detailMetadata } from "@/lib/seo";
import { DetailShell, LinkGroup, SourcesBlock } from "@/components/Detail";

type P = { params: Promise<{ lang: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return LANGS.flatMap((lang) => articles.map((a) => ({ lang, slug: a.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const a = getArticle(slug);
  if (!a || !isLang(lang)) return {};
  return detailMetadata({ lang, path: `/articles/${slug}`, title: loc(a.title, lang).text, description: loc(a.excerpt, lang).text, draft: a.status === "draft" });
}

export default async function ArticlePage({ params }: P) {
  const { lang: raw, slug } = await params;
  const a = getArticle(slug);
  if (!isLang(raw) || !a) notFound();
  const lang: Lang = raw;
  const dict = getDictionary(lang);
  const title = loc(a.title, lang);
  const excerpt = loc(a.excerpt, lang);
  const ownBody = a.body[lang];
  const body = ownBody ?? a.body.en ?? [];
  const bodyFallback = !ownBody && lang !== "en";
  const author = getAuthor(a.authorId);
  const era = dict.era;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title.text,
          description: excerpt.text,
          inLanguage: bodyFallback ? "en" : lang,
          dateModified: a.updatedAt,
          author: { "@type": "Organization", name: author?.names[lang] ?? "" },
          mainEntityOfPage: absoluteUrl(lang, `/articles/${slug}`),
        }}
      />
      <JsonLd data={breadcrumbLd([{ name: dict.breadcrumb.home, url: absoluteUrl(lang) }, { name: dict.pages.articles.title, url: absoluteUrl(lang, "/articles") }, { name: title.text }])} />
      <DetailShell
        dict={dict}
        crumbs={[{ label: dict.breadcrumb.home, href: `/${lang}/` }, { label: dict.pages.articles.title, href: `/${lang}/articles/` }, { label: title.text }]}
        title={title.text}
        fallback={title.fb || bodyFallback}
        draft={a.status === "draft"}
      >
        <p className="text-sm text-muted">
          {author && (
            <>
              {dict.lbl.author}: <Link href={`/${lang}/authors/${author.slug}/`} className="underline underline-offset-4">{author.names[lang]}</Link> ·{" "}
            </>
          )}
          {dict.lbl.updated}: <time dateTime={a.updatedAt}>{a.updatedAt}</time> · {dict.lbl.readingTime.replace("{n}", String(readingMinutes(a, lang)))}
        </p>
        <div className="prose-text mt-6 space-y-5 text-lg" lang={bodyFallback ? "en" : undefined} dir={bodyFallback ? "ltr" : undefined}>
          {body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <LinkGroup title={dict.rel.civilizations} items={civsOf(a.civIds).map((c) => ({ key: c.id, href: `/${lang}/civilizations/${c.slug}/`, label: c.names[lang] }))} />
        <LinkGroup title={dict.rel.people} items={peopleOf(a.personIds).map((p) => ({ key: p.id, href: `/${lang}/people/${p.slug}/`, label: p.names[lang] }))} />
        <LinkGroup title={dict.rel.events} items={eventsOf(a.eventIds).map((e) => ({ key: e.id, href: `/${lang}/events/${e.slug}/`, label: e.names[lang], hint: formatDate(e.year, e.approx, lang, era) }))} />
        <LinkGroup title={dict.rel.places} items={placesOf(a.placeIds).map((p) => ({ key: p.id, href: `/${lang}/places/${p.slug}/`, label: p.names[lang] }))} />
        <SourcesBlock dict={dict} sources={sourcesFor(a.sourceIds)} />
      </DetailShell>
    </>
  );
}
