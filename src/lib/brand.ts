/** Official Lupin Leads brand assets (extracted from brand sheet). */
export const BRAND_ASSETS = {
  mark: "/brand/lupin-mark.png",
  lockupDark: "/brand/lupin-lockup-dark.png",
  lockupLight: "/brand/lupin-lockup-light.png",
  lockupNavLight: "/brand/lupin-lockup-nav-light.png",
  logoPrimary: "/brand/lupin-logo-primary.png",
  appIcon: "/brand/lupin-app-icon-180.png",
  favicon32: "/brand/lupin-favicon-32.png",
  favicon16: "/brand/lupin-favicon-16.png",
  tagline: "More leads. Better jobs. Bigger business.",
} as const;

export const BRAND_DIMENSIONS = {
  mark: { width: 195, height: 108 },
  lockupDark: { width: 385, height: 82 },
  lockupLight: { width: 345, height: 110 },
  lockupNavLight: { width: 345, height: 66 },
  logoPrimary: { width: 410, height: 290 },
} as const;

/** Dark lockup includes tagline in-file; nav clips to the wordmark row. */
export const BRAND_NAV_CLIP = {
  dark: 0.66,
} as const;
