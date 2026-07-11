# 02 — Image positioning, sizing & edge blending

Status: resolved

## What to build

Wire the imported `helloreview.png` asset into the image element scaffolded in slice 01. Apply all positioning, sizing, and edge-blending styles so the image is visually correct end-to-end.

**Positioning:** The image must be absolutely positioned, anchored to the bottom edge of the section and horizontally centered. Its top edge must land **at or below the 50% vertical midpoint** of the section — the image occupies the bottom half or less, never reaching into the text area. Achieve this with `bottom: 0`, horizontal centering via `left: 50% + translateX(-50%)`, and a `max-h-[50%]` ceiling that prevents the image from exceeding half the section height. Aspect ratio must be preserved with `object-fit: contain` — no cropping, no stretching.

**Edge blending:** Apply an intersecting CSS mask via an inline `style` prop on the `<img>` element. The mask must:
- Fade the top edge of the image from visible (bottom ~40%) to transparent (top), so the image appears to emerge from the section floor
- Fade the left and right edges from transparent (outermost) to opaque (10% in from each side), preventing hard side borders

Both `-webkit-mask` and standard `mask` properties must be set for cross-browser coverage.

**Quality:** The `src` must use the ES module import variable — not a string literal path. No lazy loading, no srcset, no compression attributes.

**Fallback:** If `helloreview.png` produces a visible halo or hard edge at runtime after the mask is applied, swap the import to `hello.png`. The inline comment from slice 01 documents this.

## Acceptance criteria

- [ ] Image renders in the bottom half of the hero section, horizontally centered
- [ ] Top edge of the image is at or below the 50% vertical midpoint of the section at all tested viewports (375 px, 768 px, 1440 px)
- [ ] Image does not overflow the section container
- [ ] Aspect ratio is preserved — no distortion
- [ ] Top edge of the image fades smoothly into the white background — no hard cutoff line
- [ ] Left and right edges of the image fade smoothly into the white background
- [ ] Badge, h1, subtitle, and both CTA buttons are fully legible above the image at all tested viewports
- [ ] No animation, transition, or keyframe is applied to the image element
- [ ] `npm run build` exits 0
- [ ] No other component, stylesheet, or configuration file is touched

## Blocked by

- `01-asset-import-zstack.md`
