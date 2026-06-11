import { FormEditor } from "@/components/forms/FormEditor";

export const metadata = {
  title: "New Form — LUPIN LEADS",
};

export default function NewFormPage() {
  return (
    <div className="px-6 py-8 lg:px-10">
      <FormEditor />
    </div>
  );
}
