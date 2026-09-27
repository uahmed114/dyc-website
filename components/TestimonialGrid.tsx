import { testimonials } from "@/lib/content";
import ImagePlaceholder from "./ImagePlaceholder";

export default function TestimonialGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {testimonials.map((t) => (
        <div
          key={t.name}
          className="flex flex-col gap-4 rounded-card border border-line bg-paper p-6"
        >
          <p className="text-[14.5px] leading-relaxed text-ink-soft">&ldquo;{t.quote}&rdquo;</p>
          <div className="mt-auto flex items-center gap-2.5 border-t border-line pt-4">
            <ImagePlaceholder
              src={t.photo}
              alt={t.name}
              label="Photo"
              compact
              className="h-[38px] w-[38px] shrink-0 rounded-full"
            />
            <div>
              <div className="text-[13.5px] font-semibold text-ink">{t.name}</div>
              <div className="text-xs text-muted">{t.role}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
