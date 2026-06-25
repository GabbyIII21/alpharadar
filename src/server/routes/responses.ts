import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { logger } from "@/server/lib/logger";

export interface ApiMeta {
  generatedAt: string;
  source: "live" | "mock" | "mixed";
  cacheTtlSeconds?: number;
}

export interface ApiEnvelope<T> {
  data: T;
  meta: ApiMeta;
}

export function ok<T>(data: T, meta: Omit<ApiMeta, "generatedAt">) {
  return NextResponse.json<ApiEnvelope<T>>({
    data,
    meta: {
      generatedAt: new Date().toISOString(),
      ...meta,
    },
  });
}

export function badRequest(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: "Invalid request",
        issues: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    );
  }

  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}

export function serverError(error: unknown) {
  logger.error("Unhandled API route error", {
    error: error instanceof Error ? error.message : String(error),
  });

  return NextResponse.json(
    {
      error: "Alpha Radar could not complete the request.",
    },
    { status: 500 },
  );
}
