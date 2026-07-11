# 03 — Expand-on-Hover Hover States and Vertical Titles

Status: ready-for-agent

## Parent

.scratch/expandable-services-cards/PRD.md

## What to build

Implement the interactive behavior and styling for hover states in `src/components/ui/expand-cards.jsx`.

- **State Management:** Implement local React state `expandedIndex` (default to the first card, `0`) and set up mouse event handlers (`onMouseEnter` / `onMouseLeave`) to track which card is active on desktop.
- **Collapsed Styling:** Collapsed cards (`width: 5rem`) show a centered Lucide icon and a vertically rotated title (e.g. using `writing-mode: vertical-lr` or rotation classes) to make it scannable.
- **Expanded Styling:** When a card is hovered/expanded, smoothly animate the width to `24rem` (`w-96`), rotate the title back to normal (horizontal), and fade in the service description cleanly (`opacity-100` with transition delay).
- **Background Imagery:** Ensure the card's background image has a subtle dark gradient overlay (`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20`) to guarantee high text contrast and legibility.

## Acceptance criteria

- [ ] Card width expands smoothly to `24rem` on hover and collapses to `5rem` when not active.
- [ ] Collapsed cards display icon and vertically rotated title.
- [ ] Expanded cards display normal horizontal title and description text.
- [ ] Text contrast remains high due to background image dark overlays.
- [ ] `npm run build` exits with code 0.

## Blocked by

- .scratch/expandable-services-cards/issues/02-responsive-layout.md
