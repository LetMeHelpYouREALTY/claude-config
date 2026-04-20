# Dr. Jan Duffy — Claude Code Global Instructions

## WHO I AM

Dr. Jan Duffy, Nevada-licensed real estate agent (S.0197614.LLC), Berkshire Hathaway HomeServices Nevada Properties. 30+ years Las Vegas, $127M+ career sales, 500+ families.

Tech operator: Gene Boyle (CA licensed, KLB Consultants Managing Director)

## TECH STACK

- **Framework:** Next.js 15 (App Router)
- **Hosting:** Vercel
- **CRM:** Follow Up Boss (FUB)
- **Property Search:** RealScout widgets
- **Client Retention:** Homebot.ai
- **Phone/Leads:** CallAction
- **Video:** BombBomb
- **CMAs:** CloudCMA
- **Development:** Cursor AI + VS Code
- **Version Control:** GitHub
- **Infrastructure:** Cloudflare Workers
- **Node:** v20.20.0 via NVM4W

## CODE STANDARDS

- TypeScript preferred, JavaScript acceptable
- Next.js 15 App Router conventions (app/ directory, server components default)
- Tailwind CSS for styling
- ESLint + Prettier formatting
- Component naming: PascalCase
- File naming: kebab-case
- API routes in app/api/
- Environment variables in .env.local (never commit)
- All commits: conventional commits format (feat:, fix:, chore:, docs:)

## DOMAIN PORTFOLIO (Active Sites)

These are the hyperlocal Next.js sites in development/production:
- drjanduffy.com — Main agent site
- lasvegasrealestatepro.com — General Vegas RE
- summerlinlasvegas.com — Summerlin community
- lasvegasluxuryrealestatepro.com — Luxury market
- lasvegas55plus.com — 55+ communities
- lasvegasnewconstructionhomes.com — New builds
- lasvegasrelocationpro.com — Relocation services

## PROJECT STRUCTURE (Standard for all sites)

```
project-root/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/
├── components/
│   ├── ui/
│   └── sections/
├── lib/
│   ├── utils.ts
│   └── constants.ts
├── public/
│   └── images/
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## GIT WORKFLOW

1. Always work on feature branches: `feature/description` or `fix/description`
2. Never push directly to main
3. PR titles: short, descriptive, under 70 chars
4. Squash merge to main
5. Delete branch after merge

## ENVIRONMENT SETUP (This PC)

- NVM4W manages Node versions: `nvm use 20.20.0`
- Claude Code installed globally via npm
- Git configured at system level
- GitHub CLI available for repo operations
- Cursor and VS Code both available as editors

## DEPLOYMENT

- All sites deploy via Vercel GitHub integration
- Push to main = auto-deploy to production
- Push to feature branch = preview deployment
- Vercel project settings managed via dashboard
- Environment variables set in Vercel project settings

## SEO REQUIREMENTS (All Sites)

- Schema markup on every page (LocalBusiness, RealEstateAgent, FAQPage)
- Meta titles under 60 chars, descriptions under 155 chars
- Open Graph + Twitter Card meta tags
- Canonical URLs on all pages
- sitemap.xml and robots.txt at root
- Mobile-first responsive design
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- E-E-A-T signals: author bio, credentials, local expertise proof

## REALSCOUT WIDGET INTEGRATION

- RealScout provides search widgets embedded via script tags
- Widget IDs are per-domain, stored in env vars
- Widgets: property search, home valuation, market reports
- Integration via next/script with afterInteractive strategy

## CONTACT INFO FOR CODE OUTPUTS

- Phone (all CTAs): 702-222-1964
- Professional: 702-500-1955
- License: Nevada #S.0197614.LLC
- Brokerage: Berkshire Hathaway HomeServices Nevada Properties

## DO NOT

- Commit .env files or API keys
- Use deprecated Next.js pages/ router
- Deploy without testing locally first
- Skip TypeScript types for API responses
- Use inline styles (use Tailwind)
- Create components without mobile-first design
- Push to main without PR review
