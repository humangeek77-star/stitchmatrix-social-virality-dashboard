/**
 * StitchMatrix Background Service Worker (Manifest V3)
 * Coordinates sidebar toggling, keyboard commands, and background edge sync.
 */

// Handle extension action (toolbar icon) click
chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;
  try {
    await chrome.tabs.sendMessage(tab.id, { action: 'TOGGLE_SIDEBAR' });
  } catch (err) {
    // If content script is not yet injected or tab is refreshing, inject it
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });
      setTimeout(() => {
        chrome.tabs.sendMessage(tab.id, { action: 'TOGGLE_SIDEBAR' });
      }, 100);
    } catch (injErr) {
      console.warn('Could not inject content script:', injErr);
    }
  }
});

// Handle keyboard command shortcuts
chrome.commands.onCommand.addListener(async (command) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id) {
    try {
      await chrome.tabs.sendMessage(tab.id, { action: 'TOGGLE_SIDEBAR' });
    } catch (err) {
      console.warn('Command dispatch error:', err);
    }
  }
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'GET_STATUS') {
    sendResponse({
      active: true,
      version: '2.5.0',
      clusterNode: 'cluster://us-east-viral.stitch.matrix:8080'
    });
    return true;
  }
  
  if (request.action === 'API_PROXY_ANALYZE') {
    // Allow proxying to worker if needed
    fetch('https://stitchmatrix-api.humangeek77.workers.dev/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request.payload)
    })
      .then(r => r.json())
      .then(data => sendResponse({ success: true, data }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true; // Keep message channel open for async response
  }

  if (request.action === 'API_PROXY_TTS') {
    fetch('https://stitchmatrix-api.humangeek77.workers.dev/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: request.text, voice: request.voice || 'orion' })
    })
      .then(async r => {
        if (!r.ok) {
          const errText = await r.text();
          throw new Error(`Worker HTTP ${r.status}: ${errText}`);
        }
        const buf = await r.arrayBuffer();
        const bytes = new Uint8Array(buf);
        let binary = '';
        const chunkSize = 8192;
        for (let i = 0; i < bytes.length; i += chunkSize) {
          binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
        }
        const base64 = btoa(binary);
        sendResponse({ success: true, base64: base64, contentType: 'audio/mpeg' });
      })
      .catch(err => {
        console.error('[StitchMatrix] TTS proxy error:', err);
        sendResponse({ success: false, error: err.message });
      });
    return true; // Keep message channel open for async response
  }
});
