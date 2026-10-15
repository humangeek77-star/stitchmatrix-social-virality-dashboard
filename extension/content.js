/**
 * StitchMatrix — Creator Script Studio v3.1
 * Chrome Extension Manifest V3 In-DOM Sidebar Engine
 * Clean Crisp Light Theme (Notion / Apple / Loom Aesthetic)
 * Creator-First Simplified Flow: Intuitive labels, teleprompter pacing, viral hashtags, zero jargon.
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
    let platform = 'YouTube Shorts';
    let title = 'Viral Video Framework';
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

  // Creator-Friendly Multi-Niche Script Library
  const SCRIPT_DATA = {
    career: {
      nicheLabel: 'Tech & Career Growth',
      hashtags: '#CareerAdvice #TechCareers #SalaryNegotiation #JobSearch #Productivity',
      styles: [
        {
          id: 'myth_buster',
          title: 'Myth Buster',
          badge: '⚡ High Comments',
          description: 'Challenges conventional wisdom to spark debates in the comments',
          duration: '32s',
          viralScore: '96/100',
          trendingFactor: '+480% surge',
          hook: "Stop updating your resume every 6 months. If you're still relying on public job postings in 2026, you're competing against 400 applicants for every single seat.",
          body: "The highest-earning 1% never apply cold. Instead, they publish weekly Proof-of-Work teardowns that trigger inbound recruiter DMs automatically. Here is the exact 3-step outreach playbook to land unlisted executive interviews.",
          cta: 'Comment "PLAYBOOK" below and I\'ll send you the exact template we use to bypass the recruiter filters tonight.'
        },
        {
          id: 'step_by_step',
          title: 'Step-by-Step Guide',
          badge: '🛠️ High Saves',
          description: 'Actionable 3-part framework that viewers bookmark to re-watch',
          duration: '35s',
          viralScore: '94/100',
          trendingFactor: '+450% surge',
          hook: "Most professionals think getting promoted requires 60-hour workweeks. Here is the exact 3-step spreadsheet I used to double senior compensation in 90 days.",
          body: "Step one: Stop reporting raw completed tasks. Step two: Start delivering weekly business impact KPI reports directly to leadership. Step three: Own one critical deployment choke-point that nobody else wants to touch.",
          cta: "Bookmark this video before your next review cycle. Full spreadsheet template link is in my bio."
        },
        {
          id: 'case_study',
          title: 'Case Study Breakdown',
          badge: '🔍 High Authority',
          description: 'Behind-the-scenes teardown that builds instant credibility',
          duration: '28s',
          viralScore: '93/100',
          trendingFactor: '+390% surge',
          hook: "This exact video format generated 4.2M views and 18,000 email subscribers with zero ad budget. Let's break down why it worked.",
          body: "Look at the first 2 seconds: zero intro logo, zero throat-clearing. You deliver the punchline in frame one, show 2 undeniable proof points, and deliver direct value before the 10-second attention drop-off.",
          cta: 'Save this post to reference when filming your next short. Comment "FRAMEWORK" for the script template.'
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
          description: 'Challenges conventional wisdom to spark debates in the comments',
          duration: '34s',
          viralScore: '97/100',
          trendingFactor: '+510% surge',
          hook: "Your landing page isn't failing because of your design. It's failing because you're pricing software features instead of customer outcome leverage.",
          body: "When you bill by user seats, you penalize your client for growing their team. When you bill by programmatic output value, your revenue automatically expands as their business scales. Here is how we flipped our billing model in 48 hours.",
          cta: 'Comment "PRICING" and I will DM you our open-source SaaS monetization architecture.'
        },
        {
          id: 'step_by_step',
          title: 'Step-by-Step Guide',
          badge: '🛠️ High Saves',
          description: 'Actionable 3-part framework that viewers bookmark to re-watch',
          duration: '36s',
          viralScore: '95/100',
          trendingFactor: '+430% surge',
          hook: "Zero to $10,000 monthly recurring revenue in 6 months with zero cold outreach. Here is our 3-step flywheel.",
          body: "Step one: Monitor trending industry questions every morning. Step two: Repackage the solution into a high-contrast single-chart breakdown video. Step three: Put an interactive free calculator link in the top pinned comment.",
          cta: "Save this breakdown for when you build your next product. The Notion automation checklist is in my bio."
        },
        {
          id: 'case_study',
          title: 'Case Study Breakdown',
          badge: '🔍 High Authority',
          description: 'Behind-the-scenes teardown that builds instant credibility',
          duration: '30s',
          viralScore: '92/100',
          trendingFactor: '+380% surge',
          hook: "Here is why 90% of AI wrapper companies will disappear this year, and the one defensible moat that survives.",
          body: "Simple API wrappers compete on cost and speed margins down to zero. Companies that ingest and own the user's proprietary daily workflow state cannot be replaced by foundation model releases.",
          cta: 'Drop the word "MOAT" below to get our private retention audit checklist.'
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
          description: 'Challenges conventional wisdom to spark debates in the comments',
          duration: '33s',
          viralScore: '95/100',
          trendingFactor: '+470% surge',
          hook: "Stop keeping your emergency cash in a standard checking account earning 0.01%. You're literally giving away hundreds of dollars in free interest.",
          body: "Automated treasury sweep accounts currently generate 4.8% to 5.2% daily yield with full FDIC insurance. If you have $20,000 sitting idle, you are forfeiting $1,000 a year in risk-free yield.",
          cta: 'Comment "TREASURY" and I\'ll send you our vetted list of the top 3 high-yield accounts for 2026.'
        },
        {
          id: 'step_by_step',
          title: 'Step-by-Step Guide',
          badge: '🛠️ High Saves',
          description: 'Actionable 3-part framework that viewers bookmark to re-watch',
          duration: '35s',
          viralScore: '94/100',
          trendingFactor: '+460% surge',
          hook: "The 3 tax strategies top tech professionals use before the end of the fiscal year.",
          body: "Rule one: Maximize backdoor Roth IRA conversions before the annual deadline. Rule two: Check eligibility for Section 1202 capital gains exclusion. Rule three: Fund an HSA to get the triple tax-advantaged retirement benefit.",
          cta: 'Bookmark this guide to review with your CPA before filing season. Link in bio has our worksheet.'
        },
        {
          id: 'case_study',
          title: 'Case Study Breakdown',
          badge: '🔍 High Authority',
          description: 'Behind-the-scenes teardown that builds instant credibility',
          duration: '29s',
          viralScore: '93/100',
          trendingFactor: '+410% surge',
          hook: "We reviewed 40 investor portfolios this quarter. Here is the #1 mistake quietly costing high-earners six figures.",
          body: "They over-index on speculative retail investments while neglecting basic tax-loss harvesting and low-fee index rebalancing that historically outperforms 85% of active day traders.",
          cta: 'Save this post. Comment "AUDIT" to receive our private wealth allocation template.'
        }
      ]
    }
  };

  // State
  let activeNiche = 'career';
  let activeStyleIndex = 1; // Default to Step-by-Step Guide
  let isOpen = false;
  let isTeleprompterActive = false;
  let teleprompterInterval = null;

  // Create Host Container
  const host = document.createElement('div');
  host.id = 'stitchmatrix-extension-root';
  document.documentElement.appendChild(host);

  // Attach Shadow DOM for complete CSS encapsulation
  const shadow = host.attachShadow({ mode: 'open' });

  // Inject Clean Light Mode Scoped Styles into Shadow DOM
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    :host {
      all: initial;
      font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 13px;
      line-height: 1.5;
      color: #0F172A;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* Floating Edge Tab Trigger (Clean Minimal Pill) */
    .sm-floating-trigger {
      position: fixed;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 38px;
      height: 90px;
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      border-right: none;
      border-radius: 12px 0 0 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      z-index: 2147483646;
      box-shadow: -4px 4px 16px rgba(15, 23, 42, 0.12);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .sm-floating-trigger:hover {
      background: #F8FAFC;
      width: 44px;
      border-color: #4F46E5;
    }

    .sm-floating-trigger svg {
      width: 18px;
      height: 18px;
      fill: none;
      stroke: #4F46E5;
      stroke-width: 2;
    }

    .sm-floating-trigger .trigger-pill {
      font-size: 9px;
      font-weight: 700;
      color: #4F46E5;
      writing-mode: vertical-rl;
      letter-spacing: 0.05em;
    }

    /* Main Sidebar Drawer (Clean Crisp Light Theme) */
    .sm-sidebar-container {
      position: fixed;
      top: 0;
      right: 0;
      width: 410px;
      height: 100vh;
      background: #F8FAFC !important;
      border-left: 1px solid #E2E8F0;
      color: #0F172A;
      z-index: 2147483647;
      transform: translateX(410px);
      transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      box-shadow: -10px 0 30px rgba(15, 23, 42, 0.1);
      overflow: hidden;
      user-select: text;
    }

    .sm-sidebar-container.open {
      transform: translateX(0);
    }

    /* 1. Header (Clean White Bar) */
    .sm-header {
      padding: 12px 18px;
      background: #FFFFFF;
      border-bottom: 1px solid #E2E8F0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .sm-header-brand {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .sm-logo-icon {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: #EEF2FF;
      border: 1px solid #C7D2FE;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #4F46E5;
      font-weight: 750;
      font-size: 14px;
    }

    .sm-header-title {
      font-size: 14px;
      font-weight: 700;
      color: #0F172A;
      letter-spacing: -0.015em;
      line-height: 1.2;
    }

    .sm-header-subtitle {
      font-size: 11px;
      color: #64748B;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .sm-platform-tag {
      background: #F1F5F9;
      color: #334155;
      padding: 1px 6px;
      border-radius: 4px;
      font-weight: 600;
      font-size: 10.5px;
    }

    .sm-close-btn {
      background: #F1F5F9;
      border: 1px solid #E2E8F0;
      color: #64748B;
      cursor: pointer;
      width: 28px;
      height: 28px;
      border-radius: 7px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }

    .sm-close-btn:hover {
      background: #E2E8F0;
      color: #0F172A;
    }

    /* 2. Quick Value Summary Banner */
    .sm-summary-banner {
      background: #FFFFFF;
      padding: 10px 18px;
      border-bottom: 1px solid #E2E8F0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 11.5px;
    }

    .sm-summary-item {
      display: flex;
      align-items: center;
      gap: 5px;
      color: #64748B;
    }

    .sm-summary-item strong {
      color: #0F172A;
      font-weight: 650;
    }

    .sm-score-pill {
      background: #ECFDF5;
      color: #059669;
      border: 1px solid #A7F3D0;
      padding: 2px 7px;
      border-radius: 9999px;
      font-weight: 700;
      font-size: 11px;
    }

    /* 3. Scrollable Studio Canvas */
    .sm-content-area {
      flex: 1;
      overflow-y: auto;
      padding: 14px 18px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .sm-content-area::-webkit-scrollbar {
      width: 5px;
    }

    .sm-content-area::-webkit-scrollbar-thumb {
      background: #CBD5E1;
      border-radius: 9999px;
    }

    /* Step Selector Cards */
    .sm-control-box {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 10px;
      padding: 12px 14px;
      box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .sm-step-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .sm-step-label {
      font-size: 12px;
      font-weight: 700;
      color: #0F172A;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .sm-step-number {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #4F46E5;
      color: #FFFFFF;
      font-size: 10.5px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
    }

    .sm-step-hint {
      font-size: 11px;
      color: #64748B;
    }

    /* Niche Select Input */
    .sm-niche-select {
      width: 100%;
      background: #F8FAFC;
      border: 1px solid #CBD5E1;
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 12.5px;
      font-weight: 550;
      color: #0F172A;
      outline: none;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .sm-niche-select:hover {
      border-color: #94A3B8;
    }

    .sm-niche-select:focus {
      border-color: #4F46E5;
      box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.12);
    }

    /* Script Style Pills */
    .sm-style-cards {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .sm-style-btn {
      background: #F8FAFC;
      border: 1.5px solid #E2E8F0;
      border-radius: 8px;
      padding: 8px 12px;
      text-align: left;
      cursor: pointer;
      transition: all 0.15s ease;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .sm-style-btn:hover {
      background: #F1F5F9;
      border-color: #CBD5E1;
    }

    .sm-style-btn.active {
      background: #EEF2FF;
      border-color: #4F46E5;
      box-shadow: 0 1px 4px rgba(79, 70, 229, 0.12);
    }

    .sm-style-left {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .sm-style-name {
      font-size: 12px;
      font-weight: 700;
      color: #0F172A;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .sm-style-desc {
      font-size: 11px;
      color: #64748B;
    }

    .sm-style-badge {
      font-size: 10px;
      font-weight: 600;
      padding: 2px 7px;
      border-radius: 9999px;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      color: #334155;
    }

    .sm-style-btn.active .sm-style-badge {
      background: #4F46E5;
      color: #FFFFFF;
      border-color: #4F46E5;
    }

    /* Script Frames (Hook, Body, CTA) */
    .sm-frames-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .sm-frame-card {
      background: #FFFFFF;
      border: 1.5px solid #E2E8F0;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }

    .sm-frame-card:hover {
      border-color: #CBD5E1;
    }

    .sm-frame-card:focus-within {
      border-color: #4F46E5;
      box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.12);
    }

    .sm-frame-header {
      padding: 8px 12px;
      background: #F8FAFC;
      border-bottom: 1px solid #E2E8F0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .sm-frame-title {
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: -0.01em;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .sm-part-badge {
      font-size: 9.5px;
      font-weight: 700;
      padding: 1px 6px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .sm-badge-hook { background: #DBEAFE; color: #1D4ED8; }
    .sm-badge-body { background: #E0E7FF; color: #4338CA; }
    .sm-badge-cta { background: #D1FAE5; color: #047857; }

    .sm-frame-actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .sm-frame-time {
      font-size: 10.5px;
      color: #64748B;
      font-weight: 550;
    }

    .sm-copy-part-btn {
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      color: #475569;
      cursor: pointer;
      padding: 3px 7px;
      border-radius: 5px;
      font-size: 10.5px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 3px;
      transition: all 0.15s ease;
    }

    .sm-copy-part-btn:hover {
      background: #F1F5F9;
      color: #0F172A;
      border-color: #94A3B8;
    }

    .sm-frame-editor {
      padding: 12px 14px;
      font-size: 13px;
      line-height: 1.55;
      color: #0F172A;
      outline: none;
      cursor: text;
      white-space: pre-wrap;
      word-break: break-word;
      min-height: 52px;
      transition: background 0.2s ease;
    }

    .sm-frame-editor.teleprompter-active {
      background: #FEF9C3;
    }

    /* 4. Creator Bonus Tools (Teleprompter & Viral Hashtags - Fills Empty Space) */
    .sm-tools-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 10px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
    }

    .sm-tool-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 11.5px;
      font-weight: 700;
      color: #0F172A;
    }

    .sm-teleprompter-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 8px 12px;
    }

    .sm-pace-info {
      font-size: 11px;
      color: #475569;
      display: flex;
      flex-direction: column;
    }

    .sm-pace-info strong {
      color: #0F172A;
      font-size: 11.5px;
    }

    .sm-practice-btn {
      background: #4F46E5;
      color: #FFFFFF;
      border: none;
      border-radius: 6px;
      padding: 6px 12px;
      font-size: 11.5px;
      font-weight: 650;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: all 0.15s ease;
    }

    .sm-practice-btn:hover {
      background: #4338CA;
    }

    .sm-practice-btn.stop {
      background: #DC2626;
    }

    /* Hashtags Box */
    .sm-hashtag-box {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .sm-hashtag-text {
      font-size: 11px;
      color: #4F46E5;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .sm-copy-tags-btn {
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      color: #334155;
      border-radius: 5px;
      padding: 4px 8px;
      font-size: 10.5px;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease;
    }

    .sm-copy-tags-btn:hover {
      background: #F1F5F9;
      color: #0F172A;
    }

    /* 5. Sticky Action Footer */
    .sm-footer {
      padding: 14px 18px;
      background: #FFFFFF;
      border-top: 1px solid #E2E8F0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .sm-btn-primary {
      width: 100%;
      background: #0F172A;
      color: #FFFFFF;
      border: none;
      border-radius: 8px;
      padding: 11px 16px;
      font-size: 13px;
      font-weight: 650;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.15s ease;
      box-shadow: 0 2px 4px rgba(15, 23, 42, 0.15);
    }

    .sm-btn-primary:hover {
      background: #1E293B;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(15, 23, 42, 0.2);
    }

    .sm-btn-primary:active {
      transform: translateY(0);
    }

    .sm-btn-primary.copied {
      background: #059669 !important;
    }

    .sm-footer-secondary {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .sm-btn-secondary {
      background: #F8FAFC;
      border: 1px solid #CBD5E1;
      color: #334155;
      border-radius: 7px;
      padding: 8px 12px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    .sm-btn-secondary:hover {
      background: #F1F5F9;
      color: #0F172A;
      border-color: #94A3B8;
    }

    /* Feedback Toast */
    .sm-toast {
      position: absolute;
      bottom: 84px;
      left: 50%;
      transform: translateX(-50%) translateY(10px);
      background: #0F172A;
      color: #FFFFFF;
      padding: 8px 16px;
      border-radius: 9999px;
      font-size: 11.5px;
      font-weight: 600;
      box-shadow: 0 10px 25px rgba(15, 23, 42, 0.25);
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

  // Floating Edge Tab
  const triggerTab = document.createElement('div');
  triggerTab.className = 'sm-floating-trigger';
  triggerTab.title = 'Open StitchMatrix Script Studio (Alt+S)';
  triggerTab.innerHTML = `
    <svg viewBox="0 0 24 24">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
    </svg>
    <span class="trigger-pill">SCRIPTS</span>
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
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${msg}</span>
    `;
    toastEl.classList.add('show');
    setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2200);
  }

  // Calculate live word count and speaking duration
  function getCanvasStats() {
    const hook = sidebar.querySelector('#smHookText')?.textContent || '';
    const body = sidebar.querySelector('#smBodyText')?.textContent || '';
    const cta = sidebar.querySelector('#smCtaText')?.textContent || '';
    const words = (hook + ' ' + body + ' ' + cta).trim().split(/\s+/).filter(Boolean).length;
    const estSec = Math.max(15, Math.round(words / 2.4)); // ~145 words per minute
    return { words, estSec };
  }

  function renderSidebar() {
    const nicheObj = SCRIPT_DATA[activeNiche] || SCRIPT_DATA.career;
    const curStyle = nicheObj.styles[activeStyleIndex] || nicheObj.styles[0];
    const context = detectVideoContext();

    sidebar.innerHTML = `
      <!-- 1. Header (Clean White Bar) -->
      <header class="sm-header">
        <div class="sm-header-brand">
          <div class="sm-logo-icon">S</div>
          <div>
            <div class="sm-header-title">StitchMatrix Script Studio</div>
            <div class="sm-header-subtitle">
              <span>Remixing:</span>
              <span class="sm-platform-tag">${context.platform}</span>
            </div>
          </div>
        </div>
        <button class="sm-close-btn" id="smCloseBtn" title="Close Studio (Esc)">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </header>

      <!-- 2. Value Summary Banner -->
      <div class="sm-summary-banner">
        <div class="sm-summary-item">
          <span>Viral Potential:</span>
          <span class="sm-score-pill">${curStyle.viralScore}</span>
        </div>
        <div class="sm-summary-item">
          <span>Est. Duration:</span>
          <strong>~${curStyle.duration}</strong>
        </div>
        <div class="sm-summary-item">
          <span>Trend Velocity:</span>
          <strong style="color: #059669;">${curStyle.trendingFactor}</strong>
        </div>
      </div>

      <!-- 3. Scrollable Studio Content -->
      <div class="sm-content-area">

        <!-- Step 1: Target Audience Selection -->
        <div class="sm-control-box">
          <div class="sm-step-header">
            <div class="sm-step-label">
              <span class="sm-step-number">1</span>
              <span>Your Channel Niche</span>
            </div>
            <span class="sm-step-hint">Adapts the hook to your audience</span>
          </div>
          <select class="sm-niche-select" id="smNicheSelect">
            <option value="career" ${activeNiche === 'career' ? 'selected' : ''}>💼 Tech & Career Growth</option>
            <option value="business" ${activeNiche === 'business' ? 'selected' : ''}>🚀 Business & AI Founders</option>
            <option value="finance" ${activeNiche === 'finance' ? 'selected' : ''}>💰 Finance & Wealth Tips</option>
          </select>
        </div>

        <!-- Step 2: Choose Script Style / Angle -->
        <div class="sm-control-box">
          <div class="sm-step-header">
            <div class="sm-step-label">
              <span class="sm-step-number">2</span>
              <span>Choose Script Style</span>
            </div>
            <span class="sm-step-hint">Click a style to switch angle</span>
          </div>
          <div class="sm-style-cards">
            ${nicheObj.styles.map((s, idx) => `
              <button class="sm-style-btn ${idx === activeStyleIndex ? 'active' : ''}" data-idx="${idx}">
                <div class="sm-style-left">
                  <div class="sm-style-name">
                    <span>${s.title}</span>
                    <span style="font-size: 11px; opacity: 0.7; font-weight: 500;">(~${s.duration})</span>
                  </div>
                  <div class="sm-style-desc">${s.description}</div>
                </div>
                <span class="sm-style-badge">${s.badge}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Step 3: Script Frames (Hook, Body, CTA) -->
        <div class="sm-frames-container">

          <!-- Part 1: The Hook -->
          <div class="sm-frame-card" id="smHookCard">
            <div class="sm-frame-header">
              <div class="sm-frame-title">
                <span class="sm-part-badge sm-badge-hook">Part 1</span>
                <span>The Hook (Grab Attention)</span>
              </div>
              <div class="sm-frame-actions">
                <span class="sm-frame-time">0–3 sec</span>
                <button class="sm-copy-part-btn" id="smCopyHookBtn" title="Copy hook only">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  <span>Copy</span>
                </button>
              </div>
            </div>
            <div class="sm-frame-editor" id="smHookText" contenteditable="true" spellcheck="false">${curStyle.hook}</div>
          </div>

          <!-- Part 2: The Core Body -->
          <div class="sm-frame-card" id="smBodyCard">
            <div class="sm-frame-header">
              <div class="sm-frame-title">
                <span class="sm-part-badge sm-badge-body">Part 2</span>
                <span>The Body (Deliver Core Value)</span>
              </div>
              <div class="sm-frame-actions">
                <span class="sm-frame-time">4–25 sec</span>
                <button class="sm-copy-part-btn" id="smCopyBodyBtn" title="Copy body only">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  <span>Copy</span>
                </button>
              </div>
            </div>
            <div class="sm-frame-editor" id="smBodyText" contenteditable="true" spellcheck="false">${curStyle.body}</div>
          </div>

          <!-- Part 3: Call to Action -->
          <div class="sm-frame-card" id="smCtaCard">
            <div class="sm-frame-header">
              <div class="sm-frame-title">
                <span class="sm-part-badge sm-badge-cta">Part 3</span>
                <span>Call-to-Action (Drive Comments/Saves)</span>
              </div>
              <div class="sm-frame-actions">
                <span class="sm-frame-time">26–35 sec</span>
                <button class="sm-copy-part-btn" id="smCopyCtaBtn" title="Copy CTA only">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  <span>Copy</span>
                </button>
              </div>
            </div>
            <div class="sm-frame-editor" id="smCtaText" contenteditable="true" spellcheck="false">${curStyle.cta}</div>
          </div>

        </div>

        <!-- 4. Creator Bonus Tools (Fills Empty Space Ergonomically) -->
        <div class="sm-tools-card">
          <div class="sm-tool-header">
            <span>🎙️ Creator Teleprompter & Pacing</span>
            <span id="smWordStats" style="font-weight: 500; font-size: 11px; color: #64748B;">~70 words · ~30s</span>
          </div>
          <div class="sm-teleprompter-row">
            <div class="sm-pace-info">
              <strong>145 words/min</strong>
              <span>Optimal pacing for Short-form algorithms</span>
            </div>
            <button class="sm-practice-btn" id="smTeleprompterBtn">
              <span>▶ Practice Read</span>
            </button>
          </div>

          <!-- Viral Hashtags Box -->
          <div class="sm-tool-header" style="margin-top: 4px;">
            <span>🏷️ Recommended Viral Hashtags</span>
          </div>
          <div class="sm-hashtag-box">
            <span class="sm-hashtag-text" id="smHashtagDisplay">${nicheObj.hashtags}</span>
            <button class="sm-copy-tags-btn" id="smCopyHashtagsBtn">Copy Tags</button>
          </div>
        </div>

      </div>

      <!-- 5. Sticky Action Footer -->
      <footer class="sm-footer">
        <!-- Big Primary 1-Click Copy -->
        <button class="sm-btn-primary" id="smCopyFullBtn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span id="smCopyFullText">Copy Full Script (Alt+C)</span>
        </button>

        <!-- Secondary Actions -->
        <div class="sm-footer-secondary">
          <button class="sm-btn-secondary" id="smTryAnotherBtn" title="Cycle to next hook angle">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
            <span>Try Another Style</span>
          </button>

          <button class="sm-btn-secondary" id="smExportBtn" title="Download script as .txt">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span id="smExportText">Export (.txt)</span>
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

    // Niche Select Dropdown
    const nicheSelect = sidebar.querySelector('#smNicheSelect');
    if (nicheSelect) {
      nicheSelect.onchange = (e) => {
        activeNiche = e.target.value;
        activeStyleIndex = 0;
        renderSidebar();
        showToast(`Audience set to: ${nicheSelect.options[nicheSelect.selectedIndex].text}`);
      };
    }

    // Style Pills Selection
    sidebar.querySelectorAll('.sm-style-btn').forEach(btn => {
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
          showToast('Call-to-Action copied to clipboard!');
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
        const hook = sidebar.querySelector('#smHookText')?.textContent || curStyle.hook;
        const body = sidebar.querySelector('#smBodyText')?.textContent || curStyle.body;
        const cta = sidebar.querySelector('#smCtaText')?.textContent || curStyle.cta;
        const content = `STITCHMATRIX SCRIPT EXPORT\n=========================\nNiche: ${nicheObj.nicheLabel}\nStyle: ${curStyle.title} (~${curStyle.duration})\n\n[PART 1: THE HOOK]\n${hook}\n\n[PART 2: THE BODY]\n${body}\n\n[PART 3: CALL-TO-ACTION]\n${cta}\n\nHASHTAGS:\n${nicheObj.hashtags}\n`;

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

    // Sequence through Hook -> Body -> CTA
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
        showToast('Practice read complete! Great pace.');
      }
    }, 4500); // 4.5s pacing per section preview
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

  console.log('[StitchMatrix] Clean Light Creator Studio v3.1 loaded.');
})();
