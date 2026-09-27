import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import DestinationGrid from "@/components/DestinationGrid";
import { PrimaryButton } from "@/components/Buttons";

export const metadata = { title: "Destinations | Drop Your Case" };

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Destinations"
        title="Where your case can take you"
        body="We began with China and now place students in Hungary too, with pathway routes through Thailand and Armenia."
      />

      <section className="bg-jade-deep">
        <div className="mx-auto max-w-[1180px] px-8 py-[84px]">
          <SectionHeading
            eyebrow="Choose A Starting Point"
            title="Not sure which country fits? That's what the first call is for."
            body="We compare your options side by side, including budget, scholarships, entry requirements and work rights, before you commit to anything."
            onDark
          />
          <DestinationGrid />
        </div>
      </section>

      <section className="py-[84px] text-center">
        <div className="mx-auto max-w-[600px] px-8">
          <h3 className="text-2xl font-semibold text-jade">One consultation, every option</h3>
          <p className="mt-3 text-ink-soft">
            Tell us your field and budget, and we&apos;ll show you which destinations and routes you
            realistically qualify for.
          </p>
          <PrimaryButton className="mt-6">Book a Free Call →</PrimaryButton>
        </div>
      </section>
    </>
  );
}
