import { explainEvent } from "@/server/services/ai-reasoning-service";
import { detectEvents } from "@/server/services/event-detection-service";
import { scoreEvent } from "@/server/services/radar-score-service";
import type { RadarSignal } from "@/server/types/domain";

export async function getRadarSignals(): Promise<{
  signals: RadarSignal[];
  source: "live" | "mock" | "mixed";
}> {
  const { events, source } = await detectEvents();
  const topEvents = events.slice(0, 24);
  const signals = await Promise.all(
    topEvents.map(async (event) => ({
      ...event,
      radarScore: scoreEvent(event),
      ai: await explainEvent(event),
    })),
  );

  return {
    signals: signals.sort((a, b) => b.radarScore.score - a.radarScore.score),
    source,
  };
}
