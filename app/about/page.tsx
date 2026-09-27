import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { site } from "@/lib/content";
import { PrimaryButton } from "@/components/Buttons";

export const metadata = { title: "About Us | Drop Your Case" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Built by people who've done this before"
        body="Drop Your Case exists to make one specific process less confusing: getting a Pakistani student into a Chinese university without wasting time, money, or a scholarship you were actually eligible for."
      />

      <section className="py-[84px]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-14 px-8 lg:grid-cols-2 lg:items-center">
          <ImagePlaceholder
            src={null}
            alt="Drop Your Case team"
            label="Photo: team or office in Islamabad"
            dimensions="800 × 600"
            className="aspect-[4/3] w-full"
          />
          <div>
            <SectionHeading
              eyebrow="Our Story"
              title="Based in Islamabad, working nationwide."
              body="We started DYC after seeing how many strong students were missing out on scholarships simply because the application process — SOPs, documents, deadlines split across dozens of universities — was never explained clearly in one place."
            />
            <p className="mt-4 text-ink-soft">
              Today we work with students across Pakistan, matching them to universities and
              scholarship tracks in China based on their actual academic profile, not a generic
              shortlist.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-jade-deep">
        <div className="mx-auto max-w-[1180px] px-8 py-[84px]">
          <SectionHeading
            eyebrow="What We Believe"
            title="A few things we won't compromise on."
            onDark
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                title: "No false guarantees",
                body: "We tell you your realistic chances up front — no consultancy can guarantee admission, and we won't pretend otherwise.",
              },
              {
                title: "One point of contact",
                body: "You work with the same consultant from your first call through visa approval, not a rotating queue.",
              },
              {
                title: "Transparent process",
                body: "Every case follows the same six documented steps, so you always know exactly where things stand.",
              },
            ].map((v) => (
              <div key={v.title} className="rounded-card border border-line bg-paper-raised p-7">
                <h4 className="text-[16px] font-bold text-ink">{v.title}</h4>
                <p className="mt-2 text-sm text-ink-soft">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[84px] text-center">
        <div className="mx-auto max-w-[600px] px-8">
          <h3 className="text-2xl font-semibold text-jade">Talk to us before you apply anywhere</h3>
          <p className="mt-3 text-ink-soft">
            A free 15-minute call at {site.phone} or over WhatsApp can save you months of guesswork.
          </p>
          <PrimaryButton className="mt-6">Book a Free Call →</PrimaryButton>
        </div>
      </section>
    </>
  );
}
