export default function PageHero({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <header className="border-b border-line py-16">
      <div className="mx-auto max-w-[820px] px-8 text-center">
        <div className="section-eyebrow justify-center">{eyebrow}</div>
        <h1 className="mt-4 text-[clamp(30px,4vw,46px)] font-semibold leading-tight text-ink">
          {title}
        </h1>
        {body && <p className="mx-auto mt-4 max-w-[560px] text-lg text-ink-soft">{body}</p>}
      </div>
    </header>
  );
}
