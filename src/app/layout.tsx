import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Montserrat } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/config/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
// Editorial serif for headlines (the artsyndicates.co reference uses Fraunces).
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});
// Echoes the geometric, wide-tracked lettering of the Noxel logo — used for small labels only.
const montserrat = Montserrat({ subsets: ["latin"], weight: ["500"], variable: "--font-montserrat", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — B2B Apparel Sourcing & Manufacturing`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Made for Brands. Built for Scale.`,
    description: site.description,
    url: "/",
    images: [{ url: "/brand/og-image.jpg", width: 1200, height: 630, alt: "Noxel Apparel — Precision Built" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Made for Brands. Built for Scale.`,
    description: site.description,
    images: ["/brand/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/brand/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/brand/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#102a4b",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  slogan: site.tagline,
  url: site.url,
  logo: `${site.url}/brand/icon-512.png`,
  description: site.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${montserrat.variable}`}>
      <head>
        {/* Enables reveal animations only when JS is available */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-dvh">
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
