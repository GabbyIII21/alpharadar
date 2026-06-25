import type { StandardEvent } from "@/server/types/domain";

export const alphaSystemPrompt =
  "You are Alpha Radar, a concise crypto intelligence analyst. Return practical, risk-aware JSON only.";

export function eventExplanationPrompt(event: StandardEvent) {
  return `Explain this event for a crypto market operator: ${JSON.stringify(event)}`;
}

export function narrativeDetectionPrompt(events: StandardEvent[]) {
  return `Group these events into investable crypto narratives with strength scores: ${JSON.stringify(
    events,
  )}`;
}

export function confidenceScoringPrompt(event: StandardEvent) {
  return `Score confidence from 0-100 for this signal and identify invalidation risks: ${JSON.stringify(
    event,
  )}`;
}

export const analysisModes = {
  bullish:
    "Focus on upside catalysts, confirmation signals, and what would invalidate a bullish read.",
  bearish:
    "Focus on downside risk, liquidity stress, crowded positioning, and what would invalidate a bearish read.",
  neutral:
    "Focus on balanced interpretation, uncertainty, and the next data points to monitor.",
};
