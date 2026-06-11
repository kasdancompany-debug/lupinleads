import { WolfCrest } from "@/components/ui/WolfCrest";

interface WolfDividerProps {
  className?: string;
  variant?: "crest" | "tracks" | "simple";
}

export function WolfDivider({ className = "", variant = "crest" }: WolfDividerProps) {
  if (variant === "tracks") {
    return (
      <div className={`flex items-center justify-center gap-6 ${className}`} aria-hidden="true">
        <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-forest-glow/40" />
        <svg width="100" height="20" viewBox="0 0 100 20" fill="none" className="text-forest-glow">
          {[0, 25, 50, 75].map((x) => (
            <g key={x} transform={`translate(${x}, 0)`}>
              <ellipse cx="8" cy="13" rx="5" ry="3.5" fill="currentColor" fillOpacity="0.5" />
              <circle cx="4" cy="6" r="2" fill="currentColor" fillOpacity="0.8" />
              <circle cx="8" cy="3" r="2" fill="currentColor" fillOpacity="0.8" />
              <circle cx="12" cy="6" r="2" fill="currentColor" fillOpacity="0.8" />
              <circle cx="8" cy="9" r="2" fill="currentColor" fillOpacity="0.8" />
            </g>
          ))}
        </svg>
        <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-forest-glow/40" />
      </div>
    );
  }

  if (variant === "simple") {
    return (
      <div className={`wolf-divider-line ${className}`} aria-hidden="true" />
    );
  }

  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden="true">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-forest-glow/30 to-forest-glow/15" />
      <WolfCrest size={40} className="text-forest-glow shrink-0" />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-forest-glow/30 to-forest-glow/15" />
    </div>
  );
}
