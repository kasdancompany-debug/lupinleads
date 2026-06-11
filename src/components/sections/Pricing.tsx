"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PRICING_PLANS, SITE } from "@/lib/constants";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
}

export function Pricing() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  function scrollToBook() {
    document.getElementById("book-call")?.scrollIntoView({ behavior: "smooth" });
  }

  async function handleCheckout(planId: string) {
    setLoadingPlan(planId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      const data = await res.json();

      if (!res.ok) {
        scrollToBook();
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      scrollToBook();
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <section id="pricing" className="py-28 bg-black relative">
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-30" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Invest in predictable growth"
          description="Transparent management fees. No hidden costs. Ad spend billed separately so you control your budget."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {PRICING_PLANS.map((plan) => (
            <article
              key={plan.id}
              className={`
                glass-card rounded-sm p-8 relative transition-all duration-500
                ${plan.highlighted ? "border-forest-mid/40 glow-green lg:-mt-4 lg:pb-12" : ""}
              `}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-forest-mid text-foreground text-[10px] tracking-[0.2em] uppercase px-4 py-1 rounded-sm">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="font-display text-2xl text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-silver-muted text-sm">{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className="font-display text-5xl text-foreground">
                  {formatPrice(plan.price)}
                </span>
                <span className="text-silver-dim text-sm">/{plan.interval}</span>
                <p className="text-[11px] text-silver-dim mt-2">+ ad spend</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <svg
                      className="w-4 h-4 text-forest-glow mt-0.5 shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12L10 17L20 7" />
                    </svg>
                    <span className="text-silver-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                <Button
                  variant={plan.highlighted ? "primary" : "secondary"}
                  className="w-full"
                  onClick={scrollToBook}
                >
                  {SITE.cta}
                </Button>
                <button
                  type="button"
                  className="w-full text-[12px] text-silver-dim hover:text-silver-muted transition-colors"
                  onClick={() => handleCheckout(plan.id)}
                  disabled={loadingPlan === plan.id}
                >
                  {loadingPlan === plan.id ? "Loading..." : "Or start checkout →"}
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center space-y-2">
          <p className="text-silver-muted text-sm">
            30-day satisfaction guarantee on all plans
          </p>
          <p className="text-silver-dim text-[12px]">
            Not sure which plan fits?{" "}
            <a href="#book-call" className="text-forest-glow hover:text-forest-light transition-colors">
              Book a free strategy call
            </a>{" "}
            and we&apos;ll recommend the right fit.
          </p>
        </div>
      </div>
    </section>
  );
}
