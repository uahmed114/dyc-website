import { processSteps } from "@/lib/content";

export default function ProcessList() {
  return (
    <div className="flex flex-col">
      {processSteps.map((step, i) => (
        <div
          key={step.title}
          className={`grid grid-cols-[44px_1fr] gap-6 border-t border-line py-6 sm:grid-cols-[70px_1fr_90px] ${
            i === processSteps.length - 1 ? "border-b" : ""
          }`}
        >
          <div className="pt-0.5 font-mono text-sm font-semibold text-jade">
            {String(i + 1).padStart(2, "0")}
          </div>
          <div>
            <h4 className="mb-1.5 text-[16.5px] font-bold text-ink">{step.title}</h4>
            <p className="max-w-[560px] text-[14.5px] text-ink-soft">{step.body}</p>
          </div>
          <div className="hidden justify-self-end pt-0.5 text-right font-mono text-[11.5px] text-muted sm:block">
            {step.tag}
          </div>
        </div>
      ))}
    </div>
  );
}
