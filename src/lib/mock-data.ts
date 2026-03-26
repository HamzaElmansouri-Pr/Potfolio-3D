// src/lib/mock-data.ts
import { Project, Service } from "@/types";

/* ─── Services ───────────────────────────────────────────────────────────── */
export const services: Service[] = [
  {
    id: "cloud",
    title: "Cloud Architecture",
    description:
      "Designing and deploying scalable, fault-tolerant cloud infrastructure on AWS and Azure.",
    icon: "Cloud",
    features: [
      "Auto-scaling",
      "CI/CD Pipelines",
      "Infrastructure as Code",
      "Cost Optimization",
    ],
    accentColor: "#38bdf8",
  },
  {
    id: "backend",
    title: "Backend Engineering",
    description:
      "High-performance REST & GraphQL APIs with Spring Boot, Node.js, and microservices.",
    icon: "Server",
    features: [
      "Microservices",
      "Event-Driven",
      "API Gateway",
      "Database Design",
    ],
    accentColor: "#818cf8",
  },
  {
    id: "architecture",
    title: "System Architecture",
    description:
      "Enterprise-grade system design with a focus on modularity, DDD, and clean architecture.",
    icon: "Layers",
    features: [
      "Domain-Driven Design",
      "CQRS",
      "Hexagonal Architecture",
      "System Diagrams",
    ],
    accentColor: "#34d399",
  },
  {
    id: "security",
    title: "Security & DevOps",
    description:
      "Zero-trust security models, OAuth2/OIDC integration, and hardened deployment pipelines.",
    icon: "Shield",
    features: [
      "OAuth2 / OIDC / JWT",
      "RBAC",
      "Container Security",
      "Penetration Testing",
    ],
    accentColor: "#fb923c",
  },
];

