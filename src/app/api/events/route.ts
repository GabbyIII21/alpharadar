import { cacheDurations } from "@/server/lib/config";
import { badRequest, ok, serverError } from "@/server/routes/responses";
import { eventQuerySchema, searchParamsToObject } from "@/server/routes/schemas";
import { detectEvents } from "@/server/services/event-detection-service";
import { normalizeSymbol } from "@/server/utils/format";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query = eventQuerySchema.parse(searchParamsToObject(url.searchParams));
    const { events, source } = await detectEvents();
    const asset = query.asset ? normalizeSymbol(query.asset) : undefined;

    const filtered = events
      .filter((event) => (asset ? event.asset === asset : true))
      .filter((event) => (query.type ? event.type === query.type : true))
      .slice(0, query.limit);

    return ok(filtered, {
      source,
      cacheTtlSeconds: cacheDurations.marketData / 1000,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") return badRequest(error);
    return serverError(error);
  }
}
