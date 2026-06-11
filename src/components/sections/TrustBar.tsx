import { WolfDivider } from "@/components/ui/WolfDivider";

export function TrustBar() {
  const trades = [
    "Roofing",
    "Remodeling",
    "HVAC",
    "Landscaping",
    "Electrical",
    "Plumbing",
    "Painting",
    "Fencing",
  ];

  return (
    <section className="py-8 border-y border-silver/8 bg-black-elevated overflow-hidden relative">
      <div className="absolute inset-0 wolf-pattern-bg opacity-40 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <WolfDivider variant="tracks" className="mb-6 max-w-md mx-auto" />
        <p className="text-center text-[11px] uppercase tracking-[0.2em] text-silver-dim mb-5">
          Built for contractors in every trade
        </p>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-3">
          {trades.map((trade) => (
            <span
              key={trade}
              className="text-sm text-silver-muted/70 hover:text-silver-muted transition-colors"
            >
              {trade}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
