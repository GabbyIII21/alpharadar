"use client";

import { Bell, KeyRound, Moon, Shield, SlidersHorizontal, UserRound } from "lucide-react";

import { PageTransition } from "@/components/common/page-transition";
import { AppShell } from "@/components/layout/app-shell";
import { SectionHeader } from "@/components/layout/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const notificationRows = [
  ["Critical Radar Score", "Push and email when an event scores above 90."],
  ["Whale Movements", "Notify when tracked wallets cross abnormal flow thresholds."],
  ["Token Unlocks", "Surface unlocks entering the five-day risk window."],
  ["Narrative Shifts", "Alert when social and volume momentum align."],
];

export default function SettingsPage() {
  return (
    <AppShell>
      <PageTransition>
        <SectionHeader
          description="Manage the demo profile, alert preferences, terminal theme, and API integration settings for Alpha Radar."
          eyebrow="Settings"
          title="Workspace Controls"
        />

        <div className="mt-8 grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-5">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserRound className="size-5 text-radar-blue" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-md border border-radar-blue/30 bg-radar-blue/10 text-lg font-black text-radar-blue">
                    AR
                  </div>
                  <div>
                    <p className="font-semibold text-white">Alpha Radar Demo Desk</p>
                    <p className="text-sm text-slate-500">
                      Investor presentation workspace
                    </p>
                  </div>
                </div>
                <div className="grid gap-3">
                  <Input defaultValue="Alpha Radar Demo Desk" />
                  <Input defaultValue="demo@alpharadar.ai" type="email" />
                </div>
                <Button variant="secondary">Save profile</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="size-5 text-radar-purple" />
                  Theme
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {["Terminal Dark", "High Contrast", "Presentation Mode"].map(
                    (theme, index) => (
                      <button
                        className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.04] p-3 text-left transition hover:border-radar-blue/40"
                        key={theme}
                        type="button"
                      >
                        <span className="font-medium text-white">{theme}</span>
                        {index === 0 ? (
                          <Badge className="border-radar-blue/30 bg-radar-blue/10 text-radar-blue">
                            Active
                          </Badge>
                        ) : null}
                      </button>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-5">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="size-5 text-radar-amber" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notificationRows.map(([title, description], index) => (
                  <label
                    className="flex items-center justify-between gap-4 rounded-md border border-white/10 bg-white/[0.04] p-4"
                    key={title}
                  >
                    <span>
                      <span className="block font-medium text-white">{title}</span>
                      <span className="mt-1 block text-sm text-slate-500">
                        {description}
                      </span>
                    </span>
                    <input
                      className="size-5 accent-cyan-300"
                      defaultChecked={index < 3}
                      type="checkbox"
                    />
                  </label>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <KeyRound className="size-5 text-radar-green" />
                  API Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="text-sm text-slate-400" htmlFor="market-api">
                      Market data provider
                    </label>
                    <Input defaultValue="Bitget Market API" id="market-api" />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400" htmlFor="onchain-api">
                      On-chain provider
                    </label>
                    <Input defaultValue="Mock Intelligence Stream" id="onchain-api" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-slate-400" htmlFor="api-key">
                    API key status
                  </label>
                  <Input defaultValue="Connected in demo mode" id="api-key" />
                </div>
                <div className="rounded-md border border-radar-blue/20 bg-radar-blue/10 p-4">
                  <p className="flex items-center gap-2 font-semibold text-white">
                    <Shield className="size-4 text-radar-blue" />
                    Integration strategy
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    API fields are ready for production wiring through the service layer.
                    Mock data remains active so every page works during the hackathon
                    demo.
                  </p>
                </div>
                <Button>
                  <SlidersHorizontal className="size-4" />
                  Update integrations
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageTransition>
    </AppShell>
  );
}
