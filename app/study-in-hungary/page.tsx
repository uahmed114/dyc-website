import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import PathwayJourney from "@/components/PathwayJourney";
import FaqWithContact from "@/components/FaqWithContact";
import { PrimaryButton } from "@/components/Buttons";
import { hungary, hungaryFaqs } from "@/lib/content";
import StudyLevels from "@/components/StudyLevels";
import LivingCostBar from "@/components/LivingCostBar";
import IntakeTimeline from "@/components/IntakeTimeline";

export const metadata = { title: "Study in Hungary | Drop Your Case" };

export default function StudyInHungaryPage() {
  return (
    <>
      <PageHero
        eyebrow="Destination · European Union"
        title="Study in Hungary"
        body="An EU degree in Budapest, taught in English — with scholarships, housing support, and the right to work while you study."
      />

      {/* Overview + photo */}
      <section className="py-[84px]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-14 px-8 lg:grid-cols-2">
          <ImagePlaceholder
            src={hungary.image}
            alt="Budapest"
            label="Photo: Budapest skyline or university campus"
            dimensions="1000 × 700"
            className="aspect-[10/7] w-full rounded-card"
          />
          <div>
            <SectionHeading
              eyebrow="Why Hungary"
              title="Central Europe, at a student's budget."
              body="Hungary is in both the EU and the Schengen Area, and Budapest is one of the most affordable capitals in Europe — a historic, multicultural city with a fast-growing job market in tech and business."
            />
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line">
              <div className="bg-paper-raised p-5">
                <dt className="text-xs uppercase tracking-wide text-muted">Living costs</dt>
                <dd className="mt-1.5 font-mono text-xl font-semibold text-jade">
                  {hungary.livingCost}
                  <span className="text-sm text-muted">/mo</span>
                </dd>
              </div>
              <div className="bg-paper-raised p-5">
                <dt className="text-xs uppercase tracking-wide text-muted">Intakes</dt>
                <dd className="mt-1.5 font-mono text-xl font-semibold text-ink">{hungary.intakes}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Key facts */}
      <section className="bg-jade-deep">
        <div className="mx-auto max-w-[1180px] px-8 py-[84px]">
          <SectionHeading
            eyebrow="What You Get"
            title="More than a place on a course."
            onDark
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {hungary.facts.map((f) => (
              <div key={f.title} className="rounded-card border border-line bg-paper-raised p-6">
                <h4 className="text-base font-bold text-ink">{f.title}</h4>
                <p className="mt-2 text-sm text-ink-soft">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Study areas */}
      <section id="study" className="scroll-mt-24 py-[84px]">
        <div className="mx-auto max-w-[1180px] px-8">
          <SectionHeading
            eyebrow="What You Can Study"
            title="Business, data and management, taught in English."
            body="Programmes at four levels. Entry requirements, fees and scholarship amounts depend on your background, so we go through them with you one to one."
          />
          <StudyLevels />
        </div>
      </section>

      {/* Cost of living */}
      <section id="costs" className="scroll-mt-24 bg-jade-deep">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-12 px-8 py-[84px] lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading
            eyebrow="Cost Of Living"
            title="What a month in Budapest actually costs."
            body="Budapest is one of the more affordable capitals in the EU. Students can also work up to 30 hours a week during term to help cover their living costs."
            onDark
            className="!mb-0"
          />
          <LivingCostBar />
        </div>
      </section>

      {/* Intakes */}
      <section id="intakes" className="scroll-mt-24 bg-paper-raised py-[84px]">
        <div className="mx-auto max-w-[1180px] px-8">
          <SectionHeading
            eyebrow="Intakes"
            title="Two start dates a year."
            body="Classes start in February and September. Each has its own application window, and applying early leaves the most time for your visa."
          />
          <IntakeTimeline />
        </div>
      </section>

      {/* Pathways */}
      <section id="pathways" className="scroll-mt-24 border-t border-line">
        <div className="mx-auto max-w-[1180px] px-8 py-[84px]">
          <SectionHeading
            eyebrow="Pathway Routes"
            title="Two ways in: through Thailand or Armenia."
            body="If a direct route to Hungary isn't the right fit yet, you can begin at a partner university in Thailand or Armenia and continue your studies in Budapest. We'll tell you whether a pathway suits your profile in your consultation."
          />
          <PathwayJourney />
        </div>
      </section>

      {/* FAQ */}
      <FaqWithContact
        title="Questions about studying in Hungary."
        items={hungaryFaqs}
        blurb="Talk to a consultant. We'll answer anything about Hungary, the pathway routes or your own chances, for free."
        className="bg-paper-raised"
      />

      {/* CTA */}
      <section className="bg-jade-deep">
        <div className="mx-auto max-w-[820px] px-8 py-[84px] text-center">
          <h3 className="text-2xl font-semibold text-white">
            See if you qualify for Hungary
          </h3>
          <p className="mt-3 text-white/80">
            Send your transcript and we&apos;ll tell you which programmes and scholarships you&apos;re a
            realistic fit for, along with the full fee breakdown.
          </p>
          <PrimaryButton className="mt-6">Book a Free Call →</PrimaryButton>
        </div>
      </section>
    </>
  );
}
