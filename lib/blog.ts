// Blog posts: one Markdown file per post in content/blog/, written by hand or from the
// admin at /admin (Sveltia CMS, configured in public/admin/config.yml). Read at build time.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const DIR = path.join(process.cwd(), "content/blog");
const WORDS_PER_MINUTE = 220;

export type BlogPost = {
  slug: string;
  title: string;
  /** Title for Google results, if different from the on-page title. */
  seoTitle?: string;
  excerpt: string;
  /** YYYY-MM-DD */
  date: string;
  readTime: string;
  image: string | null;
  /** The rich-text body followed by the post's "Custom HTML" box, ready to render. */
  html: string;
  /** Wording for the "book a call" card at the end of the post, if not the default. */
  cta?: { title: string; body: string };
};

function toDate(value: unknown): string {
  // Unquoted YAML dates arrive as Date objects, quoted ones as strings.
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "").slice(0, 10);
}

function readPost(file: string): (BlogPost & { draft: boolean }) | null {
  const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
  if (!data.title) return null;

  // Tables written in the editor get the same scrolling wrapper as pasted HTML tables.
  const body = (marked.parse(content, { async: false }) as string)
    .replace(/<table>/g, '<div class="post-table"><table>')
    .replace(/<\/table>/g, "</table></div>");
  const html = body + (data.html ?? "");
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;

  return {
    slug: file.replace(/\.md$/, ""),
    title: data.title,
    seoTitle: data.seoTitle || undefined,
    excerpt: data.excerpt ?? "",
    date: toDate(data.date),
    readTime: `${Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))} min read`,
    image: data.image || null,
    html,
    cta: data.ctaTitle ? { title: data.ctaTitle, body: data.ctaBody ?? "" } : undefined,
    draft: Boolean(data.draft),
  };
}

/** Published posts, newest first. Drafts are left out of the site entirely. */
export function getPosts(): BlogPost[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readPost)
    .filter((p): p is BlogPost & { draft: boolean } => p !== null && !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

export function getPost(slug: string): BlogPost | undefined {
  return getPosts().find((p) => p.slug === slug);
}
