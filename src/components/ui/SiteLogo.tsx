import Image from "next/image";
import Link from "next/link";
import { BRAND_ASSETS, BRAND_DIMENSIONS } from "@/lib/brand";

type SiteLogoProps = {
  href?: string;
  className?: string;
  /** Dark site header/footer vs light backgrounds (PDF, email). */
  variant?: "dark" | "light" | "mark";
  /** Nav uses compact lockup (no tagline); footer uses full lockup. */
  layout?: "nav" | "footer" | "full";
  height?: number;
  priority?: boolean;
};

const LOGO_POLISH =
  "block shrink-0 select-none transition-[filter,opacity] duration-300 ease-out opacity-[0.97] group-hover:opacity-100 group-hover:drop-shadow-[0_2px_14px_rgba(82,183,136,0.18)]";

export function SiteLogo({
  href = "/",
  className = "",
  variant = "dark",
  layout = "nav",
  height = 46,
  priority = false,
}: SiteLogoProps) {
  const isMark = variant === "mark";
  const isLight = variant === "light";
  const isNav = layout === "nav";

  const src = isMark
    ? BRAND_ASSETS.mark
    : isLight
      ? isNav
        ? BRAND_ASSETS.lockupNavLight
        : BRAND_ASSETS.lockupLight
      : isNav
        ? BRAND_ASSETS.lockupNavDark
        : BRAND_ASSETS.lockupDark;

  const dims = isMark
    ? BRAND_DIMENSIONS.mark
    : isLight
      ? isNav
        ? BRAND_DIMENSIONS.lockupNavLight
        : BRAND_DIMENSIONS.lockupLight
      : isNav
        ? BRAND_DIMENSIONS.lockupNavDark
        : BRAND_DIMENSIONS.lockupDark;

  const width = Math.round((height / dims.height) * dims.width);

  const image = (
    <Image
      src={src}
      alt={`Lupin Leads — ${BRAND_ASSETS.tagline}`}
      width={width}
      height={height}
      priority={priority}
      quality={100}
      className={`${LOGO_POLISH} ${isMark ? "rounded-sm" : ""}`}
      style={{
        height,
        width,
        maxWidth: isMark ? height : isNav ? "min(100%, 280px)" : "min(100%, 320px)",
      }}
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
