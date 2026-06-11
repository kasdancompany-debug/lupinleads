import { notFound } from "next/navigation";
import { getFormById } from "@/lib/forms/db";
import { FormEditor } from "@/components/forms/FormEditor";

export default async function EditFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const form = await getFormById(id);

  if (!form) notFound();

  return (
    <div className="px-6 py-8 lg:px-10">
      <FormEditor form={form} />
    </div>
  );
}
