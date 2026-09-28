import { programs } from "@/lib/content";
import ImagePlaceholder from "./ImagePlaceholder";

export default function ProgramGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {programs.map((p) => (
        <div
          key={p.title}
          className="flex flex-col overflow-hidden rounded-card border border-line bg-paper-raised shadow-[0_16px_34px_-20px_rgba(0,0,0,0.45)]"
        >
          <ImagePlaceholder
            src={p.image}
            alt={p.title}
            label={`Photo: ${p.imageHint}`}
            dimensions="800 × 500"
            className="aspect-[16/10] w-full rounded-none border-0 border-b"
          />
          <div className="flex flex-1 flex-col gap-3 p-6">
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
        </div>
      ))}
    </div>
  );
}
