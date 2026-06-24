import { Radar } from "lucide-react";

import { Card } from "@/components/ui/card";

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="flex flex-col items-center justify-center gap-3 p-8 text-center">
      <div className="rounded-full border border-radar-blue/30 bg-radar-blue/10 p-3 text-radar-blue">
        <Radar className="size-5" />
      </div>
      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="mt-1 max-w-sm text-sm text-slate-400">{description}</p>
      </div>
    </Card>
  );
}
