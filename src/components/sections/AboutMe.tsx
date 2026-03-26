"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const TECH_STACK = [
  "Java", "Spring Boot", "TypeScript", "Next.js", "React", 
  "PostgreSQL", "Docker", "AWS", "Redis", "Kafka",
  "Java", "Spring Boot", "TypeScript", "Next.js", "React", 
  "PostgreSQL", "Docker", "AWS", "Redis", "Kafka"
];

export function AboutMe() {
  const { ref, controls } = useScrollReveal();

  return (
    <section 
      id="about" 
      ref={ref}
      className="relative w-full py-20 overflow-hidden bg-[var(--bg-primary)] select-none"
    >
      {/* Background Marquee */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full overflow-hidden opacity-5 pointer-events-none flex whitespace-nowrap">
        <motion.div 
          className="flex space-x-16 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {TECH_STACK.map((tech, i) => (
            <span key={i} className="font-display font-black text-8xl text-white tracking-tight uppercase">
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          
          {/* Left: Floating Glass Profile */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-72 h-72 md:w-88 md:h-88">
              {/* Glowing Aura */}
              <div className="absolute inset-0 bg-cobalt-500/20 rounded-full blur-[60px]" />
              
              {/* Glass Container */}
              <motion.div 
                className="relative w-full h-full rounded-full glass border border-cobalt-500/30 p-4 shadow-[0_0_40px_rgba(37,99,235,0.3)]"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-cobalt-400/20 bg-[#0B1120]">
                  {/* Fallback image path if profile.png is not found */}
                  <Image 
                    src="/images/profile/profile.png" 
                    alt="Profile" 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 300px, 400px"
                    priority
                  />
                  {/* Tech Ring Overlay */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-cobalt-500/30 animate-[spin_30s_linear_infinite]" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right: README Styled Bio */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="glass-card bg-[#0B1120]/80 border-cobalt-500/20 p-8 md:p-10 shadow-2xl relative overflow-hidden group">
              {/* Terminal Title Bar */}
              <div className="absolute top-0 left-0 w-full h-8 bg-[#090E1A] border-b border-cobalt-500/20 flex items-center px-4 space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-4 font-mono text-[10px] text-[var(--text-muted)] tracking-widest">
                  ~/bio/README.md
                </span>
              </div>

              {/* Bio Content */}
              <div className="mt-6 space-y-6 font-mono">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cobalt-300 to-cobalt-500 tracking-tight">
                    # THE_ARCHITECT
                  </h2>
                  <div className="h-px w-24 bg-cobalt-500/30 mt-2" />
                </div>

                <div className="space-y-4 text-sm md:text-base text-cobalt-100/70 leading-relaxed">
                  <p>
                    <span className="text-cobalt-400">{"> "}</span> 
                    Master&apos;s level Software Engineer focused on designing resilient, scalable enterprise architectures.
                  </p>
                  <p>
                    <span className="text-cobalt-400">{"> "}</span> 
                    Specialized in backend ecosystem (Spring Boot, microservices) paired with modern, high-performance frontend interfaces (Next.js, Framer Motion).
                  </p>
                  <p>
                    <span className="text-cobalt-400">{"> "}</span> 
                    Passionate about clean code, robust deployment pipelines, and zero-trust security environments. Fluent in translating complex business requirements into elegant technical solutions.
                  </p>
                </div>

                {/* Command Output */}
                <div className="pt-4 border-t border-cobalt-500/10">
                  <div className="flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold">$</span>
                    <span className="text-white">init_collaboration.sh</span>
                  </div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-3 inline-block"
                  >
                    <a href="#contact" className="px-6 py-2.5 bg-cobalt-600 hover:bg-cobalt-500 text-white text-sm font-bold tracking-wider rounded transition-colors inline-flex items-center">
                      EXECUTE
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
