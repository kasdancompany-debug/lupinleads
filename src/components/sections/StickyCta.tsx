"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 pointer-events-none">
      <div className="max-w-lg mx-auto pointer-events-auto">
        <div className="flex items-center justify-between gap-4 px-5 py-3 rounded-lg border border-forest-mid/30 bg-black/95 backdrop-blur-xl shadow-2xl glow-green">
          <div className="hidden sm:block min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              Ready for more estimates?
            </p>
            <p className="text-[11px] text-silver-dim">Free strategy call</p>
          </div>
          <Button
            size="sm"
            className="shrink-0 w-full sm:w-auto"
            onClick={() =>
              document.getElementById("book-call")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {SITE.cta}
          </Button>
        </div>
      </div>
    </div>
  );
}
