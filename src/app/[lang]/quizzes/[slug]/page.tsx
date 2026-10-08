import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGS, isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { loc } from "@/lib/content";
import { getQuiz, quizzes } from "@/data/quizzes";
import { absoluteUrl } from "@/lib/site";
import { JsonLd, breadcrumbLd, detailMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import Quiz, { type QuizView } from "@/components/Quiz";

type P = { params: Promise<{ lang: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return LANGS.flatMap((lang) => quizzes.map((q) => ({ lang, slug: q.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const q = getQuiz(slug);
  if (!q || !isLang(lang)) return {};
  return detailMetadata({ lang, path: `/quizzes/${slug}`, title: loc(q.title, lang).text, description: loc(q.intro, lang).text, draft: q.status === "draft", type: "website" });
}

export default async function QuizPage({ params }: P) {
  const { lang: raw, slug } = await params;
  const q = getQuiz(slug);
  if (!isLang(raw) || !q) notFound();
  const lang: Lang = raw;
  const dict = getDictionary(lang);
  // A quiz is shown wholly in one language: the page language if every question exists in it, otherwise English.
  const complete = q.questions.every((x) => x.text[lang] && x.options[lang] && x.explanation[lang]);
  const ql: Lang = complete ? lang : "en";
  const title = loc(q.title, ql).text;
  const view: QuizView = {
    questions: q.questions.map((x) => ({ id: x.id, text: x.text[ql] ?? x.text.en ?? "", options: x.options[ql] ?? x.options.en ?? [], correct: x.correct, explanation: x.explanation[ql] ?? x.explanation.en ?? "" })),
  };

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: dict.breadcrumb.home, url: absoluteUrl(lang) }, { name: dict.quiz.title, url: absoluteUrl(lang, "/quizzes") }, { name: title }])} />
      <Breadcrumbs label={dict.breadcrumb.label} items={[{ label: dict.breadcrumb.home, href: `/${lang}/` }, { label: dict.quiz.title, href: `/${lang}/quizzes/` }, { label: title }]} />
      {!complete && lang !== "en" && <p role="note" className="mt-4 rounded-md border border-line bg-surface p-3 text-sm">{dict.civ.notTranslated}</p>}
      <h1 className="mt-4 font-display text-4xl font-bold" lang={complete ? undefined : "en"} dir={complete ? undefined : "ltr"}>{title}</h1>
      <div className="mt-6 max-w-2xl">
        <Quiz quiz={view} dict={dict.quiz} allHref={`/${lang}/quizzes/`} textLang={complete ? undefined : "en"} />
      </div>
      {q.status === "draft" && <p role="note" className="mt-10 max-w-2xl rounded-md border border-line bg-surface p-3 text-sm text-muted">{dict.civ.reviewDraft}</p>}
    </>
  );
}
