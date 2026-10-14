import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/index.js';

test('Worker health check endpoint returns 200 and online status', async () => {
  const req = new Request('https://worker.local/api/health', { method: 'GET' });
  const res = await worker.fetch(req, {}, {});
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.status, 'online');
  assert.equal(data.version, '2.4-PROD');
});

test('Worker strips tracking params from TikTok, YouTube Shorts, and Instagram Reels URLs', async () => {
  const req = new Request('https://worker.local/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: 'https://www.tiktok.com/@user/video/71234567890?is_from_webapp=1&sender_device=pc&utm_source=share'
    })
  });
  const res = await worker.fetch(req, {}, {});
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.success, true);
  assert.equal(data.urlMeta.platform, 'tiktok');
  assert.equal(data.urlMeta.cleanUrl, 'https://www.tiktok.com/@user/video/71234567890');
  assert.ok(data.velocityMetrics.velocitySurge.includes('traffic surge detected'));
  assert.equal(data.velocityMetrics.optimizationScore, '94.2%');
});

test('Worker generates 3 structured script mutations', async () => {
  const req = new Request('https://worker.local/api/generate-scripts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      marketVector: 'Career / Tech Coach (High Conversion Vector)',
      tone: 'Aggressive Hook',
      length: '35s'
    })
  });
  const res = await worker.fetch(req, {}, {});
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.success, true);
  assert.equal(data.data.mutations.length, 3);
  assert.ok(data.data.mutations[0].blocks.hook.length > 0);
  assert.ok(data.data.mutations[0].blocks.thesis.length > 0);
  assert.ok(data.data.mutations[0].blocks.cta.length > 0);
  assert.equal(data.data.meta.ribbonText, '• SYNTAX COMPILED: READY TO INJECT | UTF-8 | LF');
});

test('Worker handles CORS preflight OPTIONS request', async () => {
  const req = new Request('https://worker.local/api/analyze', { method: 'OPTIONS' });
  const res = await worker.fetch(req, {}, {});
  assert.equal(res.status, 204);
  assert.equal(res.headers.get('Access-Control-Allow-Origin'), '*');
});
