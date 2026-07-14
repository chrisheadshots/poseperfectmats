import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/components/cart/CartProvider";
import { MetaPixel } from "@/components/MetaPixel";
import { ScrollToHash } from "@/components/ScrollToHash";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/copy/personas";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const seoDescription = `${SITE.heroSubheadline} Shop authentic PosePerfect Mat™ products powered by Fail Up Inc., with Standard, Junior, bundles, and verified Loox social proof.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default:
      "PosePerfect Mat™ — The Posing System for Professional Photographers",
    template: "%s · PosePerfect Mat™",
  },
  description: seoDescription,
  applicationName: SITE.name,
  authors: [{ name: "Fail Up Inc." }, { name: "Chris Headshots" }],
  creator: "Fail Up Inc.",
  publisher: "Fail Up Inc.",
  category: "Photography equipment",
  keywords: [
    "PosePerfect Mat",
    "PosePerfect Mat™",
    "posing mat for photographers",
    "headshot posing guide",
    "school photography mat",
    "photo booth positioning mat",
    "Chris Headshots",
    "Fail Up Inc",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "PosePerfect Mat™ — The Posing System for Professional Photographers",
    description: seoDescription,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "PosePerfect Mat™ — The Posing System for Professional Photographers",
    description: SITE.heroSubheadline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "ai-content-declaration": "human-created marketing site with structured product data",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <CartProvider>
          <JsonLd />
          <MetaPixel />
          <ScrollToHash />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
