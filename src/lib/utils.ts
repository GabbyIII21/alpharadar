import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value > 1000 ? 0 : 2,
  }).format(value);
}

export function formatPercent(value: number) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

export function scoreTone(score: number) {
  if (score >= 85) return "text-radar-green";
  if (score >= 70) return "text-radar-blue";
  if (score >= 50) return "text-radar-amber";
  return "text-radar-red";
}

export function priorityTone(priority: string) {
  switch (priority) {
    case "critical":
      return "border-radar-red/40 bg-radar-red/10 text-radar-red";
    case "high":
      return "border-radar-amber/40 bg-radar-amber/10 text-radar-amber";
    case "medium":
      return "border-radar-blue/40 bg-radar-blue/10 text-radar-blue";
    default:
      return "border-slate-700 bg-slate-900/70 text-slate-300";
  }
}

export function sentimentTone(sentiment: string) {
  switch (sentiment) {
    case "bullish":
      return "border-radar-green/40 bg-radar-green/10 text-radar-green";
    case "bearish":
      return "border-radar-red/40 bg-radar-red/10 text-radar-red";
    default:
      return "border-slate-700 bg-slate-900/70 text-slate-300";
  }
}
