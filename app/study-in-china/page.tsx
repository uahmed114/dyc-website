import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CompareTable from "@/components/CompareTable";
import ProcessList from "@/components/ProcessList";
import { faqs, pageHeroImages, chinaFacts } from "@/lib/content";
import CampusGrid from "@/components/CampusGrid";
import { PrimaryButton } from "@/components/Buttons";
import FaqList from "@/components/FaqList";

export const metadata = { title: "Study in China | Drop Your Case" };

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

      <section className="border-t border-line py-[84px]">
        <div className="mx-auto max-w-[1180px] px-8">
          <SectionHeading
            eyebrow="Our Process"
            title="Six steps, one point of contact."
            body="The same process every case follows, from first consultation to landing in China."
          />
          <ProcessList />
        </div>
      </section>

      <section className="border-t border-line py-[84px]">
        <div className="mx-auto max-w-[820px] px-8">
          <SectionHeading eyebrow="Frequently Asked" title="Questions students ask before they apply." />
          <FaqList items={faqs} />
        </div>
      </section>

      <section className="py-[84px] text-center">
        <div className="mx-auto max-w-[600px] px-8">
          <h3 className="text-2xl font-semibold text-jade">Ready to see your options?</h3>
          <p className="mt-3 text-ink-soft">
            Send us your transcript for a free, no-obligation read on which universities and
            scholarships you qualify for.
          </p>
          <PrimaryButton className="mt-6">Book a Free Call →</PrimaryButton>
        </div>
      </section>
    </>
  );
}
