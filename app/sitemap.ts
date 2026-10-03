import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
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
    ...getPosts().map((post) => ({ url: `${SITE_URL}/blog/${post.slug}/`, lastModified: post.date })),
  ];
}
