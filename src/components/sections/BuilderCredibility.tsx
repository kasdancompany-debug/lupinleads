"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { SectionShell } from "@/components/motion/SectionShell";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { LupinMark } from "@/components/ui/LupinMark";
import { Button } from "@/components/ui/Button";
import { BUILDER_CREDIBILITY, CTAS } from "@/lib/constants";
import { scrollToBook } from "@/lib/marketing";

export function BuilderCredibility() {
  const { eyebrow, title, paragraphs, pillars, pullQuote, assurance } = BUILDER_CREDIBILITY;

  return (
    <SectionShell id="behind-lupin" variant="charcoal">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
        <div className="lg:col-span-7 xl:col-span-7">
          <FadeIn>
            <SectionIntro
              eyebrow={eyebrow}
              title={title}
              variant="display"
              className="!mb-6"
            />
          </FadeIn>

          <FadeIn delay={0.12}>
            <div className="editorial-prose max-w-none mb-10 lg:mb-12">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.18}>
            <div className="hidden lg:block">
              <blockquote className="editorial-pullquote m-0 max-w-xl">
                &ldquo;{pullQuote}&rdquo;
              </blockquote>
            </div>
          </FadeIn>
        </div>

        <div className="lg:col-span-5 xl:col-span-5 space-y-8">
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-full border border-forest-mid/30 bg-forest-mid/10 flex items-center justify-center shrink-0">
                <LupinMark size={28} className="opacity-90" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Who builds Lupin</p>
                <p className="text-xs text-silver-dim mt-0.5">
                  Marketing, product, and client work — not outsourced
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.14}>
            <div className="space-y-0">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="editorial-pillar pb-5 last:pb-0">
                  <h3 className="text-sm font-semibold text-foreground mb-1.5 tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-silver-muted leading-relaxed">{pillar.body}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <blockquote className="editorial-pullquote m-0 lg:hidden">
              &ldquo;{pullQuote}&rdquo;
            </blockquote>
          </FadeIn>

          <FadeIn delay={0.22}>
            <aside className="editorial-aside rounded-xl p-6 lg:p-7">
              <p className="text-[11px] uppercase tracking-[0.18em] text-silver-dim mb-4">
                Before you commit
              </p>
              <ul className="space-y-3 m-0 p-0 list-none">
                {assurance.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-silver-muted leading-relaxed">
                    <span
                      className="mt-2 w-1 h-1 rounded-full bg-forest-glow shrink-0"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-silver/10">
                <Button size="md" emphasis onClick={scrollToBook} className="w-full sm:w-auto">
                  {CTAS.primary}
                </Button>
              </div>
            </aside>
          </FadeIn>
        </div>
      </div>
    </SectionShell>
  );
}
