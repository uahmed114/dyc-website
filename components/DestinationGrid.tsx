import Link from "next/link";
import { destinations } from "@/lib/content";
import ImagePlaceholder from "./ImagePlaceholder";
import PathwayRoutes from "./PathwayRoutes";

export default function DestinationGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      {destinations.map((d) => (
        <Link
          key={d.slug}
          href={d.href}
          className="group flex flex-col overflow-hidden rounded-card border border-line bg-paper-raised text-ink shadow-[0_16px_34px_-20px_rgba(0,0,0,0.45)] transition hover:-translate-y-0.5"
        >
          <div className="relative">
            <ImagePlaceholder
              src={d.image}
              alt={`Studying in ${d.country}`}
              label={`Photo: ${d.country} — campus or city`}
              dimensions="800 × 450"
              className="aspect-[16/8] w-full rounded-none"
            />
            {d.isNew && (
              <span className="absolute right-3 top-3 rounded-full bg-gold px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-wider text-white">
                NEW
              </span>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-3 p-6">
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted">
              {d.region}
            </div>
            <h3 className="text-2xl font-semibold text-jade">{d.country}</h3>
            <p className="text-sm text-ink-soft">{d.headline}</p>
            <ul className="flex flex-col gap-1.5 border-t border-line pt-3">
              {d.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-[13.5px] text-ink">
                  <span className="text-jade">✓</span>
                  {h}
                </li>
              ))}
            </ul>
            <span className="mt-auto pt-2 text-sm font-semibold text-jade group-hover:underline">
              Explore {d.country} →
            </span>
          </div>
        </Link>
      ))}

      <div className="flex flex-col gap-4 rounded-card border border-white/20 bg-white/[0.07] p-6">
        <div className="font-mono text-[11px] uppercase tracking-widest text-white/60">
          Pathway routes
        </div>
        <h3 className="text-2xl font-semibold text-white">Start in one country, finish in the EU.</h3>
        <PathwayRoutes onDark />
        <Link
          href="/study-in-hungary#pathways"
          className="mt-auto pt-2 text-sm font-semibold text-white hover:underline"
        >
          Ask how the routes work →
        </Link>
      </div>
    </div>
  );
}
