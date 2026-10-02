import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CompareTable from "@/components/CompareTable";
import ProcessSteps from "@/components/ProcessSteps";
import ProgramGrid from "@/components/ProgramGrid";
import { faqs, pageHeroImages, chinaFacts } from "@/lib/content";
import CampusGrid from "@/components/CampusGrid";
import { PrimaryButton } from "@/components/Buttons";
import FaqWithContact from "@/components/FaqWithContact";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Study in China for Pakistani Students",
  description:
    "Study in China from Pakistan: English-taught MBBS, engineering, CS and business degrees, HEC & WHO recognized. CSC & CPEC scholarships, often no IELTS needed.",
  path: "/study-in-china/",
});

export default function StudyInChinaPage() {
  return (
    <>
      <PageHero
        eyebrow="Destination · East Asia"
        title="Study in China"
        body="Why thousands of Pakistani students choose China: affordable tuition, government scholarships, and internationally recognized degrees — without an IELTS requirement for most programs."
        image={pageHeroImages.china}
        imageAlt="University campus in China"
        imageLabel="Photo: a Chinese university campus"
        facts={chinaFacts}
      />

      <section className="bg-jade-deep">
        <div className="mx-auto max-w-[1180px] px-8 py-[84px]">
          <SectionHeading
            eyebrow="The Comparison"
            title="The cost of a degree, without the cost of a decade."
            body="China's public universities combine low tuition, scholarship access, and HEC/WHO-recognized credentials."
            onDark
          />
          <CompareTable />
        </div>
      </section>

      <section className="bg-paper-raised py-[84px]">
        <div className="mx-auto max-w-[1180px] px-8">
          <SectionHeading
            eyebrow="Where You Could Study"
            title="From the capital to the southwest."
            body="A few of the cities our students study in. We place students at recognized universities all over China, not just these."
          />
          <CampusGrid country="China" />
        </div>
      </section>

      <section id="fields" className="scroll-mt-24 bg-jade-deep">
        <div className="mx-auto max-w-[1180px] px-8 py-[84px]">
          <SectionHeading
            eyebrow="Popular Fields In China"
            title="MBBS, engineering, business and more."
            body="The fields most of our China students choose. We place students across many more majors than these, so ask about yours."
            onDark
          />
          <ProgramGrid />
        </div>
      </section>

      <section id="process" className="scroll-mt-24 py-[84px]">
        <div className="mx-auto max-w-[1180px] px-8">
          <SectionHeading
            eyebrow="Our Process"
            title="Six steps, one point of contact."
            body="The same process every case follows, from first consultation to landing in China. Most students go from first call to visa in three to six months."
          />
          <ProcessSteps />
        </div>
      </section>

      <FaqWithContact
        title="Questions students ask before they apply."
        items={faqs}
        blurb="Talk to a consultant. We'll answer anything about studying in China, scholarships or your own chances, for free."
        className="bg-paper-raised"
      />

      <section className="bg-jade-deep">
        <div className="mx-auto max-w-[820px] px-8 py-[84px] text-center">
          <h3 className="text-2xl font-semibold text-white">Ready to see your options?</h3>
          <p className="mt-3 text-white/80">
            Send us your transcript for a free, no-obligation read on which universities and
            scholarships you qualify for.
          </p>
          <PrimaryButton className="mt-6">Book a Free Call →</PrimaryButton>
        </div>
      </section>
    </>
  );
}
