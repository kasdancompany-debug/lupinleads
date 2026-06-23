import { LupinMark } from "@/components/ui/LupinMark";

interface WolfMarkProps {
  className?: string;
  size?: number;
}

/** @deprecated Use LupinMark — kept for dashboard compatibility. */
export function WolfMark({ className = "", size = 40 }: WolfMarkProps) {
  return <LupinMark size={size} className={className} />;
}
