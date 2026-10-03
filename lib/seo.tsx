import type { Metadata } from "next";
import { site } from "@/lib/content";

export const SITE_URL = "https://dropyourcase.com";

/** Preview image shown when a link is shared (WhatsApp, Facebook, LinkedIn...). 1200 × 630. */
export const SHARE_IMAGE = {
  url: "/images/og.png",
  width: 1200,
  height: 630,
  alt: "Drop Your Case: study in China and Europe for Pakistani students",
};

/**
 * Per-page metadata: title (the layout appends "| Drop Your Case"), meta description,
 * canonical URL and social-share tags. `path` is the page's URL path, e.g. "/study-in-china/".
 */
export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      locale: "en_PK",
      type: "website",
      images: [SHARE_IMAGE],
    },
  };
}

/** Renders schema.org structured data for search engines. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
