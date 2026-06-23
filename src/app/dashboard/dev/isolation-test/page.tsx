import { IsolationTestPanel } from "@/components/dev/IsolationTestPanel";

export const metadata = {
  title: "Isolation Test — LUPIN LEADS",
  description: "Pre-onboarding data isolation verification for multi-tenant client portal.",
};

export default function IsolationTestPage() {
  return (
    <div className="px-6 py-8 lg:px-10 max-w-[900px]">
      <IsolationTestPanel />
    </div>
  );
}
