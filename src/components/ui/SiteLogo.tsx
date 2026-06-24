import Image from "next/image";
import Link from "next/link";
import { BRAND_ASSETS, BRAND_DIMENSIONS, BRAND_NAV_CLIP } from "@/lib/brand";

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

export function SiteLogo({
  href = "/",
  className = "",
  variant = "dark",
  layout = "nav",
  height = 44,
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
      : BRAND_ASSETS.lockupDark;

  const dims = isMark
    ? BRAND_DIMENSIONS.mark
    : isLight
      ? isNav
        ? BRAND_DIMENSIONS.lockupNavLight
        : BRAND_DIMENSIONS.lockupLight
      : BRAND_DIMENSIONS.lockupDark;

  const width = Math.round((height / dims.height) * dims.width);
  const clipDarkNav = isNav && !isMark && !isLight;
  const renderHeight = clipDarkNav
    ? Math.round(height / BRAND_NAV_CLIP.dark)
    : height;

  const image = clipDarkNav ? (
    <div className="overflow-hidden shrink-0" style={{ height, width }}>
      <Image
        src={src}
        alt={`Lupin Leads — ${BRAND_ASSETS.tagline}`}
        width={width}
        height={renderHeight}
        priority={priority}
        className="block max-w-none"
        style={{ width, height: renderHeight }}
      />
    </div>
  ) : (
    <Image
      src={src}
      alt={`Lupin Leads — ${BRAND_ASSETS.tagline}`}
      width={width}
      height={height}
      priority={priority}
      className={`block shrink-0 ${isMark ? "rounded-sm" : ""}`}
      style={{
        height,
        width,
        maxWidth: isMark ? height : isNav ? "min(100%, 260px)" : "min(100%, 300px)",
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
