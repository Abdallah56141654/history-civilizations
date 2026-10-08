import { LANGS, isLang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildSearchDocs } from "@/lib/search-index";

// Static file at build time: /en/search-index.json, /ar/search-index.json, ...
// The browser fetches it lazily the first time a search box gets focus.
export const dynamic = "force-static";
export const dynamicParams = false;
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) return new Response("Not found", { status: 404 });
  return Response.json(buildSearchDocs(lang, getDictionary(lang)));
}
