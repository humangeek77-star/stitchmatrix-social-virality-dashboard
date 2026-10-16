/**
 * StitchMatrix — Streamlined Viral Script Engine v4.0.0
 * Chrome Extension Manifest V3 In-DOM Sidebar
 * 
 * Features:
 * - Instant Video & Live View Count Detection (TikTok, YouTube Shorts, YouTube, Instagram Reels)
 * - Real-Time Video Context Analysis in Seconds
 * - One Master Viral Output (Hook + Story + CTA + Hashtags in 1 cohesive, ready-to-post script)
 * - 1-Click Master Script Copy (Alt+C) & Instant Angle Remixing
 * - Blendr Cyber-Cobalt & Deep Obsidian Void Microchip UI
 */
(function () {
  'use strict';

  if (window.__stitchmatrix_injected) return;
  window.__stitchmatrix_injected = true;

  // --- Helper Functions ---
  function formatCompactNumber(num) {
    if (!num) return 'Trending';
    const n = parseInt(String(num).replace(/[^\d]/g, ''), 10);
    if (isNaN(n) || n === 0) return 'Trending';
    if (n >= 1_000_000_000) {
      return (n / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    }
    if (n >= 1_000_000) {
      return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (n >= 1_000) {
      return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return n.toLocaleString();
  }

  function cleanViewCountString(str) {
    if (!str || typeof str !== 'string') return '';
    let clean = str.trim();
    clean = clean.replace(/^(views?|likes?|plays?|watching)\s*:?\s*/i, '');
    clean = clean.replace(/\s*(views?|likes?|plays?|watching|viewers).*$/i, '').trim();
    const match = clean.match(/([\d,.]+\s*[KMkmBb]?)/);
    if (match) {
      let val = match[1].replace(/\s+/g, '').toUpperCase();
      val = val.replace(/[,.]$/, '');
      if (val.length > 0 && /\d/.test(val)) {
        return val;
      }
    }
    return clean.slice(0, 15);
  }

  function cleanAuthorHandle(raw) {
    if (!raw) return '@creator';
    let clean = raw.replace(/\s+/g, ' ').trim();
    // Fix repeated names from YouTube Polymer tooltips e.g. "MrLOCKIDY MrLOCKIDY" -> "MrLOCKIDY"
    const words = clean.split(' ');
    if (words.length === 2 && words[0].toLowerCase() === words[1].toLowerCase()) {
      clean = words[0];
    } else if (words.length >= 4 && words.length % 2 === 0) {
      const half = words.length / 2;
      const w1 = words.slice(0, half).join(' ');
      const w2 = words.slice(half).join(' ');
      if (w1.toLowerCase() === w2.toLowerCase()) {
        clean = w1;
      }
    }
    clean = clean.split('\n')[0].trim();
    if (!clean.startsWith('@') && !clean.includes(' ')) {
      clean = '@' + clean;
    }
    return clean || '@creator';
  }

  function parseViewCountToNumber(str) {
    if (!str || typeof str !== 'string') return 0;
    let clean = str.trim().toUpperCase();
    const unitMatch = clean.match(/([KMB])$/);
    const unit = unitMatch ? unitMatch[1] : null;
    if (unit) {
      clean = clean.slice(0, -1).trim();
    }
    if (clean.includes(',') && !clean.includes('.')) {
      if (/,\d{1,2}$/.test(clean)) {
        clean = clean.replace(',', '.');
      } else {
        clean = clean.replace(/,/g, '');
      }
    } else {
      clean = clean.replace(/,/g, '');
    }
    let num = parseFloat(clean);
    if (isNaN(num)) return 0;
    if (unit === 'B') num *= 1_000_000_000;
    else if (unit === 'M') num *= 1_000_000;
    else if (unit === 'K') num *= 1_000;
    return num;
  }

  function calculateRetentionMetrics(viewsStr) {
    const num = parseViewCountToNumber(viewsStr);

    if (num >= 5_000_000) {
      return {
        retentionBadge: '🔥 Top 0.1% Retention',
        retentionClass: 'sm-pill-highlight',
        baseScore: 98
      };
    } else if (num >= 1_000_000) {
      return {
        retentionBadge: '🔥 Top 1% Retention',
        retentionClass: 'sm-pill-highlight',
        baseScore: 96
      };
    } else if (num >= 250_000) {
      return {
        retentionBadge: '⚡ Top 5% Retention',
        retentionClass: 'sm-pill-orange',
        baseScore: 92
      };
    } else if (num >= 50_000) {
      return {
        retentionBadge: '📈 Top 10% Retention',
        retentionClass: 'sm-pill-cyan',
        baseScore: 86
      };
    } else if (num >= 10_000) {
      return {
        retentionBadge: '⭐ Top 25% Retention',
        retentionClass: 'sm-pill-slate',
        baseScore: 78
      };
    } else if (num > 0) {
      return {
        retentionBadge: '🌱 Rising Traction',
        retentionClass: 'sm-pill-slate',
        baseScore: 71
      };
    } else {
      return {
        retentionBadge: '⚡ Top 5% Velocity',
        retentionClass: 'sm-pill-orange',
        baseScore: 91
      };
    }
  }

  function extractLiveViewCount(platform, url, container) {
    // 1. YouTube & YouTube Shorts
    if (url.includes('youtube.com')) {
      const isShorts = url.includes('/shorts');
      if (isShorts) {
        const reels = Array.from(document.querySelectorAll('ytd-reel-video-renderer'));
        const activeReel = reels.find(r => r.hasAttribute('is-active')) ||
                           reels.find(r => {
                             const rect = r.getBoundingClientRect();
                             return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
                           }) || reels[0];
        if (activeReel) {
          const factoid = activeReel.querySelector('#factoid-views, [id*="factoid-views"], .ytReelMetamodelViewModelHostFactoid');
          if (factoid) {
            const m = (factoid.innerText || factoid.textContent || '').match(/([\d,.]+\s*[KMkmBb]?)/);
            if (m && /\d/.test(m[1])) return cleanViewCountString(m[1]);
          }
          const likeBtn = activeReel.querySelector('#like-button #text, ytd-like-button-renderer yt-formatted-string, [aria-label*="like"]');
          if (likeBtn) {
            const text = likeBtn.innerText || likeBtn.textContent || likeBtn.getAttribute('aria-label') || '';
            const m = text.match(/([\d,.]+\s*[KMkmBb]?)/);
            if (m && /\d/.test(m[1])) return cleanViewCountString(m[1]);
          }
          const overlay = activeReel.querySelector('ytd-reel-player-overlay-renderer, #overlay');
          if (overlay) {
            const text = overlay.innerText || overlay.textContent || '';
            const m = text.match(/([\d,.]+\s*[KMkmBb]?)\s*(?:views|likes)/i);
            if (m && /\d/.test(m[1])) return cleanViewCountString(m[1]);
          }
        }
      }

      // Standard YouTube Watch Page view selectors
      const watchSelectors = [
        '#info-container',
        'ytd-watch-metadata #info-container',
        'ytd-watch-metadata yt-formatted-string#info',
        '#view-count',
        'ytd-video-view-count-renderer',
        'span.view-count',
        '#description-inner #info-container',
        '#description-inner',
        '#info-text',
        '#count.ytd-video-primary-info-renderer'
      ];
      for (const sel of watchSelectors) {
        const el = document.querySelector(sel);
        if (el) {
          const text = el.innerText || el.textContent || '';
          const m = text.match(/([\d,.]+\s*[KMkmBb]?)\s*(?:views|view)/i);
          if (m && m[1] && /\d/.test(m[1])) {
            return cleanViewCountString(m[1]);
          }
        }
      }

      const meta = document.querySelector('meta[itemprop="interactionCount"]');
      if (meta && meta.content && /\d/.test(meta.content)) {
        return formatCompactNumber(meta.content);
      }

      const ariaEls = document.querySelectorAll('[aria-label*="view"], [aria-label*="views"]');
      for (const el of ariaEls) {
        const label = el.getAttribute('aria-label') || '';
        const m = label.match(/([\d,.]+\s*[KMkmBb]?)\s*(?:views|view)/i);
        if (m && m[1] && /\d/.test(m[1])) {
          return cleanViewCountString(m[1]);
        }
      }
    }

    // 2. TikTok
    else if (url.includes('tiktok.com')) {
      const ttSelectors = [
        '[data-e2e="video-views"]',
        'strong[data-e2e="video-views"]',
        '[data-e2e="browse-like-count"]',
        'strong[data-e2e="like-count"]',
        '[data-e2e="like-count"]',
        'div[class*="DivPlayCount"]',
        'span[class*="PlayCount"]',
        '[class*="play-count"]',
        '[class*="video-count"]'
      ];
      if (container) {
        for (const s of ttSelectors) {
          const el = container.querySelector(s);
          if (el) {
            const m = (el.innerText || el.textContent || '').match(/([\d,.]+\s*[KMkmBb]?)/);
            if (m && /\d/.test(m[1])) return cleanViewCountString(m[1]);
          }
        }
        const m = (container.innerText || '').match(/([\d,.]+\s*[KMkmBb]?)\s*(?:views|likes|plays)/i);
        if (m && /\d/.test(m[1])) return cleanViewCountString(m[1]);
      }
      for (const s of ttSelectors) {
        const el = document.querySelector(s);
        if (el) {
          const m = (el.innerText || el.textContent || '').match(/([\d,.]+\s*[KMkmBb]?)/);
          if (m && /\d/.test(m[1])) return cleanViewCountString(m[1]);
        }
      }
    }

    // 3. Instagram Reels
    else if (url.includes('instagram.com')) {
      const igSelectors = [
        'a[href*="/liked_by/"] span',
        'section span[class*="x193iq5w"]',
        'div[class*="x1lliihq"] span',
        'span._aacl._aaco._aacw',
        'span[class*="x1fh70ws"]',
        '[aria-label*="likes"]',
        '[aria-label*="views"]'
      ];
      if (container) {
        for (const s of igSelectors) {
          const el = container.querySelector(s);
          if (el) {
            const m = (el.innerText || el.textContent || el.getAttribute('aria-label') || '').match(/([\d,.]+\s*[KMkmBb]?)/);
            if (m && /\d/.test(m[1])) return cleanViewCountString(m[1]);
          }
        }
      }
      for (const s of igSelectors) {
        const el = document.querySelector(s);
        if (el) {
          const m = (el.innerText || el.textContent || el.getAttribute('aria-label') || '').match(/([\d,.]+\s*[KMkmBb]?)/);
          if (m && /\d/.test(m[1])) return cleanViewCountString(m[1]);
        }
      }
    }

    return null;
  }

  function extractSubject(rawTitle) {
    if (!rawTitle || rawTitle === 'Active Viral Video') return 'this viral moment';
    let clean = rawTitle
      .replace(/#[\p{L}\p{N}_]+/gu, '')
      .replace(/\|.*$/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/\(.*?\)/g, '')
      .replace(/[-–—].*$/g, '')
      .replace(/\b(official trailer|episode \d+|reimagined|shorts|viral|4k|hd|part \d+)\b/gi, '')
      .replace(/[^\p{L}\p{N}\s'&.,!?-]/gu, '')
      .trim();
    if (clean.length < 3) clean = rawTitle.replace(/#[\p{L}\p{N}_]+/gu, '').slice(0, 40).trim();
    if (clean.length < 2) clean = 'this viral moment';
    return clean;
  }

  function generateDynamicHashtags(rawTitle) {
    const words = rawTitle
      .replace(/#[\p{L}\p{N}_]+/gu, '')
      .replace(/[^\p{L}\p{N}\s]/gu, '')
      .split(/\s+/)
      .filter(w => w.length > 3 && !['this', 'that', 'with', 'from', 'have', 'were', 'what', 'epic', 'part', 'episode', 'full', 'scene'].includes(w.toLowerCase()));
    
    const tags = words.slice(0, 3).map(w => '#' + w.charAt(0).toUpperCase() + w.slice(1));
    tags.push('#ViralShorts', '#Trending');
    return tags.join(' ');
  }

  function detectVideoContext() {
    let url = window.location.href;
    let platform = 'Social Video';
    let title = '';
    let author = '';
    let views = '';
    let videoId = '';

    try {
      if (url.includes('tiktok.com')) {
        platform = 'TikTok';
        const videos = Array.from(document.querySelectorAll('video'));
        const activeVideo = videos.find(v => !v.paused && v.currentTime > 0) ||
                            videos.find(v => {
                              const r = v.getBoundingClientRect();
                              return r.top >= 0 && r.bottom <= window.innerHeight && r.height > 60;
                            }) || videos[0];

        let container = null;
        if (activeVideo) {
          container = activeVideo.closest('[data-e2e="recommend-list-item-container"]')
            || activeVideo.closest('div[class*="DivItemContainer"]')
            || activeVideo.closest('div[class*="DivVideoFeedList"] > div')
            || activeVideo.closest('div[class*="DivBrowserModeContainer"]')
            || activeVideo.closest('[data-e2e="user-post-item"]')
            || activeVideo.closest('article')
            || activeVideo.parentElement?.parentElement?.parentElement;

          if (container) {
            const descEl = container.querySelector(
              '[data-e2e="video-desc"], [data-e2e="browse-video-desc"], [class*="DivDescription"], [class*="SpanText"], [class*="desc"], h1, h2'
            );
            if (descEl?.textContent?.trim()) title = descEl.textContent.trim();

            const authorLink = container.querySelector('a[href*="/@"]');
            if (authorLink) {
              const href = authorLink.getAttribute('href') || '';
              const m = href.match(/@([a-zA-Z0-9_.-]+)/);
              if (m && m[1]) author = '@' + m[1];
            }
            if (!author) {
              const aEl = container.querySelector('[data-e2e="browse-username"], [data-e2e="video-author-uniqueid"], [data-e2e="user-title"], h3');
              if (aEl?.textContent?.trim()) author = aEl.textContent.trim();
            }

            const linkEl = container.querySelector('a[href*="/video/"]');
            if (linkEl?.href) {
              url = linkEl.href;
              const m = url.match(/\/video\/(\d+)/);
              if (m) videoId = m[1];
            }
          }
        }

        if (!title) {
          const descEl = document.querySelector('[data-e2e="browse-video-desc"], [data-e2e="video-desc"], h1');
          if (descEl?.textContent?.trim()) title = descEl.textContent.trim();
        }
        if (!author) {
          const aEl = document.querySelector('[data-e2e="browse-username"], [data-e2e="video-author-uniqueid"], .author-uniqueId');
          if (aEl?.textContent?.trim()) author = aEl.textContent.trim();
        }

        views = extractLiveViewCount('TikTok', url, container);

        if (!videoId) {
          const m = url.match(/\/video\/(\d+)/);
          if (m) videoId = m[1];
        }

        if (!title && document.title && document.title.includes('TikTok')) {
          const quoteMatch = document.title.match(/["“](.*?)["”]/);
          if (quoteMatch && quoteMatch[1].length > 2) {
            title = quoteMatch[1];
          } else {
            title = document.title.replace(/\s*\|\s*TikTok.*/i, '').replace(/.*on TikTok:\s*/i, '').trim();
          }
        }
      }

      else if (url.includes('instagram.com')) {
        platform = 'Instagram Reels';
        const videos = Array.from(document.querySelectorAll('video'));
        const activeVideo = videos.find(v => !v.paused && v.currentTime > 0) ||
                            videos.find(v => {
                              const r = v.getBoundingClientRect();
                              return r.top >= 0 && r.bottom <= window.innerHeight && r.height > 80;
                            }) || videos[0];

        let container = null;
        if (activeVideo) {
          container = activeVideo.closest('article')
            || activeVideo.closest('div[role="presentation"]')
            || activeVideo.closest('div[class*="x1qjc9v5"]')
            || activeVideo.closest('section')
            || activeVideo.parentElement?.parentElement?.parentElement;

          if (container) {
            const captionEl = container.querySelector('h1, span._aacl, div._a9zs, span._aaco, span[class*="x193iq5w"]');
            const authorEl = container.querySelector('header a, span._ap3a, a[role="link"][href^="/"]');
            const linkEl = container.querySelector('a[href*="/reel/"], a[href*="/reels/"], a[href*="/p/"]');

            if (captionEl?.textContent?.trim()) title = captionEl.textContent.trim();
            if (authorEl?.textContent?.trim()) author = authorEl.textContent.trim();
            if (linkEl?.href) {
              url = linkEl.href;
              const m = url.match(/\/(reels?|p)\/([a-zA-Z0-9_-]+)/);
              if (m) videoId = m[2];
            }
          }
        }

        if (!title) {
          const captionEl = document.querySelector('article h1, article span._aacl, h1');
          if (captionEl?.textContent?.trim()) title = captionEl.textContent.trim();
        }
        if (!author) {
          const authorEl = document.querySelector('header a, span._ap3a, article header a');
          if (authorEl?.textContent?.trim()) author = authorEl.textContent.trim();
        }

        views = extractLiveViewCount('Instagram Reels', url, container);

        if (!videoId) {
          const m = url.match(/\/(reels?|p)\/([a-zA-Z0-9_-]+)/);
          if (m) videoId = m[2];
        }

        if (!title && document.title && document.title.includes('Instagram')) {
          const quoteMatch = document.title.match(/["“](.*?)["”]/);
          if (quoteMatch && quoteMatch[1].length > 2) {
            title = quoteMatch[1];
          } else {
            title = document.title.replace(/\s*•\s*Instagram photos and videos.*/i, '').replace(/.*on Instagram:\s*/i, '').trim();
          }
        }
      }

      else if (url.includes('youtube.com')) {
        const isShorts = url.includes('/shorts');
        platform = isShorts ? 'YouTube Shorts' : 'YouTube';

        if (isShorts) {
          const reels = Array.from(document.querySelectorAll('ytd-reel-video-renderer'));
          const urlMatch = url.match(/\/shorts\/([a-zA-Z0-9_-]+)/);
          const currentVideoId = urlMatch ? urlMatch[1] : null;

          let activeReel = null;
          if (currentVideoId && reels.length > 0) {
            activeReel = reels.find(r => r.querySelector(`a[href*="${currentVideoId}"]`) || r.getAttribute('video-id') === currentVideoId || r.id === currentVideoId);
          }
          if (!activeReel && reels.length > 0) {
            activeReel = reels.find(r => {
              const rect = r.getBoundingClientRect();
              return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
            }) || reels.find(r => r.hasAttribute('is-active')) || reels[0];
          }

          if (activeReel) {
            const tEl = activeReel.querySelector('#overlay #title, .ytReelMetamodelViewModelHostTitle, #title.ytd-reel-player-header-renderer, h2.title, yt-formatted-string.title, h2');
            const aEl = activeReel.querySelector('#channel-name, .ytd-channel-name, #text.ytd-channel-name, .ytReelMetamodelViewModelHostHeaderChannelName');
            if (tEl?.textContent?.trim()) title = tEl.textContent.trim();
            if (aEl?.textContent?.trim()) author = aEl.textContent.trim();
          }

          if (currentVideoId) videoId = currentVideoId;
        }

        // Title parsing from document.title
        if (document.title && document.title.includes(' - YouTube')) {
          const docTitleClean = document.title.replace(/\s*-\s*YouTube.*$/i, '').trim();
          if (docTitleClean && docTitleClean.length > 2) {
            title = docTitleClean;
          }
        }

        if (!title) {
          const headerTitle = document.querySelector('ytd-shorts-player-header-renderer #text, h1.title, ytd-watch-metadata #title h1, h1.ytd-video-primary-info-renderer');
          if (headerTitle?.textContent?.trim()) title = headerTitle.textContent.trim();
        }

        if (!author) {
          const genericAuthor = document.querySelector('ytd-channel-name yt-formatted-string#text, #channel-name #text, .ytd-channel-name, ytd-channel-name a');
          if (genericAuthor?.textContent?.trim()) author = genericAuthor.textContent.trim();
        }

        views = extractLiveViewCount(platform, url, null);

        if (!videoId) {
          const m = url.match(/\/shorts\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
          if (m) videoId = m[1];
        }
      }
    } catch (e) {
      console.log('[StitchMatrix] Context detection error:', e);
    }

    if (!title) title = 'Active Viral Video';
    author = cleanAuthorHandle(author);
    if (!views) views = 'Trending';

    let displayTitle = title;
    if (displayTitle.length > 68) displayTitle = displayTitle.slice(0, 65) + '...';

    return { platform, title, displayTitle, author, views, url, videoId };
  }

  function buildViralScripts(videoContext) {
    const subject = extractSubject(videoContext.title);
    const hashtags = generateDynamicHashtags(videoContext.title);
    const metrics = calculateRetentionMetrics(videoContext.views);

    return [
      {
        id: 'curiosity',
        title: 'Curiosity Gap',
        subtitle: 'High Intrigue & Scroll-Stopping Hook',
        duration: '30s',
        viralScore: `${metrics.baseScore}/100`,
        retentionBadge: metrics.retentionBadge,
        retentionClass: metrics.retentionClass,
        hookLead: `Nobody realized this secret about `,
        hookHighlight: `${subject}`,
        hookTail: ` until now. The real story behind what you're watching is blowing everyone's mind.`,
        body: `While 99% of people scrolled right past this, there's a crazy detail hidden in plain sight. If you look closely at how this was constructed, everything changes. The creators specifically engineered this exact moment to trigger the algorithm and keep you glued to your screen.`,
        cta: `Did you catch that detail on your first watch? Drop your theory in the comments and save this before it's taken down.`,
        hashtags: hashtags
      },
      {
        id: 'hot_take',
        title: 'Hot Take',
        subtitle: 'Controversial Angle for Maximum Comments',
        duration: '34s',
        viralScore: `${Math.max(60, metrics.baseScore - 2)}/100`,
        retentionBadge: metrics.retentionBadge,
        retentionClass: metrics.retentionClass,
        hookLead: `Everyone is talking about `,
        hookHighlight: `${subject}`,
        hookTail: `, but everyone is getting the entire story completely backwards. Here is the uncomfortable truth.`,
        body: `People think this succeeded by luck. But look at the pattern: the first 2 seconds drops you directly into peak tension without a single second wasted on introductions. That single psychological trick is why this is generating millions of views right now.`,
        cta: `Do you agree with this take or do you see it differently? Sound off in the comments below right now.`,
        hashtags: hashtags
      },
      {
        id: 'teardown',
        title: 'Teardown',
        subtitle: 'Breakdown of Why It Worked',
        duration: '32s',
        viralScore: `${Math.max(60, metrics.baseScore - 3)}/100`,
        retentionBadge: metrics.retentionBadge,
        retentionClass: metrics.retentionClass,
        hookLead: `This video about `,
        hookHighlight: `${subject}`,
        hookTail: ` is currently breaking the algorithm. Let's break down the exact formula in 30 seconds.`,
        body: `Notice how frame one gives you an immediate emotional punchline? Then they immediately stack 3 high-contrast visual cuts before the 8-second retention drop-off. If you're a creator trying to hit millions of views, steal this exact pacing.`,
        cta: `Bookmark this breakdown to copy for your next upload. Hit follow for daily algorithmic teardowns.`,
        hashtags: hashtags
      }
    ];
  }

  // --- Extension State ---
  let activeStyleIndex = 0;
  let isOpen = false;
  let currentContext = detectVideoContext();
  let generatedScripts = buildViralScripts(currentContext);

  // --- Create Shadow DOM Host ---
  const host = document.createElement('div');
  host.id = 'stitchmatrix-extension-root';
  document.documentElement.appendChild(host);

  const shadow = host.attachShadow({ mode: 'open' });

  // --- Inject Scoped Deep Navy & Electric Cyan Dark Mode Styles ---
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=swap');

    :host {
      all: initial;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 13.5px;
      line-height: 1.5;
      color: #94A3B8;
      letter-spacing: -0.015em;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* Floating Edge Tab Trigger (Deep Navy & Electric Cyan Pill) */
    .sm-floating-trigger {
      position: fixed;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 38px;
      height: 92px;
      background: #0D1117;
      border: 1px solid #30363D;
      border-right: none;
      border-radius: 12px 0 0 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      z-index: 2147483646;
      box-shadow: -4px 0 24px rgba(0, 229, 255, 0.15);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .sm-floating-trigger:hover {
      background: #161B22;
      width: 42px;
      border-color: #00E5FF;
      box-shadow: -6px 0 28px rgba(0, 229, 255, 0.35);
    }

    .sm-floating-trigger svg {
      width: 17px;
      height: 17px;
      fill: none;
      stroke: #00E5FF;
      stroke-width: 2;
    }

    .sm-floating-trigger .trigger-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #00E5FF;
      box-shadow: 0 0 10px #00E5FF;
    }

    /* Main Sidebar Drawer (Deep Navy Base Background #0D1117) */
    .sm-sidebar-container {
      position: fixed;
      top: 0;
      right: 0;
      width: 416px;
      max-width: 100vw;
      height: 100vh;
      background: #0D1117;
      border-left: 1px solid #30363D;
      box-shadow: -12px 0 45px rgba(13, 17, 23, 0.95), 0 0 40px rgba(0, 229, 255, 0.08);
      z-index: 2147483647;
      display: flex;
      flex-direction: column;
      transform: translateX(100%);
      transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: text;
    }

    .sm-sidebar-container.open {
      transform: translateX(0);
    }

    /* 1. Header (#161B22 with subtle 1px border #30363D) */
    .sm-header {
      padding: 14px 18px;
      background: #161B22;
      border-bottom: 1px solid #30363D;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-shrink: 0;
    }

    .sm-header-brand {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .sm-logo-icon {
      width: 28px;
      height: 28px;
      background: #0D1117;
      border: 1px solid #30363D;
      border-radius: 7px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #00E5FF;
      box-shadow: 0 0 12px rgba(0, 229, 255, 0.25);
    }

    .sm-logo-icon svg {
      stroke: #00E5FF;
    }

    .sm-brand-title {
      font-size: 15px;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: -0.02em;
      display: flex;
      align-items: center;
      gap: 2px;
    }

    .sm-brand-title span {
      color: #00E5FF;
    }

    .sm-header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .sm-live-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(0, 229, 255, 0.1);
      border: 1px solid rgba(0, 229, 255, 0.3);
      color: #00E5FF;
      font-size: 10.5px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 9999px;
      letter-spacing: 0.02em;
      font-family: 'JetBrains Mono', 'Roboto Mono', 'SF Mono', Consolas, monospace;
    }

    .sm-pulse-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #00E5FF;
      box-shadow: 0 0 8px #00E5FF;
      animation: smPulse 1.8s infinite;
    }

    @keyframes smPulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
    }

    .sm-close-btn {
      width: 28px;
      height: 28px;
      border-radius: 7px;
      background: #0D1117;
      border: 1px solid #30363D;
      color: #94A3B8;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 13px;
      transition: all 0.15s ease;
    }

    .sm-close-btn:hover {
      background: #161B22;
      color: #FFFFFF;
      border-color: #00E5FF;
    }

    /* 2. Active Video Live Intelligence Card (WHERE RED ARROWS POINT) */
    .sm-video-banner {
      margin: 12px 16px 0 16px;
      padding: 13px 15px;
      background: #161B22;
      border: 1px solid #30363D;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      box-shadow: 0 4px 20px rgba(13, 17, 23, 0.6);
      position: relative;
      overflow: hidden;
      flex-shrink: 0;
      transition: all 0.2s ease;
    }

    .sm-video-banner::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 3px;
      height: 100%;
      background: #00E5FF;
    }

    .sm-banner-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .sm-banner-live-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 10.5px;
      font-weight: 700;
      color: #00E5FF;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-family: 'JetBrains Mono', 'Roboto Mono', 'SF Mono', Consolas, monospace;
    }

    .sm-btn-rescan {
      background: #0D1117;
      border: 1px solid #30363D;
      color: #00E5FF;
      font-size: 10.5px;
      font-weight: 600;
      padding: 4px 9px;
      border-radius: 6px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: all 0.15s ease;
      font-family: 'Inter', sans-serif;
    }

    .sm-btn-rescan:hover {
      background: #161B22;
      color: #FFFFFF;
      border-color: #00E5FF;
      box-shadow: 0 0 10px rgba(0, 229, 255, 0.3);
    }

    .sm-video-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #FFFFFF;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      letter-spacing: -0.015em;
    }

    .sm-video-meta {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: 11px;
      color: #94A3B8;
      flex-wrap: wrap;
    }

    .sm-video-meta strong {
      color: #FFFFFF;
      font-weight: 600;
    }

    /* Data font for metrics, numbers, and data points */
    .sm-data-font {
      font-family: 'JetBrains Mono', 'Roboto Mono', 'SF Mono', Consolas, monospace !important;
      letter-spacing: -0.02em;
    }

    .sm-meta-views-pill {
      color: #00E5FF !important;
      font-weight: 700;
      font-family: 'JetBrains Mono', 'Roboto Mono', 'SF Mono', Consolas, monospace;
    }

    .sm-meta-views-pill strong {
      color: #00E5FF !important;
      font-family: 'JetBrains Mono', 'Roboto Mono', 'SF Mono', Consolas, monospace;
    }

    .sm-meta-score-pill {
      color: #94A3B8;
      font-weight: 500;
    }

    .sm-meta-score {
      color: #00E5FF !important;
      font-weight: 700;
      font-family: 'JetBrains Mono', 'Roboto Mono', 'SF Mono', Consolas, monospace;
    }

    /* 3. THE ONE MASTER VIRAL SCRIPT CARD */
    .sm-master-output-card {
      margin: 12px 16px 16px 16px;
      flex: 1;
      display: flex;
      flex-direction: column;
      background: #161B22;
      border: 1px solid #30363D;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 30px rgba(13, 17, 23, 0.7);
    }

    .sm-output-header {
      padding: 12px 14px;
      background: #161B22;
      border-bottom: 1px solid #30363D;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-shrink: 0;
    }

    .sm-output-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: #FFFFFF;
      font-size: 11.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .sm-output-badge svg {
      color: #00E5FF;
    }

    .sm-output-metrics {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .sm-metric-pill {
      font-size: 10px;
      font-weight: 600;
      color: #94A3B8;
      background: #0D1117;
      border: 1px solid #30363D;
      padding: 3px 7px;
      border-radius: 6px;
      font-family: 'JetBrains Mono', 'Roboto Mono', 'SF Mono', Consolas, monospace;
    }

    /* Gamified Retention Badges: Pink/Red (#FF3366) and warm orange strictly for gamification */
    .sm-pill-highlight {
      color: #FF3366 !important;
      border-color: rgba(255, 51, 102, 0.45);
      background: rgba(255, 51, 102, 0.12);
      font-weight: 700;
      font-family: 'JetBrains Mono', 'Roboto Mono', 'SF Mono', Consolas, monospace;
    }

    .sm-pill-orange {
      color: #F97316 !important;
      border-color: rgba(249, 115, 22, 0.45);
      background: rgba(249, 115, 22, 0.12);
      font-weight: 700;
      font-family: 'JetBrains Mono', 'Roboto Mono', 'SF Mono', Consolas, monospace;
    }

    .sm-pill-cyan {
      color: #00E5FF !important;
      border-color: rgba(0, 229, 255, 0.4);
      background: rgba(0, 229, 255, 0.1);
      font-weight: 700;
      font-family: 'JetBrains Mono', 'Roboto Mono', 'SF Mono', Consolas, monospace;
    }

    .sm-pill-slate {
      color: #94A3B8 !important;
      border-color: #30363D;
      background: #0D1117;
      font-weight: 600;
      font-family: 'JetBrains Mono', 'Roboto Mono', 'SF Mono', Consolas, monospace;
    }

    /* Unified Script Canvas */
    .sm-unified-script-editor {
      flex: 1;
      padding: 14px 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 14px;
      outline: none;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #0D1117;
    }

    .sm-unified-script-editor::-webkit-scrollbar {
      width: 4px;
    }

    .sm-unified-script-editor::-webkit-scrollbar-track {
      background: transparent;
    }

    .sm-unified-script-editor::-webkit-scrollbar-thumb {
      background: #30363D;
      border-radius: 4px;
    }

    .sm-script-section {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    /* Section headers: bold, uppercase, tracked out, reduced font size (10px) */
    .sm-section-label {
      font-size: 10px;
      font-weight: 700;
      color: #FFFFFF;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .sm-section-timing {
      font-family: 'JetBrains Mono', 'Roboto Mono', 'SF Mono', Consolas, monospace;
      color: #00E5FF;
      font-size: 9.5px;
      font-weight: 500;
      letter-spacing: 0;
    }

    /* Script body copy: Slate Gray (#94A3B8), regular weight (400) */
    .sm-section-body {
      font-size: 13.5px;
      line-height: 1.6;
      color: #94A3B8;
      font-weight: 400;
      letter-spacing: -0.01em;
    }

    .sm-hook-lead {
      color: #94A3B8;
      font-weight: 400;
    }

    .sm-hook-highlight {
      color: #00E5FF;
      font-weight: 400;
      text-shadow: 0 0 10px rgba(0, 229, 255, 0.25);
    }

    .sm-hook-tail {
      color: #94A3B8;
      font-weight: 400;
    }

    .sm-body-text {
      color: #94A3B8;
      font-weight: 400;
    }

    .sm-cta-text {
      color: #94A3B8;
      font-weight: 400;
    }

    .sm-tags-text {
      color: #00E5FF;
      font-weight: 500;
      font-size: 12px;
      word-spacing: 3px;
      font-family: 'JetBrains Mono', 'Roboto Mono', 'SF Mono', Consolas, monospace;
    }

    /* 4. Action Controls Bar */
    .sm-output-actions {
      padding: 12px 14px;
      background: #161B22;
      border-top: 1px solid #30363D;
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex-shrink: 0;
    }

    /* Main "Copy Full Viral Script" button:
       - Full width of container
       - Inter Semi-Bold (600)
       - Electric Cyan (#00E5FF) background with dark text (#0D1117)
       - Distinct hover state (brightness increase & glow effect)
    */
    .sm-btn-copy-master {
      width: 100%;
      background: #00E5FF;
      color: #0D1117;
      border: none;
      border-radius: 8px;
      padding: 12px 14px;
      font-size: 13.5px;
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow: 0 4px 14px rgba(0, 229, 255, 0.35);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      letter-spacing: -0.01em;
    }

    .sm-btn-copy-master:hover {
      filter: brightness(1.08);
      box-shadow: 0 0 22px rgba(0, 229, 255, 0.55);
      transform: translateY(-1px);
    }

    .sm-btn-copy-master:active {
      transform: translateY(0);
      filter: brightness(0.95);
    }

    .sm-btn-copy-master.copied {
      background: #10B981 !important;
      color: #FFFFFF !important;
      box-shadow: 0 0 20px rgba(16, 185, 129, 0.5) !important;
    }

    .sm-output-sub-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .sm-btn-remix-angle, .sm-btn-copy-tags {
      background: #0D1117;
      border: 1px solid #30363D;
      color: #00E5FF;
      border-radius: 7px;
      padding: 9px 10px;
      font-size: 11.5px;
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    .sm-btn-remix-angle:hover, .sm-btn-copy-tags:hover {
      background: #161B22;
      color: #FFFFFF;
      border-color: #00E5FF;
      box-shadow: 0 0 12px rgba(0, 229, 255, 0.25);
    }

    /* 5. Minimalist Toast Alerts */
    .sm-toast {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(30px);
      background: #161B22;
      border: 1px solid #00E5FF;
      color: #FFFFFF;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 11.5px;
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      opacity: 0;
      pointer-events: none;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 10px 30px rgba(13, 17, 23, 0.8), 0 0 20px rgba(0, 229, 255, 0.35);
      z-index: 1000;
      white-space: nowrap;
    }

    .sm-toast.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  `;
  shadow.appendChild(styleEl);

  // --- Render Floating Edge Trigger ---
  const triggerTab = document.createElement('div');
  triggerTab.className = 'sm-floating-trigger';
  triggerTab.title = 'StitchMatrix — 1-Click Viral Script Engine (Alt+S)';
  triggerTab.innerHTML = `
    <svg viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" rx="2"></rect>
      <rect x="9" y="9" width="6" height="6"></rect>
      <line x1="9" y1="1" x2="9" y2="4"></line>
      <line x1="15" y1="1" x2="15" y2="4"></line>
      <line x1="9" y1="20" x2="9" y2="23"></line>
      <line x1="15" y1="20" x2="15" y2="23"></line>
      <line x1="20" y1="9" x2="23" y2="9"></line>
      <line x1="20" y1="14" x2="23" y2="14"></line>
      <line x1="1" y1="9" x2="4" y2="9"></line>
      <line x1="1" y1="14" x2="4" y2="14"></line>
    </svg>
    <div class="trigger-dot"></div>
  `;
  shadow.appendChild(triggerTab);

  // --- Render Sidebar Container ---
  const sidebar = document.createElement('aside');
  sidebar.className = 'sm-sidebar-container';
  shadow.appendChild(sidebar);

  // --- Toast Notification ---
  const toast = document.createElement('div');
  toast.className = 'sm-toast';
  shadow.appendChild(toast);

  let toastTimeout = null;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  // --- Format Master Script for 1-Click Clipboard Copy ---
  function getFullScriptPlainText() {
    const curScript = generatedScripts[activeStyleIndex] || generatedScripts[0];
    const hook = `${curScript.hookLead}${curScript.hookHighlight}${curScript.hookTail}`;
    return `[HOOK · 0-3s]\n${hook}\n\n[STORY · 4-25s]\n${curScript.body}\n\n[CALL-TO-ACTION · 26-35s]\n${curScript.cta}\n\n[TAGS]\n${curScript.hashtags}`;
  }

  // --- Live DOM Update (In-Place) ---
  function updateLiveContent(flash) {
    const curScript = generatedScripts[activeStyleIndex] || generatedScripts[0];

    const titleEl = sidebar.querySelector('#smDetectedTitle');
    const targetEl = sidebar.querySelector('#smMetaTarget');
    const authorEl = sidebar.querySelector('#smMetaAuthor');
    const viewsEl = sidebar.querySelector('#smMetaViews');
    const scoreEl = sidebar.querySelector('#smMetaScore');
    const angleTitleEl = sidebar.querySelector('#smScriptAngleTitle');
    const remixAngleText = sidebar.querySelector('#smRemixAngleText');
    const pacingEl = sidebar.querySelector('#smMetricPacing');
    const retentionEl = sidebar.querySelector('#smMetricRetention');
    const hookLeadEl = sidebar.querySelector('#smHookLead');
    const hookHighlightEl = sidebar.querySelector('#smHookHighlight');
    const hookTailEl = sidebar.querySelector('#smHookTail');
    const bodyEl = sidebar.querySelector('#smBodyText');
    const ctaEl = sidebar.querySelector('#smCtaText');
    const tagsEl = sidebar.querySelector('#smTagsText');
    const bannerEl = sidebar.querySelector('#smVideoBanner');

    if (titleEl) {
      titleEl.textContent = `"${currentContext.displayTitle}"`;
      titleEl.title = currentContext.title;
    }
    if (targetEl) targetEl.textContent = currentContext.platform;
    if (authorEl) authorEl.textContent = currentContext.author;
    if (viewsEl) viewsEl.textContent = currentContext.views || 'Trending';
    if (scoreEl) scoreEl.textContent = curScript.viralScore;
    if (angleTitleEl) angleTitleEl.textContent = `${curScript.title} Formula`;
    if (pacingEl) pacingEl.textContent = `⏱️ ${curScript.duration} Pacing`;
    if (retentionEl) {
      retentionEl.textContent = curScript.retentionBadge;
      retentionEl.className = `sm-metric-pill ${curScript.retentionClass} sm-data-font`;
    }

    const nextIdx = (activeStyleIndex + 1) % generatedScripts.length;
    if (remixAngleText) remixAngleText.textContent = `⚡ Remix: ${generatedScripts[nextIdx].title}`;

    if (hookLeadEl) hookLeadEl.textContent = curScript.hookLead;
    if (hookHighlightEl) hookHighlightEl.textContent = curScript.hookHighlight;
    if (hookTailEl) hookTailEl.textContent = curScript.hookTail;
    if (bodyEl) bodyEl.textContent = curScript.body;
    if (ctaEl) ctaEl.textContent = curScript.cta;
    if (tagsEl) tagsEl.textContent = curScript.hashtags;

    if (flash && bannerEl) {
      bannerEl.style.borderColor = '#00E5FF';
      setTimeout(() => {
        bannerEl.style.borderColor = '#30363D';
      }, 500);
    }
  }

  // --- Real-Time Heartbeat Auto-Detector ---
  function checkAndAutoUpdate() {
    if (!isOpen) return;

    const newContext = detectVideoContext();

    const titleChanged = newContext.title && newContext.title !== currentContext.title && newContext.title !== 'Active Viral Video';
    const idChanged = newContext.videoId && newContext.videoId !== currentContext.videoId;
    const urlChanged = newContext.url && newContext.url !== currentContext.url;
    const authorChanged = newContext.author && newContext.author !== currentContext.author && newContext.author !== '@creator';
    const viewsChanged = newContext.views && newContext.views !== currentContext.views && newContext.views !== 'Trending';
    const wasPlaceholder = currentContext.title === 'Active Viral Video' && newContext.title && newContext.title !== 'Active Viral Video';

    if (titleChanged || idChanged || wasPlaceholder || viewsChanged || (urlChanged && (authorChanged || newContext.title !== 'Active Viral Video'))) {
      const activeEl = shadow.activeElement;
      if (activeEl && activeEl.isContentEditable) return;

      currentContext = newContext;
      generatedScripts = buildViralScripts(currentContext);

      updateLiveContent(true);
      showToast(`⚡ Detected: "${currentContext.displayTitle.slice(0, 24)}..."`);
    }
  }

  // --- Render Streamlined Sidebar Content ---
  function renderSidebar() {
    const curScript = generatedScripts[activeStyleIndex] || generatedScripts[0];
    const nextIdx = (activeStyleIndex + 1) % generatedScripts.length;

    sidebar.innerHTML = `
      <!-- 1. Blendr Cyber Header -->
      <header class="sm-header">
        <div class="sm-header-brand">
          <div class="sm-logo-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
              <rect x="4" y="4" width="16" height="16" rx="2"></rect>
              <rect x="9" y="9" width="6" height="6"></rect>
              <line x1="9" y1="1" x2="9" y2="4"></line>
              <line x1="15" y1="1" x2="15" y2="4"></line>
              <line x1="9" y1="20" x2="9" y2="23"></line>
              <line x1="15" y1="20" x2="15" y2="23"></line>
              <line x1="20" y1="9" x2="23" y2="9"></line>
              <line x1="20" y1="14" x2="23" y2="14"></line>
              <line x1="1" y1="9" x2="4" y2="9"></line>
              <line x1="1" y1="14" x2="4" y2="14"></line>
            </svg>
          </div>
          <span class="sm-brand-title">Stitch<span>Matrix</span></span>
        </div>
        <div class="sm-header-actions">
          <div class="sm-live-badge">
            <span class="sm-pulse-dot"></span>
            <span>Live Sync</span>
          </div>
          <button class="sm-close-btn" id="smCloseBtn" title="Close (Alt+S)">✕</button>
        </div>
      </header>

      <!-- 2. Active Video Live Intelligence Card (WHERE THE RED ARROWS POINT) -->
      <div class="sm-video-banner" id="smVideoBanner">
        <div class="sm-banner-header">
          <div class="sm-banner-live-tag">
            <span class="sm-pulse-dot"></span>
            <span id="smStatusText">Analyzing Active Video</span>
          </div>
          <button class="sm-btn-rescan" id="smRescanBtn" title="Re-scan and analyze current video in 1 second">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
            </svg>
            <span>Re-Analyze</span>
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
          <span class="sm-meta-views-pill sm-data-font">Views: <strong id="smMetaViews" class="sm-data-font">${currentContext.views || 'Trending'}</strong></span>
          <span>•</span>
          <span class="sm-meta-score-pill sm-data-font">Viral Score: <strong id="smMetaScore" class="sm-meta-score sm-data-font">${curScript.viralScore}</strong></span>
        </div>
      </div>

      <!-- 3. THE ONE MASTER VIRAL SCRIPT OUTPUT -->
      <div class="sm-master-output-card">
        <div class="sm-output-header">
          <div class="sm-output-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            <span id="smScriptAngleTitle">${curScript.title} Formula</span>
          </div>
          <div class="sm-output-metrics">
            <span class="sm-metric-pill sm-data-font" id="smMetricPacing">⏱️ ${curScript.duration} Pacing</span>
            <span class="sm-metric-pill ${curScript.retentionClass} sm-data-font" id="smMetricRetention">${curScript.retentionBadge}</span>
          </div>
        </div>

        <!-- Unified Script Canvas -->
        <div class="sm-unified-script-editor" id="smUnifiedScript" contenteditable="true" spellcheck="false">
          <!-- Hook Section -->
          <div class="sm-script-section sm-section-hook">
            <div class="sm-section-label">🎣 01 — THE VIRAL HOOK <span class="sm-section-timing">(0–3s)</span></div>
            <div class="sm-section-body">
              <span class="sm-hook-lead" id="smHookLead">${curScript.hookLead}</span><span class="sm-hook-highlight" id="smHookHighlight">${curScript.hookHighlight}</span><span class="sm-hook-tail" id="smHookTail">${curScript.hookTail}</span>
            </div>
          </div>

          <!-- Body / Story Section -->
          <div class="sm-script-section sm-section-body">
            <div class="sm-section-label">⚡ 02 — THE CORE STORY <span class="sm-section-timing">(4–25s)</span></div>
            <div class="sm-section-body sm-body-text" id="smBodyText">${curScript.body}</div>
          </div>

          <!-- Call to Action Section -->
          <div class="sm-script-section sm-section-cta">
            <div class="sm-section-label">🚀 03 — RETENTION CALL-TO-ACTION <span class="sm-section-timing">(26–35s)</span></div>
            <div class="sm-section-body sm-cta-text" id="smCtaText">${curScript.cta}</div>
          </div>

          <!-- Viral Hashtags Section -->
          <div class="sm-script-section sm-section-tags">
            <div class="sm-section-label">🏷️ 04 — VIRAL HASHTAGS</div>
            <div class="sm-section-body sm-tags-text sm-data-font" id="smTagsText">${curScript.hashtags}</div>
          </div>
        </div>

        <!-- 4. Action Controls Bar -->
        <div class="sm-output-actions">
          <button class="sm-btn-copy-master" id="smCopyMasterBtn" title="Copy entire viral script and hashtags (Alt+C)">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
              <rect x="9" y="9" width="13" height="13" rx="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span id="smCopyMasterText">Copy Full Viral Script</span>
          </button>

          <div class="sm-output-sub-actions">
            <button class="sm-btn-remix-angle" id="smRemixAngleBtn" title="Switch to another high-converting angle">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <polyline points="23 4 23 10 17 10"></polyline>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
              </svg>
              <span id="smRemixAngleText">⚡ Remix: ${generatedScripts[nextIdx].title}</span>
            </button>

            <button class="sm-btn-copy-tags" id="smCopyTagsOnlyBtn" title="Copy hashtags only">
              <span>#️⃣ Copy Tags</span>
            </button>
          </div>
        </div>
      </div>
    `;

    attachEventListeners();
  }

  // --- Attach Event Listeners ---
  function attachEventListeners() {
    const closeBtn = sidebar.querySelector('#smCloseBtn');
    if (closeBtn) closeBtn.onclick = toggleSidebar;

    const rescanBtn = sidebar.querySelector('#smRescanBtn');
    if (rescanBtn) {
      rescanBtn.onclick = () => {
        currentContext = detectVideoContext();
        generatedScripts = buildViralScripts(currentContext);
        updateLiveContent(true);
        showToast(`⚡ Analyzed: "${currentContext.displayTitle.slice(0, 24)}..."`);
      };
    }

    const remixAngleBtn = sidebar.querySelector('#smRemixAngleBtn');
    if (remixAngleBtn) {
      remixAngleBtn.onclick = () => {
        activeStyleIndex = (activeStyleIndex + 1) % generatedScripts.length;
        updateLiveContent(false);
        const cur = generatedScripts[activeStyleIndex];
        showToast(`⚡ Remixed to ${cur.title} Formula`);
      };
    }

    const copyMasterBtn = sidebar.querySelector('#smCopyMasterBtn');
    const copyMasterText = sidebar.querySelector('#smCopyMasterText');
    if (copyMasterBtn) {
      copyMasterBtn.onclick = () => {
        const fullText = getFullScriptPlainText();
        navigator.clipboard.writeText(fullText).then(() => {
          if (copyMasterText) copyMasterText.textContent = '✓ Copied to Clipboard!';
          copyMasterBtn.classList.add('copied');
          showToast('📋 Full Viral Script Copied!');
          setTimeout(() => {
            if (copyMasterText) copyMasterText.textContent = 'Copy Full Viral Script';
            copyMasterBtn.classList.remove('copied');
          }, 1800);
        });
      };
    }

    const copyTagsOnlyBtn = sidebar.querySelector('#smCopyTagsOnlyBtn');
    if (copyTagsOnlyBtn) {
      copyTagsOnlyBtn.onclick = () => {
        const curScript = generatedScripts[activeStyleIndex] || generatedScripts[0];
        navigator.clipboard.writeText(curScript.hashtags).then(() => {
          showToast('🏷️ Hashtags Copied!');
        });
      };
    }
  }

  // --- Toggle Sidebar ---
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
    }
  }

  triggerTab.onclick = toggleSidebar;

  // --- Global Keyboard Shortcuts ---
  window.addEventListener('keydown', (e) => {
    // Alt+S: Toggle sidebar
    if (e.altKey && (e.key === 's' || e.key === 'S')) {
      e.preventDefault();
      toggleSidebar();
    }
    // Alt+C: 1-Click Copy Full Viral Script
    if (e.altKey && (e.key === 'c' || e.key === 'C')) {
      if (isOpen) {
        e.preventDefault();
        const fullText = getFullScriptPlainText();
        navigator.clipboard.writeText(fullText).then(() => {
          showToast('📋 Full Viral Script Copied (Alt+C)!');
        });
      }
    }
  });

  // --- Active Heartbeat Poller (250ms when sidebar is open) ---
  setInterval(() => {
    if (isOpen) {
      checkAndAutoUpdate();
    }
  }, 250);

  // --- Message Listener from Background Worker ---
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'TOGGLE_SIDEBAR') {
        toggleSidebar();
        sendResponse({ open: isOpen });
      }
    });
  }

  console.log('[StitchMatrix] Streamlined Viral Script Engine v4.0.0 loaded.');
})();
