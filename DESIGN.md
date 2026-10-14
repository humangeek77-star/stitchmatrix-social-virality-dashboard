# StitchMatrix Design System & Specifications

> Exported from Stitch Project: **StitchMatrix Social Virality Dashboard** (`projects/10581708998241962220`)

---
name: StitchMatrix
colors:
  surface: '#131316'
  surface-dim: '#131316'
  surface-bright: '#39393c'
  surface-container-lowest: '#0e0e11'
  surface-container-low: '#1b1b1e'
  surface-container: '#1f1f22'
  surface-container-high: '#2a2a2d'
  surface-container-highest: '#353438'
  on-surface: '#e4e1e6'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#e4e1e6'
  inverse-on-surface: '#303033'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#a4c9ff'
  on-secondary: '#00315d'
  secondary-container: '#0267b8'
  on-secondary-container: '#d6e5ff'
  tertiary: '#4edea3'
  on-tertiary: '#003824'
  tertiary-container: '#00a572'
  on-tertiary-container: '#00311f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#d4e3ff'
  secondary-fixed-dim: '#a4c9ff'
  on-secondary-fixed: '#001c39'
  on-secondary-fixed-variant: '#004883'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#131316'
  on-background: '#e4e1e6'
  surface-variant: '#353438'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: '0'
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.02em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: '0'
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

The design system embodies a high-velocity, precision-grade command interface built for growth engineers, algorithmic marketers, and virality operators. The visual personality balances technical rigor with tactical dynamism—functional, uncompromising, hyper-dense, and deeply modern.

The design movement converges **Developer-Grade Minimalism** with **Cybernetic Instrumentation**. Instead of decorative skeuomorphism or passive flat surfaces, the aesthetic relies on layered carbon neutral planes, razor-thin luminous stroke treatments, and hyper-targeted electric blue luminescence that pulses at points of real-time state change. Typography functions as raw data infrastructure: proportional geometric sans-serifs anchor structural metrics, while monospaced registers render raw payloads, injection webhooks, and performance deltas.

## Colors

The palette establishes a high-density, low-fatigue dark environment tuned for multi-monitor operations and real-time streaming interfaces.

- **Foundations**: The canvas establishes root depth with Canvas Core (`#09090B`) transitioning up into Panel Base (`#121214`), Surface Raised (`#18181B`), and Surface Hover/Active (`#27272A`).
- **Primary Accents**: Core interaction paths and operational states leverage Electric Blue (`#3B82F6`) grounded by Deep Blue (`#2563EB`) and highlighted by Glow Blue (`#60A5FA`).
- **Telemetry & Validation**: Status tiers employ strict semantic assignments: Live Injection / Viral Lift uses Emerald (`#10B981`), Anomalies / Hijack Queue Warnings use Amber (`#F59E0B`), and Network Sever / API Drops trigger Crimson (`#EF4444`).
- **Borders & Linework**: Subtle structural delineation is driven by Subsurface Stroke (`#27272A`), interactive borders (`#3F3F46`), and active signal borders (`rgba(59, 130, 246, 0.4)`).

## Typography

Typography prioritizes information density and split-second scan efficiency. Two core font engines power the system:

- **Inter**: Drives structural navigation, operational cards, executive summaries, and system settings. Its tight tabular spacing and distinct glyph forms prevent optical collisions in high-density tables.
- **JetBrains Mono**: Assigned to all algorithmic telemetry, script payload logs, status badges, counter tickers, and JSON payloads. All numerical values inside analytical graphs and tables must inherit mono numerals (`font-feature-settings: 'tnum' 1`) to eliminate optical drift during real-time streaming updates.

## Layout & Spacing

The layout philosophy follows a rigid, fluid 12-column instrumentation matrix designed to fit both multi-monitor 4K trading-desk setups and ultra-compact laptop screens without layout rupture.

- **Grid Architecture**: 12-column grid utilizing a 4px modular sub-grid. Columns adapt dynamically using percentage fills bound by strict min-width constraints (minimum card width: 280px).
- **Responsive Adaptations**:
  - **Desktop (>= 1280px)**: Persistent collapsible vertical telemetry sidebar (64px mini / 240px expanded), 12-column workspace, dual pane script/preview configurations.
  - **Tablet (768px - 1279px)**: 8-column layout, primary metrics strip pinned horizontally beneath header, script inspection drawers shift to slide-over panels.
  - **Mobile (< 768px)**: 4-column stacked flow, navigation condensed to top status bar with quick-switch sheet, tables convert to scannable data-card list items.

