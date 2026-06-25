import {
  getCoinGeckoMarkets,
  getCryptoPanicNews,
  getDexScreenerPairs,
  getFearGreedIndex,
} from "@/server/providers";

export async function getMarketSnapshot() {
  const [markets, pairs, news, fearGreed] = await Promise.all([
    getCoinGeckoMarkets(),
    getDexScreenerPairs(),
    getCryptoPanicNews(),
    getFearGreedIndex(),
  ]);

  return {
    markets,
    pairs,
    news,
    fearGreed,
    source:
      markets.source === "mock" ||
      pairs.source === "mock" ||
      news.source === "mock" ||
      fearGreed.source === "mock"
        ? ("mixed" as const)
        : ("live" as const),
  };
}
