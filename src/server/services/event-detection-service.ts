import { getMarketSnapshot } from "@/server/services/market-data-service";
import type { StandardEvent } from "@/server/types/domain";
import { clamp, id, slugify, toPriority, toSentiment } from "@/server/utils/format";
import type { AssetSymbol, SignalType } from "@/types";

function eventBase(input: {
  title: string;
  asset: AssetSymbol;
  type: SignalType;
  summary: string;
  sentiment: StandardEvent["sentiment"];
  metrics: StandardEvent["metrics"];
  rarity: number;
  trendStrength: number;
  marketImpact: number;
  confidence: number;
  source: StandardEvent["source"];
}): StandardEvent {
  const scoreHint = clamp(
    input.rarity * 0.2 +
      input.trendStrength * 0.3 +
      input.marketImpact * 0.3 +
      input.confidence * 0.2,
  );
  const detectedAt = new Date().toISOString();

  return {
    id: id("event"),
    slug: slugify(`${input.asset}-${input.title}`),
    title: input.title,
    asset: input.asset,
    type: input.type,
    priority: toPriority(scoreHint),
    sentiment: input.sentiment,
    summary: input.summary,
    detectedAt,
    impactWindow: scoreHint >= 75 ? "24-72 hours" : "6-24 hours",
    source: input.source,
    metrics: input.metrics,
    rarity: clamp(input.rarity),
    trendStrength: clamp(input.trendStrength),
    marketImpact: clamp(input.marketImpact),
    confidence: clamp(input.confidence),
    relatedSignals: [
      {
        type: input.type,
        label: "Primary signal",
        detail: input.summary,
        weight: scoreHint,
      },
    ],
    timeline: [
      {
        time: detectedAt,
        title: "Signal detected",
        detail: input.summary,
        type: input.type,
      },
    ],
  };
}

export async function detectEvents(): Promise<{
  events: StandardEvent[];
  source: "live" | "mock" | "mixed";
}> {
  const snapshot = await getMarketSnapshot();
  const events: StandardEvent[] = [];

  for (const asset of snapshot.markets.data) {
    const absChange = Math.abs(asset.priceChange24h);
    const volumeRatio =
      asset.marketCapUsd > 0 ? asset.volume24hUsd / asset.marketCapUsd : 0;

    if (absChange >= 3) {
      events.push(
        eventBase({
          title:
            asset.priceChange24h > 0
              ? `${asset.symbol} major gainer detected`
              : `${asset.symbol} major loser detected`,
          asset: asset.symbol,
          type: "market",
          sentiment: toSentiment(asset.priceChange24h),
          summary: `${asset.name} moved ${asset.priceChange24h.toFixed(1)}% over 24h with ${volumeRatio.toFixed(
            3,
          )} volume-to-market-cap turnover.`,
          metrics: {
            priceChange24h: asset.priceChange24h,
            volume24hUsd: asset.volume24hUsd,
            marketCapUsd: asset.marketCapUsd,
          },
          rarity: Math.min(95, 45 + absChange * 5),
          trendStrength: Math.min(95, 45 + absChange * 4),
          marketImpact: Math.min(
            95,
            40 + volumeRatio * 500 + (asset.rank ? Math.max(0, 20 - asset.rank / 10) : 0),
          ),
          confidence: 82,
          source: asset.source,
        }),
      );
    }

    if (volumeRatio >= 0.08) {
      events.push(
        eventBase({
          title: `${asset.symbol} volume spike`,
          asset: asset.symbol,
          type: "market",
          sentiment: toSentiment(asset.priceChange24h),
          summary: `${asset.symbol} volume is elevated relative to market cap, suggesting active repricing or rotation.`,
          metrics: { volumeRatio, volume24hUsd: asset.volume24hUsd },
          rarity: Math.min(92, 55 + volumeRatio * 220),
          trendStrength: Math.min(90, 50 + volumeRatio * 180),
          marketImpact: Math.min(90, 45 + volumeRatio * 260),
          confidence: 76,
          source: asset.source,
        }),
      );
    }
  }

  for (const pair of snapshot.pairs.data.slice(0, 8)) {
    if (pair.txns24h >= 12000 || pair.volume24hUsd >= 75000000) {
      events.push(
        eventBase({
          title: `${pair.baseSymbol} DEX activity spike`,
          asset: pair.baseSymbol as AssetSymbol,
          type: "onchain",
          sentiment: toSentiment(pair.priceChange24h),
          summary: `${pair.baseSymbol}/${pair.quoteSymbol} activity on ${pair.dexId} reached ${pair.txns24h.toLocaleString()} transactions over 24h.`,
          metrics: {
            txns24h: pair.txns24h,
            volume24hUsd: pair.volume24hUsd,
            liquidityUsd: pair.liquidityUsd,
          },
          rarity: 72,
          trendStrength: 78,
          marketImpact: 66,
          confidence: 74,
          source: pair.source,
        }),
      );
    }
  }

  for (const item of snapshot.news.data) {
    const importance = item.votes?.important ?? 8;
    if (importance >= 12 || item.currencies.length > 0) {
      for (const asset of item.currencies.length > 0
        ? item.currencies
        : (["BTC"] as AssetSymbol[])) {
        events.push(
          eventBase({
            title: `${asset} news spike`,
            asset,
            type: "news",
            sentiment: item.sentiment,
            summary: item.title,
            metrics: {
              positiveVotes: item.votes?.positive ?? 0,
              negativeVotes: item.votes?.negative ?? 0,
              importantVotes: importance,
            },
            rarity: Math.min(90, 50 + importance * 2),
            trendStrength: Math.min(88, 52 + importance * 1.5),
            marketImpact: item.sentiment === "neutral" ? 58 : 68,
            confidence: 70,
            source: "cryptopanic",
          }),
        );
      }
    }
  }

  const fearChange =
    snapshot.fearGreed.data.previousValue === undefined
      ? 0
      : snapshot.fearGreed.data.value - snapshot.fearGreed.data.previousValue;

  if (Math.abs(fearChange) >= 5) {
    events.push(
      eventBase({
        title: "Fear & Greed regime shift",
        asset: "BTC",
        type: "sentiment",
        sentiment: fearChange > 0 ? "bullish" : "bearish",
        summary: `Fear & Greed moved from ${snapshot.fearGreed.data.previousValue} to ${snapshot.fearGreed.data.value} (${snapshot.fearGreed.data.classification}).`,
        metrics: {
          value: snapshot.fearGreed.data.value,
          previousValue: snapshot.fearGreed.data.previousValue ?? 0,
        },
        rarity: Math.min(90, 45 + Math.abs(fearChange) * 5),
        trendStrength: Math.min(90, 55 + Math.abs(fearChange) * 4),
        marketImpact: 72,
        confidence: 79,
        source: snapshot.fearGreed.data.source,
      }),
    );
  }

  events.push(
    eventBase({
      title: "Whale activity placeholder",
      asset: "ETH",
      type: "whale",
      sentiment: "neutral",
      summary:
        "Whale flow ingestion is reserved for the next provider phase; endpoint returns a stable placeholder signal.",
      metrics: { trackedWallets: 0, netFlowUsd: 0 },
      rarity: 35,
      trendStrength: 30,
      marketImpact: 45,
      confidence: 40,
      source: "engine",
    }),
  );

  return {
    events: events.sort(
      (a, b) => b.marketImpact + b.trendStrength - (a.marketImpact + a.trendStrength),
    ),
    source: snapshot.source,
  };
}
