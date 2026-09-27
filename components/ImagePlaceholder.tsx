import Image from "next/image";

type Props = {
  src?: string | null;
  alt: string;
  label: string;
  dimensions?: string;
  className?: string;
  onDark?: boolean;
  /** Compact mode: icon only, no label/dimensions text — for small slots like avatars. */
  compact?: boolean;
};

/**
 * Drop-in image slot. Pass `src="/images/whatever.jpg"` (put the file in
 * /public/images first) and it renders a normal optimized Next.js image.
 * Leave `src` unset/null and it renders a labeled placeholder instead, so
 * pages never look broken while real photography is pending.
 */
export default function ImagePlaceholder({
  src,
  alt,
  label,
  dimensions,
  className = "",
  onDark = false,
  compact = false,
}: Props) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    );
  }

  const iconSize = compact ? 14 : 26;

  return (
    <div
      className={[
        "flex flex-col items-center justify-center gap-2 rounded-card border-[1.5px] border-dashed text-center",
        compact ? "p-0" : "p-5",
        onDark
          ? "border-white/35 bg-white/[0.06] text-white/75"
          : "border-line bg-[repeating-linear-gradient(135deg,transparent,transparent_9px,rgba(20,35,31,0.05)_9px,rgba(20,35,31,0.05)_10px)] text-muted",
        className,
      ].join(" ")}
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="opacity-60"
      >
        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
      {!compact && (
        <span
          className={`max-w-[220px] text-xs font-bold leading-tight ${
            onDark ? "text-white/85" : "text-ink-soft"
          }`}
        >
          {label}
        </span>
      )}
      {!compact && dimensions && (
        <span className="font-mono text-[10.5px] tracking-wide opacity-80">
          {dimensions}
        </span>
      )}
    </div>
  );
}