/* ─── Projects ───────────────────────────────────────────────────────────── */
export const projects: Project[] = [
  {
    id: "1",
    title: "NovaCRM — Multi-Tenant SaaS Platform",
    slug: "novacrm",
    excerpt:
      "Enterprise CRM with multi-tenant isolation, real-time dashboards, and AI-powered insights.",
    description: `
## Overview

NovaCRM is a production-grade, multi-tenant SaaS platform that enables enterprise teams to manage
client relationships, sales pipelines, and analytics from a single unified dashboard.

## Key Challenges

- Implementing row-level tenant isolation in PostgreSQL using Hibernate filters
- Designing a SUPER_ADMIN role that bypasses tenant boundaries for platform operations
- Real-time API response time monitoring per tenant

## Architecture

The backend uses Spring Boot 3 with a modular architecture:
- **Auth:** JWT + role-based (CLIENT / ADMIN / SUPER_ADMIN)
- **Multi-tenancy:** Discriminator column pattern with Spring Security tenant context
- **Database:** PostgreSQL with connection pooling via HikariCP
- **Frontend:** Next.js 15 App Router with server components
    `,
    category: "fullstack",
    tags: ["Spring Boot", "Next.js", "PostgreSQL", "Docker", "Redis", "JWT"],
    heroImage: "/images/projects/image 3.png",
    thumbnails: [
      "/images/projects/image 3.png",
      "/images/projects/image 1.png",
      "/images/projects/image 2.png",
    ],
    techStack: [
      { name: "Spring Boot", icon: "Leaf", color: "#6DB33F" },
      { name: "Next.js 15", icon: "Globe", color: "#000000" },
      { name: "PostgreSQL", icon: "Database", color: "#4169E1" },
      { name: "Docker", icon: "Box", color: "#2496ED" },
      { name: "Redis", icon: "Zap", color: "#DC382D" },
    ],
    liveUrl: "https://novacrm.example.com",
    githubUrl: "https://github.com/youruser/novacrm",
    featured: true,
    completedAt: "2025-12-01",
    client: "Internal Product",
    metrics: [
      { label: "Uptime", value: "99.9%" },
      { label: "Avg Response", value: "<50ms" },
      { label: "Active Tenants", value: "12" },
    ],
  },
  {
    id: "2",
    title: "Cloud Microservices Platform",
    slug: "cloud-microservices",
    excerpt:
      "Distributed microservices platform with service mesh, auto-scaling, and observability stack.",
    description: `
## Overview

A fully containerized microservices platform deployed on AWS ECS, featuring a service mesh,
distributed tracing, and centralized log aggregation.

## Architecture

- **Service Discovery:** AWS Cloud Map
- **Load Balancing:** Application Load Balancer with path-based routing
- **Observability:** CloudWatch + custom dashboards
- **CI/CD:** GitHub Actions → ECR → ECS rolling deployments
    `,
    category: "cloud",
    tags: ["AWS", "Docker", "Terraform", "GitHub Actions", "Spring Boot"],
    heroImage: "/images/projects/image 1.png",
    thumbnails: [
      "/images/projects/image 1.png",
      "/images/projects/image 2.png",
    ],
    techStack: [
      { name: "AWS ECS", icon: "Cloud", color: "#FF9900" },
      { name: "Terraform", icon: "Layers", color: "#7B42BC" },
      { name: "Docker", icon: "Box", color: "#2496ED" },
      { name: "Spring Boot", icon: "Leaf", color: "#6DB33F" },
    ],
    githubUrl: "https://github.com/youruser/cloud-platform",
    featured: true,
    completedAt: "2025-09-15",
    metrics: [
      { label: "Services", value: "8" },
      { label: "Deploy Time", value: "<3min" },
      { label: "Availability", value: "99.95%" },
    ],
  },
  {
    id: "3",
    title: "Database Schema Engine",
    slug: "db-schema-engine",
    excerpt:
      "Multi-database schema migration engine supporting PostgreSQL, MySQL, and MongoDB with rollback support.",
    description: `
## Overview

A CLI and library tool for managing complex database schema migrations across multiple database
engines, with dry-run preview, conflict detection, and atomic rollback.

## Key Features

- Cross-database migration scripts (PostgreSQL / MySQL / MongoDB)
- Graphical diff preview of schema changes
- Transactional rollback on failure
    `,
    category: "backend",
    tags: ["PostgreSQL", "Spring Boot", "Flyway", "Java", "REST API"],
    heroImage: "/images/projects/image 2.png",
    thumbnails: [
      "/images/projects/image 2.png",
      "/images/projects/image 3.png",
    ],
    techStack: [
      { name: "PostgreSQL", icon: "Database", color: "#4169E1" },
      { name: "Spring Boot", icon: "Leaf", color: "#6DB33F" },
      { name: "Flyway", icon: "GitBranch", color: "#CC0200" },
    ],
    githubUrl: "https://github.com/youruser/db-schema-engine",
    featured: false,
    completedAt: "2025-06-20",
    metrics: [
      { label: "Databases", value: "3" },
      { label: "Test Coverage", value: "94%" },
    ],
  },
  {
    id: "4",
    title: "Zero-Trust Security Gateway",
    slug: "security-gateway",
    excerpt:
      "OAuth2/OIDC-based API gateway with RBAC, rate limiting, and real-time threat detection.",
    description: `
## Overview

An enterprise API gateway that enforces zero-trust security principles using OAuth2/OIDC tokens,
per-tenant RBAC policies, and real-time anomaly detection.

## Key Features

- OAuth2 Authorization Code + PKCE flow
- Per-endpoint rate limiting with Redis sliding window
- JWT introspection and token rotation
- Anomaly detection via request pattern analysis
    `,
    category: "backend",
    tags: ["OAuth2", "OIDC", "Spring Security", "Redis", "JWT", "Docker"],
    heroImage: "/images/projects/image 4.1.png",
    thumbnails: [
      "/images/projects/image 4.1.png",
      "/images/projects/image 1.png",
    ],
    techStack: [
      { name: "Spring Security", icon: "Shield", color: "#6DB33F" },
      { name: "Redis", icon: "Zap", color: "#DC382D" },
      { name: "OAuth2/OIDC", icon: "Lock", color: "#2563EB" },
      { name: "Docker", icon: "Box", color: "#2496ED" },
    ],
    githubUrl: "https://github.com/youruser/security-gateway",
    featured: true,
    completedAt: "2025-03-10",
    metrics: [
      { label: "Threats Blocked", value: "1.2K/day" },
      { label: "Latency Added", value: "<2ms" },
    ],
  },
];

/* ─── Featured subset ─────────────────────────────────────────────────────── */
export const featuredProjects = projects.filter((p) => p.featured);
