type Props = {
  eyebrow: string;
  title: string;
  body?: string;
  onDark?: boolean;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  body,
  onDark = false,
  className = "",
}: Props) {
  return (
    <div className={`mb-12 max-w-2xl ${className}`}>
      <div
        className={`section-eyebrow ${onDark ? "!text-white/70" : ""}`}
      >
        {eyebrow}
      </div>
      <h2
        className={`mt-3 text-[clamp(26px,3.2vw,36px)] font-semibold ${
          onDark ? "text-white" : "text-jade"
        }`}
      >
        {title}
      </h2>
      {body && (
        <p
          className={`mt-3.5 text-base ${
            onDark ? "text-white/80" : "text-ink-soft"
          }`}
        >
          {body}
        </p>
      )}
    </div>
  );
}
