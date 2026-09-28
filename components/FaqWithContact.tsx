import FaqList from "./FaqList";
import SectionHeading from "./SectionHeading";
import { PrimaryButton } from "./Buttons";
import { site } from "@/lib/content";

/** FAQ on the left with a sticky "Still have questions?" contact card on the right. */
export default function FaqWithContact({
  title,
  items,
  blurb,
  className = "",
}: {
  title: string;
  items: { q: string; a: string }[];
  blurb: string;
  className?: string;
}) {
  return (
    <section className={`border-t border-line py-[84px] ${className}`}>
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-12 px-8 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <SectionHeading eyebrow="Frequently Asked" title={title} />
          <FaqList items={items} />
        </div>
        <aside className="self-start rounded-card border border-line bg-paper p-7 lg:sticky lg:top-28">
          <h3 className="text-xl font-semibold text-jade">Still have questions?</h3>
          <p className="mt-2 text-sm text-ink-soft">{blurb}</p>
          <div className="mt-5 flex flex-col gap-3">
            <a
              href={site.whatsappUrl}
              className="flex items-center gap-3 rounded-lg border border-line bg-paper-raised p-3.5 text-sm font-semibold text-ink transition hover:border-jade"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-jade/10 text-jade">↗</span>
              WhatsApp {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-3 rounded-lg border border-line bg-paper-raised p-3.5 text-sm font-semibold text-ink transition hover:border-jade"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-jade/10 text-jade">@</span>
              {site.email}
            </a>
          </div>
          <PrimaryButton className="mt-5 w-full justify-center">Book a Free Call →</PrimaryButton>
        </aside>
      </div>
    </section>
  );
}
