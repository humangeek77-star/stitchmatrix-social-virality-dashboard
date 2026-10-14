# StitchMatrix — Standalone Web Application Dashboard

> Hosted on **Cloudflare Pages** (React + Vite + Tailwind CSS)  
> Design DNA: Slate Dark Mode (`#0F172A`), Linear/Stripe caliber typography, 60/40 split architecture.

## Deployment to Cloudflare Pages

### Option 1: Direct Git Integration (Recommended)
1. In the Cloudflare Dashboard, go to **Workers & Pages** -> **Create application** -> **Pages**.
2. Connect your GitHub repository `humangeek77-star/stitchmatrix-social-virality-dashboard`.
3. Set the build settings:
   - **Framework preset**: `Vite`
   - **Root directory**: `dashboard`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Click **Save and Deploy**.

### Option 2: Wrangler CLI Deployment
```bash
cd dashboard
npm install
npm run build
npx wrangler pages deploy dist --project-name=stitchmatrix-dashboard
```

---

## Local Development

```bash
cd dashboard
npm install
npm run dev
```
Runs at `http://localhost:3000`.
