import { Bell, Minus, TrendingDown, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn, formatPercent, sentimentTone } from "@/lib/utils";
import type { WatchlistItem } from "@/types";

export function WatchlistCard({ item }: { item: WatchlistItem }) {
  const { asset } = item;
  const Icon =
    asset.sentiment === "bullish"
      ? TrendingUp
      : asset.sentiment === "bearish"
        ? TrendingDown
        : Minus;

  return (
    <Card className="p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-md border border-radar-blue/30 bg-radar-blue/10 text-sm font-black text-radar-blue">
            {asset.symbol}
          </div>
          <div>
            <h3 className="font-semibold text-white">{asset.name}</h3>
            <p className="text-sm text-slate-500">${asset.price.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={sentimentTone(asset.sentiment)}>
            <Icon className="mr-1 size-3" />
            {asset.sentiment}
          </Badge>
          <span
            className={cn(
              "text-sm font-semibold",
              asset.change24h >= 0 ? "text-radar-green" : "text-radar-red",
            )}
          >
            {formatPercent(asset.change24h)}
          </span>
        </div>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-[160px_1fr]">
        <div>
          <div className="flex items-end gap-1">
            <span className="text-4xl font-black text-radar-blue">
              {asset.radarScore}
            </span>
            <span className="pb-1 text-sm text-slate-500">/100</span>
          </div>
          <Progress className="mt-2" value={asset.radarScore} />
        </div>
        <div>
          <p className="text-sm leading-6 text-slate-400">{item.aiSummary}</p>
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Bell className="size-3.5 text-radar-purple" />
              {item.recentSignals} recent signals
            </span>
            <span>Latest: {item.lastSignal}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
