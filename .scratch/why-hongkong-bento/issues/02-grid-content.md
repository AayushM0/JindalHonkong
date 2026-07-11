# 02 — Grid Content, Icons & Hover Styles

Status: resolved

## Blocked by

- `01-components-setup.md`

## What to build

Populate the `src/components/WhyHongKong.jsx` bento cards with the actual financial and corporate advantages of Hong Kong, using the copy provided in `businessDetails.md`.

### Content mapping:
- **Card 1 (Strategic Gateway)** (Center tall card: `lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3`): "Strategic Gateway" - Direct access to Greater China and Asian markets, 100% foreign ownership, strategic hub.
- **Card 2 (Tax Optimization)** (Left double-height card: `lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3`): "Tax Optimization" - profits tax regime starting at 8.25%, with zero VAT, zero dividend tax, or Capital Gains tax.
- **Card 3 (Capital Freedom)** (Left bottom card: `lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4`): "Capital Freedom" - 0% dividend tax, no foreign exchange controls, free flow of capital.
- **Card 4 (Rapid Setup)** (Right top card: `lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2`): "Rapid Setup" - 1 to 3 days incorporation speed, 100% digital registration documents.
- **Card 5 (Legal & IP Security)** (Right bottom card: `lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4`): "Legal & IP Security" - Robust common law framework, English-fluent legal system, strong intellectual property protection.

### Icons:
Use standard icons imported from `lucide-react`:
- Strategic Gateway: `Globe`
- Tax Optimization: `Percent`
- Capital Freedom: `Coins`
- Rapid Setup: `Clock`
- Legal & IP Security: `ShieldCheck`

### Visual design details:
- Each card must use standard hover styles matching the other site cards: a transition to a white background with elevated shadow and a subtle offset: `hover:bg-white hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-custom-ease`.
- Place a subtle, decorative translucent background icon or SVG grid inside each card (positioned absolute, low opacity) to recreate the look of a premium background graphic.
- Ensure all copy matches the B2B corporate tone.

## Acceptance criteria

- [ ] All 5 cards display the correct copy, icons, and titles.
- [ ] Card hover states transition smoothly with `ease-custom-ease`.
- [ ] Mobile layout collapses to a vertical stack, while desktop layout remains a strict 3x3 Bento grid.
- [ ] Section spacing matches the 128px rhythm of the page.
- [ ] `npm run build` exits 0.
