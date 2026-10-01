"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { consultationForm, site } from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "error";

// The Cloudflare Worker in worker/ that saves requests to the Zoho Sheet (set in .env.production / .env.local).
const SUBMIT_URL = process.env.NEXT_PUBLIC_CONSULTATION_URL;

const input =
  "w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm font-normal text-ink outline-none transition focus:border-jade focus:ring-2 focus:ring-jade/15 placeholder:text-muted";
const label = "flex flex-col gap-1.5 text-sm font-semibold text-ink";

function Select({ name, options, placeholder }: { name: string; options: string[]; placeholder: string }) {
  return (
    <select name={name} defaultValue="" className={input}>
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

export default function ConsultationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [tracking, setTracking] = useState({ utmSource: "", utmCampaign: "", sourcePage: "" });

  // Record where the visitor came from (e.g. an ad's utm_ tags) so leads can be traced to campaigns.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setTracking({
      utmSource: q.get("utm_source") || "",
      utmCampaign: q.get("utm_campaign") || "",
      sourcePage: document.referrer || window.location.pathname,
    });
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const payload = { ...Object.fromEntries(new FormData(form).entries()), ...tracking };
    try {
      if (!SUBMIT_URL) throw new Error("The form isn't connected yet. Please reach us on WhatsApp instead.");
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-card border border-line bg-paper-raised p-8 shadow-brand" role="status">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-jade/10 text-xl text-jade">✓</span>
        <h3 className="text-2xl font-semibold text-jade">Request received</h3>
        <p className="text-ink-soft">
          Thanks! A consultant will contact you within one business day to schedule your free call. If it&apos;s
          urgent, message us on{" "}
          <a href={site.whatsappUrl} className="font-semibold text-jade underline">
            WhatsApp
          </a>
          .
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="text-sm font-semibold text-jade hover:underline">
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 rounded-card border border-line bg-paper-raised p-8 shadow-brand">
      {/* Honeypot, hidden from people; bots that fill it are ignored. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className={label}>
          Full name *
          <input type="text" name="name" required autoComplete="name" className={input} />
        </label>
        <label className={label}>
          Phone / WhatsApp *
          <input type="tel" name="phone" required autoComplete="tel" placeholder="+92 3xx xxxxxxx" className={input} />
        </label>
        <label className={label}>
          Email *
          <input type="email" name="email" required autoComplete="email" className={input} />
        </label>
        <label className={label}>
          City
          <input type="text" name="city" autoComplete="address-level2" placeholder="e.g. Lahore" className={input} />
        </label>
        <label className={label}>
          Where do you want to study?
          <Select name="destination" options={consultationForm.destinations} placeholder="Choose a destination" />
        </label>
        <label className={label}>
          Level
          <Select name="level" options={consultationForm.levels} placeholder="Choose a level" />
        </label>
        <label className={label}>
          Field of study
          <input type="text" name="field" placeholder="e.g. MBBS, Computer Science, MBA" className={input} />
        </label>
        <label className={label}>
          Last qualification result
          <input type="text" name="result" placeholder="e.g. 78% in FSc" className={input} />
        </label>
        <label className={label}>
          Target intake
          <Select name="intake" options={consultationForm.intakes} placeholder="Choose an intake" />
        </label>
        <label className={label}>
          Best time to call
          <Select name="callTime" options={consultationForm.callTimes} placeholder="Choose a time" />
        </label>
      </div>

      <label className={label}>
        Anything else we should know?
        <textarea name="message" rows={4} className={`${input} resize-y`} />
      </label>

      {status === "error" && (
        <p className="rounded-lg border border-[#E7B8AE] bg-[#FBEFEC] px-4 py-3 text-sm text-[#8A3423]" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-jade px-5 py-3 text-sm font-semibold text-white shadow-brand transition hover:bg-jade-deep disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending" ? "Sending…" : "Request my free consultation →"}
      </button>
      <p className="text-xs text-muted">
        We&apos;ll only use your details to arrange and follow up on your consultation. See our{" "}
        <Link href="/privacy" className="underline">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
