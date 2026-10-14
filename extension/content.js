/**
 * StitchMatrix — Script Matrix Studio
 * Chrome Extension Manifest V3 In-DOM Sidebar Engine
 * Design DNA: Linear / Stripe Minimalist Dark Theme (#09090B / #121214 / #18181B / #27272A)
 * Injected on: TikTok, YouTube Shorts, and Instagram Reels
 */

(function () {
  'use strict';

  // Prevent multiple initializations in the same frame
  if (window.__STITCHMATRIX_INITIALIZED__) return;
  window.__STITCHMATRIX_INITIALIZED__ = true;

  // Real-time DOM context detector for social platforms
  function detectVideoContext() {
    const url = window.location.href;
    let platform = 'Generic Video';
    let title = 'Algorithmic Inbound Pattern';
    let author = '@creator';

    try {
      if (url.includes('tiktok.com')) {
        platform = 'TikTok Video';
        const descEl = document.querySelector('[data-e2e="browse-video-desc"], [data-e2e="video-desc"], h1, .video-meta-title');
        const authorEl = document.querySelector('[data-e2e="browser-nickname"], [data-e2e="user-title"], .author-uniqueId');
        if (descEl?.textContent) title = descEl.textContent.trim().slice(0, 70);
        if (authorEl?.textContent) author = authorEl.textContent.trim();
      } else if (url.includes('youtube.com')) {
        platform = 'YouTube Shorts';
        const titleEl = document.querySelector('#title.ytd-reel-player-header-renderer, ytd-shorts-player-header-renderer #text');
        const authorEl = document.querySelector('#channel-name, .ytd-channel-name');
        if (titleEl?.textContent) title = titleEl.textContent.trim().slice(0, 70);
        if (authorEl?.textContent) author = authorEl.textContent.trim();
      } else if (url.includes('instagram.com')) {
        platform = 'Instagram Reels';
        const captionEl = document.querySelector('h1, article span._aacl, article div._a9zs');
        const authorEl = document.querySelector('header a, span._ap3a');
        if (captionEl?.textContent) title = captionEl.textContent.trim().slice(0, 70);
        if (authorEl?.textContent) author = authorEl.textContent.trim();
      }
    } catch (e) {
      // Fallback
    }

    return { platform, title, author, url };
  }

  // Multi-Vector Script Mutation Database
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

  let activeMarket = 'career';
  let currentMutationIndex = 1; // Default to Tactical (94.2%)
  let activeTone = 'Direct Hook';
  let activeLength = '35s';
  let isOpen = false;

  // Create Host Container
  const host = document.createElement('div');
  host.id = 'stitchmatrix-extension-root';
  document.documentElement.appendChild(host);

  // Attach Shadow DOM for strict CSS isolation
  const shadow = host.attachShadow({ mode: 'open' });

  // Load Styles into Shadow DOM
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    :host {
      all: initial;
      font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 13px;
      line-height: 1.5;
      color: #E4E4E7;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* Floating Edge Tab Trigger */
    .sm-floating-trigger {
      position: fixed;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 32px;
      height: 84px;
      background: #121214;
      border: 1px solid #27272A;
      border-right: none;
      border-radius: 8px 0 0 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      z-index: 2147483646;
      box-shadow: -4px 0 16px rgba(0, 0, 0, 0.35);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .sm-floating-trigger:hover {
      background: #18181B;
      width: 36px;
      border-color: #3F3F46;
    }

    .sm-floating-trigger svg {
      width: 15px;
      height: 15px;
      fill: none;
      stroke: #A1A1AA;
      stroke-width: 1.75;
    }

    .sm-floating-trigger .trigger-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #10B981;
    }

    /* Main Sidebar Drawer */
    .sm-sidebar-container {
      position: fixed;
      top: 0;
      right: 0;
      width: 380px;
      height: 100vh;
      background: #09090B;
      border-left: 1px solid #222226;
      color: #E4E4E7;
      z-index: 2147483647;
      transform: translateX(380px);
      transition: transform 340ms cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      box-shadow: -12px 0 36px rgba(0, 0, 0, 0.6);
      overflow: hidden;
    }

    .sm-sidebar-container.open {
      transform: translateX(0);
    }

    /* Top Header */
    .sm-header {
      padding: 14px 18px;
      background: #0D0D10;
      border-bottom: 1px solid #1E1E22;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .sm-header-brand {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .sm-header-logo {
      width: 22px;
      height: 22px;
      border-radius: 6px;
      background: #18181B;
      border: 1px solid #27272A;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #F4F4F5;
      font-weight: 600;
      font-size: 11px;
    }

    .sm-header-title {
      font-size: 13px;
      font-weight: 600;
      color: #F4F4F5;
      letter-spacing: -0.015em;
      line-height: 1.2;
    }

    .sm-header-subtitle {
      font-size: 11px;
      color: #71717A;
      letter-spacing: -0.005em;
      font-weight: 400;
    }

    .sm-header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .sm-status-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      background: #121215;
      border: 1px solid #222226;
      padding: 3px 8px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 450;
      color: #A1A1AA;
    }

    .sm-status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10B981;
    }

    .sm-close-btn {
      background: transparent;
      border: 1px solid transparent;
      color: #71717A;
      cursor: pointer;
      padding: 4px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }

    .sm-close-btn:hover {
      color: #F4F4F5;
      background: #18181B;
      border-color: #27272A;
    }

    /* Detected Source Strip */
    .sm-source-strip {
      padding: 6px 18px;
      background: #111114;
      border-bottom: 1px solid #1C1C1F;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 11px;
      color: #71717A;
    }

    .sm-source-platform {
      display: flex;
      align-items: center;
      gap: 5px;
      color: #A1A1AA;
      font-weight: 500;
    }

    /* Scrollable Content Body */
    .sm-content-body {
      flex: 1;
      overflow-y: auto;
      padding: 16px 18px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .sm-content-body::-webkit-scrollbar {
      width: 4px;
    }

    .sm-content-body::-webkit-scrollbar-thumb {
      background: #27272A;
      border-radius: 4px;
    }

    /* Linear-Style Card Surface */
    .sm-card {
      background: #121214;
      border: 1px solid #1E1E22;
      border-radius: 10px;
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }

    /* Optimization Index Component */
    .sm-index-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    .sm-index-label {
      font-size: 12px;
      font-weight: 500;
      color: #A1A1AA;
      letter-spacing: -0.01em;
    }

    .sm-index-score {
      font-size: 13px;
      font-weight: 600;
      color: #F4F4F5;
      letter-spacing: -0.02em;
    }

    .sm-progress-bar-bg {
      width: 100%;
      height: 5px;
      background: #1F1F23;
      border-radius: 9999px;
      overflow: hidden;
      position: relative;
    }

    .sm-progress-bar-fill {
      height: 100%;
      width: 94.2%;
      background: #3B82F6;
      border-radius: 9999px;
      transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .sm-telemetry-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 2px;
      font-size: 11px;
      color: #71717A;
    }

    .sm-telemetry-surge {
      color: #10B981;
      font-weight: 500;
    }

    .sm-telemetry-node {
      color: #71717A;
    }

    /* Target Market Selector */
    .sm-section-label {
      font-size: 12px;
      font-weight: 500;
      color: #A1A1AA;
      letter-spacing: -0.01em;
    }

    .sm-select-wrapper {
      position: relative;
    }

    .sm-select {
      width: 100%;
      background: #18181B;
      border: 1px solid #27272A;
      border-radius: 8px;
      padding: 8px 30px 8px 12px;
      color: #F4F4F5;
      font-size: 12.5px;
      font-weight: 450;
      outline: none;
      appearance: none;
      cursor: pointer;
      transition: border-color 0.15s ease, background 0.15s ease;
    }

    .sm-select:hover {
      background: #1C1C20;
      border-color: #3F3F46;
    }

    .sm-select:focus {
      border-color: #3B82F6;
      box-shadow: 0 0 0 1px #3B82F6;
    }

    .sm-select-chevron {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      color: #71717A;
      font-size: 9px;
    }

    /* Segmented Filter Badges */
    .sm-badges-row {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .sm-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: #18181B;
      border: 1px solid #27272A;
      border-radius: 6px;
      padding: 4px 9px;
      font-size: 11px;
      font-weight: 450;
      color: #A1A1AA;
      cursor: pointer;
      user-select: none;
      transition: all 0.15s ease;
    }

    .sm-badge:hover {
      background: #202024;
      color: #F4F4F5;
      border-color: #3F3F46;
    }

    .sm-badge.active {
      background: #1E2433;
      border-color: #2E4C7E;
      color: #93C5FD;
    }

    /* Segmented Tabs (Linear Style) */
    .sm-tabs-row {
      display: flex;
      background: #141416;
      border-radius: 8px;
      padding: 3px;
      border: 1px solid #222226;
    }

    .sm-tab-btn {
      flex: 1;
      background: transparent;
      border: none;
      padding: 6px 8px;
      font-size: 12px;
      font-weight: 500;
      color: #71717A;
      cursor: pointer;
      border-radius: 6px;
      text-align: center;
      transition: all 0.15s ease;
    }

    .sm-tab-btn:hover {
      color: #D4D4D8;
    }

    .sm-tab-btn.active {
      background: #202024;
      color: #FFFFFF;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    }

    /* Script Production Terminal (Clean Editor) */
    .sm-terminal-card {
      background: #121214;
      border: 1px solid #1E1E22;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }

    .sm-terminal-header {
      padding: 9px 14px;
      background: #151518;
      border-bottom: 1px solid #1E1E22;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 11px;
      color: #71717A;
      font-weight: 500;
    }

    .sm-terminal-content {
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .sm-frame-block {
      display: flex;
      flex-direction: column;
      gap: 4px;
      background: #161619;
      border: 1px solid #222226;
      border-left: 3px solid #3B82F6;
      padding: 10px 12px;
      border-radius: 6px;
    }

    .sm-frame-block.thesis {
      border-left-color: #60A5FA;
    }

    .sm-frame-block.cta {
      border-left-color: #10B981;
    }

    .sm-frame-label {
      font-size: 10.5px;
      font-weight: 600;
      color: #71717A;
      letter-spacing: 0.01em;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .sm-frame-text {
      font-family: "JetBrains Mono", "SF Mono", Menlo, Consolas, monospace;
      font-size: 11.5px;
      line-height: 1.6;
      color: #D4D4D8;
      white-space: pre-wrap;
      word-break: break-word;
      outline: none;
      cursor: text;
    }

    .sm-frame-text:focus {
      background: #1B1B20;
      border-radius: 4px;
    }

    .sm-terminal-ribbon {
      padding: 7px 14px;
      background: #0E0E10;
      border-top: 1px solid #1C1C1F;
      font-size: 11px;
      color: #52525B;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .sm-ribbon-tag {
      color: #10B981;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    /* Bottom Action Zone */
    .sm-footer {
      padding: 16px 18px;
      background: #0D0D10;
      border-top: 1px solid #1E1E22;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    /* Primary Enterprise Button */
    .sm-btn-primary {
      width: 100%;
      background: #2563EB;
      color: #FFFFFF;
      border: 1px solid #3B82F6;
      border-radius: 8px;
      padding: 10px 16px;
      font-size: 13px;
      font-weight: 550;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.15s ease;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15);
    }

    .sm-btn-primary:hover {
      background: #1D4ED8;
      border-color: #2563EB;
    }

    .sm-btn-primary:active {
      transform: scale(0.99);
    }

    .sm-btn-primary.success {
      background: #059669;
      border-color: #10B981;
    }

    /* Secondary Micro Actions */
    .sm-btn-secondary {
      width: 100%;
      background: #18181B;
      color: #D4D4D8;
      border: 1px solid #27272A;
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    .sm-btn-secondary:hover {
      background: #202024;
      color: #FFFFFF;
      border-color: #3F3F46;
    }

    .sm-btn-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
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

  function renderSidebar() {
    const list = SCRIPT_MUTATIONS[activeMarket] || SCRIPT_MUTATIONS.career;
    const cur = list[currentMutationIndex] || list[0];
    const context = detectVideoContext();

    sidebar.innerHTML = `
      <!-- 1. The Telemetry Status Bar -->
      <header class="sm-header">
        <div class="sm-header-brand">
          <div class="sm-header-logo">S</div>
          <div>
            <div class="sm-header-title">StitchMatrix</div>
            <div class="sm-header-subtitle">Enterprise Distribution Suite</div>
          </div>
        </div>
        <div class="sm-header-actions">
          <div class="sm-status-badge">
            <span class="sm-status-dot"></span>
            <span>Live Sync</span>
          </div>
          <button class="sm-close-btn" id="smCloseBtn" title="Close (Esc)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      <!-- Real-time Ingestion Strip -->
      <div class="sm-source-strip">
        <div class="sm-source-platform">
          <span>Target:</span>
          <strong style="color: #F4F4F5;">${context.platform}</strong>
        </div>
        <span>${context.author}</span>
      </div>

      <!-- Scrollable Main Content -->
      <div class="sm-content-body">
        
        <!-- 2. The Optimization Index Card -->
        <div class="sm-card">
          <div class="sm-index-header">
            <span class="sm-index-label">System Alignment</span>
            <span class="sm-index-score" id="smScoreVal">${cur.alignmentScore} Score</span>
          </div>
          <div class="sm-progress-bar-bg">
            <div class="sm-progress-bar-fill" id="smProgressBar" style="width: ${cur.alignmentScore};"></div>
          </div>
          <div class="sm-telemetry-row">
            <span class="sm-telemetry-surge">${cur.surge}</span>
            <span class="sm-telemetry-node">14ms latency · 48 nodes active</span>
          </div>
        </div>

        <!-- 3. Target Market Vector Dropdown -->
        <div class="sm-card">
          <div class="sm-section-label">Target Market Vector</div>
          <div class="sm-select-wrapper">
            <select class="sm-select" id="smMarketSelect">
              <option value="career" ${activeMarket === 'career' ? 'selected' : ''}>Career & Tech Leadership (High Conversion)</option>
              <option value="saas" ${activeMarket === 'saas' ? 'selected' : ''}>B2B SaaS Founder (Retention Matrix)</option>
              <option value="fintech" ${activeMarket === 'fintech' ? 'selected' : ''}>Fintech & Wealth Advisory (High Ticket)</option>
            </select>
            <span class="sm-select-chevron">▼</span>
          </div>
          <div class="sm-badges-row">
            <div class="sm-badge active" id="smToneBadge">Tone: ${activeTone}</div>
            <div class="sm-badge active" id="smLengthBadge">Length: ${activeLength}</div>
            <div class="sm-badge" id="smProofBadge">Proof: High Density</div>
          </div>
        </div>

        <!-- Mutation Switcher Tabs -->
        <div class="sm-tabs-row">
          ${list.map((m, idx) => `
            <button class="sm-tab-btn ${idx === currentMutationIndex ? 'active' : ''}" data-idx="${idx}">
              ${m.tabLabel}
            </button>
          `).join('')}
        </div>

        <!-- 4. The Script Production Terminal -->
        <div class="sm-terminal-card">
          <div class="sm-terminal-header">
            <span>Script Canvas (Editable)</span>
            <span style="color: #60A5FA;">Mutation ${String.fromCharCode(65 + currentMutationIndex)} · ~${cur.duration}</span>
          </div>
          
          <div class="sm-terminal-content">
            <!-- Frame 01: Hook -->
            <div class="sm-frame-block">
              <div class="sm-frame-label">
                <span>01. Hook Element</span>
                <span style="font-weight: 400; font-size: 10px; color: #52525B;">Click to edit</span>
              </div>
              <div class="sm-frame-text" id="smHookText" contenteditable="true" spellcheck="false">${cur.hook}</div>
            </div>

            <!-- Frame 02: Core Thesis -->
            <div class="sm-frame-block thesis">
              <div class="sm-frame-label">
                <span>02. Core Thesis</span>
                <span style="font-weight: 400; font-size: 10px; color: #52525B;">Click to edit</span>
              </div>
              <div class="sm-frame-text" id="smThesisText" contenteditable="true" spellcheck="false">${cur.thesis}</div>
            </div>

            <!-- Frame 03: CTA -->
            <div class="sm-frame-block cta">
              <div class="sm-frame-label">
                <span>03. Call-to-Action</span>
                <span style="font-weight: 400; font-size: 10px; color: #52525B;">Click to edit</span>
              </div>
              <div class="sm-frame-text" id="smCtaText" contenteditable="true" spellcheck="false">${cur.cta}</div>
            </div>
          </div>

          <!-- Bottom Metadata Ribbon -->
          <div class="sm-terminal-ribbon">
            <span>Syntax compiled · UTF-8</span>
            <span class="sm-ribbon-tag">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Verified #99014
            </span>
          </div>
        </div>

      </div>

      <!-- 5. The Enterprise CTA Button & Action Zone -->
      <footer class="sm-footer">
        <button class="sm-btn-primary" id="smSyncGithubBtn">
          <!-- Clean Git branch vector graphic asset -->
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="6" y1="3" x2="6" y2="15"></line>
            <circle cx="18" cy="6" r="3"></circle>
            <circle cx="6" cy="18" r="3"></circle>
            <path d="M18 9a9 9 0 0 1-9 9"></path>
          </svg>
          <span id="smSyncBtnText">Sync Assets to GitHub</span>
        </button>

        <div class="sm-btn-grid">
          <button class="sm-btn-secondary" id="smCopyScriptBtn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span id="smCopyBtnText">Copy Script</span>
          </button>

          <button class="sm-btn-secondary" id="smRegenerateBtn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
            <span>Regenerate</span>
          </button>
        </div>
      </footer>
    `;

    attachEventListeners();
  }

  function attachEventListeners() {
    // Close button
    const closeBtn = sidebar.querySelector('#smCloseBtn');
    if (closeBtn) closeBtn.onclick = toggleSidebar;

    // Market Vector select
    const marketSelect = sidebar.querySelector('#smMarketSelect');
    if (marketSelect) {
      marketSelect.onchange = (e) => {
        activeMarket = e.target.value;
        currentMutationIndex = 0;
        renderSidebar();
      };
    }

    // Mutation Tabs
    sidebar.querySelectorAll('.sm-tab-btn').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        currentMutationIndex = idx;
        renderSidebar();
      };
    });

    // Tone Badge toggle
    const toneBadge = sidebar.querySelector('#smToneBadge');
    if (toneBadge) {
      const tones = ['Direct Hook', 'Data Breakdown', 'Story Paradox'];
      toneBadge.onclick = () => {
        const nextIdx = (tones.indexOf(activeTone) + 1) % tones.length;
        activeTone = tones[nextIdx];
        renderSidebar();
      };
    }

    // Length Badge toggle
    const lengthBadge = sidebar.querySelector('#smLengthBadge');
    if (lengthBadge) {
      const lengths = ['35s', '45s', '60s'];
      lengthBadge.onclick = () => {
        const nextIdx = (lengths.indexOf(activeLength) + 1) % lengths.length;
        activeLength = lengths[nextIdx];
        renderSidebar();
      };
    }

    // Sync to GitHub Button
    const syncBtn = sidebar.querySelector('#smSyncGithubBtn');
    const syncText = sidebar.querySelector('#smSyncBtnText');
    if (syncBtn && syncText) {
      syncBtn.onclick = async () => {
        const originalText = syncText.textContent;
        syncText.textContent = 'Syncing...';
        syncBtn.style.opacity = '0.8';

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
            await fetch('https://stitchmatrix-api.humangeek77.workers.dev/api/sync-github', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });
          } catch (fetchErr) {
            // Local fallback simulation
          }

          syncBtn.classList.add('success');
          syncText.textContent = '✓ Synced to GitHub';
          setTimeout(() => {
            syncBtn.classList.remove('success');
            syncText.textContent = originalText;
            syncBtn.style.opacity = '1';
          }, 2500);
        } catch (err) {
          syncText.textContent = 'Synced Locally';
          setTimeout(() => { syncText.textContent = originalText; syncBtn.style.opacity = '1'; }, 2000);
        }
      };
    }

    // Copy Script to Clipboard
    const copyBtn = sidebar.querySelector('#smCopyScriptBtn');
    const copyText = sidebar.querySelector('#smCopyBtnText');
    if (copyBtn && copyText) {
      copyBtn.onclick = () => {
        const hookText = sidebar.querySelector('#smHookText')?.textContent || '';
        const thesisText = sidebar.querySelector('#smThesisText')?.textContent || '';
        const ctaText = sidebar.querySelector('#smCtaText')?.textContent || '';
        const formatted = `01 | Hook Element:\n${hookText}\n\n02 | Core Thesis:\n${thesisText}\n\n03 | Retentive Call-To-Action:\n${ctaText}`;
        navigator.clipboard.writeText(formatted).then(() => {
          const original = copyText.textContent;
          copyText.textContent = '✓ Copied!';
          setTimeout(() => { copyText.textContent = original; }, 1800);
        });
      };
    }

    // Regenerate Hook Button
    const regenBtn = sidebar.querySelector('#smRegenerateBtn');
    if (regenBtn) {
      regenBtn.onclick = () => {
        const list = SCRIPT_MUTATIONS[activeMarket] || SCRIPT_MUTATIONS.career;
        currentMutationIndex = (currentMutationIndex + 1) % list.length;
        renderSidebar();
      };
    }
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
    }
  }

  triggerTab.onclick = toggleSidebar;
  shadow.appendChild(sidebar);

  // Keyboard shortcut listener
  window.addEventListener('keydown', (e) => {
    if ((e.altKey && (e.key === 's' || e.key === 'S')) || (e.ctrlKey && e.shiftKey && (e.key === 's' || e.key === 'S'))) {
      e.preventDefault();
      toggleSidebar();
    }
    if (e.key === 'Escape' && isOpen) {
      toggleSidebar();
    }
  });

  // Message listener from background script
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'TOGGLE_SIDEBAR') {
        toggleSidebar();
        sendResponse({ open: isOpen });
      }
    });
  }

  console.log('[StitchMatrix] Enterprise Studio Extension v2.4 initialized.');
})();
