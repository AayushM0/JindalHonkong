# PRD: Company Formation Process Section

**Label:** `ready-for-agent`

---

## Problem Statement

The current B2B advisory homepage needs to showcase the 4-step Company Formation Process of Jindalsons Limited below the Core Services section. However, presenting process steps as standard text lists or simple grids lacks engagement and visual premium feel. The problem is to create an immersive, cinematic, scroll-scrubbed scrollytelling experience where a blueprint-to-building construction video plays back frame-by-frame in direct 1:1 sync with the user's scroll position, while process text overlays appear and fade out as the building constructs itself.

## Solution

Build a pinned scroll-scrubbed section (`ProcessSection`) immediately below the `Services` component.
- The background is a `<canvas>` element displaying a pre-rendered, downscaled, WebP frame sequence extracted from the construction source video.
- As the user scrolls through the pinned section, the video frames scrub smoothly from beginning to end.
- A dark directional gradient overlay (`.process-scrim`) ensures readable text contrast.
- The 4 process steps are displayed sequentially on the left. Only one step text is visible at a time. The transition uses a staggered fade/translate animation with a brief transition gap (about 4% of scroll) where no step text is fully visible, allowing the canvas visual to "breathe".
- A persistent step index counter (e.g., `01 / 04`) updates at the exact midpoint of transitions.
- The system is fully optimized for mobile (reduced scroll height, frame sampling rate reduction) and accessibility (supports `prefers-reduced-motion` with static fallbacks).

## User Stories

1. As a desktop website visitor, I want the background video to scrub exactly in sync with my scrolling speed so that I feel in control of the visual build progression.
2. As a desktop website visitor, I want the building to construct itself through distinct phases (blueprint -> steel skeleton -> glazing -> final building) aligned with each step of the company formation text.
3. As a website visitor, I want the text overlays to be highly readable even against busy construction visuals, so that I don't experience strain while reading.
4. As a website visitor, I want a persistent indicator showing which process step (e.g. "01 / 04") is currently active, so that I always know where I am in the formation journey.
5. As a website visitor, I want the process text to fade out and the next step to fade in without overlapping heavily, so that the screen feels clean during transitions.
6. As a website visitor with motion sensitivities, I want the canvas animation to disable and show static content if I have prefers-reduced-motion enabled, so that I can browse comfortably.
7. As a mobile website visitor, I want the section height and performance to be optimized so that it doesn't cause lag, battery drain, or long scroll lengths on my device.
8. As a developer, I want all assets (frames) to be preloaded and decoded off-screen using a manifest.json file, so that there is no frame flickering or blank canvas states on fast scroll.
9. As a developer, I want the canvas drawing loop to be decoupled from React's state re-renders, so that scroll interactions remain at a smooth 60fps.

## Implementation Decisions

- **Modules modified / built:**
  - Create a new component `src/components/ProcessSection.jsx` and its CSS file `src/components/ProcessSection.css`.
  - Integrate `<ProcessSection />` immediately below `<Services />` in the main app layout.
  - Create an asset pipeline directory under `/public/assets/construction/` containing the extracted WebP frames and a `manifest.json`.
- **Canvas Drawing Seam:**
  - Replicate the canvas `object-fit: cover` aspect ratio cropping math from the hero component.
  - Draw frames using a direct canvas context `drawImage` call driven by GSAP ScrollTrigger's `onUpdate` hook, completely bypassing React component state updates.
- **Scroll Mapping & Step Ranges:**
  - Map scroll progress ranges non-linearly to match the visual milestones of the construction video:
    - Step 1 (Strategic Consultation): 0% - 25% (Site survey / blueprint wireframe still resolving into foundation)
    - Step 2 (Document Preparation): 25% - 50% (Structural steel skeleton rising)
    - Step 3 (Registry Submission): 50% - 80% (Facade/curtain-wall glazing installing)
    - Step 4 (Banking & Tax Setup): 80% - 100% (Completed building, golden-hour final reveal)
- **Preload & Memory Guard:**
  - Use `IntersectionObserver` with a `200% 0px` root margin to start asset preloading early.
  - Preload the first 10 frames synchronously (showing a skeleton loader) and background-decode the remaining frames sequentially via `Image.prototype.decode()`.
  - On page scroll above the section, release/cleanup references to other heavy frame arrays (e.g., Hero) to limit peak memory usage.
- **GSAP ScrollTrigger Config:**
  - Enable pinning of the section over a `400vh` scroll duration wrapper.
  - Set a numeric scrub value (e.g., `0.3` to `0.5`) to smooth out scroll jitter without disconnecting the user from the scrub control.

## Testing Decisions

- **Testing Seams:**
  - Check DOM element visibility: Verify that one `.process-step` element is visible at a time during scroll mapping triggers, and verify that the HUD counter correctly transitions at midpoints.
  - Scroll Performance Audit: Scroll performance is tested by measuring frame drop and "Long Tasks" (>50ms) in the browser DevTools Performance tab.
  - React Render Auditing: Verify that scrolling does not trigger React component render cycles on the parent or canvas wrapper (verified via React DevTools Profiler).
  - Clean Production Build: Run `npm run build` to ensure no linting, typescript, or bundler issues are introduced.

## Out of Scope

- Integrating a custom audio track synced with scroll position.
- Allowing user drag/scrub controls directly on the canvas (scroll position is the sole driver).
- Video source formats other than sequential WebP frames (no native `<video>` scrubbing due to cross-browser performance and synchronization discrepancies).

## Further Notes

- The asset pipeline commands (using `ffmpeg` and `cwebp`) will be executed once to populate `/public/assets/construction/` before code integration.
- Responsive behaviors will adjust the wrapper height to `240vh` and sample every 2nd frame index below `768px` viewport widths to save GPU overhead.
