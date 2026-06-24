"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  BrainCircuit,
  LayoutDashboard,
  Radar,
  Settings,
  Star,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/use-app-store";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/ask-alpha", label: "Ask Alpha", icon: BrainCircuit },
  { href: "/watchlist", label: "Watchlist", icon: Star },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useAppStore();

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-slate-950/70 backdrop-blur md:hidden",
          sidebarOpen ? "block" : "hidden",
        )}
        onClick={() => setSidebarOpen(false)}
      />
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-dvh w-72 border-r border-white/10 bg-slate-950/95 p-4 shadow-panel transition-transform md:sticky md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <Link className="flex items-center gap-3" href="/">
            <span className="flex size-10 items-center justify-center rounded-md border border-radar-blue/40 bg-radar-blue/10 text-radar-blue">
              <Radar className="size-5" />
            </span>
            <div>
              <p className="font-black text-white">Alpha Radar</p>
              <p className="text-xs text-slate-500">AI crypto intelligence</p>
            </div>
          </Link>
          <Button
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
            size="icon"
            type="button"
            variant="ghost"
          >
            <X className="size-4" />
          </Button>
        </div>

        <nav className="mt-8 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/[0.06] hover:text-white",
                  active && "bg-radar-blue/10 text-radar-blue ring-1 ring-radar-blue/20",
                )}
                href={item.href}
                key={item.href}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.05] p-4">
          <div className="flex items-center gap-2 text-radar-amber">
            <Bell className="size-4" />
            <p className="text-sm font-semibold text-white">3 live alerts</p>
          </div>
          <p className="mt-2 text-xs leading-5 text-slate-400">
            Critical whale, unlock, and narrative shifts are being monitored in real time.
          </p>
        </div>
      </aside>
    </>
  );
}
