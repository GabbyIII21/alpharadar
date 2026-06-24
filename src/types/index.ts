export type AssetSymbol = "BTC" | "ETH" | "SOL" | "ONDO" | "AERO" | "ARB";

export type Sentiment = "bullish" | "bearish" | "neutral";

export type Priority = "critical" | "high" | "medium" | "low";

export type SignalType =
  | "market"
  | "onchain"
  | "whale"
  | "unlock"
  | "sentiment"
  | "news"
  | "derivatives";

export interface Asset {
  symbol: AssetSymbol;
  name: string;
  price: number;
  change24h: number;
  volume24h: string;
  marketCap: string;
  radarScore: number;
  sentiment: Sentiment;
}

export interface MarketMetric {
  label: string;
  value: string;
  change: number;
  tone: Sentiment;
}

export interface RelatedSignal {
  type: SignalType;
  label: string;
  detail: string;
  weight: number;
}

export interface TimelineItem {
  time: string;
  title: string;
  detail: string;
  type: SignalType;
}

export interface RadarEvent {
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
}

export interface Narrative {
  id: string;
  title: string;
  score: number;
  momentum: number;
  summary: string;
  assets: AssetSymbol[];
  drivers: string[];
}

export interface Insight {
  id: string;
  title: string;
  body: string;
  asset?: AssetSymbol;
  confidence: number;
  sentiment: Sentiment;
}

export interface Alert {
  id: string;
  title: string;
  asset: AssetSymbol;
  priority: Priority;
  time: string;
  description: string;
  acknowledged: boolean;
}

export interface WatchlistItem {
  asset: Asset;
  recentSignals: number;
  aiSummary: string;
  lastSignal: string;
}

export interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export interface DashboardData {
  assets: Asset[];
  metrics: MarketMetric[];
  events: RadarEvent[];
  narratives: Narrative[];
  insights: Insight[];
  alerts: Alert[];
  watchlist: WatchlistItem[];
}
