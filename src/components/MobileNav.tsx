"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function MobileNav({ items, menuLabel }: { items: { href: string; label: string }[]; menuLabel: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        className="grid h-10 w-10 place-items-center rounded-md border border-control"
      >
        <span className="sr-only">{menuLabel}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      {open && (
        <ul id="mobile-menu" className="absolute inset-x-0 top-full border-b border-line bg-bg px-4 pb-3 shadow-sm">
          {items.map((i) => (
            <li key={i.href}>
              <Link href={i.href} className="block border-t border-line py-3 text-lg">
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
