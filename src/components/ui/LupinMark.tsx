import Image from "next/image";
import { BRAND_ASSETS, BRAND_DIMENSIONS } from "@/lib/brand";

type LupinMarkProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

/** Official Lupin Leads icon — lupin stem + growth arrow. */
export function LupinMark({ size = 36, className = "", priority = false }: LupinMarkProps) {
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
      quality={100}
      className={`block shrink-0 select-none drop-shadow-[0_1px_12px_rgba(82,183,136,0.14)] ${className}`}
      style={{ width, height }}
      aria-hidden
    />
  );
}
