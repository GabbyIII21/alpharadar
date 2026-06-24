import { AlertTriangle } from "lucide-react";

import { Card } from "@/components/ui/card";

export function ErrorState({ message }: { message: string }) {
  return (
    <Card className="flex items-start gap-3 border-radar-red/30 bg-radar-red/10 p-5">
      <AlertTriangle className="mt-0.5 size-5 text-radar-red" />
      <div>
        <h3 className="font-semibold text-white">Signal temporarily unavailable</h3>
        <p className="mt-1 text-sm text-slate-300">{message}</p>
      </div>
    </Card>
  );
}
