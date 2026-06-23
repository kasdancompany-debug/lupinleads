/** Internal QA leads — never show in the client portal. */
export function isIsolationTestLead(lead: {
  email?: string | null;
  name?: string | null;
  source?: string | null;
}): boolean {
  const email = (lead.email ?? "").toLowerCase();
  const name = lead.name ?? "";
  const source = lead.source ?? "";

  return (
    email.includes("isolation-test@") ||
    name.startsWith("[Isolation Test]") ||
    source === "isolation-test"
  );
}

export function filterPortalLeads<T extends { email?: string | null; name?: string | null; source?: string | null }>(
  leads: T[]
): T[] {
  return leads.filter((lead) => !isIsolationTestLead(lead));
}
