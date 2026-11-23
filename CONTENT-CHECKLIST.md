# Content and asset checklist

## Source inspected

The workspace contained the already extracted `stitch_paradise_bakes_website_clone` directory, with both code.html files, both screen.png references, and DESIGN.md. There was no ZIP in the workspace or its immediate parent and no existing app. These extracted files were the latest available source of truth.

## Supply before public launch

- Official logo original (SVG or high-resolution transparent PNG), image rights/approval, and original bakery/cake photography.
- Authentic photographs of each branch. The supplied branch scenes appear illustrative and have not been treated as actual Paradise storefronts.
- Approved business story, staff photographs, and actual Life at Paradise gallery images.
- Verified completed customer cake photographs, captions, consent, and product mappings. No generic image is presented as a completed customer order.
- Confirmed catalogue: product names/recipes, categories, actual photos, allergens, dietary information, supported weights, price per kg or weight-specific price, current availability, lead time, and pickup constraints. Current eight cakes are explicitly labelled reference designs, not verified purchasable products. Custom choices are preferences subject to confirmation.
- Exact branch addresses and map/directions URLs for Olavanna, Kattukulangara, and Kulangarapeedika. Branch names agree across the two references; street addresses do not.
- Official phone numbers and whether each is WhatsApp-enabled. Configure `Branch.phone` and `Branch.whatsapp` only after verification; WhatsApp expects international digits without + or spaces. No phone/WhatsApp number is currently enabled.
- Confirmed branch opening hours. The references conflict: 10 AM–12 PM in one section versus 8 AM–11 PM in another. Neither is published.
- Official review URLs and genuine attributable review records. Supplied ratings/counts/testimonials are unverified, so the page invites reviews instead.
- Official email and social profile URLs. Contact/social configuration is currently empty.
- Approved business claims/certifications/delivery-provider links. Unverified hygiene, imported dairy, food safety certification, budget-price, stock-count, and daily baking claims were omitted.
- Full-resolution Playfair Display and Inter/Plus Jakarta Sans licensed font files if exact type matching is required. Local Georgia and system sans fallbacks currently preserve the serif/sans hierarchy without external font requests.

## Pricing conflicts

The showcase/grid/gallery/script contain inconsistent product names, prices, weights, stock states, and totals (for example, a 1 kg default with a displayed 1500 total against a 750/kg rate). No authoritative price was identified. `confirmedPricePerKg` is unset; the tested calculation activates only when it is populated. Do not infer real stock from a static mockup. No stock quantities, ratings, reviews, certifications, history, or opening hours were invented.

## Local asset provenance

- `/images/logo.jpg`: cropped brand mark from the supplied Home screenshot.
- `/images/hero.jpg`: bakery/croissant scene cropped from the supplied Home screenshot; visibly labelled design reference, never identified as an actual branch.
- `/images/red-velvet.jpg`, `/images/chocolate.jpg`, `/images/berry.jpg`: cake photographs cropped from the supplied Cake World screenshot. These are low-resolution design references, not verified product photographs; source reused photos for multiple cakes.
- `/images/cake-placeholder.svg`: original code-drawn placeholder used where the screenshot image included an unverified SOLD OUT overlay. It makes no availability claim.
- Story illustration and custom cake sketch are decorative CSS drawings, not actual cake renders or staff photographs. The builder changes sketch shape, layers, colour and topper label; flavour is a preference in the summary, not a photorealistic render.
- Authentic branches/staff/completed orders remain clearly labelled placeholders.

## External URLs

`scripts/reference-images.json` inventories all 65 image occurrences and their original URLs/alt text. `scripts/asset-audit.json` records the 10 representative asset-download attempts; every attempted download failed because external network access is unavailable. Other inventoried URLs are untested, not declared dead. No runtime external image requests are required by this app.

Run `scripts/download-assets.cjs` again with network access to recheck the selected sources. Downloaded photos still require content/rights verification before being used as actual business imagery. `scripts/extract-assets.ps1` records screenshot crop coordinates (Windows System.Drawing); its caramel crop contains a SOLD OUT stamp and is deliberately not used in the website.

## Later phases

Food/drinks menu, verified previous-cake gallery, official contact/directions/review links, backend/Google Sheets adapter, and optional real photo-transfer integration. No checkout, admin panel, deployment, order-submission endpoint, or Google Sheets connection exists.
