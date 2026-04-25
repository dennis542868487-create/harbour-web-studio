import type { MetadataRoute } from "next";
import { business } from "../../site-config/business";
import { sitemapRoutes } from "../../site-config/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapRoutes.map((route) => ({
    url: route === "/" ? business.siteUrl : `${business.siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
