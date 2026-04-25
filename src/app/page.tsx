"use client";

import Link from "next/link";
import {
  LayoutGrid,
  Image as ImageIcon,
  Link as LinkIcon,
  CheckSquare,
  ArrowRight,
  Zap,
  Shield,
  Cloud,
  Check,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-lg border-b border-zinc-200 py-4" : "bg-transparent py-6"}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-black text-white p-2 rounded-xl group-hover:scale-110 transition-transform">
              <LayoutGrid size={24} />
            </div>
            <span className="text-xl font-black tracking-tight uppercase">
              Snapterra
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-zinc-500 hover:text-black transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-zinc-500 hover:text-black transition-colors"
            >
              Pricing
            </a>
            <div className="h-4 w-px bg-zinc-200" />
            <Link
              href="/login"
              className="text-sm font-medium text-zinc-500 hover:text-black transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2.5 bg-black text-white text-sm font-bold rounded-full hover:bg-zinc-800 transition-all active:scale-[0.98]"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-zinc-200 p-6 space-y-4 shadow-xl">
            <a
              href="#features"
              className="block text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="block text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
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
              className="block w-full py-4 bg-black text-white text-center font-bold rounded-2xl"
            >
              Get Started
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold animate-fade-in">
              <Zap size={16} fill="currentColor" />
              <span>Now charging only $6.9/mo</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] text-black">
              Snap, Store, <br />
              <span className="text-indigo-600">Succeed.</span>
            </h1>
            <p className="text-xl text-zinc-500 max-w-lg leading-relaxed">
              The ultimate unified dashboard for your digital life. Manage
              screenshots, bookmarks, and tasks in one high-performance command
              center.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-4 bg-black text-white text-lg font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all hover:translate-y-[-2px] active:translate-y-0 shadow-xl shadow-zinc-200"
              >
                Join Snapterra
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-4 bg-white text-zinc-900 text-lg font-bold rounded-2xl border border-zinc-200 hover:bg-zinc-50 transition-all flex items-center justify-center"
              >
                View Demo
              </Link>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-zinc-200 overflow-hidden"
                  >
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                      alt="User"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-zinc-500">
                Joined by <span className="text-black font-bold">1,000+</span>{" "}
                creators
              </p>
            </div>
          </div>

          <div className="relative lg:scale-110">
            {/* Visual placeholder - Mockup of the app */}
            <div className="relative bg-zinc-100 rounded-[32px] p-4 shadow-2xl border border-zinc-200/50 backdrop-blur-sm overflow-hidden animate-float">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10" />
              <div className="relative bg-white rounded-2xl shadow-inner border border-zinc-100 overflow-hidden aspect-[4/3] flex flex-col">
                {/* Header Mockup */}
                <div className="h-12 border-b border-zinc-100 flex items-center px-4 justify-between bg-zinc-50/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-200" />
                    <div className="w-3 h-3 rounded-full bg-amber-200" />
                    <div className="w-3 h-3 rounded-full bg-green-200" />
                  </div>
                  <div className="w-40 h-6 bg-white rounded-full border border-zinc-200/50" />
                  <div className="w-6 h-6 rounded-lg bg-zinc-200" />
                </div>
                {/* Content Mockup */}
                <div className="flex-1 p-6 space-y-6">
                  <div className="flex justify-between items-end">
                    <div className="space-y-2">
                      <div className="w-32 h-8 bg-black rounded-lg" />
                      <div className="w-48 h-4 bg-zinc-100 rounded-full" />
                    </div>
                    <div className="w-24 h-10 bg-indigo-600 rounded-xl" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="aspect-square bg-zinc-50 rounded-xl border border-zinc-100 p-3 space-y-2"
                      >
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                          {i === 1 ? (
                            <LinkIcon size={14} />
                          ) : i === 2 ? (
                            <ImageIcon size={14} />
                          ) : (
                            <CheckSquare size={14} />
                          )}
                        </div>
                        <div className="w-full h-3 bg-zinc-200 rounded-full" />
                        <div className="w-1/2 h-8 bg-zinc-100 rounded-lg" />
                      </div>
                    ))}
                  </div>
                  <div className="h-32 w-full bg-zinc-50 rounded-2xl border border-zinc-100 p-4 space-y-3">
                    <div className="w-1/3 h-4 bg-zinc-300 rounded-full" />
                    <div className="w-full h-4 bg-zinc-200 rounded-full" />
                    <div className="w-full h-4 bg-zinc-200 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Background elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px] -z-10" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] -z-10" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-sm font-black uppercase tracking-widest text-indigo-600">
              Superpowers
            </h2>
            <p className="text-4xl md:text-5xl font-black tracking-tight text-black">
              Unified Digital Workspace.
            </p>
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
              Everything you need to manage your personal knowledge and
              productivity in one blazingly fast app.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ImageIcon className="w-8 h-8" />,
                title: "Screenshot Gallery",
                description:
                  "Upload and organize your visual inspiration. Auto-tagging and instant search included.",
                color: "bg-purple-50 text-purple-600",
              },
              {
                icon: <LinkIcon className="w-8 h-8" />,
                title: "Link Manager",
                description:
                  "Save any URL with a single click. Organize with custom tags and preview content instantly.",
                color: "bg-blue-50 text-blue-600",
              },
              {
                icon: <CheckSquare className="w-8 h-8" />,
                title: "Task Tracker",
                description:
                  "Manage your daily to-dos with a high-performance, minimalist task manager.",
                color: "bg-orange-50 text-orange-600",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Secure by Design",
                description:
                  "Your data is encrypted and protected. You own your data, we just help you manage it.",
                color: "bg-green-50 text-green-600",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Blazing Fast",
                description:
                  "Built with the latest tech stack for zero-latency interactions and instant updates.",
                color: "bg-amber-50 text-amber-600",
              },
              {
                icon: <Cloud className="w-8 h-8" />,
                title: "Cloud Sync",
                description:
                  "Access your dashboard from any device. Always in sync, always ready.",
                color: "bg-indigo-50 text-indigo-600",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-[32px] border border-zinc-200 transition-all hover:shadow-xl group"
              >
                <div
                  className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-black mb-3">
                  {feature.title}
                </h3>
                <p className="text-zinc-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-sm font-black uppercase tracking-widest text-indigo-600">
              Pricing
            </h2>
            <p className="text-4xl md:text-5xl font-black tracking-tight text-black">
              Simple, Transparent.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            {/* Pro Plan Only */}
            <div className="bg-black p-10 rounded-[40px] border-4 border-indigo-600 space-y-8 relative overflow-hidden">
              <div className="absolute top-5 right-5 bg-indigo-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Best Value
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Pro Plan</h3>
                <p className="text-zinc-400">For power users who want more.</p>
              </div>
              <div className="text-5xl font-black text-white">
                $6.9 <span className="text-xl text-zinc-500">/mo</span>
              </div>
              <ul className="space-y-4">
                {[
                  "Unlimited Screenshots",
                  "Unlimited Links & Storage",
                  "Priority Task Management",
                  "Custom Tags & Filters",
                  "Priority Support",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-zinc-300 font-medium"
                  >
                    <div className="bg-indigo-600 p-1 rounded-full text-white">
                      <Check size={14} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="block w-full py-4 bg-indigo-600 text-white text-center font-bold rounded-2xl hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20"
              >
                Get Started Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-black text-white p-1.5 rounded-lg">
              <LayoutGrid size={18} />
            </div>
            <span className="text-lg font-black tracking-tight uppercase">
              Snapterra
            </span>
          </Link>
          <p className="text-zinc-400 text-sm font-medium">
            © 2026 Snapterra Inc. All rights reserved. Built with love for
            creators.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-zinc-400 hover:text-black transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-zinc-400 hover:text-black transition-colors"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-zinc-400 hover:text-black transition-colors"
            >
              Discord
            </a>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
