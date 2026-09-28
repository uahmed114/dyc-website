import { hungary } from "@/lib/content";

// One colour per segment, in the same order as hungary.livingCosts.
const COLORS = ["#1F6F5C", "#C6912F", "#7FA89A", "#E0C58A", "#9AA69F"];

export default function LivingCostBar() {
  const items = hungary.livingCosts;
  const total = items.reduce((sum, i) => sum + i.mid, 0);

  return (
    <div className="rounded-card border border-line bg-paper-raised p-7 text-ink shadow-[0_16px_34px_-20px_rgba(0,0,0,0.45)]">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">Typical month for a student</div>
          <div className="mt-1 font-mono text-[34px] font-semibold leading-none text-jade">
            {hungary.livingCost}
          </div>
        </div>
        <div className="text-[13px] text-muted">A student card cuts transport and entertainment costs.</div>
      </div>

      <div className="mt-6 flex h-4 w-full gap-[3px] overflow-hidden rounded-full" role="img" aria-label="Monthly budget split by category">
        {items.map((it, i) => (
          <div
            key={it.item}
            style={{ width: `${(it.mid / total) * 100}%`, background: COLORS[i % COLORS.length] }}
            className="h-full min-w-[6px] first:rounded-l-full last:rounded-r-full"
          />
        ))}
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
        {items.map((it, i) => (
          <li key={it.item} className="flex items-center justify-between gap-3 border-b border-line pb-2.5 text-sm">
            <span className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
              {it.item}
            </span>
            <span className="font-mono font-semibold tabular-nums text-ink">{it.range}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
