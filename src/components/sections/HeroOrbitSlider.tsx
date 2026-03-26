"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, LayoutTemplate, Network, ArrowDown } from "lucide-react";

/* ─── Orbit Data & HUD Titles ─────────────────────────────────────────────── */
const ORBIT_ITEMS = [
  {
    id: "backend",
    title: "SCALABLE BACKEND",
    hudTitle: "SYSTEM ARCHITECT",
    icon: Database,
    description: "Solidify your business with our scalable and reliable backend solutions.",
    telemetry: [
      "> STATUS: ACTIVE",
      "> CPU: 12%",
      "> LATENCY: 22MS"
    ]
  },
  {
    id: "frontend",
    title: "MODERN FRONTEND",
    hudTitle: "UI/UX ENGINEER",
    icon: LayoutTemplate,
    description: "Building immersive, high-performance interfaces and design systems.",
    telemetry: [
      "> STATUS: SYNCED",
      "> BUNDLE: 128KB",
      "> FPS: 60"
    ]
  },
  {
    id: "architecture",
    title: "SOFTWARE ARCHITECTURE",
    hudTitle: "CLOUD SPECIALIST",
    icon: Network,
    description: "Development with high performance and scalable architectural patterns.",
    telemetry: [
      "> STATUS: SCALING",
      "> NODES: 8/12",
      "> TRAFFIC: 4.2TB"
    ]
  },
];

