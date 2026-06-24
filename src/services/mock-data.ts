import type {
  Alert,
  Asset,
  ChatMessage,
  Conversation,
  DashboardData,
  Insight,
  MarketMetric,
  Narrative,
  RadarEvent,
  WatchlistItem,
} from "@/types";

export const assets: Asset[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 108420,
    change24h: 2.84,
    volume24h: "$58.4B",
    marketCap: "$2.14T",
    radarScore: 92,
    sentiment: "bullish",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 5470,
    change24h: 1.62,
    volume24h: "$31.2B",
    marketCap: "$660.1B",
    radarScore: 83,
    sentiment: "bullish",
  },
  {
    symbol: "SOL",
    name: "Solana",
    price: 248.72,
    change24h: 4.96,
    volume24h: "$9.8B",
    marketCap: "$129.6B",
    radarScore: 88,
    sentiment: "bullish",
  },
  {
    symbol: "ONDO",
    name: "Ondo Finance",
    price: 1.86,
    change24h: 7.41,
    volume24h: "$890M",
    marketCap: "$5.9B",
    radarScore: 86,
    sentiment: "bullish",
  },
  {
    symbol: "AERO",
    name: "Aerodrome",
    price: 2.42,
    change24h: -1.28,
    volume24h: "$214M",
    marketCap: "$1.9B",
    radarScore: 61,
    sentiment: "neutral",
  },
  {
    symbol: "ARB",
    name: "Arbitrum",
    price: 1.34,
    change24h: -3.12,
    volume24h: "$731M",
    marketCap: "$6.8B",
    radarScore: 47,
    sentiment: "bearish",
  },
];

export const marketMetrics: MarketMetric[] = [
  { label: "Total Crypto Market Cap", value: "$3.91T", change: 2.18, tone: "bullish" },
  { label: "BTC Dominance", value: "54.7%", change: 0.42, tone: "bullish" },
  { label: "Stablecoin Inflows", value: "$2.8B", change: 12.4, tone: "bullish" },
  { label: "Funding Heat", value: "Elevated", change: -0.8, tone: "neutral" },
];

