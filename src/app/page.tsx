"use client";

import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#f06548]/20 selection:text-black">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </main>
  );
}
