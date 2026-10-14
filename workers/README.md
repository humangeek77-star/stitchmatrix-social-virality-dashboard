# StitchMatrix — Cloudflare Workers API

> Serverless backend edge functions for computing algorithmic spikes and LLM script mutations.

## Endpoints

### 1. `GET /api/health`
Checks cluster edge health and active node latency.

### 2. `POST /api/analyze`
Intercepts incoming social video URLs (TikTok, YouTube Shorts, Instagram Reels), strips tracking query parameters (`utm_*`, `igsh`, `si`, `share_id`, etc.), and calculates simulated algorithmic velocity growth indices:
- `velocitySurge`: e.g. `+450% traffic surge detected`
- `optimizationScore`: `94.2%`
- `retentionForecast`: Retention curve at 3s
- `audioVelocity`: Audio hook frequency velocity
- `saturationPhase`: Saturation curve analysis
- `antidetectHash`: `HASH-OK #99014`

### 3. `POST /api/generate-scripts`
Synthesizes three distinct, structured, low-friction script mutations formatted into semantic block frames:
- `01 | Hook Element`
- `02 | Core Thesis`
- `03 | Retentive Call-To-Action`
Supports integration with Cloudflare Workers AI (`@cf/meta/llama-3-8b-instruct`), OpenAI, or Anthropic.

### 4. `POST /api/sync-github`
Handles repository synchronization for generated scripts and telemetry snapshots.

---

## Deployment

```bash
cd workers
npm install
npm run deploy
```

## Testing

```bash
npm test
```
Runs the native Node.js test suite across all worker endpoints.
