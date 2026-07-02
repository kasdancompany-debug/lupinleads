export type ComparisonCellValue = boolean | "partial";

export function ComparisonCellIcon({ value }: { value: ComparisonCellValue }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-forest-mid/20 text-forest-glow">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12L10 17L20 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }

  if (value === "partial") {
    return (
      <span className="text-[11px] uppercase tracking-wider font-medium text-silver-muted">Partial</span>
    );
  }

  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-silver/5 text-silver-dim">
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 6L18 18M18 6L6 18" strokeLinecap="round" />
      </svg>
    </span>
  );
}
