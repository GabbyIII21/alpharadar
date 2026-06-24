import { ArrowLeft, Clock, Layers3 } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

import { RadarScoreCard } from "@/components/cards/radar-score-card";
import { PageTransition } from "@/components/common/page-transition";
import { AppShell } from "@/components/layout/app-shell";
import { SectionHeader } from "@/components/layout/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { priorityTone, sentimentTone } from "@/lib/utils";
import { alphaService } from "@/services/alpha-service";
import { radarEvents } from "@/services/mock-data";

type EventDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return radarEvents.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: EventDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await alphaService.getEventBySlug(slug);

  return {
    title: `${event.asset} Event | Alpha Radar`,
    description: event.summary,
  };
}

export default async function EventDetailPage({ params }: EventDetailProps) {
  const { slug } = await params;
  const event = await alphaService.getEventBySlug(slug);

  return (
    <AppShell>
      <PageTransition>
        <Button asChild className="mb-6" variant="ghost">
          <Link href="/dashboard">
            <ArrowLeft className="size-4" />
            Back to dashboard
          </Link>
        </Button>

        <SectionHeader
          action={
            <div className="flex flex-wrap gap-2">
              <Badge className={priorityTone(event.priority)}>{event.priority}</Badge>
              <Badge className={sentimentTone(event.sentiment)}>{event.sentiment}</Badge>
            </div>
          }
          description={event.summary}
          eyebrow={`${event.asset} / ${event.type}`}
          title={event.title}
        />

        <div className="mt-8 grid gap-5 xl:grid-cols-[0.78fr_1.22fr]">
          <div className="space-y-5">
            <RadarScoreCard
              confidence={event.confidence}
              score={event.radarScore}
              sentiment={event.sentiment}
            />
            <Card>
              <CardHeader>
                <CardTitle>Event Context</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="flex items-center gap-2 text-sm text-slate-400">
                    <Clock className="size-4 text-radar-blue" />
                    Detected
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {event.detectedAt}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-sm text-slate-400">Impact window</span>
                  <span className="text-sm font-semibold text-white">
                    {event.impactWindow}
                  </span>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Confidence Score</span>
                    <span className="font-semibold text-white">{event.confidence}%</span>
                  </div>
                  <Progress className="mt-2" value={event.confidence} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-5">
            <Card>
              <CardHeader>
                <CardTitle>AI Explanation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-8 text-slate-300">
                  {event.aiExplanation}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Related Signals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {event.relatedSignals.map((signal) => (
                  <div
                    className="rounded-lg border border-white/10 bg-white/[0.04] p-4"
                    key={signal.label}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="flex items-center gap-2 text-sm font-semibold text-white">
                          <Layers3 className="size-4 text-radar-purple" />
                          {signal.label}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {signal.detail}
                        </p>
                      </div>
                      <span className="text-lg font-black text-radar-blue">
                        {signal.weight}
                      </span>
                    </div>
                    <Progress
                      className="mt-3"
                      indicatorClassName="bg-radar-purple"
                      value={signal.weight}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {event.timeline.map((item, index) => (
                    <div className="relative pl-8" key={`${item.time}-${item.title}`}>
                      {index < event.timeline.length - 1 ? (
                        <span className="absolute left-[9px] top-5 h-full w-px bg-white/10" />
                      ) : null}
                      <span className="absolute left-0 top-1 flex size-5 items-center justify-center rounded-full border border-radar-blue/40 bg-radar-blue/10">
                        <span className="size-2 rounded-full bg-radar-blue" />
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-radar-blue">
                        {item.time} / {item.type}
                      </p>
                      <h3 className="mt-1 font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageTransition>
    </AppShell>
  );
}
