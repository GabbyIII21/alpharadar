import { alphaSystemPrompt } from "@/server/ai/prompts";
import { cacheDurations, serverConfig } from "@/server/lib/config";
import { fetchJson } from "@/server/lib/http";
import { logger } from "@/server/lib/logger";
import type {
  AIChatMessage,
  AICompletionRequest,
  AICompletionResponse,
} from "@/server/types/providers";

interface ChatCompletionResponse {
  choices?: Array<{ message?: { content?: string } }>;
  model?: string;
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
  modelVersion?: string;
}

function providerConfig() {
  switch (serverConfig.aiProvider) {
    case "openrouter":
      return {
        key: serverConfig.openrouterApiKey,
        url: "https://openrouter.ai/api/v1/chat/completions",
        model: serverConfig.aiModel ?? "openai/gpt-4o-mini",
      };
    case "deepseek":
      return {
        key: serverConfig.deepseekApiKey,
        url: "https://api.deepseek.com/chat/completions",
        model: serverConfig.aiModel ?? "deepseek-chat",
      };
    case "gemini":
      return {
        key: serverConfig.geminiApiKey,
        url: "https://generativelanguage.googleapis.com/v1beta/models",
        model: serverConfig.aiModel ?? "gemini-1.5-flash",
      };
    case "openai":
    default:
      return {
        key: serverConfig.openaiApiKey,
        url: "https://api.openai.com/v1/chat/completions",
        model: serverConfig.aiModel ?? "gpt-4o-mini",
      };
  }
}

function fallbackContent(messages: AIChatMessage[]) {
  const last = messages.at(-1)?.content ?? "";
  return JSON.stringify({
    summary:
      "Alpha Radar detected a meaningful cluster of market, news, and sentiment signals.",
    whyItMatters:
      "The signal deserves attention because price action, volume, and narrative context are moving together.",
    riskFactors: [
      "External provider data may be delayed.",
      "Short-term crypto flows can reverse quickly.",
      "A single headline can distort the signal strength.",
    ],
    confidenceScore: last.length > 80 ? 78 : 70,
    impactAssessment: "medium",
    sentiment: "neutral",
  });
}

async function completeGemini(
  messages: AIChatMessage[],
  request: AICompletionRequest,
): Promise<AICompletionResponse> {
  const config = providerConfig();
  if (!config.key) throw new Error("Missing Gemini API key");

  const response = await fetchJson<GeminiResponse>(
    `${config.url}/${config.model}:generateContent?key=${config.key}`,
    {
      method: "POST",
      cacheKey: `ai:gemini:${JSON.stringify(messages)}`,
      cacheTtlMs: cacheDurations.aiAnalysis,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: messages
                  .map((message) => `${message.role}: ${message.content}`)
                  .join("\n"),
              },
            ],
          },
        ],
        generationConfig: {
          temperature: request.temperature ?? 0.2,
          maxOutputTokens: request.maxTokens ?? 700,
          responseMimeType:
            request.responseFormat === "json_object" ? "application/json" : "text/plain",
        },
      }),
    },
  );

  return {
    content:
      response.candidates?.[0]?.content?.parts?.[0]?.text ?? fallbackContent(messages),
    provider: "gemini",
    model: response.modelVersion ?? config.model,
  };
}

async function completeOpenAICompatible(
  messages: AIChatMessage[],
  request: AICompletionRequest,
): Promise<AICompletionResponse> {
  const config = providerConfig();
  if (!config.key) throw new Error(`Missing ${serverConfig.aiProvider} API key`);

  const response = await fetchJson<ChatCompletionResponse>(config.url, {
    method: "POST",
    cacheKey: `ai:${serverConfig.aiProvider}:${JSON.stringify(messages)}`,
    cacheTtlMs: cacheDurations.aiAnalysis,
    headers: {
      authorization: `Bearer ${config.key}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      messages,
      temperature: request.temperature ?? 0.2,
      max_tokens: request.maxTokens ?? 700,
      response_format:
        request.responseFormat === "json_object" ? { type: "json_object" } : undefined,
    }),
  });

  return {
    content: response.choices?.[0]?.message?.content ?? fallbackContent(messages),
    provider: serverConfig.aiProvider,
    model: response.model ?? config.model,
  };
}

export async function completeWithAI(
  request: AICompletionRequest,
): Promise<AICompletionResponse> {
  const messages = [
    { role: "system" as const, content: alphaSystemPrompt },
    ...request.messages,
  ];

  try {
    if (serverConfig.aiProvider === "gemini") {
      return await completeGemini(messages, request);
    }

    return await completeOpenAICompatible(messages, request);
  } catch (error) {
    logger.warn("AI provider fallback activated", {
      provider: serverConfig.aiProvider,
      error: error instanceof Error ? error.message : String(error),
    });

    return {
      content: fallbackContent(messages),
      provider: "mock",
      model: "deterministic-fallback",
    };
  }
}

export function parseAIJson<T>(content: string, fallback: T): T {
  try {
    const cleaned = content.replace(/^```json\s*|\s*```$/g, "");
    return JSON.parse(cleaned) as T;
  } catch {
    return fallback;
  }
}
