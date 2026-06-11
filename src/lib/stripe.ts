import Stripe from "stripe";

let stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-05-27.dahlia",
      typescript: true,
    });
  }
  return stripe;
}

export function getPriceIdForPlan(planId: string): string | null {
  const priceMap: Record<string, string | undefined> = {
    starter: process.env.STRIPE_PRICE_SCOUT,
    growth: process.env.STRIPE_PRICE_ALPHA,
    scale: process.env.STRIPE_PRICE_PACK,
    scout: process.env.STRIPE_PRICE_SCOUT,
    alpha: process.env.STRIPE_PRICE_ALPHA,
    pack: process.env.STRIPE_PRICE_PACK,
  };
  return priceMap[planId] ?? null;
}
