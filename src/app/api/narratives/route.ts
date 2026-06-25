import { cacheDurations } from "@/server/lib/config";
import { badRequest, ok, serverError } from "@/server/routes/responses";
import { narrativeQuerySchema, searchParamsToObject } from "@/server/routes/schemas";
import { getNarratives } from "@/server/services/narrative-service";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query = narrativeQuerySchema.parse(searchParamsToObject(url.searchParams));
    const { narratives, source } = await getNarratives();

    return ok(narratives.slice(0, query.limit), {
      source,
      cacheTtlSeconds: cacheDurations.narratives / 1000,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") return badRequest(error);
    return serverError(error);
  }
}
