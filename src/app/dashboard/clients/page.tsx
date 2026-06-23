import { ClientsManager } from "@/components/clients/ClientsManager";

export const metadata = {
  title: "Clients — LUPIN LEADS",
  description: "Manage client portal accounts and invites.",
};

export default function ClientsPage() {
  return (
    <div className="px-6 py-8 lg:px-10 max-w-[1200px]">
      <ClientsManager />
    </div>
  );
}
