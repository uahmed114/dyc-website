import type { Metadata } from "next";
// Fonts are self-hosted from npm (no build-time call to Google Fonts).
// Fraunces variable includes the optical-size axis; Public Sans for body;
// IBM Plex Mono for figures and labels.
import "@fontsource-variable/fraunces";
import "@fontsource/public-sans/400.css";
import "@fontsource/public-sans/500.css";
import "@fontsource/public-sans/600.css";
import "@fontsource/public-sans/700.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Script from "next/script";
import { site } from "@/lib/content";
import { JsonLd, SHARE_IMAGE, SITE_URL } from "@/lib/seo";

// Google tag carried over from the WordPress site, so Analytics history continues
// (and Search Console stays verified if it was verified through Analytics).
const GOOGLE_TAG_ID = "GT-5TCMCXNK";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Study in China & Europe for Pakistani Students | Drop Your Case",
    template: "%s | Drop Your Case",
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    locale: "en_PK",
    type: "website",
    images: [SHARE_IMAGE],
  },
  twitter: { card: "summary_large_image", images: [SHARE_IMAGE.url] },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: site.name,
  url: SITE_URL,
  logo: `${SITE_URL}${site.logo.full}`,
  description: site.description,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot 252, Suite B, Street 6, I-9/2",
    addressLocality: "Islamabad",
    addressCountry: "PK",
  },
  sameAs: Object.values(site.social).filter((url) => url.startsWith("http")),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <JsonLd data={organization} />
        <Nav />
        {children}
        <Footer />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`} strategy="afterInteractive" />
        <Script id="google-tag" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","${GOOGLE_TAG_ID}");`}
        </Script>
      </body>
    </html>
  );
}
