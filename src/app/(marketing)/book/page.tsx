import Link from "next/link";
import { CalendlyBooking } from "@/components/sections/CalendlyBooking";
import { SITE, CTAS } from "@/lib/constants";

export const dynamic = "force-dynamic";

export const metadata = {
  title: `${CTAS.primary} — ${SITE.name}`,
  description: "Pick a time for your free strategy call with LUPIN LEADS.",
};

export default function BookPage() {
  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-silver/10">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="font-display text-xl text-foreground tracking-wide">
            {SITE.name}
          </Link>
          <Link
            href="/#pricing"
            className="text-[13px] text-silver-muted hover:text-foreground transition-colors"
          >
            View pricing
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8 text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-forest-glow mb-3">
            Free strategy call
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-foreground mb-3">
            Pick a time that works
          </h1>
          <p className="text-silver-muted text-sm max-w-lg mx-auto">
            15 minutes to review your trade, market, and whether founding partner pricing is a fit.
          </p>
        </div>

        <CalendlyBooking />
      </main>
    </div>
  );
}
