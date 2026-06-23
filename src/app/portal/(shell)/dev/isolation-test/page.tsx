import { PortalIsolationTestPanel } from "@/components/dev/PortalIsolationTestPanel";

export const metadata = {
  title: "Isolation Test — Client Portal",
};

export default function PortalIsolationTestPage() {
  return (
    <div className="max-w-xl">
      <PortalIsolationTestPanel />
    </div>
  );
}
