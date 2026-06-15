"use client";

import { Button } from "@/components/ui/Button";
import { WolfPortraitArt } from "@/components/ui/WolfPortraitArt";
import { FOUNDING_PARTNER, SITE, TRUST_POINTS } from "@/lib/constants";

export function Hero() {
  function scrollToBook() {
    document.getElementById("book-call")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="relative min-h-[92vh] flex items-center hero-gradient overflow-hidden">
      <div className="absolute inset-0 grain-overlay pointer-events-none" />

      <div className="absolute inset-y-0 right-0 w-[55%] max-w-[600px] pointer-events-none hidden md:block">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/80" />
        <WolfPortraitArt className="absolute bottom-0 right-0 w-full h-auto opacity-90 translate-x-[8%]" />
      </div>

      <div className="absolute top-1/3 left-[-10%] w-[400px] h-[400px] bg-forest-mid/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-forest-mid/30 bg-forest-mid/10 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-glow animate-pulse" />
              <span className="text-[11px] text-forest-glow tracking-wide uppercase">
                For Canadian Home Service Contractors
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-light leading-[1.08] tracking-tight mb-6">
              <span className="text-gradient-silver">More Estimates.</span>
              <br />
              <span className="text-gradient-silver">More Jobs.</span>
              <br />
              <span className="text-gradient-forest">Less Guesswork.</span>
            </h1>

            <p className="text-silver-muted text-lg sm:text-xl leading-relaxed max-w-lg mb-8">
              {SITE.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button size="lg" onClick={scrollToBook} className="text-base px-8">
                {SITE.cta}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Pricing
              </Button>
            </div>

            <p className="text-[12px] text-silver-dim flex items-center gap-2">
              <svg className="w-4 h-4 text-forest-glow shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8L6 11L13 4" />
              </svg>
              Free strategy call · {FOUNDING_PARTNER.slotsRemaining} founding partner spots · 30-day guarantee
            </p>
          </div>

          <div className="hidden lg:block animate-fade-up">
            <div className="glass-card glow-green p-8 rounded-sm">
              <p className="text-[11px] uppercase tracking-[0.2em] text-silver-dim mb-6">
                What You Can Expect
              </p>
              <div className="grid grid-cols-2 gap-6">
                {TRUST_POINTS.map((stat) => (
                  <div key={stat.label} className="border-l-2 border-forest-mid/40 pl-4">
                    <p className="font-display text-3xl text-foreground tabular-nums mb-1">
                      {stat.value}
                    </p>
                    <p className="text-[11px] text-silver-dim uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-silver/10">
                <p className="text-[13px] text-silver-muted leading-relaxed">
                  Now accepting{" "}
                  <span className="text-foreground">founding partners</span> across Canada —{" "}
                  {formatPrice(FOUNDING_PARTNER.introPrice)} first month, then{" "}
                  {formatPrice(FOUNDING_PARTNER.regularPrice)}/mo.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden mt-12 grid grid-cols-2 gap-6">
          {TRUST_POINTS.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-2xl text-foreground tabular-nums">{stat.value}</p>
              <p className="text-[10px] text-silver-dim uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
  }).format(price);
}
