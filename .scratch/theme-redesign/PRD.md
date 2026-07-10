# PRD: Jindalsons Limited "Corporate Professional" Redesign

> **Label**: `ready-for-agent` · **Target Components**: Main layout components · **Tech Stack**: React 19 + Tailwind CSS + GSAP + Framer Motion

---

## 1. Problem Statement

Jindalsons Limited requires a premium B2B corporate advisory landing page that commands enterprise trust. The current layout is inconsistent and uses generic typography (IBM Plex Sans), gold colors, and complex scroll-video mechanisms that feel less authoritative for international corporate clients, family offices, and emerging founders. The new theme redirects the brand identity into a clean, technical enterprise aesthetic using a strict 40px grid rhythm, Slate and Primary Blue colors, Satoshi typography, and interactive simulated product visuals.

---

## 2. Core Style & Typography Spec

- **Typography**: Satoshi sans-serif font. Headers must be Bold/ExtraBold with tracking `-0.02em`. Body text in Slate 500/600 with `1.625` line-height.
- **Colors**:
  - Primary: `#2563eb` (Blue 600)
  - Deep Slate: `#151e2e` (Used for dark elements, card surfaces, and toggles)
  - Dark Background / Slate 950: `#020617` (Used for dark panels like Stats and CTA text elements)
  - Background: `#ffffff`
  - Muted BG: `#f8fafc`
  - Accents: Success (`#16a34a`), Warning (`#d97706`), Error (`#dc2626`)
  - Border: `1px solid #e2e8f0` (Borders and divider lines)
- **Borders & Radius**: Border-radius exactly `12px` for cards, `8px` for buttons/toggles. Strict vertical rhythm spacing of `128px` between major sections.
- **Effects**: Navigation uses a glass-panel filter (`background: rgba(255,255,255,0.7)` with `12px` backdrop blur). Hero uses a `40px` gray grid line pattern overlay.
- **Animations**: fadeInUp reveals (`0.8s` duration, `20px` offset). Cubic-bezier transition `cubic-bezier(0.4, 0, 0.2, 1)` for all hover states.

---

## 3. Structure & Narrative Path

1. **Navigation (Header)**: Fixed 64px, logo icon, center links (Platform, Solutions, Security, FAQ), and Book Demo Slate 900 button.
2. **Hero Section**: Pulsing green dot status badge, 72px bold title, dual CTAs, grid background, and the simulated Browser Dashboard Preview.
3. **Social Proof**: Trusted partner logotypes in grayscale layout.
4. **Core Modules (Services)**: 3-column grid of B2B advisory solutions (Incorporate, Tax, Secretarial, etc.) with square icons in tinted boxes.
5. **Quantifiable Impact (Stats)**: Slate 950 background with 10% opacity concentric circles and 4 animated count-up KPIs (2000ms quartic ease).
6. **Security Proof (Security UI)**: Certification checklist on the left, interactive Policy Toggle card with glass-morphic switches on the right, overlapping with a floating Slate 800 "Threat Blocked" badge.
7. **FAQ**: Satoshi styled interactive accordion answering core HK formation/taxation details.
8. **CTA**: Clean Slate/Blue high-conversion B2B CTA panel.
9. **Detailed Footer**: 6-column grid structure (logo/info, Products, Resources, Company, Legal) with copyright and a pulsing green system status dot.

---

## 4. Technical Implementation Decisions

- **Quartic Ease Count-Up**: Stats counter must use an IntersectionObserver triggering a 2000ms animation based on `1 - Math.pow(1 - progress, 4)`.
- **High-Density Audit Log Table**: Integrated into the browser preview showing actual HK registration events with hover highlights and colored badges.
- **Glass-Morphic Toggles**: Interactive state switches (MFA, IP Whitelisting, Key Rotation) mapped to active states that animate track translation and slightly glow on hover.
