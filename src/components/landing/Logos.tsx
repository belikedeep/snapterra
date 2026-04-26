"use client";

import { motion } from "framer-motion";

const logos = [
  "Replicate",
  "Attention",
  "Hippocratic AI",
  "Bill",
  "ARCH",
  "granola",
  "Modal",
  "Primer",
];

export default function Logos() {
  return (
    <section className="py-20 bg-white border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-12 items-center">
          {logos.map((logo, i) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex justify-center"
            >
              <span className="text-xl font-bold text-zinc-400 grayscale hover:grayscale-0 transition-all cursor-default uppercase tracking-tight">
                {logo}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
