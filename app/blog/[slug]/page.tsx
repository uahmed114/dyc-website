import { notFound } from "next/navigation";
import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { blogPosts } from "@/lib/content";
import { PrimaryButton } from "@/components/Buttons";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  return { title: post ? `${post.title} | Drop Your Case` : "Blog | Drop Your Case" };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <article className="py-16">
      <div className="mx-auto max-w-[720px] px-8">
        <Link href="/blog" className="text-sm font-semibold text-jade">
          ← Back to blog
        </Link>
        <div className="mt-5 font-mono text-xs text-muted">
          {post.date} · {post.readTime}
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
        <div className="mt-8 flex flex-col gap-5 text-[16px] leading-relaxed text-ink-soft">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <div className="mt-12 rounded-card border border-line bg-paper-raised p-7 text-center">
          <h3 className="text-lg font-bold text-jade">Have a question about your own case?</h3>
          <p className="mt-2 text-sm text-ink-soft">
            Get a free read on your eligibility in a 15-minute call.
          </p>
          <PrimaryButton className="mt-5">Book a Free Call →</PrimaryButton>
        </div>
      </div>
    </article>
  );
}
