import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded bg-white/10", className)} />;
}

export function DashboardSkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card className="space-y-4 p-5" key={index}>
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-20 w-full" />
        </Card>
      ))}
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 text-slate-400">
      <span className="size-2 animate-bounce rounded-full bg-radar-blue [animation-delay:-0.3s]" />
      <span className="size-2 animate-bounce rounded-full bg-radar-blue [animation-delay:-0.15s]" />
      <span className="size-2 animate-bounce rounded-full bg-radar-blue" />
    </div>
  );
}
