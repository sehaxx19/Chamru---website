import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://travelwithchamru.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Travel with Chamru | Your Trusted Travel Partner in Sri Lanka",
    template: "%s | Travel with Chamru",
  },
  description:
    "Discover Sri Lanka with your trusted travel partner. Private tours, flexible itineraries, fair pricing, no hidden charges. Sigiriya, Ella, Yala, Galle Fort and more, planned around you.",
  keywords: [
    "Sri Lanka tour",
    "Sri Lanka driver guide",
    "private tours Sri Lanka",
    "Sri Lanka travel partner",
    "Sigiriya tour",
    "Sri Lanka itinerary",
    "Colombo tour guide",
  ],
  authors: [{ name: "Travel with Chamru" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Travel with Chamru",
    title: "Travel with Chamru | Your Trusted Travel Partner in Sri Lanka",
    description:
      "Discover Sri Lanka with your trusted travel partner. Private tours, flexible itineraries, fair pricing, no hidden charges.",
    images: [
      {
        url: "/images/hero/homepage-hero.jpg",
        width: 1200,
        height: 800,
        alt: "Sigiriya Rock Fortress, Sri Lanka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel with Chamru | Your Trusted Travel Partner in Sri Lanka",
    description:
      "Discover Sri Lanka with your trusted travel partner. Private tours, flexible itineraries, fair pricing, no hidden charges.",
    images: ["/images/hero/homepage-hero.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Travel with Chamru",
    description:
      "Private driver-guided tours across Sri Lanka. Flexible itineraries, fair pricing, no hidden charges.",
    url: siteUrl,
    image: `${siteUrl}/images/hero/homepage-hero.jpg`,
    telephone: "+94707733647",
    email: "travelwithchamru@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Colombo",
      addressCountry: "LK",
    },
    areaServed: {
      "@type": "Country",
      name: "Sri Lanka",
    },
    priceRange: "$$",
    sameAs: ["https://www.facebook.com/share/1DdUfhcM65/?mibextid=wwXIfr"],
  };

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-sand-50 text-ink-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
