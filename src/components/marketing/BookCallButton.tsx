"use client";

import { useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { CTAS } from "@/lib/constants";
import { CTA_NAV_CLASS, CTA_PRIMARY_CLASS, CTA_STICKY_CLASS } from "@/lib/cta-styles";
import { bookLeadStrategyCall } from "@/lib/marketing";

type BookCallButtonProps = Omit<React.ComponentProps<typeof Button>, "onClick" | "loading"> & {
  children?: React.ReactNode;
  onBook?: () => void;
  /** Apply preset sizing without repeating className strings */
  preset?: "primary" | "sticky" | "nav" | "none";
};

function presetClass(preset: BookCallButtonProps["preset"], size: BookCallButtonProps["size"]) {
  if (preset === "none") return "";
  if (preset === "sticky") return CTA_STICKY_CLASS;
  if (preset === "nav") return CTA_NAV_CLASS;
  if (preset === "primary" || size === "lg") return CTA_PRIMARY_CLASS;
  return "";
}

export function BookCallButton({
  children = CTAS.primary,
  onBook,
  disabled,
  preset,
  size = "lg",
  className = "",
  ...buttonProps
}: BookCallButtonProps) {
  const handleClick = useCallback(() => {
    if (disabled) return;

    onBook?.();
    const mode = bookLeadStrategyCall();
    if (mode === "failed") {
      window.location.assign("/#book-call");
    }
  }, [disabled, onBook]);

  const mergedClass = [presetClass(preset, size), className].filter(Boolean).join(" ");

  return (
    <Button
      type="button"
      size={size}
      {...buttonProps}
      disabled={disabled}
      className={mergedClass}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
