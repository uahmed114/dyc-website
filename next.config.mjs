/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build to plain HTML/CSS/JS in out/ so it can be uploaded to Hostinger shared hosting.
  output: "export",
  // Each page becomes folder/index.html, which Apache/LiteSpeed serves for /folder/ without rewrites.
  trailingSlash: true,
  images: {
    // No Next.js server to resize images on the fly, so serve them as-is.
    unoptimized: true,
  },
};

export default nextConfig;
