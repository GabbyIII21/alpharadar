import { Bot, User } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageType } from "@/types";

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === "user";
  const Icon = isUser ? User : Bot;

  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-md border",
          isUser
            ? "border-radar-purple/40 bg-radar-purple/10 text-radar-purple"
            : "border-radar-blue/40 bg-radar-blue/10 text-radar-blue",
        )}
      >
        <Icon className="size-4" />
      </div>
      <div
        className={cn(
          "max-w-[82%] rounded-lg border p-4 text-sm leading-6",
          isUser
            ? "border-radar-purple/30 bg-radar-purple/10 text-white"
            : "border-white/10 bg-white/[0.06] text-slate-200",
        )}
      >
        <p>{message.content}</p>
        <p className="mt-2 text-xs text-slate-500">{message.timestamp}</p>
      </div>
    </div>
  );
}
