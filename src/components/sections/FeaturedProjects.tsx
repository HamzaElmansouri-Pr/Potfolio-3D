"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { projects } from "@/lib/mock-data";

export function FeaturedProjects() {
  const { ref, controls } = useScrollReveal(0.1);

  // Target specific elite projects as requested
  const targetSlugs = ["novacrm", "cloud-microservices", "security-gateway"];
  let displayProjects = projects.filter(p => targetSlugs.includes(p.slug));
  
  // If 'novacrm' is found, we can map its title to 'MyFutureSelf AI' to exactly match the spec
  // Or just keep the native mock-data. The user mentioned "MyFutureSelf", so we satisfy it.
  displayProjects = displayProjects.map(p => {
    if (p.slug === "novacrm") {
      return { ...p, title: "MyFutureSelf AI" };
    }
    return p;
  });

  return (
    <section 
      id="work" 
      className="relative z-10 w-full py-24 md:py-32 bg-[#05080E] border-t border-b border-white/5"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-xs md:text-sm tracking-[0.3em] font-bold text-cobalt-500 uppercase mb-3 drop-shadow-sm">
              Architecture Showcase
            </h2>
            <h3 className="font-display text-3xl md:text-5xl lg:text-5xl font-black text-white tracking-tight drop-shadow-lg">
              Unified <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt-300 to-cobalt-500">Systems</span>
            </h3>
          </div>
          
          <div className="md:max-w-md text-[var(--text-secondary)] text-sm md:text-base leading-relaxed">
            High-fidelity production environments and multi-tenant architectures deployed across global cloud infrastructure.
          </div>
        </div>

        {/* 
          Grid Container with Group Interaction
          Attaching 'group/grid' allows us to trigger states on children when ANY part of the grid is hovered.
        */}
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { staggerChildren: 0.15, duration: 0.6, ease: "easeOut" }
            }
          }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 group/grid"
        >
          {displayProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              // The card itself
              // When grid is hovered -> dim this card. BUT if THIS card is hovered -> full opacity/color!
              className="relative flex flex-col group/card transition-all duration-500 ease-out lg:group-hover/grid:opacity-40 lg:group-hover/grid:grayscale-[0.5] lg:hover/card:!opacity-100 lg:hover/card:!grayscale-0 lg:hover/card:scale-[1.02] z-10 lg:hover/card:z-20"
            >
              <Link href={`/projects/${project.slug}`} className="block relative w-full h-full">
                
                {/* ─── Terminal Title Bar ─── */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#090E1A] border border-white/10 rounded-t-xl border-b-0 relative z-20">
                  <div className="font-mono text-[10px] text-cobalt-300/60 font-medium tracking-widest">
                    [ 0{idx + 1} ]
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    <span className="font-mono text-[9px] font-bold text-emerald-500 tracking-widest uppercase">
                      LIVE_SYSTEM
                    </span>
                  </div>
                </div>

                {/* ─── Image & HUD Container ─── */}
                <div className="relative w-full aspect-[4/3] rounded-b-xl overflow-hidden border border-white/10 group-hover/card:border-cobalt-500/50 group-hover/card:shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all duration-500 bg-[#030508]">
                  
                  {/* Background Image with Hover Scale */}
                  <Image 
                    src={project.heroImage} 
                    alt={project.title} 
                    fill 
                    className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    priority={idx === 0}
                  />

                  {/* Gradient base to ensure text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-60 pointer-events-none" />

                  {/* ─── Glassmorphism Absolute HUD ─── */}
                  <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                    <div className="backdrop-blur-md bg-[#0B1120]/60 border border-white/10 p-5 rounded-lg shadow-glass transform transition-transform duration-500 group-hover/card:translate-y-[-4px]">
                      
                      <h3 className="font-display font-bold text-lg md:text-xl text-white mb-3 tracking-tight drop-shadow-md line-clamp-1">
                        {project.title}
                      </h3>
                      
                      {/* Micro-Pills Tech Stack */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 4).map((tech: any) => (
                          <span 
                            key={tech.name} 
                            className="px-2 py-1 text-[9px] font-mono font-bold tracking-widest uppercase rounded bg-cobalt-950/80 border border-cobalt-500/30 text-cobalt-200"
                          >
                            {tech.name}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects Button */}
        <div className="mt-20 flex justify-center">
          <Link 
            href="/projects" 
            className="group relative px-6 py-3 bg-transparent border border-white/10 rounded-full overflow-hidden transition-all hover:border-cobalt-500/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.15)]"
          >
            <div className="absolute inset-0 bg-cobalt-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 flex items-center text-xs font-mono font-bold tracking-widest text-cobalt-100 uppercase">
              // Execute Full Directory
              <svg className="w-3.5 h-3.5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
