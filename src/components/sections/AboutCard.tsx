"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Loader2,
  MapPin,
  GraduationCap,
  Github,
  Linkedin,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { useScrollReveal, fadeUpVariant, slideInLeftVariant, staggerContainerVariant } from "@/hooks/useScrollReveal";

const SKILLS = [
  "Spring Boot",
  "Next.js 15",
  "PostgreSQL",
  "Docker",
  "AWS",
  "System Design",
  "OAuth2 / OIDC",
  "Microservices",
];

/* ─── About Card ─────────────────────────────────────────────────────────── */
export function AboutCard() {
  const [cvState, setCvState] = useState<"idle" | "loading" | "done">("idle");
  const { ref, controls } = useScrollReveal(0.1);

  const handleDownloadCV = async () => {
    if (cvState !== "idle") return;
    setCvState("loading");
    // Simulate a "CV generation" delay — replace with real file path when ready
    await new Promise((r) => setTimeout(r, 1800));
    setCvState("done");
    // Restore after 2.5s
    setTimeout(() => setCvState("idle"), 2500);
    // Open / download the CV file
    const link = document.createElement("a");
    link.href = "/cv.pdf"; // drop your actual CV here as /public/cv.pdf
    link.download = "YourName_CV.pdf";
    link.click();
  };

  return (
    <section
      className="section-padding bg-[var(--bg-primary)]"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={staggerContainerVariant}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* ── Left: Photo ── */}
          <motion.div
            variants={slideInLeftVariant}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 0 4px rgba(37,99,235,0.15), 0 0 40px rgba(37,99,235,0.1)",
                    "0 0 0 6px rgba(37,99,235,0.25), 0 0 60px rgba(37,99,235,0.18)",
                    "0 0 0 4px rgba(37,99,235,0.15), 0 0 40px rgba(37,99,235,0.1)",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Photo container */}
              <div
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden
                           border-4 border-cobalt-500/20 shadow-glow-lg"
              >
                <Image
                  src="/images/profile/profile.png"
                  alt="Your Name — Software Engineer"
                  fill
                  sizes="(max-width: 768px) 256px, 320px"
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Status badge */}
              <div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2
                           glass flex items-center gap-2 px-4 py-2 rounded-full
                           border border-cobalt-500/20"
              >
                <span className="dot-accent animate-pulse" />
                <span className="text-xs font-medium text-[var(--text-primary)] whitespace-nowrap">
                  Open to opportunities
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Copy ── */}
          <motion.div variants={staggerContainerVariant} className="space-y-6">
            {/* Label */}
            <motion.p
              variants={fadeUpVariant}
              className="text-sm font-medium text-cobalt-500 uppercase tracking-widest"
            >
              About Me
            </motion.p>

            {/* Name & title */}
            <motion.div variants={fadeUpVariant} className="space-y-1">
              <h2
                id="about-heading"
                className="font-display text-4xl md:text-5xl font-bold
                           text-[var(--text-primary)] leading-tight"
              >
                Your Name
              </h2>
              <p className="text-lg text-cobalt-500 font-medium font-display">
                Software Engineer & Cloud Architect
              </p>
            </motion.div>

            {/* Meta info */}
            <motion.div
              variants={fadeUpVariant}
              className="flex flex-wrap gap-4 text-sm text-[var(--text-secondary)]"
            >
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-cobalt-500" />
                Morocco
              </span>
              <span className="flex items-center gap-1.5">
                <GraduationCap size={14} className="text-cobalt-500" />
                M.Sc. Software Engineering
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={fadeUpVariant}
              className="text-[var(--text-secondary)] leading-relaxed text-base"
            >
              I&apos;m a software engineer specializing in{" "}
              <span className="text-[var(--text-primary)] font-medium">
                enterprise-grade backend systems
              </span>{" "}
              and{" "}
              <span className="text-[var(--text-primary)] font-medium">
                cloud architectures
              </span>
              . I design scalable, multi-tenant SaaS platforms built on Spring Boot,
              Next.js, and cloud-native infrastructure — combining clean architecture
              principles with a focus on performance and security.
            </motion.p>

            {/* Skills */}
            <motion.ul
              variants={fadeUpVariant}
              className="flex flex-wrap gap-2"
              aria-label="Technical skills"
            >
              {SKILLS.map((skill) => (
                <li
                  key={skill}
                  className="text-xs px-3 py-1.5 rounded-xl font-medium
                             glass border border-[var(--border)]
                             text-[var(--text-secondary)]"
                >
                  {skill}
                </li>
              ))}
            </motion.ul>

            {/* Actions */}
            <motion.div
              variants={fadeUpVariant}
              className="flex flex-wrap gap-3 pt-2"
            >
              {/* CV download button */}
              <button
                onClick={handleDownloadCV}
                disabled={cvState === "loading"}
                className="btn-primary min-w-[160px] justify-center disabled:opacity-80 disabled:cursor-not-allowed"
                aria-label="Download CV"
              >
                {cvState === "idle" && (
                  <>
                    <Download size={15} />
                    Download CV
                  </>
                )}
                {cvState === "loading" && (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Generating…
                  </>
                )}
                {cvState === "done" && (
                  <>
                    <CheckCircle2 size={15} />
                    Downloaded!
                  </>
                )}
              </button>

              {/* Social links */}
              <a
                href="https://github.com/youruser"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="btn-ghost border border-[var(--border)] px-4"
              >
                <Github size={16} />
              </a>
              <a
                href="https://linkedin.com/in/youruser"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="btn-ghost border border-[var(--border)] px-4"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="/contact"
                aria-label="Hire me"
                className="btn-ghost border border-[var(--border)] px-4 gap-1.5"
              >
                Hire Me
                <ExternalLink size={14} />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
