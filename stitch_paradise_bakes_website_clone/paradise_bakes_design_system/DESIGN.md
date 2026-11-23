---
name: Paradise Bakes Design System
colors:
  surface: '#fdf9f3'
  surface-dim: '#dddad4'
  surface-bright: '#fdf9f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3ed'
  surface-container: '#f1ede7'
  surface-container-high: '#ebe8e2'
  surface-container-highest: '#e6e2dc'
  on-surface: '#1c1c18'
  on-surface-variant: '#524346'
  inverse-surface: '#31302d'
  inverse-on-surface: '#f4f0ea'
  outline: '#847375'
  outline-variant: '#d7c1c4'
  surface-tint: '#8c4a5a'
  primary: '#2f0211'
  on-primary: '#ffffff'
  primary-container: '#4a1525'
  on-primary-container: '#c57a8b'
  inverse-primary: '#ffb1c2'
  secondary: '#75584d'
  on-secondary: '#ffffff'
  secondary-container: '#ffd7c9'
  on-secondary-container: '#7a5c51'
  tertiary: '#735c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cca830'
  on-tertiary-container: '#4f3e00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9df'
  primary-fixed-dim: '#ffb1c2'
  on-primary-fixed: '#3a0819'
  on-primary-fixed-variant: '#703343'
  secondary-fixed: '#ffdbcf'
  secondary-fixed-dim: '#e4beb1'
  on-secondary-fixed: '#2b160e'
  on-secondary-fixed-variant: '#5b4037'
  tertiary-fixed: '#ffe088'
  tertiary-fixed-dim: '#e9c349'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#fdf9f3'
  on-background: '#1c1c18'
  surface-variant: '#e6e2dc'
typography:
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  margin: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 3rem
---

## Brand & Style

This design system embodies a luxurious, artisanal, and warm aesthetic tailored for a premium bakery and café experience. The brand personality is sophisticated yet deeply inviting, balancing high-end editorial refinement with the sensory comfort of freshly baked goods. 

The visual style merges **Minimalism** with a **Tactile / Editorial** sensibility. It relies on generous whitespace, high-contrast typography, and a rich, decadent color palette to evoke the feeling of stepping into an exclusive patisserie. The UI should inspire a sense of indulgence, calm, and artisanal craftsmanship.

## Colors

The palette is anchored by a warm cream background that sets an inviting, organic tone. The deep burgundy primary color provides a striking, opulent contrast for primary actions and key focal points, while the chocolate brown accents ground the interface with a rich, earthy warmth. Champagne-gold highlights are used sparingly for delicate borders, active states, and premium badges, adding a touch of understated elegance.

- **Primary (`#4A1525`):** Used for primary buttons, prominent headlines, and key interactive elements.
- **Secondary (`#2D1810`):** Used for secondary text, structure, and grounding elements.
- **Tertiary (`#D4AF37`):** Used for luxury accents, ratings, and delicate highlights.
- **Neutral (`#FAF6F0`):** The foundational canvas color for all surfaces and backgrounds.

## Typography

The typography pairs the luxurious, high-contrast serif **Playfair Display** for headlines with the clean, functional sans-serif **Inter** for body copy and UI elements. This combination bridges traditional artisanal craftsmanship with modern digital usability. Headlines should feel editorial and expressive, while body copy remains pristine, legible, and unobtrusive.

## Layout & Spacing

The layout philosophy relies on a **fluid grid** combined with generous whitespace to mimic the unhurried, curated feel of a high-end boutique. Sections breathe with ample vertical padding (`space-xl`), allowing high-resolution imagery and artisanal typography to take center stage. 

- **Grid:** 12-column fluid structure with 24px gutters and responsive outer margins.
- **Breakpoints:** Mobile (< 768px), Tablet (768px - 1024px), Desktop (> 1024px). On mobile, outer margins collapse gracefully to 1rem to maximize screen estate while preserving comfortable touch targets.

## Elevation & Depth

Depth is conveyed through subtle **tonal layering and low-contrast outlines** rather than heavy drop shadows. Surfaces are elevated using slight variations against the warm cream canvas, reinforced by whisper-thin champagne-gold or chocolate-brown borders. When ambient shadows are necessary for floating elements like modals or dropdowns, they use diffused, low-opacity tints derived from the deep burgundy primary color to maintain a warm, cohesive atmosphere.

## Shapes

The design system enforces a restrained, soft roundedness (`1`, corresponding to a base 0.25rem radius). This subtle softening prevents the UI from feeling overly rigid or corporate, introducing a gentle, approachable tactility that mirrors the organic, handcrafted nature of baked goods without crossing into whimsical territory. Larger containers and cards utilize `rounded-lg` (0.5rem) to maintain structural elegance.

## Components

- **Buttons:** Primary buttons feature solid deep burgundy (`#4A1525`) backgrounds with white or champagne-gold text, utilizing a soft 0.25rem border radius. Secondary actions use ghost styles with delicate chocolate brown outlines.
- **Chips & Tags:** Pill-shaped or softly rounded micro-elements used for dietary indicators (e.g., "Gluten-Free", "Artisan"), styled with subtle tinted backgrounds.
- **Input Fields:** Clean text inputs featuring warm cream or pure white fills, bordered by low-contrast chocolate lines. Focus states elevate with a champagne-gold ring.
- **Cards:** Product and menu cards feature generous internal padding, high-imagery focal points, and subtle tonal separation from the background with minimal border treatment.
- **Checkboxes & Radios:** Custom-styled square and circular selectors featuring deep burgundy fill states on selection.
- **Lists:** Clean typographic separation with generous line spacing, ideal for structured menu items and pricing tables.