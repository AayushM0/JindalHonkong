# 01 — Component Scaffolding & Data Mapping

Status: ready-for-agent

## Parent

.scratch/expandable-services-cards/PRD.md

## What to build

Create the base primitive component `src/components/ui/expand-cards.jsx`. 
Modify `src/components/Services.jsx` to map each item in `servicesList` to a high-quality Unsplash image representing that service, and cleanly mount the `<ExpandOnHover>` component under the section container. 

Ensure the component compiles and imports successfully without any bundler or build issues.

## Acceptance criteria

- [ ] `src/components/ui/expand-cards.jsx` is created.
- [ ] `servicesList` in `src/components/Services.jsx` is updated with high-quality Unsplash image URLs.
- [ ] `<ExpandOnHover>` component is imported and mounted inside `Services.jsx`.
- [ ] `npm run build` exits with code 0.

## Blocked by

None - can start immediately
