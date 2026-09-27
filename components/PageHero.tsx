import ImagePlaceholder from "./ImagePlaceholder";
import type { ImageField } from "@/lib/content";

type Props = {
  eyebrow: string;
  title: string;
  body?: string;
  /**
   * Pass a photo (or null to show a labeled placeholder) to switch to the
   * split layout: text on the left, photo on the right. Leave it out
   * entirely for the centered, text-only header.
   */
  image?: ImageField;
  imageAlt?: string;
  imageLabel?: string;
  /** Optional key figures shown under the intro in the split layout. */
  facts?: { label: string; value: string }[];
};

export default function PageHero({ eyebrow, title, body, image, imageAlt, imageLabel, facts }: Props) {
  if (image === undefined) {
    return (
      <header className="border-b border-line py-16">
        <div className="mx-auto max-w-[820px] px-8 text-center">
          <div className="section-eyebrow justify-center">{eyebrow}</div>
          <h1 className="mt-4 text-[clamp(30px,4vw,46px)] font-semibold leading-tight text-ink">
            {title}
          </h1>
          {body && <p className="mx-auto mt-4 max-w-[560px] text-lg text-ink-soft">{body}</p>}
        </div>
      </header>
    );
  }

  return (
    <header className="border-b border-line py-14 lg:py-16">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-10 px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <div className="section-eyebrow">{eyebrow}</div>
          <h1 className="mt-4 text-[clamp(32px,4.4vw,52px)] font-semibold leading-[1.08] text-ink">
            {title}
          </h1>
          {body && <p className="mt-5 max-w-[520px] text-lg text-ink-soft">{body}</p>}
          {facts && facts.length > 0 && (
            <dl className="mt-8 grid max-w-[520px] grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line">
              {facts.map((f) => (
                <div key={f.label} className="bg-paper-raised px-4 py-3.5">
                  <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted">{f.label}</dt>
                  <dd className="mt-1 font-mono text-[15px] font-semibold text-jade">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        <ImagePlaceholder
          src={image}
          alt={imageAlt ?? title}
          label={imageLabel ?? "Photo: students on campus"}
          dimensions="1200 × 800"
          className="aspect-[3/2] w-full rounded-2xl shadow-brand"
        />
      </div>
    </header>
  );
}
