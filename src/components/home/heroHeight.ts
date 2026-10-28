// The hero fills one screen with its buttons visible.
// Phones: minus the preview banner (up to 2 lines, 2.75rem), sticky header (4rem)
// and fixed CTA bar (4.25rem + safe area). From sm the banner is one line (1.75rem).
// Desktop: minus banner and the 5rem header, capped so very tall screens stay balanced.
// Remove the banner allowance when siteSettings.previewBanner is turned off.
export const HERO_HEIGHT =
  'min-h-[calc(100svh-11rem-env(safe-area-inset-bottom))] sm:min-h-[calc(100svh-10rem-env(safe-area-inset-bottom))] lg:min-h-[min(calc(100svh-6.75rem),56rem)]';
