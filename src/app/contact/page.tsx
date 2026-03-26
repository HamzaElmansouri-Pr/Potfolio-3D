"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Lock, MapPin, Clock, Activity, CheckCircle, Send } from "lucide-react";

export default function ContactTerminal() {
  const [time, setTime] = useState<string>("00:00:00");
  const [formState, setFormState] = useState<"idle" | "transmitting" | "success">("idle");

  // Dynamic Clock
  useEffect(() => {
    const updateTime = () => setTime(new Date().toISOString().substring(11, 19));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("transmitting");
    setTimeout(() => {
      setFormState("success");
    }, 2000); // 2 second mock secure transmission
  };

  return (
    <div className="min-h-screen bg-surface-light dark:bg-[#030508] text-text-light dark:text-white pt-32 pb-24 relative overflow-hidden">

      {/* Background Noise */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ─── Left Column: Metadata ─── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-12"
          >
            <div>
              <h1 className="font-display font-black text-4xl md:text-5xl tracking-tight mb-4 drop-shadow-md">
                Secure Comms
              </h1>
              <p className="font-mono text-xs md:text-sm text-cobalt-400 tracking-widest uppercase flex items-center bg-cobalt-950/30 border border-cobalt-500/20 px-4 py-2 rounded w-fit">
                <Terminal size={14} className="mr-2" />
                // INITIATE_COMMUNICATION
              </p>
            </div>

            <p className="text-slate-600 dark:text-white/60 leading-relaxed max-w-md">
              Encrypted channel open. Submit project parameters for architectural review and systems engineering quotation.
            </p>

            <div className="space-y-6 font-mono text-xs md:text-sm tracking-widest uppercase">

              <div className="flex items-center text-white/50 border-white/5 border-b pb-4">
                <MapPin size={16} className="mr-4 text-cobalt-500" />
                <span className="w-24 shrink-0 text-slate-400 dark:text-white/30 hidden md:inline-block">LOCATION:</span>
                <span className="text-text-light dark:text-white">CASABLANCA, MARR</span>
              </div>

              <div className="flex items-center text-white/50 border-white/5 border-b pb-4">
                <Clock size={16} className="mr-4 text-cobalt-500" />
                <span className="w-24 shrink-0 text-slate-400 dark:text-white/30 hidden md:inline-block">TIME:</span>
                <span className="text-text-light dark:text-white">UTC {time}</span>
              </div>

              <div className="flex items-center text-white/50 border-white/5 border-b pb-4">
                <Activity size={16} className="mr-4 text-emerald-500" />
                <span className="w-24 shrink-0 text-slate-400 dark:text-white/30 hidden md:inline-block">STATUS:</span>
                <span className="text-emerald-400 font-bold flex items-center drop-shadow-md">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  ACCEPTING_CLIENTS
                </span>
              </div>

            </div>
          </motion.div>

          {/* ─── Right Column: The Form ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/90 dark:glass-card dark:bg-[#0B1120]/80 border border-slate-200 dark:border-white/10 p-8 md:p-10 rounded-2xl shadow-sm dark:shadow-glass-dark relative overflow-hidden"
          >
            {/* Ambient Background Glow inside the card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cobalt-600/10 blur-[80px] rounded-full pointer-events-none z-0" />

            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white dark:bg-[#090E1A] border border-emerald-500/30 rounded-2xl p-8 text-center"
                >
                  <CheckCircle size={48} className="text-emerald-500 mb-6 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                  <h3 className="font-mono font-bold tracking-[0.2em] text-emerald-400 uppercase text-sm md:text-base">
                    SUCCESS: MESSAGE_DELIVERED
                  </h3>
                  <p className="text-slate-500 dark:text-white/40 mt-4 text-xs font-mono max-w-xs leading-relaxed uppercase">
                    Encrypted payload received. The Architect will respond shortly.
                  </p>
                  <button
                    onClick={() => setFormState("idle")}
                    className="mt-8 font-mono text-xs text-slate-500 dark:text-white/40 hover:text-blue-700 dark:hover:text-white underline underline-offset-4 tracking-widest transition-colors"
                  >
                    RESET_TERMINAL
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 relative z-10"
                >
                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] tracking-widest text-slate-500 dark:text-cobalt-200/60 uppercase">NAME</label>
                    <input
                      required
                      disabled={formState === "transmitting"}
                      type="text"
                      className="w-full bg-slate-50 dark:bg-[#030508]/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-text-light dark:text-white font-mono text-sm focus:outline-none focus:border-cobalt-500 focus:ring-1 focus:ring-cobalt-500 transition-all shadow-inner disabled:opacity-50"
                      placeholder="e.g. John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] tracking-widest text-slate-500 dark:text-cobalt-200/60 uppercase">EMAIL</label>
                    <input
                      required
                      disabled={formState === "transmitting"}
                      type="email"
                      className="w-full bg-slate-50 dark:bg-[#030508]/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-text-light dark:text-white font-mono text-sm focus:outline-none focus:border-cobalt-500 focus:ring-1 focus:ring-cobalt-500 transition-all shadow-inner disabled:opacity-50"
                      placeholder="john@enterprise.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] tracking-widest text-slate-500 dark:text-cobalt-200/60 uppercase">
                      PROJECT_TYPE
                    </label>

                    <select
                      required
                      defaultValue=""
                      disabled={formState === "transmitting"}
                      className="w-full bg-slate-50 dark:bg-[#030508]/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-text-light dark:text-white font-mono text-sm focus:outline-none focus:border-cobalt-500 focus:ring-1 focus:ring-cobalt-500 transition-all shadow-inner appearance-none disabled:opacity-50"
                    >
                      <option value="" disabled className="text-slate-400 dark:text-white/40">
                        Select a classification...
                      </option>

                      <option value="cloud">Cloud Architecture</option>
                      <option value="fullstack">Full-Stack SaaS</option>
                      <option value="backend">Backend Systems</option>
                      <option value="consulting">Technical Consulting</option>
                    </select>
                  </div>


                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] tracking-widest text-slate-500 dark:text-cobalt-200/60 uppercase">MESSAGE</label>
                    <textarea
                      required
                      disabled={formState === "transmitting"}
                      rows={4}
                      className="w-full bg-slate-50 dark:bg-[#030508]/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-text-light dark:text-white font-mono text-sm focus:outline-none focus:border-cobalt-500 focus:ring-1 focus:ring-cobalt-500 transition-all shadow-inner resize-none disabled:opacity-50"
                      placeholder="Enter operational parameters..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === "transmitting"}
                    className="w-full py-4 mt-6 bg-cobalt-600 hover:bg-cobalt-500 text-white rounded-lg font-mono text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center transition-all disabled:opacity-80 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)]"
                  >
                    {formState === "transmitting" ? (
                      <>
                        <Lock size={14} className="mr-3 animate-pulse text-white/70" />
                        <span className="animate-pulse">Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} className="mr-3 text-white/90" />
                        Secure Send
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
