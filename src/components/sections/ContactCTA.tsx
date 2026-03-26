"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * ─── Magnetic Button Component ─────────────────────────────────────────
 */
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

export function ContactCTA() {
  const { ref, controls } = useScrollReveal(0.2);

  return (
    <section className="relative w-full py-32 md:py-48 bg-surface-light dark:bg-[#030508] overflow-hidden flex items-center justify-center border-t border-slate-200 dark:border-white/5">
      
      {/* ─── Dot Grid Background ─── */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" 
        style={{ 
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", 
          backgroundSize: "32px 32px" 
        }}
      />

      {/* ─── Subtle Radial Gradient to Focus Center ─── */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05)_0%,transparent_50%)] pointer-events-none z-0" />

      {/* ─── Content Container ─── */}
      <motion.div 
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] }
          }
        }}
        className="container mx-auto px-6 max-w-4xl text-center relative z-10"
      >
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-text-light dark:text-white tracking-tight drop-shadow-sm dark:drop-shadow-lg mb-12">
          READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt-400 to-emerald-400">ARCHITECT</span> THE FUTURE?
        </h2>

        {/* ─── Magnetic Button ─── */}
        <div className="mb-8 flex justify-center">
          <Link href="/contact">
            <MagneticButton>
              <div className="group relative px-8 py-5 bg-cobalt-600 hover:bg-cobalt-500 rounded-full text-white font-bold tracking-[0.2em] text-sm shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(37,99,235,0.6)] flex items-center overflow-hidden">
                <span className="relative z-10 mr-2 flex items-center">
                  START A CONVERSATION
                </span>
                <Send 
                  size={16} 
                  className="relative z-10 transform translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out" 
                />
              </div>
            </MagneticButton>
          </Link>
        </div>

        {/* ─── Status Line ─── */}
        <div className="flex justify-center items-center">
          <div className="px-4 py-2 border border-slate-200 dark:border-white/10 rounded-md bg-white dark:bg-white/5 shadow-sm dark:shadow-none backdrop-blur-sm">
            <p className="font-mono text-[10px] md:text-xs text-slate-500 dark:text-cobalt-200/80 tracking-widest uppercase flex items-center">
              <span className="mr-2 text-emerald-400">]</span>
              [ AVAILABILITY: ACCEPTING_PROJECTS ]
              <span className="ml-2 text-emerald-400">[</span>
            </p>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
