import { ExecutiveReportsDashboard } from "@/components/reports/ExecutiveReportsDashboard";

export const metadata = {
  title: "Executive Reports — LUPIN LEADS",
  description: "Monthly executive performance reports with PDF export and client branding.",
};

export default function ReportsPage() {
  return (
    <div className="px-6 py-8 lg:px-10">
      <ExecutiveReportsDashboard />
    </div>
  );
}
