import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { scholarships } from "@/lib/content";
import { PrimaryButton } from "@/components/Buttons";

export const metadata = { title: "Scholarships | Drop Your Case" };

export default function ScholarshipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Scholarships"
        title="Funding routes we match students into"
        body="Most students we place receive partial or full scholarship coverage. Here are the main tracks in each country."
      />

      {(
        [
          {
            id: "china",
            eyebrow: "China",
            title: "Three routes to funding in China.",
            body: "We assess your eligibility across all three during your first free call. You don't need to know which one fits going in.",
          },
          {
            id: "hungary",
            eyebrow: "Hungary",
            title: "Two ways to bring tuition down in Budapest.",
            body: "Exact amounts depend on the programme and your record; we go through them in your consultation.",
          },
        ] as const
      ).map((group, gi) => (
        <section
          key={group.id}
          id={group.id}
          className={`scroll-mt-24 py-[84px] ${gi > 0 ? "border-t border-line bg-paper-raised" : ""}`}
        >
          <div className="mx-auto max-w-[1180px] px-8">
            <SectionHeading eyebrow={group.eyebrow} title={group.title} body={group.body} />
            <div
              className={`grid grid-cols-1 gap-5 ${group.id === "china" ? "md:grid-cols-3" : "max-w-[820px] md:grid-cols-2"}`}
            >
              {scholarships
                .filter((s) => s.country.toLowerCase() === group.id)
                .map((s) => (
              <div
                    key={s.name}
                    className="flex flex-col gap-4 rounded-card border border-line bg-paper-raised p-7"
                  >
                    <h4 className="text-[17px] font-bold text-jade">{s.name}</h4>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                        Coverage
                      </div>
                      <p className="mt-1 text-sm text-ink-soft">{s.coverage}</p>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                        Eligibility
                      </div>
                      <p className="mt-1 text-sm text-ink-soft">{s.eligibility}</p>
                    </div>
                    <div className="mt-auto border-t border-line pt-3.5">
                      <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                        Best for
                      </div>
                      <p className="mt-1 text-sm font-medium text-ink">{s.bestFor}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      ))}

      <section className="bg-jade-deep">
        <div className="mx-auto max-w-[820px] px-8 py-[84px] text-center">
          <h3 className="text-2xl font-semibold text-white">
            Not sure which scholarship you qualify for?
          </h3>
          <p className="mt-3 text-white/80">
            Send your transcript and we&apos;ll tell you, for free, which tracks you&apos;re a
            realistic fit for.
          </p>
          <PrimaryButton className="mt-6">Book a Free Call →</PrimaryButton>
        </div>
      </section>
    </>
  );
}
