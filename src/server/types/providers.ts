import type { AssetSymbol, Sentiment } from "@/types";

export interface CoinGeckoMarketCoin {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number | null;
  price_change_percentage_7d_in_currency?: number | null;
}

export interface DexScreenerTokenRef {
  address: string;
  name: string;
  symbol: string;
}

export interface DexScreenerPair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: DexScreenerTokenRef;
  quoteToken: DexScreenerTokenRef;
  priceUsd?: string;
  txns?: {
    h24?: {
      buys: number;
      sells: number;
    };
  };
  volume?: {
    h24?: number;
  };
  priceChange?: {
    h24?: number;
  };
  liquidity?: {
    usd?: number;
  };
}

export interface DexScreenerSearchResponse {
  schemaVersion: string;
  pairs: DexScreenerPair[] | null;
}

export interface CryptoPanicCurrency {
  code: string;
  title: string;
  slug: string;
  url: string;
}

export interface CryptoPanicNewsResult {
  id: number;
  title: string;
  url: string;
  published_at: string;
  kind: string;
  domain: string;
  source: {
    title: string;
    region: string;
    domain: string;
  };
  currencies?: CryptoPanicCurrency[];
  votes?: {
    negative: number;
    positive: number;
    important: number;
    liked: number;
    disliked: number;
    lol: number;
    toxic: number;
    saved: number;
    comments: number;
  };
}

export interface CryptoPanicResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CryptoPanicNewsResult[];
}

export interface FearGreedValue {
  value: string;
  value_classification: string;
  timestamp: string;
  time_until_update?: string;
}

export interface FearGreedResponse {
  name: string;
  data: FearGreedValue[];
  metadata: {
    error: string | null;
  };
}

export interface AIChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AICompletionRequest {
  messages: AIChatMessage[];
  temperature?: number;
  maxTokens?: number;
  responseFormat?: "json_object";
}

export interface AICompletionResponse {
  content: string;
  provider: string;
  model: string;
}

export interface ProviderRequestOptions {
  cacheKey: string;
  cacheTtlMs: number;
  provider: string;
}

export interface AssetLookup {
  id: string;
  symbol: AssetSymbol;
  name: string;
  coingeckoId: string;
  dexSearch: string;
  narrativeTags: string[];
}

export interface NewsSentimentRule {
  sentiment: Sentiment;
  terms: string[];
}
