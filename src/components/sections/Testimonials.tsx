import { SectionHeading } from "@/components/ui/SectionHeading";
import { WolfDivider } from "@/components/ui/WolfDivider";
import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  return (
    <section id="testimonials" className="py-28 bg-black-elevated relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 px-6 lg:px-8 pt-0">
        <WolfDivider variant="crest" className="max-w-lg mx-auto" />
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contractor Stories"
          title="Real results from real trades"
          description="Don't take our word for it — hear from contractors who replaced guesswork with a system."
        />

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
      </div>
    </section>
  );
}
