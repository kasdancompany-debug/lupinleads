"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

const TRADES = [
  "Roofing",
  "Remodeling",
  "HVAC",
  "Windows & Doors",
  "Landscaping",
  "Electrical",
  "Plumbing",
  "Painting",
];

const TRUST_BADGES = [
  "Exclusive leads — never shared",
  "Canadian contractors only",
  "Month-to-month — no lock-in",
  "30-day satisfaction guarantee",
];

export function TrustBar() {
  return (
    <section className="section-contrast py-10 relative overflow-hidden">
      <div className="absolute inset-0 wolf-pattern-bg opacity-20 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {TRUST_BADGES.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] text-silver-muted border border-silver/15 bg-black-surface/80"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-forest-glow" />
                {badge}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className="text-center text-[10px] uppercase tracking-[0.2em] text-silver-dim mb-5">
            Built for every home-service trade
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {TRADES.map((trade) => (
              <span
                key={trade}
                className="text-sm text-silver-muted/80 hover:text-forest-glow transition-colors"
              >
                {trade}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
