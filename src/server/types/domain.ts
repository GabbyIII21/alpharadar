import type { AssetSymbol, Priority, Sentiment, SignalType } from "@/types";

export type ImpactClassification = "critical" | "high" | "medium" | "low";

export type ProviderName = "coingecko" | "dexscreener" | "cryptopanic" | "fear-greed";

export type AIProviderName = "openai" | "openrouter" | "gemini" | "deepseek";

export interface MarketAsset {
  id: string;
  symbol: AssetSymbol;
  name: string;
  priceUsd: number;
  priceChange24h: number;
  priceChange7d?: number;
  volume24hUsd: number;
  marketCapUsd: number;
  rank?: number;
  source: ProviderName | "mock";
}

export interface DexPair {
  chainId: string;
  dexId: string;
  pairAddress: string;
  baseSymbol: string;
  baseName: string;
  quoteSymbol: string;
  priceUsd: number;
  volume24hUsd: number;
  liquidityUsd: number;
  txns24h: number;
  priceChange24h: number;
  source: ProviderName | "mock";
}

export interface NewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  currencies: AssetSymbol[];
  sentiment: Sentiment;
  votes?: {
    positive: number;
    negative: number;
    important: number;
  };
}

export interface FearGreedSnapshot {
  value: number;
  classification: string;
  timestamp: string;
  previousValue?: number;
  source: ProviderName | "mock";
}

export interface ProviderResult<T> {
  data: T;
  source: ProviderName | "mock";
  stale: boolean;
  fetchedAt: string;
}

export interface StandardEvent {
  id: string;
  slug: string;
  title: string;
  asset: AssetSymbol;
  type: SignalType;
  priority: Priority;
  sentiment: Sentiment;
  summary: string;
  detectedAt: string;
  impactWindow: string;
  source: ProviderName | "ai" | "engine" | "mock";
  metrics: Record<string, number | string>;
  rarity: number;
  trendStrength: number;
  marketImpact: number;
  confidence: number;
  relatedSignals: Array<{
    type: SignalType;
    label: string;
    detail: string;
    weight: number;
  }>;
  timeline: Array<{
    time: string;
    title: string;
    detail: string;
    type: SignalType;
  }>;
}

export interface RadarScore {
  score: number;
  reasoning: string;
  impact: ImpactClassification;
  factors: {
    marketImpact: number;
    eventRarity: number;
    trendStrength: number;
    aiConfidence: number;
  };
}

export interface RadarSignal extends StandardEvent {
  radarScore: RadarScore;
  ai: AIAnalysis;
}

export interface AIAnalysis {
  summary: string;
  whyItMatters: string;
  riskFactors: string[];
  confidenceScore: number;
  impactAssessment: ImpactClassification;
  sentiment: Sentiment;
}

export interface NarrativeCluster {
  id: string;
  title: string;
  category: NarrativeCategory;
  summary: string;
  strengthScore: number;
  momentum: number;
  assets: AssetSymbol[];
  drivers: string[];
  supportingEvents: RadarSignal[];
  ai: Pick<AIAnalysis, "summary" | "whyItMatters" | "riskFactors" | "confidenceScore">;
}

export type NarrativeCategory =
  | "AI Tokens"
  | "DeFi"
  | "RWA"
  | "Gaming"
  | "Meme Coins"
  | "Layer 2"
  | "Bitcoin"
  | "Ethereum"
  | "Market Risk";

export interface WatchlistInsight {
  asset: MarketAsset;
  radarScore: number;
  recentSignals: number;
  sentiment: Sentiment;
  lastSignal: string;
  aiSummary: string;
  riskFactors: string[];
  opportunities: string[];
  events: RadarSignal[];
}

export interface ChatRequest {
  message: string;
  context?: {
    asset?: string;
    timeframe?: string;
  };
}

export interface ChatResponse {
  id: string;
  answer: {
    summary: string;
    whyItMatters: string;
    riskFactors: string[];
    confidenceScore: number;
    impactAssessment: ImpactClassification;
  };
  intent: "daily-watch" | "asset-trend" | "narratives" | "market-risks" | "general";
  supportingSignals: Array<{
    id: string;
    title: string;
    asset: AssetSymbol;
    score: number;
  }>;
  generatedAt: string;
}
