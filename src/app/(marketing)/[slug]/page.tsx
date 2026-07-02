import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TradeLandingPageView } from "@/components/marketing/TradeLandingPage";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import {
  getTradeLandingPage,
  TRADE_LANDING_SLUGS,
} from "@/lib/trade-landing-pages";
import { SITE_URL } from "@/lib/site-metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return TRADE_LANDING_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getTradeLandingPage(slug);
  if (!page) return {};

  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: `${SITE_URL}/${slug}` },
    openGraph: {
      title: page.meta.title,
      description: page.meta.description,
      url: `${SITE_URL}/${slug}`,
    },
  };
}

export default async function TradeLandingRoute({ params }: PageProps) {
  const { slug } = await params;
  const page = getTradeLandingPage(slug);
  if (!page) notFound();

  return (
    <>
      <FaqJsonLd items={page.faq} />
      <TradeLandingPageView page={page} />
    </>
  );
}
