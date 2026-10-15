/**
 * StitchMatrix — Qubora Emerald Obsidian Studio v3.8.2
 * Chrome Extension Manifest V3 In-DOM Sidebar Engine
 * Features:
 * - Viral Video Snipper & Hook Clipper (Snip 5s/10s hooks directly from playing videos for faceless shorts)
 * - 1-Click AI Voiceover Studio (Continuous MP3 Narration, zero camera/mic required)
 * - Dual-Playback Synced Preview (Play snipped viral video + AI Voiceover in sync)
 * - Built-in Webcam Teleprompter Studio & In-Browser Video Recorder (Face Mode)
 * - Send-to-Phone Companion Link & High-Resolution QR Code
 * - Multi-Platform Real-Time Active Video Auto-Detection (YouTube Shorts, TikTok, Instagram Reels)
 * - Deep Obsidian Void (#060806) & Glowing Emerald Design System
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

  const WORKER_BASE = 'https://stitchmatrix-api.humangeek77.workers.dev';

  // Helper to format large numbers to compact notation (e.g. 1.2M, 69.9K)
  function formatCompactNumber(num) {
    if (num === null || num === undefined || isNaN(num)) return '';
    const n = Number(num);
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

  // Helper to clean extracted view and play metric strings
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

  // Real-time DOM Context Detector for Social Video Players
  // Universal Active Video & Context Detector for TikTok, Instagram Reels, and YouTube Shorts
  function detectVideoContext() {
    let url = window.location.href;
    let platform = 'Social Video';
    let title = '';
    let author = '';
    let views = '';
    let videoId = '';

    try {
      // =======================================================================
      // 1. TIKTOK DETECTION ENGINE
      // =======================================================================
      if (url.includes('tiktok.com')) {
        platform = 'TikTok';

        const videos = Array.from(document.querySelectorAll('video'));
        let activeVideo = null;

        // 1a. Playing video
        activeVideo = videos.find(v => !v.paused && v.currentTime > 0);

        // 1b. Video fully visible within viewport
        if (!activeVideo && videos.length > 0) {
          activeVideo = videos.find(v => {
            const rect = v.getBoundingClientRect();
            return rect.top >= 0 && rect.bottom <= window.innerHeight && rect.height > 60;
          });
        }

        // 1c. Video closest to viewport center
        if (!activeVideo && videos.length > 0) {
          const midY = window.innerHeight / 2;
          let bestDist = Infinity;
          for (const v of videos) {
            const rect = v.getBoundingClientRect();
            if (rect.height > 60) {
              const dist = Math.abs(rect.top + rect.height / 2 - midY);
              if (dist < bestDist) {
                bestDist = dist;
                activeVideo = v;
              }
            }
          }
        }

        if (activeVideo) {
          const container = activeVideo.closest('[data-e2e="recommend-list-item-container"]')
            || activeVideo.closest('div[class*="DivItemContainer"]')
            || activeVideo.closest('div[class*="DivVideoFeedList"] > div')
            || activeVideo.closest('div[class*="DivBrowserModeContainer"]')
            || activeVideo.closest('[data-e2e="user-post-item"]')
            || activeVideo.closest('[data-e2e="browse-video"]')
            || activeVideo.closest('article')
            || activeVideo.parentElement?.parentElement?.parentElement;

          if (container) {
            const descEl = container.querySelector(
              '[data-e2e="video-desc"], [data-e2e="browse-video-desc"], [class*="DivDescription"], [class*="SpanText"], [class*="desc"], h1, h2, div[data-e2e="search-card-video-caption"]'
            );

            // Extract view or play count from container
            const viewEl = container.querySelector(
              '[data-e2e="video-views"], strong[data-e2e="video-views"], [data-e2e="search-card-like-container"], strong[data-e2e="like-count"], [data-e2e="like-count"], div[class*="DivPlayCount"], span[class*="PlayCount"], [class*="play-count"]'
            );
            if (viewEl?.textContent?.trim()) {
              views = cleanViewCountString(viewEl.textContent);
            }

            // Real author handle: check a[href*="/@"] explicitly first to avoid metric collisions
            const authorLink = container.querySelector('a[href*="/@"]');
            let handleFromHref = '';
            if (authorLink) {
              const href = authorLink.getAttribute('href') || '';
              const m = href.match(/@([a-zA-Z0-9_.-]+)/);
              if (m && m[1]) {
                handleFromHref = '@' + m[1];
              }
            }

            const authorEl = container.querySelector(
              '[data-e2e="video-author-uniqueid"], [data-e2e="browse-username"], [data-e2e="user-title"], [data-e2e="author-uniqueId"], [class*="AuthorTitle"]'
            );

            if (descEl?.textContent?.trim()) title = descEl.textContent.trim();
            if (authorEl?.textContent?.trim()) author = authorEl.textContent.trim();
            if (!author && handleFromHref) author = handleFromHref;

            // Disambiguation: If extracted author matches a metric like "69.9K" or "1.2M", redirect it to views
            if (author && /^@?[\d,.]+[KMkmBb]?$/i.test(author.trim())) {
              if (!views) views = cleanViewCountString(author);
              author = handleFromHref || '';
            }

            const linkEl = container.querySelector('a[href*="/video/"]');
            if (linkEl?.href) {
              url = linkEl.href;
              const m = url.match(/\/video\/(\d+)/);
              if (m) videoId = m[1];
            }
          }
        }

        // Fallbacks for TikTok single video view / modal
        if (!title) {
          const descEl = document.querySelector(
            '[data-e2e="browse-video-desc"], [data-e2e="video-desc"], [class*="H1VideoTitle"], [class*="DivDescription"], h1, .video-meta-title'
          );
          if (descEl?.textContent?.trim()) title = descEl.textContent.trim();
        }

        if (!views) {
          const viewEl = document.querySelector(
            '[data-e2e="video-views"], strong[data-e2e="video-views"], strong[data-e2e="like-count"], [data-e2e="like-count"], [data-e2e="browse-like-count"], [class*="PlayCount"]'
          );
          if (viewEl?.textContent?.trim()) views = cleanViewCountString(viewEl.textContent);
        }

        if (!author || /^@?[\d,.]+[KMkmBb]?$/i.test(author.trim())) {
          const authorEl = document.querySelector(
            '[data-e2e="browse-username"], [data-e2e="video-author-uniqueid"], [data-e2e="user-title"], [data-e2e="browser-nickname"], [data-e2e="author-uniqueId"], .author-uniqueId'
          );
          if (authorEl?.textContent?.trim()) author = authorEl.textContent.trim();

          const authorLink = document.querySelector('a[href*="/@"]');
          if (authorLink && (!author || /^@?[\d,.]+[KMkmBb]?$/i.test(author.trim()))) {
            const href = authorLink.getAttribute('href') || '';
            const m = href.match(/@([a-zA-Z0-9_.-]+)/);
            if (m && m[1]) author = '@' + m[1];
          }
        }

        if (author && /^@?[\d,.]+[KMkmBb]?$/i.test(author.trim())) {
          if (!views) views = cleanViewCountString(author);
          author = '';
        }

        if (!videoId) {
          const m = url.match(/\/video\/(\d+)/);
          if (m) videoId = m[1];
        }

        // Title parsing from document.title if empty
        if (!title && document.title && document.title.includes('TikTok')) {
          const quoteMatch = document.title.match(/["“](.*?)["”]/);
          if (quoteMatch && quoteMatch[1].length > 2) {
            title = quoteMatch[1];
          } else {
            title = document.title.replace(/\s*\|\s*TikTok.*/i, '').replace(/.*on TikTok:\s*/i, '').trim();
          }
        }
      }

      // =======================================================================
      // 2. INSTAGRAM REELS DETECTION ENGINE
      // =======================================================================
      else if (url.includes('instagram.com')) {
        platform = 'Instagram Reels';

        const videos = Array.from(document.querySelectorAll('video'));
        let activeVideo = null;

        // 2a. Playing video
        activeVideo = videos.find(v => !v.paused && v.currentTime > 0);

        // 2b. Video fully visible within viewport
        if (!activeVideo && videos.length > 0) {
          activeVideo = videos.find(v => {
            const rect = v.getBoundingClientRect();
            return rect.top >= 0 && rect.bottom <= window.innerHeight && rect.height > 80;
          });
        }

        // 2c. Video closest to viewport center
        if (!activeVideo && videos.length > 0) {
          const midY = window.innerHeight / 2;
          let bestDist = Infinity;
          for (const v of videos) {
            const rect = v.getBoundingClientRect();
            if (rect.height > 80) {
              const dist = Math.abs(rect.top + rect.height / 2 - midY);
              if (dist < bestDist) {
                bestDist = dist;
                activeVideo = v;
              }
            }
          }
        }

        if (activeVideo) {
          const container = activeVideo.closest('article')
            || activeVideo.closest('div[role="presentation"]')
            || activeVideo.closest('div[class*="x1qjc9v5"]')
            || activeVideo.closest('div[class*="x1n2onr6"]')
            || activeVideo.closest('section')
            || activeVideo.parentElement?.parentElement?.parentElement;

          if (container) {
            const captionEl = container.querySelector(
              'h1, span._aacl, div._a9zs, span._aaco, span[class*="x193iq5w"], div[class*="x1lliihq"] span'
            );
            const authorEl = container.querySelector(
              'header a, span._ap3a, a[role="link"][href^="/"], a[class*="x1i10hfl"][href*="/"]'
            );
            const viewEl = container.querySelector(
              'a[href*="/liked_by/"] span, section span[class*="x193iq5w"], div[class*="x1lliihq"] span, span._aacl._aaco._aacw'
            );
            const linkEl = container.querySelector('a[href*="/reel/"], a[href*="/reels/"], a[href*="/p/"]');

            if (captionEl?.textContent?.trim()) title = captionEl.textContent.trim();
            if (authorEl?.textContent?.trim()) author = authorEl.textContent.trim();
            if (viewEl?.textContent?.trim()) {
              const raw = viewEl.textContent.trim();
              if (/\d/.test(raw)) views = cleanViewCountString(raw);
            }
            if (linkEl?.href) {
              url = linkEl.href;
              const m = url.match(/\/(reels?|p)\/([a-zA-Z0-9_-]+)/);
              if (m) videoId = m[2];
            }
          }
        }

        // Fallbacks for Instagram single reel / explore modal
        if (!title) {
          const captionEl = document.querySelector('article h1, article span._aacl, article div._a9zs, h1');
          if (captionEl?.textContent?.trim()) title = captionEl.textContent.trim();
        }

        if (!views) {
          const viewEl = document.querySelector('a[href*="/liked_by/"] span, section span[class*="x193iq5w"]');
          if (viewEl?.textContent?.trim()) {
            const raw = viewEl.textContent.trim();
            if (/\d/.test(raw)) views = cleanViewCountString(raw);
          }
        }

        if (!author) {
          const authorEl = document.querySelector('header a, span._ap3a, article header a');
          if (authorEl?.textContent?.trim()) author = authorEl.textContent.trim();
        }

        if (author && /^@?[\d,.]+[KMkmBb]?$/i.test(author.trim())) {
          if (!views) views = cleanViewCountString(author);
          author = '';
        }

        if (!videoId) {
          const m = url.match(/\/(reels?|p)\/([a-zA-Z0-9_-]+)/);
          if (m) videoId = m[2];
        }

        // Instagram document.title parsing
        if (!title && document.title && document.title.includes('Instagram')) {
          const quoteMatch = document.title.match(/["“](.*?)["”]/);
          if (quoteMatch && quoteMatch[1].length > 2) {
            title = quoteMatch[1];
          } else {
            title = document.title.replace(/\s*•\s*Instagram photos and videos.*/i, '').replace(/.*on Instagram:\s*/i, '').trim();
          }
        }
      }

      // =======================================================================
      // 3. YOUTUBE SHORTS DETECTION ENGINE
      // =======================================================================
      else if (url.includes('youtube.com')) {
        const isShorts = url.includes('/shorts');
        platform = isShorts ? 'YouTube Shorts' : 'YouTube';

        const reels = Array.from(document.querySelectorAll('ytd-reel-video-renderer'));
        let activeReel = null;

        // 3a. Extract current video ID from URL
        const urlMatch = url.match(/\/shorts\/([a-zA-Z0-9_-]+)/);
        const currentVideoId = urlMatch ? urlMatch[1] : null;

        // 3b. Match reel by current Video ID
        if (currentVideoId && reels.length > 0) {
          activeReel = reels.find(r => {
            return r.querySelector(`a[href*="${currentVideoId}"]`)
              || r.getAttribute('video-id') === currentVideoId
              || r.id === currentVideoId;
          });
        }

        // 3c. Match by screen center coverage & maximum visible height in viewport
        if (!activeReel && reels.length > 0) {
          const windowH = window.innerHeight;
          const midY = windowH / 2;

          const scoredReels = reels.map(r => {
            const rect = r.getBoundingClientRect();
            const visibleTop = Math.max(0, rect.top);
            const visibleBottom = Math.min(windowH, rect.bottom);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            const coversCenter = rect.top <= midY && rect.bottom >= midY;
            const v = r.querySelector('video');
            const isPlaying = v && !v.paused && v.currentTime > 0;
            return { reel: r, visibleHeight, coversCenter, isPlaying };
          });

          // Priority A: Reel covering the screen center line with >200px visible height
          const centerReel = scoredReels.find(x => x.coversCenter && x.visibleHeight > 200);
          if (centerReel) {
            activeReel = centerReel.reel;
          } else {
            // Priority B: Highest visible height on screen
            scoredReels.sort((a, b) => b.visibleHeight - a.visibleHeight);
            if (scoredReels[0] && scoredReels[0].visibleHeight > 100) {
              activeReel = scoredReels[0].reel;
            }
          }
        }

        // 3d. Fallback to playing video or is-active
        if (!activeReel && reels.length > 0) {
          activeReel = reels.find(r => {
            const v = r.querySelector('video');
            return v && !v.paused && v.currentTime > 0;
          }) || reels.find(r => r.hasAttribute('is-active'));
        }

        if (activeReel) {
          const tEl = activeReel.querySelector(
            '#overlay #title, .ytReelMetamodelViewModelHostTitle, #title.ytd-reel-player-header-renderer, h2.title, yt-formatted-string.title, h2.ytd-reel-player-header-renderer, ytd-reel-player-overlay-renderer #title, yt-reel-metamodel-view-model h2, h2'
          );
          const aEl = activeReel.querySelector(
            '#channel-name, .ytd-channel-name, #text.ytd-channel-name, [id="channel-name"], .yt-simple-endpoint.ytd-channel-name, .ytReelMetamodelViewModelHostHeaderChannelName'
          );
          const viewEl = activeReel.querySelector(
            '#like-button #text, ytd-like-button-renderer yt-formatted-string, #factoid-views .yt-core-attributed-string, #like-button yt-formatted-string, [aria-label*="like"] #text, yt-button-shape[aria-label*="like"] div[aria-hidden="true"]'
          );

          if (tEl?.textContent?.trim()) title = tEl.textContent.trim();
          if (aEl?.textContent?.trim()) author = aEl.textContent.trim();
          if (viewEl?.textContent?.trim()) {
            const raw = viewEl.textContent.trim();
            if (/\d/.test(raw)) views = cleanViewCountString(raw);
          }
        }

        // 3e. Document Title Source-of-Truth Validation
        // YouTube Shorts always sets document.title = "<Active Title> - YouTube"
        if (document.title && !document.title.includes('YouTube Shorts') && document.title.includes(' - YouTube')) {
          const docTitleClean = document.title.replace(/\s*-\s*YouTube.*$/i, '').trim();
          if (docTitleClean && docTitleClean.length > 2) {
            title = docTitleClean;
          }
        }

        if (!title) {
          const headerTitle = document.querySelector(
            'ytd-shorts-player-header-renderer #text, #title.ytd-reel-player-header-renderer, .ytReelMetamodelViewModelHostTitle, h1.title, h2.title, ytd-watch-metadata #title h1, h1.ytd-video-primary-info-renderer'
          );
          if (headerTitle?.textContent?.trim()) title = headerTitle.textContent.trim();
        }

        if (!views) {
          const viewEl = document.querySelector(
            'ytd-reel-video-renderer[is-active] #like-button #text, #like-button #text, #info span.view-count, ytd-watch-metadata #view-count, ytd-video-view-count-renderer span.view-count'
          );
          if (viewEl?.textContent?.trim()) {
            const raw = viewEl.textContent.trim();
            if (/\d/.test(raw)) views = cleanViewCountString(raw);
          }
        }

        if (!views) {
          const metaInteractions = document.querySelector('meta[itemprop="interactionCount"]');
          if (metaInteractions && metaInteractions.content) {
            views = formatCompactNumber(metaInteractions.content);
          }
        }

        if (!author) {
          const genericAuthor = document.querySelector('#channel-name, .ytd-channel-name, #text.ytd-channel-name, ytd-channel-name a');
          if (genericAuthor?.textContent?.trim()) author = genericAuthor.textContent.trim();
        }

        if (author && /^@?[\d,.]+[KMkmBb]?$/i.test(author.trim())) {
          if (!views) views = cleanViewCountString(author);
          author = '';
        }

        if (currentVideoId) {
          videoId = currentVideoId;
        } else {
          const m = url.match(/\/shorts\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
          if (m) videoId = m[1];
        }
      }
    } catch (e) {
      // Graceful error recovery
    }

    if (!title) title = 'Active Viral Video';
    if (!author || /^@?[\d,.]+[KMkmBb]?$/i.test(author.trim())) author = '@creator';
    if (!author.startsWith('@') && !author.includes(' ')) author = '@' + author;
    if (!views) views = 'Trending';

    let displayTitle = title;
    if (displayTitle.length > 68) displayTitle = displayTitle.slice(0, 65) + '...';

    return { platform, title, displayTitle, author, views, url, videoId };
  }

  function extractSubject(rawTitle) {
    if (!rawTitle || rawTitle === 'Active Viral Video') return 'this viral moment';
    let clean = rawTitle
      .replace(/#[\p{L}\p{N}_]+/gu, '') // Unicode-aware hashtag stripping
      .replace(/\|.*$/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/\(.*?\)/g, '')
      .replace(/[-–—].*$/g, '')
      .replace(/\b(official trailer|episode \d+|reimagined|shorts|viral|4k|hd|part \d+)\b/gi, '')
      .replace(/[^\p{L}\p{N}\s'&.,!?-]/gu, '') // Preserve all international letters
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
      .filter(w => w.length > 3 && !['this', 'that', 'with', 'from', 'have', 'were', 'what', 'epic', 'part', 'episode'].includes(w.toLowerCase()));
    
    const tags = words.slice(0, 3).map(w => '#' + w.charAt(0).toUpperCase() + w.slice(1));
    tags.push('#ViralShorts', '#Trending');
    return tags.join(' ');
  }

  function buildViralScripts(videoContext) {
    const subject = extractSubject(videoContext.title);
    const hashtags = generateDynamicHashtags(videoContext.title);

    return [
      {
        id: 'curiosity',
        title: 'Curiosity Gap',
        subtitle: 'High Intrigue & Instant Hook',
        duration: '30s',
        viralScore: '97/100',
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
        subtitle: 'Controversial Angle for Comments',
        duration: '34s',
        viralScore: '95/100',
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
        viralScore: '94/100',
        hookLead: `This video about `,
        hookHighlight: `${subject}`,
        hookTail: ` is currently breaking the algorithm. Let's break down the exact formula in 30 seconds.`,
        body: `Notice how frame one gives you an immediate emotional punchline? Then they immediately stack 3 high-contrast visual cuts before the 8-second retention drop-off. If you're a creator trying to hit millions of views, steal this exact pacing.`,
        cta: `Bookmark this breakdown to copy for your next upload. Hit follow for daily algorithmic teardowns.`,
        hashtags: hashtags
      }
    ];
  }

  // Universal Active Page Video Selector (Direct DOM reference for snipping & recording)
  function getActivePageVideo() {
    const videos = Array.from(document.querySelectorAll('video'));
    if (!videos.length) return null;

    // 1. Video currently playing
    const playing = videos.find(v => !v.paused && v.currentTime > 0);
    if (playing) return playing;

    // 2. YouTube main video player
    const ytMain = document.querySelector('video.html5-main-video');
    if (ytMain) return ytMain;

    // 3. YouTube Shorts active video inside current reel
    const activeReel = document.querySelector('ytd-reel-video-renderer[is-active]');
    if (activeReel) {
      const v = activeReel.querySelector('video');
      if (v) return v;
    }

    // 4. TikTok active video
    const ttActive = document.querySelector('[data-e2e="recommend-list-item-container"] video') ||
                     document.querySelector('div[class*="DivVideoFeedList"] video') ||
                     document.querySelector('video[src]');
    if (ttActive) return ttActive;

    // 5. Largest visible video in viewport
    const visible = videos.find(v => {
      const r = v.getBoundingClientRect();
      return r.height > 100 && r.width > 100 && r.top < window.innerHeight && r.bottom > 0;
    });
    if (visible) return visible;

    return videos[0];
  }

  // State
  let activeStyleIndex = 0;
  let isOpen = false;
  let currentContext = detectVideoContext();
  let generatedScripts = buildViralScripts(currentContext);

  // Creator Studio State (Viral Clip Snip & Webcam)
  let studioRecordMode = 'snip'; // 'snip' (Faceless) | 'webcam' (Face)
  let snipRecorder = null;
  let snipChunks = [];
  let isSnipping = false;
  let snipSeconds = 0;
  let snipTimer = null;
  let snippedBlobUrl = null;
  let isSyncPlaying = false;

  // Webcam Studio State
  let mediaStream = null;
  let mediaRecorder = null;
  let recordedChunks = [];
  let isRecording = false;
  let recordingSeconds = 0;
  let recordingTimer = null;
  let teleprompterScrollInterval = null;
  let recordedBlobUrl = null;

  // Faceless AI Voiceover Studio State
  let currentVoiceBlob = null;
  let currentVoiceBlobUrl = null;
  let isGeneratingVoice = false;
  let selectedVoiceId = localStorage.getItem('sm_selected_voice') || 'orion';
  let voiceVolume = parseFloat(localStorage.getItem('sm_voice_volume') || '1.0');
  let lastNonZeroVoiceVolume = voiceVolume > 0 ? voiceVolume : 1.0;
  let snipVideoVolume = 0.0;

  // Create Host Container
  const host = document.createElement('div');
  host.id = 'stitchmatrix-extension-root';
  document.documentElement.appendChild(host);

  // Attach Shadow DOM for complete CSS encapsulation
  const shadow = host.attachShadow({ mode: 'open' });

  // Inject Qubora-Inspired Scoped Styles into Shadow DOM
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    :host {
      all: initial;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Plus Jakarta Sans", "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 13.5px;
      line-height: 1.5;
      color: #F8FAFC;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* Floating Edge Tab Trigger (Qubora Glowing Pill) */
    .sm-floating-trigger {
      position: fixed;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 38px;
      height: 92px;
      background: #060806;
      border: 1px solid #16241A;
      border-right: none;
      border-radius: 12px 0 0 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      z-index: 2147483646;
      box-shadow: -4px 0 24px rgba(16, 185, 129, 0.15);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .sm-floating-trigger:hover {
      background: #0B110D;
      width: 42px;
      border-color: #10B981;
      box-shadow: -6px 0 28px rgba(16, 185, 129, 0.3);
    }

    .sm-floating-trigger svg {
      width: 17px;
      height: 17px;
      fill: none;
      stroke: #34D399;
      stroke-width: 2;
    }

    .sm-floating-trigger .trigger-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #34D399;
      box-shadow: 0 0 10px #34D399;
    }

    /* Main Sidebar Drawer (Qubora Deep Obsidian Void) */
    .sm-sidebar-container {
      position: fixed;
      top: 0;
      right: 0;
      width: 418px;
      height: 100vh;
      background: #060806 !important;
      border-left: 1px solid #141E17;
      color: #F8FAFC;
      z-index: 2147483647;
      transform: translateX(418px);
      transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      box-shadow: -16px 0 50px rgba(0, 0, 0, 0.85);
      overflow: hidden;
      user-select: text;
    }

    .sm-sidebar-container.open {
      transform: translateX(0);
    }

    /* 1. Header (Qubora Glass Header) */
    .sm-header {
      padding: 13px 18px;
      background: #080C09;
      border-bottom: 1px solid #141E17;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
    }

    .sm-header-brand {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    /* Qubora Organic Glowing Ring Icon */
    .sm-qubora-logo {
      width: 26px;
      height: 26px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .sm-qubora-logo svg {
      width: 24px;
      height: 24px;
      filter: drop-shadow(0 0 6px rgba(52, 211, 153, 0.6));
    }

    .sm-header-title {
      font-size: 14px;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: -0.02em;
    }

    .sm-header-title span {
      color: #34D399;
    }

    .sm-header-actions {
      display: flex;
      align-items: center;
      gap: 7px;
    }

    .sm-auto-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 10px;
      color: #34D399;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.25);
      padding: 2px 7px;
      border-radius: 9999px;
      font-weight: 600;
    }

    .sm-pulse-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #34D399;
      box-shadow: 0 0 8px #34D399;
      animation: smBeaconPulse 2s infinite ease-in-out;
    }

    @keyframes smBeaconPulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.35; transform: scale(0.85); }
    }

    .sm-close-btn {
      background: #0E1410;
      border: 1px solid #1C2B20;
      color: #6B7280;
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
      background: #141E17;
      color: #FFFFFF;
      border-color: #34D399;
    }

    /* 2. Active Video Ingestion Banner with Ambient Green Glow */
    .sm-video-banner {
      padding: 12px 18px;
      background: radial-gradient(circle at 10% 20%, rgba(16, 185, 129, 0.08) 0%, rgba(6, 8, 6, 0.95) 75%);
      border-bottom: 1px solid #141E17;
      display: flex;
      flex-direction: column;
      gap: 6px;
      position: relative;
      transition: background 0.4s ease;
    }

    .sm-video-banner.pulse-active {
      background: radial-gradient(circle at 20% 20%, rgba(52, 211, 153, 0.16) 0%, rgba(6, 8, 6, 0.95) 85%);
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
      letter-spacing: 0.01em;
    }

    .sm-rescan-btn {
      background: #0E1410;
      border: 1px solid #1C2B20;
      color: #8CE4B0;
      border-radius: 5px;
      padding: 2px 8px;
      font-size: 10.5px;
      font-weight: 550;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 3px;
      transition: all 0.15s ease;
    }

    .sm-rescan-btn:hover {
      background: #141E17;
      color: #FFFFFF;
      border-color: #34D399;
    }

    .sm-video-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #FFFFFF;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: -0.02em;
      line-height: 1.3;
    }

    .sm-video-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      color: #6B7280;
      flex-wrap: wrap;
    }

    .sm-video-meta span strong {
      color: #A1A1AA;
    }

    .sm-meta-views-pill {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      color: #34D399;
      font-weight: 600;
    }

    .sm-meta-views-pill strong {
      color: #6EE7B7 !important;
      font-weight: 750 !important;
    }

    /* 3. Fast Angle Tabs (Qubora Glass Pills) */
    .sm-angle-deck {
      padding: 9px 16px;
      background: #070A08;
      border-bottom: 1px solid #141E17;
      display: flex;
      gap: 6px;
    }

    .sm-angle-tab {
      flex: 1;
      background: #0B100D;
      border: 1px solid #16241A;
      border-radius: 8px;
      padding: 6px 8px;
      font-size: 11.5px;
      font-weight: 600;
      color: #71717A;
      cursor: pointer;
      text-align: center;
      transition: all 0.15s ease;
      white-space: nowrap;
      letter-spacing: -0.01em;
    }

    .sm-angle-tab:hover {
      color: #F8FAFC;
      border-color: #22C55E44;
    }

    .sm-angle-tab.active {
      background: #0F1711;
      color: #34D399;
      font-weight: 700;
      border: 1px solid #10B981;
      box-shadow: 0 0 12px rgba(16, 185, 129, 0.25);
    }

    /* 4. Scrollable Script Canvas with Qubora 3-Tone Typography */
    .sm-canvas-area {
      flex: 1;
      overflow-y: auto;
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .sm-canvas-area::-webkit-scrollbar {
      width: 4px;
    }

    .sm-canvas-area::-webkit-scrollbar-thumb {
      background: #1C2B20;
      border-radius: 4px;
    }

    /* Script Block Card (Qubora Card Surface) */
    .sm-frame-card {
      background: #0A0E0B;
      border: 1px solid #16221A;
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
      transition: border-color 0.15s ease;
    }

    .sm-frame-card:hover {
      border-color: #22C55E44;
    }

    .sm-frame-header {
      padding: 8px 12px;
      background: #0C120D;
      border-bottom: 1px solid #141E17;
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
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }

    .sm-title-hook { color: #34D399; }
    .sm-title-body { color: #8CE4B0; }
    .sm-title-cta  { color: #34D399; }

    .sm-copy-part-btn {
      background: #0E1410;
      border: 1px solid #1C2B20;
      color: #8CE4B0;
      cursor: pointer;
      padding: 2px 7px;
      border-radius: 5px;
      font-size: 10.5px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 3px;
      transition: all 0.15s ease;
    }

    .sm-copy-part-btn:hover {
      background: #141E17;
      color: #FFFFFF;
      border-color: #34D399;
    }

    /* Qubora 3-Tone Typography in Action */
    .sm-frame-editor {
      padding: 12px 14px;
      font-size: 13.5px;
      line-height: 1.6;
      outline: none;
      cursor: text;
      white-space: pre-wrap;
      word-break: break-word;
      min-height: 52px;
    }

    .sm-hook-lead {
      color: #FFFFFF;
      font-weight: 700;
    }

    .sm-hook-highlight {
      color: #34D399;
      font-weight: 700;
      text-shadow: 0 0 12px rgba(52, 211, 153, 0.4);
    }

    .sm-hook-tail {
      color: #9CA3AF;
      font-weight: 450;
    }

    .sm-body-text {
      color: #9CA3AF;
      font-weight: 450;
    }

    .sm-cta-text {
      color: #8CE4B0;
      font-weight: 600;
    }

    /* Hashtags Box */
    .sm-hashtags-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #0A0E0B;
      border: 1px solid #16221A;
      border-radius: 8px;
      padding: 8px 12px;
      gap: 8px;
    }

    .sm-hashtags-text {
      font-size: 11px;
      color: #34D399;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .sm-copy-tags-btn {
      background: #0E1410;
      border: 1px solid #1C2B20;
      color: #8CE4B0;
      border-radius: 5px;
      padding: 3px 8px;
      font-size: 10.5px;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease;
    }

    .sm-copy-tags-btn:hover {
      background: #141E17;
      color: #FFFFFF;
      border-color: #34D399;
    }

    /* 5. Qubora Action Deck (Glowing Emerald Studio Controls) */
    .sm-footer {
      padding: 14px 16px;
      background: #080C09;
      border-top: 1px solid #141E17;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    /* Option 1: 1-Click AI Voiceover (.mp3) - Radiant Qubora Emerald */
    .sm-btn-voiceover {
      width: 100%;
      background: linear-gradient(135deg, #059669 0%, #10B981 50%, #34D399 100%);
      color: #040805;
      border: none;
      border-radius: 10px;
      padding: 12px 16px;
      font-size: 13.5px;
      font-weight: 750;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 4px 22px rgba(16, 185, 129, 0.45);
      letter-spacing: -0.01em;
    }

    .sm-btn-voiceover:hover {
      background: linear-gradient(135deg, #10B981 0%, #34D399 50%, #6EE7B7 100%);
      transform: translateY(-1px);
      box-shadow: 0 6px 28px rgba(52, 211, 153, 0.6);
      color: #020402;
    }

    .sm-btn-voiceover:active {
      transform: translateY(0);
      box-shadow: 0 2px 14px rgba(16, 185, 129, 0.4);
    }

    /* Option 2: Record Short with Webcam */
    .sm-btn-record {
      width: 100%;
      background: #0C120E;
      color: #D1FAE5;
      border: 1px solid rgba(16, 185, 129, 0.35);
      border-radius: 10px;
      padding: 10px 14px;
      font-size: 12.5px;
      font-weight: 650;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      transition: all 0.2s ease;
    }

    .sm-btn-record:hover {
      background: #121A15;
      color: #FFFFFF;
      border-color: #34D399;
      box-shadow: 0 2px 16px rgba(16, 185, 129, 0.25);
      transform: translateY(-1px);
    }

    .sm-btn-row-split {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .sm-btn-phone {
      background: #0C110E;
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #8CE4B0;
      border-radius: 8px;
      padding: 9px 12px;
      font-size: 12px;
      font-weight: 650;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      transition: all 0.15s ease;
    }

    .sm-btn-phone:hover {
      background: #101712;
      color: #FFFFFF;
      border-color: #34D399;
    }

    .sm-btn-copy {
      background: #0C110E;
      border: 1px solid #16221A;
      color: #9CA3AF;
      border-radius: 8px;
      padding: 9px 12px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      transition: all 0.15s ease;
    }

    .sm-btn-copy:hover {
      background: #101712;
      color: #FFFFFF;
      border-color: #22C55E44;
    }

    .sm-btn-copy.copied {
      background: #059669 !important;
      border-color: #10B981 !important;
      color: #FFFFFF !important;
    }

    /* Modal Overlays (Webcam Studio & QR Modal) */
    .sm-modal-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(6, 8, 6, 0.97);
      backdrop-filter: blur(10px);
      z-index: 500;
      display: none;
      flex-direction: column;
      overflow: hidden;
    }

    .sm-modal-overlay.active {
      display: flex;
    }

    .sm-modal-header {
      padding: 13px 18px;
      background: #080C09;
      border-bottom: 1px solid #141E17;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .sm-modal-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      gap: 7px;
    }

    /* CREATOR STUDIO VIEW (VIRAL CLIP SNIP & WEBCAM) */
    .sm-rec-mode-tabs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      padding: 10px 16px 4px 16px;
      background: #080C09;
      border-bottom: 1px solid #141E17;
    }

    .sm-rec-mode-tab {
      background: #0C120E;
      border: 1px solid #16241A;
      color: #9CA3AF;
      border-radius: 8px;
      padding: 8px 10px;
      font-size: 11.5px;
      font-weight: 650;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      transition: all 0.15s ease;
    }

    .sm-rec-mode-tab:hover {
      color: #FFFFFF;
      border-color: #34D399;
    }

    .sm-rec-mode-tab.active {
      background: rgba(16, 185, 129, 0.16);
      border-color: #10B981;
      color: #34D399;
      box-shadow: 0 0 12px rgba(16, 185, 129, 0.2);
    }

    .sm-webcam-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 16px;
      gap: 12px;
      overflow-y: auto;
    }

    .sm-camera-box {
      position: relative;
      width: 100%;
      height: 220px;
      background: #000000;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #16241A;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #smWebcamFeed, #smRecordedPlayback {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .sm-snip-helper-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at center, rgba(16, 185, 129, 0.08) 0%, rgba(0, 0, 0, 0.88) 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 16px;
      gap: 8px;
      z-index: 5;
    }

    .sm-snip-helper-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.4);
      color: #34D399;
      font-size: 10px;
      font-weight: 700;
      padding: 3px 9px;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .sm-snip-helper-title {
      font-size: 13px;
      font-weight: 700;
      color: #FFFFFF;
      max-width: 280px;
      line-height: 1.4;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .sm-snip-helper-sub {
      font-size: 11px;
      color: #9CA3AF;
      max-width: 260px;
      line-height: 1.4;
    }

    .sm-rec-indicator {
      position: absolute;
      top: 10px;
      left: 10px;
      background: rgba(220, 38, 38, 0.88);
      color: #FFFFFF;
      font-size: 10px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 9999px;
      display: none;
      align-items: center;
      gap: 5px;
      z-index: 10;
    }

    .sm-rec-indicator.active {
      display: inline-flex;
    }

    .sm-rec-timer {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.75);
      color: #34D399;
      font-size: 11px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 6px;
      font-variant-numeric: tabular-nums;
      z-index: 10;
      border: 1px solid rgba(16, 185, 129, 0.3);
    }

    /* Scrolling Teleprompter Inside Camera Studio */
    .sm-teleprompter-glass {
      background: #0A0E0B;
      border: 1px solid #16221A;
      border-radius: 10px;
      padding: 12px 14px;
      max-height: 120px;
      overflow-y: auto;
      font-size: 12.5px;
      line-height: 1.55;
      color: #F8FAFC;
      text-align: center;
      font-weight: 500;
    }

    .sm-teleprompter-glass::-webkit-scrollbar {
      width: 3px;
    }

    /* Snip Controls Panel */
    .sm-snip-controls-panel {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: auto;
    }

    .sm-snip-presets-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 6px;
    }

    .sm-btn-snip-preset {
      background: linear-gradient(135deg, #059669 0%, #10B981 100%);
      color: #040805;
      border: none;
      border-radius: 8px;
      padding: 10px 4px;
      font-size: 11.5px;
      font-weight: 750;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
      box-shadow: 0 2px 10px rgba(16, 185, 129, 0.3);
    }

    .sm-btn-snip-preset:hover {
      background: linear-gradient(135deg, #10B981 0%, #34D399 100%);
      transform: translateY(-1px);
    }

    .sm-btn-snip-custom {
      background: #0C120E;
      color: #E2E8F0;
      border: 1px solid rgba(16, 185, 129, 0.4);
      border-radius: 8px;
      padding: 10px 4px;
      font-size: 11.5px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }

    .sm-btn-snip-custom:hover {
      background: #141E17;
      color: #FFFFFF;
      border-color: #34D399;
    }

    .sm-snip-audio-row {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2px 0;
    }

    .sm-checkbox-label {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      color: #9CA3AF;
      cursor: pointer;
      user-select: none;
    }

    .sm-checkbox-label input[type="checkbox"] {
      accent-color: #10B981;
      cursor: pointer;
      width: 13px;
      height: 13px;
    }

    /* Snip Review Panel (After Snip Capture) */
    .sm-snip-review-panel {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: auto;
    }

    .sm-btn-review-syncplay {
      width: 100%;
      background: linear-gradient(135deg, #059669 0%, #10B981 50%, #34D399 100%);
      color: #040805;
      border: none;
      border-radius: 9px;
      padding: 11px 14px;
      font-size: 13px;
      font-weight: 750;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      box-shadow: 0 4px 18px rgba(16, 185, 129, 0.45);
      transition: all 0.2s ease;
    }

    .sm-btn-review-syncplay:hover {
      background: linear-gradient(135deg, #10B981 0%, #34D399 50%, #6EE7B7 100%);
      transform: translateY(-1px);
    }

    .sm-snip-download-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .sm-btn-download-clip {
      background: #0C110E;
      border: 1px solid rgba(16, 185, 129, 0.45);
      color: #34D399;
      border-radius: 8px;
      padding: 10px 8px;
      font-size: 11.5px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      transition: all 0.15s ease;
    }

    .sm-btn-download-clip:hover {
      background: #141E17;
      color: #FFFFFF;
      border-color: #34D399;
    }

    .sm-btn-download-voice-fast {
      background: #0C110E;
      border: 1px solid rgba(16, 185, 129, 0.45);
      color: #8CE4B0;
      border-radius: 8px;
      padding: 10px 8px;
      font-size: 11.5px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      transition: all 0.15s ease;
    }

    .sm-btn-download-voice-fast:hover {
      background: #141E17;
      color: #FFFFFF;
      border-color: #34D399;
    }

    .sm-btn-resnip {
      background: transparent;
      border: 1px solid #1A261E;
      color: #71717A;
      border-radius: 8px;
      padding: 7px;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      transition: all 0.15s ease;
    }

    .sm-btn-resnip:hover {
      color: #E2E8F0;
      border-color: #34D399;
    }

    /* Webcam Controls */
    .sm-webcam-controls {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: auto;
    }

    .sm-btn-start-rec {
      width: 100%;
      background: linear-gradient(135deg, #059669 0%, #10B981 100%);
      color: #FFFFFF;
      border: none;
      border-radius: 10px;
      padding: 12px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
    }

    .sm-btn-start-rec:hover {
      background: linear-gradient(135deg, #10B981 0%, #34D399 100%);
    }

    .sm-btn-stop-rec {
      width: 100%;
      background: #27272A;
      color: #FFFFFF;
      border: none;
      border-radius: 10px;
      padding: 12px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      display: none;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .sm-btn-download-video {
      width: 100%;
      background: linear-gradient(135deg, #059669 0%, #10B981 100%);
      color: #FFFFFF;
      border: none;
      border-radius: 10px;
      padding: 12px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      display: none;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
    }

    /* QR CODE MODAL VIEW */
    .sm-qr-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px 22px;
      text-align: center;
      gap: 14px;
    }

    .sm-qr-frame {
      background: #FFFFFF;
      padding: 10px;
      border-radius: 14px;
      box-shadow: 0 0 32px rgba(52, 211, 153, 0.35);
      width: 212px;
      height: 212px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .sm-qr-frame img {
      width: 192px;
      height: 192px;
      display: block;
      image-rendering: -webkit-optimize-contrast;
      image-rendering: pixelated;
    }

    .sm-qr-instructions {
      font-size: 12.5px;
      color: #9CA3AF;
      max-width: 320px;
      line-height: 1.5;
    }

    .sm-qr-actions-row {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
    }

    .sm-btn-open-direct {
      flex: 1;
      background: linear-gradient(135deg, #059669 0%, #10B981 100%);
      color: #FFFFFF;
      border: none;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      box-shadow: 0 2px 14px rgba(16, 185, 129, 0.35);
      transition: all 0.15s ease;
    }

    .sm-btn-open-direct:hover {
      background: linear-gradient(135deg, #10B981 0%, #34D399 100%);
    }

    .sm-btn-copy-link {
      flex: 1;
      background: #0C110E;
      border: 1px solid rgba(16, 185, 129, 0.35);
      color: #34D399;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 12.5px;
      font-weight: 650;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    .sm-btn-copy-link:hover {
      background: #141E17;
      color: #FFFFFF;
      border-color: #34D399;
    }

    .sm-qr-link-box {
      width: 100%;
    }

    .sm-qr-link-box input {
      width: 100%;
      background: #0A0E0B;
      border: 1px solid #16221A;
      color: #71717A;
      border-radius: 6px;
      padding: 6px 10px;
      font-size: 10.5px;
      font-family: monospace;
      outline: none;
      text-overflow: ellipsis;
      cursor: pointer;
    }

    .sm-qr-link-box input:focus {
      color: #8CE4B0;
      border-color: #10B981;
    }

    /* AI VOICEOVER MODAL VIEW (FACELESS CREATOR STUDIO) */
    .sm-voice-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 16px 18px;
      gap: 12px;
      overflow-y: auto;
    }

    .sm-voice-hero {
      background: #000000;
      border: 1px solid #16241A;
      border-radius: 12px;
      padding: 22px 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      position: relative;
      box-shadow: inset 0 0 24px rgba(16, 185, 129, 0.08);
    }

    .sm-soundwaves {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      height: 48px;
      margin-bottom: 12px;
    }

    .sm-soundwaves .bar {
      width: 4px;
      height: 12px;
      background: #10B981;
      border-radius: 4px;
      transition: height 0.15s ease, background 0.15s ease;
    }

    .sm-soundwaves.playing .bar {
      animation: soundwaveBounce 0.8s infinite ease-in-out alternate;
    }

    .sm-soundwaves.loading .bar {
      animation: soundwavePulse 0.5s infinite ease-in-out alternate;
    }

    @keyframes soundwaveBounce {
      0% { height: 8px; opacity: 0.4; }
      50% { height: 44px; opacity: 1; background: #34D399; }
      100% { height: 14px; opacity: 0.6; }
    }

    @keyframes soundwavePulse {
      0% { height: 6px; opacity: 0.3; }
      100% { height: 28px; opacity: 0.9; background: #10B981; }
    }

    .sm-soundwaves .bar:nth-child(1) { animation-delay: 0.05s; }
    .sm-soundwaves .bar:nth-child(2) { animation-delay: 0.18s; }
    .sm-soundwaves .bar:nth-child(3) { animation-delay: 0.30s; }
    .sm-soundwaves .bar:nth-child(4) { animation-delay: 0.42s; }
    .sm-soundwaves .bar:nth-child(5) { animation-delay: 0.54s; }
    .sm-soundwaves .bar:nth-child(6) { animation-delay: 0.66s; }
    .sm-soundwaves .bar:nth-child(7) { animation-delay: 0.54s; }
    .sm-soundwaves .bar:nth-child(8) { animation-delay: 0.42s; }
    .sm-soundwaves .bar:nth-child(9) { animation-delay: 0.30s; }
    .sm-soundwaves .bar:nth-child(10) { animation-delay: 0.18s; }
    .sm-soundwaves .bar:nth-child(11) { animation-delay: 0.10s; }
    .sm-soundwaves .bar:nth-child(12) { animation-delay: 0.05s; }

    .sm-voice-status {
      font-size: 14px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 3px;
      letter-spacing: -0.01em;
    }

    .sm-voice-substatus {
      font-size: 11.5px;
      color: #9CA3AF;
      max-width: 290px;
      line-height: 1.45;
    }

    .sm-voice-script-box {
      background: #0A0E0B;
      border: 1px solid #16221A;
      border-radius: 10px;
      padding: 12px 14px;
      max-height: 130px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .sm-voice-script-box::-webkit-scrollbar {
      width: 3px;
    }

    .sm-voice-script-label {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: #34D399;
      text-transform: uppercase;
    }

    .sm-voice-script-text {
      font-size: 12.5px;
      line-height: 1.55;
      color: #E2E8F0;
      user-select: text;
    }

    .sm-voice-controls {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: auto;
    }

    .sm-btn-generate-voice {
      width: 100%;
      background: linear-gradient(135deg, #059669 0%, #10B981 100%);
      color: #FFFFFF;
      border: none;
      border-radius: 10px;
      padding: 12px;
      font-size: 13.5px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow: 0 4px 18px rgba(16, 185, 129, 0.4);
      transition: all 0.2s ease;
    }

    .sm-btn-generate-voice:hover {
      background: linear-gradient(135deg, #10B981 0%, #34D399 100%);
    }

    .sm-btn-generate-voice:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .sm-voice-action-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .sm-btn-voice-play {
      background: #0C110E;
      border: 1px solid rgba(16, 185, 129, 0.4);
      color: #34D399;
      border-radius: 8px;
      padding: 11px 12px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    .sm-btn-voice-play:hover {
      background: #141E17;
      color: #FFFFFF;
      border-color: #34D399;
    }

    .sm-btn-voice-download {
      background: linear-gradient(135deg, #059669 0%, #10B981 100%);
      border: none;
      color: #FFFFFF;
      border-radius: 8px;
      padding: 11px 12px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      box-shadow: 0 2px 14px rgba(16, 185, 129, 0.35);
      transition: all 0.15s ease;
    }

    .sm-btn-voice-download:hover {
      background: linear-gradient(135deg, #10B981 0%, #34D399 100%);
    }

    /* Voice Selection & Volume Controls */
    .sm-voice-select-card {
      background: #090E0B;
      border: 1px solid #16241B;
      border-radius: 10px;
      padding: 10px 12px;
      display: flex;
      flex-direction: column;
      gap: 7px;
    }

    .sm-voice-select-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
    }

    .sm-voice-select-title {
      font-size: 11px;
      font-weight: 700;
      color: #34D399;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .sm-voice-chip {
      font-size: 9.5px;
      font-weight: 600;
      color: #6EE7B7;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.25);
      padding: 2px 7px;
      border-radius: 9999px;
    }

    .sm-voice-dropdown {
      width: 100%;
      background: #040604;
      border: 1px solid #1E3324;
      border-radius: 7px;
      padding: 8px 10px;
      color: #FFFFFF;
      font-size: 12px;
      font-weight: 600;
      outline: none;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
    }

    .sm-voice-dropdown:focus {
      border-color: #10B981;
      box-shadow: 0 0 10px rgba(16, 185, 129, 0.35);
    }

    .sm-voice-dropdown optgroup {
      background: #060907;
      color: #34D399;
      font-weight: 700;
    }

    .sm-voice-dropdown option {
      background: #080D09;
      color: #E2E8F0;
      padding: 6px 10px;
    }

    /* Volume Control Bars */
    .sm-voice-volume-panel {
      display: flex;
      align-items: center;
      gap: 10px;
      background: #070B08;
      border: 1px solid #142018;
      border-radius: 8px;
      padding: 7px 12px;
    }

    .sm-vol-icon-btn {
      background: transparent;
      border: none;
      color: #34D399;
      cursor: pointer;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      user-select: none;
      transition: transform 0.15s ease;
    }

    .sm-vol-icon-btn:hover {
      transform: scale(1.15);
    }

    .sm-vol-slider-wrap {
      flex: 1;
      display: flex;
      align-items: center;
    }

    .sm-volume-slider {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 5px;
      background: #142217;
      border-radius: 9999px;
      outline: none;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .sm-volume-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 8px rgba(16, 185, 129, 0.8);
      cursor: pointer;
      border: 2px solid #FFFFFF;
      transition: all 0.15s ease;
    }

    .sm-volume-slider::-webkit-slider-thumb:hover {
      transform: scale(1.2);
      background: #34D399;
    }

    .sm-vol-number {
      font-size: 11px;
      font-weight: 700;
      color: #9CA3AF;
      min-width: 34px;
      text-align: right;
      font-variant-numeric: tabular-nums;
    }

    /* Snipper Dual-Track Volume Matrix */
    .sm-snip-volume-matrix {
      background: #070A08;
      border: 1px solid #141F17;
      border-radius: 8px;
      padding: 8px 11px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 4px;
    }

    .sm-snip-volume-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .sm-snip-vol-label {
      font-size: 10.5px;
      font-weight: 600;
      color: #94A3B8;
      min-width: 78px;
    }

    .sm-slider-mini {
      flex: 1;
      height: 4px;
    }

    .sm-slider-mini::-webkit-slider-thumb {
      width: 11px;
      height: 11px;
    }

    .sm-snip-vol-val {
      font-size: 10px;
      font-weight: 700;
      color: #34D399;
      min-width: 36px;
      text-align: right;
    }

    /* Toast Notification */
    .sm-toast {
      position: absolute;
      bottom: 88px;
      left: 50%;
      transform: translateX(-50%) translateY(10px);
      background: #0A0E0B;
      border: 1px solid #10B981;
      color: #FFFFFF;
      padding: 7px 16px;
      border-radius: 9999px;
      font-size: 11.5px;
      font-weight: 650;
      box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
      opacity: 0;
      pointer-events: none;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      align-items: center;
      gap: 6px;
      z-index: 600;
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
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M12 7v5l3 3"></path>
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

  function getMobileCompanionUrl() {
    const params = new URLSearchParams({
      t: currentContext.title || 'Viral Video',
      a: activeStyleIndex.toString(),
      u: currentContext.url || window.location.href
    });
    return `${WORKER_BASE}/p?${params.toString()}`;
  }

  function prepareTtsText(rawText) {
    if (!rawText) return '';
    return rawText
      .replace(/#[\w-]+/g, '') // remove hashtags
      .replace(/https?:\/\/\S+/g, '') // remove URLs
      .replace(/[*_~`\[\]\(\)\{\}\<\>\|\\]/g, ' ') // remove markdown brackets & formatting
      .replace(/\s+/g, ' ')
      .trim();
  }

  async function fetchAudioTts(rawText, voiceId = selectedVoiceId) {
    const cleanText = prepareTtsText(rawText);
    if (!cleanText) {
      throw new Error('Please enter script text to generate voiceover narration.');
    }

    // Attempt 1: Direct fetch to Cloudflare Worker TTS endpoint
    try {
      const res = await fetch(`${WORKER_BASE}/api/tts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText, voice: voiceId })
      });
      if (res.ok) {
        return await res.blob();
      }
    } catch (e) {
      console.warn('[StitchMatrix] Direct TTS fetch failed, attempting service worker proxy...', e);
    }

    // Attempt 2: Background Service Worker Proxy (immune to web page CSP)
    return new Promise((resolve, reject) => {
      if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
        chrome.runtime.sendMessage({ action: 'API_PROXY_TTS', text: cleanText, voice: voiceId }, (response) => {
          if (chrome.runtime.lastError) {
            return reject(new Error(chrome.runtime.lastError.message));
          }
          if (!response || !response.success) {
            return reject(new Error(response?.error || 'TTS audio generation failed'));
          }
          try {
            const binary = atob(response.base64);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
              bytes[i] = binary.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: 'audio/mpeg' });
            resolve(blob);
          } catch (err) {
            reject(err);
          }
        });
      } else {
        reject(new Error('Extension runtime communication unavailable'));
      }
    });
  }

  // Smooth live in-place update without closing the drawer
  function updateLiveContent(animateFlash) {
    const curScript = generatedScripts[activeStyleIndex] || generatedScripts[0];

    const titleEl = sidebar.querySelector('#smDetectedTitle');
    const targetEl = sidebar.querySelector('#smMetaTarget');
    const authorEl = sidebar.querySelector('#smMetaAuthor');
    const viewsEl = sidebar.querySelector('#smMetaViews');
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
    if (viewsEl) viewsEl.textContent = currentContext.views || 'Trending';
    if (scoreEl) scoreEl.textContent = curScript.viralScore;

    // Synchronize snip overlay source information
    const snipTitleEl = sidebar.querySelector('#smSnipSourceTitle');
    const snipTargetEl = sidebar.querySelector('#smSnipMetaTarget');
    const snipAuthorEl = sidebar.querySelector('#smSnipMetaAuthor');
    const snipViewsEl = sidebar.querySelector('#smSnipMetaViews');
    if (snipTitleEl) snipTitleEl.textContent = `"${currentContext.displayTitle}"`;
    if (snipTargetEl) snipTargetEl.textContent = currentContext.platform;
    if (snipAuthorEl) snipAuthorEl.textContent = currentContext.author;
    if (snipViewsEl) snipViewsEl.textContent = currentContext.views || 'Trending';

    if (hookEl) {
      hookEl.innerHTML = `
        <span class="sm-hook-lead">${curScript.hookLead}</span>
        <span class="sm-hook-highlight">${curScript.hookHighlight}</span>
        <span class="sm-hook-tail">${curScript.hookTail}</span>
      `;
    }
    if (bodyEl) bodyEl.textContent = curScript.body;
    if (ctaEl) ctaEl.textContent = curScript.cta;
    if (tagsEl) tagsEl.textContent = curScript.hashtags;

    if (animateFlash && bannerEl) {
      bannerEl.classList.add('pulse-active');
      setTimeout(() => bannerEl.classList.remove('pulse-active'), 500);
    }

    // Also update QR modal if currently open
    const phoneModal = sidebar.querySelector('#smPhoneModal');
    const qrImage = sidebar.querySelector('#smQrImage');
    const mobileLinkInput = sidebar.querySelector('#smMobileLinkInput');
    if (phoneModal && phoneModal.classList.contains('active') && qrImage && mobileLinkInput) {
      const mobileUrl = getMobileCompanionUrl();
      qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&margin=2&data=${encodeURIComponent(mobileUrl)}`;
      mobileLinkInput.value = mobileUrl;
    }
  }

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
      showToast(`⚡ Remixed: "${currentContext.displayTitle.slice(0, 26)}..."`);
    }
  }

  function renderSidebar() {
    const curScript = generatedScripts[activeStyleIndex] || generatedScripts[0];

    sidebar.innerHTML = `
      <!-- 1. Sleek Qubora Header -->
      <header class="sm-header">
        <div class="sm-header-brand">
          <div class="sm-qubora-logo">
            <!-- Qubora Inspired Organic Emerald Ring SVG -->
            <svg viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="10" stroke="#10B981" stroke-width="2" stroke-dasharray="32 18" stroke-linecap="round"/>
              <circle cx="14" cy="14" r="6" stroke="#34D399" stroke-width="1.5" stroke-dasharray="18 12" stroke-linecap="round" transform="rotate(45 14 14)"/>
              <circle cx="14" cy="14" r="2.5" fill="#4EFA94"/>
            </svg>
          </div>
          <div>
            <div class="sm-header-title">Stitch<span>Matrix</span></div>
          </div>
        </div>
        <div class="sm-header-actions">
          <span class="sm-auto-badge" title="Live automatic video tracking active">
            <span class="sm-pulse-dot"></span>
            <span>Live Sync</span>
          </span>
          <button class="sm-close-btn" id="smCloseBtn" title="Close Studio (Esc)">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      <!-- 2. Active Video Ingestion Card with Ambient Green Glow -->
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
          <span class="sm-meta-views-pill">Views: <strong id="smMetaViews">${currentContext.views || 'Trending'}</strong></span>
          <span>•</span>
          <span style="color: #34D399;">Viral Potential: <strong id="smMetaScore">${curScript.viralScore}</strong></span>
        </div>
      </div>

      <!-- 3. Fast Angle Tabs -->
      <div class="sm-angle-deck">
        ${generatedScripts.map((s, idx) => `
          <button class="sm-angle-tab ${idx === activeStyleIndex ? 'active' : ''}" data-idx="${idx}" title="${s.subtitle}">
            ${s.title}
          </button>
        `).join('')}
      </div>

      <!-- 4. Scrollable Script Canvas with 3-Tone Typography -->
      <div class="sm-canvas-area">
        
        <!-- Part 1: The Hook -->
        <div class="sm-frame-card">
          <div class="sm-frame-header">
            <div class="sm-frame-title sm-title-hook">
              <span>01 · The Viral Hook (0–3s)</span>
            </div>
            <button class="sm-copy-part-btn" id="smCopyHookBtn" title="Copy hook only">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>Copy</span>
            </button>
          </div>
          <div class="sm-frame-editor" id="smHookText" contenteditable="true" spellcheck="false">
            <span class="sm-hook-lead">${curScript.hookLead}</span>
            <span class="sm-hook-highlight">${curScript.hookHighlight}</span>
            <span class="sm-hook-tail">${curScript.hookTail}</span>
          </div>
        </div>

        <!-- Part 2: The Core Body -->
        <div class="sm-frame-card">
          <div class="sm-frame-header">
            <div class="sm-frame-title sm-title-body">
              <span>02 · The Core Story (4–25s)</span>
            </div>
            <button class="sm-copy-part-btn" id="smCopyBodyBtn" title="Copy body only">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>Copy</span>
            </button>
          </div>
          <div class="sm-frame-editor sm-body-text" id="smBodyText" contenteditable="true" spellcheck="false">${curScript.body}</div>
        </div>

        <!-- Part 3: Call to Action -->
        <div class="sm-frame-card">
          <div class="sm-frame-header">
            <div class="sm-frame-title sm-title-cta">
              <span>03 · Retention Call-To-Action (26–35s)</span>
            </div>
            <button class="sm-copy-part-btn" id="smCopyCtaBtn" title="Copy CTA only">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>Copy</span>
            </button>
          </div>
          <div class="sm-frame-editor sm-cta-text" id="smCtaText" contenteditable="true" spellcheck="false">${curScript.cta}</div>
        </div>

        <!-- Trending Hashtags -->
        <div class="sm-hashtags-row">
          <span class="sm-hashtags-text" id="smHashtagDisplay">${curScript.hashtags}</span>
          <button class="sm-copy-tags-btn" id="smCopyHashtagsBtn">Copy Tags</button>
        </div>

      </div>

      <!-- 5. Qubora Glowing Action Deck -->
      <footer class="sm-footer">
        <!-- Option 1: 1-Click AI Voiceover (.mp3) - Faceless Creator Studio -->
        <button class="sm-btn-voiceover" id="smOpenVoiceoverBtn" title="Generate studio AI voiceover audio (.mp3) in 1 click (No camera, no mic)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
          </svg>
          <span>🔊 Generate AI Voiceover (.mp3)</span>
        </button>

        <!-- Option 2: Record / Snip Viral Video Clip -->
        <button class="sm-btn-record" id="smOpenRecordBtn" title="Snip viral moments from video (Faceless) or record with webcam">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="6" cy="6" r="3"></circle>
            <circle cx="6" cy="18" r="3"></circle>
            <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
            <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
            <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
          </svg>
          <span>✂️ Snip Viral Clip / Record Video</span>
        </button>

        <!-- Option 2 & 3: Send to Phone OR Copy Script -->
        <div class="sm-btn-row-split">
          <button class="sm-btn-phone" id="smOpenPhoneBtn" title="Scan QR code to open script & video on your phone">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12.01" y2="18"></line>
            </svg>
            <span>Send to Phone (QR)</span>
          </button>

          <button class="sm-btn-copy" id="smCopyFullBtn" title="Copy Full Script (Alt+C)">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span id="smCopyFullText">Copy Full Script</span>
          </button>
        </div>
      </footer>

      <!-- CREATOR STUDIO MODAL: VIRAL CLIP SNIPPER & WEBCAM TELEPROMPTER -->
      <div class="sm-modal-overlay" id="smWebcamModal">
        <div class="sm-modal-header">
          <div class="sm-modal-title">
            <span class="sm-pulse-dot" style="background:#10B981;"></span>
            <span id="smRecordModalTitle">Viral Clip Snip & Recording Studio</span>
          </div>
          <button class="sm-close-btn" id="smCloseWebcamBtn">✕</button>
        </div>

        <!-- Mode Switcher Tabs: Snip Viral Video (Faceless) vs Webcam (Face) -->
        <div class="sm-rec-mode-tabs">
          <button class="sm-rec-mode-tab active" id="smTabSnipVideo" title="Snip trending video playing on screen (Faceless Mode)">
            <span>✂️ Snip Viral Video (Faceless)</span>
          </button>
          <button class="sm-rec-mode-tab" id="smTabWebcam" title="Record with your webcam and teleprompter (Face Mode)">
            <span>📹 Webcam Teleprompter</span>
          </button>
        </div>

        <div class="sm-webcam-body">
          <div class="sm-camera-box" id="smCameraBox">
            <video id="smWebcamFeed" autoplay muted playsinline style="display:none;"></video>
            <video id="smRecordedPlayback" controls playsinline style="display: none;"></video>

            <!-- Snip Helper Overlay (Shown in Snip Mode before recording) -->
            <div class="sm-snip-helper-overlay" id="smSnipHelperOverlay">
              <div class="sm-snip-helper-badge">
                <span class="sm-pulse-dot"></span>
                <span>Active Video Source</span>
              </div>
              <div class="sm-snip-helper-title" id="smSnipSourceTitle">
                "${currentContext.displayTitle}"
              </div>
              <div class="sm-snip-helper-meta" id="smSnipSourceMeta" style="font-size: 11px; color: #94A3B8; margin-top: 5px; display: flex; align-items: center; justify-content: center; gap: 7px; flex-wrap: wrap;">
                <span>Target: <strong style="color: #E2E8F0;" id="smSnipMetaTarget">${currentContext.platform}</strong></span>
                <span>•</span>
                <span>Creator: <strong style="color: #E2E8F0;" id="smSnipMetaAuthor">${currentContext.author}</strong></span>
                <span>•</span>
                <span class="sm-meta-views-pill">Views: <strong id="smSnipMetaViews">${currentContext.views || 'Trending'}</strong></span>
              </div>
              <div class="sm-snip-helper-sub" style="margin-top: 6px;">
                Click a snip button below to capture the viral moment directly from this player.
              </div>
            </div>

            <div class="sm-rec-indicator" id="smRecBadge">
              <span class="sm-pulse-dot" style="background:#FFFFFF;"></span>
              <span id="smRecBadgeText">RECORDING</span>
            </div>
            <div class="sm-rec-timer" id="smRecTimer">00:00 / 00:05</div>
          </div>

          <div class="sm-teleprompter-glass" id="smTeleprompterText">
            <strong style="color: #34D399; display: block; margin-bottom: 4px;">Part 1 (The Hook):</strong>
            <span id="smCamHook">${curScript.hookLead}${curScript.hookHighlight}${curScript.hookTail}</span>
            <br><br>
            <strong style="color: #8CE4B0; display: block; margin-bottom: 4px;">Part 2 (The Story):</strong>
            <span id="smCamBody">${curScript.body}</span>
            <br><br>
            <strong style="color: #34D399; display: block; margin-bottom: 4px;">Part 3 (Call-to-Action):</strong>
            <span id="smCamCta">${curScript.cta}</span>
          </div>

          <!-- Controls Panel 1: Snip Controls (Default in Faceless Mode) -->
          <div class="sm-snip-controls-panel" id="smSnipControlsPanel">
            <div class="sm-snip-presets-row">
              <button class="sm-btn-snip-preset" id="smSnip5sBtn" title="Snip the first 5s of the viral hook">
                <span>⚡ Snip 5s Hook</span>
              </button>
              <button class="sm-btn-snip-preset" id="smSnip10sBtn" title="Snip a 10s viral clip">
                <span>⚡ Snip 10s Clip</span>
              </button>
              <button class="sm-btn-snip-custom" id="smSnipCustomBtn" title="Start and stop manual snip">
                <span id="smSnipCustomText">● Custom Snip</span>
              </button>
            </div>

            <div class="sm-snip-audio-row">
              <label class="sm-checkbox-label">
                <input type="checkbox" id="smMuteOriginalAudio" checked>
                <span>Mute original audio (Ready for AI Voiceover)</span>
              </label>
            </div>
          </div>

          <!-- Controls Panel 2: Review / Download Panel (Shown after a clip is snipped) -->
          <div class="sm-snip-review-panel" id="smSnipReviewPanel" style="display: none;">
            <button class="sm-btn-review-syncplay" id="smSyncPlayBtn" title="Play snipped video with AI Voiceover simultaneously">
              <span id="smSyncPlayIcon">▶</span>
              <span id="smSyncPlayText">Play with AI Voiceover</span>
            </button>

            <!-- Dual-Track Volume Mixer -->
            <div class="sm-snip-volume-matrix">
              <div class="sm-snip-volume-row">
                <span class="sm-snip-vol-label">🎙️ Voiceover:</span>
                <input type="range" class="sm-volume-slider sm-slider-mini" id="smSnipVoiceVolSlider" min="0" max="100" value="${Math.round(voiceVolume * 100)}" title="AI Voiceover volume">
                <span class="sm-snip-vol-val" id="smSnipVoiceVolVal">${Math.round(voiceVolume * 100)}%</span>
              </div>
              <div class="sm-snip-volume-row">
                <span class="sm-snip-vol-label">🎬 Video Sound:</span>
                <input type="range" class="sm-volume-slider sm-slider-mini" id="smSnipVideoVolSlider" min="0" max="100" value="0" title="Original Video volume (0% = Muted)">
                <span class="sm-snip-vol-val" id="smSnipVideoVolVal">Muted</span>
              </div>
            </div>
            
            <div class="sm-snip-download-grid">
              <button class="sm-btn-download-clip" id="smDownloadClipBtn" title="Download pure HD video clip (.webm)">
                <span>💾 Video Clip (.webm)</span>
              </button>
              <button class="sm-btn-download-voice-fast" id="smDownloadVoiceFastBtn" title="Download AI Voiceover narration (.mp3)">
                <span>🔊 Voiceover (.mp3)</span>
              </button>
            </div>

            <button class="sm-btn-resnip" id="smReSnipBtn" title="Discard and snip another clip">
              <span>🔄 Snip Another Clip</span>
            </button>
          </div>

          <!-- Controls Panel 3: Webcam Controls (Shown only in Webcam tab) -->
          <div class="sm-webcam-controls" id="smWebcamControlsPanel" style="display: none;">
            <button class="sm-btn-start-rec" id="smStartRecBtn">
              <span>Start 30s Recording</span>
            </button>
            <button class="sm-btn-stop-rec" id="smStopRecBtn">
              <span>⏹ Stop & Review</span>
            </button>
            <button class="sm-btn-download-video" id="smDownloadVideoBtn">
              <span>💾 Download Webcam Video File</span>
            </button>
          </div>
        </div>
      </div>

      <!-- SEND TO PHONE QR MODAL -->
      <div class="sm-modal-overlay" id="smPhoneModal">
        <div class="sm-modal-header">
          <div class="sm-modal-title">
            <span class="sm-pulse-dot"></span>
            <span>📱 Mobile Teleprompter & Link</span>
          </div>
          <button class="sm-close-btn" id="smClosePhoneBtn">✕</button>
        </div>

        <div class="sm-qr-body">
          <div class="sm-qr-frame">
            <img id="smQrImage" src="" alt="Teleprompter QR Code">
          </div>
          <div class="sm-qr-instructions">
            Scan with your phone's camera to open the teleprompter on mobile, or launch/copy the direct link below.
          </div>

          <div class="sm-qr-actions-row">
            <button class="sm-btn-open-direct" id="smOpenMobileDirectBtn" title="Open teleprompter page in a new browser tab right now">
              <span>🔗 Open in New Tab</span>
            </button>
            <button class="sm-btn-copy-link" id="smCopyMobileLinkBtn" title="Copy web link">
              <span id="smCopyMobileLinkText">📋 Copy Link</span>
            </button>
          </div>

          <div class="sm-qr-link-box">
            <input type="text" id="smMobileLinkInput" readonly spellcheck="false" title="Click to copy link" />
          </div>
        </div>
      </div>

      <!-- 1-CLICK AI VOICEOVER MODAL (FACELESS CREATOR STUDIO) -->
      <div class="sm-modal-overlay" id="smVoiceoverModal">
        <div class="sm-modal-header">
          <div class="sm-modal-title">
            <span class="sm-pulse-dot" style="background:#10B981;"></span>
            <span>AI Voiceover Studio (Faceless Creator)</span>
          </div>
          <button class="sm-close-btn" id="smCloseVoiceoverBtn">✕</button>
        </div>

        <div class="sm-voice-body">
          <div class="sm-voice-hero">
            <div class="sm-soundwaves" id="smSoundwaves">
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
            </div>

            <div class="sm-voice-status" id="smVoiceStatus">
              Ready to generate studio voiceover
            </div>
            <div class="sm-voice-substatus" id="smVoiceSubstatus">
              AI studio narrator reads your viral script with natural human pacing
            </div>
          </div>

          <!-- Voice Selection Card -->
          <div class="sm-voice-select-card">
            <div class="sm-voice-select-head">
              <span class="sm-voice-select-title">🎙️ AI Narrator Voice:</span>
              <span class="sm-voice-chip" id="smActiveVoiceBadge">Neural AI • Ultra-Realistic</span>
            </div>
            <div class="sm-voice-select-wrapper">
              <select class="sm-voice-dropdown" id="smVoiceSelect" title="Select ultra-realistic voice">
                <optgroup label="🚀 Neural AI Voices (Ultra-Realistic Deepgram Aura)">
                  <option value="orion" ${selectedVoiceId === 'orion' ? 'selected' : ''}>🔥 Orion — Viral Creator (Male • Punchy & High-Energy)</option>
                  <option value="asteria" ${selectedVoiceId === 'asteria' ? 'selected' : ''}>✨ Asteria — Studio Pro (Female • Clear & Polished)</option>
                  <option value="luna" ${selectedVoiceId === 'luna' ? 'selected' : ''}>🎙️ Luna — Conversational (Female • Warm & Natural)</option>
                  <option value="stella" ${selectedVoiceId === 'stella' ? 'selected' : ''}>⚡ Stella — Trendy & Upbeat (Female • Dynamic)</option>
                  <option value="perseus" ${selectedVoiceId === 'perseus' ? 'selected' : ''}>🎯 Perseus — Bold Hook (Male • Direct & Authoritative)</option>
                  <option value="arcas" ${selectedVoiceId === 'arcas' ? 'selected' : ''}>☕ Arcas — Smooth Storyteller (Male • Calm & Intellectual)</option>
                  <option value="athena" ${selectedVoiceId === 'athena' ? 'selected' : ''}>🏛️ Athena — Executive Leader (Female • Confident & Deep)</option>
                  <option value="angus" ${selectedVoiceId === 'angus' ? 'selected' : ''}>🇬🇧 Angus — British Documentary (Male • Rich & Thoughtful)</option>
                  <option value="orpheus" ${selectedVoiceId === 'orpheus' ? 'selected' : ''}>🎬 Orpheus — Cinematic Master (Male • Dramatic Hook)</option>
                  <option value="hera" ${selectedVoiceId === 'hera' ? 'selected' : ''}>💎 Hera — Sophisticated (Female • Crisp & Elegant)</option>
                </optgroup>
                <optgroup label="🌍 Global Dialects & International">
                  <option value="au" ${selectedVoiceId === 'au' ? 'selected' : ''}>🇦🇺 Liam — Australian Chill (Male • Casual Storyteller)</option>
                  <option value="es" ${selectedVoiceId === 'es' ? 'selected' : ''}>🇪🇸 Mateo — Spanish / International (Male • Melodic)</option>
                  <option value="fr" ${selectedVoiceId === 'fr' ? 'selected' : ''}>🇫🇷 Camille — French Elegance (Female • Chic European)</option>
                </optgroup>
              </select>
            </div>
          </div>

          <div class="sm-voice-script-box">
            <div class="sm-voice-script-label">NARRATION SCRIPT:</div>
            <div class="sm-voice-script-text" id="smVoiceScriptText"></div>
          </div>

          <audio id="smTtsAudio" preload="auto" style="display:none;"></audio>

          <div class="sm-voice-controls">
            <!-- Volume Control Bar -->
            <div class="sm-voice-volume-panel">
              <button class="sm-vol-icon-btn" id="smVoiceVolumeMuteBtn" title="Click to mute/unmute audio">
                <span id="smVoiceVolumeIcon">🔊</span>
              </button>
              <div class="sm-vol-slider-wrap">
                <input type="range" class="sm-volume-slider" id="smVoiceVolumeSlider" min="0" max="100" value="${Math.round(voiceVolume * 100)}" title="Adjust playback volume">
              </div>
              <span class="sm-vol-number" id="smVoiceVolumePercent">${Math.round(voiceVolume * 100)}%</span>
            </div>

            <div class="sm-voice-action-row" id="smVoiceActionRow" style="display: none;">
              <button class="sm-btn-voice-play" id="smVoicePlayBtn" title="Play or pause audio preview">
                <span id="smVoicePlayIcon">▶</span>
                <span id="smVoicePlayText">Play Preview</span>
              </button>
              <button class="sm-btn-voice-download" id="smVoiceDownloadBtn" title="Download finished studio-grade MP3 audio">
                <span>💾 Download .mp3</span>
              </button>
            </div>

            <button class="sm-btn-generate-voice" id="smGenerateVoiceBtn">
              <span id="smGenerateVoiceBtnText">⚡ Generate Voiceover Now</span>
            </button>
          </div>
        </div>
      </div>
    `;

    attachEventListeners();
  }

  function attachEventListeners() {
    const closeBtn = sidebar.querySelector('#smCloseBtn');
    if (closeBtn) closeBtn.onclick = toggleSidebar;

    const rescanBtn = sidebar.querySelector('#smRescanBtn');
    if (rescanBtn) {
      rescanBtn.onclick = () => {
        currentContext = detectVideoContext();
        generatedScripts = buildViralScripts(currentContext);
        updateLiveContent(true);
        showToast(`Remixed: "${currentContext.displayTitle.slice(0, 26)}..."`);
      };
    }

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

    const copyHookBtn = sidebar.querySelector('#smCopyHookBtn');
    if (copyHookBtn) {
      copyHookBtn.onclick = () => {
        const curScript = generatedScripts[activeStyleIndex];
        const fullHook = `${curScript.hookLead}${curScript.hookHighlight}${curScript.hookTail}`;
        navigator.clipboard.writeText(fullHook).then(() => showToast('Hook copied!'));
      };
    }

    const copyBodyBtn = sidebar.querySelector('#smCopyBodyBtn');
    if (copyBodyBtn) {
      copyBodyBtn.onclick = () => {
        const text = sidebar.querySelector('#smBodyText')?.textContent || '';
        navigator.clipboard.writeText(text).then(() => showToast('Body copied!'));
      };
    }

    const copyCtaBtn = sidebar.querySelector('#smCtaBtn');
    if (copyCtaBtn) {
      copyCtaBtn.onclick = () => {
        const text = sidebar.querySelector('#smCtaText')?.textContent || '';
        navigator.clipboard.writeText(text).then(() => showToast('CTA copied!'));
      };
    }

    const copyTagsBtn = sidebar.querySelector('#smCopyHashtagsBtn');
    if (copyTagsBtn) {
      copyTagsBtn.onclick = () => {
        const tags = sidebar.querySelector('#smHashtagDisplay')?.textContent || '';
        navigator.clipboard.writeText(tags).then(() => showToast('Hashtags copied!'));
      };
    }

    const copyFullBtn = sidebar.querySelector('#smCopyFullBtn');
    const copyFullText = sidebar.querySelector('#smCopyFullText');
    if (copyFullBtn && copyFullText) {
      copyFullBtn.onclick = () => executeCopyFullScript();
    }

    // CREATOR STUDIO (VIRAL CLIP SNIP & WEBCAM) LOGIC
    const openRecordBtn = sidebar.querySelector('#smOpenRecordBtn');
    const webcamModal = sidebar.querySelector('#smWebcamModal');
    const closeWebcamBtn = sidebar.querySelector('#smCloseWebcamBtn');
    const tabSnipVideo = sidebar.querySelector('#smTabSnipVideo');
    const tabWebcam = sidebar.querySelector('#smTabWebcam');
    const videoFeed = sidebar.querySelector('#smWebcamFeed');
    const recordedPlayback = sidebar.querySelector('#smRecordedPlayback');
    const snipHelperOverlay = sidebar.querySelector('#smSnipHelperOverlay');
    const snipSourceTitle = sidebar.querySelector('#smSnipSourceTitle');
    const recBadge = sidebar.querySelector('#smRecBadge');
    const recBadgeText = sidebar.querySelector('#smRecBadgeText');
    const recTimer = sidebar.querySelector('#smRecTimer');
    const prompterText = sidebar.querySelector('#smTeleprompterText');

    const snipControlsPanel = sidebar.querySelector('#smSnipControlsPanel');
    const snip5sBtn = sidebar.querySelector('#smSnip5sBtn');
    const snip10sBtn = sidebar.querySelector('#smSnip10sBtn');
    const snipCustomBtn = sidebar.querySelector('#smSnipCustomBtn');
    const snipCustomText = sidebar.querySelector('#smSnipCustomText');
    const muteOriginalAudio = sidebar.querySelector('#smMuteOriginalAudio');

    const snipReviewPanel = sidebar.querySelector('#smSnipReviewPanel');
    const syncPlayBtn = sidebar.querySelector('#smSyncPlayBtn');
    const syncPlayIcon = sidebar.querySelector('#smSyncPlayIcon');
    const syncPlayText = sidebar.querySelector('#smSyncPlayText');
    const downloadClipBtn = sidebar.querySelector('#smDownloadClipBtn');
    const downloadVoiceFastBtn = sidebar.querySelector('#smDownloadVoiceFastBtn');
    const reSnipBtn = sidebar.querySelector('#smReSnipBtn');

    const webcamControlsPanel = sidebar.querySelector('#smWebcamControlsPanel');
    const startRecBtn = sidebar.querySelector('#smStartRecBtn');
    const stopRecBtn = sidebar.querySelector('#smStopRecBtn');
    const downloadVideoBtn = sidebar.querySelector('#smDownloadVideoBtn');

    function stopSyncPlayback() {
      if (isSyncPlaying) {
        if (recordedPlayback) recordedPlayback.pause();
        if (ttsAudio) ttsAudio.pause();
        isSyncPlaying = false;
        if (syncPlayIcon) syncPlayIcon.textContent = '▶';
        if (syncPlayText) syncPlayText.textContent = 'Play with AI Voiceover';
      }
    }

    function switchStudioMode(mode) {
      studioRecordMode = mode;
      stopSyncPlayback();
      stopSnip();
      cleanupWebcamStreamOnly();

      if (mode === 'snip') {
        if (tabSnipVideo) tabSnipVideo.classList.add('active');
        if (tabWebcam) tabWebcam.classList.remove('active');
        if (videoFeed) videoFeed.style.display = 'none';

        if (snippedBlobUrl) {
          if (snipHelperOverlay) snipHelperOverlay.style.display = 'none';
          if (recordedPlayback) {
            recordedPlayback.src = snippedBlobUrl;
            recordedPlayback.style.display = 'block';
          }
          if (snipControlsPanel) snipControlsPanel.style.display = 'none';
          if (snipReviewPanel) snipReviewPanel.style.display = 'flex';
        } else {
          if (recordedPlayback) recordedPlayback.style.display = 'none';
          if (snipHelperOverlay) snipHelperOverlay.style.display = 'flex';
          if (snipControlsPanel) snipControlsPanel.style.display = 'flex';
          if (snipReviewPanel) snipReviewPanel.style.display = 'none';
        }
        if (webcamControlsPanel) webcamControlsPanel.style.display = 'none';
        if (recTimer) recTimer.textContent = '00:00 / 00:05';
      } else {
        // Webcam Mode
        if (tabWebcam) tabWebcam.classList.add('active');
        if (tabSnipVideo) tabSnipVideo.classList.remove('active');
        if (snipHelperOverlay) snipHelperOverlay.style.display = 'none';
        if (snipControlsPanel) snipControlsPanel.style.display = 'none';
        if (snipReviewPanel) snipReviewPanel.style.display = 'none';
        if (webcamControlsPanel) webcamControlsPanel.style.display = 'flex';

        if (recordedBlobUrl) {
          if (videoFeed) videoFeed.style.display = 'none';
          if (recordedPlayback) {
            recordedPlayback.src = recordedBlobUrl;
            recordedPlayback.style.display = 'block';
          }
          if (startRecBtn) startRecBtn.style.display = 'none';
          if (stopRecBtn) stopRecBtn.style.display = 'none';
          if (downloadVideoBtn) downloadVideoBtn.style.display = 'flex';
        } else {
          initWebcamStream();
        }
        if (recTimer) recTimer.textContent = '00:00 / 00:30';
      }
    }

    if (tabSnipVideo) tabSnipVideo.onclick = () => switchStudioMode('snip');
    if (tabWebcam) tabWebcam.onclick = () => switchStudioMode('webcam');

    if (openRecordBtn && webcamModal) {
      openRecordBtn.onclick = () => {
        const curScript = generatedScripts[activeStyleIndex] || generatedScripts[0];
        const fullHook = `${curScript.hookLead}${curScript.hookHighlight}${curScript.hookTail}`;
        const camHookEl = sidebar.querySelector('#smCamHook');
        const camBodyEl = sidebar.querySelector('#smCamBody');
        const camCtaEl = sidebar.querySelector('#smCamCta');
        if (camHookEl) camHookEl.textContent = fullHook;
        if (camBodyEl) camBodyEl.textContent = curScript.body;
        if (camCtaEl) camCtaEl.textContent = curScript.cta;

        if (snipSourceTitle) snipSourceTitle.textContent = `"${currentContext.displayTitle}"`;
        const snipTargetEl = sidebar.querySelector('#smSnipMetaTarget');
        const snipAuthorEl = sidebar.querySelector('#smSnipMetaAuthor');
        const snipViewsEl = sidebar.querySelector('#smSnipMetaViews');
        if (snipTargetEl) snipTargetEl.textContent = currentContext.platform;
        if (snipAuthorEl) snipAuthorEl.textContent = currentContext.author;
        if (snipViewsEl) snipViewsEl.textContent = currentContext.views || 'Trending';

        webcamModal.classList.add('active');
        switchStudioMode('snip'); // Default to Faceless Viral Clip mode
      };
    }

    function startSnip(durationLimit = null) {
      const pageVideo = getActivePageVideo();
      if (!pageVideo) {
        showToast('⚠️ No playing video detected. Please play the video on the page first.');
        return;
      }

      try {
        let stream = null;
        if (typeof pageVideo.captureStream === 'function') {
          stream = pageVideo.captureStream();
        } else if (typeof pageVideo.mozCaptureStream === 'function') {
          stream = pageVideo.mozCaptureStream();
        }

        if (!stream || stream.getVideoTracks().length === 0) {
          showToast('⚠️ Could not capture stream from video element.');
          return;
        }

        const muteOriginal = muteOriginalAudio?.checked;
        if (muteOriginal) {
          stream.getAudioTracks().forEach(t => {
            t.stop();
            stream.removeTrack(t);
          });
        }

        snipChunks = [];
        let mimeType = 'video/webm;codecs=vp9,opus';
        if (!MediaRecorder.isTypeSupported(mimeType)) mimeType = 'video/webm';

        snipRecorder = new MediaRecorder(stream, { mimeType });

        snipRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) snipChunks.push(e.data);
        };

        snipRecorder.onstop = () => {
          const blob = new Blob(snipChunks, { type: 'video/webm' });
          if (snippedBlobUrl) URL.revokeObjectURL(snippedBlobUrl);
          snippedBlobUrl = URL.createObjectURL(blob);

          if (snipHelperOverlay) snipHelperOverlay.style.display = 'none';
          if (videoFeed) videoFeed.style.display = 'none';
          if (recordedPlayback) {
            recordedPlayback.src = snippedBlobUrl;
            recordedPlayback.style.display = 'block';
            recordedPlayback.loop = true;
            recordedPlayback.play().catch(e => console.log(e));
          }

          if (recBadge) recBadge.classList.remove('active');
          if (snipControlsPanel) snipControlsPanel.style.display = 'none';
          if (snipReviewPanel) snipReviewPanel.style.display = 'flex';
          showToast('✂️ Viral Clip Captured!');
        };

        if (pageVideo.paused) {
          pageVideo.play().catch(e => console.log('Autoplay request:', e));
        }

        snipRecorder.start();
        isSnipping = true;
        snipSeconds = 0;

        if (recBadge) {
          recBadge.classList.add('active');
          if (recBadgeText) recBadgeText.textContent = 'SNIPPING VIRAL HOOK';
        }

        if (snipCustomText) snipCustomText.textContent = '⏹ Stop Snip';

        if (snipTimer) clearInterval(snipTimer);
        const targetStr = durationLimit ? `00:${String(durationLimit).padStart(2, '0')}` : '∞';
        if (recTimer) recTimer.textContent = `00:00 / ${targetStr}`;

        snipTimer = setInterval(() => {
          snipSeconds++;
          const secFormatted = String(snipSeconds).padStart(2, '0');
          if (recTimer) recTimer.textContent = `00:${secFormatted} / ${targetStr}`;

          if (durationLimit && snipSeconds >= durationLimit) {
            stopSnip();
          }
        }, 1000);

      } catch (err) {
        console.error('[StitchMatrix] Snip error:', err);
        showToast('Snip error: ' + err.message);
      }
    }

    function stopSnip() {
      if (snipTimer) clearInterval(snipTimer);
      if (snipRecorder && snipRecorder.state === 'recording') {
        snipRecorder.stop();
      }
      isSnipping = false;
      if (snipCustomText) snipCustomText.textContent = '● Custom Snip';
    }

    if (snip5sBtn) snip5sBtn.onclick = () => startSnip(5);
    if (snip10sBtn) snip10sBtn.onclick = () => startSnip(10);
    if (snipCustomBtn) {
      snipCustomBtn.onclick = () => {
        if (isSnipping) {
          stopSnip();
        } else {
          startSnip(null);
        }
      };
    }

    async function toggleSyncPlayback() {
      if (!snippedBlobUrl) return;

      if (isSyncPlaying) {
        stopSyncPlayback();
        return;
      }

      // If no AI voiceover generated yet, synthesize it automatically!
      if (!currentVoiceBlobUrl) {
        showToast('⚡ Generating AI Voiceover for your clip...');
        if (syncPlayText) syncPlayText.textContent = '⏳ Synthesizing Voice...';
        try {
          const rawScript = getActiveScriptForVoice();
          const narrationText = prepareTtsText(rawScript);
          const blob = await fetchAudioTts(narrationText);
          currentVoiceBlob = blob;
          currentVoiceBlobUrl = URL.createObjectURL(blob);
          if (ttsAudio) {
            ttsAudio.src = currentVoiceBlobUrl;
            ttsAudio.load();
          }
        } catch (err) {
          showToast('Voiceover failed: ' + err.message);
          if (syncPlayText) syncPlayText.textContent = 'Play with AI Voiceover';
          return;
        }
      }

      if (recordedPlayback) {
        recordedPlayback.currentTime = 0;
        recordedPlayback.volume = snipVideoVolume;
        recordedPlayback.muted = (snipVideoVolume === 0);
        recordedPlayback.play();
      }

      if (ttsAudio) {
        ttsAudio.currentTime = 0;
        ttsAudio.volume = voiceVolume;
        ttsAudio.play().catch(e => console.log('Audio play error:', e));
      }

      isSyncPlaying = true;
      if (syncPlayIcon) syncPlayIcon.textContent = '⏸';
      if (syncPlayText) syncPlayText.textContent = 'Pause Dual Preview';

      if (recordedPlayback) {
        recordedPlayback.onended = () => {
          if (isSyncPlaying) {
            recordedPlayback.currentTime = 0;
            recordedPlayback.play();
          }
        };
      }

      if (ttsAudio) {
        ttsAudio.onended = () => {
          isSyncPlaying = false;
          if (syncPlayIcon) syncPlayIcon.textContent = '▶';
          if (syncPlayText) syncPlayText.textContent = 'Replay with AI Voiceover';
        };
      }
    }

    if (syncPlayBtn) syncPlayBtn.onclick = toggleSyncPlayback;

    if (downloadClipBtn) {
      downloadClipBtn.onclick = () => {
        if (!snippedBlobUrl) return;
        const a = document.createElement('a');
        a.href = snippedBlobUrl;
        const cleanTitle = (currentContext.displayTitle || 'viral-hook')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .slice(0, 30);
        a.download = `stitchmatrix-clip-${cleanTitle || 'hook'}-${Date.now()}.webm`;
        a.click();
        showToast('💾 Video clip downloaded! Ready for Shorts / CapCut.');
      };
    }

    if (downloadVoiceFastBtn) {
      downloadVoiceFastBtn.onclick = async () => {
        if (!currentVoiceBlobUrl) {
          showToast('⚡ Synthesizing AI Voiceover for download...');
          try {
            const rawScript = getActiveScriptForVoice();
            const narrationText = prepareTtsText(rawScript);
            const blob = await fetchAudioTts(narrationText);
            currentVoiceBlob = blob;
            currentVoiceBlobUrl = URL.createObjectURL(blob);
            if (ttsAudio) ttsAudio.src = currentVoiceBlobUrl;
          } catch (err) {
            showToast('Voiceover failed: ' + err.message);
            return;
          }
        }
        const a = document.createElement('a');
        a.href = currentVoiceBlobUrl;
        const cleanTitle = (currentContext.displayTitle || 'viral-script')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .slice(0, 30);
        a.download = `stitchmatrix-voiceover-${cleanTitle || 'narration'}-${Date.now()}.mp3`;
        a.click();
        showToast('💾 Voiceover MP3 downloaded!');
      };
    }

    if (reSnipBtn) {
      reSnipBtn.onclick = () => {
        stopSyncPlayback();
        if (recordedPlayback) {
          recordedPlayback.pause();
          recordedPlayback.style.display = 'none';
        }
        if (snipHelperOverlay) snipHelperOverlay.style.display = 'flex';
        if (snipControlsPanel) snipControlsPanel.style.display = 'flex';
        if (snipReviewPanel) snipReviewPanel.style.display = 'none';
        if (recTimer) recTimer.textContent = '00:00 / 00:05';
      };
    }

    // WEBCAM STREAM & RECORDING LOGIC
    async function initWebcamStream() {
      if (recordedPlayback) recordedPlayback.style.display = 'none';
      if (videoFeed) videoFeed.style.display = 'block';
      if (startRecBtn) startRecBtn.style.display = 'flex';
      if (stopRecBtn) stopRecBtn.style.display = 'none';
      if (downloadVideoBtn) downloadVideoBtn.style.display = 'none';
      if (recBadge) recBadge.classList.remove('active');
      if (recTimer) recTimer.textContent = '00:00 / 00:30';

      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: true
        });
        if (videoFeed) videoFeed.srcObject = mediaStream;
      } catch (err) {
        showToast('Please allow camera & microphone permissions');
      }
    }

    function cleanupWebcamStreamOnly() {
      if (recordingTimer) clearInterval(recordingTimer);
      if (teleprompterScrollInterval) clearInterval(teleprompterScrollInterval);
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
      if (mediaStream) {
        mediaStream.getTracks().forEach(t => t.stop());
        mediaStream = null;
      }
    }

    function cleanupAllRecording() {
      stopSyncPlayback();
      stopSnip();
      cleanupWebcamStreamOnly();
      if (webcamModal) webcamModal.classList.remove('active');
    }

    if (closeWebcamBtn) closeWebcamBtn.onclick = cleanupAllRecording;

    if (startRecBtn) {
      startRecBtn.onclick = () => {
        if (!mediaStream) return;
        recordedChunks = [];

        try {
          const options = MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')
            ? { mimeType: 'video/webm;codecs=vp9,opus' }
            : { mimeType: 'video/webm' };
          mediaRecorder = new MediaRecorder(mediaStream, options);
        } catch (e) {
          mediaRecorder = new MediaRecorder(mediaStream);
        }

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) recordedChunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(recordedChunks, { type: 'video/webm' });
          if (recordedBlobUrl) URL.revokeObjectURL(recordedBlobUrl);
          recordedBlobUrl = URL.createObjectURL(blob);

          if (videoFeed) videoFeed.style.display = 'none';
          if (recordedPlayback) {
            recordedPlayback.src = recordedBlobUrl;
            recordedPlayback.style.display = 'block';
            recordedPlayback.play();
          }

          if (startRecBtn) startRecBtn.style.display = 'none';
          if (stopRecBtn) stopRecBtn.style.display = 'none';
          if (downloadVideoBtn) downloadVideoBtn.style.display = 'flex';
        };

        mediaRecorder.start();
        isRecording = true;
        recordingSeconds = 0;
        if (startRecBtn) startRecBtn.style.display = 'none';
        if (stopRecBtn) stopRecBtn.style.display = 'flex';
        if (recBadge) {
          recBadge.classList.add('active');
          if (recBadgeText) recBadgeText.textContent = 'RECORDING WEBCAM';
        }

        if (prompterText) prompterText.scrollTop = 0;
        teleprompterScrollInterval = setInterval(() => {
          if (prompterText) prompterText.scrollTop += 1;
        }, 120);

        recordingTimer = setInterval(() => {
          recordingSeconds++;
          const secFormatted = String(recordingSeconds).padStart(2, '0');
          if (recTimer) recTimer.textContent = `00:${secFormatted} / 00:30`;

          if (recordingSeconds >= 30) {
            stopRecording();
          }
        }, 1000);
      };
    }

    function stopRecording() {
      if (recordingTimer) clearInterval(recordingTimer);
      if (teleprompterScrollInterval) clearInterval(teleprompterScrollInterval);
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
      }
      isRecording = false;
      if (recBadge) recBadge.classList.remove('active');
    }

    if (stopRecBtn) stopRecBtn.onclick = stopRecording;

    if (downloadVideoBtn) {
      downloadVideoBtn.onclick = () => {
        if (!recordedBlobUrl) return;
        const a = document.createElement('a');
        a.href = recordedBlobUrl;
        a.download = `stitchmatrix-webcam-${Date.now()}.webm`;
        a.click();
        showToast('Webcam video downloaded!');
      };
    }

    // QR CODE MODAL LOGIC
    const openPhoneBtn = sidebar.querySelector('#smOpenPhoneBtn');
    const phoneModal = sidebar.querySelector('#smPhoneModal');
    const closePhoneBtn = sidebar.querySelector('#smClosePhoneBtn');
    const qrImage = sidebar.querySelector('#smQrImage');
    const openMobileDirectBtn = sidebar.querySelector('#smOpenMobileDirectBtn');
    const copyMobileLinkBtn = sidebar.querySelector('#smCopyMobileLinkBtn');
    const copyMobileLinkText = sidebar.querySelector('#smCopyMobileLinkText');
    const mobileLinkInput = sidebar.querySelector('#smMobileLinkInput');

    function robustCopy(text, onSuccess) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(onSuccess).catch(() => fallbackExecCopy(text, onSuccess));
      } else {
        fallbackExecCopy(text, onSuccess);
      }
    }

    function fallbackExecCopy(text, onSuccess) {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        ta.style.top = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        if (onSuccess) onSuccess();
      } catch (e) {
        window.prompt('Copy this link:', text);
      }
    }

    if (openPhoneBtn && phoneModal) {
      openPhoneBtn.onclick = () => {
        const mobileUrl = getMobileCompanionUrl();
        // High-contrast 250x250 QR code with quiet margin
        qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&margin=2&data=${encodeURIComponent(mobileUrl)}`;
        if (mobileLinkInput) mobileLinkInput.value = mobileUrl;
        phoneModal.classList.add('active');
      };
    }

    if (closePhoneBtn && phoneModal) {
      closePhoneBtn.onclick = () => phoneModal.classList.remove('active');
    }

    if (openMobileDirectBtn) {
      openMobileDirectBtn.onclick = () => {
        const mobileUrl = getMobileCompanionUrl();
        window.open(mobileUrl, '_blank');
      };
    }

    if (copyMobileLinkBtn) {
      copyMobileLinkBtn.onclick = () => {
        const mobileUrl = getMobileCompanionUrl();
        robustCopy(mobileUrl, () => {
          if (copyMobileLinkText) copyMobileLinkText.textContent = '✓ Link Copied!';
          showToast('Teleprompter link copied!');
          setTimeout(() => {
            if (copyMobileLinkText) copyMobileLinkText.textContent = '📋 Copy Link';
          }, 2000);
        });
      };
    }

    if (mobileLinkInput) {
      mobileLinkInput.onclick = () => {
        mobileLinkInput.select();
        robustCopy(mobileLinkInput.value, () => {
          showToast('Link copied!');
        });
      };
    }

    // AI VOICEOVER (FACELESS CREATOR) STUDIO LOGIC
    const openVoiceoverBtn = sidebar.querySelector('#smOpenVoiceoverBtn');
    const voiceoverModal = sidebar.querySelector('#smVoiceoverModal');
    const closeVoiceoverBtn = sidebar.querySelector('#smCloseVoiceoverBtn');
    const soundwaves = sidebar.querySelector('#smSoundwaves');
    const voiceStatus = sidebar.querySelector('#smVoiceStatus');
    const voiceSubstatus = sidebar.querySelector('#smVoiceSubstatus');
    const voiceScriptText = sidebar.querySelector('#smVoiceScriptText');
    const ttsAudio = sidebar.querySelector('#smTtsAudio');
    const generateVoiceBtn = sidebar.querySelector('#smGenerateVoiceBtn');
    const generateVoiceBtnText = sidebar.querySelector('#smGenerateVoiceBtnText');
    const voiceActionRow = sidebar.querySelector('#smVoiceActionRow');
    const voicePlayBtn = sidebar.querySelector('#smVoicePlayBtn');
    const voicePlayIcon = sidebar.querySelector('#smVoicePlayIcon');
    const voicePlayText = sidebar.querySelector('#smVoicePlayText');
    const voiceDownloadBtn = sidebar.querySelector('#smVoiceDownloadBtn');

    function getActiveScriptForVoice() {
      const curScript = generatedScripts[activeStyleIndex] || generatedScripts[0];
      const hookLead = sidebar.querySelector('.sm-hook-lead')?.textContent || curScript.hookLead;
      const hookHighlight = sidebar.querySelector('.sm-hook-highlight')?.textContent || curScript.hookHighlight;
      const hookTail = sidebar.querySelector('.sm-hook-tail')?.textContent || curScript.hookTail;
      const fullHook = `${hookLead} ${hookHighlight} ${hookTail}`.trim();
      const bodyText = sidebar.querySelector('#smBodyText')?.textContent || curScript.body;
      const ctaText = sidebar.querySelector('#smCtaText')?.textContent || curScript.cta;
      return `${fullHook}. ${bodyText}. ${ctaText}`;
    }

    async function synthesizeVoiceover() {
      if (isGeneratingVoice) return;
      isGeneratingVoice = true;

      const rawScript = getActiveScriptForVoice();
      const narrationText = prepareTtsText(rawScript);

      if (voiceScriptText) {
        voiceScriptText.textContent = narrationText;
      }

      // UI Loading state
      if (soundwaves) {
        soundwaves.classList.remove('playing');
        soundwaves.classList.add('loading');
      }
      if (voiceStatus) voiceStatus.textContent = '⚡ Synthesizing Studio Voiceover...';
      if (voiceSubstatus) voiceSubstatus.textContent = 'Generating human-paced continuous MP3 narration without camera or mic';
      if (generateVoiceBtn) generateVoiceBtn.disabled = true;
      if (generateVoiceBtnText) generateVoiceBtnText.textContent = '⏳ Generating MP3 Audio...';
      if (voiceActionRow) voiceActionRow.style.display = 'none';

      try {
        const blob = await fetchAudioTts(narrationText, selectedVoiceId);
        currentVoiceBlob = blob;
        if (currentVoiceBlobUrl) URL.revokeObjectURL(currentVoiceBlobUrl);
        currentVoiceBlobUrl = URL.createObjectURL(blob);

        if (ttsAudio) {
          ttsAudio.src = currentVoiceBlobUrl;
          ttsAudio.volume = voiceVolume;
          ttsAudio.load();
        }

        // UI Ready state
        if (soundwaves) soundwaves.classList.remove('loading');
        if (voiceStatus) voiceStatus.textContent = '✨ Voiceover Ready! (Continuous MP3)';
        if (voiceSubstatus) voiceSubstatus.textContent = 'Professional AI narration ready. Preview or download below.';
        if (generateVoiceBtnText) generateVoiceBtnText.textContent = '🔄 Re-generate Audio';
        if (generateVoiceBtn) generateVoiceBtn.disabled = false;
        if (voiceActionRow) voiceActionRow.style.display = 'grid';

        // Auto-play audio preview
        if (ttsAudio) {
          try {
            ttsAudio.volume = voiceVolume;
            await ttsAudio.play();
            if (soundwaves) soundwaves.classList.add('playing');
            if (voicePlayIcon) voicePlayIcon.textContent = '⏸';
            if (voicePlayText) voicePlayText.textContent = 'Pause Preview';
          } catch (autoErr) {
            console.log('[StitchMatrix] Audio preview ready (autoplay blocked by browser, click Play):', autoErr);
          }
        }
        showToast('🔊 AI Voiceover Ready!');
      } catch (err) {
        console.error('[StitchMatrix] Voiceover failed:', err);
        if (soundwaves) soundwaves.classList.remove('loading', 'playing');
        if (voiceStatus) voiceStatus.textContent = 'Generation Failed';
        if (voiceSubstatus) voiceSubstatus.textContent = err.message || 'Error communicating with voice engine.';
        if (generateVoiceBtnText) generateVoiceBtnText.textContent = '⚡ Retry Generation';
        if (generateVoiceBtn) generateVoiceBtn.disabled = false;
        showToast('Voiceover failed: ' + (err.message || 'Error'));
      } finally {
        isGeneratingVoice = false;
      }
    }

    function stopVoicePlayback() {
      if (ttsAudio) {
        ttsAudio.pause();
        ttsAudio.currentTime = 0;
      }
      if (soundwaves) {
        soundwaves.classList.remove('playing', 'loading');
      }
      if (voicePlayIcon) voicePlayIcon.textContent = '▶';
      if (voicePlayText) voicePlayText.textContent = 'Play Preview';
    }

    function cleanupVoiceover() {
      stopVoicePlayback();
      if (voiceoverModal) voiceoverModal.classList.remove('active');
    }

    if (ttsAudio) {
      ttsAudio.onended = () => {
        if (soundwaves) soundwaves.classList.remove('playing');
        if (voicePlayIcon) voicePlayIcon.textContent = '▶';
        if (voicePlayText) voicePlayText.textContent = 'Play Preview';
      };
      ttsAudio.onpause = () => {
        if (soundwaves) soundwaves.classList.remove('playing');
        if (voicePlayIcon) voicePlayIcon.textContent = '▶';
        if (voicePlayText) voicePlayText.textContent = 'Play Preview';
      };
      ttsAudio.onplay = () => {
        if (soundwaves) soundwaves.classList.add('playing');
        if (voicePlayIcon) voicePlayIcon.textContent = '⏸';
        if (voicePlayText) voicePlayText.textContent = 'Pause Preview';
      };
    }

    if (voicePlayBtn && ttsAudio) {
      voicePlayBtn.onclick = () => {
        if (ttsAudio.paused) {
          ttsAudio.volume = voiceVolume;
          ttsAudio.play().catch(e => console.warn(e));
        } else {
          ttsAudio.pause();
        }
      };
    }

    if (voiceDownloadBtn) {
      voiceDownloadBtn.onclick = () => {
        if (!currentVoiceBlobUrl) return;
        const a = document.createElement('a');
        a.href = currentVoiceBlobUrl;
        const cleanTitle = (currentContext.displayTitle || 'viral-script')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
          .slice(0, 32);
        a.download = `stitchmatrix-${selectedVoiceId}-${cleanTitle || 'voiceover'}-${Date.now()}.mp3`;
        a.click();
        showToast('💾 Voiceover MP3 downloaded!');
      };
    }

    if (generateVoiceBtn) {
      generateVoiceBtn.onclick = () => {
        synthesizeVoiceover();
      };
    }

    if (openVoiceoverBtn && voiceoverModal) {
      openVoiceoverBtn.onclick = () => {
        const rawScript = getActiveScriptForVoice();
        const narrationText = prepareTtsText(rawScript);
        if (voiceScriptText) voiceScriptText.textContent = narrationText;
        voiceoverModal.classList.add('active');
        synthesizeVoiceover();
      };
    }

    if (closeVoiceoverBtn) {
      closeVoiceoverBtn.onclick = cleanupVoiceover;
    }

    // Voice Selector Listener
    const voiceSelect = sidebar.querySelector('#smVoiceSelect');
    const voiceBadge = sidebar.querySelector('#smActiveVoiceBadge');
    if (voiceSelect) {
      voiceSelect.value = selectedVoiceId;
      voiceSelect.onchange = () => {
        selectedVoiceId = voiceSelect.value;
        localStorage.setItem('sm_selected_voice', selectedVoiceId);
        if (voiceBadge) {
          if (['orion', 'asteria', 'luna', 'stella', 'perseus', 'arcas', 'athena', 'angus', 'orpheus', 'hera'].includes(selectedVoiceId)) {
            voiceBadge.textContent = 'Neural AI • Ultra-Realistic';
            voiceBadge.style.color = '#6EE7B7';
          } else {
            voiceBadge.textContent = 'International Dialect';
            voiceBadge.style.color = '#38BDF8';
          }
        }
        const optText = voiceSelect.options[voiceSelect.selectedIndex]?.text || selectedVoiceId;
        showToast(`🎙️ Voice: ${optText.split('—')[0].trim()}`);
      };
    }

    // Voiceover Volume Control
    const voiceVolSlider = sidebar.querySelector('#smVoiceVolumeSlider');
    const voiceVolPercent = sidebar.querySelector('#smVoiceVolumePercent');
    const voiceVolIcon = sidebar.querySelector('#smVoiceVolumeIcon');
    const voiceVolMuteBtn = sidebar.querySelector('#smVoiceVolumeMuteBtn');

    function applyVoiceVolume(vol) {
      voiceVolume = Math.max(0, Math.min(1, vol));
      if (ttsAudio) ttsAudio.volume = voiceVolume;
      const pct = Math.round(voiceVolume * 100);
      if (voiceVolSlider) voiceVolSlider.value = pct;
      if (voiceVolPercent) voiceVolPercent.textContent = pct + '%';
      if (voiceVolIcon) {
        if (voiceVolume === 0) voiceVolIcon.textContent = '🔇';
        else if (voiceVolume < 0.5) voiceVolIcon.textContent = '🔉';
        else voiceVolIcon.textContent = '🔊';
      }
      localStorage.setItem('sm_voice_volume', voiceVolume.toString());
    }

    if (voiceVolSlider) {
      voiceVolSlider.value = Math.round(voiceVolume * 100);
      voiceVolSlider.oninput = () => {
        const val = parseInt(voiceVolSlider.value, 10);
        applyVoiceVolume(val / 100);
        if (voiceVolume > 0) lastNonZeroVoiceVolume = voiceVolume;
      };
    }

    if (voiceVolMuteBtn) {
      voiceVolMuteBtn.onclick = () => {
        if (voiceVolume > 0) {
          lastNonZeroVoiceVolume = voiceVolume;
          applyVoiceVolume(0);
        } else {
          applyVoiceVolume(lastNonZeroVoiceVolume || 1.0);
        }
      };
    }

    // Snipper Dual-Track Mixer Sliders
    const snipVoiceVolSlider = sidebar.querySelector('#smSnipVoiceVolSlider');
    const snipVoiceVolVal = sidebar.querySelector('#smSnipVoiceVolVal');
    const snipVideoVolSlider = sidebar.querySelector('#smSnipVideoVolSlider');
    const snipVideoVolVal = sidebar.querySelector('#smSnipVideoVolVal');

    if (snipVoiceVolSlider) {
      snipVoiceVolSlider.value = Math.round(voiceVolume * 100);
      snipVoiceVolSlider.oninput = () => {
        const val = parseInt(snipVoiceVolSlider.value, 10);
        applyVoiceVolume(val / 100);
        if (snipVoiceVolVal) snipVoiceVolVal.textContent = val + '%';
      };
    }

    if (snipVideoVolSlider) {
      snipVideoVolSlider.oninput = () => {
        const val = parseInt(snipVideoVolSlider.value, 10);
        snipVideoVolume = val / 100;
        if (recordedPlayback) {
          recordedPlayback.volume = snipVideoVolume;
          recordedPlayback.muted = (val === 0);
        }
        if (snipVideoVolVal) snipVideoVolVal.textContent = val === 0 ? 'Muted' : val + '%';
      };
    }
  }

  function executeCopyFullScript() {
    const curScript = generatedScripts[activeStyleIndex];
    const fullHook = `${curScript.hookLead}${curScript.hookHighlight}${curScript.hookTail}`;
    const bodyText = sidebar.querySelector('#smBodyText')?.textContent || curScript.body;
    const ctaText = sidebar.querySelector('#smCtaText')?.textContent || curScript.cta;
    const formatted = `[PART 1: THE VIRAL HOOK]\n${fullHook}\n\n[PART 2: THE CORE STORY]\n${bodyText}\n\n[PART 3: RETENTION CALL-TO-ACTION]\n${ctaText}\n\nHASHTAGS:\n${curScript.hashtags}`;

    navigator.clipboard.writeText(formatted).then(() => {
      const copyFullBtn = sidebar.querySelector('#smCopyFullBtn');
      const copyFullText = sidebar.querySelector('#smCopyFullText');
      if (copyFullBtn && copyFullText) {
        copyFullBtn.classList.add('copied');
        copyFullText.textContent = '✓ Copied!';
        showToast('Full script & hashtags copied!');
        setTimeout(() => {
          copyFullBtn.classList.remove('copied');
          copyFullText.textContent = 'Copy Full Script';
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
      const audio = sidebar.querySelector('#smTtsAudio');
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      const waves = sidebar.querySelector('#smSoundwaves');
      if (waves) waves.classList.remove('playing', 'loading');
      const playback = sidebar.querySelector('#smRecordedPlayback');
      if (playback) {
        playback.pause();
      }
      if (isSnipping) {
        if (snipTimer) clearInterval(snipTimer);
        if (snipRecorder && snipRecorder.state === 'recording') snipRecorder.stop();
        isSnipping = false;
      }
      if (isSyncPlaying) {
        isSyncPlaying = false;
      }
      if (mediaStream) {
        mediaStream.getTracks().forEach(t => t.stop());
        mediaStream = null;
      }
    }
  }

  triggerTab.onclick = toggleSidebar;
  shadow.appendChild(sidebar);

  // AUTOMATED REAL-TIME VIDEO DETECTION & LIVE RE-SYNC ENGINE
  // 1. Intercept SPA URL routing for TikTok, Instagram Reels, and YouTube
  try {
    const origPush = history.pushState;
    history.pushState = function (...args) {
      const res = origPush.apply(this, args);
      setTimeout(checkAndAutoUpdate, 120);
      setTimeout(checkAndAutoUpdate, 450);
      return res;
    };

    const origReplace = history.replaceState;
    history.replaceState = function (...args) {
      const res = origReplace.apply(this, args);
      setTimeout(checkAndAutoUpdate, 120);
      setTimeout(checkAndAutoUpdate, 450);
      return res;
    };
  } catch (e) {}

  window.addEventListener('popstate', () => {
    setTimeout(checkAndAutoUpdate, 120);
  });

  // 2. User Clicks (advancing feed, clicking video, clicking next arrow, clicking comments/feed)
  document.addEventListener('click', (e) => {
    if (host.contains(e.target)) return;
    setTimeout(checkAndAutoUpdate, 150);
    setTimeout(checkAndAutoUpdate, 500);
  }, true);

  // 3. Media Playback Events
  document.addEventListener('play', () => {
    setTimeout(checkAndAutoUpdate, 120);
  }, true);

  document.addEventListener('playing', () => {
    setTimeout(checkAndAutoUpdate, 100);
  }, true);

  // 4. Platform-Specific SPA Events
  window.addEventListener('yt-navigate-finish', () => {
    setTimeout(checkAndAutoUpdate, 150);
  });
  window.addEventListener('yt-page-data-updated', () => {
    setTimeout(checkAndAutoUpdate, 150);
  });

  // 5. Wheel and Scroll Navigation
  let scrollDebounce = null;
  const onUserScroll = () => {
    if (scrollDebounce) clearTimeout(scrollDebounce);
    scrollDebounce = setTimeout(checkAndAutoUpdate, 180);
  };
  window.addEventListener('wheel', onUserScroll, { passive: true });
  window.addEventListener('scroll', onUserScroll, { passive: true });

  // 6. Keyboard feed advance (Down/Up arrow, PageDown, J, K, Space)
  window.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'j', 'k', 'J', 'K', ' '].includes(e.key)) {
      setTimeout(checkAndAutoUpdate, 220);
      setTimeout(checkAndAutoUpdate, 550);
    }
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

  // 7. Active Heartbeat Poller (250ms when sidebar is open)
  setInterval(() => {
    if (isOpen) {
      checkAndAutoUpdate();
    }
  }, 250);

  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'TOGGLE_SIDEBAR') {
        toggleSidebar();
        sendResponse({ open: isOpen });
      }
    });
  }

  console.log('[StitchMatrix] Multi-Platform Real-Time Studio v3.8.2 loaded.');
})();
