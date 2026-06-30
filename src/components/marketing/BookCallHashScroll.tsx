"use client";

import { useEffect } from "react";
import { scrollToBook } from "@/lib/marketing";

/** Scroll to #book-call when the page loads with that hash (e.g. /#book-call from another route). */
export function BookCallHashScroll() {
  useEffect(() => {
    if (window.location.hash !== "#book-call") return;

    const timer = window.setTimeout(() => {
      scrollToBook();
    }, 150);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
