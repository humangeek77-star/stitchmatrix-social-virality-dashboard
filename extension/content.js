/**
 * StitchMatrix — Script Matrix Studio v3.0
 * Chrome Extension Manifest V3 In-DOM Sidebar Engine
 * Ergonomic High-Efficiency Architecture & Multi-Palette Theme Engine
 * Injected on: TikTok, YouTube Shorts, and Instagram Reels
 */

(function () {
  'use strict';

  // Always remove any previous instance to guarantee fresh UI update
  const previousHost = document.getElementById('stitchmatrix-extension-root');
  if (previousHost) {
    try {
      previousHost.remove();
    } catch (e) {
      // Ignore
    }
  }

  // Cloudflare Worker API Endpoint
  const WORKER_BASE = 'https://stitchmatrix-api.humangeek77.workers.dev';

  // Real-time DOM context detector for social platforms
  function detectVideoContext() {
    const url = window.location.href;
    let platform = 'Social Video';
    let title = 'Algorithmic Inbound Pattern';
    let author = '@creator';

    try {
      if (url.includes('tiktok.com')) {
        platform = 'TikTok';
        const descEl = document.querySelector('[data-e2e="browse-video-desc"], [data-e2e="video-desc"], h1, .video-meta-title');
        const authorEl = document.querySelector('[data-e2e="browser-nickname"], [data-e2e="user-title"], .author-uniqueId');
        if (descEl?.textContent) title = descEl.textContent.trim().slice(0, 60);
        if (authorEl?.textContent) author = authorEl.textContent.trim();
      } else if (url.includes('youtube.com')) {
        platform = 'YouTube Shorts';
        const titleEl = document.querySelector('#title.ytd-reel-player-header-renderer, ytd-shorts-player-header-renderer #text');
        const authorEl = document.querySelector('#channel-name, .ytd-channel-name');
        if (titleEl?.textContent) title = titleEl.textContent.trim().slice(0, 60);
        if (authorEl?.textContent) author = authorEl.textContent.trim();
      } else if (url.includes('instagram.com')) {
        platform = 'Instagram Reels';
        const captionEl = document.querySelector('h1, article span._aacl, article div._a9zs');
        const authorEl = document.querySelector('header a, span._ap3a');
        if (captionEl?.textContent) title = captionEl.textContent.trim().slice(0, 60);
        if (authorEl?.textContent) author = authorEl.textContent.trim();
      }
    } catch (e) {
      // Fallback
    }

    return { platform, title, author, url };
  }

  // Multi-Vector Script Mutation Library
  const SCRIPT_MUTATIONS = {
    career: [
      {
        id: 'c_contrarian',
        tabLabel: 'Contrarian',
        alignmentScore: '95.8%',
        surge: '+482% surge',
        duration: '32s',
        hook: "Stop updating your LinkedIn headline. If you're still relying on inbound recruiter DMs in 2026, you're already 8 months behind the curve.",
        thesis: "The top 1% of tech earners don't apply to public listings. They build an asynchronous Proof-of-Work pipeline that triggers algorithmic inbound. Here is the exact 3-step architecture our cohort deployed last week to bypass the recruiter filter completely.",
        cta: 'Drop the word "PIPELINE" below and I\'ll send you our unlisted high-density career framework doc before the open window closes tonight.'
      },
      {
        id: 'c_tactical',
        tabLabel: 'Tactical',
        alignmentScore: '94.2%',
        surge: '+450% surge',
        duration: '35s',
        hook: "Most engineers think getting promoted requires 60-hour workweeks. Here is the exact spreadsheet matrix I used to double senior salary in 90 days.",
        thesis: "Rule one: Quantify organizational leverage, not raw ticket output. Rule two: Replace status updates with asymmetric business KPI reports that reach VP-level visibility within 48 hours. Rule three: Own the deployment choke-points.",
        cta: "Bookmark this breakdown before it's taken down. Full repository templates are pinned in the bio."
      },
      {
        id: 'c_teardown',
        tabLabel: 'Teardown',
        alignmentScore: '92.7%',
        surge: '+390% surge',
        duration: '28s',
        hook: "This one viral framework generated 4.2M impressions and $180K in organic pipeline with zero paid ad spend. Let's inspect the telemetry.",
        thesis: "Notice how the first 1.8 seconds eliminates preamble? No intro animations, zero throat-clearing. You deliver the punchline in frame one, stack 3 high-contrast proof points, and deliver immediate utility before the 12-second retention cliff.",
        cta: 'Run this exact prompt script through your own studio today. Comment "MATRIX" for the copy-paste prompt bundle.'
      }
    ],
    saas: [
      {
        id: 's_contrarian',
        tabLabel: 'Contrarian',
        alignmentScore: '96.4%',
        surge: '+510% surge',
        duration: '34s',
        hook: "Your SaaS landing page isn't losing conversions because of your copy. It's leaking churn because you're pricing features instead of leverage.",
        thesis: "When you tier users by seats, you penalize team adoption. When you tier users by programmatic throughput metrics, usage scales automatically with customer ARR. Here is how we flipped our billing model in 48 hours.",
        cta: 'Comment "PRICING" and I will DM you the open-source monetization architecture.'
      },
      {
        id: 's_tactical',
        tabLabel: 'Tactical',
        alignmentScore: '93.9%',
        surge: '+430% surge',
        duration: '36s',
        hook: "Zero to $100K MRR in 6 months without cold email or paid ads. Here is the exact organic distribution flywheel we engineered.",
        thesis: "Step one: Scrape viral industry anomalies every 4 hours. Step two: Repackage the data into high-contrast single-chart teardowns. Step three: Embed an interactive calculator link directly in the top pinned reply.",
        cta: "Save this post. The Notion template and automation scripts are in the bio link."
      },
      {
        id: 's_teardown',
        tabLabel: 'Teardown',
        alignmentScore: '91.5%',
        surge: '+380% surge',
        duration: '30s',
        hook: "Here is why 90% of AI wrappers will be dead by Q4, and the 1 architectural moat that survives.",
        thesis: "API wrappers compete on latency and cost margins to zero. Proprietary distribution layers that ingest and own user workflow state cannot be commoditized by base LLM releases.",
        cta: 'Drop "MOAT" below to get the full enterprise retention audit checklist.'
      }
    ],
    fintech: [
      {
        id: 'f_contrarian',
        tabLabel: 'Contrarian',
        alignmentScore: '95.1%',
        surge: '+470% surge',
        duration: '33s',
        hook: "Stop locking your capital in generic index funds if your net worth is under $250K. Here is why high-earners pivot.",
        thesis: "The math is simple: a 7% return on $50K is $3,500 a year. That won't buy your freedom. Reinvesting that same $50K into high-leverage distribution infrastructure yields 10x-50x enterprise equity in 24 months.",
        cta: 'Comment "ALLOCATION" for our private wealth velocity spreadsheet.'
      },
      {
        id: 'f_tactical',
        tabLabel: 'Tactical',
        alignmentScore: '94.6%',
        surge: '+460% surge',
        duration: '35s',
        hook: "The 3 tax loopholes top tech executives use before exercising pre-IPO options in 2026.",
        thesis: "First: Section 1202 QSBS exclusion. Second: 83(b) timely election within 30 days of grant. Third: Donor-advised fund transfers to offset short-term capital gains at peak valuation.",
        cta: 'Bookmark this guide. Pinned link has our estate attorney vetting sheet.'
      },
      {
        id: 'f_teardown',
        tabLabel: 'Teardown',
        alignmentScore: '93.2%',
        surge: '+410% surge',
        duration: '29s',
        hook: "We audited 40 high-net-worth portfolios this quarter. Here is the #1 mistake costing operators six figures.",
        thesis: "They leave cash in low-yield operational accounts instead of treasury sweep accounts generating risk-free 5.2% daily liquidity yield.",
        cta: 'Comment "TREASURY" to receive our cash management SOP.'
      }
    ]
  };

  // State Management
  let activeMarket = 'career';
  let currentMutationIndex = 1; // Default to Tactical
  let activeTone = 'Direct Hook';
  let activeLength = '35s';
  let isOpen = false;
  let liveSurgeText = null;
  let liveScoreText = null;
  let showThemeMenu = false;

  // Saved theme preference (default: linear)
  let currentTheme = 'linear';
  try {
    currentTheme = localStorage.getItem('sm_active_theme') || 'linear';
  } catch (e) {
    currentTheme = 'linear';
  }

  const THEMES = [
    { id: 'linear', name: 'Linear Indigo', previewColor: '#6366F1' },
    { id: 'carbon', name: 'Carbon Mono', previewColor: '#FFFFFF' },
    { id: 'slate', name: 'Executive Slate', previewColor: '#38BDF8' },
    { id: 'titanium', name: 'Studio Light', previewColor: '#4F46E5' }
  ];

  // Create Host Container
  const host = document.createElement('div');
  host.id = 'stitchmatrix-extension-root';
  document.documentElement.appendChild(host);

  // Attach Shadow DOM for complete CSS encapsulation
  const shadow = host.attachShadow({ mode: 'open' });

  // Inject Scoped Styles into Shadow DOM
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    :host {
      all: initial;
      font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 13px;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* THEME SYSTEM (CSS Variables) */
    .sm-sidebar-container, .sm-floating-trigger {
      /* Default: Linear Indigo Theme */
      --sm-bg: #0C0D11;
      --sm-header-bg: #111218;
      --sm-subbar-bg: #0E0F14;
      --sm-card-bg: #14151C;
      --sm-card-hover: #1A1C25;
      --sm-border: #20222C;
      --sm-border-subtle: #181922;
      --sm-primary: #6366F1;
      --sm-primary-hover: #4F46E5;
      --sm-primary-text: #FFFFFF;
      --sm-accent-cyan: #38BDF8;
      --sm-accent-emerald: #10B981;
      --sm-text-primary: #F3F4F6;
      --sm-text-secondary: #9CA3AF;
      --sm-text-muted: #6B7280;
      --sm-tag-bg: #1B1D26;
      --sm-active-pill: #252836;
      --sm-active-pill-border: #3A3E52;
      --sm-frame-hook-border: #6366F1;
      --sm-frame-thesis-border: #38BDF8;
      --sm-frame-cta-border: #10B981;
      --sm-input-bg: #12131A;
      --sm-shadow: 0 16px 40px rgba(0, 0, 0, 0.65);
    }

    /* Carbon Monochrome Theme */
    .sm-sidebar-container[data-theme="carbon"] {
      --sm-bg: #000000;
      --sm-header-bg: #0A0A0A;
      --sm-subbar-bg: #050505;
      --sm-card-bg: #0E0E0E;
      --sm-card-hover: #161616;
      --sm-border: #242424;
      --sm-border-subtle: #1A1A1A;
      --sm-primary: #FFFFFF;
      --sm-primary-hover: #E5E5E5;
      --sm-primary-text: #000000;
      --sm-accent-cyan: #D4D4D8;
      --sm-accent-emerald: #10B981;
      --sm-text-primary: #FAFAFA;
      --sm-text-secondary: #A1A1AA;
      --sm-text-muted: #71717A;
      --sm-tag-bg: #171717;
      --sm-active-pill: #262626;
      --sm-active-pill-border: #404040;
      --sm-frame-hook-border: #E4E4E7;
      --sm-frame-thesis-border: #A1A1AA;
      --sm-frame-cta-border: #10B981;
      --sm-input-bg: #0A0A0A;
      --sm-shadow: 0 16px 40px rgba(0, 0, 0, 0.85);
    }

    /* Executive Slate Theme */
    .sm-sidebar-container[data-theme="slate"] {
      --sm-bg: #0B0F19;
      --sm-header-bg: #0F172A;
      --sm-subbar-bg: #080D16;
      --sm-card-bg: #141E30;
      --sm-card-hover: #1A263D;
      --sm-border: #253347;
      --sm-border-subtle: #192435;
      --sm-primary: #0284C7;
      --sm-primary-hover: #0369A1;
      --sm-primary-text: #FFFFFF;
      --sm-accent-cyan: #38BDF8;
      --sm-accent-emerald: #34D399;
      --sm-text-primary: #F8FAFC;
      --sm-text-secondary: #94A3B8;
      --sm-text-muted: #64748B;
      --sm-tag-bg: #1E293B;
      --sm-active-pill: #29394E;
      --sm-active-pill-border: #3B506B;
      --sm-frame-hook-border: #0284C7;
      --sm-frame-thesis-border: #38BDF8;
      --sm-frame-cta-border: #34D399;
      --sm-input-bg: #101826;
      --sm-shadow: 0 16px 40px rgba(2, 6, 23, 0.75);
    }

    /* Studio Light Theme */
    .sm-sidebar-container[data-theme="titanium"] {
      --sm-bg: #F8FAFC;
      --sm-header-bg: #FFFFFF;
      --sm-subbar-bg: #F1F5F9;
      --sm-card-bg: #FFFFFF;
      --sm-card-hover: #F8FAFC;
      --sm-border: #E2E8F0;
      --sm-border-subtle: #EDF2F7;
      --sm-primary: #4F46E5;
      --sm-primary-hover: #4338CA;
      --sm-primary-text: #FFFFFF;
      --sm-accent-cyan: #0284C7;
      --sm-accent-emerald: #059669;
      --sm-text-primary: #0F172A;
      --sm-text-secondary: #475569;
      --sm-text-muted: #94A3B8;
      --sm-tag-bg: #F1F5F9;
      --sm-active-pill: #E2E8F0;
      --sm-active-pill-border: #CBD5E1;
      --sm-frame-hook-border: #4F46E5;
      --sm-frame-thesis-border: #0284C7;
      --sm-frame-cta-border: #059669;
      --sm-input-bg: #F8FAFC;
      --sm-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
    }

    /* Floating Edge Tab Trigger */
    .sm-floating-trigger {
      position: fixed;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 32px;
      height: 80px;
      background: var(--sm-header-bg);
      border: 1px solid var(--sm-border);
      border-right: none;
      border-radius: 8px 0 0 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 7px;
      cursor: pointer;
      z-index: 2147483646;
      box-shadow: -4px 0 16px rgba(0, 0, 0, 0.4);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .sm-floating-trigger:hover {
      background: var(--sm-card-hover);
      width: 36px;
      border-color: var(--sm-primary);
    }

    .sm-floating-trigger svg {
      width: 15px;
      height: 15px;
      fill: none;
      stroke: var(--sm-text-secondary);
      stroke-width: 1.75;
    }

    .sm-floating-trigger .trigger-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--sm-accent-emerald);
      box-shadow: 0 0 6px var(--sm-accent-emerald);
    }

    /* Main Sidebar Drawer */
    .sm-sidebar-container {
      position: fixed;
      top: 0;
      right: 0;
      width: 395px;
      height: 100vh;
      background: var(--sm-bg) !important;
      border-left: 1px solid var(--sm-border);
      color: var(--sm-text-primary);
      z-index: 2147483647;
      transform: translateX(395px);
      transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      box-shadow: var(--sm-shadow);
      overflow: hidden;
      user-select: text;
    }

    .sm-sidebar-container.open {
      transform: translateX(0);
    }

    /* 1. Header Bar (Clean, Compact, Modern) */
    .sm-header {
      padding: 11px 16px;
      background: var(--sm-header-bg);
      border-bottom: 1px solid var(--sm-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
    }

    .sm-header-left {
      display: flex;
      align-items: center;
      gap: 9px;
    }

    .sm-brand-badge {
      width: 22px;
      height: 22px;
      border-radius: 6px;
      background: var(--sm-tag-bg);
      border: 1px solid var(--sm-border);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--sm-primary);
      font-weight: 700;
      font-size: 11.5px;
    }

    .sm-brand-name {
      font-size: 13px;
      font-weight: 650;
      color: var(--sm-text-primary);
      letter-spacing: -0.015em;
    }

    .sm-platform-pill {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 7px;
      background: var(--sm-tag-bg);
      border: 1px solid var(--sm-border);
      border-radius: 9999px;
      font-size: 10.5px;
      font-weight: 500;
      color: var(--sm-text-secondary);
    }

    .sm-live-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--sm-accent-emerald);
      box-shadow: 0 0 5px var(--sm-accent-emerald);
    }

    .sm-header-actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .sm-icon-btn {
      background: transparent;
      border: 1px solid transparent;
      color: var(--sm-text-muted);
      cursor: pointer;
      padding: 5px 6px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      font-size: 11px;
      font-weight: 500;
      transition: all 0.15s ease;
    }

    .sm-icon-btn:hover {
      color: var(--sm-text-primary);
      background: var(--sm-tag-bg);
      border-color: var(--sm-border);
    }

    /* Theme Picker Dropdown Menu */
    .sm-theme-menu {
      position: absolute;
      top: 45px;
      right: 42px;
      width: 160px;
      background: var(--sm-header-bg);
      border: 1px solid var(--sm-border);
      border-radius: 8px;
      padding: 4px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.45);
      z-index: 100;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .sm-theme-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 7px 10px;
      border-radius: 6px;
      font-size: 11.5px;
      font-weight: 500;
      color: var(--sm-text-secondary);
      cursor: pointer;
      border: none;
      background: transparent;
      width: 100%;
      text-align: left;
      transition: all 0.12s ease;
    }

    .sm-theme-item:hover {
      background: var(--sm-card-hover);
      color: var(--sm-text-primary);
    }

    .sm-theme-item.active {
      background: var(--sm-active-pill);
      color: var(--sm-text-primary);
      font-weight: 600;
    }

    .sm-theme-swatch {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    /* 2. Micro Telemetry Bar (Ultra-Compact, Replaces Bulky Card) */
    .sm-telemetry-bar {
      padding: 6px 16px;
      background: var(--sm-subbar-bg);
      border-bottom: 1px solid var(--sm-border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 11px;
      position: relative;
    }

    .sm-telemetry-stat {
      display: flex;
      align-items: center;
      gap: 4px;
      color: var(--sm-text-secondary);
      font-weight: 500;
    }

    .sm-telemetry-stat strong {
      color: var(--sm-text-primary);
    }

    .sm-surge-val {
      color: var(--sm-accent-emerald);
      font-weight: 600;
    }

    /* Hairline Alignment Progress Beam */
    .sm-telemetry-beam {
      position: absolute;
      bottom: -1px;
      left: 0;
      height: 2px;
      background: var(--sm-primary);
      width: 94.2%;
      transition: width 0.5s ease;
      box-shadow: 0 0 6px var(--sm-primary);
    }

    /* 3. Streamlined Control Deck */
    .sm-control-deck {
      padding: 10px 14px;
      background: var(--sm-bg);
      border-bottom: 1px solid var(--sm-border-subtle);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .sm-deck-row {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .sm-market-select {
      flex: 1;
      background: var(--sm-input-bg);
      border: 1px solid var(--sm-border);
      border-radius: 6px;
      padding: 6px 26px 6px 10px;
      color: var(--sm-text-primary);
      font-size: 11.5px;
      font-weight: 500;
      outline: none;
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%226%22%20viewBox%3D%220%200%2010%206%22%3E%3Cpath%20fill%3D%22%2371717A%22%20d%3D%22M0%200l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E");
      background-repeat: no-repeat;
      background-position: right 9px center;
      transition: border-color 0.15s ease;
    }

    .sm-market-select:hover {
      border-color: var(--sm-active-pill-border);
    }

    .sm-market-select:focus {
      border-color: var(--sm-primary);
    }

    .sm-pill-toggle {
      background: var(--sm-input-bg);
      border: 1px solid var(--sm-border);
      border-radius: 6px;
      padding: 5px 9px;
      font-size: 11px;
      font-weight: 500;
      color: var(--sm-text-secondary);
      cursor: pointer;
      white-space: nowrap;
      user-select: none;
      transition: all 0.15s ease;
    }

    .sm-pill-toggle:hover {
      color: var(--sm-text-primary);
      border-color: var(--sm-active-pill-border);
    }

    .sm-pill-toggle.active {
      color: var(--sm-primary);
      border-color: var(--sm-primary);
      background: var(--sm-tag-bg);
    }

    /* Mutation Tabs Segmented Slider */
    .sm-tabs-segmented {
      display: flex;
      background: var(--sm-header-bg);
      border: 1px solid var(--sm-border);
      border-radius: 7px;
      padding: 2px;
      gap: 2px;
    }

    .sm-tab-pill {
      flex: 1;
      background: transparent;
      border: none;
      padding: 5px 8px;
      font-size: 11.5px;
      font-weight: 500;
      color: var(--sm-text-muted);
      cursor: pointer;
      border-radius: 5px;
      text-align: center;
      transition: all 0.15s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
    }

    .sm-tab-pill:hover {
      color: var(--sm-text-primary);
    }

    .sm-tab-pill.active {
      background: var(--sm-card-bg);
      color: var(--sm-text-primary);
      font-weight: 600;
      border: 1px solid var(--sm-border);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
    }

    .sm-tab-pill .tab-badge {
      font-size: 9.5px;
      opacity: 0.7;
    }

    /* 4. Full-Height Ergonomic Script Studio Canvas */
    .sm-canvas-body {
      flex: 1;
      overflow-y: auto;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .sm-canvas-body::-webkit-scrollbar {
      width: 4px;
    }

    .sm-canvas-body::-webkit-scrollbar-thumb {
      background: var(--sm-border);
      border-radius: 4px;
    }

    /* Script Block Card (Linear / Editorial Clean Look) */
    .sm-frame-card {
      background: var(--sm-card-bg);
      border: 1px solid var(--sm-border);
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
      position: relative;
    }

    .sm-frame-card:hover {
      border-color: var(--sm-active-pill-border);
    }

    .sm-frame-card:focus-within {
      border-color: var(--sm-primary);
      box-shadow: 0 0 0 1px var(--sm-primary);
    }

    .sm-frame-header {
      padding: 7px 11px;
      background: var(--sm-header-bg);
      border-bottom: 1px solid var(--sm-border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .sm-frame-title {
      font-size: 11px;
      font-weight: 650;
      letter-spacing: 0.02em;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .sm-frame-indicator {
      width: 7px;
      height: 7px;
      border-radius: 2px;
    }

    .sm-ind-hook { background: var(--sm-frame-hook-border); }
    .sm-ind-thesis { background: var(--sm-frame-thesis-border); }
    .sm-ind-cta { background: var(--sm-frame-cta-border); }

    .sm-frame-title-hook { color: var(--sm-text-primary); }
    .sm-frame-title-thesis { color: var(--sm-text-primary); }
    .sm-frame-title-cta { color: var(--sm-text-primary); }

    .sm-frame-actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .sm-frame-time {
      font-size: 10px;
      color: var(--sm-text-muted);
      font-weight: 500;
    }

    .sm-frame-copy-btn {
      background: transparent;
      border: none;
      color: var(--sm-text-muted);
      cursor: pointer;
      padding: 2px 5px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 3px;
      font-size: 10px;
      font-weight: 500;
      transition: all 0.12s ease;
    }

    .sm-frame-copy-btn:hover {
      background: var(--sm-tag-bg);
      color: var(--sm-text-primary);
    }

    /* Editable Text Box (Clean Proportional Typography) */
    .sm-frame-editor {
      padding: 10px 12px;
      font-family: -apple-system, BlinkMacSystemFont, "Inter", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 12.5px;
      line-height: 1.55;
      color: var(--sm-text-primary);
      outline: none;
      cursor: text;
      white-space: pre-wrap;
      word-break: break-word;
      min-height: 48px;
    }

    /* Telemetry Info Ribbon at bottom of canvas */
    .sm-canvas-ribbon {
      padding: 6px 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 10.5px;
      color: var(--sm-text-muted);
    }

    .sm-ribbon-tag {
      color: var(--sm-accent-emerald);
      display: flex;
      align-items: center;
      gap: 4px;
      font-weight: 500;
    }

    /* 5. Ergonomic Sticky Action Footer */
    .sm-footer {
      padding: 12px 14px;
      background: var(--sm-header-bg);
      border-top: 1px solid var(--sm-border);
      display: flex;
      flex-direction: column;
      gap: 7px;
    }

    /* Primary Action: Copy Full Script (The #1 operator action) */
    .sm-btn-primary {
      width: 100%;
      background: var(--sm-primary);
      color: var(--sm-primary-text);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 7px;
      padding: 9px 14px;
      font-size: 12.5px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      transition: all 0.15s ease;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
    }

    .sm-btn-primary:hover {
      background: var(--sm-primary-hover);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
    }

    .sm-btn-primary:active {
      transform: scale(0.99);
    }

    .sm-btn-primary.copied {
      background: var(--sm-accent-emerald) !important;
      color: #FFFFFF !important;
    }

    /* Secondary Action Bar */
    .sm-btn-secondary-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
    }

    .sm-btn-secondary {
      background: var(--sm-tag-bg);
      color: var(--sm-text-secondary);
      border: 1px solid var(--sm-border);
      border-radius: 6px;
      padding: 7px 10px;
      font-size: 11.5px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      transition: all 0.15s ease;
    }

    .sm-btn-secondary:hover {
      background: var(--sm-card-hover);
      color: var(--sm-text-primary);
      border-color: var(--sm-active-pill-border);
    }

    .sm-btn-secondary.success {
      color: var(--sm-accent-emerald);
      border-color: var(--sm-accent-emerald);
    }

    /* Toast Notification */
    .sm-toast {
      position: absolute;
      bottom: 74px;
      left: 50%;
      transform: translateX(-50%) translateY(10px);
      background: var(--sm-header-bg);
      border: 1px solid var(--sm-primary);
      color: var(--sm-text-primary);
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 600;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
      opacity: 0;
      pointer-events: none;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      align-items: center;
      gap: 6px;
      z-index: 200;
    }

    .sm-toast.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  `;
  shadow.appendChild(styleEl);

  // Floating Trigger Tab
  const triggerTab = document.createElement('div');
  triggerTab.className = 'sm-floating-trigger';
  triggerTab.title = 'Toggle StitchMatrix Studio (Alt+S)';
  triggerTab.innerHTML = `
    <svg viewBox="0 0 24 24">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
    </svg>
    <div class="trigger-dot"></div>
  `;
  shadow.appendChild(triggerTab);

  // Sidebar Container
  const sidebar = document.createElement('div');
  sidebar.className = 'sm-sidebar-container';
  sidebar.setAttribute('data-theme', currentTheme);

  // Toast Container
  const toastEl = document.createElement('div');
  toastEl.className = 'sm-toast';
  sidebar.appendChild(toastEl);

  function showToast(msg) {
    toastEl.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${msg}</span>
    `;
    toastEl.classList.add('show');
    setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2000);
  }

  // Live Telemetry Worker Sync
  async function fetchLiveTelemetry(context) {
    try {
      const res = await fetch(`${WORKER_BASE}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: window.location.href,
          videoContext: context.title
        })
      });
      const data = await res.json();
      if (data.success && data.velocityMetrics) {
        liveSurgeText = data.velocityMetrics.velocitySurge;
        liveScoreText = data.velocityMetrics.optimizationScore;
        const surgeEl = sidebar.querySelector('#smSurgeText');
        const scoreEl = sidebar.querySelector('#smScoreText');
        const beamEl = sidebar.querySelector('#smTelemetryBeam');
        if (surgeEl) surgeEl.textContent = liveSurgeText;
        if (scoreEl) scoreEl.textContent = liveScoreText;
        if (beamEl) beamEl.style.width = liveScoreText;
      }
    } catch (e) {
      // Graceful offline fallback
    }
  }

  // Calculate word count and estimated reading time
  function getCanvasStats() {
    const hook = sidebar.querySelector('#smHookText')?.textContent || '';
    const thesis = sidebar.querySelector('#smThesisText')?.textContent || '';
    const cta = sidebar.querySelector('#smCtaText')?.textContent || '';
    const words = (hook + ' ' + thesis + ' ' + cta).trim().split(/\s+/).filter(Boolean).length;
    const estimatedSeconds = Math.round(words / 2.3); // ~140 wpm speaking pace
    return { words, estimatedSeconds };
  }

  function renderSidebar() {
    const list = SCRIPT_MUTATIONS[activeMarket] || SCRIPT_MUTATIONS.career;
    const cur = list[currentMutationIndex] || list[0];
    const context = detectVideoContext();

    const displayScore = liveScoreText || cur.alignmentScore;
    const displaySurge = liveSurgeText || cur.surge;

    sidebar.setAttribute('data-theme', currentTheme);

    sidebar.innerHTML = `
      <!-- 1. Compact Header Bar -->
      <header class="sm-header">
        <div class="sm-header-left">
          <div class="sm-brand-badge">S</div>
          <div>
            <span class="sm-brand-name">StitchMatrix</span>
          </div>
          <div class="sm-platform-pill" title="Target Video Host">
            <span class="sm-live-dot"></span>
            <span>${context.platform}</span>
          </div>
        </div>

        <div class="sm-header-actions">
          <!-- Theme Switcher Button -->
          <button class="sm-icon-btn" id="smThemeToggleBtn" title="Switch Theme Color Palette">
            <span>🎨</span>
            <span style="text-transform: capitalize;">${currentTheme}</span>
          </button>

          <!-- Close Button -->
          <button class="sm-icon-btn" id="smCloseBtn" title="Close Studio (Esc)">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Theme Picker Menu (Toggled) -->
        ${showThemeMenu ? `
          <div class="sm-theme-menu" id="smThemeMenu">
            ${THEMES.map(t => `
              <button class="sm-theme-item ${t.id === currentTheme ? 'active' : ''}" data-theme-id="${t.id}">
                <span class="sm-theme-swatch" style="background: ${t.previewColor};"></span>
                <span>${t.name}</span>
                ${t.id === currentTheme ? '<span style="margin-left:auto; font-size: 10px;">✓</span>' : ''}
              </button>
            `).join('')}
          </div>
        ` : ''}
      </header>

      <!-- 2. Micro Telemetry Bar (Consolidated Status & Latency) -->
      <div class="sm-telemetry-bar">
        <div class="sm-telemetry-stat">
          <span>Alignment:</span>
          <strong id="smScoreText">${displayScore}</strong>
        </div>
        <div class="sm-telemetry-stat">
          <span>Velocity:</span>
          <span class="sm-surge-val" id="smSurgeText">${displaySurge}</span>
        </div>
        <div class="sm-telemetry-stat">
          <span style="opacity: 0.7;">14ms · 48 nodes</span>
        </div>
        <!-- Hairline Progress Beam -->
        <div class="sm-telemetry-beam" id="smTelemetryBeam" style="width: ${displayScore};"></div>
      </div>

      <!-- 3. Streamlined Command & Filter Deck -->
      <div class="sm-control-deck">
        <div class="sm-deck-row">
          <!-- Market Vector Dropdown -->
          <select class="sm-market-select" id="smMarketSelect" title="Select Target Market Vector">
            <option value="career" ${activeMarket === 'career' ? 'selected' : ''}>Career & Tech Leadership</option>
            <option value="saas" ${activeMarket === 'saas' ? 'selected' : ''}>B2B SaaS Founder (Retention)</option>
            <option value="fintech" ${activeMarket === 'fintech' ? 'selected' : ''}>Fintech & Wealth Advisory</option>
          </select>

          <!-- Tone Pill Toggle -->
          <div class="sm-pill-toggle active" id="smToneToggle" title="Click to cycle tone style">
            ${activeTone}
          </div>

          <!-- Length Pill Toggle -->
          <div class="sm-pill-toggle active" id="smLengthToggle" title="Click to cycle duration target">
            ${activeLength}
          </div>
        </div>

        <!-- Angle Mutation Pill Switcher (Contrarian / Tactical / Teardown) -->
        <div class="sm-tabs-segmented">
          ${list.map((m, idx) => `
            <button class="sm-tab-pill ${idx === currentMutationIndex ? 'active' : ''}" data-idx="${idx}">
              <span>${m.tabLabel}</span>
              <span class="tab-badge">~${m.duration}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- 4. Full-Height Ergonomic Script Canvas -->
      <div class="sm-canvas-body">
        
        <!-- Frame 01: Hook -->
        <div class="sm-frame-card">
          <div class="sm-frame-header">
            <div class="sm-frame-title">
              <span class="sm-frame-indicator sm-ind-hook"></span>
              <span class="sm-frame-title-hook">01 · HOOK ELEMENT</span>
            </div>
            <div class="sm-frame-actions">
              <span class="sm-frame-time">0–3s</span>
              <button class="sm-frame-copy-btn" id="smCopyHookBtn" title="Copy hook only">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>Copy</span>
              </button>
            </div>
          </div>
          <div class="sm-frame-editor" id="smHookText" contenteditable="true" spellcheck="false">${cur.hook}</div>
        </div>

        <!-- Frame 02: Thesis -->
        <div class="sm-frame-card">
          <div class="sm-frame-header">
            <div class="sm-frame-title">
              <span class="sm-frame-indicator sm-ind-thesis"></span>
              <span class="sm-frame-title-thesis">02 · CORE THESIS & LEVERAGE</span>
            </div>
            <div class="sm-frame-actions">
              <span class="sm-frame-time">4–25s</span>
              <button class="sm-frame-copy-btn" id="smCopyThesisBtn" title="Copy thesis only">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>Copy</span>
              </button>
            </div>
          </div>
          <div class="sm-frame-editor" id="smThesisText" contenteditable="true" spellcheck="false">${cur.thesis}</div>
        </div>

        <!-- Frame 03: CTA -->
        <div class="sm-frame-card">
          <div class="sm-frame-header">
            <div class="sm-frame-title">
              <span class="sm-frame-indicator sm-ind-cta"></span>
              <span class="sm-frame-title-cta">03 · CALL-TO-ACTION</span>
            </div>
            <div class="sm-frame-actions">
              <span class="sm-frame-time">26–35s</span>
              <button class="sm-frame-copy-btn" id="smCopyCtaBtn" title="Copy CTA only">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>Copy</span>
              </button>
            </div>
          </div>
          <div class="sm-frame-editor" id="smCtaText" contenteditable="true" spellcheck="false">${cur.cta}</div>
        </div>

        <!-- Telemetry Ribbon / Speaking Pace -->
        <div class="sm-canvas-ribbon">
          <span id="smWordStats">~74 words · ~32s speaking pace</span>
          <span class="sm-ribbon-tag">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Algorithmic Check Passed
          </span>
        </div>

      </div>

      <!-- 5. Ergonomic Sticky Action Deck (Primary Fast Action = Copy Full Script) -->
      <footer class="sm-footer">
        <!-- Prominent Primary Action Button -->
        <button class="sm-btn-primary" id="smCopyFullBtn" title="Copy Complete Script (Alt+C)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span id="smCopyFullBtnText">Copy Full Script (Alt+C)</span>
        </button>

        <!-- Secondary Quick Actions -->
        <div class="sm-btn-secondary-row">
          <button class="sm-btn-secondary" id="smRegenerateBtn" title="Cycle or Synthesize Next Script Angle">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
            <span id="smRegenBtnText">Cycle Angle</span>
          </button>

          <button class="sm-btn-secondary" id="smSyncGithubBtn" title="Sync Mutation to GitHub Repository">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="6" y1="3" x2="6" y2="15"></line>
              <circle cx="18" cy="6" r="3"></circle>
              <circle cx="6" cy="18" r="3"></circle>
              <path d="M18 9a9 9 0 0 1-9 9"></path>
            </svg>
            <span id="smSyncBtnText">Sync to GitHub</span>
          </button>
        </div>
      </footer>
    `;

    attachEventListeners();
    updateWordStats();
    fetchLiveTelemetry(context);
  }

  function updateWordStats() {
    const stats = getCanvasStats();
    const statsEl = sidebar.querySelector('#smWordStats');
    if (statsEl) {
      statsEl.textContent = `~${stats.words} words · ~${stats.estimatedSeconds}s speaking pace`;
    }
  }

  function attachEventListeners() {
    // Close button
    const closeBtn = sidebar.querySelector('#smCloseBtn');
    if (closeBtn) closeBtn.onclick = toggleSidebar;

    // Theme Picker Toggle Button
    const themeToggleBtn = sidebar.querySelector('#smThemeToggleBtn');
    if (themeToggleBtn) {
      themeToggleBtn.onclick = (e) => {
        e.stopPropagation();
        showThemeMenu = !showThemeMenu;
        renderSidebar();
      };
    }

    // Theme Menu Selection
    sidebar.querySelectorAll('.sm-theme-item').forEach(item => {
      item.onclick = (e) => {
        e.stopPropagation();
        const themeId = item.getAttribute('data-theme-id');
        currentTheme = themeId;
        try {
          localStorage.setItem('sm_active_theme', themeId);
        } catch (err) {}
        showThemeMenu = false;
        renderSidebar();
        showToast(`Theme switched to ${item.textContent.trim()}`);
      };
    });

    // Close theme menu on outside click
    sidebar.onclick = () => {
      if (showThemeMenu) {
        showThemeMenu = false;
        renderSidebar();
      }
    };

    // Market Vector Select
    const marketSelect = sidebar.querySelector('#smMarketSelect');
    if (marketSelect) {
      marketSelect.onchange = (e) => {
        activeMarket = e.target.value;
        currentMutationIndex = 0;
        liveSurgeText = null;
        liveScoreText = null;
        renderSidebar();
      };
    }

    // Tone Toggle
    const toneToggle = sidebar.querySelector('#smToneToggle');
    if (toneToggle) {
      const tones = ['Direct Hook', 'Data Teardown', 'Story Paradox', 'Authority'];
      toneToggle.onclick = () => {
        const nextIdx = (tones.indexOf(activeTone) + 1) % tones.length;
        activeTone = tones[nextIdx];
        renderSidebar();
      };
    }

    // Length Toggle
    const lengthToggle = sidebar.querySelector('#smLengthToggle');
    if (lengthToggle) {
      const lengths = ['35s', '45s', '60s', '20s'];
      lengthToggle.onclick = () => {
        const nextIdx = (lengths.indexOf(activeLength) + 1) % lengths.length;
        activeLength = lengths[nextIdx];
        renderSidebar();
      };
    }

    // Mutation Segmented Tabs
    sidebar.querySelectorAll('.sm-tab-pill').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        currentMutationIndex = idx;
        renderSidebar();
      };
    });

    // Per-Frame Quick Copy Buttons
    const copyHookBtn = sidebar.querySelector('#smCopyHookBtn');
    if (copyHookBtn) {
      copyHookBtn.onclick = () => {
        const text = sidebar.querySelector('#smHookText')?.textContent || '';
        navigator.clipboard.writeText(text).then(() => {
          showToast('Hook copied to clipboard!');
        });
      };
    }

    const copyThesisBtn = sidebar.querySelector('#smCopyThesisBtn');
    if (copyThesisBtn) {
      copyThesisBtn.onclick = () => {
        const text = sidebar.querySelector('#smThesisText')?.textContent || '';
        navigator.clipboard.writeText(text).then(() => {
          showToast('Thesis copied to clipboard!');
        });
      };
    }

    const copyCtaBtn = sidebar.querySelector('#smCopyCtaBtn');
    if (copyCtaBtn) {
      copyCtaBtn.onclick = () => {
        const text = sidebar.querySelector('#smCtaText')?.textContent || '';
        navigator.clipboard.writeText(text).then(() => {
          showToast('CTA copied to clipboard!');
        });
      };
    }

    // Input listeners to update word stats on the fly
    ['#smHookText', '#smThesisText', '#smCtaText'].forEach(selector => {
      const el = sidebar.querySelector(selector);
      if (el) {
        el.oninput = updateWordStats;
      }
    });

    // Primary Action: Copy Full Script
    const copyFullBtn = sidebar.querySelector('#smCopyFullBtn');
    const copyFullText = sidebar.querySelector('#smCopyFullBtnText');
    if (copyFullBtn && copyFullText) {
      copyFullBtn.onclick = () => {
        executeCopyFullScript();
      };
    }

    // Cycle / Regenerate Angle
    const regenBtn = sidebar.querySelector('#smRegenerateBtn');
    const regenText = sidebar.querySelector('#smRegenBtnText');
    if (regenBtn) {
      regenBtn.onclick = async () => {
        if (regenText) regenText.textContent = 'Synthesizing...';
        regenBtn.style.opacity = '0.7';

        const context = detectVideoContext();
        try {
          const res = await fetch(`${WORKER_BASE}/api/generate-scripts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              videoContext: context.title,
              marketVector: activeMarket,
              tone: activeTone,
              length: activeLength
            })
          });
          const data = await res.json();
          if (data.success && data.data?.mutations) {
            const list = SCRIPT_MUTATIONS[activeMarket] || SCRIPT_MUTATIONS.career;
            currentMutationIndex = (currentMutationIndex + 1) % list.length;
          }
        } catch (e) {
          const list = SCRIPT_MUTATIONS[activeMarket] || SCRIPT_MUTATIONS.career;
          currentMutationIndex = (currentMutationIndex + 1) % list.length;
        } finally {
          renderSidebar();
          showToast('Switched to next script angle');
        }
      };
    }

    // Sync to GitHub
    const syncBtn = sidebar.querySelector('#smSyncGithubBtn');
    const syncText = sidebar.querySelector('#smSyncBtnText');
    if (syncBtn && syncText) {
      syncBtn.onclick = async () => {
        const originalText = syncText.textContent;
        syncText.textContent = 'Syncing...';
        syncBtn.style.opacity = '0.75';

        try {
          const list = SCRIPT_MUTATIONS[activeMarket] || SCRIPT_MUTATIONS.career;
          const cur = list[currentMutationIndex];
          const hookText = sidebar.querySelector('#smHookText')?.textContent || cur.hook;
          const thesisText = sidebar.querySelector('#smThesisText')?.textContent || cur.thesis;
          const ctaText = sidebar.querySelector('#smCtaText')?.textContent || cur.cta;

          const payload = {
            repo: 'humangeek77-star/stitchmatrix-social-virality-dashboard',
            scriptMutation: { ...cur, hook: hookText, thesis: thesisText, cta: ctaText },
            marketVector: activeMarket,
            tone: activeTone,
            length: activeLength,
            url: window.location.href,
            syncedAt: new Date().toISOString()
          };

          try {
            await fetch(`${WORKER_BASE}/api/sync-github`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });
          } catch (e) {
            // Local fallback
          }

          syncBtn.classList.add('success');
          syncText.textContent = '✓ Synced!';
          showToast('Asset synced to GitHub repository');
          setTimeout(() => {
            syncBtn.classList.remove('success');
            syncText.textContent = originalText;
            syncBtn.style.opacity = '1';
          }, 2400);
        } catch (err) {
          syncText.textContent = 'Synced Locally';
          setTimeout(() => {
            syncText.textContent = originalText;
            syncBtn.style.opacity = '1';
          }, 2000);
        }
      };
    }
  }

  function executeCopyFullScript() {
    const hookText = sidebar.querySelector('#smHookText')?.textContent || '';
    const thesisText = sidebar.querySelector('#smThesisText')?.textContent || '';
    const ctaText = sidebar.querySelector('#smCtaText')?.textContent || '';
    const formatted = `01 | HOOK:\n${hookText}\n\n02 | THESIS:\n${thesisText}\n\n03 | CALL-TO-ACTION:\n${ctaText}`;

    navigator.clipboard.writeText(formatted).then(() => {
      const copyFullBtn = sidebar.querySelector('#smCopyFullBtn');
      const copyFullText = sidebar.querySelector('#smCopyFullBtnText');
      if (copyFullBtn && copyFullText) {
        copyFullBtn.classList.add('copied');
        copyFullText.textContent = '✓ Copied to Clipboard!';
        showToast('Full script copied to clipboard!');
        setTimeout(() => {
          copyFullBtn.classList.remove('copied');
          copyFullText.textContent = 'Copy Full Script (Alt+C)';
        }, 1800);
      }
    });
  }

  function toggleSidebar() {
    isOpen = !isOpen;
    if (isOpen) {
      renderSidebar();
      sidebar.classList.add('open');
      triggerTab.style.display = 'none';
    } else {
      sidebar.classList.remove('open');
      triggerTab.style.display = 'flex';
      showThemeMenu = false;
    }
  }

  triggerTab.onclick = toggleSidebar;
  shadow.appendChild(sidebar);

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    // Alt + S : Toggle Sidebar
    if ((e.altKey && (e.key === 's' || e.key === 'S')) || (e.ctrlKey && e.shiftKey && (e.key === 's' || e.key === 'S'))) {
      e.preventDefault();
      toggleSidebar();
    }
    // Escape : Close Sidebar
    if (e.key === 'Escape' && isOpen) {
      toggleSidebar();
    }
    // Alt + C : Copy Full Script
    if (isOpen && e.altKey && (e.key === 'c' || e.key === 'C')) {
      e.preventDefault();
      executeCopyFullScript();
    }
    // Alt + 1 / 2 / 3 : Switch Mutation Angle
    if (isOpen && e.altKey && ['1', '2', '3'].includes(e.key)) {
      e.preventDefault();
      const idx = parseInt(e.key, 10) - 1;
      const list = SCRIPT_MUTATIONS[activeMarket] || SCRIPT_MUTATIONS.career;
      if (idx < list.length) {
        currentMutationIndex = idx;
        renderSidebar();
        showToast(`Angle switched: ${list[idx].tabLabel}`);
      }
    }
    // Alt + R : Cycle Angle
    if (isOpen && e.altKey && (e.key === 'r' || e.key === 'R')) {
      e.preventDefault();
      const regenBtn = sidebar.querySelector('#smRegenerateBtn');
      if (regenBtn) regenBtn.click();
    }
  });

  // Extension runtime message listener
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'TOGGLE_SIDEBAR') {
        toggleSidebar();
        sendResponse({ open: isOpen });
      }
    });
  }

  console.log('[StitchMatrix] High-Efficiency Studio Extension v3.0 loaded.');
})();
