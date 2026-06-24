import Image from "next/image";
import Link from "next/link";
import { BRAND_ASSETS, BRAND_DIMENSIONS } from "@/lib/brand";

type SiteLogoProps = {
  href?: string;
  className?: string;
  /** Dark site header/footer vs light backgrounds (PDF, email). */
  variant?: "dark" | "light" | "mark";
  height?: number;
  priority?: boolean;
};

export function SiteLogo({
  href = "/",
  className = "",
  variant = "dark",
  height = 36,
  priority = false,
}: SiteLogoProps) {
  const isMark = variant === "mark";
  const isLight = variant === "light";

  const src = isMark
    ? BRAND_ASSETS.mark
    : isLight
      ? BRAND_ASSETS.lockupLight
      : BRAND_ASSETS.lockupDark;

  const dims = isMark
    ? BRAND_DIMENSIONS.mark
    : isLight
      ? BRAND_DIMENSIONS.lockupLight
      : BRAND_DIMENSIONS.lockupDark;

  const width = Math.round((height / dims.height) * dims.width);

  const image = (
    <Image
      src={src}
      alt={`Lupin Leads — ${BRAND_ASSETS.tagline}`}
      width={width}
      height={height}
      priority={priority}
      className={`h-auto w-auto max-h-[2.25rem] sm:max-h-10 ${isMark ? "rounded-sm" : ""}`}
      style={{ height, width: "auto", maxWidth: isMark ? height : "min(100%, 220px)" }}
    />
  );

  if (!href) {
    return <span className={`inline-flex items-center min-w-0 ${className}`}>{image}</span>;
  }

  return (
    <Link href={href} className={`group inline-flex items-center min-w-0 ${className}`}>
      {image}
    </Link>
  );
}
