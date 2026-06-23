"use client";

import { MagicLinkForm } from "@/components/auth/MagicLinkForm";

export function PortalMagicLinkForm() {
  return (
    <MagicLinkForm
      callbackNext="/portal"
      inputId="portal-email"
      accessDeniedMessage="This email does not have portal access yet. Contact Lupin if you believe that's a mistake."
      sentDescription={undefined}
    />
  );
}
