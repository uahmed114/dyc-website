import Link from "next/link";
import { navLinks, site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-line px-0 py-14">
      <div className="mx-auto max-w-[1180px] px-8">
        <div className="grid grid-cols-2 gap-10 pb-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-3.5 flex items-center gap-2 font-display text-xl font-bold text-ink">
              <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] bg-gradient-to-br from-jade to-jade-deep text-sm font-bold text-white">
                D
              </span>
              {site.name}
            </div>
            <p className="max-w-[260px] text-[13.5px] text-ink-soft">
              {site.address}
            </p>
            <p className="mt-2.5 text-[13.5px] text-ink-soft">
              {site.email}
              <br />
              {site.phone}
            </p>
          </div>
          <div>
            <h5 className="mb-4 text-[13px] font-semibold uppercase tracking-wide text-muted">
              Explore
            </h5>
            {[
              { href: "/study-in-china", label: "Study in China" },
              { href: "/study-in-hungary", label: "Study in Hungary" },
              { href: "/study-in-hungary#pathways", label: "Pathway routes" },
              ...navLinks.filter((l) => l.href !== "/destinations" && l.href !== "/about" && l.href !== "/blog"),
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="mb-2.5 block text-sm text-ink-soft hover:text-jade"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div>
            <h5 className="mb-4 text-[13px] font-semibold uppercase tracking-wide text-muted">
              Company
            </h5>
            <Link href="/about" className="mb-2.5 block text-sm text-ink-soft hover:text-jade">
              About Us
            </Link>
            <Link href="/blog" className="mb-2.5 block text-sm text-ink-soft hover:text-jade">
              Blog
            </Link>
            <Link href="/apply" className="mb-2.5 block text-sm text-ink-soft hover:text-jade">
              Book a consultation
            </Link>
            <Link href="/privacy" className="mb-2.5 block text-sm text-ink-soft hover:text-jade">
              Privacy Policy
            </Link>
          </div>
          <div>
            <h5 className="mb-4 text-[13px] font-semibold uppercase tracking-wide text-muted">
              Follow
            </h5>
            <a href={site.social.facebook} className="mb-2.5 block text-sm text-ink-soft hover:text-jade">
              Facebook
            </a>
            <a href={site.social.instagram} className="mb-2.5 block text-sm text-ink-soft hover:text-jade">
              Instagram
            </a>
            <a href={site.social.tiktok} className="mb-2.5 block text-sm text-ink-soft hover:text-jade">
              TikTok
            </a>
            <a href={site.social.youtube} className="mb-2.5 block text-sm text-ink-soft hover:text-jade">
              YouTube
            </a>
          </div>
        </div>
        <p className="max-w-3xl border-t border-line pt-7 text-xs leading-relaxed text-muted">
          {site.disclaimer}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[13px] text-muted">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span className="font-mono">ISB → CHINA · HUNGARY</span>
        </div>
      </div>
    </footer>
  );
}