## Elevation & Depth

Visual hierarchy does not use diffuse multi-axis drop shadows. Depth is established through **Tonal Stacking**, **Micro-Borders**, and **Specular Edge Light**.

- **Level 0 (Canvas Base)**: Deep `#09090B` foundation. No border, no glow.
- **Level 1 (Sub-Panels & Data Grids)**: `#121214` surface wrapped in a crisp 1px stroke of `#27272A`.
- **Level 2 (Interactive Floating Modules & Cards)**: `#18181B` surface with a dual border treatment: top border `rgba(255, 255, 255, 0.08)` for downward light catch, lateral/bottom borders `rgba(39, 39, 42, 0.8)`. 
- **Level 3 (Modals, Context Menus & Command Palette)**: `#18181B` backed by a high-intensity backdrop blur (`backdrop-filter: blur(12px)`) and a directional ambient glow: `box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.2), 0 20px 40px -15px rgba(0, 0, 0, 0.7)`.
- **Active State Highlights**: Elements undergoing real-time viral injection emit a concentrated, focused electric aura (`box-shadow: 0 0 16px -2px rgba(59, 130, 246, 0.35)`).

## Shapes

The geometric framework favors tight, engineered corners (`roundedness: 1`). Radii of 4px (`0.25rem`) dominate atomic elements such as buttons, form fields, badges, and code blocks, transitioning to 8px (`0.5rem`) on parent containers, table shells, and viewport modals. 

This strict shape discipline maintains an enterprise developer terminal aesthetic, eliminating unnecessary visual weight while preserving crisp touch targets and distinct container boundaries.

## Components

### Buttons
- **Primary Action (Deploy / Inject)**: Solid Electric Blue (`#2563EB`) surface with subtle top-edge highlight, white text (`Inter 13px SemiBold`), 4px border radius. Hover introduces a bright gradient shift toward `#3B82F6` and an electric rim glow.
- **Secondary (Inspect / Abort)**: Ghost treatment on `#18181B` background with a 1px `#27272A` outline. Hover shifts background to `#27272A` and border to `#3F3F46`.
- **Destructive**: Low-luminosity crimson tint with crisp red border (`rgba(239, 68, 68, 0.3)`), active states transition to solid `#EF4444`.

### Badges & Status Indicators
- Construct using `JetBrains Mono` uppercase micro-type (10px).
- Status indicators feature an 8px circular beacon with a real-time pulse animation for active hijacking/monitoring threads:
  - *Active Sync*: `#10B981` core with breathing opacity aura.
  - *Queued*: `#3B82F6` solid with static border.
  - *Rate-Limited*: `#F59E0B` with warning stripe pattern.

### Input Fields & Search Bars
- Background set to `#121214` with a 1px inset border of `#27272A` chips.
- Placeholder text in muted `#71717A`.
- Focus ring: Sharp 1px outline of `#3B82F6` accompanied by a 2px outer glow (`rgba(59, 130, 246, 0.2)`). No default browser outlines.
- Fast Command Inputs (`Cmd+K`) integrate monospace shortcut indicators (`JetBrains Mono`, `#A1A1AA` badge on `#27272A`).

### Cards & Metrics Modules
- Constructed on `#121214` with an upper border highlight. 
- Headers pair an Inter headline alongside a JetBrains Mono secondary telemetry metric (e.g., `VELOCITY: +482% / MIN`).
- Embed micro sparklines directly into card footers using razor-thin SVG strokes (1.5px) in `#3B82F6` with subtle vertical gradient fills tapering to transparent.

### Checkboxes & Toggle Switches
- **Checkboxes**: 16x16px squares with 3px border radius. Unchecked: `#121214` with `#3F3F46` border. Checked: `#2563EB` fill with sharp white check glyph.
- **Toggle Switches**: Compact pill track (18px height, 32px width) in `#27272A`. Knob shifts from `#71717A` (inactive) to high-white `#FFFFFF` over an active `#2563EB` track.

### Script & Payload Viewers
- Full-width dark module (`#09090B`) with line-number gutter (`#3F3F46` text) and code syntax highlighting configured for virality automation scripts: functions in `#60A5FA`, strings in `#34D399`, and dynamic parameters in `#F472B6`.
