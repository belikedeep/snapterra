"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-32 bg-white relative border-t border-zinc-100"
    >
      <div className="absolute inset-0 bg-[#f06548]/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#000)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16 text-center">
        <div className="space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#f06548] text-sm font-semibold tracking-tight"
          >
            Pricing & Value
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-black"
          >
            Simple and Feasible Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 max-w-xl mx-auto"
          >
            Snapterra offers a premium experience for power users through its
            monthly Pro Plan. No hidden fees, just pure productivity.
          </motion.p>
        </div>

        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group p-1.5 rounded-[2.5rem] bg-gradient-to-b from-[#f06548] to-[#f06548]/50 shadow-2xl shadow-[#f06548]/20"
          >
            <div className="bg-white rounded-[2.3rem] p-10 space-y-8 text-left">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-black">Pro Monthly</h3>
                  <span className="px-3 py-1 rounded-full bg-[#f06548]/10 text-[#f06548] text-[10px] font-bold uppercase tracking-widest">
                    Best Value
                  </span>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  The ultimate unified command center for digital creators.
                </p>
              </div>

              <div className="flex items-baseline gap-1 pt-2">
                <span className="text-6xl font-bold text-black">$6.9</span>
                <span className="text-zinc-500 font-medium">/month</span>
              </div>

              <ul className="space-y-4 pt-6 border-t border-zinc-100">
                {[
                  "10GB High-Performance Storage",
                  "Unlimited Screenshots & Links",
                  "Kanban Task Board",
                  "Manual Project Tagging",
                  "Infinite Scroll Gallery",
                  "Full-Screen Image Previews",
                  "Priority Email Support",
                ].map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-zinc-700 text-sm"
                  >
                    <div className="flex-shrink-0 text-[#f06548]">
                      <CheckCircle2 size={16} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className="block w-full py-4 bg-[#212529] text-white text-center font-bold rounded-2xl hover:bg-black transition-all active:scale-[0.98] shadow-lg shadow-[#212529]/20"
              >
                Go Pro Now
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
