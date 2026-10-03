import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { blogPosts, site } from "@/lib/content";
import { PrimaryButton } from "@/components/Buttons";
import { JsonLd, SITE_URL, pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Blog" };
  const meta = pageMeta({ title: post.seoTitle ?? post.title, description: post.excerpt, path: `/blog/${post.slug}/` });
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: post.date,
      ...(post.image ? { images: [{ url: post.image, alt: post.title }] } : {}),
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <article className="py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          url: `${SITE_URL}/blog/${post.slug}/`,
          ...(post.image ? { image: `${SITE_URL}${post.image}` } : {}),
          author: { "@type": "Organization", name: site.name, url: SITE_URL },
          publisher: { "@type": "Organization", name: site.name, logo: `${SITE_URL}${site.logo.full}` },
        }}
      />
      <div className="mx-auto max-w-[720px] px-8">
        <Link href="/blog" className="text-sm font-semibold text-jade">
          ← Back to blog
        </Link>
        <div className="mt-5 font-mono text-xs text-muted">
          <time dateTime={post.date}>{post.date}</time> · {post.readTime}
        </div>
        <h1 className="mt-3 text-[clamp(28px,4vw,40px)] font-semibold leading-tight text-ink">
          {post.title}
        </h1>
        <ImagePlaceholder
          src={post.image}
          alt={post.title}
          label="Blog cover image"
          dimensions="1200 × 630"
          className="mt-8 aspect-video w-full"
        />
        {post.html ? (
          // Our own article files (content/blog/), read at build time.
          <div
            className="post-body mt-8"
            dangerouslySetInnerHTML={{ __html: readFileSync(path.join(process.cwd(), "content/blog", post.html), "utf8") }}
          />
        ) : (
          <div className="mt-8 flex flex-col gap-5 text-[16px] leading-relaxed text-ink-soft">
            {post.body?.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}
        <div className="mt-12 rounded-card border border-line bg-paper-raised p-7 text-center">
          <h3 className="text-lg font-bold text-jade">{post.cta?.title ?? "Have a question about your own case?"}</h3>
          <p className="mt-2 text-sm text-ink-soft">
            {post.cta?.body ?? "Get a free read on your eligibility in a 15-minute call."}
          </p>
          <PrimaryButton className="mt-5">Book a Free Call →</PrimaryButton>
        </div>
      </div>
    </article>
  );
}
