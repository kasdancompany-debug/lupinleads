"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { ProductMockup } from "@/components/marketing/ProductMockup";
import { scrollToBook } from "@/lib/marketing";
import { CTAS } from "@/lib/constants";

const PILLARS = [
  {
    title: "Capture",
    description: "Meta Ads drive homeowners to branded forms with project details — not shared lead lists.",
    metric: "Exclusive leads",
  },
  {
    title: "Respond",
    description: "Instant alerts hit your phone and CRM. AI scores every lead so you call the hot ones first.",
    metric: "< 5 min alerts",
  },
  {
    title: "Close",
    description: "Pipeline tracks every estimate from first click to signed job. Monthly reports prove ROI.",
    metric: "Full visibility",
  },
];

export function ProductShowcase() {
  return (
    <section className="section-elevated py-32 lg:py-40 relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient pointer-events-none opacity-60" />
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <ScrollReveal direction="left">
            <p className="text-[11px] uppercase tracking-[0.25em] text-forest-glow mb-4">
              The growth system
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
              One platform from{" "}
              <span className="text-gradient-forest">ad click</span> to booked job
            </h2>
            <p className="text-silver-muted text-lg leading-relaxed mb-10 max-w-lg">
              Stop juggling spreadsheets, shared leads, and guesswork. LUPIN LEADS is the contractor
              growth stack — ads, capture, follow-up, and reporting in one place.
            </p>

            <div className="space-y-4 mb-10">
              {PILLARS.map((pillar, i) => (
                <ScrollReveal key={pillar.title} delay={i * 100}>
                  <div className="flex gap-4 p-4 rounded-xl border border-silver/10 bg-black-surface/50 hover:border-forest-mid/30 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-forest-mid/20 border border-forest-mid/30 flex items-center justify-center text-forest-glow font-bold text-sm shrink-0 group-hover:bg-forest-mid/30 transition-colors">
                      {i + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{pillar.title}</h3>
                        <span className="text-[10px] uppercase tracking-wider text-forest-glow bg-forest-mid/15 px-2 py-0.5 rounded border border-forest-mid/25">
                          {pillar.metric}
                        </span>
                      </div>
                      <p className="text-sm text-silver-muted leading-relaxed">{pillar.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <Button size="lg" emphasis onClick={scrollToBook}>
              {CTAS.primary}
            </Button>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={150}>
            <ProductMockup className="mx-auto max-w-md lg:max-w-none lg:translate-x-4" />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
