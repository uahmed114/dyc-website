import { pathways } from "@/lib/content";

/**
 * Two-stage study routes (start in Thailand or Armenia, finish in Hungary),
 * drawn as a simple start → finish line so the sequence reads at a glance.
 */
export default function PathwayRoutes({ onDark = false }: { onDark?: boolean }) {
  const node = onDark
    ? "border-white/30 bg-white/10 text-white"
    : "border-line bg-paper-raised text-ink";
  const sub = onDark ? "text-white/60" : "text-muted";
  const line = onDark ? "border-white/40" : "border-jade/50";
  const body = onDark ? "text-white/75" : "text-ink-soft";

  return (
    <div className="flex flex-col gap-6">
      {pathways.map((p) => (
        <div key={p.from} className="flex flex-col gap-2.5">
          <div className="flex items-center gap-3">
            <div className={`shrink-0 rounded-lg border px-3.5 py-2 ${node}`}>
              <div className={`font-mono text-[10px] tracking-widest ${sub}`}>START</div>
              <div className="text-sm font-bold">{p.from}</div>
            </div>
            <div className="relative flex-1">
              <div className={`border-t-2 border-dashed ${line}`} />
              <span
                className={`absolute -right-0.5 -top-[7px] text-xs ${
                  onDark ? "text-white/70" : "text-jade"
                }`}
                aria-hidden
              >
                ▶
              </span>
            </div>
            <div
              className={`shrink-0 rounded-lg border px-3.5 py-2 ${
                onDark ? "border-gold/60 bg-gold/15 text-white" : "border-gold/50 bg-gold/10 text-ink"
              }`}
            >
              <div className={`font-mono text-[10px] tracking-widest ${sub}`}>FINISH · EU</div>
              <div className="text-sm font-bold">{p.to}</div>
            </div>
          </div>
          <p className={`text-[13.5px] ${body}`}>{p.body}</p>
        </div>
      ))}
    </div>
  );
}
