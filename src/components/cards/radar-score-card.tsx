"use client";

import { motion } from "framer-motion";
import { Activity, TrendingDown, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn, scoreTone, sentimentTone } from "@/lib/utils";
import type { Sentiment } from "@/types";

type RadarScoreCardProps = {
  score: number;
  label?: string;
  sentiment: Sentiment;
  confidence?: number;
  compact?: boolean;
};

export function RadarScoreCard({
  score,
  label = "Radar Score",
  sentiment,
  confidence,
  compact = false,
}: RadarScoreCardProps) {
  const SentimentIcon = sentiment === "bearish" ? TrendingDown : TrendingUp;

  return (
    <Card className={cn("relative overflow-hidden p-5", compact && "p-4")}>
      <div className="absolute right-0 top-0 size-28 rounded-full bg-radar-blue/10 blur-3xl" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
            {label}
          </p>
          <div className="mt-3 flex items-end gap-2">
            <motion.span
              animate={{ opacity: 1, y: 0 }}
              className={cn("text-5xl font-black leading-none", scoreTone(score))}
              initial={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.55 }}
            >
              {score}
            </motion.span>
            <span className="pb-1 text-sm text-slate-500">/100</span>
          </div>
        </div>
        <Badge className={sentimentTone(sentiment)}>
          <SentimentIcon className="mr-1 size-3" />
          {sentiment}
        </Badge>
      </div>
      <Progress
        className="mt-5"
        indicatorClassName={
          score >= 85
            ? "bg-radar-green"
            : score >= 70
              ? "bg-radar-blue"
              : "bg-radar-amber"
        }
        value={score}
      />
      {confidence ? (
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-slate-400">
            <Activity className="size-4 text-radar-purple" />
            Confidence
          </span>
          <span className="font-semibold text-white">{confidence}%</span>
        </div>
      ) : null}
    </Card>
  );
}
