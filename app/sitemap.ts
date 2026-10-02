import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

// Generated at build time as /sitemap.xml. Add new pages here.
const pages = [
  "/",
  "/study-in-china/",
  "/study-in-hungary/",
  "/destinations/",
  "/universities/",
  "/scholarships/",
  "/about/",
  "/apply/",
  "/blog/",
  "/privacy/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...blogPosts.map((post) => ({ url: `${SITE_URL}/blog/${post.slug}/`, lastModified: post.date })),
  ];
}
