"use client";

import { motion } from "framer-motion";
import {
  ImageIcon,
  Link2,
  CheckCircle2,
  Layout,
  Zap,
  Cloud,
  ShieldCheck,
  Search,
  MousePointer2,
  Columns,
} from "lucide-react";

const mainFeatures = [
  {
    title: "Screenshot Gallery",
    description:
      "Your visual inspiration, organized. Store high-fidelity screenshots in a dedicated, lightning-fast gallery.",
    details: [
      { icon: <Search size={12} />, text: "Infinite scrolling library" },
      {
        icon: <Layout size={12} />,
        text: "Manual tagging for project organization",
      },
    ],
    icon: <ImageIcon className="w-6 h-6" />,
  },
  {
    title: "Link Manager",
    description:
      "Stop losing your tabs. A centralized repository for all your important URLs and project resources.",
    details: [
      {
        icon: <MousePointer2 size={12} />,
        text: "Quick access with custom titles",
      },
      { icon: <Layout size={12} />, text: "Tag-based categorization" },
    ],
    icon: <Link2 className="w-6 h-6" />,
  },
  {
    title: "Kanban Task Board",
    description:
      "Manage your workflow with a built-in Kanban board. Track progress from idea to completion.",
    details: [
      {
        icon: <Columns size={12} />,
        text: "3-stage workflow: To Do, In Progress, Done",
      },
      { icon: <Zap size={12} />, text: "One-click status transitions" },
    ],
    icon: <CheckCircle2 className="w-6 h-6" />,
  },
];

const ecosystemFeatures = [
  {
    title: "Performance & Speed",
    description:
      "Zero-latency interactions. Optimized for smooth navigation through thousands of assets.",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    title: "Cloud Sync",
    description:
      "Your workspace follows you. Seamless synchronization across all your devices.",
    icon: <Cloud className="w-5 h-5" />,
  },
  {
    title: "Security & Privacy",
    description:
      "Your data belongs to you. Built with security-first principles for your digital life.",
    icon: <ShieldCheck className="w-5 h-5" />,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 space-y-32">
        {/* Main Pillars */}
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#f06548] text-sm font-semibold tracking-tight"
            >
              Real World Capabilities
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-black"
            >
              Built for Real Productivity
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mainFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2rem] bg-zinc-50 border border-zinc-100 space-y-6 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-zinc-100 flex items-center justify-center text-[#f06548] shadow-sm">
                  {feature.icon}
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-black">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.details.map((detail, j) => (
                      <li
                        key={j}
                        className="text-xs font-medium text-zinc-900 flex items-center gap-2"
                      >
                        <span className="text-[#f06548]">{detail.icon}</span>
                        {detail.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Unified Workspace Design Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] bg-zinc-900 text-white p-12 md:p-20 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f06548]/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-[#f06548] text-sm font-bold tracking-widest uppercase">
                Ecosystem
              </p>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight">
                One Unified Command Center
              </h3>
              <p className="text-zinc-400 leading-relaxed text-lg">
                Consolidate your digital tools. Snapterra brings together your
                inspiration, resources, and execution into a single, cohesive
                interface designed for zero-distraction work.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="px-4 py-2 bg-white/10 rounded-full border border-white/10 text-xs font-bold">
                  Consolidated Dashboard
                </div>
                <div className="px-4 py-2 bg-white/10 rounded-full border border-white/10 text-xs font-bold">
                  Zero-Distraction
                </div>
              </div>
            </div>
            <div className="relative aspect-video rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-2xl">
              <div className="w-full h-full rounded-lg border border-white/5 bg-black/40 flex items-center justify-center">
                <Layout size={48} className="text-white/20" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Technical Excellence */}
        <div className="pt-24 space-y-16 border-t border-zinc-100">
          <div className="text-center space-y-4">
            <p className="text-[#f06548] text-sm font-semibold tracking-tight">
              Engineering Excellence
            </p>
            <h2 className="text-4xl font-bold text-black">
              Reliable. Fast. Secure.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ecosystemFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-8 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-4 hover:border-zinc-300 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-zinc-400 group-hover:text-[#f06548] group-hover:border-[#f06548]/30 transition-colors">
                  {feature.icon}
                </div>
                <h4 className="font-bold text-black text-lg">
                  {feature.title}
                </h4>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
