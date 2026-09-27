import Link from "next/link";
import { site } from "@/lib/content";

export function PrimaryButton({
  href = site.whatsappUrl,
  children,
  className = "",
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 rounded-lg bg-jade px-5 py-2.5 text-sm font-semibold text-white shadow-brand transition hover:bg-jade-deep hover:-translate-y-px ${className}`}
    >
      {children}
    </Link>
  );
}

export function GhostButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 rounded-lg border-[1.5px] border-line px-[19px] py-[10.5px] text-sm font-semibold text-ink ${className}`}
    >
      {children}
    </Link>
  );
}
