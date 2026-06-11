import type { Metadata } from "next";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardMobileNav } from "@/components/dashboard/DashboardMobileNav";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";

export const metadata: Metadata = {
  title: "Dashboard — LUPIN LEADS",
  description: "Performance dashboard for LUPIN LEADS.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black">
      <DashboardSidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <DashboardMobileNav />
        <DashboardTopBar />
        {children}
      </div>
    </div>
  );
}
