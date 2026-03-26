"use client";

import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Layers, Cpu, Shield, Cloud, LucideIcon } from "lucide-react";

/* ─── Service Card Data ─────────────────────────────────────────────────── */
interface ServiceData {
  title: string;
  sub: string;
  icon: LucideIcon;
  telemetry: string;
  className: string;
}

const CARDS: ServiceData[] = [
  {
    title: "Scalable Full-Stack Architecture",
    sub: "Building high-performance SaaS with Next.js 15 & Spring Boot 3.",
    icon: Layers,
    telemetry: "[ ARCH_TYPE: HEXAGONAL ]",
    className: "md:col-span-2",
  },
  {
    title: "AI Integration",
    sub: "Deep integration of Gemini AI for intelligent user experiences.",
    icon: Cpu,
    telemetry: "[ MODEL: GEMINI_1.5 ]",
    className: "md:col-span-1",
  },
  {
    title: "Security First",
    sub: "Zero-trust models, OAuth2/OIDC, and hardened API design.",
    icon: Shield,
    telemetry: "[ AUTH: OAUTH2_PKCE ]",
    className: "md:col-span-1",
  },
  {
    title: "Cloud Native",
    sub: "Containerized deployment with Docker and automated CI/CD pipelines.",
    icon: Cloud,
    telemetry: "[ UPTIME: 99.99% ]",
    className: "md:col-span-2",
  },
];

/* ─── Interactive Mouse Tracking Bento Component ────────────────────────── */
function BentoCard({ card, index, controls }: { card: ServiceData; index: number; controls: any }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
          opacity: 1,
          y: 0,
          transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
        }),
      }}
      className={`glass-card bento-item group relative flex flex-col justify-between overflow-hidden bg-[#0B1120] border border-white/10 p-6 md:p-8 ${card.className}`}
      onMouseMove={handleMouseMove}
    >
      {/* ─── Radial Mouse Glow Effect ─── */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(37, 99, 235, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* ─── Inner Content Z-layer ─── */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        
        {/* Top: Icon & Telemetry */}
        <div className="flex justify-between items-start mb-12">
          <div className="w-12 h-12 rounded-xl border border-cobalt-500/20 bg-cobalt-500/10 flex items-center justify-center shadow-inner group-hover:border-cobalt-500/50 transition-colors duration-300">
            <card.icon className="text-cobalt-500" size={24} strokeWidth={1.5} />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-cobalt-400/50 font-mono text-[10px] sm:text-xs tracking-widest font-semibold bg-cobalt-950/30 px-3 py-1 rounded-full border border-cobalt-500/10">
              {card.telemetry}
            </span>
          </div>
        </div>

        {/* Bottom: Text */}
        <div>
          <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-3 tracking-wide group-hover:text-cobalt-100 transition-colors">
            {card.title}
          </h3>
          <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed max-w-sm">
            {card.sub}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Section Component ────────────────────────────────────────────── */
export function Services() {
  const { ref, controls } = useScrollReveal(0.15);

  return (
    <section id="services" className="relative py-24 bg-[#0B1120]">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header */}
        <div className="mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Workshop & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt-400 to-cobalt-600">Modules</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl text-lg">
            High-performance telemetry-linked services tailored for scalable software engineering environments.
          </p>
        </div>

        {/* Grid */}
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {CARDS.map((card, idx) => (
            <BentoCard key={idx} card={card} index={idx} controls={controls} />
          ))}
        </div>
      </div>
    </section>
  );
}
