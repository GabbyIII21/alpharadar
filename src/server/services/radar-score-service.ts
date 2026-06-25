import type {
  ImpactClassification,
  RadarScore,
  StandardEvent,
} from "@/server/types/domain";
import { clamp } from "@/server/utils/format";

function impactFromScore(score: number): ImpactClassification {
  if (score >= 90) return "critical";
  if (score >= 75) return "high";
  if (score >= 55) return "medium";
  return "low";
}

export function scoreEvent(event: StandardEvent): RadarScore {
  const factors = {
    marketImpact: clamp(event.marketImpact),
    eventRarity: clamp(event.rarity),
    trendStrength: clamp(event.trendStrength),
    aiConfidence: clamp(event.confidence),
  };
  const score = clamp(
    factors.marketImpact * 0.35 +
      factors.eventRarity * 0.2 +
      factors.trendStrength * 0.25 +
      factors.aiConfidence * 0.2,
  );

  return {
    score,
    reasoning: `${event.title} scores ${score}/100 because market impact (${factors.marketImpact}), rarity (${factors.eventRarity}), trend strength (${factors.trendStrength}), and AI confidence (${factors.aiConfidence}) align.`,
    impact: impactFromScore(score),
    factors,
  };
}
