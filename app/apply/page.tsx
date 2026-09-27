import PageHero from "@/components/PageHero";
import { site } from "@/lib/content";

export const metadata = { title: "Apply Now | Drop Your Case" };

export default function ApplyPage() {
  return (
    <>
      <PageHero
        eyebrow="Apply Now"
        title="Start with a free 15-minute consultation"
        body="Tell us a bit about your academic background and target field. A consultant will follow up within one business day."
      />

      <section className="py-[84px]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-14 px-8 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h3 className="text-lg font-bold text-ink">Prefer to talk directly?</h3>
            <div className="mt-5 flex flex-col gap-4">
              <a
                href={site.whatsappUrl}
                className="flex items-center gap-3 rounded-card border border-line bg-paper-raised p-4 text-sm font-semibold text-ink hover:border-jade"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-jade/10 text-jade">
                  ↗
                </span>
                WhatsApp: {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 rounded-card border border-line bg-paper-raised p-4 text-sm font-semibold text-ink hover:border-jade"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-jade/10 text-jade">
                  @
                </span>
                {site.email}
              </a>
              <div className="rounded-card border border-line bg-paper-raised p-4 text-sm text-ink-soft">
                {site.address}
              </div>
            </div>
          </div>

          <form className="flex flex-col gap-5 rounded-card border border-line bg-paper-raised p-8 shadow-brand">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
                Full name
                <input
                  type="text"
                  name="name"
                  required
                  className="rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm font-normal outline-none focus:border-jade"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
                Phone / WhatsApp
                <input
                  type="tel"
                  name="phone"
                  required
                  className="rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm font-normal outline-none focus:border-jade"
                />
              </label>
            </div>
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
              Email
              <input
                type="email"
                name="email"
                required
                className="rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm font-normal outline-none focus:border-jade"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
              Target field of study
              <input
                type="text"
                name="field"
                placeholder="e.g. MBBS, Computer Science, MBA"
                className="rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm font-normal outline-none focus:border-jade placeholder:text-muted"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
              Anything else we should know?
              <textarea
                name="message"
                rows={4}
                className="resize-none rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm font-normal outline-none focus:border-jade"
              />
            </label>
            <button
              type="submit"
              className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-jade px-5 py-3 text-sm font-semibold text-white shadow-brand transition hover:bg-jade-deep"
            >
              Request a Free Call →
            </button>
            <p className="text-xs text-muted">
              This form is a UI placeholder — wire it up to your CRM, email service, or a
              backend route before launch.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
