"use client";

import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type Tab = {
  id: string;
  label: string;
  content: ReactNode;
};

export function Tabs({ tabs, defaultId }: { tabs: Tab[]; defaultId?: string }) {
  const [active, setActive] = useState(defaultId ?? tabs[0]?.id);
  const activeTab = tabs.find((tab) => tab.id === active) ?? tabs[0];

  return (
    <div className="space-y-4">
      <div className="inline-flex rounded-md border border-white/10 bg-white/[0.05] p-1">
        {tabs.map((tab) => (
          <button
            className={cn(
              "rounded px-3 py-1.5 text-sm font-medium text-slate-400 transition",
              active === tab.id && "bg-radar-blue text-slate-950",
            )}
            key={tab.id}
            onClick={() => setActive(tab.id)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{activeTab?.content}</div>
    </div>
  );
}
