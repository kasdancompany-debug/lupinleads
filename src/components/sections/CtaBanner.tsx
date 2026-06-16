"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { FOUNDING_PARTNER, CTAS } from "@/lib/constants";
import { scrollToBook, scrollToPricing } from "@/lib/marketing";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: FOUNDING_PARTNER.currency,
    minimumFractionDigits: 0,
  }).format(price);
}

interface CtaBannerProps {
  variant?: "default" | "compact";
}

export function CtaBanner({ variant = "default" }: CtaBannerProps) {
  const compact = variant === "compact";

  return (
    <section className={`relative section-surface ${compact ? "py-12" : "py-16 lg:py-20"}`}>
      <div className="absolute inset-0 section-glow-top pointer-events-none opacity-50" />
      <div className="absolute top-0 left-0 right-0 section-divider pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <FadeIn>
          <div className="value-card rounded-2xl border-forest-mid/35 glow-green p-8 lg:p-10 text-center lg:text-left">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-10 items-center">
              <div>
                {!compact && (
                  <p className="section-eyebrow !mb-3">Ready to start?</p>
                )}
                <h3
                  className={`font-bold text-foreground tracking-tight mb-2 ${
                    compact ? "text-xl" : "text-2xl lg:text-3xl"
                  }`}
                >
                  {formatPrice(FOUNDING_PARTNER.introPrice)} first month — full growth system
                </h3>
                <p className="text-silver-muted text-sm lg:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Then {formatPrice(FOUNDING_PARTNER.regularPrice)}/mo + your Meta ad spend. Book a
                  free strategy call — we&apos;ll map your market and confirm fit before you commit.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
                <Button size="lg" emphasis onClick={scrollToBook} className="w-full sm:min-w-[220px]">
                  {CTAS.primary}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={scrollToPricing}
                  className="w-full sm:min-w-[200px]"
                >
                  {CTAS.pricing}
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
