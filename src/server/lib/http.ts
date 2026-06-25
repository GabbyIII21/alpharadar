import { cache } from "@/server/lib/cache";
import { serverConfig } from "@/server/lib/config";
import { logger } from "@/server/lib/logger";

interface FetchJsonOptions {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit;
  timeoutMs?: number;
  retries?: number;
  cacheKey?: string;
  cacheTtlMs?: number;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function requestJson<T>(url: string, options: FetchJsonOptions = {}): Promise<T> {
  const retries = options.retries ?? serverConfig.maxRetries;
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      options.timeoutMs ?? serverConfig.requestTimeoutMs,
    );

    try {
      const response = await fetch(url, {
        method: options.method,
        headers: options.headers,
        body: options.body,
        signal: controller.signal,
        next: { revalidate: 0 },
      });

      if (!response.ok) {
        const retryAfter = response.headers.get("retry-after");

        if (response.status === 429 && retryAfter) {
          await sleep(Math.min(Number(retryAfter) * 1000, 5000));
        }

        throw new Error(`HTTP ${response.status} from ${url}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      lastError = error;

      if (attempt < retries) {
        await sleep(300 * 2 ** attempt);
      }
    } finally {
      clearTimeout(timeout);
    }
  }

  logger.warn("Provider request failed after retries", {
    url,
    error: lastError instanceof Error ? lastError.message : String(lastError),
  });

  throw lastError instanceof Error ? lastError : new Error("Provider request failed");
}

export async function fetchJson<T>(url: string, options: FetchJsonOptions = {}) {
  if (!options.cacheKey || !options.cacheTtlMs) {
    return requestJson<T>(url, options);
  }

  return cache.getOrSet(options.cacheKey, options.cacheTtlMs, () =>
    requestJson<T>(url, options),
  );
}
