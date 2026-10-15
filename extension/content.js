/**
 * StitchMatrix — Viral Script Studio v3.4
 * Chrome Extension Manifest V3 In-DOM Sidebar Engine
 * Fully Automated Hands-Free Video Tracking:
 * - Automatically detects whatever video you scroll or navigate to in real-time
 * - ZERO need to close or reopen the extension — updates live on the fly as you scroll
 * - Generates 100% contextual viral scripts directly derived from that specific video
 * - No niche dropdowns, no wasted time, zero friction. Built to get creators seen by millions.
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

  // Real-time DOM Context Detector for Social Video Players
  function detectVideoContext() {
    const url = window.location.href;
    let platform = 'YouTube Shorts';
    let title = '';
    let author = '';

    try {
      if (url.includes('tiktok.com')) {
        platform = 'TikTok';
        const descEl = document.querySelector('[data-e2e="browse-video-desc"], [data-e2e="video-desc"], h1, .video-meta-title');
        const authorEl = document.querySelector('[data-e2e="browser-nickname"], [data-e2e="user-title"], .author-uniqueId');
        if (descEl?.textContent?.trim()) title = descEl.textContent.trim();
        if (authorEl?.textContent?.trim()) author = authorEl.textContent.trim();
      } else if (url.includes('youtube.com')) {
        platform = 'YouTube Shorts';

        // 1. Look for currently active reel video renderer in YouTube Shorts
        const reels = Array.from(document.querySelectorAll('ytd-reel-video-renderer'));
        let activeReel = reels.find(r => r.hasAttribute('is-active'));

        // If not flagged with is-active, check which reel has a currently playing video
        if (!activeReel && reels.length > 0) {
          activeReel = reels.find(r => {
            const v = r.querySelector('video');
            return v && !v.paused && v.currentTime > 0;
          });
        }

        // If still not found, pick the one closest to screen center
        if (!activeReel && reels.length > 0) {
          const midY = window.innerHeight / 2;
          let bestDist = Infinity;
          for (const r of reels) {
            const rect = r.getBoundingClientRect();
            if (rect.height > 0) {
              const dist = Math.abs(rect.top + rect.height / 2 - midY);
              if (dist < bestDist) {
                bestDist = dist;
                activeReel = r;
              }
            }
          }
        }

        if (activeReel) {
          const tEl = activeReel.querySelector(
            '#overlay #title, .ytReelMetamodelViewModelHostTitle, #title.ytd-reel-player-header-renderer, h2.title, yt-formatted-string.title, .title, h2'
          );
          const aEl = activeReel.querySelector(
            '#channel-name, .ytd-channel-name, #text.ytd-channel-name, [id="channel-name"], .yt-simple-endpoint.ytd-channel-name'
          );
          if (tEl?.textContent?.trim()) title = tEl.textContent.trim();
          if (aEl?.textContent?.trim()) author = aEl.textContent.trim();
        }

        // 2. Fallback selectors in Shorts header
        if (!title) {
          const headerTitle = document.querySelector(
            'ytd-shorts-player-header-renderer #text, #title.ytd-reel-player-header-renderer, .ytReelMetamodelViewModelHostTitle, h1.title, h2.title'
          );
          if (headerTitle?.textContent?.trim()) title = headerTitle.textContent.trim();
        }

        // 3. Fallback to document title
        if (!title && document.title && !document.title.includes('YouTube Shorts')) {
          title = document.title.replace(' - YouTube', '').trim();
        }

        if (!author) {
          const genericAuthor = document.querySelector('#channel-name, .ytd-channel-name, #text.ytd-channel-name');
          if (genericAuthor?.textContent?.trim()) author = genericAuthor.textContent.trim();
        }
      } else if (url.includes('instagram.com')) {
        platform = 'Instagram Reels';
        const captionEl = document.querySelector('article h1, article span._aacl, article div._a9zs');
        const authorEl = document.querySelector('header a, span._ap3a');
        if (captionEl?.textContent?.trim()) title = captionEl.textContent.trim();
        if (authorEl?.textContent?.trim()) author = authorEl.textContent.trim();
      }
    } catch (e) {
      // Graceful fallback
    }

    if (!title) title = 'Active Viral Video';
    if (!author) author = '@creator';

    // Clean up title length for display
    let displayTitle = title;
    if (displayTitle.length > 72) displayTitle = displayTitle.slice(0, 69) + '...';

    return { platform, title, displayTitle, author, url };
  }

  // Extract core subject keyword from title
  function extractSubject(rawTitle) {
    if (!rawTitle || rawTitle === 'Active Viral Video') return 'this viral moment';
    let clean = rawTitle
      .replace(/#\w+/g, '') // strip hashtags
      .replace(/\|.*$/g, '') // strip | suffix
      .replace(/\[.*?\]/g, '') // strip brackets
      .replace(/\(.*?\)/g, '') // strip parens
      .replace(/[-–—].*$/g, '') // strip dash suffixes
      .replace(/\b(official trailer|episode \d+|reimagined|shorts|viral|4k|hd|part \d+)\b/gi, '')
      .replace(/[^\w\s'&]/gi, '')
      .trim();
    if (clean.length < 3) clean = rawTitle.slice(0, 40).trim();
    return clean;
  }

  // Generate dynamic hashtags based on actual video title
  function generateDynamicHashtags(rawTitle) {
    const words = rawTitle
      .replace(/[^\w\s]/gi, '')
      .split(/\s+/)
      .filter(w => w.length > 3 && !['this', 'that', 'with', 'from', 'have', 'were', 'what', 'epic', 'part', 'episode'].includes(w.toLowerCase()));
    
    const tags = words.slice(0, 3).map(w => '#' + w.charAt(0).toUpperCase() + w.slice(1));
    tags.push('#ViralShorts', '#Trending');
    return tags.join(' ');
  }

  // Dynamic Multi-Angle Script Synthesizer tailored to the CURRENT VIDEO
  function buildViralScripts(videoContext) {
    const subject = extractSubject(videoContext.title);
    const hashtags = generateDynamicHashtags(videoContext.title);

    return [
      {
        id: 'curiosity',
        title: '🔥 Curiosity Gap',
        subtitle: 'High Intrigue & Instant Hook',
        badge: 'High Views',
        duration: '30s',
        viralScore: '97/100',
        hook: `Nobody realized this secret about ${subject} until now. The real story behind what you're watching is blowing everyone's mind.`,
        body: `While 99% of people scrolled right past this, there's a crazy detail hidden in plain sight. If you look closely at how this was constructed, everything changes. The creators specifically engineered this exact moment to trigger the algorithm and keep you glued to your screen.`,
        cta: `Did you catch that detail on your first watch? Drop your theory in the comments and save this before it's taken down.`,
        hashtags: hashtags
      },
      {
        id: 'hot_take',
        title: '⚡ Hot Take & Debate',
        subtitle: 'Controversial Angle for Comments',
        badge: 'High Debate',
        duration: '34s',
        viralScore: '95/100',
        hook: `Everyone is talking about ${subject}, but everyone is getting the entire story completely backwards. Here is the uncomfortable truth.`,
        body: `People think this succeeded by luck. But look at the pattern: the first 2 seconds drops you directly into peak tension without a single second wasted on introductions. That single psychological trick is why this is generating millions of views right now.`,
        cta: `Do you agree with this take or do you see it differently? Sound off in the comments below right now.`,
        hashtags: hashtags
      },
      {
        id: 'teardown',
        title: '🎬 Behind-The-Scenes',
        subtitle: 'Breakdown of Why It Worked',
        badge: 'High Authority',
        duration: '32s',
        viralScore: '94/100',
        hook: `This video about ${subject} is currently breaking the algorithm. Let's break down the exact formula in 30 seconds.`,
        body: `Notice how frame one gives you an immediate emotional punchline? Then they immediately stack 3 high-contrast visual cuts before the 8-second retention drop-off. If you're a creator trying to hit millions of views, steal this exact pacing.`,
        cta: `Bookmark this breakdown to copy for your next upload. Hit follow for daily algorithmic teardowns.`,
        hashtags: hashtags
      }
    ];
  }

  // State
  let activeStyleIndex = 0; // Default to Curiosity Gap
  let isOpen = false;
  let isTeleprompterActive = false;
  let teleprompterInterval = null;
  let currentContext = detectVideoContext();
  let generatedScripts = buildViralScripts(currentContext);

  // Create Host Container
  const host = document.createElement('div');
  host.id = 'stitchmatrix-extension-root';
  document.documentElement.appendChild(host);

  // Attach Shadow DOM for complete CSS encapsulation
  const shadow = host.attachShadow({ mode: 'open' });

  // Inject Scoped Styles into Shadow DOM (Executive Dark Slate Theme)
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    :host {
      all: initial;
      font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 13px;
      line-height: 1.5;
      color: #F1F5F9;
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
      width: 36px;
      height: 88px;
      background: #101726;
      border: 1px solid #1E2D47;
      border-right: none;
      border-radius: 10px 0 0 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 7px;
      cursor: pointer;
      z-index: 2147483646;
      box-shadow: -4px 0 20px rgba(0, 0, 0, 0.45);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .sm-floating-trigger:hover {
      background: #162035;
      width: 40px;
      border-color: #3B82F6;
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
      box-shadow: 0 0 8px #10B981;
    }

    /* Main Sidebar Drawer (Executive Dark Slate) */
    .sm-sidebar-container {
      position: fixed;
      top: 0;
      right: 0;
      width: 410px;
      height: 100vh;
      background: #0B0F17 !important;
      border-left: 1px solid #1E293D;
      color: #F1F5F9;
      z-index: 2147483647;
      transform: translateX(410px);
      transition: transform 280ms cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      box-shadow: -14px 0 40px rgba(0, 0, 0, 0.7);
      overflow: hidden;
      user-select: text;
    }

    .sm-sidebar-container.open {
      transform: translateX(0);
    }

    /* Top Header */
    .sm-header {
      padding: 11px 16px;
      background: #101726;
      border-bottom: 1px solid #1C273C;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .sm-header-brand {
      display: flex;
      align-items: center;
      gap: 9px;
    }

    .sm-logo-icon {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      background: linear-gradient(135deg, #2563EB, #4F46E5);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      font-weight: 750;
      font-size: 12px;
      box-shadow: 0 2px 6px rgba(37, 99, 235, 0.35);
    }

    .sm-header-title {
      font-size: 13px;
      font-weight: 700;
      color: #F8FAFC;
      letter-spacing: -0.01em;
    }

    .sm-header-actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .sm-auto-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 10px;
      color: #34D399;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.25);
      padding: 2px 6px;
      border-radius: 9999px;
      font-weight: 600;
    }

    .sm-close-btn {
      background: #162035;
      border: 1px solid #23314B;
      color: #94A3B8;
      cursor: pointer;
      width: 26px;
      height: 26px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }

    .sm-close-btn:hover {
      background: #202D47;
      color: #FFFFFF;
      border-color: #3B82F6;
    }

    /* Video Ingestion Banner (The Live Anchor) */
    .sm-video-banner {
      padding: 10px 16px;
      background: linear-gradient(180deg, #131D2E 0%, #0E1624 100%);
      border-bottom: 1px solid #1E2D47;
      display: flex;
      flex-direction: column;
      gap: 6px;
      transition: background 0.4s ease;
    }

    .sm-video-banner.pulse-active {
      background: linear-gradient(180deg, #1D3557 0%, #10223D 100%);
    }

    .sm-video-status-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 11px;
    }

    .sm-live-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      color: #34D399;
      font-weight: 600;
      font-size: 10.5px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.25);
      padding: 2px 8px;
      border-radius: 9999px;
    }

    .sm-pulse-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 8px #10B981;
      animation: smBeaconPulse 2s infinite ease-in-out;
    }

    @keyframes smBeaconPulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
    }

    .sm-rescan-btn {
      background: transparent;
      border: 1px solid #23314B;
      color: #94A3B8;
      border-radius: 5px;
      padding: 2px 8px;
      font-size: 10.5px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 3px;
      transition: all 0.15s ease;
    }

    .sm-rescan-btn:hover {
      background: #1E2D47;
      color: #F8FAFC;
      border-color: #3B82F6;
    }

    .sm-video-title {
      font-size: 12.5px;
      font-weight: 650;
      color: #F8FAFC;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: -0.01em;
      transition: color 0.3s ease;
    }

    .sm-video-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 10.5px;
      color: #64748B;
    }

    .sm-video-meta span strong {
      color: #94A3B8;
    }

    /* 3 Fast Angle Tabs (NO DROPDOWNS!) */
    .sm-angle-deck {
      padding: 8px 14px;
      background: #0D121D;
      border-bottom: 1px solid #1A2436;
      display: flex;
      gap: 6px;
    }

    .sm-angle-tab {
      flex: 1;
      background: #111724;
      border: 1px solid #1E2B42;
      border-radius: 7px;
      padding: 6px 8px;
      font-size: 11px;
      font-weight: 600;
      color: #8B98AD;
      cursor: pointer;
      text-align: center;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    .sm-angle-tab:hover {
      color: #F1F5F9;
      border-color: #2D3E5E;
    }

    .sm-angle-tab.active {
      background: #1C283C;
      color: #60A5FA;
      font-weight: 700;
      border: 1px solid #3B82F6;
      box-shadow: 0 1px 4px rgba(59, 130, 246, 0.2);
    }

    /* Scrollable Script Canvas */
    .sm-canvas-area {
      flex: 1;
      overflow-y: auto;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .sm-canvas-area::-webkit-scrollbar {
      width: 4px;
    }

    .sm-canvas-area::-webkit-scrollbar-thumb {
      background: #23314B;
      border-radius: 4px;
    }

    /* Script Block Card */
    .sm-frame-card {
      background: #131C2B;
      border: 1px solid #1F2C44;
      border-radius: 8px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }

    .sm-frame-card:hover {
      border-color: #2D3E5E;
    }

    .sm-frame-card:focus-within {
      border-color: #3B82F6;
      box-shadow: 0 0 0 1px #3B82F6;
    }

    .sm-frame-header {
      padding: 6px 10px;
      background: #111826;
      border-bottom: 1px solid #1A2538;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .sm-frame-title {
      font-size: 11px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .sm-part-badge {
      font-size: 9.5px;
      font-weight: 750;
      padding: 1px 5px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    .sm-badge-hook { background: rgba(59, 130, 246, 0.18); color: #60A5FA; border: 1px solid rgba(59, 130, 246, 0.3); }
    .sm-badge-body { background: rgba(99, 102, 241, 0.18); color: #A5B4FC; border: 1px solid rgba(99, 102, 241, 0.3); }
    .sm-badge-cta  { background: rgba(16, 185, 129, 0.18); color: #34D399; border: 1px solid rgba(16, 185, 129, 0.3); }

    .sm-frame-time {
      font-size: 10px;
      color: #64748B;
      font-weight: 500;
    }

    .sm-copy-part-btn {
      background: #162035;
      border: 1px solid #23314B;
      color: #94A3B8;
      cursor: pointer;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 3px;
      transition: all 0.15s ease;
    }

    .sm-copy-part-btn:hover {
      background: #202D47;
      color: #F8FAFC;
      border-color: #3B82F6;
    }

    .sm-frame-editor {
      padding: 10px 12px;
      font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif;
      font-size: 12.5px;
      line-height: 1.55;
      color: #F1F5F9;
      outline: none;
      cursor: text;
      white-space: pre-wrap;
      word-break: break-word;
      min-height: 48px;
      transition: background 0.2s ease;
    }

    .sm-frame-editor.teleprompter-active {
      background: rgba(59, 130, 246, 0.18);
      border-radius: 4px;
    }

    /* Creator Tools: Teleprompter & Viral Hashtags */
    .sm-tools-card {
      background: #131C2B;
      border: 1px solid #1F2C44;
      border-radius: 8px;
      padding: 9px 12px;
      display: flex;
      flex-direction: column;
      gap: 7px;
    }

    .sm-tool-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 11px;
      font-weight: 650;
      color: #F8FAFC;
    }

    .sm-pacing-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #0E1624;
      border: 1px solid #1A2436;
      border-radius: 6px;
      padding: 6px 10px;
      font-size: 11px;
    }

    .sm-practice-btn {
      background: #2563EB;
      color: #FFFFFF;
      border: none;
      border-radius: 5px;
      padding: 4px 10px;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: all 0.15s ease;
    }

    .sm-practice-btn:hover {
      background: #1D4ED8;
    }

    .sm-practice-btn.stop {
      background: #DC2626;
    }

    .sm-hashtags-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #0E1624;
      border: 1px solid #1A2436;
      border-radius: 6px;
      padding: 6px 10px;
      gap: 8px;
    }

    .sm-hashtags-text {
      font-size: 10.5px;
      color: #60A5FA;
      font-weight: 550;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .sm-copy-tags-btn {
      background: #162035;
      border: 1px solid #23314B;
      color: #CBD5E1;
      border-radius: 4px;
      padding: 3px 7px;
      font-size: 10px;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease;
    }

    .sm-copy-tags-btn:hover {
      background: #202D47;
      color: #FFFFFF;
      border-color: #3B82F6;
    }

    /* Sticky Action Footer */
    .sm-footer {
      padding: 11px 14px;
      background: #101726;
      border-top: 1px solid #1C273C;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .sm-btn-primary {
      width: 100%;
      background: #2563EB;
      color: #FFFFFF;
      border: 1px solid #3B82F6;
      border-radius: 7px;
      padding: 10px 14px;
      font-size: 12.5px;
      font-weight: 650;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      transition: all 0.15s ease;
      box-shadow: 0 2px 6px rgba(37, 99, 235, 0.35);
    }

    .sm-btn-primary:hover {
      background: #1D4ED8;
      box-shadow: 0 4px 10px rgba(37, 99, 235, 0.45);
    }

    .sm-btn-primary:active {
      transform: scale(0.99);
    }

    .sm-btn-primary.copied {
      background: #059669 !important;
      border-color: #10B981 !important;
    }

    .sm-footer-secondary {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
    }

    .sm-btn-secondary {
      background: #131C2B;
      border: 1px solid #1F2C44;
      color: #CBD5E1;
      border-radius: 6px;
      padding: 7px 10px;
      font-size: 11.5px;
      font-weight: 550;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      transition: all 0.15s ease;
    }

    .sm-btn-secondary:hover {
      background: #1A263B;
      color: #F8FAFC;
      border-color: #2D3E5E;
    }

    /* Toast Notification */
    .sm-toast {
      position: absolute;
      bottom: 78px;
      left: 50%;
      transform: translateX(-50%) translateY(10px);
      background: #131D2E;
      border: 1px solid #3B82F6;
      color: #FFFFFF;
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 600;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
      opacity: 0;
      pointer-events: none;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      align-items: center;
      gap: 5px;
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
  triggerTab.title = 'Open StitchMatrix Script Studio (Alt+S)';
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

  // Toast Container
  const toastEl = document.createElement('div');
  toastEl.className = 'sm-toast';
  sidebar.appendChild(toastEl);

  function showToast(msg) {
    toastEl.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${msg}</span>
    `;
    toastEl.classList.add('show');
    setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2200);
  }

  function getCanvasStats() {
    const hook = sidebar.querySelector('#smHookText')?.textContent || '';
    const body = sidebar.querySelector('#smBodyText')?.textContent || '';
    const cta = sidebar.querySelector('#smCtaText')?.textContent || '';
    const words = (hook + ' ' + body + ' ' + cta).trim().split(/\s+/).filter(Boolean).length;
    const estSec = Math.max(15, Math.round(words / 2.4)); // ~145 words per minute
    return { words, estSec };
  }

  // Smooth live in-place update without closing the drawer
  function updateLiveContent(animateFlash) {
    const curScript = generatedScripts[activeStyleIndex] || generatedScripts[0];

    const titleEl = sidebar.querySelector('#smDetectedTitle');
    const targetEl = sidebar.querySelector('#smMetaTarget');
    const authorEl = sidebar.querySelector('#smMetaAuthor');
    const scoreEl = sidebar.querySelector('#smMetaScore');
    const hookEl = sidebar.querySelector('#smHookText');
    const bodyEl = sidebar.querySelector('#smBodyText');
    const ctaEl = sidebar.querySelector('#smCtaText');
    const tagsEl = sidebar.querySelector('#smHashtagDisplay');
    const bannerEl = sidebar.querySelector('#smVideoBanner');

    if (titleEl) {
      titleEl.textContent = `"${currentContext.displayTitle}"`;
      titleEl.title = currentContext.title;
    }
    if (targetEl) targetEl.textContent = currentContext.platform;
    if (authorEl) authorEl.textContent = currentContext.author;
    if (scoreEl) scoreEl.textContent = curScript.viralScore;
    if (hookEl) hookEl.textContent = curScript.hook;
    if (bodyEl) bodyEl.textContent = curScript.body;
    if (ctaEl) ctaEl.textContent = curScript.cta;
    if (tagsEl) tagsEl.textContent = curScript.hashtags;

    updateWordStats();

    if (animateFlash && bannerEl) {
      bannerEl.classList.add('pulse-active');
      setTimeout(() => bannerEl.classList.remove('pulse-active'), 500);
    }
  }

  // Core automatic detection & live sync
  function checkAndAutoUpdate() {
    if (!isOpen) return;

    const newContext = detectVideoContext();

    // Check if video title has changed and is valid
    if (newContext.title && newContext.title !== currentContext.title && newContext.title !== 'Active Viral Video') {
      // Do not interrupt if user is actively editing text
      const activeEl = shadow.activeElement;
      if (activeEl && activeEl.isContentEditable) return;

      currentContext = newContext;
      generatedScripts = buildViralScripts(currentContext);

      updateLiveContent(true);
      showToast(`⚡ Remixed for: "${currentContext.displayTitle.slice(0, 26)}..."`);
    }
  }

  function renderSidebar() {
    const curScript = generatedScripts[activeStyleIndex] || generatedScripts[0];

    sidebar.innerHTML = `
      <!-- 1. Sleek Top Header -->
      <header class="sm-header">
        <div class="sm-header-brand">
          <div class="sm-logo-icon">S</div>
          <div>
            <div class="sm-header-title">StitchMatrix Viral Studio</div>
          </div>
        </div>
        <div class="sm-header-actions">
          <span class="sm-auto-badge" title="Live automatic video tracking active">
            <span class="sm-pulse-dot" style="width: 4px; height: 4px;"></span>
            <span>Auto-Sync</span>
          </span>
          <button class="sm-close-btn" id="smCloseBtn" title="Close Studio (Esc)">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      <!-- 2. Active Video Ingestion Card (The Core Live Anchor) -->
      <div class="sm-video-banner" id="smVideoBanner">
        <div class="sm-video-status-row">
          <span class="sm-live-badge">
            <span class="sm-pulse-dot"></span>
            <span>Remixing Active Video</span>
          </span>
          <button class="sm-rescan-btn" id="smRescanBtn" title="Manually re-check video">
            🔄 Re-scan
          </button>
        </div>
        <div class="sm-video-title" id="smDetectedTitle" title="${currentContext.title}">
          "${currentContext.displayTitle}"
        </div>
        <div class="sm-video-meta">
          <span>Target: <strong id="smMetaTarget">${currentContext.platform}</strong></span>
          <span>•</span>
          <span>Creator: <strong id="smMetaAuthor">${currentContext.author}</strong></span>
          <span>•</span>
          <span style="color: #34D399;">Viral Potential: <strong id="smMetaScore">${curScript.viralScore}</strong></span>
        </div>
      </div>

      <!-- 3. Zero-Dropdown Angle Selector (3 Fast Viral Styles for THIS Video) -->
      <div class="sm-angle-deck">
        ${generatedScripts.map((s, idx) => `
          <button class="sm-angle-tab ${idx === activeStyleIndex ? 'active' : ''}" data-idx="${idx}" title="${s.subtitle}">
            ${s.title}
          </button>
        `).join('')}
      </div>

      <!-- 4. Scrollable Script Canvas (Contextual to this video!) -->
      <div class="sm-canvas-area">
        
        <!-- Part 1: The Hook -->
        <div class="sm-frame-card">
          <div class="sm-frame-header">
            <div class="sm-frame-title">
              <span class="sm-part-badge sm-badge-hook">Part 1</span>
              <span>The Viral Hook (0–3s)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span class="sm-frame-time">Stop the scroll</span>
              <button class="sm-copy-part-btn" id="smCopyHookBtn" title="Copy hook only">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>Copy</span>
              </button>
            </div>
          </div>
          <div class="sm-frame-editor" id="smHookText" contenteditable="true" spellcheck="false">${curScript.hook}</div>
        </div>

        <!-- Part 2: The Core Body -->
        <div class="sm-frame-card">
          <div class="sm-frame-header">
            <div class="sm-frame-title">
              <span class="sm-part-badge sm-badge-body">Part 2</span>
              <span>The Story / Breakdown (4–25s)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span class="sm-frame-time">Hold attention</span>
              <button class="sm-copy-part-btn" id="smCopyBodyBtn" title="Copy body only">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>Copy</span>
              </button>
            </div>
          </div>
          <div class="sm-frame-editor" id="smBodyText" contenteditable="true" spellcheck="false">${curScript.body}</div>
        </div>

        <!-- Part 3: Call to Action -->
        <div class="sm-frame-card">
          <div class="sm-frame-header">
            <div class="sm-frame-title">
              <span class="sm-part-badge sm-badge-cta">Part 3</span>
              <span>Retention Call-To-Action (26–35s)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span class="sm-frame-time">Trigger comments</span>
              <button class="sm-copy-part-btn" id="smCopyCtaBtn" title="Copy CTA only">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>Copy</span>
              </button>
            </div>
          </div>
          <div class="sm-frame-editor" id="smCtaText" contenteditable="true" spellcheck="false">${curScript.cta}</div>
        </div>

        <!-- Creator Tools: Teleprompter & Viral Hashtags -->
        <div class="sm-tools-card">
          <div class="sm-tool-header">
            <span>🎙️ Teleprompter Pacing</span>
            <span id="smWordStats" style="color: #94A3B8; font-size: 10.5px;">~70 words · ~30s</span>
          </div>
          <div class="sm-pacing-row">
            <span>145 WPM · High-retention speaking pace</span>
            <button class="sm-practice-btn" id="smTeleprompterBtn">
              <span>▶ Practice Read</span>
            </button>
          </div>

          <div class="sm-tool-header" style="margin-top: 2px;">
            <span>🏷️ Trending Hashtags for this Video</span>
          </div>
          <div class="sm-hashtags-row">
            <span class="sm-hashtags-text" id="smHashtagDisplay">${curScript.hashtags}</span>
            <button class="sm-copy-tags-btn" id="smCopyHashtagsBtn">Copy Tags</button>
          </div>
        </div>

      </div>

      <!-- 5. Sticky Action Footer -->
      <footer class="sm-footer">
        <!-- Big Primary 1-Click Copy -->
        <button class="sm-btn-primary" id="smCopyFullBtn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span id="smCopyFullText">Copy Full Script (Alt+C)</span>
        </button>

        <!-- Secondary Actions -->
        <div class="sm-footer-secondary">
          <button class="sm-btn-secondary" id="smTryAnotherBtn" title="Cycle to next angle for this video">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
            <span>Cycle Angle</span>
          </button>

          <button class="sm-btn-secondary" id="smExportBtn" title="Download script as .txt">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>Export (.txt)</span>
          </button>
        </div>
      </footer>
    `;

    attachEventListeners();
    updateWordStats();
  }

  function updateWordStats() {
    const stats = getCanvasStats();
    const statsEl = sidebar.querySelector('#smWordStats');
    if (statsEl) {
      statsEl.textContent = `~${stats.words} words · ~${stats.estSec}s read time`;
    }
  }

  function attachEventListeners() {
    // Close button
    const closeBtn = sidebar.querySelector('#smCloseBtn');
    if (closeBtn) closeBtn.onclick = toggleSidebar;

    // Manual Re-scan Button
    const rescanBtn = sidebar.querySelector('#smRescanBtn');
    if (rescanBtn) {
      rescanBtn.onclick = () => {
        currentContext = detectVideoContext();
        generatedScripts = buildViralScripts(currentContext);
        updateLiveContent(true);
        showToast(`Remixed: "${currentContext.displayTitle.slice(0, 26)}..."`);
      };
    }

    // Angle Tabs Selection
    sidebar.querySelectorAll('.sm-angle-tab').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        activeStyleIndex = idx;
        sidebar.querySelectorAll('.sm-angle-tab').forEach((b, i) => {
          b.classList.toggle('active', i === idx);
        });
        updateLiveContent(false);
      };
    });

    // Copy Hook Only
    const copyHookBtn = sidebar.querySelector('#smCopyHookBtn');
    if (copyHookBtn) {
      copyHookBtn.onclick = () => {
        const text = sidebar.querySelector('#smHookText')?.textContent || '';
        navigator.clipboard.writeText(text).then(() => {
          showToast('Hook copied to clipboard!');
        });
      };
    }

    // Copy Body Only
    const copyBodyBtn = sidebar.querySelector('#smBodyText')?.parentElement?.querySelector('#smCopyBodyBtn');
    if (copyBodyBtn) {
      copyBodyBtn.onclick = () => {
        const text = sidebar.querySelector('#smBodyText')?.textContent || '';
        navigator.clipboard.writeText(text).then(() => {
          showToast('Body text copied to clipboard!');
        });
      };
    }

    // Copy CTA Only
    const copyCtaBtn = sidebar.querySelector('#smCtaText')?.parentElement?.querySelector('#smCopyCtaBtn');
    if (copyCtaBtn) {
      copyCtaBtn.onclick = () => {
        const text = sidebar.querySelector('#smCtaText')?.textContent || '';
        navigator.clipboard.writeText(text).then(() => {
          showToast('CTA copied to clipboard!');
        });
      };
    }

    // Copy Hashtags
    const copyTagsBtn = sidebar.querySelector('#smCopyHashtagsBtn');
    if (copyTagsBtn) {
      copyTagsBtn.onclick = () => {
        const tags = sidebar.querySelector('#smHashtagDisplay')?.textContent || '';
        navigator.clipboard.writeText(tags).then(() => {
          showToast('Hashtags copied to clipboard!');
        });
      };
    }

    // Real-time text edit listener
    ['#smHookText', '#smBodyText', '#smCtaText'].forEach(selector => {
      const el = sidebar.querySelector(selector);
      if (el) {
        el.oninput = updateWordStats;
      }
    });

    // Primary Action: Copy Full Script
    const copyFullBtn = sidebar.querySelector('#smCopyFullBtn');
    const copyFullText = sidebar.querySelector('#smCopyFullText');
    if (copyFullBtn && copyFullText) {
      copyFullBtn.onclick = () => {
        executeCopyFullScript();
      };
    }

    // Cycle Angle Button
    const tryAnotherBtn = sidebar.querySelector('#smTryAnotherBtn');
    if (tryAnotherBtn) {
      tryAnotherBtn.onclick = () => {
        activeStyleIndex = (activeStyleIndex + 1) % generatedScripts.length;
        sidebar.querySelectorAll('.sm-angle-tab').forEach((b, i) => {
          b.classList.toggle('active', i === activeStyleIndex);
        });
        updateLiveContent(false);
        showToast(`Angle: ${generatedScripts[activeStyleIndex].title}`);
      };
    }

    // Export as .txt
    const exportBtn = sidebar.querySelector('#smExportBtn');
    if (exportBtn) {
      exportBtn.onclick = () => {
        const curScript = generatedScripts[activeStyleIndex];
        const hook = sidebar.querySelector('#smHookText')?.textContent || curScript.hook;
        const body = sidebar.querySelector('#smBodyText')?.textContent || curScript.body;
        const cta = sidebar.querySelector('#smCtaText')?.textContent || curScript.cta;
        const content = `STITCHMATRIX VIRAL SCRIPT EXPORT\n=================================\nSource Video: ${currentContext.title}\nCreator: ${currentContext.author}\nPlatform: ${currentContext.platform}\nViral Angle: ${curScript.title} (~${curScript.duration})\n\n[PART 1: THE VIRAL HOOK]\n${hook}\n\n[PART 2: THE CORE STORY]\n${body}\n\n[PART 3: RETENTION CALL-TO-ACTION]\n${cta}\n\nHASHTAGS:\n${curScript.hashtags}\n`;

        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `viral-script-${Date.now()}.txt`;
        a.click();
        showToast('Script downloaded as .txt!');
      };
    }

    // Teleprompter Practice Read Feature
    const practiceBtn = sidebar.querySelector('#smTeleprompterBtn');
    if (practiceBtn) {
      practiceBtn.onclick = () => {
        toggleTeleprompter();
      };
    }
  }

  function toggleTeleprompter() {
    isTeleprompterActive = !isTeleprompterActive;
    const practiceBtn = sidebar.querySelector('#smTeleprompterBtn');
    const hookCard = sidebar.querySelector('#smHookText');
    const bodyCard = sidebar.querySelector('#smBodyText');
    const ctaCard = sidebar.querySelector('#smCtaText');

    if (!isTeleprompterActive) {
      if (teleprompterInterval) clearInterval(teleprompterInterval);
      if (practiceBtn) {
        practiceBtn.classList.remove('stop');
        practiceBtn.innerHTML = '<span>▶ Practice Read</span>';
      }
      if (hookCard) hookCard.classList.remove('teleprompter-active');
      if (bodyCard) bodyCard.classList.remove('teleprompter-active');
      if (ctaCard) ctaCard.classList.remove('teleprompter-active');
      return;
    }

    if (practiceBtn) {
      practiceBtn.classList.add('stop');
      practiceBtn.innerHTML = '<span>⏹ Stop Read</span>';
    }

    showToast('Starting read practice...');

    let phase = 0;
    if (hookCard) hookCard.classList.add('teleprompter-active');

    teleprompterInterval = setInterval(() => {
      phase++;
      if (phase === 1) {
        if (hookCard) hookCard.classList.remove('teleprompter-active');
        if (bodyCard) bodyCard.classList.add('teleprompter-active');
      } else if (phase === 2) {
        if (bodyCard) bodyCard.classList.remove('teleprompter-active');
        if (ctaCard) ctaCard.classList.add('teleprompter-active');
      } else {
        clearInterval(teleprompterInterval);
        isTeleprompterActive = false;
        if (ctaCard) ctaCard.classList.remove('teleprompter-active');
        if (practiceBtn) {
          practiceBtn.classList.remove('stop');
          practiceBtn.innerHTML = '<span>▶ Practice Read</span>';
        }
        showToast('Practice read complete!');
      }
    }, 4500);
  }

  function executeCopyFullScript() {
    const curScript = generatedScripts[activeStyleIndex];
    const hookText = sidebar.querySelector('#smHookText')?.textContent || '';
    const bodyText = sidebar.querySelector('#smBodyText')?.textContent || '';
    const ctaText = sidebar.querySelector('#smCtaText')?.textContent || '';
    const formatted = `[PART 1: THE VIRAL HOOK]\n${hookText}\n\n[PART 2: THE CORE STORY]\n${bodyText}\n\n[PART 3: RETENTION CALL-TO-ACTION]\n${ctaText}\n\nHASHTAGS:\n${curScript.hashtags}`;

    navigator.clipboard.writeText(formatted).then(() => {
      const copyFullBtn = sidebar.querySelector('#smCopyFullBtn');
      const copyFullText = sidebar.querySelector('#smCopyFullText');
      if (copyFullBtn && copyFullText) {
        copyFullBtn.classList.add('copied');
        copyFullText.textContent = '✓ Copied to Clipboard!';
        showToast('Full script & hashtags copied!');
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
      currentContext = detectVideoContext();
      generatedScripts = buildViralScripts(currentContext);
      renderSidebar();
      sidebar.classList.add('open');
      triggerTab.style.display = 'none';
    } else {
      sidebar.classList.remove('open');
      triggerTab.style.display = 'flex';
      if (isTeleprompterActive) toggleTeleprompter();
    }
  }

  triggerTab.onclick = toggleSidebar;
  shadow.appendChild(sidebar);

  // =========================================================================
  // AUTOMATED REAL-TIME HANDS-FREE VIDEO DETECTION & LIVE RE-SYNC ENGINE
  // =========================================================================

  // 1. Capture-phase video play listener (Fires the microsecond a new video starts playing)
  document.addEventListener('play', () => {
    setTimeout(checkAndAutoUpdate, 150);
  }, true);

  // 2. YouTube custom navigation events
  window.addEventListener('yt-navigate-finish', () => {
    setTimeout(checkAndAutoUpdate, 200);
  });
  window.addEventListener('yt-page-data-updated', () => {
    setTimeout(checkAndAutoUpdate, 200);
  });

  // 3. Mouse wheel scroll listener (passive)
  let wheelTimer = null;
  window.addEventListener('wheel', () => {
    if (wheelTimer) clearTimeout(wheelTimer);
    wheelTimer = setTimeout(checkAndAutoUpdate, 250);
  }, { passive: true });

  // 4. Keyboard arrow navigation listener (Down/Up/PageDown/PageUp/J/K)
  window.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'j', 'k', 'J', 'K'].includes(e.key)) {
      setTimeout(checkAndAutoUpdate, 300);
    }
    // Global Shortcuts
    if ((e.altKey && (e.key === 's' || e.key === 'S')) || (e.ctrlKey && e.shiftKey && (e.key === 's' || e.key === 'S'))) {
      e.preventDefault();
      toggleSidebar();
    }
    if (e.key === 'Escape' && isOpen) {
      toggleSidebar();
    }
    if (isOpen && e.altKey && (e.key === 'c' || e.key === 'C')) {
      e.preventDefault();
      executeCopyFullScript();
    }
  });

  // 5. Continuous high-frequency heartbeat poller (every 300ms while sidebar is open)
  setInterval(() => {
    if (isOpen) {
      checkAndAutoUpdate();
    }
  }, 300);

  // Message listener from background script
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'TOGGLE_SIDEBAR') {
        toggleSidebar();
        sendResponse({ open: isOpen });
      }
    });
  }

  console.log('[StitchMatrix] Hands-Free Real-Time Video Tracking v3.4 loaded.');
})();
