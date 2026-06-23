import type { Metadata } from "next";
import { PortalSidebar } from "@/components/portal/PortalSidebar";
import { PortalMobileNav } from "@/components/portal/PortalMobileNav";
import { PortalTopBar } from "@/components/portal/PortalTopBar";
import { PortalProvider } from "@/components/portal/PortalContext";
import { requireClientUser } from "@/lib/auth/session";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Portal — ${SITE.name}`,
  robots: { index: false, follow: false },
};

export default async function PortalShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = await requireClientUser();

  return (
    <PortalProvider clientName={client.clientName} clientSlug={client.clientSlug}>
      <div className="flex min-h-screen bg-black">
        <PortalSidebar />
        <div className="flex-1 min-w-0 flex flex-col">
          <PortalMobileNav />
          <PortalTopBar />
          <main className="flex-1 pb-[max(1.5rem,env(safe-area-inset-bottom))]">{children}</main>
        </div>
      </div>
    </PortalProvider>
  );
}
