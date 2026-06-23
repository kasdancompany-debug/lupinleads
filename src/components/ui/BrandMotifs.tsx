type MotifProps = {
  className?: string;
};

/** Vertical lupin stem accent line. */
export function StemLine({ className = "" }: MotifProps) {
  return (
    <span
      className={`brand-stem-line inline-block ${className}`}
      aria-hidden
    />
  );
}

/** Horizontal growth-path branch divider. */
export function BranchDivider({ className = "" }: MotifProps) {
  return (
    <div
      className={`brand-branch-divider ${className}`}
      role="presentation"
    />
  );
}

/** Circular lead node — purple accent from the logo petals. */
export function LeadNode({
  size = "md",
  className = "",
}: MotifProps & { size?: "sm" | "md" | "lg" }) {
  const sizeClass =
    size === "sm" ? "brand-node-sm" : size === "lg" ? "brand-node-lg" : "brand-node";

  return <span className={`brand-lead-node ${sizeClass} ${className}`} aria-hidden />;
}

/** Decorative stem stack for hero / section corners. */
export function StemCluster({ className = "" }: MotifProps) {
  return (
    <svg
      className={`brand-stem-cluster ${className}`}
      viewBox="0 0 24 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {[0, 14, 28, 42, 56].map((y, i) => (
        <path
          key={y}
          d={`M8 ${y + 8} L12 ${y + 4} L16 ${y + 8} L12 ${y + 12} Z`}
          fill="var(--lupin-purple)"
          fillOpacity={0.55 + i * 0.08}
        />
      ))}
      <path
        d="M4 72 H14 V66 H8 V58 H4 Z"
        fill="var(--forest-green-bright)"
        fillOpacity="0.85"
      />
      <path
        d="M14 66 L22 58"
        stroke="var(--forest-green-bright)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
