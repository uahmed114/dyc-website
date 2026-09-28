import { campuses } from "@/lib/content";
import ImagePlaceholder from "./ImagePlaceholder";

export default function CampusGrid({ country }: { country?: string } = {}) {
  const list = country ? campuses.filter((c) => c.country === country) : campuses;
  const cols = list.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4";
  return (
    <div className={`grid grid-cols-1 gap-5 ${cols}`}>
      {list.map((c) => (
        <div key={c.city} className="overflow-hidden rounded-card border border-line bg-paper-raised">
          <ImagePlaceholder
            src={c.image}
            alt={`${c.city} campus`}
            label={`Photo: ${c.city}`}
            dimensions="600 × 400"
            className="h-[150px] w-full rounded-none"
          />
          <div className="p-5">
            <div className="font-mono text-[10.5px] uppercase tracking-widest text-muted">
              {c.country}
            </div>
            <h4 className="mb-1 mt-1 text-[15.5px] font-bold text-ink">{c.city}</h4>
            <p className="text-[13px] text-ink-soft">{c.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
