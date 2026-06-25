import { getNarrativeTags } from "@/server/lib/assets";
import { getRadarSignals } from "@/server/services/radar-service";
import type {
  NarrativeCategory,
  NarrativeCluster,
  RadarSignal,
} from "@/server/types/domain";
import { clamp, id } from "@/server/utils/format";

const narrativeOrder: NarrativeCategory[] = [
  "AI Tokens",
  "DeFi",
  "RWA",
  "Gaming",
  "Meme Coins",
  "Layer 2",
  "Bitcoin",
  "Ethereum",
  "Market Risk",
];

function summarize(category: NarrativeCategory, events: RadarSignal[]) {
  const strongest = events[0];
  if (!strongest) return `${category} has limited live signal coverage right now.`;
  return `${category} is being driven by ${strongest.asset} ${strongest.type} activity and ${events.length} supporting signal${
    events.length === 1 ? "" : "s"
  }.`;
}

export async function getNarratives(): Promise<{
  narratives: NarrativeCluster[];
  source: "live" | "mock" | "mixed";
}> {
  const { signals, source } = await getRadarSignals();
  const buckets = new Map<NarrativeCategory, RadarSignal[]>();

  for (const signal of signals) {
    for (const tag of getNarrativeTags(signal.asset)) {
      buckets.set(tag as NarrativeCategory, [
        ...(buckets.get(tag as NarrativeCategory) ?? []),
        signal,
      ]);
    }
    if (signal.sentiment === "bearish" || signal.type === "sentiment") {
      buckets.set("Market Risk", [...(buckets.get("Market Risk") ?? []), signal]);
    }
  }

  const narratives = narrativeOrder
    .map((category) => {
      const events = (buckets.get(category) ?? []).sort(
        (a, b) => b.radarScore.score - a.radarScore.score,
      );
      if (events.length === 0) return undefined;
      const assets = [...new Set(events.map((event) => event.asset))];
      const strengthScore = clamp(
        events.reduce((sum, event) => sum + event.radarScore.score, 0) / events.length +
          Math.min(12, events.length * 2),
      );

      return {
        id: id("narrative"),
        title: `${category} momentum`,
        category,
        summary: summarize(category, events),
        strengthScore,
        momentum: clamp(
          events.reduce((sum, event) => sum + event.trendStrength, 0) / events.length,
        ),
        assets,
        drivers: events.slice(0, 4).map((event) => event.title),
        supportingEvents: events.slice(0, 6),
        ai: {
          summary: summarize(category, events),
          whyItMatters:
            "Narrative clusters help separate isolated price moves from broader capital rotation themes.",
          riskFactors: [
            "Narratives can become crowded quickly.",
            "Supporting events may share the same underlying market beta.",
          ],
          confidenceScore: clamp(strengthScore - 8),
        },
      } satisfies NarrativeCluster;
    })
    .filter((narrative): narrative is NarrativeCluster => Boolean(narrative))
    .sort((a, b) => b.strengthScore - a.strengthScore);

  return { narratives, source };
}
