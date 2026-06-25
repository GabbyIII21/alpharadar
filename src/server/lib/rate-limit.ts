const providerWindows = new Map<string, number[]>();

export async function guardProviderRateLimit(provider: string, maxPerMinute = 40) {
  const now = Date.now();
  const windowStart = now - 60_000;
  const timestamps =
    providerWindows.get(provider)?.filter((time) => time > windowStart) ?? [];

  if (timestamps.length >= maxPerMinute) {
    const waitMs = Math.max(250, timestamps[0] + 60_000 - now);
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  timestamps.push(Date.now());
  providerWindows.set(provider, timestamps);
}
