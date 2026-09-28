import { pathways, pathwayFinish } from "@/lib/content";
import ImagePlaceholder from "./ImagePlaceholder";

function Stage({ n, text, onPhoto = false }: { n: number; text: string; onPhoto?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-wider ${
        onPhoto ? "bg-ink/75 text-white backdrop-blur-sm" : "bg-jade/10 text-jade"
      }`}
    >
      Stage {n} · {text}
    </span>
  );
}

/**
 * Photo cards for the pathway routes: the two starting cities on the left,
 * converging on Budapest on the right. On phones the cards stack with a
 * down arrow between the stages.
 */
export default function PathwayJourney() {
  return (
    <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[1fr_72px_1.15fr] lg:gap-0">
      {/* Stage 1: starting cities */}
      <div className="flex flex-col gap-5">
        {pathways.map((p) => (
          <div key={p.from} className="flex overflow-hidden rounded-card border border-line bg-paper-raised">
            <div className="relative min-h-[150px] w-[42%] shrink-0">
              <div className="absolute inset-0">
                <ImagePlaceholder
                  src={p.image}
                  alt={`${p.city}, ${p.from}`}
                  label={`Photo: ${p.city}`}
                  compact
                  className="h-full w-full rounded-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 p-5">
              <Stage n={1} text="Begin" />
              <h3 className="text-xl font-semibold text-ink">
                {p.from} <span className="text-base font-normal text-muted">· {p.city}</span>
              </h3>
              <p className="text-[13.5px] leading-snug text-ink-soft">{p.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Connector: converging arrows on desktop, a down arrow on phones */}
      <div className="flex items-center justify-center text-jade lg:hidden" aria-hidden>
        <svg width="20" height="28" viewBox="0 0 20 28" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 2v22M3 17l7 7 7-7" />
        </svg>
      </div>
      <div className="hidden lg:block" aria-hidden>
        <svg viewBox="0 0 72 100" preserveAspectRatio="none" className="h-full w-full text-jade">
          <path d="M0 25 C 36 25, 36 50, 66 50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
          <path d="M0 75 C 36 75, 36 50, 66 50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      {/* Stage 2: finish in Budapest */}
      <div className="relative min-h-[320px] overflow-hidden rounded-card border border-gold/50 shadow-brand">
        <div className="absolute inset-0">
          <ImagePlaceholder
            src={pathwayFinish.image}
            alt={pathwayFinish.city}
            label={`Photo: ${pathwayFinish.city}`}
            className="h-full w-full rounded-none"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/55 to-ink/5" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 text-white">
          <Stage n={2} text="Finish in the EU" onPhoto />
          <h3 className="text-3xl font-semibold text-white">
            {pathwayFinish.country} <span className="text-lg font-normal text-white/75">· {pathwayFinish.city}</span>
          </h3>
          <p className="max-w-[420px] text-sm leading-snug text-white/85">{pathwayFinish.body}</p>
        </div>
      </div>
    </div>
  );
}
