import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "https://lupinleads.com";

const defaultTitle = `${SITE.name} — Contractor Leads from Facebook & Instagram Ads`;

export const rootMetadata: Metadata = {
  title: {
    default: defaultTitle,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "contractor leads",
    "Facebook ads for contractors",
    "Instagram ads contractors",
    "contractor lead generation",
    "Meta ads home services",
    "Canadian contractors",
    "quote requests",
    SITE.name,
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE_URL,
    siteName: SITE.name,
    title: defaultTitle,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon", type: "image/png" }],
  },
};
