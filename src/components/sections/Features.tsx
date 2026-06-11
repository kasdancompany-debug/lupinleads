import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WolfWatermark } from "@/components/ui/WolfWatermark";
import { FEATURES } from "@/lib/constants";

const icons: Record<string, ReactNode> = {
  target: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  ),
  map: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 6L9 3L15 6L21 3V18L15 21L9 18L3 21V6Z" />
      <path d="M9 3V18M15 6V21" />
    </svg>
  ),
  bolt: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
    </svg>
  ),
  chart: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 20H21M7 16V10M12 16V6M17 16V13" />
    </svg>
  ),
  shield: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L4 6V12C4 17 8 21 12 22C16 21 20 17 20 12V6L12 2Z" />
    </svg>
  ),
  users: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="9" cy="8" r="4" />
      <path d="M3 20C3 16.5 5.5 14 9 14C12.5 14 15 16.5 15 20" />
      <circle cx="17" cy="9" r="3" />
      <path d="M21 20C21 17 19 15 17 15" />
    </svg>
  ),
};

export function Features() {
  return (
    <section id="features" className="py-28 bg-black relative overflow-hidden">
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-50" />
      <WolfWatermark className="absolute -right-24 top-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none opacity-60" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="How It Works"
          title="From click to closed job"
          description="Meta Ads bring the leads. AI follows up instantly. Your CRM keeps every estimate on track."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <article
              key={feature.title}
              className="glass-card rounded-sm p-8 group hover:border-forest-mid/30 transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-sm border border-forest-mid/30 flex items-center justify-center text-forest-glow mb-6 group-hover:border-forest-light/50 group-hover:text-forest-light transition-colors">
                {icons[feature.icon]}
              </div>
              <h3 className="font-display text-xl text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-silver-muted leading-relaxed text-sm">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
