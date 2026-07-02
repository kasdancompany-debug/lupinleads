import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-metadata";
import { TRADE_LANDING_SLUGS } from "@/lib/trade-landing-pages";

const ROUTES: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"];
}[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/book", priority: 0.9, changeFrequency: "weekly" },
  ...TRADE_LANDING_SLUGS.map((slug) => ({
    path: `/${slug}`,
    priority: 0.85,
    changeFrequency: "monthly" as const,
  })),
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
