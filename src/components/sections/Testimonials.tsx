"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { WolfDivider } from "@/components/ui/WolfDivider";
import { Button } from "@/components/ui/Button";
import { SITE, TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  const hasTestimonials = TESTIMONIALS.length > 0;

  return (
    <section id="testimonials" className="py-28 bg-black-elevated relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 px-6 lg:px-8 pt-0">
        <WolfDivider variant="crest" className="max-w-lg mx-auto" />
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contractor Stories"
          title={hasTestimonials ? "Real results from real trades" : "Stories coming soon"}
          description={
            hasTestimonials
              ? "Hear from contractors who replaced guesswork with a system."
              : "We're collecting testimonials from our founding partners. Yours could be the first."
          }
        />

        {hasTestimonials ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t) => (
              <article
                key={t.name}
                className="glass-card p-8 flex flex-col hover:border-silver/20 transition-colors"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-forest-glow"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M8 1.5L9.8 5.8H14.5L10.8 8.5L12.3 13L8 10.2L3.7 13L5.2 8.5L1.5 5.8H6.2L8 1.5Z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-foreground text-[15px] leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="flex items-center justify-between pt-6 border-t border-silver/8">
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-[12px] text-silver-dim">
                      {t.role}, {t.company}
                    </p>
                  </div>
                  <span className="text-[11px] font-medium text-forest-glow bg-forest-mid/15 px-2.5 py-1 rounded border border-forest-mid/25">
                    {t.result}
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[1, 2].map((slot) => (
              <article
                key={slot}
                className="glass-card p-8 flex flex-col items-center justify-center text-center min-h-[220px] border-dashed border-silver/15"
              >
                <div className="w-12 h-12 rounded-full bg-forest-mid/15 border border-forest-mid/25 flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5 text-forest-glow"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M12 4v16M4 12h16" />
                  </svg>
                </div>
                <p className="text-sm text-silver-muted mb-1">Founding partner slot</p>
                <p className="text-[12px] text-silver-dim">
                  Real contractor story — added after launch
                </p>
              </article>
            ))}
          </div>
        )}

        {!hasTestimonials && (
          <div className="text-center mt-10">
            <Button
              variant="outline"
              onClick={() =>
                document.getElementById("book-call")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {SITE.cta}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
