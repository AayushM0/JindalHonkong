# PRD: Cinematic Scroll-Linked Depth Reveal Hero Component (V4)

> **Label**: `ready-for-agent` · **Target Component**: `HeroSection.jsx` · **Tech Stack**: React 19 + GSAP + Tailwind CSS v3

---

## Problem Statement

Jindalsons Limited needs a hero section that instantly commands authority and projects a premium, world-class B2B advisory brand. Standard static hero layouts or basic CSS fades fail to capture user attention or convey the "Gateway to Greater China & Global Markets" scale. The firm needs a high-end, immersive entry experience that engages users visually as they begin scrolling, without introducing visual bugs like clipped text or stretched foreground skyscraper deforming.

---

## Solution

Implement a **Cinematic Scroll-Linked Depth Reveal** hero component utilizing layered WebP images and GSAP's `ScrollTrigger` plugin. The component pins the viewport, creating a 3D photo-parallax effect where the background zooms outward while the foreground architecture pulls inward. The animation runs on a single unified GSAP timeline with relative position offsets, using hardware-accelerated transforms and opacity changes only, and fully supporting accessibility overrides and responsive breakpoints.

---

## User Stories

### Scroll Interaction & Immersion
1. As a prospective corporate client, I want the hero section to pin on scroll, so that the initial scroll actions control the depth animation instead of immediately moving down the page.
2. As a site visitor, I want the background horizon layer to scale up from `1.0` to `1.15` as I scroll, so that I experience a cinematic camera push-forward zoom.
3. As a site visitor, I want the foreground architecture layer to scale down from `1.15` to `1.05` as I scroll, so that it pulls back (moves inward) to its native scale, resolving any border deforming.
4. As a site visitor, I want the main headline to glide upward on its own parallax timeline as I scroll, so that the center of the frame clears up for the next section.
5. As a site visitor, I want the scroll animation to be directly tied to my scroll position (scrubbed), so that I can control the speed and direction of the reveal animation interactively.

### Content & Reveal Payoff
6. As a family office advisor, I want the glassmorphic detail container to fade in from the bottom near the end of the scroll trigger (towards 100% scroll), so that I can read the core supporting value statements.
7. As a mobile visitor, I want to see the firm's core contact options ("Schedule Consultation" and "Explore Services") fade in clearly inside the glassmorphic box, so that I can take immediate action.
8. As a site visitor, I want a dark gradient overlay layer behind the typography, so that the headline and description text remain readable against the skyline graphic at all scroll positions.
9. As a keyboard user, I want to be able to navigate to and select the call-to-action buttons, even when they are hidden or revealed during the scroll sequence.

### Performance & Accessibility
10. As a visitor on a low-end mobile device, I want the parallax animation to render at a smooth 60fps using hardware-accelerated transforms, so that my device does not lag or overheat.
11. As a user with motion sensitivity, I want the site to respect my system's `prefers-reduced-motion` settings, so that I can read the final state of the page immediately without seeing intense parallax or scaling animations.
12. As a search engine crawler, I want the hero text and links to be present in the initial server-side or static DOM structure, so that the site ranks for the copy's keywords.

---

## Implementation Decisions

### 1. Non-Negotiable Architecture Rules
- **One Timeline, One ScrollTrigger**: Every animated property (background, foreground, headline, overlay, panel, CTAs) must live on a single `gsap.timeline()` driven by exactly one `ScrollTrigger`. Do not create separate ScrollTriggers per element to prevent desyncing.
- **Transform & Opacity Only**: Animate only `scale`, `y` / `yPercent`, and `opacity`/`autoAlpha`. Never animate `top`, `left`, `margin`, `padding`, or `width`/`height` to avoid forcing layout reflows.
- **Initial State Set via GSAP**: Initialize any property that GSAP animates (scale, opacity, y) with `gsap.set()` inside the layout effect, not with Tailwind classes, to avoid inline-style collisions.
- **GSAP Context Cleanup**: Wrap animation logic in `useLayoutEffect`. Scope all animations with `gsap.context()` and ensure the cleanup function calls `ctx.revert()` to clear competing pins during React double-renders.
- **Module-Scope Plugin Registration**: Register ScrollTrigger once outside the component body: `gsap.registerPlugin(ScrollTrigger)`.
- **Resize & Pin Stabilizers**: Configure ScrollTrigger with `invalidateOnRefresh: true` and `anticipatePin: 1` to prevent visual jumps.
- **Dynamic Image Load Refresh**: Call `ScrollTrigger.refresh()` once both images have finished loading (checking `img.complete` or attaching a one-time `load` listener) to ensure accurate scroll boundaries.

### 2. Timeline Mapping & Keyframes (Defaults: duration `1`, ease `none`, scrub `1`)

