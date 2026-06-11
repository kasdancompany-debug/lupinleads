import { WolfCrest } from "@/components/ui/WolfCrest";

interface WolfMarkProps {
  className?: string;
  size?: number;
}

export function WolfMark({ className = "", size = 40 }: WolfMarkProps) {
  return (
    <WolfCrest
      size={size}
      variant="minimal"
      className={className}
    />
  );
}
