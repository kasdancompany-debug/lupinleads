import { BRAND_ASSETS } from "@/lib/brand";

type BrandWordmarkProps = {
  variant?: "dark" | "light";
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
};

const SIZE_CLASS = {
  sm: "text-[1.0625rem] sm:text-[1.125rem]",
  md: "text-[1.125rem] sm:text-[1.2rem]",
  lg: "text-[1.25rem] sm:text-[1.375rem]",
} as const;

export function BrandWordmark({
  variant = "dark",
  showTagline = false,
  size = "md",
}: BrandWordmarkProps) {
  const isDark = variant === "dark";

  return (
    <span className="flex flex-col justify-center min-w-0">
      <span
        className={`brand-wordmark ${isDark ? "brand-wordmark--dark" : "brand-wordmark--light"} ${SIZE_CLASS[size]}`}
      >
        <span className="brand-wordmark__lupin">Lupin</span>
        <span className="brand-wordmark__leads"> Leads</span>
      </span>
      {showTagline ? (
        <span className="brand-wordmark__tagline">{BRAND_ASSETS.taglineUpper}</span>
      ) : null}
    </span>
  );
}
