"use client";

import { Button } from "@/components/ui/Button";
import { WolfCrest } from "@/components/ui/WolfCrest";
import { SITE } from "@/lib/constants";

export function CtaBanner() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/50 via-forest-mid/25 to-forest-deep/50" />
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-40" />
      <div className="absolute inset-0 wolf-pattern-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <WolfCrest size={44} className="text-forest-glow mx-auto mb-6" />
        <p className="text-[11px] uppercase tracking-[0.25em] text-forest-glow mb-4">
          Limited Onboarding Spots
        </p>
        <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-4">
          Stop guessing. Start closing.
        </h2>
        <p className="text-silver-muted text-lg mb-8 max-w-xl mx-auto">
          We only onboard a handful of contractors per market. Claim your territory before a competitor does.
        </p>
        <Button
          size="lg"
          className="px-10"
          onClick={() =>
            document.getElementById("book-call")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {SITE.cta}
        </Button>
      </div>
    </section>
  );
}
