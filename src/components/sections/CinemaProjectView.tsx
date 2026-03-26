"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { ChevronLeft, ExternalLink, Github, Zap, ShieldCheck, ChevronRight } from "lucide-react";
import type { Project } from "@/types";

interface CinemaProjectViewProps {
  project: Project;
  nextProjectSlug?: string;
  nextProjectTitle?: string;
}

export function CinemaProjectView({ project, nextProjectSlug, nextProjectTitle }: CinemaProjectViewProps) {
  const [activeImage, setActiveImage] = useState(project.heroImage);
  const images = Array.from(new Set([project.heroImage, ...(project.thumbnails || [])]));

  return (
    <div className="bg-surface-light dark:bg-[#030508] min-h-screen text-text-light dark:text-white relative">
      
      {/* ─── Global Noise Texture Overlay ─── */}
      <div 
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}
      />

      {/* ─── Top Metadata (120px Gap) ─── */}
      <div className="pt-24 pb-8 md:pt-32 px-6 md:px-12 max-w-7xl mx-auto flex items-center justify-between relative z-20">
        
        {/* Simple Circular Hover Back Button */}
        <Link 
          href="/#work" 
          className="group flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 hover:bg-slate-300 dark:hover:bg-white/10 hover:border-slate-400 dark:hover:border-white/20 transition-all duration-300 backdrop-blur-md"
        >
          <ChevronLeft size={18} className="text-slate-500 dark:text-white/70 group-hover:text-text-light dark:group-hover:text-white transition-colors group-hover:-translate-x-0.5" />
        </Link>

        {/* Flickering Monospace Node Identity */}
        <div className="font-mono text-[10px] md:text-xs text-blue-700 dark:text-cobalt-400/80 tracking-widest uppercase flex items-center border border-cobalt-500/20 bg-blue-50 dark:bg-cobalt-950/30 px-4 py-2 rounded-full">
          <span className="relative flex h-1.5 w-1.5 mr-2">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 dark:bg-cobalt-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600 dark:bg-cobalt-500"></span>
          </span>
          <span className="animate-[pulse_4s_ease-in-out_infinite]">
            [ SYSTEM_CORE: PROJECT_NODE_0{project.id} ]
          </span>
        </div>
      </div>

      {/* ─── Huge Layered Background Title ─── */}
      <div className="absolute top-40 left-0 right-0 flex justify-center w-full overflow-hidden pointer-events-none z-0">
        <h1 className="font-display font-black text-[10vw] leading-none text-slate-900 dark:text-white opacity-5 dark:opacity-[0.03] whitespace-nowrap pt-8 select-none tracking-tighter">
          {project.title.toUpperCase()}
        </h1>
      </div>

      {/* ─── Floating Hero Container ─── */}
      <div className="relative max-w-7xl mx-auto px-6 mb-24 z-10 flex flex-col items-center">
        
        {/* Pulsing Ambient Radial Glow */}
        <motion.div 
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-cobalt-600 blur-[100px] md:blur-[140px] rounded-full pointer-events-none z-0"
        />

        {/* Cinematic Primary Frame */}
        <motion.div 
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(37,99,235,0.3)] ring-1 ring-slate-200 dark:ring-white/10 bg-white dark:bg-[#0B1120] z-10"
        >
          {/* Active Image with Crossfade */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image 
                src={activeImage} 
                alt={project.title} 
                fill 
                className="object-cover" 
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Inner Vignette / Dark Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-[#030508]/80 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* ─── Floating Interactive Filmstrip ─── */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-30 w-[90%] md:w-auto">
          <div className="glass-card bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-3 rounded-2xl shadow-md dark:shadow-glass-dark flex overflow-x-auto gap-3 hide-scrollbar snap-x">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative shrink-0 w-24 md:w-32 aspect-video rounded-lg overflow-hidden snap-start transition-all duration-300 ${
                  activeImage === img 
                    ? 'ring-2 ring-cobalt-500 scale-100 opacity-100 shadow-[0_0_15px_rgba(37,99,235,0.5)]' 
                    : 'opacity-50 hover:opacity-100 scale-95 hover:scale-100 grayscale hover:grayscale-0'
                }`}
              >
                <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Architecture Deep-Dive ─── */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10 pb-16">
        
        {/* Main Column: Header and Prose */}
        <div className="lg:col-span-8">
          
          <div className="mb-10">
            <h2 className="font-display font-black text-4xl md:text-5xl text-text-light dark:text-white tracking-tight mb-4 drop-shadow-sm dark:drop-shadow-md">
              {project.title}
            </h2>
            <p className="text-xl text-slate-600 dark:text-cobalt-200/80 font-medium leading-relaxed">
              {project.excerpt}
            </p>
          </div>

          <div className="prose dark:prose-invert prose-cobalt max-w-none prose-headings:font-display prose-headings:font-bold prose-h2:text-slate-800 dark:prose-h2:text-white prose-h2:border-b prose-h2:border-slate-200 dark:prose-h2:border-white/5 prose-h2:pb-4 prose-p:text-slate-600 dark:prose-p:text-white/70 prose-p:leading-relaxed prose-li:text-slate-600 dark:prose-li:text-white/70">
            <ReactMarkdown>{project.description || "Project deep-dive details coming soon."}</ReactMarkdown>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-4 mt-12">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-cobalt-600 hover:bg-cobalt-500 text-white text-xs font-bold tracking-widest rounded-full transition-colors flex items-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                <ExternalLink size={14} className="mr-2" />
                LIVE_PREVIEW
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-slate-100 dark:bg-white/5 backdrop-blur-md border border-slate-300 dark:border-white/20 hover:border-slate-400 dark:hover:border-white/40 text-slate-700 dark:text-white text-xs font-bold tracking-widest rounded-full transition-colors flex items-center">
                <Github size={14} className="mr-2" />
                SOURCE_CODE
              </a>
            )}
          </div>
        </div>

        {/* Technical Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Tech Map */}
          <div className="glass-card bg-white/60 dark:bg-[#0B1120]/60 border border-slate-200 dark:border-white/5 p-8 rounded-[1.5rem] shadow-sm dark:shadow-none">
            <h3 className="font-display font-bold text-sm text-text-light dark:text-white mb-6 uppercase tracking-[0.2em] flex items-center border-b border-slate-200 dark:border-white/5 pb-4">
              <Zap size={14} className="mr-2 text-cobalt-400" /> Technology Map
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech.name} className="px-3 py-1.5 text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest rounded bg-cobalt-950/40 border border-cobalt-500/30 text-cobalt-200">
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* Telemetry Core */}
          <div className="glass-card bg-white/60 dark:bg-[#0B1120]/60 border border-slate-200 dark:border-white/5 p-8 rounded-[1.5rem] relative overflow-hidden shadow-sm dark:shadow-none">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none" />
            
            <h3 className="font-display font-bold text-sm text-text-light dark:text-white mb-6 uppercase tracking-[0.2em] flex items-center border-b border-slate-200 dark:border-white/5 pb-4 relative z-10">
              <ShieldCheck size={14} className="mr-2 text-emerald-400" /> Telemetry Core
            </h3>
            
            <div className="space-y-3 font-mono text-xs relative z-10">
              <div className="flex justify-between items-center p-3 border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/5 rounded-lg">
                <span className="text-slate-500 dark:text-white/40 tracking-widest">SYSTEM HEALTH</span>
                <span className="text-emerald-500 dark:text-emerald-400 font-bold tracking-widest">100%</span>
              </div>
              <div className="flex justify-between items-center p-3 border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/5 rounded-lg">
                <span className="text-slate-500 dark:text-white/40 tracking-widest">UPTIME</span>
                <span className="text-blue-600 dark:text-cobalt-300 font-bold tracking-widest">99.9%</span>
              </div>
              <div className="flex justify-between items-center p-3 border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/5 rounded-lg">
                <span className="text-slate-500 dark:text-white/40 tracking-widest">BUILD</span>
                <span className="text-text-light dark:text-white font-bold tracking-widest flex items-center">
                  <span className="relative flex h-1.5 w-1.5 mr-2">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  STABLE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* ─── Next Project Shortcut ─── */}
      {nextProjectSlug && nextProjectTitle && (
        <div className="relative z-20 mt-16 border-t border-slate-200 dark:border-white/5 hidden md:block">
           {/* Abstract overlay to blend footer smoothly */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-light/80 dark:from-[#0B1120]/80 to-transparent pointer-events-none" />
          
          <div className="pt-20 pb-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between group relative z-10">
            <div>
              <span className="font-mono text-[10px] text-blue-600 dark:text-cobalt-400/60 tracking-widest uppercase block mb-3">
                // MOUNT NEXT DATABANK
              </span>
              <h2 className="font-display text-2xl md:text-5xl font-bold text-text-light dark:text-white group-hover:text-blue-700 dark:group-hover:text-cobalt-400 transition-colors drop-shadow-sm dark:drop-shadow-md">
                {nextProjectTitle}
              </h2>
            </div>
            <Link 
              href={`/projects/${nextProjectSlug}`}
              className="mt-6 md:mt-0 px-8 py-4 bg-white dark:bg-white/5 backdrop-blur-md border border-slate-300 dark:border-white/10 group-hover:border-blue-600 dark:group-hover:border-cobalt-500 rounded-full flex items-center text-xs font-mono tracking-widest text-slate-700 dark:text-white uppercase transition-all duration-300 group-hover:bg-blue-50 dark:group-hover:bg-cobalt-600/90 shadow-sm dark:shadow-glass-dark"
            >
              INITIATE TRANSFER <ChevronRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
