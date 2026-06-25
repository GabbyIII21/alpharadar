# API Reference

All endpoints return:

```json
{
  "data": {},
  "meta": {
    "generatedAt": "2026-06-25T00:00:00.000Z",
    "source": "live",
    "cacheTtlSeconds": 300
  }
}
```

`source` can be `live`, `mock`, or `mixed`.

## GET `/api/events`

Returns recent standardized events.

Query params:

- `limit`: 1-50, default `20`
- `asset`: optional tracked asset symbol
- `type`: optional signal type

## GET `/api/radar`

Returns ranked radar signals with AI analysis.

Query params:

- `limit`: 1-50, default `20`
- `minScore`: 0-100, default `0`

## GET `/api/narratives`

Returns trending market narratives grouped from radar signals.

Query params:

- `limit`: 1-20, default `8`

## GET `/api/watchlist`

Returns watchlist insights for tracked assets.

Query params:

- `assets`: comma-separated asset symbols, for example `BTC,ONDO,SOL`

## POST `/api/chat`

Ask Alpha conversational endpoint.

Body:

```json
{
  "message": "What should I watch today?",
  "context": {
    "asset": "ONDO",
    "timeframe": "24h"
  }
}
```

Supported prompt families include daily watchlists, asset trends, strongest narratives, and recent market risks.
