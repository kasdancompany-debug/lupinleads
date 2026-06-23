export function PageLoading({ label = "Loading" }: { label?: string }) {
  return (
    <div
      className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-6"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="h-9 w-9 rounded-full border-2 border-forest-mid/30 border-t-forest-glow animate-spin" />
      <p className="text-[13px] text-silver-muted">{label}…</p>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-pulse" aria-hidden>
      <div className="h-8 w-48 bg-white/[0.04] rounded" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 dashboard-card rounded-lg bg-white/[0.02]" />
        ))}
      </div>
      <div className="h-64 dashboard-card rounded-lg bg-white/[0.02]" />
    </div>
  );
}
