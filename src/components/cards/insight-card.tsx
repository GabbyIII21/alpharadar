import { BrainCircuit } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { sentimentTone } from "@/lib/utils";
import type { Insight } from "@/types";

export function InsightCard({ insight }: { insight: Insight }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2 text-radar-blue">
          <BrainCircuit className="size-5" />
          <span className="text-xs font-semibold uppercase tracking-[0.16em]">
            AI Insight
          </span>
        </div>
        <Badge className={sentimentTone(insight.sentiment)}>{insight.sentiment}</Badge>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{insight.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">{insight.body}</p>
      <div className="mt-5 flex items-center justify-between text-sm">
        <span className="text-slate-500">Confidence</span>
        <span className="font-semibold text-white">{insight.confidence}%</span>
      </div>
      <Progress className="mt-2" value={insight.confidence} />
    </Card>
  );
}
