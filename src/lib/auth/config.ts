/** Comma-separated agency admin emails from AGENCY_ADMIN_EMAILS */
export function getAgencyAdminEmails(): string[] {
  const raw = process.env.AGENCY_ADMIN_EMAILS ?? "";
  return raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAgencyAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return getAgencyAdminEmails().includes(normalized);
}
