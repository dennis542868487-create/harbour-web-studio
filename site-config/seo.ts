import { primaryNavLinks } from "./services";

const coreRoutes = [
  "/",
  ...primaryNavLinks
    .map((item) => item.href)
    .filter((href) => href !== "/"),
] as const;

export const sitemapRoutes = [...new Set([...coreRoutes])];

export const robotsConfig = {
  allow: "/",
};
