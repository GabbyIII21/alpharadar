# Alpha Radar

Find the Signal. Ignore the Noise.

Alpha Radar is an AI-powered crypto intelligence frontend built for a hackathon demo and investor presentation. It monitors market activity, on-chain signals, whale movements, token unlocks, sentiment shifts, and news-style catalysts, then explains why those events matter through AI-generated reasoning.

Built for the Bitget AI Hackathon.

## Features

- Premium dark trading-terminal interface with glassmorphism and animated radar visuals
- Landing page with product narrative, workflow, benefits, FAQ, and CTA flow
- Dashboard with market overview, Radar Feed, high-priority events, narratives, watchlist, AI insights, and alerts
- Event detail page with Radar Score, sentiment, AI explanation, related signals, timeline, and confidence score
- Ask Alpha chat interface with suggested prompts, conversation history, typing indicator, and streaming-style responses
- Watchlist page for BTC, ETH, SOL, ONDO, AERO, and ARB with realistic mock intelligence
- Settings page for profile, notifications, theme, and API integration controls
- Strongly typed mock data and service layer designed for API replacement

## Screenshots

Add screenshots after deployment:

- `docs/screenshots/landing.png`
- `docs/screenshots/dashboard.png`
- `docs/screenshots/event-detail.png`
- `docs/screenshots/ask-alpha.png`

## Tech Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style component primitives
- Framer Motion
- Lucide Icons
- React Query
- Zustand
- next-themes
- ESLint, Prettier, Husky, lint-staged

## Architecture

Alpha Radar separates UI composition, typed domain models, mock services, local UI state, and reusable cards:

- `src/app` contains App Router routes.
- `src/components` contains cards, chat, common UI states, layout, providers, sections, and UI primitives.
- `src/services` exposes the data-access boundary.
- `src/types` defines the crypto intelligence domain model.
- `src/store` owns lightweight client UI state.
- `src/hooks` wraps React Query access patterns.
- `docs` contains product, design, API, and roadmap documentation.

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Copy `.env.example` to `.env.local` when adding real integrations:

```bash
NEXT_PUBLIC_APP_NAME=Alpha Radar
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ENABLE_MOCK_STREAMING=true
NEXT_PUBLIC_ANALYTICS_DISABLED=true
```

The current frontend works immediately with mock data and does not require API keys.

## Quality Commands

```bash
npm run typecheck
npm run lint
npm run build
npm run format:check
```

## AI Usage Explanation

The application demonstrates an AI reasoning pipeline that:

1. Collects market, on-chain, whale, unlock, sentiment, and news-style events.
2. Clusters related signals by asset and catalyst.
3. Assigns a Radar Score based on urgency, confidence, and likely impact.
4. Generates concise explanations with supporting signals and invalidation context.
5. Exposes the reasoning through dashboards, event detail pages, alerts, and Ask Alpha chat.

The current implementation uses realistic mock intelligence to make the demo deterministic. The service boundary is ready for production API and model integration.

## Future Roadmap

- Live Bitget market data integration
- Whale wallet and exchange reserve ingestion
- Token unlock calendar adapters
- Sentiment and news clustering pipelines
- Authenticated teams and saved workspaces
- Real streaming AI responses
- Alert delivery through email, Telegram, Discord, and web push

## Hackathon Submission Notes

Alpha Radar is designed to show a complete product experience, not only a UI mockup. Every page works with typed mock data, and the architecture makes the path to live data clear.

## Repository Structure

```text
src/
  app/
  components/
    cards/
    chat/
    common/
    layout/
    providers/
    sections/
    ui/
  hooks/
  lib/
  services/
  store/
  types/
docs/
```

## Deployment Instructions

Vercel is the recommended deployment target:

```bash
npm install
npm run build
vercel
```

Set environment variables from `.env.example` in the Vercel dashboard when adding live integrations.
