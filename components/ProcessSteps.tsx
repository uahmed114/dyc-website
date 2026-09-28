import { processSteps } from "@/lib/content";

/**
 * The six-step process as numbered cards (3 × 2 on desktop). A thin rail on
 * each card fills a little further per step, so the sequence reads at a glance.
 */
export default function ProcessSteps() {
  const total = processSteps.length;
  return (
    <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {processSteps.map((step, i) => (
        <li key={step.title} className="flex flex-col rounded-card border border-line bg-paper-raised p-6">
          <div className="flex items-start justify-between gap-3">
            <span className="font-mono text-[34px] font-semibold leading-none text-gold">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="rounded-full bg-jade/10 px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-wider text-jade">
              {step.tag}
            </span>
          </div>
          <div className="mt-4 h-[3px] w-full rounded-full bg-line" aria-hidden>
            <div className="h-full rounded-full bg-jade" style={{ width: `${((i + 1) / total) * 100}%` }} />
          </div>
          <h4 className="mt-4 text-[16.5px] font-bold text-ink">{step.title}</h4>
          <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
