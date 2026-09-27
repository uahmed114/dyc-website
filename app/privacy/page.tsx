import PageHero from "@/components/PageHero";
import { site } from "@/lib/content";

export const metadata = { title: "Privacy Policy | Drop Your Case" };

const sections = [
  {
    title: "Information we collect",
    body: "When you contact us or submit an application form, we collect the details you provide directly — name, contact information, academic background, and any documents you choose to share for your case.",
  },
  {
    title: "How we use your information",
    body: "We use your information to assess university and scholarship eligibility, prepare and submit your application, and communicate with you about your case. We do not sell your personal information to third parties.",
  },
  {
    title: "Sharing with universities",
    body: "As part of the admissions process, we share the documents you provide with the universities and scholarship bodies relevant to your application, and only for that purpose.",
  },
  {
    title: "Data retention",
    body: "We retain your information for as long as needed to support your application and, where relevant, your enrollment — and delete it on request once it's no longer required.",
  },
  {
    title: "Contact us",
    body: `Questions about this policy or your data can be sent to ${site.email}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        body="Last updated September 2026. This page explains what information we collect and how we use it."
      />
      <section className="py-[84px]">
        <div className="mx-auto max-w-[760px] px-8">
          <div className="flex flex-col gap-10">
            {sections.map((s) => (
              <div key={s.title}>
                <h3 className="text-lg font-bold text-jade">{s.title}</h3>
                <p className="mt-2.5 text-ink-soft">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
