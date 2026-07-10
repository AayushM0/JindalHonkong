# PRD: Hero Section Decorative Image Layer

**Label:** `ready-for-agent`

---

## Problem Statement

The Jindalsons Limited hero section currently renders as a plain white grid background with centered text and two CTA buttons. Visually the section feels flat and underweight — there is no depth or brand imagery anchoring the composition. The client has a prepared transparent cutout image (`helloreview.png`) that should appear in the lower portion of the hero, sitting between the background pattern and the text, grounding the section and adding visual richness without obscuring the headline or calls-to-action.

---

## Solution

Place a static decorative image layer inside the Hero section in the correct Z-order: above the background grid, below the foreground text. The image is horizontally centered and anchored to the bottom edge of the section. Its top edge must land **at or below the 50% vertical midpoint** of the section — the image occupies the bottom half or less, never reaching up into the text area. CSS masking is applied to the image element so that its edges fade into the surrounding white background. No animation. Image quality is preserved by importing via Vite's ES module asset pipeline.

---

## User Stories

1. As a site visitor, I want to see a brand image in the lower half of the hero section, so that the page feels visually rich and grounded rather than bare.
2. As a site visitor, I want the image to blend smoothly into the white background at its edges, so that it looks like it belongs on the page rather than being pasted on top.
3. As a site visitor, I want the badge, headline, subtitle, and CTA buttons to remain fully readable above the image, so that I can understand the value proposition without visual interference.
4. As a site visitor on mobile, I want the image to remain horizontally centered and properly sized, so that the composition looks intentional at all viewport widths.
5. As a site visitor, I want the image to occupy only the bottom half of the hero at most, so that the top half remains clean and the text hierarchy is unobstructed.
6. As a developer, I want the image imported as an ES module rather than a string path, so that Vite processes it through its asset pipeline without quality loss.
7. As a developer, I want the implementation scoped entirely to the Hero component, so that no other components, stylesheets, or configuration files are touched.
8. As a developer, I want a fallback image (`hello.png`) documented inline in the component, so that if the transparent cutout shows edge artifacts it can be swapped in immediately.
9. As a developer, I want the image to carry no animation or transition, so that the section remains performant and the feature scope stays narrow.
10. As a designer, I want the image to preserve its aspect ratio and never exceed 50% of the section height, so that it never distorts or overflows into the text area.

---

## Implementation Decisions

### Component scope
Only the Hero component is modified. No new files are created. No changes to global stylesheets, Tailwind config, or any other component.

### Z-stack layering (bottom to top)
1. Section background (`bg-white bg-grid`) — `z-0`
2. Decorative image element — `position: absolute`, `z-10`
3. Existing text content wrapper — `relative z-20`

### Image positioning
- Absolute, `bottom: 0`, `left: 50%`, `transform: translateX(-50%)`
- `max-h-[50%]` ceiling — top edge lands at or below the section midpoint
- `object-fit: contain`, aspect ratio preserved, no distortion

### Edge blending (CSS mask)
Intersecting gradients applied via inline `style` prop on the `<img>` element:
- Top gradient: fully visible at bottom (40%) fading to transparent at top (100%)
- Side gradients: transparent at 0%/100%, opaque at 10%/90%
- `maskComposite: "intersect"`, `-webkit-mask-composite: "source-in"`

### Image import and quality
- ES module import — Vite asset pipeline, no quality loss
- `hello.png` noted as one-line inline fallback comment for edge-artifact cases
- No lazy loading, no srcset, no compression attributes

### No animation
No GSAP, Framer Motion, CSS keyframes, or transitions on the image element.

---

## Testing Decisions

Manual visual verification at 375 px, 768 px, and 1440 px viewport widths:
- Image visible in the bottom half of the hero (top edge at or below midpoint)
- Edges fade smoothly — no hard border or halo
- Text content fully legible above the image
- `npm run build` exits 0

---

## Out of Scope

- Animations or scroll-linked behaviour
- Generating or editing source image files
- Changes to any component other than Hero
- Responsive art direction (different crops per breakpoint)
- Dark mode handling
- Runtime `onError` fallback switching

---

## Further Notes

The CSS mask is additive to the PNG alpha channel — areas already transparent in `helloreview.png` remain transparent regardless of the mask. The `max-h-[50%]` constraint means if the image's natural height is shorter than 50% of the section, no clipping occurs; if taller, the cap kicks in.
