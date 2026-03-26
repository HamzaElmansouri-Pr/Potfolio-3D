"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useScrollReveal, staggerContainerVariant, fadeUpVariant } from "@/hooks/useScrollReveal";
import { featuredProjects } from "@/lib/mock-data";

/* ─── Project Card ───────────────────────────────────────────────────────── */
function ProjectCard({
  title,
  slug,
  excerpt,
  heroImage,
  tags,
  category,
}: {
  title: string;
  slug: string;
  excerpt: string;
  heroImage: string;
  tags: string[];
  category: string;
}) {
  return (
    <motion.article
      variants={fadeUpVariant}
      className="group glass-card p-0 overflow-hidden flex flex-col"
    >
      {/* Image with zoom + overlay */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={heroImage}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Slide-up overlay on hover */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3
                     bg-navy-500/80 backdrop-blur-sm
                     translate-y-full group-hover:translate-y-0
                     transition-transform duration-400 ease-out"
        >
          <span
            className="text-xs font-semibold uppercase tracking-widest
                       text-cobalt-300 border border-cobalt-500/40
                       px-3 py-1 rounded-full"
          >
            {category}
          </span>
          <Link
            href={`/projects/${slug}`}
            className="btn-primary text-sm"
            aria-label={`View case study for ${title}`}
          >
            View Case Study
            <ExternalLink size={14} />
          </Link>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3
          className="font-display font-semibold text-base text-[var(--text-primary)]
                     group-hover:text-cobalt-500 transition-colors duration-200 leading-snug"
        >
          {title}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2 flex-1">
          {excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
          {tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2 py-0.5 rounded-full font-medium
                         bg-cobalt-500/8 text-cobalt-500 border border-cobalt-500/15"
            >
              {tag}
            </span>
          ))}
          {tags.length > 4 && (
            <span className="text-[11px] px-2 py-0.5 rounded-full font-medium text-[var(--text-muted)]">
              +{tags.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Featured Projects Section ──────────────────────────────────────────── */
export function FeaturedProjects() {
  const { ref, controls } = useScrollReveal(0.05);

  return (
    <section
      className="section-padding bg-[var(--bg-secondary)]"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header row */}
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={staggerContainerVariant}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <motion.p
              variants={fadeUpVariant}
              className="text-sm font-medium text-cobalt-500 uppercase tracking-widest mb-3"
            >
              Selected Work
            </motion.p>
            <motion.h2
              variants={fadeUpVariant}
              id="projects-heading"
              className="font-display text-4xl md:text-5xl font-bold
                         text-[var(--text-primary)] leading-tight"
            >
              Featured{" "}
              <span className="text-gradient">Projects</span>
            </motion.h2>
          </div>

          <motion.div variants={fadeUpVariant}>
            <Link
              href="/projects"
              className="btn-ghost border border-[var(--border)] group"
            >
              View All Projects
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* 3-column grid */}
        <motion.div
          animate={controls}
          initial="hidden"
          variants={staggerContainerVariant}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
