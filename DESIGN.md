# StitchMatrix Design System & Specifications

> Architecture: **Linear & Stripe-Grade Dark Enterprise Theme**  
> Typography: **Inter & San Francisco UI + JetBrains Mono Monospace**  
> Palette: **Pure Charcoal Slate (#09090B / #121214 / #18181B / #27272A)**

---

## Brand & Philosophy

StitchMatrix embodies a high-velocity, precision-grade command interface built for growth engineers and marketing executives. The design converges **Developer-Grade Minimalism** with **Enterprise SaaS Utility** (similar to Linear, Stripe, and Raycast).

- Zero neon hacker tropes or distracting animations.
- Subtle specular lighting and crisp 1px borders (`#1E1E22` and `#27272A`).
- Strict typography hierarchy: Sentence/Title case for UI controls, reserving monospace exclusively for script frames and payloads.

---

## Color Palette Tokens

```yaml
canvas:
  background: '#09090B'        # Pure charcoal deep canvas
  surface-base: '#121214'      # Card and container surface
  surface-raised: '#18181B'    # Interactive components and inputs
  surface-hover: '#202024'     # Hover state
  surface-active: '#27272A'    # Active tab state

border:
  subtle: '#1E1E22'            # Primary card border
  interactive: '#27272A'       # Input and button border
  focused: '#3B82F6'           # Focus outline state

typography:
  primary: '#F4F4F5'           # High contrast headings and titles
  secondary: '#D4D4D8'         # Body content and script canvas text
  muted: '#A1A1AA'             # Labels and metadata
  faint: '#71717A'             # Secondary timestamps and hints
  disabled: '#52525B'          # Disabled states

accents:
  primary-blue: '#2563EB'      # Solid Cobalt CTA button
  accent-sky: '#3B82F6'        # Linear Blue progress bars and highlights
  live-emerald: '#10B981'      # Status indicator and verification badge
  warning-amber: '#F59E0B'     # Rate-limit alert
```

---

## Typography Hierarchy

- **UI Headers & Executive Navigation**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`
  - Weight 600 / 14px: Section headers
  - Weight 500 / 13px: Card titles
  - Weight 450 / 12px: Inputs and dropdown selections
  - Weight 400 / 11px: Secondary metadata
- **Script Matrix & Code Payloads**: `JetBrains Mono`, `SF Mono`, `Menlo`, `monospace`
  - Weight 400 / 11.5px: Frame copy (`01. Hook`, `02. Thesis`, `03. CTA`) with `1.65` line height for maximum legibility.

---

## Component Standards

### 1. The Telemetry Header
- Title: `StitchMatrix | Enterprise Distribution Suite`
- Status Pill: `Live Sync` with a steady 6px emerald status dot (`#10B981`).
- Close Button: 1px transparent border, shifts to `#18181B` on hover.

### 2. The Optimization Index
- Progress Bar: 5px height, neutral track `#1F1F23`, fill in `#3B82F6`.
- Metrics: Clear `94.2% Score` paired with `+450% surge · 14ms latency · 48 nodes`.

### 3. Target Market Vector & Filter Badges
- Select Menu: Dark background `#18181B`, border `#27272A`, 8px radius.
- Segmented Filter Badges: `#1E2433` with `#2E4C7E` border and `#93C5FD` text for active states.

### 4. Segmented Control (Mutation Tabs)
- Pill container: `#141416` with `#222226` border.
- Active pill: `#202024` with `#FFFFFF` text and subtle shadow.

### 5. Script Canvas (Editable Frames)
- Structured block frames:
  - `01. Hook Element`: Blue accent bar (`#3B82F6`)
  - `02. Core Thesis`: Sky accent bar (`#60A5FA`)
  - `03. Call-to-Action`: Emerald accent bar (`#10B981`)
- Inline editing support with instant clipboard copy.

### 6. Primary Action Button
- Background: `#2563EB` (Cobalt Blue)
- Hover: `#1D4ED8`
- Text: `Sync Assets to GitHub` with SVG branch graphic.
