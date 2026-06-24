import { Flame, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatPercent } from "@/lib/utils";
import type { Narrative } from "@/types";

export function NarrativeCard({ narrative }: { narrative: Narrative }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-radar-purple">
            <Flame className="size-4" />
            Narrative
          </p>
          <h3 className="mt-2 text-lg font-semibold text-white">{narrative.title}</h3>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-radar-blue">{narrative.score}</p>
          <p className="text-xs text-slate-500">score</p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-400">{narrative.summary}</p>
      <Progress
        className="mt-4"
        indicatorClassName="bg-radar-purple"
        value={narrative.score}
      />
      <div className="mt-4 flex flex-wrap gap-2">
        {narrative.assets.map((asset) => (
          <Badge
            className="border-radar-blue/30 bg-radar-blue/10 text-radar-blue"
            key={asset}
          >
            {asset}
          </Badge>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
        <span className="flex items-center gap-2">
          <TrendingUp className="size-4 text-radar-green" />
          Momentum
        </span>
        <span className="font-semibold text-radar-green">
          {formatPercent(narrative.momentum)}
        </span>
      </div>
    </Card>
  );
}
