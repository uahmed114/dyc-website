import type { CoverState, Scholarship } from "@/lib/content";

const ITEMS: { key: keyof Scholarship["covers"]; label: string }[] = [
  { key: "tuition", label: "Tuition" },
  { key: "housing", label: "Housing" },
  { key: "stipend", label: "Stipend" },
  { key: "insurance", label: "Insurance" },
];

const STYLE: Record<CoverState, { box: string; sr: string }> = {
  yes: { box: "border-jade/30 bg-jade/[0.07] text-ink", sr: "covered" },
  partial: { box: "border-gold/40 bg-gold/[0.08] text-ink", sr: "partly covered" },
  no: { box: "border-line bg-paper text-muted", sr: "not included" },
};

const MARK_COLOR: Record<CoverState, string> = {
  yes: "text-jade",
  partial: "text-gold",
  no: "text-muted",
};

/** Tick, half-filled circle, or dash. The half circle is drawn in CSS so it
 *  renders the same size everywhere (the ◐ character varies by font). */
function Mark({ state }: { state: CoverState }) {
  if (state === "partial")
    return (
      <span
        aria-hidden
        className="inline-block h-3 w-3 shrink-0 rounded-full border-2 border-gold bg-[linear-gradient(90deg,var(--color-gold)_50%,transparent_50%)]"
      />
    );
  return (
    <span aria-hidden className={`w-3 text-center font-bold ${MARK_COLOR[state]}`}>
      {state === "yes" ? "✓" : "—"}
    </span>
  );
}

export function CoverLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-muted">
      <span className="flex items-center gap-1.5"><Mark state="yes" /> Covered on full awards</span>
      <span className="flex items-center gap-1.5"><Mark state="partial" /> Partly, or depends on the award</span>
      <span className="flex items-center gap-1.5"><Mark state="no" /> Not included</span>
    </div>
  );
}

export default function ScholarshipCard({ s }: { s: Scholarship }) {
  return (
    <div className="flex flex-col gap-4 rounded-card border border-line bg-paper-raised p-7">
      <h4 className="text-[17px] font-bold text-jade">{s.name}</h4>

      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-muted">What&apos;s covered</div>
        <ul className="mt-2.5 grid grid-cols-2 gap-2">
          {ITEMS.map(({ key, label }) => {
            const state = s.covers[key];
            return (
              <li
                key={key}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-[13px] font-semibold ${STYLE[state].box}`}
              >
                <Mark state={state} />
                {label}
                <span className="sr-only">: {STYLE[state].sr}</span>
              </li>
            );
          })}
        </ul>
        <p className="mt-2.5 text-[13px] leading-snug text-muted">{s.coverage}</p>
      </div>

      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-muted">Eligibility</div>
        <p className="mt-1 text-sm text-ink-soft">{s.eligibility}</p>
      </div>

      <div className="mt-auto border-t border-line pt-3.5">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted">Best for</div>
        <p className="mt-1 text-sm font-medium text-ink">{s.bestFor}</p>
      </div>
    </div>
  );
}
