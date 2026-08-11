import { MetadataRoute } from "next";
import { destinations, packages } from "@/data/sample-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://travelwithchamru.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/itineraries",
    "/destinations",
    "/packages",
    "/vehicle",
    "/reviews",
    "/gallery",
    "/travel-info",
    "/contact",
    "/faq",
    "/why-choose-us",
    "/weather",
    "/instant-inquiry",
    "/ai-trip-planner",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const destinationRoutes = destinations.map((d) => ({
    url: `${siteUrl}/destinations/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const packageRoutes = packages.map((p) => ({
    url: `${siteUrl}/packages/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...destinationRoutes, ...packageRoutes];
}
