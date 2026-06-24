/** Official Lupin Leads brand assets (extracted from brand sheet). */
export const BRAND_ASSETS = {
  mark: "/brand/lupin-mark.png",
  lockupDark: "/brand/lupin-lockup-dark.png",
  lockupLight: "/brand/lupin-lockup-light.png",
  logoPrimary: "/brand/lupin-logo-primary.png",
  appIcon: "/brand/lupin-app-icon-180.png",
  favicon32: "/brand/lupin-favicon-32.png",
  favicon16: "/brand/lupin-favicon-16.png",
  tagline: "More leads. Better jobs. Bigger business.",
} as const;

export const BRAND_DIMENSIONS = {
  lockupDark: { width: 385, height: 82 },
  lockupLight: { width: 652, height: 168 },
  logoPrimary: { width: 746, height: 477 },
  mark: { width: 315, height: 310 },
} as const;
