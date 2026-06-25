import { cacheDurations } from "@/server/lib/config";
import { fetchJson } from "@/server/lib/http";
import { logger } from "@/server/lib/logger";
import { guardProviderRateLimit } from "@/server/lib/rate-limit";
import { mockFearGreed } from "@/server/providers/mock-data";
import type { FearGreedSnapshot, ProviderResult } from "@/server/types/domain";
import type { FearGreedResponse } from "@/server/types/providers";

export async function getFearGreedIndex(): Promise<ProviderResult<FearGreedSnapshot>> {
  await guardProviderRateLimit("fear-greed", 30);

  try {
    const response = await fetchJson<FearGreedResponse>(
      "https://api.alternative.me/fng/?limit=2",
      {
        cacheKey: "provider:fear-greed:index",
        cacheTtlMs: cacheDurations.marketData,
      },
    );
    const current = response.data[0];
    const previous = response.data[1];

    return {
      data: {
        value: Number(current.value),
        classification: current.value_classification,
        timestamp: new Date(Number(current.timestamp) * 1000).toISOString(),
        previousValue: previous ? Number(previous.value) : undefined,
        source: "fear-greed",
      },
      source: "fear-greed",
      stale: false,
      fetchedAt: new Date().toISOString(),
    };
  } catch (error) {
    logger.warn("Fear and Greed fallback activated", {
      error: error instanceof Error ? error.message : String(error),
    });

    return {
      data: mockFearGreed,
      source: "mock",
      stale: true,
      fetchedAt: new Date().toISOString(),
    };
  }
}
