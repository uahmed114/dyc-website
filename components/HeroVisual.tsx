import Image from "next/image";
import { heroPhoto, heroStats } from "@/lib/content";

const accentClass = {
  jade: "text-jade",
  gold: "text-gold",
  none: "text-ink",
};

export default function HeroVisual() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-[#fbfbf9] to-paper shadow-brand">
      <Image
        src={heroPhoto.src}
        alt={heroPhoto.alt}
        width={heroPhoto.width}
        height={heroPhoto.height}
        priority
        sizes="(max-width: 768px) 100vw, 560px"
        className="block h-auto w-full"
      />

      <div className="border-t border-line bg-paper-raised p-6">
        <div className="mb-[18px] flex items-baseline justify-between">
          <h3 className="text-[15px] font-bold text-ink">What your case looks like</h3>
          <span className="font-mono text-[11px] text-muted">EST. FILE</span>
        </div>
        <div className="flex flex-col">
          {heroStats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex items-center justify-between py-3.5 ${
                i > 0 ? "border-t border-line" : ""
              }`}
            >
              <span className="text-[13.5px] text-ink-soft">{stat.label}</span>
              <span
                className={`font-mono text-[17px] font-semibold tabular-nums ${accentClass[stat.accent]}`}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
