import type { ChatRequest, ChatResponse } from "@/server/types/domain";
import { getNarratives } from "@/server/services/narrative-service";
import { getRadarSignals } from "@/server/services/radar-service";
import { id } from "@/server/utils/format";

function detectIntent(message: string): ChatResponse["intent"] {
  const lower = message.toLowerCase();
  if (lower.includes("watch today")) return "daily-watch";
  if (lower.includes("narrative")) return "narratives";
  if (lower.includes("risk")) return "market-risks";
  if (lower.includes("why") || lower.includes("trending")) return "asset-trend";
  return "general";
}

export async function askAlpha(request: ChatRequest): Promise<ChatResponse> {
  const intent = detectIntent(request.message);
  const [radar, narrativeData] = await Promise.all([getRadarSignals(), getNarratives()]);
  const supporting = radar.signals.slice(0, 5);
  const topNarrative = narrativeData.narratives[0];
  const topSignal = supporting[0];

  const summaryByIntent: Record<ChatResponse["intent"], string> = {
    "daily-watch": topSignal
      ? `Watch ${topSignal.asset}: ${topSignal.title} is the strongest current signal.`
      : "Watch BTC and ETH until stronger event clusters appear.",
    "asset-trend": topSignal
      ? `${topSignal.asset} is trending because ${topSignal.summary}`
      : "The asset trend is mixed because no strong current signal is available.",
    narratives: topNarrative
      ? `${topNarrative.title} leads with a ${topNarrative.strengthScore}/100 strength score.`
      : "No dominant narrative cluster is active yet.",
    "market-risks":
      "The main risks are fast reversals, headline-driven volatility, and crowded narrative rotation.",
    general: topSignal
      ? `The strongest Alpha Radar signal is ${topSignal.title}.`
      : "Alpha Radar is monitoring markets, news, sentiment, DEX activity, and placeholder whale flows.",
  };

  return {
    id: id("chat"),
    answer: {
      summary: summaryByIntent[intent],
      whyItMatters:
        "This answer combines ranked radar signals, event rarity, trend strength, and AI confidence into a compact market read.",
      riskFactors: [
        "Provider outages may trigger mock fallback data.",
        "Signals should be treated as intelligence, not trading execution advice.",
        "Market conditions can change faster than cached analysis windows.",
      ],
      confidenceScore: topSignal?.radarScore.score ?? 72,
      impactAssessment: topSignal?.radarScore.impact ?? "medium",
    },
    intent,
    supportingSignals: supporting.map((signal) => ({
      id: signal.id,
      title: signal.title,
      asset: signal.asset,
      score: signal.radarScore.score,
    })),
    generatedAt: new Date().toISOString(),
  };
}
