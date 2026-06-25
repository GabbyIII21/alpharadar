import { cacheDurations } from "@/server/lib/config";
import { badRequest, ok, serverError } from "@/server/routes/responses";
import { radarQuerySchema, searchParamsToObject } from "@/server/routes/schemas";
import { getRadarSignals } from "@/server/services/radar-service";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query = radarQuerySchema.parse(searchParamsToObject(url.searchParams));
    const { signals, source } = await getRadarSignals();

    return ok(
      signals
        .filter((signal) => signal.radarScore.score >= query.minScore)
        .slice(0, query.limit),
      {
        source,
        cacheTtlSeconds: cacheDurations.aiAnalysis / 1000,
      },
    );
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") return badRequest(error);
    return serverError(error);
  }
}
