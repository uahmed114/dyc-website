import { programs } from "@/lib/content";
import ImagePlaceholder from "./ImagePlaceholder";

export default function ProgramGrid() {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {programs.map((p) => (
        <div key={p.title} className="flex min-h-[180px] flex-col gap-3.5 bg-paper-raised p-6">
          {p.image ? (
            <ImagePlaceholder
              src={p.image}
              alt={p.title}
              label={p.title}
              className="mb-1 h-32 w-full rounded-lg"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-line bg-jade/[0.08] text-jade">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="mr-1 text-base font-bold text-ink">{p.title}</h4>
            {p.countries.map((c) => (
              <span
                key={c}
                className="rounded-full border border-line px-2 py-0.5 font-mono text-[10.5px] font-semibold uppercase tracking-wider text-jade"
              >
                {c}
              </span>
            ))}
          </div>
          <p className="text-sm text-ink-soft">{p.body}</p>
          <div className="mt-auto border-t border-line pt-2.5 text-[12.5px] text-muted">
            In China from <b className="font-mono text-gold">{p.fee}</b>/yr
            {p.note ? ` · ${p.note}` : ""}
          </div>
        </div>
      ))}
    </div>
  );
}
