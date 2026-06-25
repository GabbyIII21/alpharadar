import { completeWithAI, parseAIJson } from "@/server/ai/provider";
import { eventExplanationPrompt } from "@/server/ai/prompts";
import type { AIAnalysis, StandardEvent } from "@/server/types/domain";
import { toSentiment } from "@/server/utils/format";

function fallbackAnalysis(event: StandardEvent): AIAnalysis {
  return {
    summary: event.summary,
    whyItMatters:
      "This matters because the signal combines market movement with contextual catalysts that can influence short-term positioning.",
    riskFactors: [
      "Signal may fade if volume normalizes.",
      "Crypto market beta can overpower asset-specific catalysts.",
      "External news data can lag fast market moves.",
    ],
    confidenceScore: event.confidence,
    impactAssessment:
      event.marketImpact >= 85
        ? "critical"
        : event.marketImpact >= 70
          ? "high"
          : "medium",
    sentiment: event.sentiment ?? toSentiment(Number(event.metrics.priceChange24h ?? 0)),
  };
}

export async function explainEvent(event: StandardEvent): Promise<AIAnalysis> {
  const fallback = fallbackAnalysis(event);
  const completion = await completeWithAI({
    messages: [{ role: "user", content: eventExplanationPrompt(event) }],
    temperature: 0.2,
    maxTokens: 500,
    responseFormat: "json_object",
  });

  return parseAIJson<AIAnalysis>(completion.content, fallback);
}
