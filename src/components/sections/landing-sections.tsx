"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  Layers3,
  MessageSquareText,
  Radar,
  ShieldCheck,
  SignalHigh,
  Sparkles,
} from "lucide-react";

import { RadarVisualization } from "@/components/common/radar-visualization";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const features = [
  {
    title: "Event Detection",
    body: "Monitors price action, whale movements, unlock calendars, news, and social acceleration.",
    icon: SignalHigh,
  },
  {
    title: "AI Reasoning",
    body: "Turns raw signals into plain-English explanations with confidence and invalidation notes.",
    icon: BrainCircuit,
  },
  {
    title: "Radar Score",
    body: "Ranks each signal by urgency, confirmation strength, market relevance, and time sensitivity.",
    icon: Radar,
  },
  {
    title: "Ask Alpha",
    body: "Chat with the market intelligence layer to understand what changed and why it matters.",
    icon: MessageSquareText,
  },
];

const steps = [
  [
    "Detect",
    "Capture abnormal market, on-chain, whale, unlock, sentiment, and news events.",
  ],
  ["Analyze", "Cluster related signals and compare them against historical behavior."],
  ["Rank", "Score urgency, confidence, direction, and likely impact window."],
  [
    "Explain",
    "Generate investor-ready reasoning and track what would invalidate the read.",
  ],
];

const benefits = [
  "Reduce dashboard fatigue by ranking only the signals that matter.",
  "Give analysts a fast second opinion backed by multi-source context.",
  "Turn noisy crypto alerts into demo-ready intelligence briefings.",
];

const faqs = [
  {
    q: "Is Alpha Radar a trading bot?",
    a: "No. It is an intelligence layer that helps users understand market events, not an execution engine.",
  },
  {
    q: "Where does the AI reasoning come from?",
    a: "The frontend models a pipeline that clusters market, on-chain, social, unlock, and news signals before generating a concise explanation.",
  },
  {
    q: "Can this connect to live APIs?",
    a: "Yes. The mock service is isolated behind typed service functions so production API endpoints can replace it cleanly.",
  },
];

export function LandingPage() {
  return (
    <main className="min-h-dvh overflow-hidden bg-slate-950 text-white">
      <section className="relative border-b border-white/10">
        <div className="absolute inset-0 bg-terminal-grid bg-[size:42px_42px] opacity-25" />
        <div className="container relative grid min-h-[92dvh] items-center gap-10 py-20 lg:grid-cols-[1fr_0.86fr]">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-radar-blue/30 bg-radar-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-radar-blue">
              <Sparkles className="size-3.5" />
              Find the Signal. Ignore the Noise.
            </div>
            <h1 className="mt-6 max-w-4xl text-balance text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Alpha Radar
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              AI-powered crypto intelligence that watches market activity, on-chain
              signals, whale movements, token unlocks, sentiment shifts, and news events,
              then explains why they matter.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/dashboard">
                  Open Dashboard
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/ask-alpha">
                  Ask Alpha
                  <BrainCircuit className="size-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
              {[
                ["24/7", "Monitoring"],
                ["94", "Top Score"],
                ["6", "Tracked Assets"],
              ].map(([value, label]) => (
                <div
                  className="rounded-lg border border-white/10 bg-white/[0.05] p-4"
                  key={label}
                >
                  <p className="text-2xl font-black text-radar-blue">{value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
            initial={{ opacity: 0, scale: 0.96 }}
            transition={{ delay: 0.1, duration: 0.55 }}
          >
            <RadarVisualization />
          </motion.div>
        </div>
      </section>

      <section className="container py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-radar-blue">
            Intelligence Modules
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Built like a trading terminal, explained like an analyst.
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card className="p-5" key={feature.title}>
                <div className="flex size-11 items-center justify-center rounded-md border border-radar-blue/30 bg-radar-blue/10 text-radar-blue">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{feature.body}</p>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] py-20">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-radar-purple">
                Workflow
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Detect. Analyze. Rank. Explain.
              </h2>
              <p className="mt-4 text-slate-400">
                Alpha Radar is designed for the moment when a market desk needs the
                fastest possible answer to what changed.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {steps.map(([title, body], index) => (
                <Card className="p-5" key={title}>
                  <div className="text-sm font-black text-radar-blue">0{index + 1}</div>
                  <h3 className="mt-4 text-xl font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container grid gap-10 py-20 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-radar-blue">
            Benefits
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Cleaner signal for faster decisions.
          </h2>
          <div className="mt-8 space-y-4">
            {benefits.map((benefit) => (
              <div className="flex gap-3" key={benefit}>
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-radar-green" />
                <p className="text-slate-300">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-md border border-radar-purple/30 bg-radar-purple/10 p-3 text-radar-purple">
              <Layers3 className="size-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Signal Stack</h3>
              <p className="text-sm text-slate-400">Multi-source intelligence model</p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {["Market", "On-chain", "Whales", "Unlocks", "Sentiment", "News"].map(
              (item) => (
                <div
                  className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.04] px-4 py-3"
                  key={item}
                >
                  <span className="text-sm font-medium text-slate-300">{item}</span>
                  <BadgeCheck className="size-4 text-radar-blue" />
                </div>
              ),
            )}
          </div>
        </Card>
      </section>

      <section className="container py-20">
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">FAQ</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {faqs.map((faq) => (
            <Card className="p-5" key={faq.q}>
              <h3 className="font-semibold text-white">{faq.q}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{faq.a}</p>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 py-8">
        <div className="container flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Alpha Radar</p>
          <p>Built for the Bitget AI Hackathon</p>
          <Link className="text-radar-blue hover:text-cyan-300" href="/dashboard">
            Launch app
          </Link>
        </div>
      </footer>
    </main>
  );
}
