// src/types/index.ts

export type ProjectCategory = "backend" | "fullstack" | "mobile" | "cloud";

export interface TechBadge {
  name: string;
  icon: string; // Lucide icon name
  color: string; // hex
}

export interface ProjectMetric {
  label: string; // e.g. "Uptime"
  value: string; // e.g. "99.9%"
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  excerpt: string; // ≤120 chars
  description: string; // full markdown
  category: ProjectCategory;
  tags: string[];
  heroImage: string;
  thumbnails: string[];
  techStack: TechBadge[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  completedAt: string; // ISO date
  client?: string;
  metrics?: ProjectMetric[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  features: string[];
  accentColor?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: string;
}

export interface OrbitItem {
  id: string;
  label: string;
  icon: string; // Lucide icon name
  description: string;
  color: string;
  image?: string; // local /public path
}

export interface NavLink {
  label: string;
  href: string;
}
