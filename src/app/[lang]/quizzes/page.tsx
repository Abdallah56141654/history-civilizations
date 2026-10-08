import type { Metadata } from "next";
import { isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { loc } from "@/lib/content";
import { quizzes } from "@/data/quizzes";
import { alternatesFor } from "@/lib/site";
import ListPage from "@/components/ListPage";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang as Lang);
  return { title: d.quiz.title, description: d.quiz.intro, alternates: alternatesFor(lang as Lang, "/quizzes") };
}

export default async function QuizzesPage({ params }: P) {
  const { lang: raw } = await params;
  if (!isLang(raw)) return null;
  const lang = raw;
  const dict = getDictionary(lang);
  const items = quizzes.map((q) => {
    const t = loc(q.title, lang);
    const i = loc(q.intro, lang);
    return { key: q.id, href: `/${lang}/quizzes/${q.slug}/`, title: t.text, summary: i.text, summaryFallback: i.fb, tag: dict.quiz.count.replace("{n}", String(q.questions.length)) };
  });
  return <ListPage lang={lang} dict={dict} title={dict.quiz.title} intro={dict.quiz.intro} items={items} />;
}
