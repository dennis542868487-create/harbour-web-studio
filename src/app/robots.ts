import type { MetadataRoute } from "next";
import { business } from "../../site-config/business";
import { robotsConfig } from "../../site-config/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: robotsConfig.allow,
      disallow: ["/admin", "/studio"],
    },
    sitemap: `${business.siteUrl}/sitemap.xml`,
    host: business.siteUrl,
  };
}
