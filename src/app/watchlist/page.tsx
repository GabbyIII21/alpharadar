"use client";

import { Filter, Plus, Star } from "lucide-react";

import { WatchlistCard } from "@/components/cards/watchlist-card";
import { PageTransition } from "@/components/common/page-transition";
import { AppShell } from "@/components/layout/app-shell";
import { SectionHeader } from "@/components/layout/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { watchlist } from "@/services/mock-data";

export default function WatchlistPage() {
  const bullishCount = watchlist.filter(
    (item) => item.asset.sentiment === "bullish",
  ).length;
  const avgScore = Math.round(
    watchlist.reduce((total, item) => total + item.asset.radarScore, 0) /
      watchlist.length,
  );

  return (
    <AppShell>
      <PageTransition>
        <SectionHeader
          action={
            <Button>
              <Plus className="size-4" />
              Add asset
            </Button>
          }
          description="Track selected crypto assets, recent signals, Radar Scores, sentiment, and AI summaries in one focused workspace."
          eyebrow="Watchlist"
          title="Tracked Assets"
        />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card className="p-5">
            <p className="text-sm text-slate-400">Assets tracked</p>
            <p className="mt-2 text-3xl font-black text-white">{watchlist.length}</p>
          </Card>
          <Card className="p-5">
            <p className="text-sm text-slate-400">Average Radar Score</p>
            <p className="mt-2 text-3xl font-black text-radar-blue">{avgScore}</p>
          </Card>
          <Card className="p-5">
            <p className="text-sm text-slate-400">Bullish setups</p>
            <p className="mt-2 text-3xl font-black text-radar-green">{bullishCount}</p>
          </Card>
        </div>

        <Card className="mt-6 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Star className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
              <Input
                className="pl-10"
                placeholder="Search BTC, ETH, SOL, ONDO, AERO, ARB..."
              />
            </div>
            <Button variant="secondary">
              <Filter className="size-4" />
              Filters
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {["All", "Bullish", "Bearish", "High Score", "Unlock Risk"].map((filter) => (
              <Badge
                className="border-white/10 bg-white/[0.05] text-slate-300"
                key={filter}
              >
                {filter}
              </Badge>
            ))}
          </div>
        </Card>

        <div className="mt-6 space-y-4">
          {watchlist.map((item) => (
            <WatchlistCard item={item} key={item.asset.symbol} />
          ))}
        </div>
      </PageTransition>
    </AppShell>
  );
}
