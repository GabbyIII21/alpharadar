import { z } from "zod";

export const eventQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(50).default(20),
  asset: z.string().trim().min(2).max(12).optional(),
  type: z.string().trim().min(2).max(24).optional(),
});

export const radarQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(50).default(20),
  minScore: z.coerce.number().int().min(0).max(100).default(0),
});

export const narrativeQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(20).default(8),
});

export const watchlistQuerySchema = z.object({
  assets: z.string().trim().optional(),
});

export const chatRequestSchema = z.object({
  message: z.string().trim().min(2).max(1000),
  context: z
    .object({
      asset: z.string().trim().min(2).max(12).optional(),
      timeframe: z.string().trim().min(2).max(40).optional(),
    })
    .optional(),
});

export function searchParamsToObject(searchParams: URLSearchParams) {
  return Object.fromEntries(searchParams.entries());
}
