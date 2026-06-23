import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendlyBooking } from "@/components/sections/CalendlyBooking";
import { SiteLogo } from "@/components/ui/SiteLogo";
import { getCalendlyUrl, isCalendlyConfigured } from "@/lib/calendly";
import { CTAS } from "@/lib/constants";

export const dynamic = "force-dynamic";

export const metadata = {
  title: CTAS.primary,
  description:
    "Book a free lead strategy call with LUPIN LEADS. We'll review your trade, market, and whether Facebook and Instagram ads make sense for your contracting business.",
  robots: { index: true, follow: true },
};

export default function BookPage() {
  if (!isCalendlyConfigured()) {
    redirect("/#book-call");
  }

  const calendlyUrl = getCalendlyUrl();

  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-silver/10">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-5 flex items-center justify-between gap-4">
          <SiteLogo size={32} nameClassName="font-display text-lg sm:text-xl text-foreground tracking-[0.08em]" />
          <Link
            href="/#pricing"
            className="text-[13px] text-silver-muted hover:text-foreground transition-colors shrink-0 min-h-[44px] flex items-center"
          >
            View pricing
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 sm:px-6 py-10 sm:py-12">
        <div className="mb-8 text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-forest-glow mb-3">
            {CTAS.primary}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-foreground mb-3">
            Pick a time that works
          </h1>
          <p className="text-silver-muted text-sm max-w-lg mx-auto">
            15 minutes to review your trade, market, and whether founding partner pricing is a fit.
          </p>
        </div>

        <CalendlyBooking calendlyUrl={calendlyUrl} />

        <p className="text-center mt-8 text-sm text-silver-dim">
          <Link href="/#book-call" className="text-forest-glow hover:text-forest-light">
            Prefer a callback? Send a message instead
          </Link>
        </p>
      </main>
    </div>
  );
}
