import { comparisonTable } from "@/lib/content";

export default function CompareTable() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-white/20 bg-white/20 md:grid-cols-4">
        <div className="bg-white/10 p-6 text-white">
          <div className="text-xs uppercase tracking-wide text-white/65">Metric</div>
        </div>
        {comparisonTable.rows[0].columns.map((col) => (
          <div key={col.title} className="bg-paper-raised p-6 text-ink">
            <div className="mb-1.5 text-xs uppercase tracking-wide text-muted">
              Annual tuition
            </div>
            <h4 className="text-[14.5px] font-bold">{col.title}</h4>
            <span
              className={`mt-2.5 block font-mono text-[22px] font-semibold ${
                col.accent ? "text-jade" : "text-ink"
              }`}
            >
              {col.value}
            </span>
          </div>
        ))}

        <div className="bg-white/10 p-6 text-white">
          <div className="text-xs uppercase tracking-wide text-white/65">
            Entry requirement
          </div>
        </div>
        {comparisonTable.rows[1].columns.map((col, i) => (
          <div key={i} className="bg-paper-raised p-6 text-ink">
            <span
              className={`font-mono text-base font-semibold ${
                col.accent ? "text-jade" : "text-ink"
              }`}
            >
              {col.value}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3.5 text-xs text-white/75">{comparisonTable.footnote}</p>
    </div>
  );
}
