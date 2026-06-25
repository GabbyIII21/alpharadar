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
- Strongly typed backend API for event detection, radar ranking, narratives, watchlist insights, and Ask Alpha chat

## Screenshots

Add screenshots after deployment:

<img width="1917" height="800" alt="image" src="https://github.com/user-attachments/assets/cd46f7bd-1e55-4d91-8c4a-15835aaceecc" />
<img width="1919" height="803" alt="image" src="https://github.com/user-attachments/assets/eb2b54fa-6d8c-40ab-b798-ca53d71c008a" />
<img width="1917" height="798" alt="image" src="https://github.com/user-attachments/assets/c7475d61-bea5-493f-a77f-c992e56d04d3" />
<img width="1919" height="800" alt="image" src="https://github.com/user-attachments/assets/cf1178eb-36b6-4398-8e49-c1953cf8d17e" />
<img width="1919" height="807" alt="image" src="https://github.com/user-attachments/assets/7d9d8817-f65e-42a8-b3e0-c8a8eccc7f4f" />


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
- `src/services` exposes the frontend data-access boundary.
- `src/server` contains the backend provider, service, AI, route, and utility layers.
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

## Backend API

The backend is implemented with Next.js API Routes and TypeScript.

- `GET /api/events` returns recent standardized events.
- `GET /api/radar` returns ranked radar signals with AI reasoning.
- `GET /api/narratives` returns narrative clusters such as RWA, DeFi, Layer 2, Meme Coins, and Market Risk.
- `GET /api/watchlist` returns per-asset insights for tracked assets.
- `POST /api/chat` powers the Ask Alpha endpoint with structured JSON responses.

All responses use a React Query-friendly envelope:

```json
{
  "data": {},
  "meta": {
    "generatedAt": "2026-06-25T00:00:00.000Z",
    "source": "mixed",
    "cacheTtlSeconds": 300
  }
}
```

## Environment Variables

Copy `.env.example` to `.env.local` when adding real integrations:

```bash
NEXT_PUBLIC_APP_NAME=Alpha Radar
NEXT_PUBLIC_APP_URL=https://alpha-radar-eta.vercel.app/
NEXT_PUBLIC_ENABLE_MOCK_STREAMING=true
NEXT_PUBLIC_ANALYTICS_DISABLED=true
AI_PROVIDER=openai
AI_MODEL=
OPENAI_API_KEY=
OPENROUTER_API_KEY=
GEMINI_API_KEY=
DEEPSEEK_API_KEY=
COINGECKO_API_KEY=
CRYPTOPANIC_API_KEY=
```

The app works immediately without API keys. Missing or failing providers return realistic fallback data so the demo remains stable.

## Quality Commands

```bash
npm run typecheck
npm run lint
npm run build
npm run format:check
```

## AI Usage Explanation

The application implements an AI reasoning pipeline that:

1. Collects CoinGecko, DexScreener, CryptoPanic, Fear & Greed, and placeholder whale signals.
2. Detects volume spikes, price anomalies, trending assets, major gainers, major losers, news spikes, and sentiment shifts.
3. Assigns a 0-100 Radar Score from market impact, event rarity, trend strength, and AI confidence.
4. Generates structured analysis with summary, why it matters, risk factors, confidence, and impact assessment.
5. Groups signals into narratives and exposes them through API endpoints and Ask Alpha chat.

The AI provider can switch between OpenAI, OpenRouter, Gemini, and DeepSeek via environment variables. If a model call fails, deterministic fallback reasoning keeps the API responsive.

## Future Roadmap

- Live Bitget market data integration
- Whale wallet and exchange reserve ingestion
- Token unlock calendar adapters
- Sentiment and news clustering pipelines
- Authenticated teams and saved workspaces
- Real streaming AI responses
- Alert delivery through email, Telegram, Discord, and web push

## Submission Notes

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
  server/
    ai/
    lib/
    providers/
    routes/
    services/
    types/
    utils/
  services/
  store/
  types/
docs/
```

## Deployment Instructions

## Backend Documentation

- [Backend architecture](docs/backend-architecture.md)
- [API reference](docs/api-reference.md)
- [Data providers](docs/data-providers.md)
- [AI system](docs/ai-system.md)
