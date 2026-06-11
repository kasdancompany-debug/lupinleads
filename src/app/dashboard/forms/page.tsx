import { FormsManager } from "@/components/forms/FormsManager";

export const metadata = {
  title: "Lead Capture Forms — LUPIN LEADS",
};

export default function FormsPage() {
  return (
    <div className="px-6 py-8 lg:px-10">
      <FormsManager />
    </div>
  );
}
