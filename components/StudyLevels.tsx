import { hungary } from "@/lib/content";

export default function StudyLevels() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {hungary.levels.map((l) => (
        <div key={l.level} className="flex flex-col rounded-card border border-line bg-paper-raised p-6 shadow-[0_16px_34px_-24px_rgba(20,35,31,0.35)]">
          <div className="flex items-baseline justify-between gap-3 border-b border-line pb-4">
            <h3 className="text-xl font-semibold text-jade lg:min-h-[3.25rem]">{l.level}</h3>
          </div>
          <div className="mt-4 font-mono text-[26px] font-semibold leading-none text-gold">{l.duration}</div>
          <p className="mt-3 text-[13.5px] leading-snug text-ink-soft">{l.note}</p>
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {l.subjects.map((s) => (
              <li key={s} className="rounded-full border border-line bg-paper px-2.5 py-1 text-[12.5px] font-medium text-ink">
                {s}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
