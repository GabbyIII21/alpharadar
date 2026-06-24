# API Contracts

The current app uses mock data, but production APIs should normalize responses into these frontend contracts.

## Dashboard Data

```ts
type DashboardData = {
  assets: Asset[];
  metrics: MarketMetric[];
  events: RadarEvent[];
  narratives: Narrative[];
  insights: Insight[];
  alerts: Alert[];
  watchlist: WatchlistItem[];
};
```

## Radar Event

```ts
type RadarEvent = {
  id: string;
  slug: string;
  title: string;
  asset: AssetSymbol;
  type: SignalType;
  priority: Priority;
  radarScore: number;
  confidence: number;
  sentiment: Sentiment;
  summary: string;
  aiExplanation: string;
  detectedAt: string;
  impactWindow: string;
  relatedSignals: RelatedSignal[];
  timeline: TimelineItem[];
};
```

## Suggested Endpoints

```http
GET /api/dashboard
GET /api/events
GET /api/events/:slug
GET /api/watchlist
POST /api/ask-alpha
POST /api/alerts/:id/acknowledge
```

## Streaming Chat

`POST /api/ask-alpha` should support streamed text responses for production:

```json
{
  "conversationId": "conv-001",
  "message": "Why did BTC jump to a 94 Radar Score?"
}
```

The model response should cite supporting signals and include confidence language.
