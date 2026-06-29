import { SITE } from "@/lib/constants";
import { SITE_URL } from "@/lib/site-metadata";

export const LEGAL = {
  companyName: SITE.name,
  contactEmail: SITE.email,
  siteUrl: SITE_URL,
  jurisdiction: "Ontario, Canada",
  lastUpdated: "June 15, 2026",
} as const;
