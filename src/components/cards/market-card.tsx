import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn, formatPercent } from "@/lib/utils";
import type { Asset, MarketMetric } from "@/types";

export function MarketCard({ metric }: { metric: MarketMetric }) {
  const positive = metric.change >= 0;
  const Icon = positive ? ArrowUpRight : ArrowDownRight;

  return (
    <Card className="p-5">
      <p className="text-sm text-slate-400">{metric.label}</p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <p className="text-2xl font-black text-white">{metric.value}</p>
        <span
          className={cn(
            "flex items-center gap-1 text-sm font-semibold",
            positive ? "text-radar-green" : "text-radar-red",
          )}
        >
          <Icon className="size-4" />
          {formatPercent(metric.change)}
        </span>
      </div>
    </Card>
  );
}

export function AssetMarketCard({ asset }: { asset: Asset }) {
  const positive = asset.change24h >= 0;
  const Icon = positive ? ArrowUpRight : ArrowDownRight;

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-lg font-bold text-white">{asset.symbol}</p>
          <p className="text-sm text-slate-500">{asset.name}</p>
        </div>
        <span
          className={cn(
            "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
            positive
              ? "bg-radar-green/10 text-radar-green"
              : "bg-radar-red/10 text-radar-red",
          )}
        >
          <Icon className="size-3" />
          {formatPercent(asset.change24h)}
        </span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-slate-500">Price</p>
          <p className="font-semibold text-white">${asset.price.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-slate-500">Radar</p>
          <p className="font-semibold text-radar-blue">{asset.radarScore}</p>
        </div>
        <div>
          <p className="text-slate-500">Volume</p>
          <p className="font-semibold text-white">{asset.volume24h}</p>
        </div>
        <div>
          <p className="text-slate-500">MCap</p>
          <p className="font-semibold text-white">{asset.marketCap}</p>
        </div>
      </div>
    </Card>
  );
}
