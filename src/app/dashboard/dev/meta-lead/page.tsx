import { MetaLeadTestPanel } from "@/components/dev/MetaLeadTestPanel";

export const metadata = {
  title: "Meta Lead Simulator — LUPIN LEADS",
  description: "Simulate Facebook Lead Ad submissions for testing client intake.",
};

export default function MetaLeadTestPage() {
  return (
    <div className="px-6 py-8 lg:px-10 max-w-[900px]">
      <MetaLeadTestPanel />
    </div>
  );
}
