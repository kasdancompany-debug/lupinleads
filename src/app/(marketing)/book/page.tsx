import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { CalendlyBooking } from "@/components/sections/CalendlyBooking";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { getCalendlyUrl, isCalendlyConfigured } from "@/lib/calendly";
import { CTAS } from "@/lib/constants";
import { SITE_URL } from "@/lib/site-metadata";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: CTAS.primary,
  description:
    "Book a free lead strategy call with LUPIN LEADS. We'll review your trade, market, and whether Facebook and Instagram ads make sense for your contracting business.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE_URL}/book` },
};

export default function BookPage() {
  if (!isCalendlyConfigured()) {
    redirect("/#book-call");
  }

  const calendlyUrl = getCalendlyUrl();

  return (
    <div className="page-container py-10 sm:py-14 max-w-3xl">
      <SectionIntro
        align="center"
        eyebrow={CTAS.primary}
        title="Pick a time that works"
        description="15 minutes to review your trade, market, and whether founding partner pricing is a fit."
        className="max-w-lg mx-auto !mb-10"
      />

      <CalendlyBooking calendlyUrl={calendlyUrl} compact />

      <p className="text-center mt-8 text-sm text-silver-dim">
        <Link href="/#book-call" className="text-forest-glow hover:text-forest-light">
          Prefer a callback? Send a message instead
        </Link>
        {" · "}
        <Link href="/#pricing" className="text-silver-muted hover:text-foreground">
          View pricing
        </Link>
      </p>
    </div>
  );
}
