"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function NavMore({ label, items }: { label: string; items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <div
      ref={wrap}
      className="relative"
      onBlur={(e) => { if (!wrap.current?.contains(e.relatedTarget as Node)) setOpen(false); }}
      onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }}
    >
      <button type="button" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((o) => !o)} className="text-sm hover:text-lapis">
        {label} <span aria-hidden="true">▾</span>
      </button>
      {open && (
        <ul className="absolute end-0 top-full z-50 mt-2 min-w-44 rounded-md border border-line bg-surface py-1 shadow-lg">
          {items.map((i) => (
            <li key={i.href}><Link href={i.href} className="block px-4 py-2 text-sm hover:bg-bg">{i.label}</Link></li>
          ))}
        </ul>
      )}
    </div>
  );
}
