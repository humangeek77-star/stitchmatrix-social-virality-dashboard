/**
 * StitchMatrix — Executive Script Studio v3.2
 * Chrome Extension Manifest V3 In-DOM Sidebar Engine
 * Aesthetic: Executive Dark Slate (Linear / Stripe Pro UI)
 * Dynamic In-DOM Video Ingestion: Real-time active video detection with title & channel display
 * Creator-First Flow: Plain English, zero cryptic options, high-contrast readability
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

        // If not flagged with is-active, pick the one closest to screen center
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
          const tEl = activeReel.querySelector('#title, .title, h2, yt-formatted-string.title, .ytReelMetamodelViewModelHostTitle, #overlay #title');
          const aEl = activeReel.querySelector('#channel-name, .ytd-channel-name, #text.ytd-channel-name, [id="channel-name"]');
          if (tEl?.textContent?.trim()) title = tEl.textContent.trim();
          if (aEl?.textContent?.trim()) author = aEl.textContent.trim();
        }

        // 2. Fallback selectors in Shorts header
        if (!title) {
          const headerTitle = document.querySelector('#title.ytd-reel-player-header-renderer, ytd-shorts-player-header-renderer #text, h1.title, h2.title');
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

    if (!title) title = 'Viral Video Framework';
    if (!author) author = '@creator';

    // Clean up title length
    if (title.length > 70) title = title.slice(0, 67) + '...';

    return { platform, title, author, url };
  }

  // Creator-First Multi-Niche Script Library
  const SCRIPT_DATA = {
    career: {
      nicheLabel: 'Tech & Career Growth',
      hashtags: '#CareerAdvice #TechCareers #SalaryNegotiation #JobSearch #Productivity',
      styles: [
        {
          id: 'myth_buster',
          title: 'Myth Buster',
          badge: '⚡ High Comments',
          duration: '32s',
          viralScore: '96/100',
          trendingFactor: '+480% surge',
          getHook: (t) => `Stop updating your resume every 6 months. If you're still relying on public job postings in 2026, you're competing against 400 applicants for every single seat.`,
          getBody: (t) => `The highest-earning 1% never apply cold. Instead, they publish weekly Proof-of-Work teardowns that trigger inbound recruiter DMs automatically. Here is the exact 3-step outreach playbook to land unlisted executive interviews.`,
          getCta: (t) => `Comment "PLAYBOOK" below and I'll send you the exact template we use to bypass the recruiter filters tonight.`
        },
        {
          id: 'step_by_step',
          title: 'Step-by-Step Guide',
          badge: '🛠️ High Saves',
          duration: '35s',
          viralScore: '94/100',
          trendingFactor: '+450% surge',
          getHook: (t) => `Most professionals think getting promoted requires 60-hour workweeks. Here is the exact 3-step spreadsheet I used to double senior compensation in 90 days.`,
          getBody: (t) => `Step one: Stop reporting raw completed tasks. Step two: Start delivering weekly business impact KPI reports directly to leadership. Step three: Own one critical deployment choke-point that nobody else wants to touch.`,
          getCta: (t) => `Bookmark this video before your next review cycle. Full spreadsheet template link is in my bio.`
        },
        {
          id: 'case_study',
          title: 'Case Study Breakdown',
          badge: '🔍 High Authority',
          duration: '28s',
          viralScore: '93/100',
          trendingFactor: '+390% surge',
          getHook: (t) => `This exact video format generated 4.2M views and 18,000 email subscribers with zero ad budget. Let's break down why it worked.`,
          getBody: (t) => `Look at the first 2 seconds: zero intro logo, zero throat-clearing. You deliver the punchline in frame one, show 2 undeniable proof points, and deliver direct value before the 10-second attention drop-off.`,
          getCta: (t) => `Save this post to reference when filming your next short. Comment "FRAMEWORK" for the script template.`
        }
      ]
    },
    business: {
      nicheLabel: 'Business & AI Founders',
      hashtags: '#SaaS #BuildInPublic #StartupLife #AItools #Entrepreneurship',
      styles: [
        {
          id: 'myth_buster',
          title: 'Myth Buster',
          badge: '⚡ High Comments',
          duration: '34s',
          viralScore: '97/100',
          trendingFactor: '+510% surge',
          getHook: (t) => `Your landing page isn't failing because of your design. It's failing because you're pricing software features instead of customer outcome leverage.`,
          getBody: (t) => `When you bill by user seats, you penalize your client for growing their team. When you bill by programmatic output value, your revenue automatically expands as their business scales. Here is how we flipped our billing model in 48 hours.`,
          getCta: (t) => `Comment "PRICING" and I will DM you our open-source SaaS monetization architecture.`
        },
        {
          id: 'step_by_step',
          title: 'Step-by-Step Guide',
          badge: '🛠️ High Saves',
          duration: '36s',
          viralScore: '95/100',
          trendingFactor: '+430% surge',
          getHook: (t) => `Zero to $10,000 monthly recurring revenue in 6 months with zero cold outreach. Here is our 3-step flywheel.`,
          getBody: (t) => `Step one: Monitor trending industry questions every morning. Step two: Repackage the solution into a high-contrast single-chart breakdown video. Step three: Put an interactive free calculator link in the top pinned comment.`,
          getCta: (t) => `Save this breakdown for when you build your next product. The Notion automation checklist is in my bio.`
        },
        {
          id: 'case_study',
          title: 'Case Study Breakdown',
          badge: '🔍 High Authority',
          duration: '30s',
          viralScore: '92/100',
          trendingFactor: '+380% surge',
          getHook: (t) => `Here is why 90% of AI wrapper companies will disappear this year, and the one defensible moat that survives.`,
          getBody: (t) => `Simple API wrappers compete on cost and speed margins down to zero. Companies that ingest and own the user's proprietary daily workflow state cannot be replaced by foundation model releases.`,
          getCta: (t) => `Drop the word "MOAT" below to get our private retention audit checklist.`
        }
      ]
    },
    finance: {
      nicheLabel: 'Finance & Wealth Tips',
      hashtags: '#PersonalFinance #WealthBuilding #InvestingTips #MoneyMindset #SmartMoney',
      styles: [
        {
          id: 'myth_buster',
          title: 'Myth Buster',
          badge: '⚡ High Comments',
          duration: '33s',
          viralScore: '95/100',
          trendingFactor: '+470% surge',
          getHook: (t) => `Stop keeping your emergency cash in a standard checking account earning 0.01%. You're literally giving away hundreds of dollars in free interest.`,
          getBody: (t) => `Automated treasury sweep accounts currently generate 4.8% to 5.2% daily yield with full FDIC insurance. If you have $20,000 sitting idle, you are forfeiting $1,000 a year in risk-free yield.`,
          getCta: (t) => `Comment "TREASURY" and I'll send you our vetted list of the top 3 high-yield accounts for 2026.`
        },
        {
          id: 'step_by_step',
          title: 'Step-by-Step Guide',
          badge: '🛠️ High Saves',
          duration: '35s',
          viralScore: '94/100',
          trendingFactor: '+460% surge',
          getHook: (t) => `The 3 tax strategies top tech professionals use before the end of the fiscal year.`,
          getBody: (t) => `Rule one: Maximize backdoor Roth IRA conversions before the annual deadline. Rule two: Check eligibility for Section 1202 capital gains exclusion. Rule three: Fund an HSA to get the triple tax-advantaged retirement benefit.`,
          getCta: (t) => `Bookmark this guide to review with your CPA before filing season. Link in bio has our worksheet.`
        },
        {
          id: 'case_study',
          title: 'Case Study Breakdown',
          badge: '🔍 High Authority',
          duration: '29s',
          viralScore: '93/100',
          trendingFactor: '+410% surge',
          getHook: (t) => `We reviewed 40 investor portfolios this quarter. Here is the #1 mistake quietly costing high-earners six figures.`,
          getBody: (t) => `They over-index on speculative retail investments while neglecting basic tax-loss harvesting and low-fee index rebalancing that historically outperforms 85% of active day traders.`,
          getCta: (t) => `Save this post. Comment "AUDIT" to receive our private wealth allocation template.`
        }
      ]
    }
  };

  // State
  let activeNiche = 'career';
  let activeStyleIndex = 1; // Default to Step-by-Step
  let isOpen = false;
  let isTeleprompterActive = false;
  let teleprompterInterval = null;
  let currentContext = detectVideoContext();

  // Create Host Container
  const host = document.createElement('div');
  host.id = 'stitchmatrix-extension-root';
  document.documentElement.appendChild(host);

  // Attach Shadow DOM for complete CSS encapsulation
  const shadow = host.attachShadow({ mode: 'open' });

  // Inject Executive Dark Slate Scoped Styles
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

    /* Main Sidebar Drawer (Executive Dark Slate Theme) */
    .sm-sidebar-container {
      position: fixed;
      top: 0;
      right: 0;
      width: 405px;
      height: 100vh;
      background: #0B0F17 !important;
      border-left: 1px solid #1E293D;
      color: #F1F5F9;
      z-index: 2147483647;
      transform: translateX(405px);
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

    /* 1. Sleek Top Header */
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

    /* 2. THE GAME-CHANGER: Active Video Ingestion Card */
    .sm-video-banner {
      padding: 10px 16px;
      background: linear-gradient(180deg, #131D2E 0%, #0E1624 100%);
      border-bottom: 1px solid #1E2D47;
      display: flex;
      flex-direction: column;
      gap: 5px;
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
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.25);
      padding: 2px 7px;
      border-radius: 9999px;
    }

    .sm-pulse-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 8px #10B981;
    }

    .sm-rescan-btn {
      background: transparent;
      border: 1px solid #23314B;
      color: #94A3B8;
      border-radius: 5px;
      padding: 2px 7px;
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
      font-size: 12px;
      font-weight: 650;
      color: #F8FAFC;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: -0.01em;
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

    /* 3. Compact Streamlined Control Deck (Saves 180px!) */
    .sm-control-deck {
      padding: 9px 14px;
      background: #0D121D;
      border-bottom: 1px solid #1A2436;
      display: flex;
      flex-direction: column;
      gap: 7px;
    }

    .sm-deck-row {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .sm-niche-select {
      flex: 1;
      background: #131C2B;
      border: 1px solid #23314B;
      border-radius: 6px;
      padding: 5px 24px 5px 9px;
      color: #F8FAFC;
      font-size: 11.5px;
      font-weight: 550;
      outline: none;
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%226%22%20viewBox%3D%220%200%2010%206%22%3E%3Cpath%20fill%3D%22%2394A3B8%22%20d%3D%22M0%200l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E");
      background-repeat: no-repeat;
      background-position: right 8px center;
      transition: border-color 0.15s ease;
    }

    .sm-niche-select:hover {
      border-color: #3B82F6;
    }

    .sm-niche-select:focus {
      border-color: #3B82F6;
      box-shadow: 0 0 0 1px #3B82F6;
    }

    /* Style Switcher Segmented Pills */
    .sm-style-pills {
      display: flex;
      background: #111724;
      border: 1px solid #1E2B42;
      border-radius: 7px;
      padding: 2px;
      gap: 2px;
    }

    .sm-style-pill {
      flex: 1;
      background: transparent;
      border: none;
      padding: 5px 6px;
      font-size: 11px;
      font-weight: 550;
      color: #8B98AD;
      cursor: pointer;
      border-radius: 5px;
      text-align: center;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    .sm-style-pill:hover {
      color: #F1F5F9;
    }

    .sm-style-pill.active {
      background: #1C283C;
      color: #60A5FA;
      font-weight: 650;
      border: 1px solid #2B3D5E;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }

    /* 4. Scrollable Studio Canvas (Fits Viewport Beautifully) */
    .sm-canvas-area {
      flex: 1;
      overflow-y: auto;
      padding: 11px 14px;
      display: flex;
      flex-direction: column;
      gap: 9px;
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
      padding: 9px 11px;
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

    /* 5. Creator Tools (Pacing & Hashtags) */
    .sm-tools-card {
      background: #131C2B;
      border: 1px solid #1F2C44;
      border-radius: 8px;
      padding: 8px 11px;
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

    /* 6. Sticky Action Footer */
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
    }, 2000);
  }

  function getCanvasStats() {
    const hook = sidebar.querySelector('#smHookText')?.textContent || '';
    const body = sidebar.querySelector('#smBodyText')?.textContent || '';
    const cta = sidebar.querySelector('#smCtaText')?.textContent || '';
    const words = (hook + ' ' + body + ' ' + cta).trim().split(/\s+/).filter(Boolean).length;
    const estSec = Math.max(15, Math.round(words / 2.4)); // ~145 words per minute
    return { words, estSec };
  }

  function renderSidebar() {
    currentContext = detectVideoContext();
    const nicheObj = SCRIPT_DATA[activeNiche] || SCRIPT_DATA.career;
    const curStyle = nicheObj.styles[activeStyleIndex] || nicheObj.styles[0];

    sidebar.innerHTML = `
      <!-- 1. Sleek Top Header -->
      <header class="sm-header">
        <div class="sm-header-brand">
          <div class="sm-logo-icon">S</div>
          <div>
            <div class="sm-header-title">StitchMatrix Script Studio</div>
          </div>
        </div>
        <button class="sm-close-btn" id="smCloseBtn" title="Close Studio (Esc)">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </header>

      <!-- 2. Active Video Ingestion Card (Explicit Proof of Video Ingestion) -->
      <div class="sm-video-banner">
        <div class="sm-video-status-row">
          <span class="sm-live-badge">
            <span class="sm-pulse-dot"></span>
            <span>Active Video Ingested</span>
          </span>
          <button class="sm-rescan-btn" id="smRescanBtn" title="Scan new video if scrolled">
            🔄 Re-scan Video
          </button>
        </div>
        <div class="sm-video-title" id="smDetectedTitle" title="${currentContext.title}">
          "${currentContext.title}"
        </div>
        <div class="sm-video-meta">
          <span>Target: <strong>${currentContext.platform}</strong></span>
          <span>•</span>
          <span>Creator: <strong>${currentContext.author}</strong></span>
          <span>•</span>
          <span style="color: #34D399;">Viral Potential: <strong>${curStyle.viralScore}</strong></span>
        </div>
      </div>

      <!-- 3. Compact Control Deck (Saves 180px!) -->
      <div class="sm-control-deck">
        <div class="sm-deck-row">
          <select class="sm-niche-select" id="smNicheSelect" title="Select your target channel niche">
            <option value="career" ${activeNiche === 'career' ? 'selected' : ''}>💼 Tech & Career Growth</option>
            <option value="business" ${activeNiche === 'business' ? 'selected' : ''}>🚀 Business & AI Founders</option>
            <option value="finance" ${activeNiche === 'finance' ? 'selected' : ''}>💰 Finance & Wealth Tips</option>
          </select>
        </div>

        <!-- Style Segmented Pills (Myth Buster / Step-by-Step / Case Study) -->
        <div class="sm-style-pills">
          ${nicheObj.styles.map((s, idx) => `
            <button class="sm-style-pill ${idx === activeStyleIndex ? 'active' : ''}" data-idx="${idx}" title="${s.badge}">
              ${s.title} (~${s.duration})
            </button>
          `).join('')}
        </div>
      </div>

      <!-- 4. Scrollable Studio Canvas -->
      <div class="sm-canvas-area">
        
        <!-- Part 1: The Hook -->
        <div class="sm-frame-card">
          <div class="sm-frame-header">
            <div class="sm-frame-title">
              <span class="sm-part-badge sm-badge-hook">Part 1</span>
              <span>The Hook (Grab Attention)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span class="sm-frame-time">0–3 sec</span>
              <button class="sm-copy-part-btn" id="smCopyHookBtn" title="Copy hook only">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>Copy</span>
              </button>
            </div>
          </div>
          <div class="sm-frame-editor" id="smHookText" contenteditable="true" spellcheck="false">${curStyle.getHook(currentContext.title)}</div>
        </div>

        <!-- Part 2: The Core Body -->
        <div class="sm-frame-card">
          <div class="sm-frame-header">
            <div class="sm-frame-title">
              <span class="sm-part-badge sm-badge-body">Part 2</span>
              <span>The Body (Deliver Core Value)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span class="sm-frame-time">4–25 sec</span>
              <button class="sm-copy-part-btn" id="smCopyBodyBtn" title="Copy body only">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>Copy</span>
              </button>
            </div>
          </div>
          <div class="sm-frame-editor" id="smBodyText" contenteditable="true" spellcheck="false">${curStyle.getBody(currentContext.title)}</div>
        </div>

        <!-- Part 3: Call to Action -->
        <div class="sm-frame-card">
          <div class="sm-frame-header">
            <div class="sm-frame-title">
              <span class="sm-part-badge sm-badge-cta">Part 3</span>
              <span>Call-to-Action (Drive Comments/Saves)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span class="sm-frame-time">26–35 sec</span>
              <button class="sm-copy-part-btn" id="smCopyCtaBtn" title="Copy CTA only">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>Copy</span>
              </button>
            </div>
          </div>
          <div class="sm-frame-editor" id="smCtaText" contenteditable="true" spellcheck="false">${curStyle.getCta(currentContext.title)}</div>
        </div>

        <!-- 5. Creator Tools: Teleprompter & Viral Hashtags -->
        <div class="sm-tools-card">
          <div class="sm-tool-header">
            <span>🎙️ Teleprompter Pacing Guide</span>
            <span id="smWordStats" style="color: #94A3B8; font-size: 10.5px;">~70 words · ~30s</span>
          </div>
          <div class="sm-pacing-row">
            <span>145 WPM · Optimal retention pacing</span>
            <button class="sm-practice-btn" id="smTeleprompterBtn">
              <span>▶ Practice Read</span>
            </button>
          </div>

          <div class="sm-tool-header" style="margin-top: 2px;">
            <span>🏷️ Trending Hashtags for this Short</span>
          </div>
          <div class="sm-hashtags-row">
            <span class="sm-hashtags-text" id="smHashtagDisplay">${nicheObj.hashtags}</span>
            <button class="sm-copy-tags-btn" id="smCopyHashtagsBtn">Copy Tags</button>
          </div>
        </div>

      </div>

      <!-- 6. Sticky Action Footer -->
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
          <button class="sm-btn-secondary" id="smTryAnotherBtn" title="Switch to next script angle">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
            <span>Try Another Style</span>
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

    // Re-scan Button
    const rescanBtn = sidebar.querySelector('#smRescanBtn');
    if (rescanBtn) {
      rescanBtn.onclick = () => {
        currentContext = detectVideoContext();
        renderSidebar();
        showToast(`Ingested: "${currentContext.title.slice(0, 32)}..."`);
      };
    }

    // Niche Select Dropdown
    const nicheSelect = sidebar.querySelector('#smNicheSelect');
    if (nicheSelect) {
      nicheSelect.onchange = (e) => {
        activeNiche = e.target.value;
        activeStyleIndex = 0;
        renderSidebar();
        showToast(`Audience: ${nicheSelect.options[nicheSelect.selectedIndex].text}`);
      };
    }

    // Style Pills Selection
    sidebar.querySelectorAll('.sm-style-pill').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        activeStyleIndex = idx;
        renderSidebar();
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
    const copyBodyBtn = sidebar.querySelector('#smCopyBodyBtn');
    if (copyBodyBtn) {
      copyBodyBtn.onclick = () => {
        const text = sidebar.querySelector('#smBodyText')?.textContent || '';
        navigator.clipboard.writeText(text).then(() => {
          showToast('Body text copied to clipboard!');
        });
      };
    }

    // Copy CTA Only
    const copyCtaBtn = sidebar.querySelector('#smCopyCtaBtn');
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

    // Try Another Style Button
    const tryAnotherBtn = sidebar.querySelector('#smTryAnotherBtn');
    if (tryAnotherBtn) {
      tryAnotherBtn.onclick = () => {
        const nicheObj = SCRIPT_DATA[activeNiche] || SCRIPT_DATA.career;
        activeStyleIndex = (activeStyleIndex + 1) % nicheObj.styles.length;
        renderSidebar();
        showToast(`Switched to: ${nicheObj.styles[activeStyleIndex].title}`);
      };
    }

    // Export as .txt
    const exportBtn = sidebar.querySelector('#smExportBtn');
    if (exportBtn) {
      exportBtn.onclick = () => {
        const nicheObj = SCRIPT_DATA[activeNiche] || SCRIPT_DATA.career;
        const curStyle = nicheObj.styles[activeStyleIndex];
        const hook = sidebar.querySelector('#smHookText')?.textContent || curStyle.getHook(currentContext.title);
        const body = sidebar.querySelector('#smBodyText')?.textContent || curStyle.getBody(currentContext.title);
        const cta = sidebar.querySelector('#smCtaText')?.textContent || curStyle.getCta(currentContext.title);
        const content = `STITCHMATRIX SCRIPT EXPORT\n=========================\nSource Video: ${currentContext.title}\nPlatform: ${currentContext.platform}\nNiche: ${nicheObj.nicheLabel}\nStyle: ${curStyle.title} (~${curStyle.duration})\n\n[PART 1: THE HOOK]\n${hook}\n\n[PART 2: THE BODY]\n${body}\n\n[PART 3: CALL-TO-ACTION]\n${cta}\n\nHASHTAGS:\n${nicheObj.hashtags}\n`;

        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `script-${curStyle.id}-${Date.now()}.txt`;
        a.click();
        showToast('Script downloaded as .txt!');
      };
    }

    // Teleprompter / Practice Read Feature
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
    const nicheObj = SCRIPT_DATA[activeNiche] || SCRIPT_DATA.career;
    const curStyle = nicheObj.styles[activeStyleIndex];
    const hookText = sidebar.querySelector('#smHookText')?.textContent || '';
    const bodyText = sidebar.querySelector('#smBodyText')?.textContent || '';
    const ctaText = sidebar.querySelector('#smCtaText')?.textContent || '';
    const formatted = `[PART 1: THE HOOK]\n${hookText}\n\n[PART 2: THE BODY]\n${bodyText}\n\n[PART 3: CALL-TO-ACTION]\n${ctaText}\n\nHASHTAGS:\n${nicheObj.hashtags}`;

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

  // Auto-detect when user scrolls or navigates to a new Short/Reel
  let lastUrl = window.location.href;
  setInterval(() => {
    if (window.location.href !== lastUrl) {
      lastUrl = window.location.href;
      if (isOpen) {
        currentContext = detectVideoContext();
        renderSidebar();
        showToast(`Detected new video: "${currentContext.title.slice(0, 28)}..."`);
      }
    }
  }, 1000);

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
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

  // Message listener from background script
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'TOGGLE_SIDEBAR') {
        toggleSidebar();
        sendResponse({ open: isOpen });
      }
    });
  }

  console.log('[StitchMatrix] Executive Dark Slate Studio v3.2 loaded.');
})();
