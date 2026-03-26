// src/lib/api.ts
import { projects, services } from "./mock-data";
import type { Project, Service, ApiResponse, ContactFormData } from "@/types";

// Simulates network latency for realistic UX testing
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getProjects(category?: string): Promise<ApiResponse<Project[]>> {
  await delay(300);
  const filtered = category
    ? projects.filter((p) => p.category === category)
    : projects;
  return {
    data: filtered,
    status: 200,
    message: "OK",
    timestamp: new Date().toISOString(),
  };
}

export async function getProjectBySlug(slug: string): Promise<ApiResponse<Project | null>> {
  await delay(200);
  const project = projects.find((p) => p.slug === slug) ?? null;
  return {
    data: project,
    status: project ? 200 : 404,
    message: project ? "OK" : "Not Found",
    timestamp: new Date().toISOString(),
  };
}

export async function getServices(): Promise<ApiResponse<Service[]>> {
  await delay(200);
  return {
    data: services,
    status: 200,
    message: "OK",
    timestamp: new Date().toISOString(),
  };
}

export async function submitContact(data: ContactFormData): Promise<ApiResponse<null>> {
  await delay(500);
  console.log("Contact form submitted:", data);
  return {
    data: null,
    status: 201,
    message: "Message sent successfully",
    timestamp: new Date().toISOString(),
  };
}
