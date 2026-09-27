export default function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="flex flex-col divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="cursor-pointer list-none text-[15.5px] font-semibold text-ink marker:content-none">
            <span className="mr-2 inline-block font-mono text-jade transition group-open:rotate-45">+</span>
            {f.q}
          </summary>
          <p className="mt-3 pl-5 text-[14.5px] text-ink-soft">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