export const radarEvents: RadarEvent[] = [
  {
    id: "evt-001",
    slug: "btc-whale-accumulation",
    title: "BTC whale cluster accumulated 18,420 BTC across three venues",
    asset: "BTC",
    type: "whale",
    priority: "critical",
    radarScore: 94,
    confidence: 91,
    sentiment: "bullish",
    summary:
      "Large-wallet accumulation coincides with spot ETF inflows and declining exchange reserves.",
    aiExplanation:
      "Alpha Radar flags this as high-impact because whale accumulation is happening while liquidity on exchanges is thinning. The same wallets have historically accumulated before volatility expansion. ETF creations are also absorbing spot supply, which increases the probability that incremental demand moves price faster than usual.",
    detectedAt: "14 min ago",
    impactWindow: "6-24 hours",
    relatedSignals: [
      {
        type: "onchain",
        label: "Exchange reserves",
        detail: "BTC reserves fell 1.8% in 24 hours across tracked exchanges.",
        weight: 88,
      },
      {
        type: "market",
        label: "Spot premium",
        detail: "Coinbase premium turned positive during the accumulation window.",
        weight: 82,
      },
      {
        type: "derivatives",
        label: "Open interest",
        detail:
          "OI increased without a matching rise in funding, suggesting fresh spot-led bids.",
        weight: 76,
      },
    ],
    timeline: [
      {
        time: "09:42 UTC",
        title: "Wallet cluster activated",
        detail: "Dormant addresses moved funds into fresh accumulation wallets.",
        type: "whale",
      },
      {
        time: "10:11 UTC",
        title: "ETF flow confirmation",
        detail: "Net creations accelerated through the second trading session.",
        type: "market",
      },
      {
        time: "10:28 UTC",
        title: "Exchange reserves broke lower",
        detail: "Aggregate tracked balances printed a weekly low.",
        type: "onchain",
      },
    ],
  },
  {
    id: "evt-002",
    slug: "ondo-rwa-narrative-breakout",
    title: "ONDO leads RWA narrative after policy desk mentions tokenized treasuries",
    asset: "ONDO",
    type: "news",
    priority: "high",
    radarScore: 89,
    confidence: 87,
    sentiment: "bullish",
    summary:
      "Policy commentary and rising social velocity are reinforcing the tokenized assets trade.",
    aiExplanation:
      "The ONDO move matters because the news catalyst aligns with a broader narrative already gaining liquidity. Alpha Radar sees elevated relevance from synchronized volume, social velocity, and cross-asset rotation into RWA tokens. The risk is headline retracement, but the multi-signal alignment keeps the event ranked high.",
    detectedAt: "32 min ago",
    impactWindow: "1-3 days",
    relatedSignals: [
      {
        type: "sentiment",
        label: "Social velocity",
        detail: "RWA mentions are up 46% versus the 7-day baseline.",
        weight: 84,
      },
      {
        type: "market",
        label: "Relative strength",
        detail: "ONDO outperformed the large-cap basket by 5.9% intraday.",
        weight: 79,
      },
    ],
    timeline: [
      {
        time: "08:04 UTC",
        title: "Narrative spike detected",
        detail: "RWA keyword cluster moved into the top ten trending themes.",
        type: "sentiment",
      },
      {
        time: "08:17 UTC",
        title: "Volume expansion",
        detail: "Spot volume crossed 2.3x its 30-day hourly average.",
        type: "market",
      },
    ],
  },
  {
    id: "evt-003",
    slug: "arb-unlock-pressure",
    title: "ARB unlock watch moves to elevated risk as perp shorts build",
    asset: "ARB",
    type: "unlock",
    priority: "high",
    radarScore: 78,
    confidence: 82,
    sentiment: "bearish",
    summary:
      "Token unlock supply is approaching while derivatives positioning turns defensive.",
    aiExplanation:
      "The event is bearish because unlock timing is now aligned with weaker spot depth and aggressive short positioning. Alpha Radar does not treat unlocks as automatically negative, but current liquidity conditions mean supply absorption is less certain. A reclaim of spot bid depth would reduce the risk score.",
    detectedAt: "1 hr ago",
    impactWindow: "2-5 days",
    relatedSignals: [
      {
        type: "unlock",
        label: "Unlock value",
        detail: "$94M equivalent unlock enters the monitoring window.",
        weight: 81,
      },
      {
        type: "derivatives",
        label: "Short buildup",
        detail: "Perp short skew increased for four consecutive sessions.",
        weight: 73,
      },
    ],
    timeline: [
      {
        time: "07:00 UTC",
        title: "Unlock proximity alert",
        detail: "Scheduled supply entered the 5-day risk horizon.",
        type: "unlock",
      },
      {
        time: "07:36 UTC",
        title: "Order book thinning",
        detail: "Bid depth within 2% declined by 18%.",
        type: "market",
      },
    ],
  },
  {
    id: "evt-004",
    slug: "sol-memecoin-rotation",
    title: "SOL ecosystem activity rises as memecoin rotation returns",
    asset: "SOL",
    type: "onchain",
    priority: "medium",
    radarScore: 81,
    confidence: 79,
    sentiment: "bullish",
    summary:
      "DEX activity and priority fees are rising, indicating renewed risk appetite on Solana.",
    aiExplanation:
      "The signal is constructive for SOL because on-chain activity is expanding alongside price strength rather than lagging it. Fee growth, new wallet activity, and DEX routing all support the idea that ecosystem demand is returning. The event remains medium priority because memecoin-led flow can reverse quickly.",
    detectedAt: "2 hrs ago",
    impactWindow: "12-48 hours",
    relatedSignals: [
      {
        type: "onchain",
        label: "DEX activity",
        detail: "Solana DEX routed volume increased 22% day over day.",
        weight: 80,
      },
      {
        type: "sentiment",
        label: "Retail attention",
        detail: "SOL ecosystem tickers dominate retail watchlists.",
        weight: 68,
      },
    ],
    timeline: [
      {
        time: "06:12 UTC",
        title: "Activity acceleration",
        detail: "Priority fee spend moved above the 14-day median.",
        type: "onchain",
      },
      {
        time: "06:50 UTC",
        title: "Narrative confirmation",
        detail: "Memecoin rotation appeared in Alpha Radar trend clusters.",
        type: "sentiment",
      },
    ],
  },
];

export const narratives: Narrative[] = [
  {
    id: "nar-001",
    title: "Institutional BTC Supply Squeeze",
    score: 93,
    momentum: 18.4,
    summary:
      "ETF creations, whale accumulation, and exchange reserve declines are converging into a supply-led BTC setup.",
    assets: ["BTC", "ETH"],
    drivers: ["ETF inflows", "Whale accumulation", "Exchange reserve lows"],
  },
  {
    id: "nar-002",
    title: "Tokenized Treasuries and RWA Rotation",
    score: 88,
    momentum: 24.7,
    summary:
      "RWA assets are outperforming as policy commentary validates tokenized cash-flow narratives.",
    assets: ["ONDO"],
    drivers: ["Policy mentions", "Social velocity", "Spot volume expansion"],
  },
  {
    id: "nar-003",
    title: "Base Liquidity Flywheel",
    score: 72,
    momentum: 6.9,
    summary:
      "AERO remains a liquidity proxy for Base activity, but momentum is cooling after a sharp run.",
    assets: ["AERO", "ETH"],
    drivers: ["Base TVL", "DEX fees", "LP incentives"],
  },
];

