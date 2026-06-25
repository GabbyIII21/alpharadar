import { trackedSymbols } from "@/server/lib/assets";
import { cacheDurations, serverConfig } from "@/server/lib/config";
import { fetchJson } from "@/server/lib/http";
import { logger } from "@/server/lib/logger";
import { guardProviderRateLimit } from "@/server/lib/rate-limit";
import { mockNews } from "@/server/providers/mock-data";
import type { NewsItem, ProviderResult } from "@/server/types/domain";
import type { CryptoPanicResponse } from "@/server/types/providers";
import { normalizeSymbol } from "@/server/utils/format";
import type { Sentiment } from "@/types";

function inferSentiment(
  title: string,
  votes?: CryptoPanicResponse["results"][number]["votes"],
): Sentiment {
  const lower = title.toLowerCase();
  if (votes && votes.positive > votes.negative + 3) return "bullish";
  if (votes && votes.negative > votes.positive + 3) return "bearish";
  if (/(surge|rally|record|inflow|breakout|accumulate)/.test(lower)) return "bullish";
  if (/(hack|exploit|selloff|risk|liquidation|outflow|probe)/.test(lower))
    return "bearish";
  return "neutral";
}

export async function getCryptoPanicNews(): Promise<ProviderResult<NewsItem[]>> {
  if (!serverConfig.cryptopanicApiKey) {
    return {
      data: mockNews,
      source: "mock",
      stale: true,
      fetchedAt: new Date().toISOString(),
    };
  }

  await guardProviderRateLimit("cryptopanic", 20);

  const url = new URL("https://cryptopanic.com/api/v1/posts/");
  url.searchParams.set("auth_token", serverConfig.cryptopanicApiKey);
  url.searchParams.set("kind", "news");
  url.searchParams.set("currencies", trackedSymbols.join(","));

  try {
    const response = await fetchJson<CryptoPanicResponse>(url.toString(), {
      cacheKey: "provider:cryptopanic:news",
      cacheTtlMs: cacheDurations.marketData,
    });

    return {
      data: response.results.map((item) => ({
        id: String(item.id),
        title: item.title,
        url: item.url,
        source: item.source.title,
        publishedAt: item.published_at,
        currencies:
          item.currencies
            ?.map((currency) => normalizeSymbol(currency.code))
            .filter((symbol): symbol is NonNullable<typeof symbol> => Boolean(symbol)) ??
          [],
        sentiment: inferSentiment(item.title, item.votes),
        votes: item.votes
          ? {
              positive: item.votes.positive,
              negative: item.votes.negative,
              important: item.votes.important,
            }
          : undefined,
      })),
      source: "cryptopanic",
      stale: false,
      fetchedAt: new Date().toISOString(),
    };
  } catch (error) {
    logger.warn("CryptoPanic fallback activated", {
      error: error instanceof Error ? error.message : String(error),
    });

    return {
      data: mockNews,
      source: "mock",
      stale: true,
      fetchedAt: new Date().toISOString(),
    };
  }
}
