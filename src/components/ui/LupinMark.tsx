import Image from "next/image";
import { BRAND_ASSETS, BRAND_DIMENSIONS } from "@/lib/brand";

type LupinMarkProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

/** Official Lupin Leads logo mark — lupin stem + growth path. */
export function LupinMark({ size = 40, className = "", priority = false }: LupinMarkProps) {
  const { width: nativeW, height: nativeH } = BRAND_DIMENSIONS.mark;
  const height = size;
  const width = Math.round((size / nativeH) * nativeW);

  return (
    <Image
      src={BRAND_ASSETS.mark}
      alt=""
      width={width}
      height={height}
      priority={priority}
      className={`shrink-0 ${className}`}
      style={{ width, height }}
      aria-hidden
    />
  );
}
