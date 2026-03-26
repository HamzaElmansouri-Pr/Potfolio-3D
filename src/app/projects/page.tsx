"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Search } from "lucide-react";
import { getProjects } from "@/lib/api";
import type { Project } from "@/types";

function DataConsoleCard({ 
  project, 
  onNavigate, 
  isExiting 
}: { 
  project: Project; 
  onNavigate: (e: React.MouseEvent, slug: string, id: string, image: string) => void;
  isExiting: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Subtle 3D tilt (max 5 degrees)
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-100, 100], [5, -5]);
  const rotateY = useTransform(mouseXSpring, [-100, 100], [-5, 5]);

  function handleMouse(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a 
      href={`/projects/${project.slug}`}
      onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => onNavigate(e, project.slug, project.id, project.heroImage)}
      layout
      initial={{ opacity: 0, height: 0, scale: 0.95 }}
      animate={isExiting ? { scale: 0.9, opacity: 0 } : { opacity: 1, height: "auto", scale: 1 }}
      exit={{ opacity: 0, height: 0, scale: 0.9, margin: 0 }}
      transition={{ 
        layout: { type: "spring", stiffness: 300, damping: 30 }, 
        opacity: { duration: 0.2 },
        height: { duration: 0.4 }
      }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group block relative w-full border border-white/5 bg-[#070B14] overflow-hidden transform-gpu flex flex-col items-stretch"
    >
      {/* ─── Top: Image Pane ─── */}
      <div className="relative w-full aspect-video overflow-hidden bg-black outline outline-1 outline-white/5">
        <Image 
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* The 'Scanning' Effect Line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-cobalt-500 shadow-[0_0_15px_rgba(37,99,235,1)] opacity-0 group-hover:animate-[scan_1.5s_ease-in-out_1] pointer-events-none" />
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
      </div>

      {/* ─── Bottom: Metadata Pane ─── */}
      <div className="p-5 bg-[#05080E] border-t border-white/5 flex flex-col justify-between grow">
        
        {/* Line 1: Identity */}
        <div className="font-mono text-[9px] text-white/40 tracking-[0.2em] mb-3 uppercase flex items-center justify-between">
          <span>ID: 0x0{project.id} // {project.category}</span>
          <span className="text-cobalt-500/50">[{project.completedAt.split('-')[0]}]</span>
        </div>

        {/* Line 2: Title */}
        <h2 className="font-display font-medium text-lg lg:text-xl text-white leading-tight mb-4 group-hover:text-cobalt-300 transition-colors">
          {project.title}
        </h2>

        {/* Line 3: Tech Dots */}
        <div className="flex items-center gap-2 mt-auto">
          {project.techStack.map((tech) => (
            <div 
              key={tech.name}
              title={tech.name}
              className="w-2 h-2 rounded-full ring-1 ring-white/10"
              style={{ backgroundColor: tech.color === '#000000' ? '#ffffff' : tech.color }} // Adjust black icons for dark mode
            />
          ))}
          <span className="ml-2 font-mono text-[8px] tracking-widest text-white/30 uppercase group-hover:text-white/50 transition-colors">
             SYS_MODULES_DETECTED
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default function EliteEngineeringArchive() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Custom screen takeover state
  const [exitingId, setExitingId] = useState<string | null>(null);
  const [expansionImage, setExpansionImage] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setCurrentTime(new Date().toISOString());
    const t = setInterval(() => setCurrentTime(new Date().toISOString()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    getProjects().then((res) => {
      setProjects(res.data);
      setLoading(false);
    });
  }, []);

  const handleNavigate = (e: React.MouseEvent, slug: string, id: string, image: string) => {
    e.preventDefault();
    if (exitingId) return; 
    setExitingId(id);
    setExpansionImage(image);
    
    // Simulate navigation expansion block
    setTimeout(() => {
      router.push(`/projects/${slug}`);
    }, 600);
  };

  const filteredProjects = projects.filter((p) => {
    const searchString = `${p.title} ${p.category} ${p.tags.join(" ")}`.toLowerCase();
    return searchString.includes(query.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#030508] text-white overflow-hidden relative selection:bg-cobalt-500/30">
      
      {/* ─── Global Scanlines / CRT effect ─── */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.02]" 
           style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, #FFF 1px, #FFF 2px)' }} />

      {/* ─── Vault Header ─── */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="w-full max-w-[1600px] mx-auto px-6 pt-[120px] md:pt-[160px] pb-4 flex flex-col relative z-20"
      >
        <div className="flex items-center w-full">
          <h1 className="text-3xl font-display font-bold text-white tracking-tighter uppercase mr-6 drop-shadow-lg">
            PROJECT_VAULT
          </h1>
          <div className="flex-grow border-t border-white/5" />
        </div>
        <div className="mt-3 font-mono text-[10px] text-white/40 tracking-widest uppercase">
          TOTAL_NODES: {filteredProjects.length < 10 ? `0${filteredProjects.length}` : filteredProjects.length} // REPOSITORY: HAMZA_OS // LAST_SYNC: [{currentTime || "..."}]
        </div>
      </motion.div>

      {/* ─── Neon Search HUD ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full max-w-3xl mx-auto px-6 mb-12 relative z-20 flex justify-center mt-10"
      >
        <div 
          className="relative w-full flex items-center bg-[#0B1120] border border-white/10 rounded-full px-6 py-4 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.1)] focus-within:border-cobalt-500 focus-within:shadow-[0_0_25px_rgba(37,99,235,0.4)]"
        >
          <Search className="text-cobalt-500 mr-4" size={20} />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search resources..."
            spellCheck={false}
            className="bg-transparent border-none outline-none font-mono text-sm md:text-base text-white w-full placeholder-white/20"
          />
          <div className="ml-4 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-white/40 whitespace-nowrap hidden md:block">
            CTRL+K
          </div>
        </div>
      </motion.div>

      {/* ─── The Grid Layout ─── */}
      <div className="w-full max-w-[1600px] mx-auto px-6 py-12 md:py-20 relative z-10">
        
        {loading ? (
          <div className="py-32 font-mono text-[10px] tracking-[0.3em] text-cobalt-500/50 uppercase text-center animate-pulse">
            INITIALIZING_DATABANKS...
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <DataConsoleCard 
                  key={project.id} 
                  project={project} 
                  onNavigate={handleNavigate}
                  isExiting={exitingId === project.id}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>

      {/* ─── Target Expansion Overlay (Navigation) ─── */}
      <AnimatePresence>
        {expansionImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[150] bg-[#030508] flex items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.8, filter: "blur(10px)", opacity: 0 }}
              animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-[70vh] md:h-screen"
            >
              <Image 
                src={expansionImage} 
                alt="Expanding Target" 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030508] to-transparent" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0; opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

    </div>
  );
}
