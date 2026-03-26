"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Cloud,
  Server,
  Layers,
  Shield,
  LucideIcon,
} from "lucide-react";
import { useScrollReveal, staggerContainerVariant, fadeUpVariant } from "@/hooks/useScrollReveal";
import { services } from "@/lib/mock-data";

/* ─── Icon mapping ────────────────────────────────────────────────────────── */
const ICON_MAP: Record<string, LucideIcon> = { Cloud, Server, Layers, Shield };

/* ─── Spotlight Card ─────────────────────────────────────────────────────── */
function ServiceCard({
  title,
  description,
  icon: iconName,
  features,
  accentColor = "#2563EB",
}: {
  title: string;
  description: string;
  icon: string;
  features: string[];
  accentColor?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  // Track mouse position to move the spotlight gradient
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const spot = spotRef.current;
    if (!card || !spot) return;
    const { left, top } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    spot.style.left = `${x}px`;
    spot.style.top = `${y}px`;
    spot.style.opacity = "1";
  }, []);

  const onMouseLeave = useCallback(() => {
    if (spotRef.current) spotRef.current.style.opacity = "0";
  }, []);

  const Icon = ICON_MAP[iconName] ?? Cloud;

  return (
    <motion.div
      variants={fadeUpVariant}
      ref={cardRef}
      className="bento-item relative overflow-hidden group cursor-default select-none"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      aria-label={title}
    >
      {/* Spotlight */}
      <div
        ref={spotRef}
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2
                   w-56 h-56 rounded-full opacity-0
                   transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, ${accentColor}18 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4
                   transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${accentColor}18` }}
      >
        <Icon size={22} style={{ color: accentColor }} strokeWidth={1.7} />
      </div>

      {/* Title & description */}
      <h3 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-2 leading-tight">
        {title}
      </h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
        {description}
      </p>

      {/* Feature chips */}
      <ul className="flex flex-wrap gap-2 mt-auto">
        {features.map((f) => (
          <li
            key={f}
            className="text-xs px-2.5 py-1 rounded-full font-medium
                       border border-[var(--border)]
                       text-[var(--text-secondary)]
                       group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]
                       transition-colors duration-200"
          >
            {f}
          </li>
        ))}
      </ul>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full
                   transition-all duration-500 rounded-full"
        style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

/* ─── Services Grid ──────────────────────────────────────────────────────── */
export function ServicesGrid() {
  const { ref, controls } = useScrollReveal(0.1);

  return (
    <section className="section-padding bg-[var(--bg-secondary)]" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={staggerContainerVariant}
          className="mb-12"
        >
          <motion.p
            variants={fadeUpVariant}
            className="text-sm font-medium text-cobalt-500 uppercase tracking-widest mb-3"
          >
            What I Do
          </motion.p>
          <motion.h2
            variants={fadeUpVariant}
            id="services-heading"
            className="font-display text-4xl md:text-5xl font-bold
                       text-[var(--text-primary)] leading-tight max-w-xl"
          >
            Engineering Excellence{" "}
            <span className="text-gradient">Across the Stack</span>
          </motion.h2>
        </motion.div>

        {/* 2×2 Bento Grid */}
        <motion.div
          animate={controls}
          initial="hidden"
          variants={staggerContainerVariant}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
        >
          {services.map((svc) => (
            <ServiceCard key={svc.id} {...svc} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
