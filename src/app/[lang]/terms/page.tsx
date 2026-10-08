import type { Metadata } from "next";
import { isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { alternatesFor } from "@/lib/site";
import LegalDoc from "@/components/LegalDoc";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang as Lang);
  return { title: d.legalNav.terms, alternates: alternatesFor(lang as Lang, "/terms") };
}

export default async function Page({ params }: P) {
  const { lang: raw } = await params;
  if (!isLang(raw)) return null;
  const dict = getDictionary(raw);
  return <LegalDoc lang={raw} dict={dict} page="terms" title={dict.legalNav.terms} />;
}
