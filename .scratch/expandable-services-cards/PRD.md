# PRD: Expandable Services Cards

**Label:** `ready-for-agent`

---

## Problem Statement

The current B2B Core Advisory Services section renders as a static 3-column grid of cards. While clean, this presentation lacks interactivity, visual richness, and a modern premium design aesthetic. The client wants to replace these static cards with an interactive, horizontal expand-on-hover card layout on desktop, grounding each service with relevant background imagery and smooth transitions without altering the heading and subtitle text.

## Solution

Implement an interactive, horizontal accordion `ExpandOnHover` card layout for desktop viewports, and an optimized vertical layout for mobile viewports. Each card represents one of the 8 B2B advisory services, with:
- An Unsplash stock background image representing the service.
- A dark overlay for contrast.
- Centered icon and vertical/rotated title when collapsed on desktop.
- Smooth transition to horizontal layout showing the icon, title, and full description text when hovered/expanded.

## User Stories

1. As a site visitor on desktop, I want to hover over a service card so that it expands smoothly, showing me the full service description.
2. As a site visitor, I want the unexpanded cards to show the service icon and title vertically so that I can easily scan the available services even when collapsed.
3. As a site visitor, I want to see relevant background imagery for each service card, so that the website feels visually rich and engaging.
4. As a site visitor, I want all text inside the cards to be highly readable, so that the dark background images do not interfere with my reading.
5. As a site visitor on mobile, I want the cards to stack vertically and be fully legible, so that I get an optimized reading experience on smaller screens.
6. As a developer, I want the expand-on-hover logic encapsulated in a reusable primitive component `src/components/ui/expand-cards.jsx`, so that the design remains clean and modular.
7. As a developer, I want the component to build cleanly with no compiler issues, so that the deployment process remains stable.

## Implementation Decisions

- **Modules modified:** Create `src/components/ui/expand-cards.jsx` and modify `src/components/Services.jsx`.
- **Component Interface:** The `ExpandOnHover` component will receive the `services` list as a prop. Each service object in the list contains `title`, `description`, `icon` (Lucide component), `image` (Unsplash background URL), and `themeKey`.
- **State Management:** A local state `expandedIndex` (default to the first card, e.g. `0`) tracks the currently hovered card index on desktop.
- **Hover Transitions:** Hover handlers (`onMouseEnter`) update `expandedIndex` to expand the card smoothly via Tailwind CSS transitions (`transition-all duration-500 ease-in-out`).
- **Responsive Behavior:** 
  - On desktop (`lg:flex`): Card width dynamically scales between `5rem` (collapsed) and `24rem` (expanded).
  - On mobile (`grid-cols-1`): Render as a vertical stack of cards (`height: 20rem`) where descriptions are always visible.

## Testing Decisions

- **Testing Seam:** DOM verification of the rendered output in `Services.jsx` (checking that 8 cards are rendered, and that hover states dynamically change class widths and toggle visibility of descriptions).
- **Manual Verification:** Ensure visual transitions are smooth, text contrast remains high, and `npm run build` exits with code 0.

## Out of Scope

- Dynamic database integration for services (a static React array is sufficient).
- Custom 3D animations or GSAP timelines on hover (standard Tailwind transitions are sufficient and performant).

## Further Notes

- Unsplash stock images are selected to align with the professional corporate advisory context.
- Using a subtle vertical layout for collapsed titles maintains space efficiency and gives a high-end editorial look.
