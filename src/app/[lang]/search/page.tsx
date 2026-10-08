import type { Metadata } from "next";
import { Suspense } from "react";
import { isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { civilizations } from "@/lib/content";
import { regionKeys } from "@/data/civilizations";
import { searchBoxProps } from "@/lib/search-index";
import { alternatesFor } from "@/lib/site";
import SearchResults from "@/components/SearchResults";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang as Lang);
  return { title: dict.search.title, alternates: alternatesFor(lang as Lang, "/search"), robots: { index: false, follow: true } };
}

export default async function SearchPage({ params }: P) {
  const { lang: raw } = await params;
  if (!isLang(raw)) return null;
  const lang = raw;
  const dict = getDictionary(lang);
  const regionLabels = Object.fromEntries(regionKeys.filter((r) => civilizations.some((c) => c.region === r)).map((r) => [r, dict.regions[r]]));

  return (
    <>
      <h1 className="font-display text-4xl font-bold">{dict.search.title}</h1>
      <div className="mt-6 max-w-4xl">
        <Suspense fallback={null}>
          <SearchResults
            lang={lang}
            labels={dict.search}
            era={dict.era}
            typeLabels={dict.types}
            regionLabels={regionLabels}
            civs={civilizations.map((c) => ({ id: c.id, name: c.names[lang] }))}
            box={searchBoxProps(lang, dict)}
          />
        </Suspense>
      </div>
    </>
  );
}
