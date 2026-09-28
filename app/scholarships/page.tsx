import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import ScholarshipCard, { CoverLegend } from "@/components/ScholarshipCard";
import { PrimaryButton } from "@/components/Buttons";
import { scholarships, pageHeroImages, scholarshipFacts, testimonials, campuses } from "@/lib/content";

export const metadata = { title: "Scholarships | Drop Your Case" };

const cityPhoto = (city: string) => campuses.find((c) => c.city === city)?.image ?? null;

const groups = [
  {
    id: "china",
    country: "China",
    eyebrow: "China",
    title: "Three routes to funding in China.",
    body: "We assess your eligibility across all three during your first free call. You don't need to know which one fits going in.",
    photo: "/images/china2.jpg",
    photoLabel: "Photo: a campus in China",
    cols: "md:grid-cols-3",
  },
  {
    id: "hungary",
    country: "Hungary",
    eyebrow: "Hungary",
    title: "Two ways to bring tuition down in Budapest.",
    body: "Exact amounts depend on the programme and your record; we go through them in your consultation.",
    photo: "/images/budapest2.jpg",
    photoLabel: "Photo: Budapest",
    cols: "md:grid-cols-2",
  },
] as const;

function CountrySection({ g, className = "" }: { g: (typeof groups)[number]; className?: string }) {
  return (
    <section id={g.id} className={`scroll-mt-24 py-[84px] ${className}`}>
      <div className="mx-auto max-w-[1180px] px-8">
        <div className="mb-12 grid grid-cols-1 items-end gap-8 lg:grid-cols-[1.3fr_1fr]">
          <SectionHeading eyebrow={g.eyebrow} title={g.title} body={g.body} className="!mb-0" />
          <ImagePlaceholder
            src={g.photo}
            alt={g.country}
            label={g.photoLabel}
            dimensions="800 × 450"
            className="aspect-[16/9] w-full rounded-card shadow-brand"
          />
        </div>
        <div className="mb-5">
          <CoverLegend />
        </div>
        <div className={`grid grid-cols-1 gap-5 ${g.cols}`}>
          {scholarships
            .filter((s) => s.country === g.country)
            .map((s) => (
              <ScholarshipCard key={s.name} s={s} />
            ))}
        </div>
      </div>
    </section>
  );
}

export default function ScholarshipsPage() {
  const stories = testimonials.filter((t) => t.scholarship);

  return (
    <>
      <PageHero
        eyebrow="Scholarships"
        title="Funding routes we match students into"
        body="Most students we place receive partial or full scholarship coverage. Here are the main routes in each country, and what each one actually pays for."
        image={pageHeroImages.scholarships}
        imageAlt="Student celebrating a scholarship offer"
        imageLabel="Photo: a graduation, or a student celebrating an offer"
        facts={scholarshipFacts}
      />

      <CountrySection g={groups[0]} className="bg-paper-raised" />

      {stories.length > 0 && (
        <section className="bg-jade-deep">
          <div className="mx-auto max-w-[1180px] px-8 py-[84px]">
            <SectionHeading
              eyebrow="Scholarship Stories"
              title="What a scholarship looks like in real life."
              onDark
            />
            <div className={`grid grid-cols-1 gap-5 ${stories.length > 1 ? "md:grid-cols-2" : ""}`}>
              {stories.map((t) => (
                <figure key={t.name} className="flex flex-col gap-5 rounded-card border border-line bg-paper-raised p-7">
                  <span className="self-start rounded-full bg-gold/15 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#8a5f14]">
                    {t.scholarship}
                  </span>
                  <blockquote className="font-display text-[21px] leading-snug text-ink">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-auto border-t border-line pt-4 text-sm">
                    <span className="font-semibold text-ink">{t.name}</span>
                    <span className="text-muted"> · {t.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <CountrySection g={groups[1]} />

      <section className="bg-jade-deep">
        <div className="mx-auto max-w-[820px] px-8 py-[84px] text-center">
          <h3 className="text-2xl font-semibold text-white">Not sure which scholarship you qualify for?</h3>
          <p className="mt-3 text-white/80">
            Send your transcript and we&apos;ll tell you, for free, which routes you&apos;re a realistic fit for.
          </p>
          <PrimaryButton className="mt-6">Book a Free Call →</PrimaryButton>
        </div>
      </section>
    </>
  );
}