| Timeline Position | Layer / Element | Property Change | Animation Details |
|---|---|---|---|
| **0.00** | Background Layer (`bgRef`) | `scale: 1.0` → `scale: 1.15` | Camera push-forward (moves outward) |
| **0.00** | Foreground Layer (`fgRef`) | `scale: 1.15` → `scale: 1.05`, `yPercent: 8` → `yPercent: 0` | Camera pull-back (moves inward) |
| **0.05** | Headline Text | `yPercent: 0` → `yPercent: -140`, `opacity: 1` → `opacity: 0` | Typography lift |
| **0.30** | Overlay Scrim | `opacity: 0.35` → `opacity: 0.60` | Scrim darken |
| **0.70** | Glassmorphic Panel | `autoAlpha: 0` → `autoAlpha: 1`, `y: 60` → `y: 0` | Details fade & slide |
| **0.85** | CTA Buttons | `autoAlpha: 0` → `autoAlpha: 1`, `y: 16` → `y: 0` | Stagger offset: `0.08` |

### 3. Known Failure Mode Prevention (CRITICAL)

#### Bug A: Headline Clipped on Initial Page Load
- **Cause**: Headline sits inside an `overflow-hidden` wrapper alongside image layers, causing text boundaries or line-height limits to be clipped, or initial `gsap.set()` is misaligned.
- **Mandatory Fixes**:
  - The image layers (`bgImage`, `fgImage`) must get their own `overflow-hidden` container wrappers.
  - The headline (`headlineRef`) and the glass panel (`cardRef`) must **not** share that container. Place them in a separate sibling wrapper with `overflow: visible` (or default flow).
  - Do not apply any transform to the headline element in static styles or Tailwind classes outside the GSAP timeline.
  - Provide generous vertical padding for the headline's flex container to prevent multi-line wraps from being cut off.

#### Bug B: Image Moves Outward and background Deforms / Warps
- **Cause**: Use of CSS `background-image` with `background-size`, or animating `width`/`height` instead of `scale` transforms, which distorts the aspect ratio.
- **Mandatory Fixes**:
  - Each layer must be an actual `<img>` element (not a CSS `background-image`), absolutely positioned with `inset: 0`, `w-full h-full`, `object-fit: cover`.
  - Do **not** animate `width`, `height`, `background-size`, or `background-position` anywhere.
  - The **only** animated property on the layers is `transform: scale(...)` (and `yPercent` on foreground) applied to the wrapping `<div>` or `<img>` element.
  - Explicitly set `transform-origin: 50% 50%` on the background layer wrapper, and `transform-origin: 50% 60%` on the foreground layer wrapper.

### 4. Responsiveness & Accessibility
- **`ScrollTrigger.matchMedia()`**:
  - **Mobile (`max-width: 767px`)**: Shorter pin distance (`end: '+=90%'`) and gentler scale curves (`bgImage` scale starts closer to 1, `fgImage` scale tops out at `1.08`).
  - **Accessibility (`prefers-reduced-motion: reduce`)**: Skip the pin and scale transforms entirely. Directly crossfade the panel and CTAs on scroll.
- **Semantics**: Image layers get `alt=""` and `role="presentation"`. The parent container gets a descriptive `aria-label`.

---

## Testing Decisions

### Seams for Verification
- **DOM Signature Seam**: Verify that the elements representing the background, foreground, and headline are correctly rendered in the DOM with their respective WebP paths.
- **GSAP Instance Cleanup**: Hook into the unmount phase of the React component to verify that `ScrollTrigger.getAll()` instances are properly cleared, leaving no orphaned scroll listeners in the browser.

### Manual Verification Steps
1. **Scroll-Link Accuracy**: Verify that as you scroll, the foreground scales down (moves inward) and the background scales up (zooms in), maintaining precise alignment.
2. **Text Contrast Check**: Inspect text elements on multiple viewports to ensure they remain legible (contrast ratio ≥ 4.5:1) against the skyline graphic at all progress coordinates.
3. **Reduced Motion Test**: Toggle "Reduce Motion" in system settings and reload the page. Verify that the hero section loads directly into its finished, post-reveal layout with zero animation or viewport pinning.

---

## Out of Scope

- Scroll-linked logic for other sections of the website.
- Complex WebGL shaders or Three.js integrations.
- Hosting assets externally on CDNs.

---

## Further Notes

- The headline copy is: **"Your Gateway to Greater China & Global Markets"**.
- Supporting detail copy inside the glassmorphism box: **"Establish, operate, and scale your business with Hong Kong's leading B2B corporate advisory firm. Complete company registration, banking integrations, and ongoing compliance."**
- CTA Buttons: Primary **"Schedule Consultation"** linking to `#contact` and Secondary **"Explore Services"** linking to `#services`.
