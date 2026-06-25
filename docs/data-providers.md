# Data Providers

Each provider has typed responses, retry handling, rate-limit protection, cache keys, and fallback data.

## CoinGecko

File: `src/server/providers/coingecko.ts`

Fetches tracked spot markets for BTC, ETH, SOL, ONDO, AERO, and ARB. Uses `COINGECKO_API_KEY` when present.

## DexScreener

File: `src/server/providers/dexscreener.ts`

Searches tracked assets and extracts DEX volume, liquidity, transaction count, and price change.

## CryptoPanic

File: `src/server/providers/cryptopanic.ts`

Uses `CRYPTOPANIC_API_KEY` when available. Without a key, the adapter immediately returns mock news to keep the hackathon demo reliable.

## Fear & Greed Index

File: `src/server/providers/fear-greed.ts`

Fetches current and previous values from Alternative.me to detect sentiment regime shifts.

## Fallback Policy

If any live call fails, the adapter logs a warning and returns realistic mock data marked as `stale`. API metadata reports `mixed` when one or more providers are in fallback mode.
