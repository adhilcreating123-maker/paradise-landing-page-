# Paradise Bakes

Local Next.js App Router + TypeScript implementation of the supplied Stitch designs. No deployment, hosting registration, admin panel, payment flow, or external service connection was created.

## Run locally

Use Node.js 22.13+ (Node 26 was used here) and npm:

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000. On Windows PowerShell, use `npm.cmd` if script execution policy blocks `npm.ps1`.

Production preview:

```sh
npm run build
npm start
```

Checks: `npm run typecheck` and `npm test`.

## Implemented

- Home: announcement/navigation, split hero, three branch cards, story, Cake World introduction, Life at Paradise gallery slots, locations, review invitations, final CTA, footer.
- Cake World: two genuine categories present in the showcase, eight reference designs, category counts, shelf/grid display, selected product details, weight preference, message, future pickup time, preferred branch, validated inquiry copying with manual clipboard fallback.
- Custom builder: shape, flavour, layers, preferred weight, colour theme, topper, personal message, pickup preferences, live summary/sketch, optional local reference photo preview and file validation.
- WhatsApp helper requires a configured branch number. No configured number means copy inquiry details. The URL encodes the complete inquiry and never submits an order automatically.
- Confirmed per-kg price calculation is supported and tested. Unconfirmed reference prices are intentionally not published.
- Below 768px, branch, location, review, and gallery cards use contained native horizontal scrolling and CSS scroll snapping with the next card peeking in. Cake categories stay in one scrollable row. Tablet layouts have separate rules.
- Accessible disclosure navigation, Escape-to-close/focus return, labelled inputs, visible focus, skip link, keyboard buttons, reduced-motion support, metadata, local Next/Image assets.
- `/menu` honestly displays Menu coming soon.

## Content and integration

The homepage review form sends submissions to `POST /api/reviews`. A successful submission is recorded privately in `data/review-submissions.jsonl` on the Next.js server. For a deployment, set `REVIEW_SUBMISSIONS_FILE` to a file on a persistent writable volume so submissions survive restarts and redeployments.

`lib/data.ts` contains typed content models, branches, products, categories, gallery, reviews, contact configuration, custom options, and the small repository adapter. Replace these records with verified content; the adapter can later be replaced with an API/backend. Do not place private Google credentials here: this module is consumed by client components.

`lib/inquiry.ts` contains shared calculation, message encoding, local date formatting, and WhatsApp channel guards.

See CONTENT-CHECKLIST.md for source inconsistencies, asset provenance, and the exact information still needed.

## Tailwind / offline environment

Tailwind v4 and its PostCSS adapter are declared as optional dependencies because the execution environment cannot access the registry and neither package is cached. Standard `npm install --include=optional` with network access installs them; `predev`/`prebuild` detects them and enables the Tailwind entry and PostCSS plugin automatically. The complete design also has component CSS, so this local build works without Tailwind. Tailwind compilation itself has **not** been verified here. This is an environment accommodation, not a claim that Tailwind was installed.

## Verification

See VALIDATION.md. Production build, TypeScript checking, and five inquiry tests passed. Browser launch failed in this environment; responsive CSS and JS interactions were not visually/browser verified. The browser QA script is included for use on a machine with a working local Chrome debugging session.
