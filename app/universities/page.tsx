import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ProgramGrid from "@/components/ProgramGrid";
import CampusGrid from "@/components/CampusGrid";
import { PrimaryButton } from "@/components/Buttons";
import { pageHeroImages } from "@/lib/content";

export const metadata = { title: "Universities | Drop Your Case" };

export default function UniversitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Universities"
        title="Programs & universities"
        body="Recognized universities across China, and English-taught programmes in Hungary — not a fixed list. Your best-fit school depends on your major, budget, and scholarship eligibility."
        image={pageHeroImages.programs}
        imageAlt="Students on a university campus"
        imageLabel="Photo: students on a university campus"
      />

      <section id="fields" className="scroll-mt-24 bg-jade-deep">
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

      <section id="campus" className="scroll-mt-24 py-[84px]">
        <div className="mx-auto max-w-[1180px] px-8">
          <SectionHeading
            eyebrow="Life On Campus"
            title="Wherever the right university is, that's where we look."
            body="A sample of the cities and campuses your case could lead to — not the limit of where we place students."
          />
          <CampusGrid />
        </div>
      </section>

      <section className="border-t border-line py-[84px] text-center">
        <div className="mx-auto max-w-[600px] px-8">
          <h3 className="text-2xl font-semibold text-jade">Don&apos;t see your field or city listed?</h3>
          <p className="mt-3 text-ink-soft">
            That&apos;s normal — we cover far more than what fits on one page. Tell us your target
            major and we&apos;ll shortlist realistic universities during your free consultation.
          </p>
          <PrimaryButton className="mt-6">Book a Free Call →</PrimaryButton>
        </div>
      </section>
    </>
  );
}
