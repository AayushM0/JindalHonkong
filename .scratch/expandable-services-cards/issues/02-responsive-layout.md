# 02 — Responsive Grid & Flex Accordion Layout

Status: ready-for-agent

## Parent

.scratch/expandable-services-cards/PRD.md

## What to build

Implement the responsive layout structure for both mobile and desktop screen sizes inside `src/components/ui/expand-cards.jsx`. 

- **Mobile Viewport:** Renders the cards as a vertical stack of cards (`height: 20rem`), displaying the background image, dark gradient overlay, service icon, title, and the full description text. All text must be highly readable.
- **Desktop Viewport (`lg:flex`):** Renders the cards horizontally in a row. Setup the flexible widths where unexpanded cards default to `5rem` (80px) and the expanded card defaults to `24rem` (384px) using Tailwind transitions (`transition-all duration-500 ease-in-out`).

## Acceptance criteria

- [ ] Desktop layout renders cards horizontally in a row with correct width transitions.
- [ ] Mobile layout collapses to a vertical stack of 20rem high cards.
- [ ] Text remains readable and is correctly positioned on all viewports.
- [ ] `npm run build` exits with code 0.

## Blocked by

- .scratch/expandable-services-cards/issues/01-scaffolding-data.md
