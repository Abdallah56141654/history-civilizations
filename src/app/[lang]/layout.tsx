import "../globals.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGS, LANG_META, isLang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { fontVariables } from "@/lib/fonts";
import { themeInitScript } from "@/lib/theme-script";
import { SITE_URL } from "@/lib/site";
import { GA_ID, GSC_VERIFICATION } from "@/lib/legal";
import ConsentBanner from "@/components/ConsentBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamicParams = false;
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const dict = getDictionary(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: dict.site.name, template: `%s | ${dict.site.name}` },
    description: dict.hero.subtitle,
    openGraph: { siteName: dict.site.name, type: "website", locale: LANG_META[lang].htmlLang.replace("-Hans", "_CN").replace("-", "_") },
    twitter: { card: "summary_large_image" },
    ...(GSC_VERIFICATION ? { verification: { google: GSC_VERIFICATION } } : {}),
  };
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const dict = getDictionary(lang);
  const meta = LANG_META[lang];

  return (
    <html lang={meta.htmlLang} dir={meta.dir} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-lapis focus:px-4 focus:py-2 focus:text-bg">
          {dict.skip}
        </a>
        <Header lang={lang} dict={dict} />
        <main id="main" className="mx-auto max-w-page px-4 pt-8">
          {children}
        </main>
        <Footer lang={lang} dict={dict} />
        {GA_ID && <ConsentBanner gaId={GA_ID} labels={dict.consent} />}
      </body>
    </html>
  );
}
