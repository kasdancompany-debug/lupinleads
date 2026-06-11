"use client";

import { useEffect, useState } from "react";
import type { CaptureForm, CampaignTracking } from "@/lib/forms/types";
import { getReferrer } from "@/lib/forms/tracking";
import { CaptureFormRenderer } from "./CaptureFormRenderer";

interface EmbedFormClientProps {
  form: CaptureForm;
  tracking: CampaignTracking;
}

export function EmbedFormClient({ form, tracking: initialTracking }: EmbedFormClientProps) {
  const [tracking, setTracking] = useState<CampaignTracking>(initialTracking);

  useEffect(() => {
    setTracking((prev) => ({
      ...prev,
      referrer: getReferrer(),
    }));
  }, []);

  return <CaptureFormRenderer form={form} tracking={tracking} compact />;
}
