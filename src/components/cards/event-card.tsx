import Link from "next/link";
import { ArrowUpRight, Clock, RadioTower } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn, priorityTone, sentimentTone } from "@/lib/utils";
import type { RadarEvent } from "@/types";

export function EventCard({
  event,
  featured = false,
}: {
  event: RadarEvent;
  featured?: boolean;
}) {
  return (
    <Link href={`/events/${event.slug}`}>
      <Card
        className={cn(
          "group h-full p-5 transition duration-300 hover:-translate-y-0.5 hover:border-radar-blue/40 hover:bg-white/[0.07]",
          featured && "border-radar-blue/30 bg-radar-blue/[0.06]",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            <Badge className={priorityTone(event.priority)}>{event.priority}</Badge>
            <Badge className={sentimentTone(event.sentiment)}>{event.sentiment}</Badge>
          </div>
          <ArrowUpRight className="size-4 text-slate-500 transition group-hover:text-radar-blue" />
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-radar-blue">
          <RadioTower className="size-4" />
          {event.asset} / {event.type}
        </div>
        <h3 className="mt-3 line-clamp-2 text-lg font-semibold text-white">
          {event.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
          {event.summary}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock className="size-4" />
            {event.detectedAt}
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Score</p>
            <p className="text-xl font-black text-radar-blue">{event.radarScore}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
