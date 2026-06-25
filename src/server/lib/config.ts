import type { AIProviderName } from "@/server/types/domain";

const env = process.env;

function normalizeProvider(value: string | undefined): AIProviderName {
  const normalized = value?.toLowerCase();

  if (
    normalized === "openai" ||
    normalized === "openrouter" ||
    normalized === "gemini" ||
    normalized === "deepseek"
  ) {
    return normalized;
  }

  if (env.OPENROUTER_API_KEY) return "openrouter";
  if (env.GEMINI_API_KEY) return "gemini";
  if (env.DEEPSEEK_API_KEY) return "deepseek";

  return "openai";
}

export const serverConfig = {
  appUrl: env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  aiProvider: normalizeProvider(env.AI_PROVIDER),
  aiModel: env.AI_MODEL,
  openaiApiKey: env.OPENAI_API_KEY,
  openrouterApiKey: env.OPENROUTER_API_KEY,
  geminiApiKey: env.GEMINI_API_KEY,
  deepseekApiKey: env.DEEPSEEK_API_KEY,
  coingeckoApiKey: env.COINGECKO_API_KEY,
  cryptopanicApiKey: env.CRYPTOPANIC_API_KEY,
  requestTimeoutMs: Number(env.PROVIDER_TIMEOUT_MS ?? 8000),
  maxRetries: Number(env.PROVIDER_MAX_RETRIES ?? 2),
};

export const cacheDurations = {
  marketData: 5 * 60 * 1000,
  narratives: 15 * 60 * 1000,
  aiAnalysis: 30 * 60 * 1000,
};
