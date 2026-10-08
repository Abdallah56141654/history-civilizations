"use client";

import { useEffect, useState } from "react";

const KEY = "consent";
declare global {
  interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
}

function loadGA(id: string) {
  if (document.getElementById("ga-script")) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer!.push(arguments); }; // GA expects the `arguments` object
  window.gtag("js", new Date());
  window.gtag("config", id, { anonymize_ip: true });
  const s = document.createElement("script");
  s.id = "ga-script";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}

/** Rendered only when NEXT_PUBLIC_GA_ID is set. Nothing from Google loads before "Accept". */
export default function ConsentBanner({ gaId, labels }: { gaId: string; labels: { text: string; accept: string; decline: string } }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem(KEY); } catch {}
    if (saved === "granted") loadGA(gaId);
    else if (saved !== "denied") setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener("open-consent", reopen);
    return () => window.removeEventListener("open-consent", reopen);
  }, [gaId]);

  function choose(value: "granted" | "denied") {
    try { localStorage.setItem(KEY, value); } catch {}
    if (value === "granted") loadGA(gaId);
    setOpen(false);
  }
  if (!open) return null;

  const btn = "h-11 rounded-md border border-control px-6 font-medium hover:border-lapis";
  return (
    <div role="dialog" aria-label={labels.text} className="fixed inset-x-0 bottom-0 z-50 border-t border-control bg-bg p-4 shadow-lg">
      <div className="mx-auto flex max-w-page flex-col gap-3 sm:flex-row sm:items-center">
        <p className="flex-1 text-sm">{labels.text}</p>
        <div className="flex gap-3">
          <button type="button" className={btn} onClick={() => choose("denied")}>{labels.decline}</button>
          <button type="button" className={btn} onClick={() => choose("granted")}>{labels.accept}</button>
        </div>
      </div>
    </div>
  );
}
