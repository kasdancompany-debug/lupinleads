import Link from "next/link";
import { BRAND_ASSETS } from "@/lib/brand";
import { BrandWordmark } from "@/components/ui/BrandWordmark";
import { LupinMark } from "@/components/ui/LupinMark";

type SiteLogoProps = {
  href?: string;
  className?: string;
  /** Dark site header/footer vs light backgrounds (PDF, email). */
  variant?: "dark" | "light" | "mark";
  /** Nav is compact; footer includes tagline. */
  layout?: "nav" | "footer";
  priority?: boolean;
};

export function SiteLogo({
  href = "/",
  className = "",
  variant = "dark",
  layout = "nav",
  priority = false,
}: SiteLogoProps) {
  const isMarkOnly = variant === "mark";
  const isLight = variant === "light";
  const markSize = layout === "footer" ? 40 : 36;
  const wordmarkSize = layout === "footer" ? "lg" : "md";
  const label = `Lupin Leads — ${BRAND_ASSETS.tagline}`;

  const inner = isMarkOnly ? (
    <LupinMark size={40} priority={priority} />
  ) : (
    <span className="inline-flex items-center gap-2.5 sm:gap-3 min-w-0">
      <LupinMark size={markSize} priority={priority} />
      <BrandWordmark
        variant={isLight ? "light" : "dark"}
        showTagline={layout === "footer"}
        size={wordmarkSize}
      />
    </span>
  );

  if (!href) {
    return (
      <span className={`inline-flex items-center min-w-0 ${className}`} aria-label={label}>
        {inner}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`group inline-flex items-center min-w-0 opacity-[0.98] transition-opacity duration-300 hover:opacity-100 ${className}`}
      aria-label={label}
    >
      {inner}
    </Link>
  );
}
