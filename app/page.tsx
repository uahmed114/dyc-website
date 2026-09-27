import { PrimaryButton, GhostButton } from "@/components/Buttons";
import HeroVisual from "@/components/HeroVisual";
import SectionHeading from "@/components/SectionHeading";
import DestinationGrid from "@/components/DestinationGrid";
import ProcessList from "@/components/ProcessList";
import ProgramGrid from "@/components/ProgramGrid";
import CampusGrid from "@/components/CampusGrid";
import TestimonialGrid from "@/components/TestimonialGrid";

const checkIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <header className="border-b border-line py-[88px]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-14 px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <div className="section-eyebrow">Pakistan → China · Hungary · Beyond</div>
            <h1 className="mt-4 text-[clamp(34px,4.6vw,54px)] font-semibold leading-[1.08] tracking-tight text-ink">
              Your file, <span className="text-jade">dropped</span> at the right university.
            </h1>
            <p className="mt-5 max-w-[480px] text-lg text-ink-soft">
              We match Pakistani students to universities in China and Europe, then handle
              the documents, SOPs, scholarship applications and visas — often with no IELTS
              needed to apply.
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <PrimaryButton>Book a Free Call →</PrimaryButton>
              <GhostButton href="#destinations">See Destinations</GhostButton>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-7">
              <div className="flex items-center gap-2 text-[13.5px] font-medium text-muted">
                {checkIcon} Degrees in China &amp; the EU
              </div>
              <div className="flex items-center gap-2 text-[13.5px] font-medium text-muted">
                {checkIcon} Based in Islamabad, I-9/2
              </div>
              <div className="flex items-center gap-2 text-[13.5px] font-medium text-muted">
                {checkIcon} 7 days/week support
              </div>
            </div>
          </div>
          <HeroVisual />
        </div>
      </header>

      {/* DESTINATIONS */}
      <section id="destinations" className="bg-jade-deep">
        <div className="mx-auto max-w-[1180px] px-8 py-[84px]">
          <SectionHeading
            eyebrow="Where We Place Students"
            title="Two countries, more routes, one consultancy."
            body="We started with China and now place students in Hungary too — including pathway routes that start in Thailand or Armenia and finish in the EU."
            onDark
          />
          <DestinationGrid />
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="scroll-mt-24 py-[84px]">
        <div className="mx-auto max-w-[1180px] px-8">
          <SectionHeading
            eyebrow="Our Process"
            title="Six steps, one point of contact."
            body="The same process every case follows, from first consultation to landing abroad — you always know which step you're on."
          />
          <ProcessList />
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="bg-jade-deep">
        <div className="mx-auto max-w-[1180px] px-8 py-[84px]">
          <SectionHeading
            eyebrow="Popular Fields Of Study"
            title="Six fields we place into most — but we work with every discipline."
            body="These are the programs we see the most demand for. If your field isn't listed, ask us anyway — we match students across a far wider range of majors than fits here."
            onDark
          />
          <ProgramGrid />
        </div>
      </section>

      {/* CAMPUS LIFE */}
      <section>
        <div className="mx-auto max-w-[1180px] px-8 py-[84px]">
          <SectionHeading
            eyebrow="Life On Campus"
            title="Wherever the right university is, that's where we look."
            body="From Budapest to Beijing — a sample of the cities your case could lead to, not the limit of where we place students."
          />
          <CampusGrid />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-jade-deep">
        <div className="mx-auto max-w-[1180px] px-8 py-[84px]">
          <SectionHeading
            eyebrow="Success Stories"
            title="Students who already dropped their case."
            onDark
          />
          <TestimonialGrid />
        </div>
      </section>

      {/* CTA */}
      <section className="py-[84px]">
        <div className="mx-auto max-w-[1180px] px-8">
          <div className="flex flex-col items-start gap-8 rounded-[20px] border border-line bg-paper-raised p-9 shadow-brand sm:flex-row sm:items-center sm:justify-between sm:p-[52px]">
            <div>
              <div className="section-eyebrow">Free 15-Minute Consultation</div>
              <h3 className="mt-2.5 max-w-[460px] text-[clamp(22px,2.6vw,30px)] font-semibold text-jade">
                Send your transcript. We&apos;ll tell you exactly which universities and
                scholarships you qualify for.
              </h3>
            </div>
            <PrimaryButton className="px-6 py-3.5 text-[15px]">
              Book a Free Call →
            </PrimaryButton>
          </div>
        </div>
      </section>
    </>
  );
}
