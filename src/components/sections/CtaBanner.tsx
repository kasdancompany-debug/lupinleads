"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { CTAS } from "@/lib/constants";
import { formatFoundingPriceLine, scrollToBook } from "@/lib/marketing";

interface CtaBannerProps {
  variant?: "default" | "compact";
}

export function CtaBanner({ variant = "default" }: CtaBannerProps) {
  const compact = variant === "compact";
  const priceLine = formatFoundingPriceLine("·");

  return (
    <section className={`relative section-surface ${compact ? "py-12" : "py-16 lg:py-20"}`}>
      <div className="absolute inset-0 section-glow-top pointer-events-none opacity-50" />
      <div className="absolute top-0 left-0 right-0 section-divider pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <FadeIn>
          <div className="value-card rounded-2xl border-forest-mid/35 glow-green p-8 lg:p-10 text-center">
            {!compact && (
              <p className="section-eyebrow !mb-3">Ready to start?</p>
            )}
            <h3
              className={`font-bold text-foreground tracking-tight mb-2 ${
                compact ? "text-xl" : "text-2xl lg:text-3xl"
              }`}
            >
              Turn ad clicks into booked jobs
            </h3>
            <p className="text-silver-muted text-sm lg:text-base leading-relaxed max-w-xl mx-auto mb-6">
              {priceLine}. Book a free strategy call — we&apos;ll map your market and confirm fit
              before you commit.
            </p>
            <Button size="lg" emphasis onClick={scrollToBook} className="w-full sm:w-auto sm:min-w-[280px]">
              {CTAS.primary}
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
