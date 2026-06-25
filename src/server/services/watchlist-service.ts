import { trackedAssets } from "@/server/lib/assets";
import { getMarketSnapshot } from "@/server/services/market-data-service";
import { getRadarSignals } from "@/server/services/radar-service";
import type { WatchlistInsight } from "@/server/types/domain";
import { normalizeSymbol, toSentiment } from "@/server/utils/format";

export async function getWatchlistInsights(assets?: string[]): Promise<{
  watchlist: WatchlistInsight[];
  source: "live" | "mock" | "mixed";
}> {
  const requested = assets
    ?.map((asset) => normalizeSymbol(asset))
    .filter((asset): asset is NonNullable<typeof asset> => Boolean(asset));
  const symbols =
    requested && requested.length > 0
      ? requested
      : trackedAssets.map((asset) => asset.symbol);
  const [snapshot, radar] = await Promise.all([getMarketSnapshot(), getRadarSignals()]);

  const watchlist = symbols
    .map((symbol) => {
      const asset = snapshot.markets.data.find((item) => item.symbol === symbol);
      if (!asset) return undefined;

      const events = radar.signals.filter((signal) => signal.asset === symbol);
      const top = events[0];

      return {
        asset,
        radarScore:
          top?.radarScore.score ??
          Math.max(30, Math.min(70, 50 + asset.priceChange24h * 2)),
        recentSignals: events.length,
        sentiment: top?.sentiment ?? toSentiment(asset.priceChange24h),
        lastSignal: top?.title ?? `${symbol} market data refreshed`,
        aiSummary:
          top?.ai.summary ??
          `${asset.name} is showing ${asset.priceChange24h.toFixed(1)}% 24h performance with ${asset.volume24hUsd.toLocaleString()} USD volume.`,
        riskFactors: top?.ai.riskFactors ?? [
          "No high-confidence event cluster detected yet.",
        ],
        opportunities:
          asset.priceChange24h >= 0
            ? [
                "Watch for continuation on sustained volume.",
                "Compare move against sector peers.",
              ]
            : [
                "Look for stabilization after downside pressure.",
                "Monitor whether liquidity improves.",
              ],
        events,
      } satisfies WatchlistInsight;
    })
    .filter((item): item is WatchlistInsight => Boolean(item));

  return {
    watchlist,
    source: snapshot.source === "live" && radar.source === "live" ? "live" : "mixed",
  };
}
