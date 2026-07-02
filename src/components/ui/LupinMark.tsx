import { LupinMarkSvg } from "@/components/ui/LupinMarkSvg";

type LupinMarkProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

/** Official Lupin Leads icon — lupin stem + growth arrow (vector for crisp edges). */
export function LupinMark({ size = 36, className = "", priority = false }: LupinMarkProps) {
  void priority;
  return <LupinMarkSvg size={size} className={`block shrink-0 select-none ${className}`} />;
}
