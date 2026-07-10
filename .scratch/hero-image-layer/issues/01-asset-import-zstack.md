# 01 — Asset import & Z-stack scaffolding

Status: ready-for-agent

## What to build

Import the two hero image assets (`helloreview.png` and `hello.png`) as ES modules inside the Hero component. Restructure the Hero JSX so the section container holds two distinct layers in the correct Z-order:

1. An `absolute`-positioned image placeholder element at `z-10` (the future decorative layer — may render as an empty `<div>` or invisible `<img>` at this stage)
2. The existing text content wrapper promoted to `relative z-20` so it sits above the image layer

The goal of this slice is to establish the correct structural scaffolding and confirm the build is green before any positioning or visual work begins. The image does not need to be visible or correctly placed at the end of this slice.

## Acceptance criteria

- [ ] Both image assets are imported as ES modules (not string paths) in the Hero component
- [ ] A one-line comment in the import block documents `hello.png` as the fallback for edge-artifact cases
- [ ] The section container retains its existing `relative overflow-hidden` classes
- [ ] An image element (or placeholder) exists in the JSX at `z-10`, between the background and the text wrapper
- [ ] The text content wrapper has `relative z-20` applied
- [ ] `npm run build` exits 0 with no unresolved asset warnings
- [ ] No other component, stylesheet, or configuration file is touched

## Blocked by

None — can start immediately.
