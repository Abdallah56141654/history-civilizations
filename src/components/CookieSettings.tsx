"use client";

export default function CookieSettings({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("open-consent"))} className="hover:text-lapis">
      {label}
    </button>
  );
}
