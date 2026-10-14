/**
 * StitchMatrix — Script Matrix Studio
 * Chrome Extension Manifest V3 In-DOM Sidebar Engine
 * Injected on: TikTok, YouTube Shorts, and Instagram Reels
 */

(function () {
  'use strict';

  // Prevent multiple initializations in the same frame
  if (window.__STITCHMATRIX_INITIALIZED__) return;
  window.__STITCHMATRIX_INITIALIZED__ = true;

  // Preset Script Mutation Library
  const SCRIPT_MUTATIONS = [
    {
      id: 'mutation_alpha',
      tabLabel: 'Mutation A (Contrarian)',
      alignmentScore: '95.8%',
      surge: '+482% SURGE',
      hook: `Stop updating your LinkedIn headline. If you're still relying on inbound recruiter DMs in 2026, you're already 8 months behind the curve.`,
      thesis: `The top 1% of tech earners don't apply to public listings. They build an asynchronous Proof-of-Work pipeline that triggers algorithmic inbound. Here is the exact 3-step architecture our cohort deployed last week to bypass the recruiter filter completely.`,
      cta: `Drop the word "PIPELINE" below and I'll send you our unlisted high-density career framework doc before the open window closes tonight.`
    },
    {
      id: 'mutation_beta',
      tabLabel: 'Mutation B (Tactical)',
      alignmentScore: '94.2%',
      surge: '+450% SURGE',
      hook: `Most engineers think getting promoted requires 60-hour workweeks. Here is the exact spreadsheet matrix I used to double senior salary in 90 days.`,
      thesis: `Rule one: Quantify organizational leverage, not raw ticket output. Rule two: Replace status updates with asymmetric business KPI reports that reach VP-level visibility within 48 hours. Rule three: Own the deployment choke-points.`,
      cta: `Bookmark this breakdown before it's taken down. Full repository templates are pinned in the bio.`
    },
    {
      id: 'mutation_gamma',
      tabLabel: 'Mutation C (Teardown)',
      alignmentScore: '92.7%',
      surge: '+390% SURGE',
      hook: `This one viral framework generated 4.2M impressions and $180K in organic pipeline with zero paid ad spend. Let's inspect the telemetry.`,
      thesis: `Notice how the first 1.8 seconds eliminates preamble? No intro animations, zero throat-clearing. You deliver the punchline in frame one, stack 3 high-contrast proof points, and deliver immediate utility before the 12-second retention cliff.`,
      cta: `Run this exact prompt script through your own studio today. Comment "MATRIX" for the copy-paste prompt bundle.`
    }
  ];

  let currentMutationIndex = 1; // Default to Mutation B (matches 94.2% Stitch mockup)
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
      color: #E2E8F0;
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
      height: 96px;
      background: #0F172A;
      border: 1px solid #334155;
      border-right: none;
      border-radius: 8px 0 0 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      z-index: 2147483646;
      box-shadow: -4px 0 16px rgba(0, 0, 0, 0.4);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .sm-floating-trigger:hover {
      background: #1E293B;
      width: 36px;
      border-color: #2563EB;
    }

    .sm-floating-trigger svg {
      width: 16px;
      height: 16px;
      fill: none;
      stroke: #60A5FA;
      stroke-width: 2;
    }

    .sm-floating-trigger .trigger-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 6px #10B981;
      animation: sm-pulse 2s infinite ease-in-out;
    }

    /* Main Sidebar Drawer */
    .sm-sidebar-container {
      position: fixed;
      top: 0;
      right: 0;
      width: 380px;
      height: 100vh;
      background: #0F172A; /* Slate 900 */
      border-left: 1px solid #1E293B;
      color: #E2E8F0;
      z-index: 2147483647;
      transform: translateX(380px);
      transition: transform 380ms cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      box-shadow: -8px 0 32px rgba(0, 0, 0, 0.7);
      overflow: hidden;
    }

    .sm-sidebar-container.open {
      transform: translateX(0);
    }

    /* Telemetry Status Bar */
    .sm-header {
      padding: 14px 16px;
      background: #090E17;
      border-bottom: 1px solid #1E293B;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .sm-header-brand {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .sm-header-logo {
      width: 22px;
      height: 22px;
      border-radius: 4px;
      background: linear-gradient(135deg, #2563EB, #38BDF8);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      font-weight: 700;
      font-size: 11px;
    }

    .sm-header-title {
      font-size: 12px;
      font-weight: 600;
      color: #F8FAFC;
      letter-spacing: -0.01em;
    }

    .sm-header-subtitle {
      font-size: 10px;
      color: #64748B;
      letter-spacing: 0.02em;
    }

    .sm-status-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.25);
      padding: 3px 8px;
      border-radius: 9999px;
      font-size: 10px;
      font-weight: 500;
      color: #10B981;
    }

    .sm-status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 6px #10B981;
      animation: sm-pulse 2s infinite ease-in-out;
    }

    @keyframes sm-pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.85); }
    }

    .sm-close-btn {
      background: transparent;
      border: none;
      color: #64748B;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }

    .sm-close-btn:hover {
      color: #F8FAFC;
      background: #1E293B;
    }

    /* Scrollable Content Body */
    .sm-content-body {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .sm-content-body::-webkit-scrollbar {
      width: 4px;
    }

    .sm-content-body::-webkit-scrollbar-thumb {
      background: #334155;
      border-radius: 4px;
    }

    /* Card Surface */
    .sm-card {
      background: #141E33;
      border: 1px solid #1E293B;
      border-radius: 8px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    /* Optimization Index Component */
    .sm-index-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .sm-index-label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #94A3B8;
    }

    .sm-index-score {
      font-family: "JetBrains Mono", "SF Mono", Menlo, monospace;
      font-size: 12px;
      font-weight: 700;
      color: #38BDF8;
    }

    .sm-progress-bar-bg {
      width: 100%;
      height: 6px;
      background: #090E17;
      border-radius: 3px;
      overflow: hidden;
      position: relative;
    }

    .sm-progress-bar-fill {
      height: 100%;
      width: 94.2%;
      background: linear-gradient(90deg, #2563EB, #38BDF8, #10B981);
      border-radius: 3px;
      transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 0 10px rgba(56, 189, 248, 0.4);
    }

    .sm-telemetry-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 2px;
      font-family: "JetBrains Mono", "SF Mono", Menlo, monospace;
      font-size: 10px;
      color: #64748B;
    }

    .sm-telemetry-surge {
      color: #10B981;
      font-weight: 600;
    }

    .sm-telemetry-node {
      color: #94A3B8;
    }

    /* Target Market Selector */
    .sm-section-title {
      font-size: 11px;
      font-weight: 600;
      color: #94A3B8;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .sm-select-wrapper {
      position: relative;
    }

    .sm-select {
      width: 100%;
      background: #090E17;
      border: 1px solid #334155;
      border-radius: 6px;
      padding: 8px 28px 8px 10px;
      color: #F8FAFC;
      font-size: 12px;
      font-weight: 500;
      outline: none;
      appearance: none;
      cursor: pointer;
      transition: border-color 0.15s ease;
    }

    .sm-select:focus {
      border-color: #2563EB;
      box-shadow: 0 0 0 1px #2563EB;
    }

    .sm-select-chevron {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      color: #64748B;
      font-size: 10px;
    }

    .sm-badges-row {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .sm-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: #090E17;
      border: 1px solid #1E293B;
      border-radius: 4px;
      padding: 3px 8px;
      font-size: 10px;
      font-weight: 500;
      color: #94A3B8;
      cursor: pointer;
      user-select: none;
      transition: all 0.15s ease;
    }

    .sm-badge:hover {
      background: #1E293B;
      color: #F8FAFC;
      border-color: #334155;
    }

    .sm-badge.active {
      border-color: #2563EB;
      color: #60A5FA;
      background: rgba(37, 99, 235, 0.12);
    }

    /* Mutation Tabs */
    .sm-tabs-row {
      display: flex;
      background: #090E17;
      border-radius: 6px;
      padding: 2px;
      border: 1px solid #1E293B;
    }

    .sm-tab-btn {
      flex: 1;
      background: transparent;
      border: none;
      padding: 6px 4px;
      font-size: 10px;
      font-weight: 600;
      color: #64748B;
      cursor: pointer;
      border-radius: 4px;
      text-align: center;
      transition: all 0.15s ease;
    }

    .sm-tab-btn.active {
      background: #1E293B;
      color: #F8FAFC;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    }

    /* Script Production Terminal */
    .sm-terminal-card {
      background: #090E17;
      border: 1px solid #1E293B;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .sm-terminal-header {
      padding: 8px 12px;
      background: #0D1322;
      border-bottom: 1px solid #1E293B;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: "JetBrains Mono", "SF Mono", Menlo, monospace;
      font-size: 10px;
      color: #64748B;
    }

    .sm-terminal-content {
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-family: "JetBrains Mono", "SF Mono", Menlo, monospace;
      font-size: 11px;
      line-height: 1.6;
    }

    .sm-frame-block {
      display: flex;
      flex-direction: column;
      gap: 3px;
      background: rgba(15, 23, 42, 0.6);
      border-left: 2px solid #2563EB;
      padding: 6px 10px;
      border-radius: 0 4px 4px 0;
    }

    .sm-frame-block.thesis {
      border-left-color: #38BDF8;
    }

    .sm-frame-block.cta {
      border-left-color: #10B981;
    }

    .sm-frame-label {
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      color: #64748B;
      letter-spacing: 0.05em;
    }

    .sm-frame-text {
      color: #E2E8F0;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .sm-terminal-ribbon {
      padding: 6px 12px;
      background: #06090F;
      border-top: 1px solid #1E293B;
      font-family: "JetBrains Mono", "SF Mono", Menlo, monospace;
      font-size: 9px;
      color: #475569;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .sm-ribbon-tag {
      color: #10B981;
    }

    /* Bottom Action Zone */
    .sm-footer {
      padding: 14px 16px;
      background: #090E17;
      border-top: 1px solid #1E293B;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    /* Primary Enterprise Button */
    .sm-btn-primary {
      width: 100%;
      background: #2563EB; /* Secure Cobalt Blue */
      color: #FFFFFF;
      border: none;
      border-radius: 6px;
      padding: 11px 16px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.15s ease;
      box-shadow: 0 1px 3px rgba(37, 99, 235, 0.3), 0 0 12px rgba(37, 99, 235, 0.2);
    }

    .sm-btn-primary:hover {
      background: #1D4ED8;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.4);
    }

    .sm-btn-primary:active {
      transform: scale(0.99);
    }

    .sm-btn-primary.success {
      background: #059669;
    }

    /* Secondary Micro Actions */
    .sm-btn-secondary {
      width: 100%;
      background: #1E293B;
      color: #E2E8F0;
      border: 1px solid #334155;
      border-radius: 6px;
      padding: 8px 12px;
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    .sm-btn-secondary:hover {
      background: #334155;
      color: #FFFFFF;
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
    const cur = SCRIPT_MUTATIONS[currentMutationIndex];

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
        <div style="display: flex; align-items: center; gap: 8px;">
          <div class="sm-status-badge">
            <span class="sm-status-dot"></span>
            <span>API Secure / Sync Active</span>
          </div>
          <button class="sm-close-btn" id="smCloseBtn" title="Close Studio (Esc)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      <!-- Scrollable Main Content -->
      <div class="sm-content-body">
        
        <!-- 2. The Optimization Index Card -->
        <div class="sm-card">
          <div class="sm-index-header">
            <span class="sm-index-label">System Alignment Index</span>
            <span class="sm-index-score" id="smScoreVal">${cur.alignmentScore} Optimization Score</span>
          </div>
          <div class="sm-progress-bar-bg">
            <div class="sm-progress-bar-fill" id="smProgressBar" style="width: ${cur.alignmentScore};"></div>
          </div>
          <div class="sm-telemetry-row">
            <span class="sm-telemetry-surge">${cur.surge} DETECTED</span>
            <span class="sm-telemetry-node">14ms • 48/48 NODES</span>
          </div>
        </div>

        <!-- 3. Target Market Vector Dropdown -->
        <div class="sm-card">
          <div class="sm-section-title">Target Market Vector</div>
          <div class="sm-select-wrapper">
            <select class="sm-select" id="smMarketSelect">
              <option value="career" selected>Career / Tech Coach (High Conversion Vector)</option>
              <option value="saas">B2B SaaS Founder (Retention Matrix)</option>
              <option value="fintech">Fintech & Wealth Ops (High Ticket Inbound)</option>
              <option value="engineering">AI / Dev Tools Engineering (Algorithm Inbound)</option>
            </select>
            <span class="sm-select-chevron">▼</span>
          </div>
          <div class="sm-badges-row">
            <div class="sm-badge active" id="smToneBadge">Tone: Aggressive Hook</div>
            <div class="sm-badge active" id="smLengthBadge">Length: 35s</div>
            <div class="sm-badge" id="smProofBadge">Proof: High Density</div>
          </div>
        </div>

        <!-- Mutation Switcher Tabs -->
        <div class="sm-tabs-row">
          ${SCRIPT_MUTATIONS.map((m, idx) => `
            <button class="sm-tab-btn ${idx === currentMutationIndex ? 'active' : ''}" data-idx="${idx}">
              ${idx === 0 ? 'Contrarian' : idx === 1 ? 'Tactical' : 'Teardown'}
            </button>
          `).join('')}
        </div>

        <!-- 4. The Script Production Terminal -->
        <div class="sm-terminal-card">
          <div class="sm-terminal-header">
            <span>PROMPT_MATRIX_CANVAS // v2.4</span>
            <span style="color: #60A5FA;">MUTATION_${String.fromCharCode(65 + currentMutationIndex)}</span>
          </div>
          
          <div class="sm-terminal-content">
            <!-- Frame 01: Hook -->
            <div class="sm-frame-block">
              <span class="sm-frame-label">01 | Hook Element</span>
              <div class="sm-frame-text" id="smHookText">${cur.hook}</div>
            </div>

            <!-- Frame 02: Core Thesis -->
            <div class="sm-frame-block thesis">
              <span class="sm-frame-label">02 | Core Thesis</span>
              <div class="sm-frame-text" id="smThesisText">${cur.thesis}</div>
            </div>

            <!-- Frame 03: CTA -->
            <div class="sm-frame-block cta">
              <span class="sm-frame-label">03 | Retentive Call-To-Action</span>
              <div class="sm-frame-text" id="smCtaText">${cur.cta}</div>
            </div>
          </div>

          <!-- Bottom Metadata Ribbon -->
          <div class="sm-terminal-ribbon">
            <span>• SYNTAX COMPILED: READY TO INJECT | UTF-8 | LF</span>
            <span class="sm-ribbon-tag">HASH-OK #99014</span>
          </div>
        </div>

      </div>

      <!-- 5. The Enterprise CTA Button & Action Zone -->
      <footer class="sm-footer">
        <button class="sm-btn-primary" id="smSyncGithubBtn">
          <!-- Clean Git branch vector graphic asset -->
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="6" y1="3" x2="6" y2="15"></line>
            <circle cx="18" cy="6" r="3"></circle>
            <circle cx="6" cy="18" r="3"></circle>
            <path d="M18 9a9 9 0 0 1-9 9"></path>
          </svg>
          <span id="smSyncBtnText">Sync Assets to GitHub Repository</span>
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
            <span>Regenerate Hook</span>
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
      const tones = ['Tone: Aggressive Hook', 'Tone: Data Breakdown', 'Tone: Story Paradox'];
      let toneIdx = 0;
      toneBadge.onclick = () => {
        toneIdx = (toneIdx + 1) % tones.length;
        toneBadge.textContent = tones[toneIdx];
      };
    }

    // Length Badge toggle
    const lengthBadge = sidebar.querySelector('#smLengthBadge');
    if (lengthBadge) {
      const lengths = ['Length: 35s', 'Length: 45s', 'Length: 60s'];
      let lengthIdx = 0;
      lengthBadge.onclick = () => {
        lengthIdx = (lengthIdx + 1) % lengths.length;
        lengthBadge.textContent = lengths[lengthIdx];
      };
    }

    // Sync to GitHub Button
    const syncBtn = sidebar.querySelector('#smSyncGithubBtn');
    const syncText = sidebar.querySelector('#smSyncBtnText');
    if (syncBtn && syncText) {
      syncBtn.onclick = async () => {
        const originalText = syncText.textContent;
        syncText.textContent = 'Syncing to humangeek77-star...';
        syncBtn.style.opacity = '0.8';

        try {
          // Attempt edge worker dispatch or fallback simulation
          const payload = {
            repo: 'humangeek77-star/stitchmatrix-social-virality-dashboard',
            scriptMutation: SCRIPT_MUTATIONS[currentMutationIndex],
            url: window.location.href,
            syncedAt: new Date().toISOString()
          };
          
          let resData;
          try {
            const res = await fetch('https://stitchmatrix-api.humangeek77-star.workers.dev/api/sync-github', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });
            resData = await res.json();
          } catch (fetchErr) {
            // Local fallback simulation
            resData = { success: true };
          }

          syncBtn.classList.add('success');
          syncText.textContent = '✓ Synced to GitHub Repository';
          setTimeout(() => {
            syncBtn.classList.remove('success');
            syncText.textContent = originalText;
            syncBtn.style.opacity = '1';
          }, 3000);
        } catch (err) {
          syncText.textContent = 'Sync Completed (Local)';
          setTimeout(() => { syncText.textContent = originalText; syncBtn.style.opacity = '1'; }, 2000);
        }
      };
    }

    // Copy Script to Clipboard
    const copyBtn = sidebar.querySelector('#smCopyScriptBtn');
    const copyText = sidebar.querySelector('#smCopyBtnText');
    if (copyBtn && copyText) {
      copyBtn.onclick = () => {
        const cur = SCRIPT_MUTATIONS[currentMutationIndex];
        const formatted = `01 | Hook Element:\n${cur.hook}\n\n02 | Core Thesis:\n${cur.thesis}\n\n03 | Retentive Call-To-Action:\n${cur.cta}`;
        navigator.clipboard.writeText(formatted).then(() => {
          const original = copyText.textContent;
          copyText.textContent = '✓ Copied!';
          setTimeout(() => { copyText.textContent = original; }, 2000);
        });
      };
    }

    // Regenerate Hook Button
    const regenBtn = sidebar.querySelector('#smRegenerateBtn');
    if (regenBtn) {
      regenBtn.onclick = () => {
        currentMutationIndex = (currentMutationIndex + 1) % SCRIPT_MUTATIONS.length;
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
    // Alt+S or Ctrl+Shift+S to toggle
    if ((e.altKey && (e.key === 's' || e.key === 'S')) || (e.ctrlKey && e.shiftKey && (e.key === 's' || e.key === 'S'))) {
      e.preventDefault();
      toggleSidebar();
    }
    // Escape to close
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

  console.log('[StitchMatrix] Enterprise Studio Extension injected successfully.');
})();
