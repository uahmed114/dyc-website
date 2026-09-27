import { heroStats } from "@/lib/content";

const accentClass = {
  jade: "text-jade",
  gold: "text-gold",
  none: "text-ink",
};

export default function HeroVisual() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-[#fbfbf9] to-paper shadow-brand">
      <div className="absolute left-3.5 top-3.5 z-10 flex items-center gap-1.5 rounded-full bg-ink/[0.82] px-2.5 py-1.5 pl-2 text-[11px] font-semibold text-white">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
        Photo spot — students on campus, 960×640
      </div>

      <svg viewBox="0 0 480 200" preserveAspectRatio="xMidYMax slice" className="block w-full">
        <line x1="0" y1="168" x2="480" y2="168" stroke="var(--color-line)" strokeWidth="1" />
        <path
          d="M-10 150 Q 60 120 140 148 T 300 145 T 500 152"
          fill="none"
          stroke="var(--color-line)"
          strokeWidth="1.5"
        />
        <g stroke="var(--color-jade)" strokeWidth="2" fill="none" strokeLinejoin="round">
          <rect x="60" y="90" width="70" height="78" />
          <line x1="60" y1="112" x2="130" y2="112" />
          <line x1="60" y1="134" x2="130" y2="134" />
          <line x1="82" y1="90" x2="82" y2="168" />
          <line x1="108" y1="90" x2="108" y2="168" />
        </g>
        <g
          stroke="var(--color-gold)"
          strokeWidth="2.2"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <line x1="240" y1="168" x2="240" y2="60" />
          <path d="M205 100 L240 82 L275 100" />
          <path d="M198 100 L282 100" />
          <path d="M212 130 L240 112 L268 130" />
          <path d="M203 130 L277 130" />
          <path d="M218 158 L240 142 L262 158" />
          <path d="M210 158 L270 158" />
          <circle cx="240" cy="52" r="4" />
        </g>
        <g stroke="var(--color-jade)" strokeWidth="2" fill="none" opacity="0.55">
          <rect x="330" y="108" width="90" height="60" />
          <line x1="330" y1="128" x2="420" y2="128" />
          <line x1="330" y1="148" x2="420" y2="148" />
          <line x1="356" y1="108" x2="356" y2="168" />
          <line x1="382" y1="108" x2="382" y2="168" />
          <line x1="408" y1="108" x2="408" y2="168" />
        </g>
      </svg>

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
