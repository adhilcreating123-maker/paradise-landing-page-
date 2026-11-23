# Validation

## Passed

- Production Next.js build generates Home, Cake World, Menu coming soon, and not-found routes.
- Strict TypeScript check.
- Five Node tests: unconfirmed prices stay absent; confirmed kg prices calculate correctly; WhatsApp requires a configured valid number; encoded message preserves Unicode/newlines/all inquiry fields; pickup formatting uses local calendar time.
- Local production server started on http://127.0.0.1:3000.

## Limitations

- Network access to npm and image hosts failed. Core framework dependencies were recovered from the existing npm cache into an ignored local cache. Tailwind and its PostCSS package are optional and not installed here; fallback component CSS was built. Tailwind-enabled compilation must be checked after installing them with network access.
- Local Chrome headless launch exited with -2147483645, and its debugging endpoint was unavailable. No browser screenshots, actual visual comparison, touch interaction tests, or runtime overflow measurements could be completed. `scripts/browser-qa.mjs` is a reproducible CDP check for 1440, 1024, 768, 390, and 320px on a working Chrome session at port 9222. It tests both routes and writes measurements/screenshots under .qa.
- Responsive layout is implemented in CSS, but browser verification remains pending. The swiping rows intentionally scroll internally; no global horizontal-overflow masking is used.
- All actual branch locations, phones, WhatsApp channels, review URLs, prices, stock, recipes, allergens, and completed cake photographs still need verification.
- Local inquiry photos never leave the browser and are not attached to WhatsApp. Clipboard denial produces a selectable manual-copy textarea.
- No deployment or access/hosting changes performed.

## HTTP smoke check

All 10 checks returned HTTP 200: Home, Cake World, Menu, all six local image assets, and a Next/Image optimized hero request. The optimizer reduced the hero response from 86,248 to 43,328 bytes for the checked 640px request. Raw results: `.qa/http-report.json`.

## Latest workspace audit (17 November 2026)

- Re-read both extracted Stitch HTML references, both screenshots, and DESIGN.md. No attached ZIP is present in the workspace; extracted references remain the available source.
- Connected shared gallery, review, and footer contact components to typed repository data. Verified gallery photographs require both `verified: true` and an image path; empty records retain honest placeholders. Review records render with attribution/source links once supplied.
- Branch-card links now target the location section so mobile visitors are not sent to offscreen cards in the horizontal row. Pickup submissions also reject invalid date values.
- Production build, strict typecheck, five inquiry tests, and all ten HTTP/image checks passed again.
- Edge launch was attempted; its browser debugging endpoint refused connection. Responsive screenshots and browser interaction validation remain unverified.
- Production preview is running at http://127.0.0.1:3000. No deployment was performed.
