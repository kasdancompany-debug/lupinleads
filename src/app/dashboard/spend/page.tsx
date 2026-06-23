import { Suspense } from "react";
import { SpendManager } from "@/components/spend/SpendManager";

export const metadata = {
  title: "Ad Spend — LUPIN LEADS",
  description: "Log monthly Meta ad spend per client for CPL and ROAS reporting.",
};

export default function SpendPage() {
  return (
    <div className="px-6 py-8 lg:px-10 max-w-[1200px]">
      <Suspense
        fallback={
          <div className="space-y-4">
            <div className="h-8 w-48 bg-black-surface rounded animate-pulse" />
            <div className="dashboard-card h-64 animate-pulse" />
          </div>
        }
      >
        <SpendManager />
      </Suspense>
    </div>
  );
}
