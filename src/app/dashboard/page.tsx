"use client";

import { RefreshCcw, Zap } from "lucide-react";

import { AlertCard } from "@/components/cards/alert-card";
import { EventCard } from "@/components/cards/event-card";
import { InsightCard } from "@/components/cards/insight-card";
import { MarketCard } from "@/components/cards/market-card";
import { NarrativeCard } from "@/components/cards/narrative-card";
import { RadarScoreCard } from "@/components/cards/radar-score-card";
import { WatchlistCard } from "@/components/cards/watchlist-card";
import { DashboardSkeleton } from "@/components/common/loading-states";
import { PageTransition } from "@/components/common/page-transition";
import { AppShell } from "@/components/layout/app-shell";
import { SectionHeader } from "@/components/layout/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardData } from "@/hooks/use-dashboard-data";

export default function DashboardPage() {
  const { data, isLoading, isError, refetch, isFetching } = useDashboardData();

  return (
    <AppShell>
      <PageTransition>
        <SectionHeader
          action={
            <Button disabled={isFetching} onClick={() => refetch()} variant="secondary">
              <RefreshCcw className="size-4" />
              Refresh
            </Button>
          }
          description="Live-style intelligence workspace for market structure, on-chain anomalies, narratives, alerts, and AI-generated explanations."
          eyebrow="Command Center"
          title="Crypto Intelligence Dashboard"
        />

        {isLoading ? (
          <div className="mt-8">
            <DashboardSkeleton />
          </div>
        ) : null}

        {isError ? (
          <Card className="mt-8 border-radar-red/30 bg-radar-red/10 p-5">
            <p className="font-semibold text-white">Unable to load dashboard data.</p>
            <p className="mt-2 text-sm text-slate-300">
              Try refreshing the mock intelligence feed.
            </p>
          </Card>
        ) : null}

        {data ? (
          <div className="mt-8 space-y-8">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {data.metrics.map((metric) => (
                <MarketCard key={metric.label} metric={metric} />
              ))}
            </div>

            <div className="grid gap-4 xl:grid-cols-[1.45fr_0.85fr]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Radar Feed</h2>
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-radar-blue">
                    <Zap className="size-4" />
                    {data.events.length} active events
                  </span>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {data.events.map((event, index) => (
                    <EventCard event={event} featured={index === 0} key={event.id} />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <RadarScoreCard
                  confidence={data.events[0].confidence}
                  score={data.events[0].radarScore}
                  sentiment={data.events[0].sentiment}
                />
                <Card>
                  <CardHeader>
                    <CardTitle>High Priority Events</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {data.events
                      .filter(
                        (event) =>
                          event.priority === "critical" || event.priority === "high",
                      )
                      .map((event) => (
                        <div
                          className="rounded-md border border-white/10 bg-white/[0.04] p-3"
                          key={event.id}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-semibold text-white">
                              {event.asset}
                            </p>
                            <span className="text-sm font-black text-radar-blue">
                              {event.radarScore}
                            </span>
                          </div>
                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">
                            {event.title}
                          </p>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
              <div className="space-y-4 xl:col-span-2">
                <h2 className="text-xl font-bold text-white">Trending Narratives</h2>
                <div className="grid gap-4 lg:grid-cols-3">
                  {data.narratives.map((narrative) => (
                    <NarrativeCard key={narrative.id} narrative={narrative} />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">Recent Alerts</h2>
                {data.alerts.map((alert) => (
                  <AlertCard alert={alert} key={alert.id} />
                ))}
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">Watchlist</h2>
                {data.watchlist.slice(0, 3).map((item) => (
                  <WatchlistCard item={item} key={item.asset.symbol} />
                ))}
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">AI Insights</h2>
                {data.insights.map((insight) => (
                  <InsightCard insight={insight} key={insight.id} />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </PageTransition>
    </AppShell>
  );
}
