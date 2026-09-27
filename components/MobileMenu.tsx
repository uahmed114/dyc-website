"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navMenu } from "@/lib/content";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close menus after navigating: shut the mobile panel, and drop keyboard
  // focus so a desktop dropdown opened by focus doesn't stay open.
  useEffect(() => {
    setOpen(false);
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  }, [pathname]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-paper-raised text-ink"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full max-h-[calc(100vh-76px)] overflow-y-auto border-b border-line bg-paper-raised px-4 pb-5 pt-2 shadow-brand"
        >
          <ul className="divide-y divide-line">
            {navMenu.map((item) =>
              item.children ? (
                <li key={item.href}>
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-3.5 text-[15px] font-semibold text-ink marker:content-none">
                      {item.label}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60 transition group-open:rotate-180" aria-hidden>
                        <path d="M2.5 4.5L6 8l3.5-3.5" />
                      </svg>
                    </summary>
                    <ul className="mb-3 flex flex-col gap-0.5 border-l-2 border-line pl-3">
                      {!item.children.some((c) => c.href === item.href) && (
                        <li>
                          <Link href={item.href} onClick={() => setOpen(false)} className="block rounded-lg px-2 py-2 text-sm font-semibold text-jade">
                            All {item.label.toLowerCase()} →
                          </Link>
                        </li>
                      )}
                      {item.children.map((child) => (
                        <li key={child.href + child.label}>
                          <Link href={child.href} onClick={() => setOpen(false)} className="block rounded-lg px-2 py-2">
                            <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                              {child.label}
                              {child.badge && (
                                <span className="rounded-full bg-gold px-1.5 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-wider text-white">
                                  {child.badge}
                                </span>
                              )}
                            </span>
                            {child.note && <span className="block text-[12.5px] text-muted">{child.note}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setOpen(false)} className="block py-3.5 text-[15px] font-semibold text-ink">
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
          <Link
            href="/apply"
            onClick={() => setOpen(false)}
            className="mt-4 flex items-center justify-center rounded-lg bg-jade px-5 py-3 text-sm font-semibold text-white"
          >
            Book a Free Call →
          </Link>
        </div>
      )}
    </div>
  );
}
