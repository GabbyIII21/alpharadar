import { cacheDurations } from "@/server/lib/config";
import { badRequest, ok, serverError } from "@/server/routes/responses";
import { searchParamsToObject, watchlistQuerySchema } from "@/server/routes/schemas";
import { getWatchlistInsights } from "@/server/services/watchlist-service";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query = watchlistQuerySchema.parse(searchParamsToObject(url.searchParams));
    const assets = query.assets
      ?.split(",")
      .map((asset) => asset.trim())
      .filter(Boolean);
    const { watchlist, source } = await getWatchlistInsights(assets);

    return ok(watchlist, {
      source,
      cacheTtlSeconds: cacheDurations.aiAnalysis / 1000,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") return badRequest(error);
    return serverError(error);
  }
}
