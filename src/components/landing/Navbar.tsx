"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, Menu, X } from "lucide-react";

// Custom GitHub icon to match Lucide style (since it's missing in this version)
const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 transition-all duration-300">
      <div
        className={`w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between border rounded-2xl transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-zinc-200 shadow-sm"
            : "bg-white border-zinc-100 shadow-sm"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-black text-white p-1.5 rounded-lg">
            <LayoutGrid size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight text-black">
            Snapterra
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/belikedeep/snapterra"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-zinc-500 hover:text-black transition-colors flex items-center gap-2"
            >
              <GithubIcon size={16} />
              GitHub
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-zinc-500 hover:text-black transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2.5 bg-black text-white text-sm font-bold rounded-lg hover:bg-zinc-800 transition-all active:scale-95"
            >
              Start building
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-black"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-24 left-4 right-4 bg-white border border-zinc-200 rounded-2xl p-6 space-y-4 shadow-xl z-[60]"
        >
          <a
            href="https://github.com/belikedeep/snapterra"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-lg font-medium flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <GithubIcon size={20} />
            GitHub
          </a>
          <Link
            href="/login"
            className="block text-lg font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="block w-full py-4 bg-black text-white text-center font-bold rounded-xl"
          >
            Start building
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
