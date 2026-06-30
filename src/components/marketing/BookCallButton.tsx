"use client";

import { useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { CTAS } from "@/lib/constants";
import { bookLeadStrategyCall } from "@/lib/marketing";

type BookCallButtonProps = Omit<React.ComponentProps<typeof Button>, "onClick" | "loading"> & {
  children?: React.ReactNode;
  onBook?: () => void;
};

export function BookCallButton({
  children = CTAS.primary,
  onBook,
  disabled,
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

  return (
    <Button type="button" {...buttonProps} disabled={disabled} onClick={handleClick}>
      {children}
    </Button>
  );
}
