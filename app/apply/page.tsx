import PageHero from "@/components/PageHero";
import ConsultationForm from "@/components/ConsultationForm";
import { site } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Book a Free Consultation",
  description:
    "Book a free 15-minute consultation with Drop Your Case. Tell us your grades and goals, and a consultant will contact you within one business day.",
  path: "/apply/",
});

const steps = [
  "Fill in the form: it takes about two minutes.",
  "A consultant contacts you within one business day to book a time.",
  "On the call, we go through your options, scholarships and next steps. Free, no obligation.",
];

export default function ApplyPage() {
  return (
    <>
      <PageHero
        eyebrow="Free Consultation"
        title="Book your free consultation"
        body="Tell us a bit about yourself and what you want to study. We'll get back to you to schedule a call at a time that suits you."
      />

      <section className="py-[84px]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-14 px-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col gap-10">
            <div>
              <h3 className="text-lg font-bold text-ink">What happens next</h3>
              <ol className="mt-5 flex flex-col gap-4">
                {steps.map((s, i) => (
                  <li key={s} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-jade/10 font-mono text-sm font-semibold text-jade">
                      {i + 1}
                    </span>
                    <span className="pt-1 text-[15px] text-ink-soft">{s}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-bold text-ink">Prefer to talk directly?</h3>
              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={site.whatsappUrl}
                  className="flex items-center gap-3 rounded-card border border-line bg-paper-raised p-4 text-sm font-semibold text-ink hover:border-jade"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-jade/10 text-jade">↗</span>
                  WhatsApp: {site.phone}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 rounded-card border border-line bg-paper-raised p-4 text-sm font-semibold text-ink hover:border-jade"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-jade/10 text-jade">@</span>
                  {site.email}
                </a>
              </div>
            </div>
          </div>

          <ConsultationForm />
        </div>
      </section>
    </>
  );
}
