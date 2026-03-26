"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Terminal } from "lucide-react";
import { AboutCard } from "@/components/sections/AboutCard";
import { AboutMe } from "@/components/sections/AboutMe";

export function AboutWrapper() {
  const [view, setView] = useState<"classic" | "terminal">("terminal");

  return (
    <div className="relative w-full">
      {/* View Toggle */}
      <div className="absolute top-10 right-6 md:right-12 z-50 flex items-center bg-[#090E1A]/80 border border-cobalt-500/20 rounded-full p-1 backdrop-blur-md shadow-2xl">
        <button
          onClick={() => setView("classic")}
          className={`flex items-center px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
            view === "classic" 
              ? "bg-cobalt-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]" 
              : "text-cobalt-300/60 hover:text-cobalt-200 hover:bg-white/5"
          }`}
        >
          <Monitor size={14} className="mr-2" />
          Classic
        </button>
        <button
          onClick={() => setView("terminal")}
          className={`flex items-center px-4 py-2 rounded-full text-xs font-mono font-bold tracking-widest uppercase transition-all ${
            view === "terminal" 
              ? "bg-cobalt-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]" 
              : "text-cobalt-300/60 hover:text-cobalt-200 hover:bg-white/5"
          }`}
        >
          <Terminal size={14} className="mr-2" />
          Terminal
        </button>
      </div>

      <AnimatePresence mode="wait">
        {view === "classic" ? (
          <motion.div
            key="classic"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <AboutCard />
          </motion.div>
        ) : (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <AboutMe />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
