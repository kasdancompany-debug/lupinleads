import { FOUNDING_PARTNER } from "@/lib/constants";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: FOUNDING_PARTNER.currency,
    minimumFractionDigits: 0,
  }).format(price);
}

/** Shared pricing hook: $299 first month · then $499/mo + ad spend */
export function formatFoundingPriceLine(separator: "·" | "•" = "·") {
  return `${formatPrice(FOUNDING_PARTNER.introPrice)} first month ${separator} then ${formatPrice(FOUNDING_PARTNER.regularPrice)}/mo + ad spend`;
}

export function scrollToBook() {
  document.getElementById("book-call")?.scrollIntoView({ behavior: "smooth" });
}

export function scrollToPricing() {
  document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
}
