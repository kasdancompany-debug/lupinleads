"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { WolfMoonscape } from "@/components/ui/WolfMoonscape";
import { Button } from "@/components/ui/Button";
import { CASE_STUDIES, FOUNDING_PARTNER, SITE } from "@/lib/constants";

export function CaseStudies() {
  const hasCaseStudies = CASE_STUDIES.length > 0;

  return (
    <section id="results" className="py-28 bg-black-elevated relative overflow-hidden">
      <WolfMoonscape className="absolute bottom-0 left-0 right-0 w-full h-56 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <SectionHeading
          eyebrow={hasCaseStudies ? "Proven Results" : "Client Results"}
          title={
            hasCaseStudies
              ? "Contractors winning with LUPIN LEADS"
              : "Real results start with our founding partners"
          }
          description={
            hasCaseStudies
              ? "Real numbers from trades that replaced referrals and door-knocking with a predictable system."
              : "We're building our case study library with our first founding partners. Be among the first contractors in your market with a documented win."
          }
        />

        {hasCaseStudies ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {CASE_STUDIES.map((study, index) => (
              <article
                key={study.client}
                className="glass-card rounded-sm overflow-hidden group hover:border-forest-mid/20 transition-all duration-500"
              >
                <div className="h-1 bg-gradient-to-r from-forest-deep via-forest-mid to-forest-glow opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs tracking-[0.2em] uppercase text-forest-glow">
                      {study.industry}
                    </span>
                    <span className="text-silver-dim text-xs font-mono">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl text-foreground mb-2">
                    {study.client}
                  </h3>
                  <p className="text-forest-light font-display text-lg mb-4">
                    {study.headline}
                  </p>
                  <p className="text-silver-muted text-sm leading-relaxed mb-8">
                    {study.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-silver/10">
                    {study.metrics.map((metric) => (
                      <div key={metric.label}>
                        <p className="font-display text-xl text-foreground">
                          {metric.value}
                        </p>
                        <p className="text-[10px] text-silver-dim uppercase tracking-wider mt-1">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center">
            <div className="glass-card p-10 rounded-sm border-forest-mid/20">
              <p className="text-[11px] uppercase tracking-[0.2em] text-forest-glow mb-4">
                {FOUNDING_PARTNER.slotsRemaining} of {FOUNDING_PARTNER.slotsTotal} spots available
              </p>
              <p className="text-silver-muted text-sm leading-relaxed mb-8">
                Founding partners get priority campaign build, direct input on our platform, and
                the chance to be featured here with real metrics — leads, estimates booked, and
                jobs closed from your market.
              </p>
              <Button
                size="lg"
                onClick={() =>
                  document.getElementById("book-call")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {SITE.cta}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
