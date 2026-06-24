"use client";

import { Menu, Search, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store/use-app-store";

export function Topbar() {
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 px-4 py-3 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <Button
          className="md:hidden"
          onClick={toggleSidebar}
          size="icon"
          type="button"
          variant="ghost"
        >
          <Menu className="size-5" />
        </Button>
        <div className="relative hidden flex-1 sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
          <Input
            className="h-11 pl-10"
            placeholder="Search assets, narratives, whale wallets..."
            type="search"
          />
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-radar-blue/20 bg-radar-blue/10 px-3 py-1.5 text-xs font-semibold text-radar-blue sm:flex">
            <Sparkles className="size-3.5" />
            AI reasoning online
          </div>
          <div className="flex size-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.06] text-sm font-bold text-white">
            AR
          </div>
        </div>
      </div>
    </header>
  );
}
