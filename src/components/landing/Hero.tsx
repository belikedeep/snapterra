"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-48 pb-20 px-6 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#f06548] text-sm font-semibold tracking-tight"
        >
          For the next generation of digital creators.
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-black leading-tight"
        >
          The Unified Digital <br />
          <span className="text-[#f06548]">Command Center</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed"
        >
          Eliminate "tab fatigue" and context switching. Manage screenshots,
          bookmarks, and tasks in one high-performance, cohesive interface.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/signup"
            className="px-8 py-3.5 bg-[#212529] text-white text-sm font-bold rounded-lg hover:bg-black transition-all active:scale-95 shadow-lg"
          >
            Join Snapterra
          </Link>
          <Link
            href="#pricing"
            className="px-8 py-3.5 bg-zinc-100 text-black text-sm font-bold rounded-lg hover:bg-zinc-200 transition-all border border-zinc-200"
          >
            View Pricing
          </Link>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 relative mx-auto w-full max-w-5xl rounded-2xl border border-zinc-200 shadow-2xl overflow-hidden bg-white p-2"
        >
          <div className="rounded-xl border border-zinc-100 overflow-hidden bg-zinc-50 aspect-[16/9] flex flex-col">
            <div className="h-10 border-b border-zinc-100 bg-white flex items-center px-4 justify-between">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
              </div>
              <div className="w-48 h-5 bg-zinc-50 rounded-md border border-zinc-100" />
              <div className="w-6 h-6 rounded-md bg-zinc-100" />
            </div>
            <div className="flex-1 p-6 grid grid-cols-12 gap-6">
              <div className="col-span-3 space-y-4">
                <div className="h-4 bg-zinc-200 rounded-md w-3/4" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-3 bg-zinc-100 rounded-md w-full"
                    />
                  ))}
                </div>
              </div>
              <div className="col-span-9 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-20 bg-white border border-zinc-100 rounded-xl flex flex-col p-3 gap-2"
                    >
                      <div className="w-1/3 h-2 bg-zinc-100 rounded" />
                      <div className="w-full h-4 bg-zinc-50 rounded" />
                    </div>
                  ))}
                </div>
                <div className="flex-1 bg-white border border-zinc-100 rounded-2xl p-6 flex flex-col gap-4">
                  <div className="h-6 bg-zinc-50 rounded w-1/4" />
                  <div className="grid grid-cols-4 gap-4 flex-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div
                        key={i}
                        className="bg-zinc-50 rounded-lg border border-zinc-100"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
