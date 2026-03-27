"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter, Activity } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function Footer() {
  const [time, setTime] = useState<string>("00:00:00");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Outputs in HH:mm:ss UTC
      setTime(now.toISOString().substring(11, 19));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-surface-light dark:bg-[#030508] border-t border-slate-200 dark:border-white/5 py-12 md:py-16 relative z-10 text-text-light dark:text-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 items-center">
          
          {/* Column 1: Identity & Heartbeat */}
          <div className="flex flex-col items-start md:items-start space-y-3">
            <Link href="/" className="font-display font-bold text-xl tracking-tight text-text-light dark:text-white flex items-center">
              <span className="text-cobalt-500 mr-1">&lt;</span>
              {siteConfig.logoText}
              <span className="text-cobalt-500 ml-1">/&gt;</span>
            </Link>
            <div className="flex items-center text-xs font-mono text-emerald-500/80 tracking-widest">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              SYSTEMS_ONLINE
            </div>
            <div className="text-[10px] text-slate-400 dark:text-white/30 font-mono flex items-center mt-2">
              <Activity size={12} className="mr-1.5" /> Live System Time (UTC): {time}
            </div>
          </div>

          {/* Column 2: The Node */}
          <div className="flex flex-col items-start md:items-center space-y-1">
            <div className="text-[10px] md:text-xs font-mono text-cobalt-300/60 uppercase tracking-[0.2em] md:text-center leading-relaxed">
              NODE: {siteConfig.location.city}, {siteConfig.location.country}
              <br className="hidden md:block" />
              <span className="md:hidden"> {"//"} </span>
              {siteConfig.location.coordinates}
            </div>
          </div>

          {/* Column 3: Socials */}
          <div className="flex items-center md:justify-end space-x-6">
            <a 
              href={siteConfig.socials.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 dark:text-white/40 hover:text-text-light dark:hover:text-white transition-colors duration-300 hover:drop-shadow-sm dark:hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            >
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </a>
            <a 
              href={siteConfig.socials.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 dark:text-white/40 hover:text-blue-700 dark:hover:text-cobalt-400 transition-colors duration-300 hover:drop-shadow-sm dark:hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.8)]"
            >
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a 
              href={siteConfig.socials.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 dark:text-white/40 hover:text-text-light dark:hover:text-white transition-colors duration-300 hover:drop-shadow-sm dark:hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            >
              <Twitter size={20} />
              <span className="sr-only">Twitter/X</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-400 dark:text-white/30 font-mono">
          <p>© {new Date().getFullYear()} — Built with Next.js 15 & Framer Motion</p>
          <p className="mt-2 md:mt-0 tracking-widest hidden md:block">ALL SYSTEMS NOMINAL</p>
        </div>
      </div>
    </footer>
  );
}
