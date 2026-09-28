import Link from "next/link";
import Image from "next/image";
import { navMenu, site } from "@/lib/content";
import { PrimaryButton } from "./Buttons";
import MobileMenu from "./MobileMenu";

export function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden
    >
      <path d="M2.5 4.5L6 8l3.5-3.5" />
    </svg>
  );
}

export function NewBadge() {
  return (
    <span className="rounded-full bg-gold px-1.5 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-wider text-white">
      New
    </span>
  );
}

export default function Nav() {
  return (
    <nav className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-8 py-[18px] max-sm:px-4">
        <Link
          href="/"
          className="flex items-center gap-3 font-display text-xl font-bold tracking-tight text-ink"
        >
          <Image
            src={site.logo.mark}
            alt=""
            width={512}
            height={349}
            priority
            className="h-9 w-auto shrink-0"
          />
          {site.name}
        </Link>

        {/* Desktop: hover or keyboard-focus a top-level item to open its dropdown.
            The label itself still links to the section's overview page. */}
        <ul className="hidden items-center gap-1 text-[14.5px] font-medium text-ink-soft md:flex">
          {navMenu.map((item) => (
            <li key={item.href} className="group relative">
              <Link
                href={item.href}
                className="flex items-center gap-1.5 rounded-md px-3 py-2 transition hover:text-jade focus-visible:text-jade focus-visible:outline focus-visible:outline-2 focus-visible:outline-jade"
                aria-haspopup={item.children ? "true" : undefined}
              >
                {item.label}
                {item.children && (
                  <Chevron className="opacity-60 transition group-hover:rotate-180 group-focus-within:rotate-180" />
                )}
              </Link>
              {item.children && (
                <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 opacity-0 transition duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="w-[300px] rounded-card border border-line bg-paper-raised p-2 shadow-brand">
                    {item.children.map((child) => (
                      <li key={child.href + child.label}>
                        <Link
                          href={child.href}
                          className="block rounded-lg px-3.5 py-2.5 outline-none transition hover:bg-paper focus-visible:bg-paper"
                        >
                          <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                            {child.label}
                            {child.badge && <NewBadge />}
                          </span>
                          {child.note && (
                            <span className="mt-0.5 block text-[12.5px] leading-snug text-muted">
                              {child.note}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <PrimaryButton href="/apply" className="max-sm:hidden">
            Book a Free Call →
          </PrimaryButton>
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
