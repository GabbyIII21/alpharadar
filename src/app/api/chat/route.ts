import { cacheDurations } from "@/server/lib/config";
import { badRequest, ok, serverError } from "@/server/routes/responses";
import { chatRequestSchema } from "@/server/routes/schemas";
import { askAlpha } from "@/server/services/chat-service";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = chatRequestSchema.parse(await request.json());
    const response = await askAlpha(body);

    return ok(response, {
      source: "mixed",
      cacheTtlSeconds: cacheDurations.aiAnalysis / 1000,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") return badRequest(error);
    return serverError(error);
  }
}
