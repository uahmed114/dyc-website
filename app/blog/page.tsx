import Link from "next/link";
import PageHero from "@/components/PageHero";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { blogPosts } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Study Abroad Blog for Pakistani Students",
  description:
    "Guides for Pakistani students on studying in China and Europe: IELTS requirements, CSC and CPEC scholarships, admissions and visas.",
  path: "/blog/",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes on studying in China"
        body="Scholarship breakdowns, application tips, and answers to the questions we hear most often."
      />
      <section className="py-[84px]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 px-8 md:grid-cols-2">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-card border border-line bg-paper-raised transition hover:border-jade"
            >
              <ImagePlaceholder
                src={post.image}
                alt={post.title}
                label="Blog cover image"
                dimensions="800 × 450"
                className="aspect-video w-full rounded-none"
              />
              <div className="flex flex-1 flex-col gap-2.5 p-6">
                <div className="font-mono text-xs text-muted">
                  {post.date} · {post.readTime}
                </div>
                <h3 className="text-lg font-bold text-ink group-hover:text-jade">
                  {post.title}
                </h3>
                <p className="text-sm text-ink-soft">{post.excerpt}</p>
                <span className="mt-auto pt-2 text-sm font-semibold text-jade">Read more →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
