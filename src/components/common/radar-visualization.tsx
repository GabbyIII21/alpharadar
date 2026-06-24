"use client";

import { motion } from "framer-motion";

import { radarEvents } from "@/services/mock-data";

const points = [
  { x: "67%", y: "34%", label: "BTC", score: 94 },
  { x: "43%", y: "61%", label: "ONDO", score: 89 },
  { x: "78%", y: "68%", label: "SOL", score: 81 },
  { x: "31%", y: "42%", label: "ARB", score: 78 },
];

export function RadarVisualization() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-lg border border-white/10 bg-slate-950/70 shadow-panel">
      <div className="absolute inset-0 bg-terminal-grid bg-[size:28px_28px] opacity-50" />
      <div className="absolute inset-8 rounded-full border border-radar-blue/20" />
      <div className="absolute inset-20 rounded-full border border-radar-blue/20" />
      <div className="absolute inset-32 rounded-full border border-radar-blue/20" />
      <div className="absolute left-1/2 top-8 h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-radar-blue/15" />
      <div className="absolute top-1/2 left-8 h-px w-[calc(100%-4rem)] -translate-y-1/2 bg-radar-blue/15" />
      <div className="absolute inset-8 rounded-full bg-[conic-gradient(from_0deg,rgba(45,212,255,0.34),transparent_28%,transparent)] animate-radar-spin" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_32%,rgba(2,6,23,0.7)_78%)]" />

      {points.map((point, index) => (
        <motion.div
          animate={{ opacity: [0.65, 1, 0.65], scale: [1, 1.12, 1] }}
          className="absolute"
          key={point.label}
          style={{ left: point.x, top: point.y }}
          transition={{ duration: 2.2, delay: index * 0.25, repeat: Infinity }}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            <span className="absolute inset-0 rounded-full bg-radar-blue/30 blur-md" />
            <span className="relative flex size-12 items-center justify-center rounded-full border border-radar-blue/50 bg-slate-950/90 text-xs font-bold text-radar-blue">
              {point.label}
            </span>
            <span className="absolute left-8 top-7 rounded border border-white/10 bg-slate-950/90 px-2 py-1 text-[10px] font-semibold text-white">
              {point.score}
            </span>
          </div>
        </motion.div>
      ))}

      <div className="absolute bottom-4 left-4 right-4 rounded-md border border-white/10 bg-slate-950/80 p-3 backdrop-blur">
        <p className="text-xs uppercase tracking-[0.18em] text-radar-blue">
          Live Radar Feed
        </p>
        <p className="mt-1 truncate text-sm font-medium text-white">
          {radarEvents[0].title}
        </p>
      </div>
    </div>
  );
}
