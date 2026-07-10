# 01 — Component File & App Scaffolding

Status: ready-for-agent

## What to build

Create the new file `src/components/WhyHongKong.jsx` and import it in `src/App.jsx`, mounting it immediately below the `<Hero />` section and above `<Services />`.

The component must scaffold:
1. A base `<section>` element with standard classes, an ID of `why-hongkong`, and a standard vertical rhythm spacing of `py-16`.
2. A section header block containing a tinted category badge ("Advantage"), a `section-heading` title ("Why Locate in Hong Kong?"), and a brief descriptive subtitle.
3. The structural wrapper for the Bento Grid: a container element styled to render as a 1-column grid on mobile and a 3-column, 3-row grid on desktop (`grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-3 gap-6`).
4. An initial set of 5 placeholder grid cards that map to the target grid slots, validating that the 3x3 layout resolves correctly on large viewports.

Verify that the build is green.

## Acceptance criteria

- [ ] `src/components/WhyHongKong.jsx` is created and imports successfully in `src/App.jsx`.
- [ ] Section spacing uses `py-16` padding to ensure a clean 128px vertical rhythm between the Hero content and Services content.
- [ ] The grid container has the correct responsive classes for mobile stack and desktop 3x3 layout.
- [ ] A set of 5 placeholder cards render in the correct grid slots.
- [ ] `npm run build` exits with code 0.

## Blocked by

None — can start immediately.
