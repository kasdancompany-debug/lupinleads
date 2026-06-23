import Image from "next/image";

type LupinMarkProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

/** Official Lupin Leads logo mark — lupin stem + growth path. */
export function LupinMark({ size = 40, className = "", priority = false }: LupinMarkProps) {
  return (
    <Image
      src="/brand/lupin-mark.svg"
      alt=""
      width={size}
      height={size}
      priority={priority}
      className={`shrink-0 ${className}`}
      aria-hidden
    />
  );
}
