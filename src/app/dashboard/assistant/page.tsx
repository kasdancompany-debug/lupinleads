import { AiAssistantDashboard } from "@/components/ai/AiAssistantDashboard";

export const metadata = {
  title: "AI Assistant — LUPIN LEADS",
  description: "AI-powered lead follow-up, scoring, and message generation.",
};

export default function AssistantPage() {
  return (
    <div className="px-6 py-8 lg:px-10">
      <AiAssistantDashboard />
    </div>
  );
}
