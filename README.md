# WeedsFinder

Cannabis strain database, law guides, and dosing tools.

**Site:** [weedsfinder.com](https://weedsfinder.com)  
**Vercel project:** [giotskr-1862s-projects/weedsfinder](https://vercel.com/giotskr-1862s-projects/weedsfinder)  
**GitHub:** [github.com/lovinaai/weedsfinder](https://github.com/lovinaai/weedsfinder) *(move to a WeedsFinder org when ready)*

## Stack

- Next.js 16 (App Router)
- Tailwind CSS 4
- Vercel (`giotskr-1862s-projects` team — **not** `lovina-s-projects`)

## Develop locally

```bash
npm install
npm run dev
```

## Deploy / reconnect (WeedsFinder only)

The **weedsfinder** Vercel project lives on the **giotskr-1862s-projects** team. The local Vercel CLI is logged into a different account (`lovina-s-projects`), so deploy must go through one of these paths:

### Option A — Vercel Git (recommended, no token in GitHub)

1. Open [weedsfinder → Settings → Git](https://vercel.com/giotskr-1862s-projects/weedsfinder/settings/git)
2. Connect **lovinaai/weedsfinder** (or your WeedsFinder org repo after transfer)
3. Set production branch to `main` and deploy

### Option B — GitHub Actions token

1. Log into the **giotskr** Vercel account (the one that owns `weedsfinder`)
2. Create a token at [vercel.com/account/tokens](https://vercel.com/account/tokens)
3. Add it to the repo:

```bash
gh secret set VERCEL_TOKEN -R lovinaai/weedsfinder
```

4. Push to `main` — the [Deploy to Vercel](.github/workflows/deploy.yml) workflow runs build + deploy

### Domain (weedsfinder.com)

1. [weedsfinder → Settings → Domains](https://vercel.com/giotskr-1862s-projects/weedsfinder/settings/domains)
2. Add `weedsfinder.com` and `www.weedsfinder.com`
3. Point DNS at Vercel (A `76.76.21.21` or CNAME `cname.vercel-dns.com`)

### Move GitHub off `lovinaai`

1. Create a **WeedsFinder** GitHub organization
2. Transfer the repo: repo **Settings → Danger zone → Transfer ownership**
3. Reconnect Git in Vercel to the new org repo

## CI status

- `npm install` + `npm run build` — passes on GitHub Actions
- Deploy step — waits on `VERCEL_TOKEN` or Vercel Git connection
