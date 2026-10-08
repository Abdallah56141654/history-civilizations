import type { Metadata } from "next";
import type { Lang } from "@/i18n/config";
import { absoluteUrl, alternatesFor } from "./site";

export function detailMetadata(o: { lang: Lang; path: string; title: string; description: string; draft: boolean; type?: "article" | "website" }): Metadata {
  const description = o.description.slice(0, 200);
  return {
    title: o.title,
    description,
    alternates: alternatesFor(o.lang, o.path),
    openGraph: { title: o.title, description, url: absoluteUrl(o.lang, o.path), type: o.type ?? "article" },
    // Drafts stay out of search engines until a person has reviewed them.
    robots: o.draft ? { index: false, follow: true } : undefined,
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function breadcrumbLd(items: { name: string; url?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, ...(it.url ? { item: it.url } : {}) })),
  };
}
