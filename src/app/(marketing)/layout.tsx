import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { SITE_URL } from "@/lib/site-metadata";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCta } from "@/components/sections/StickyCta";
import { CalendlyBootstrap } from "@/components/marketing/CalendlyBootstrap";
import { OrganizationJsonLd, WebSiteJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: `${SITE.name} — Contractor Leads from Facebook & Instagram Ads`,
  description: SITE.description,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: `${SITE.headlineLead} ${SITE.headlineHighlight}`,
    description: SITE.heroSubheadline,
    url: SITE_URL,
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <FaqJsonLd />
      <CalendlyBootstrap />
      <a
        href="#main-content"
        className="skip-to-content"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="pb-[7.5rem] sm:pb-32 md:pb-0">
        {children}
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