export function HeroOrbitSlider() {
  const [rotation, setRotation] = useState(0);
  const isPaused = useRef(false);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  
  const SPEED = 0.2; // degrees per frame

  // Animation Loop
  const animate = useCallback(
    (timestamp: number) => {
      if (!isPaused.current) {
        const delta = lastTimeRef.current ? timestamp - lastTimeRef.current : 16;
        const increment = (SPEED * delta) / (1000 / 60);
        setRotation((prev) => (prev + increment) % 360);
      }
      lastTimeRef.current = timestamp;
      rafRef.current = requestAnimationFrame(animate);
    },
    []
  );

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  // Determine Active Item (the one closest to the front/user)
  let activeIndex = 0;
  let maxZ = -Infinity;
  ORBIT_ITEMS.forEach((_, i) => {
    const angleDeg = rotation + (360 / ORBIT_ITEMS.length) * i;
    const angleRad = (angleDeg * Math.PI) / 180;
    const z = Math.sin(angleRad);
    if (z > maxZ) {
      maxZ = z;
      activeIndex = i;
    }
  });

  const activeItem = ORBIT_ITEMS[activeIndex];

  // Perspective Math Constants
  const RADIUS_X = 280;
  const RADIUS_Y = 120; 

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0B1120]">
      
      {/* ─── Background Layer & Data Points ─── */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            repeating-linear-gradient(to right, #1e3a8a40 0, #1e3a8a40 1px, transparent 1px, transparent 40px),
            repeating-linear-gradient(to bottom, #1e3a8a40 0, #1e3a8a40 1px, transparent 1px, transparent 40px)
          `,
        }}
        aria-hidden="true"
      />
      
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cobalt-600/20 rounded-full blur-[120px] pointer-events-none"
        animate={{ x: [0, 50, -50, 0], y: [0, -50, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none"
        animate={{ x: [0, -60, 60, 0], y: [0, 60, -60, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* ─── Main Content Grid ─── */}
      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full min-h-[600px] mt-16 md:mt-0">
        
        {/* ─── Typography HUD (Left Side) ─── */}
        <div className="flex flex-col justify-center items-start space-y-8 order-2 lg:order-1 select-none">
          
          {/* System Telemetry Badge */}
          <motion.div 
            className="flex items-center space-x-3 px-4 py-2 rounded-full backdrop-blur-sm border border-emerald-500/20"
            style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}
          >
            <motion.div
              className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] relative flex-shrink-0"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span 
              className="text-emerald-400 font-mono text-xs tracking-widest font-semibold"
              animate={{ opacity: [1, 0.3, 0.8, 0.1, 1], x: [0, -2, 2, -1, 0] }}
              transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 10, ease: "linear" }}
            >
              NODE: CASABLANCA // UPTIME: 99.9%
            </motion.span>
          </motion.div>

          {/* Dynamic Sync Title */}
          <div className="h-32 md:h-40 flex items-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={activeItem.hudTitle}
                initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]"
              >
                {activeItem.hudTitle}
              </motion.h1>
            </AnimatePresence>
          </div>

          <p className="text-[var(--text-secondary)] text-lg max-w-md leading-relaxed">
            Command Center interface tracking real-time system architecture and deployment pipelines across the global edge network.
          </p>
          
          <div className="flex gap-4 pt-4">
            <button className="btn-primary hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-shadow">
              Deploy Module
            </button>
            <button className="btn-ghost border border-[var(--border)]">
              System Logs
            </button>
          </div>
        </div>

        {/* ─── 3D Orbit Slider (Right Side) ─── */}
        <div 
          className="relative w-full h-[500px] perspective-[1200px] flex items-center justify-center order-1 lg:order-2"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Tilted Table Container */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: "rotateX(10deg)", transformStyle: "preserve-3d" }}
          >
            {/* Visual Orbit Tracks */}
            <div 
              className="absolute border border-cobalt-500/15 rounded-full"
              style={{ width: RADIUS_X * 2, height: RADIUS_Y * 2 }}
            />
            <div 
              className="absolute border border-dashed border-cobalt-500/10 rounded-full"
              style={{ width: RADIUS_X * 2.5, height: RADIUS_Y * 2.5 }}
            />

            {/* ─── The Status Array Hub (Replaces YN) ─── */}
            <div className="absolute flex flex-col items-center justify-center w-64 h-64 pointer-events-none" style={{ zIndex: 30 }}>
              
              {/* Geometric Node Cluster */}
              <div className="relative flex items-center justify-center w-24 h-24 mt-8">
                {/* SVG Connections */}
                <svg className="absolute w-32 h-32 opacity-30 text-cobalt-400" viewBox="0 0 100 100">
                   <line x1="20" y1="50" x2="50" y2="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
                   <line x1="50" y1="20" x2="80" y2="50" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
                   <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
                </svg>

                {/* Node 1: Frontend */}
                <motion.div 
                  className="absolute -left-6 z-10"
                  animate={{ 
                    boxShadow: activeItem.id === "frontend" ? "0 0 25px 8px rgba(37,99,235,0.8)" : "none",
                    scale: activeItem.id === "frontend" ? 1.3 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`w-6 h-6 rotate-45 border border-cobalt-500/50 transition-colors duration-300 ${activeItem.id === "frontend" ? "bg-cobalt-500" : "bg-[#0B1120]"}`} />
                </motion.div>

                {/* Node 2: Backend */}
                <motion.div 
                  className="absolute -top-6 z-10"
                  animate={{ 
                    boxShadow: activeItem.id === "backend" ? "0 0 25px 8px rgba(37,99,235,0.8)" : "none",
                    scale: activeItem.id === "backend" ? 1.3 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`w-8 h-8 border border-cobalt-500/50 transition-colors duration-300 ${activeItem.id === "backend" ? "bg-cobalt-500" : "bg-[#0B1120]"}`} />
                </motion.div>

                {/* Node 3: Architecture */}
                <motion.div 
                  className="absolute -right-6 z-10"
                  animate={{ 
                    boxShadow: activeItem.id === "architecture" ? "0 0 25px 8px rgba(37,99,235,0.8)" : "none",
                    scale: activeItem.id === "architecture" ? 1.3 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`w-6 h-6 rounded-full border border-cobalt-500/50 transition-colors duration-300 ${activeItem.id === "architecture" ? "bg-cobalt-500" : "bg-[#0B1120]"}`} />
                </motion.div>
              </div>


            </div>

            {/* ─── Orbiting Cards ─── */}
            {ORBIT_ITEMS.map((item, index) => {
              const angleDeg = rotation + (360 / ORBIT_ITEMS.length) * index;
              const angleRad = (angleDeg * Math.PI) / 180;
              
              // 3D Math Position mapping
              const x = Math.cos(angleRad) * RADIUS_X;
              const y = Math.sin(angleRad) * RADIUS_Y;
              
              const sin = Math.sin(angleRad);
              
              // Advanced Depth & Clipping Prevention Logic
              // Smoothly interpolate scale and opacity
              const scale = 0.9 + (sin * 0.2); // varies from 0.7 to 1.1
              const opacity = 0.7 + (sin * 0.3); // varies from 0.4 to 1.0
              
              // If negative (behind hub), push z-index far back (10)
              // If positive (in front), pull z-index forward (50)
              // The hub sits at z-index 30, so this perfectly layers the cards.
              const zIndex = sin < 0 ? 10 : 50;

              return (
                <motion.div
                  key={item.id}
                  className="absolute flex flex-col items-center justify-center text-center p-5 rounded-2xl glass-card border border-white/5 w-60 cursor-pointer"
                  style={{
                    x,
                    y,
                    scale,
                    opacity,
                    zIndex,
                    rotateX: -10, // Maintain card upright against 10deg tilted plane
                  }}
                  onMouseEnter={() => (isPaused.current = true)}
                  onMouseLeave={() => (isPaused.current = false)}
                  whileHover={{ 
                    scale: scale * 1.08, 
                    borderColor: "rgba(37,99,235,0.6)",
                    boxShadow: "0 0 30px rgba(37,99,235,0.6)",
                  }}
                >
                  <div className="w-10 h-10 mb-3 rounded-lg border border-cobalt-500/30 bg-cobalt-500/10 flex items-center justify-center shadow-inner">
                    <item.icon className="text-cobalt-400" size={20} />
                  </div>
                  <h3 className="font-display font-bold tracking-wider text-sm text-white mb-2 uppercase">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ─── Scroll Indicator ─── */}
      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-40 cursor-default"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <span className="text-[10px] font-mono text-cobalt-400/80 tracking-[0.3em] uppercase">
          [ Discover Architecture ]
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} className="text-cobalt-500" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
