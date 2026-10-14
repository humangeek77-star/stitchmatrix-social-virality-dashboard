# StitchMatrix — Script Matrix Studio (Chrome Extension Manifest V3)

> Enterprise Organic Distribution Suite & In-DOM Script Matrix Studio for TikTok, YouTube Shorts, and Instagram Reels desktop environments.

## Architecture Highlights

1. **Manifest V3 Compliant**: Built strictly for Manifest V3 with explicit host permissions scoped exclusively to:
   - `https://*.tiktok.com/*`
   - `https://*.youtube.com/*`
   - `https://*.instagram.com/*`
2. **Complete Shadow DOM Isolation**: All UI widgets and CSS rules are fully sandboxed inside an open Shadow DOM root. This guarantees zero CSS bleed or conflict with native platform stylesheets.
3. **Passive Execution (Zero Lag)**: Lightweight native DOM manipulator requiring 0 external libraries or heavy runtimes.
4. **380px Slide-out Sidebar**: Smooth `cubic-bezier(0.16, 1, 0.3, 1)` transition from the right edge when triggered.

---

## Installation & Testing

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** in the top-right corner.
3. Click **Load unpacked** and select the `/extension` directory inside this repository.
4. Navigate to any supported platform:
   - [TikTok](https://www.tiktok.com)
   - [YouTube Shorts](https://www.youtube.com/shorts)
   - [Instagram Reels](https://www.instagram.com/reels)
5. Trigger the sidebar via:
   - Floating edge trigger tab on the right edge of the screen
   - Keyboard shortcut `Alt+S` or `Ctrl+Shift+S` (`Command+Shift+S` on macOS)
   - Extension action icon in the Chrome toolbar

---

## Features Replicated from Stitch Design

- **The Telemetry Status Bar**: Displays `StitchMatrix | Enterprise Distribution Suite` with pulsing emerald dot (`API Secure / Sync Active`).
- **The Optimization Index**: Animated progress bar tracking steadily to `94.2% Optimization Score` with real-time velocity metrics (`+450% SURGE`, `14ms`).
- **Target Market Vector**: Clean dropdown selector (`Career / Tech Coach`, `B2B SaaS Founder`, `Fintech & Wealth Ops`) with interactive toggle badges (`Tone: Aggressive Hook`, `Length: 35s`).
- **Script Production Terminal**: High-density monospace editor canvas with sequential block frames:
  - `01 | Hook Element`
  - `02 | Core Thesis`
  - `03 | Retentive Call-To-Action`
  - Bottom metadata ribbon: `• SYNTAX COMPILED: READY TO INJECT | UTF-8 | LF`
- **Enterprise CTA Button**: Full-width Cobalt Blue button (`#2563EB`) with Git branch vector icon to sync assets to GitHub.
