# Backend Architecture

Alpha Radar uses Next.js API Routes with a modular server layer under `src/server`.

## Folders

- `src/server/providers`: external data adapters for CoinGecko, DexScreener, CryptoPanic, Fear & Greed, and mock fallbacks.
- `src/server/services`: orchestration services for market snapshots, event detection, radar scoring, narratives, watchlist insights, and Ask Alpha.
- `src/server/ai`: prompt templates and switchable AI provider abstraction.
- `src/server/lib`: cache, config, HTTP retry helper, logging, rate-limit guard, and tracked asset metadata.
- `src/server/routes`: Zod schemas and JSON response helpers.
- `src/server/types`: provider and domain TypeScript contracts.

## Flow

1. Providers fetch market, DEX, news, and sentiment data with retries, rate limiting, and in-memory caching.
2. Provider failures return realistic mock data so demo endpoints never crash.
3. `event-detection-service` normalizes raw inputs into standard events.
4. `radar-score-service` scores each event from 0-100 using market impact, rarity, trend strength, and AI confidence.
5. `ai-reasoning-service` enriches top signals through the configured AI provider or deterministic fallback.
6. API routes return React Query-friendly JSON envelopes with `data` and `meta`.

## Cache Windows

- Market data: 5 minutes
- Narratives: 15 minutes
- AI analysis: 30 minutes

No authentication, accounts, payments, or trading execution are implemented.
