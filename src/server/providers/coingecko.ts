import { trackedAssets } from "@/server/lib/assets";
import { cacheDurations, serverConfig } from "@/server/lib/config";
import { fetchJson } from "@/server/lib/http";
import { guardProviderRateLimit } from "@/server/lib/rate-limit";
import { logger } from "@/server/lib/logger";
import { mockMarketAssets } from "@/server/providers/mock-data";
import type { MarketAsset, ProviderResult } from "@/server/types/domain";
import type { CoinGeckoMarketCoin } from "@/server/types/providers";
import { normalizeSymbol } from "@/server/utils/format";

export async function getCoinGeckoMarkets(): Promise<ProviderResult<MarketAsset[]>> {
  await guardProviderRateLimit("coingecko", 25);

  const ids = trackedAssets.map((asset) => asset.coingeckoId).join(",");
  const url = new URL("https://api.coingecko.com/api/v3/coins/markets");
  url.searchParams.set("vs_currency", "usd");
  url.searchParams.set("ids", ids);
  url.searchParams.set("order", "market_cap_desc");
  url.searchParams.set("price_change_percentage", "7d");

  const headers: HeadersInit = serverConfig.coingeckoApiKey
    ? { "x-cg-demo-api-key": serverConfig.coingeckoApiKey }
    : {};

  try {
    const coins = await fetchJson<CoinGeckoMarketCoin[]>(url.toString(), {
      headers,
      cacheKey: "provider:coingecko:markets",
      cacheTtlMs: cacheDurations.marketData,
    });

    const data = coins.flatMap((coin): MarketAsset[] => {
      const symbol = normalizeSymbol(coin.symbol);
      if (!symbol) return [];

      const asset: MarketAsset = {
        id: coin.id,
        symbol,
        name: coin.name,
        priceUsd: coin.current_price,
        priceChange24h: coin.price_change_percentage_24h ?? 0,
        volume24hUsd: coin.total_volume,
        marketCapUsd: coin.market_cap,
        rank: coin.market_cap_rank,
        source: "coingecko",
      };
      if (
        coin.price_change_percentage_7d_in_currency !== undefined &&
        coin.price_change_percentage_7d_in_currency !== null
      ) {
        asset.priceChange7d = coin.price_change_percentage_7d_in_currency;
      }

      return [asset];
    });

    return {
      data,
      source: "coingecko",
      stale: false,
      fetchedAt: new Date().toISOString(),
    };
  } catch (error) {
    logger.warn("CoinGecko fallback activated", {
      error: error instanceof Error ? error.message : String(error),
    });

    return {
      data: mockMarketAssets,
      source: "mock",
      stale: true,
      fetchedAt: new Date().toISOString(),
    };
  }
}