export const insights: Insight[] = [
  {
    id: "ins-001",
    title: "BTC signal quality is unusually clean",
    body: "Whale flow, ETF demand, and reserve contraction are pointing in the same direction. Alpha Radar ranks this above typical single-catalyst accumulation events.",
    asset: "BTC",
    confidence: 91,
    sentiment: "bullish",
  },
  {
    id: "ins-002",
    title: "ARB risk is more about liquidity than unlock size",
    body: "The unlock is notable, but the stronger warning is weak bid depth into the event window. Watch for market makers to rebuild liquidity before reducing risk.",
    asset: "ARB",
    confidence: 82,
    sentiment: "bearish",
  },
  {
    id: "ins-003",
    title: "RWA is moving from theme to capital rotation",
    body: "ONDO volume and mention quality suggest the move is attracting fresh capital rather than only recycled social attention.",
    asset: "ONDO",
    confidence: 87,
    sentiment: "bullish",
  },
];

export const alerts: Alert[] = [
  {
    id: "al-001",
    title: "Critical BTC whale movement",
    asset: "BTC",
    priority: "critical",
    time: "14m",
    description: "Accumulation wallet cluster crossed the 90+ Radar Score threshold.",
    acknowledged: false,
  },
  {
    id: "al-002",
    title: "ONDO narrative acceleration",
    asset: "ONDO",
    priority: "high",
    time: "32m",
    description: "RWA mentions and spot volume are rising together.",
    acknowledged: false,
  },
  {
    id: "al-003",
    title: "ARB unlock risk window",
    asset: "ARB",
    priority: "high",
    time: "1h",
    description: "Supply unlock proximity combined with weak spot depth.",
    acknowledged: true,
  },
];

export const watchlist: WatchlistItem[] = assets.map((asset) => ({
  asset,
  recentSignals:
    asset.symbol === "BTC"
      ? 18
      : asset.symbol === "ONDO"
        ? 14
        : asset.symbol === "ARB"
          ? 11
          : 8,
  lastSignal:
    asset.symbol === "BTC"
      ? "Whale accumulation cluster"
      : asset.symbol === "ONDO"
        ? "RWA trend confirmation"
        : asset.symbol === "ARB"
          ? "Unlock pressure rising"
          : "Market regime update",
  aiSummary:
    asset.symbol === "ARB"
      ? "Risk remains elevated until spot depth improves or short skew normalizes."
      : asset.symbol === "AERO"
        ? "Momentum cooled, but Base activity keeps the asset relevant for rotation screens."
        : "Signals remain constructive with multiple independent confirmations.",
}));

const assistantSeed: ChatMessage = {
  id: "msg-001",
  role: "assistant",
  content:
    "Ask me about market structure, whale movements, unlock risk, or why a Radar Score changed. I will cite the signals behind the answer.",
  timestamp: "10:30 UTC",
};

export const conversations: Conversation[] = [
  {
    id: "conv-001",
    title: "BTC accumulation read",
    updatedAt: "10:42 UTC",
    messages: [
      assistantSeed,
      {
        id: "msg-002",
        role: "user",
        content: "Why did BTC jump to a 94 Radar Score?",
        timestamp: "10:41 UTC",
      },
      {
        id: "msg-003",
        role: "assistant",
        content:
          "BTC moved to 94 because three independent signals aligned: whale accumulation, positive spot premium, and falling exchange reserves. The score is high because those signals point to constrained supply while demand is increasing.",
        timestamp: "10:42 UTC",
      },
    ],
  },
  {
    id: "conv-002",
    title: "ARB unlock risk",
    updatedAt: "09:58 UTC",
    messages: [
      assistantSeed,
      {
        id: "msg-004",
        role: "user",
        content: "Is the ARB unlock already priced in?",
        timestamp: "09:56 UTC",
      },
      {
        id: "msg-005",
        role: "assistant",
        content:
          "Partially. Shorts have built ahead of the unlock, but spot bid depth is still weak. That means a relief move is possible if sellers do not appear, while downside risk remains if unlocked supply meets thin liquidity.",
        timestamp: "09:58 UTC",
      },
    ],
  },
];

export const suggestedPrompts = [
  "Why is BTC the highest priority event right now?",
  "Summarize the ONDO RWA narrative in plain English.",
  "Which watchlist asset has the weakest signal quality?",
  "What would invalidate the bearish ARB unlock read?",
];

export async function getDashboardData(): Promise<DashboardData> {
  await new Promise((resolve) => setTimeout(resolve, 220));
  return {
    assets,
    metrics: marketMetrics,
    events: radarEvents,
    narratives,
    insights,
    alerts,
    watchlist,
  };
}

export async function getEventBySlug(slug: string) {
  await new Promise((resolve) => setTimeout(resolve, 120));
  return radarEvents.find((event) => event.slug === slug) ?? radarEvents[0];
}
