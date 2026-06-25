import type { AssetSymbol, Priority, Sentiment } from "@/types";

export function clamp(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, Math.round(value)));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatCurrency(value: number) {
  if (value >= 1_000_000_000_000) return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value.toFixed(value < 10 ? 2 : 0)}`;
}

export function toPriority(score: number): Priority {
  if (score >= 90) return "critical";
  if (score >= 75) return "high";
  if (score >= 55) return "medium";
  return "low";
}

export function toSentiment(change: number): Sentiment {
  if (change >= 1.5) return "bullish";
  if (change <= -1.5) return "bearish";
  return "neutral";
}

export function relativeTime(isoDate: string) {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const diffMinutes = Math.max(1, Math.round(diffMs / 60_000));

  if (diffMinutes < 60) return `${diffMinutes} min ago`;

  const hours = Math.round(diffMinutes / 60);
  if (hours < 24) return `${hours} hr${hours === 1 ? "" : "s"} ago`;

  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

export function normalizeSymbol(symbol: string): AssetSymbol | undefined {
  const upper = symbol.toUpperCase();

  if (
    upper === "BTC" ||
    upper === "ETH" ||
    upper === "SOL" ||
    upper === "ONDO" ||
    upper === "AERO" ||
    upper === "ARB"
  ) {
    return upper;
  }

  return undefined;
}

export function id(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
