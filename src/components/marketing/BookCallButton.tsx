"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CTAS } from "@/lib/constants";
import { bookLeadStrategyCall, type BookLeadStrategyCallOptions } from "@/lib/marketing";

type BookCallButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "onClick" | "loading"
> & {
  children?: React.ReactNode;
  bookingOptions?: BookLeadStrategyCallOptions;
  onBook?: () => void;
};

export function BookCallButton({
  children = CTAS.primary,
  bookingOptions,
  onBook,
  disabled,
  ...buttonProps
}: BookCallButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = useCallback(async () => {
    if (loading || disabled) return;

    setLoading(true);
    onBook?.();

    try {
      const mode = await bookLeadStrategyCall(bookingOptions);
      if (mode === "failed") {
        // Last-resort: hard navigation to form anchor
        window.location.hash = "book-call";
      }
    } catch {
      scrollToFormAnchor();
    } finally {
      setLoading(false);
    }
  }, [bookingOptions, disabled, loading, onBook]);

  return (
    <Button
      type="button"
      {...buttonProps}
      disabled={disabled || loading}
      loading={loading}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}

function scrollToFormAnchor() {
  const el = document.getElementById("book-call");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  window.location.href = "/#book-call";
}
