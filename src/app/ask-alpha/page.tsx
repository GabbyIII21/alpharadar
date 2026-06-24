"use client";

import { FormEvent, useMemo, useState } from "react";
import { MessageSquarePlus, Send, Sparkles } from "lucide-react";

import { ChatMessage } from "@/components/chat/chat-message";
import { TypingIndicator } from "@/components/common/loading-states";
import { PageTransition } from "@/components/common/page-transition";
import { AppShell } from "@/components/layout/app-shell";
import { SectionHeader } from "@/components/layout/section-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { conversations, radarEvents, suggestedPrompts } from "@/services/mock-data";
import { useAppStore } from "@/store/use-app-store";
import type { ChatMessage as ChatMessageType } from "@/types";

const responseMap = [
  {
    test: "btc",
    answer:
      "BTC is the highest priority because whale accumulation, positive spot premium, and falling exchange reserves are aligned. That combination implies demand is absorbing supply while exchange liquidity is thinning.",
  },
  {
    test: "ondo",
    answer:
      "ONDO is benefiting from the RWA narrative moving from social interest into actual capital rotation. Volume expansion and policy commentary make the signal stronger than a normal headline-driven spike.",
  },
  {
    test: "arb",
    answer:
      "ARB has the weakest setup in the watchlist because unlock proximity is hitting while spot depth is soft and perp shorts are building. The bearish read would weaken if bid depth returns before supply hits the market.",
  },
];

function buildAlphaReply(prompt: string) {
  const lower = prompt.toLowerCase();
  const matched = responseMap.find((item) => lower.includes(item.test));

  if (matched) return matched.answer;

  return `Alpha Radar is seeing ${radarEvents[0].asset} as the cleanest current signal. The main reason is cross-confirmation: ${radarEvents[0].relatedSignals
    .map((signal) => signal.label.toLowerCase())
    .join(", ")} are pointing in the same direction.`;
}

export default function AskAlphaPage() {
  const { selectedConversationId, setSelectedConversationId } = useAppStore();
  const selectedConversation =
    conversations.find((conversation) => conversation.id === selectedConversationId) ??
    conversations[0];
  const [messages, setMessages] = useState<ChatMessageType[]>(
    selectedConversation.messages,
  );
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const visibleConversations = useMemo(() => conversations, []);

  function sendMessage(value: string) {
    if (!value.trim()) return;

    const userMessage: ChatMessageType = {
      id: `msg-user-${Date.now()}`,
      role: "user",
      content: value.trim(),
      timestamp: "Now",
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsTyping(true);

    window.setTimeout(() => {
      const alphaMessage: ChatMessageType = {
        id: `msg-alpha-${Date.now()}`,
        role: "assistant",
        content: buildAlphaReply(value),
        timestamp: "Now",
      };
      setMessages((current) => [...current, alphaMessage]);
      setIsTyping(false);
    }, 900);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <AppShell>
      <PageTransition>
        <SectionHeader
          description="Chat with the AI reasoning layer behind the radar feed. Ask about scores, market catalysts, invalidation points, or watchlist risk."
          eyebrow="Ask Alpha"
          title="AI Market Intelligence Chat"
        />

        <div className="mt-8 grid min-h-[680px] gap-5 xl:grid-cols-[320px_1fr]">
          <Card className="p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-white">Conversations</h2>
              <Button size="icon" type="button" variant="ghost">
                <MessageSquarePlus className="size-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {visibleConversations.map((conversation) => (
                <button
                  className={cn(
                    "w-full rounded-md border border-white/10 bg-white/[0.04] p-3 text-left transition hover:border-radar-blue/40",
                    selectedConversationId === conversation.id &&
                      "border-radar-blue/40 bg-radar-blue/10",
                  )}
                  key={conversation.id}
                  onClick={() => {
                    setSelectedConversationId(conversation.id);
                    setMessages(conversation.messages);
                  }}
                  type="button"
                >
                  <p className="font-medium text-white">{conversation.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{conversation.updatedAt}</p>
                </button>
              ))}
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-radar-blue">
                Suggested prompts
              </p>
              <div className="mt-3 space-y-2">
                {suggestedPrompts.map((prompt) => (
                  <button
                    className="w-full rounded-md border border-white/10 bg-white/[0.04] p-3 text-left text-sm leading-5 text-slate-300 transition hover:border-radar-purple/40 hover:text-white"
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    type="button"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <Card className="flex min-h-[680px] flex-col overflow-hidden">
            <div className="border-b border-white/10 p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-md border border-radar-blue/30 bg-radar-blue/10 p-2 text-radar-blue">
                  <Sparkles className="size-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">Alpha Copilot</h2>
                  <p className="text-sm text-slate-500">Streaming reasoning simulation</p>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-5 overflow-y-auto p-5">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isTyping ? (
                <div className="flex gap-3">
                  <div className="flex size-9 items-center justify-center rounded-md border border-radar-blue/40 bg-radar-blue/10 text-radar-blue">
                    <Sparkles className="size-4" />
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4">
                    <TypingIndicator />
                  </div>
                </div>
              ) : null}
            </div>
            <form className="border-t border-white/10 p-4" onSubmit={onSubmit}>
              <div className="flex gap-3">
                <Input
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask why a score changed, what matters, or what invalidates a signal..."
                  value={input}
                />
                <Button aria-label="Send message" size="icon" type="submit">
                  <Send className="size-4" />
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </PageTransition>
    </AppShell>
  );
}
