"use client";

import { useEffect, useState } from "react";
import { hungary } from "@/lib/content";

type Window = (typeof hungary.intakeWindows)[number];
type Resolved = { year: number; open: Date; close: Date; start: Date; isOpen: boolean; progress: number };

const fmt = (d: Date, withYear = true) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "short", ...(withYear ? { year: "numeric" } : {}) });

/** The next intake whose application window hasn't closed yet, relative to today. */
function resolve(w: Window, today: Date): Resolved {
  for (let y = today.getFullYear() - 1; y <= today.getFullYear() + 2; y++) {
    const open = new Date(y + w.openYearOffset, w.opens.month - 1, w.opens.day);
    const close = new Date(y + w.openYearOffset, w.closes.month - 1, w.closes.day, 23, 59);
    if (close >= today) {
      const start = new Date(y, w.intakeMonth - 1, 1);
      const isOpen = today >= open;
      const span = start.getTime() - open.getTime();
      const progress = Math.min(1, Math.max(0, (today.getTime() - open.getTime()) / span));
      return { year: y, open, close, start, isOpen, progress };
    }
  }
  throw new Error("No upcoming intake window");
}

function IntakeCard({ w }: { w: Window }) {
  // Dates are worked out in the visitor's browser so the badge is always current,
  // even though the page itself is built ahead of time.
  const [r, setR] = useState<Resolved | null>(null);
  useEffect(() => setR(resolve(w, new Date())), [w]);

  const steps = r
    ? [
        { label: "Opens", date: fmt(r.open) },
        { label: "Deadline", date: fmt(r.close) },
        { label: "Starts", date: r.start.toLocaleDateString("en-GB", { month: "short", year: "numeric" }) },
      ]
    : [];

  return (
    <div className="flex flex-col gap-6 rounded-card border border-line bg-paper-raised p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-2xl font-semibold text-ink">
          {w.intake} {r ? r.year : ""} <span className="text-ink-soft">intake</span>
        </h3>
        {r &&
          (r.isOpen ? (
            <span className="flex items-center gap-2 rounded-full bg-jade px-3 py-1 text-xs font-semibold text-white">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white motion-reduce:animate-none" />
              Open now · closes {fmt(r.close, false)}
            </span>
          ) : (
            <span className="rounded-full border border-line bg-paper px-3 py-1 text-xs font-semibold text-ink-soft">
              Opens {fmt(r.open)}
            </span>
          ))}
      </div>

      <div className="relative min-h-[76px]">
        <div className="absolute left-2 right-2 top-[7px] h-[3px] rounded-full bg-line" />
        {r && (
          <div
            className="absolute left-2 top-[7px] h-[3px] rounded-full bg-jade"
            style={{ width: `calc((100% - 16px) * ${r.progress})` }}
          />
        )}
        <ol className="relative grid grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.label} className={`flex flex-col ${i === 1 ? "items-center text-center" : i === 2 ? "items-end text-right" : ""}`}>
              <span className={`h-[17px] w-[17px] rounded-full border-[3px] ${i === 1 ? "border-gold" : "border-jade"} bg-paper-raised`} />
              <span className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-muted">{s.label}</span>
              <span className="mt-0.5 font-mono text-sm font-semibold text-ink">{s.date}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function IntakeTimeline() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {hungary.intakeWindows.map((w) => (
          <IntakeCard key={w.intake} w={w} />
        ))}
      </div>
      <p className="text-[13px] text-muted">
        If your visa is delayed, your application moves to the next intake automatically. Visa appointments can take
        weeks, so it pays to apply early in the window.
      </p>
    </div>
  );
}
