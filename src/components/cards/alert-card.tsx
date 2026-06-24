import { AlertTriangle, CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { priorityTone } from "@/lib/utils";
import type { Alert } from "@/types";

export function AlertCard({ alert }: { alert: Alert }) {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <div className="rounded-md border border-white/10 bg-white/[0.06] p-2">
          {alert.acknowledged ? (
            <CheckCircle2 className="size-4 text-radar-green" />
          ) : (
            <AlertTriangle className="size-4 text-radar-amber" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-white">{alert.title}</p>
              <p className="mt-1 text-sm leading-5 text-slate-400">{alert.description}</p>
            </div>
            <span className="text-xs text-slate-500">{alert.time}</span>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Badge className={priorityTone(alert.priority)}>{alert.priority}</Badge>
            <span className="text-xs font-semibold text-radar-blue">{alert.asset}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
