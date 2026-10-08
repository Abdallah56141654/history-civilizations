"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";

export interface QuizView {
  questions: { id: string; text: string; options: string[]; correct: number; explanation: string }[];
}

export default function Quiz({ quiz, dict, allHref, textLang }: { quiz: QuizView; dict: Dictionary["quiz"]; allHref: string; textLang?: string }) {
  const n = quiz.questions.length;
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(n).fill(null));
  const [done, setDone] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => { if (done) heading.current?.focus(); }, [done]);

  const q = quiz.questions[idx];
  const chosen = answers[idx];
  const correctCount = answers.filter((a, i) => a === quiz.questions[i].correct).length;
  const textProps = textLang ? { lang: textLang, dir: textLang === "en" ? ("ltr" as const) : undefined } : {};
  const btn = "h-11 rounded-md border px-5 text-base";

  function reset() { setAnswers(Array(n).fill(null)); setIdx(0); setDone(false); }

  if (done) {
    return (
      <section aria-live="polite">
        <h2 ref={heading} tabIndex={-1} className="font-display text-3xl font-bold">{dict.score.replace("{s}", String(correctCount)).replace("{m}", String(n))}</h2>
        <p className="mt-2 text-muted">{dict.correctN.replace("{n}", String(correctCount))} · {dict.wrongN.replace("{n}", String(n - correctCount))}</p>
        <ol className="mt-6 space-y-4" {...textProps}>
          {quiz.questions.map((qq, i) => {
            const ok = answers[i] === qq.correct;
            return (
              <li key={qq.id} className="rounded-md border border-line bg-surface p-4">
                <p className="font-medium">{i + 1}. {qq.text}</p>
                <p className={`mt-2 text-sm font-medium ${ok ? "text-lapis" : "text-ochre"}`}>{ok ? "✓ " + dict.correct : "✗ " + dict.wrong}</p>
                {!ok && <p className="mt-1 text-sm">{dict.yourAnswer}: {answers[i] === null ? "—" : qq.options[answers[i] as number]}</p>}
                <p className="mt-1 text-sm">{dict.correctAnswer}: <strong>{qq.options[qq.correct]}</strong></p>
                <p className="mt-2 text-sm text-muted"><span className="font-medium text-ink">{dict.explanation}:</span> {qq.explanation}</p>
              </li>
            );
          })}
        </ol>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className={`${btn} border-lapis bg-lapis text-bg`}>{dict.retake}</button>
          <Link href={allHref} className={`${btn} inline-flex items-center border-control hover:border-lapis`}>{dict.all}</Link>
        </div>
      </section>
    );
  }

  return (
    <section>
      <p className="text-sm text-muted" aria-live="polite">{dict.question.replace("{n}", String(idx + 1)).replace("{m}", String(n))}</p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line" aria-hidden="true">
        <div className="h-full bg-lapis" style={{ width: `${((idx + 1) / n) * 100}%` }} />
      </div>
      <fieldset className="mt-6" key={q.id} {...textProps}>
        <legend className="font-display text-2xl font-bold">{q.text}</legend>
        <div className="mt-4 space-y-2">
          {q.options.map((opt, i) => (
            <label key={i} className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 ${chosen === i ? "border-lapis bg-surface" : "border-control hover:border-lapis"}`}>
              <input
                type="radio"
                name={`q-${q.id}`}
                checked={chosen === i}
                onChange={() => setAnswers((a) => a.map((v, k) => (k === idx ? i : v)))}
                className="h-4 w-4 accent-[var(--lapis)]"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </fieldset>
      {chosen === null && <p className="mt-3 text-sm text-muted">{dict.chooseFirst}</p>}
      <div className="mt-6 flex gap-3">
        <button type="button" onClick={() => setIdx((i) => i - 1)} disabled={idx === 0} className={`${btn} border-control hover:border-lapis disabled:opacity-40`}>{dict.previous}</button>
        {idx < n - 1 ? (
          <button type="button" onClick={() => setIdx((i) => i + 1)} disabled={chosen === null} className={`${btn} border-lapis bg-lapis text-bg disabled:opacity-40`}>{dict.next}</button>
        ) : (
          <button type="button" onClick={() => setDone(true)} disabled={answers.some((a) => a === null)} className={`${btn} border-lapis bg-lapis text-bg disabled:opacity-40`}>{dict.finish}</button>
        )}
      </div>
    </section>
  );
}
