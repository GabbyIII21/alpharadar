import { trackedAssets } from "@/server/lib/assets";
import { cacheDurations } from "@/server/lib/config";
import { fetchJson } from "@/server/lib/http";
import { logger } from "@/server/lib/logger";
import { guardProviderRateLimit } from "@/server/lib/rate-limit";
import { mockDexPairs } from "@/server/providers/mock-data";
import type { DexPair, ProviderResult } from "@/server/types/domain";
import type { DexScreenerSearchResponse } from "@/server/types/providers";
import { normalizeSymbol } from "@/server/utils/format";

export async function getDexScreenerPairs(): Promise<ProviderResult<DexPair[]>> {
  await guardProviderRateLimit("dexscreener", 50);

  try {
    const responses = await Promise.all(
      trackedAssets.map((asset) =>
        fetchJson<DexScreenerSearchResponse>(
          `https://api.dexscreener.com/latest/dex/search?q=${encodeURIComponent(
            asset.dexSearch,
          )}`,
          {
            cacheKey: `provider:dexscreener:${asset.symbol}`,
            cacheTtlMs: cacheDurations.marketData,
          },
        ),
      ),
    );

    const pairs = responses.flatMap((response) => response.pairs ?? []);
    const mapped = pairs
      .flatMap((pair): DexPair[] => {
        const symbol = normalizeSymbol(pair.baseToken.symbol);
        if (!symbol) return [];

        return [
          {
            chainId: pair.chainId,
            dexId: pair.dexId,
            pairAddress: pair.pairAddress,
            baseSymbol: symbol,
            baseName: pair.baseToken.name,
            quoteSymbol: pair.quoteToken.symbol,
            priceUsd: Number(pair.priceUsd ?? 0),
            volume24hUsd: pair.volume?.h24 ?? 0,
            liquidityUsd: pair.liquidity?.usd ?? 0,
            txns24h: (pair.txns?.h24?.buys ?? 0) + (pair.txns?.h24?.sells ?? 0),
            priceChange24h: pair.priceChange?.h24 ?? 0,
            source: "dexscreener",
          },
        ];
      })
      .sort((a, b) => b.volume24hUsd - a.volume24hUsd)
      .slice(0, 20);

    return {
      data: mapped.length > 0 ? mapped : mockDexPairs,
      source: mapped.length > 0 ? "dexscreener" : "mock",
      stale: mapped.length === 0,
      fetchedAt: new Date().toISOString(),
    };
  } catch (error) {
    logger.warn("DexScreener fallback activated", {
      error: error instanceof Error ? error.message : String(error),
    });

    return {
      data: mockDexPairs,
      source: "mock",
      stale: true,
      fetchedAt: new Date().toISOString(),
    };
  }
}
