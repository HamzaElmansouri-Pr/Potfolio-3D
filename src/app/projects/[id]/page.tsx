import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/api";
import { CinemaProjectView } from "@/components/sections/CinemaProjectView";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  // The 'id' in our route [id]/page.tsx will capture the slug text.
  const response = await getProjectBySlug(resolvedParams.id);
  
  if (!response.data) {
    notFound();
  }

  // Calculate The Next Node Pipeline Logic
  const allProjectsRes = await getProjects();
  const allProjects = allProjectsRes.data;
  const currentIndex = allProjects.findIndex(p => p.slug === resolvedParams.id);
  
  // Loop back to the very first project if we are at the end, else increment 1
  const nextProject = currentIndex !== -1 && currentIndex < allProjects.length - 1 
    ? allProjects[currentIndex + 1] 
    : allProjects[0];

  return (
    <CinemaProjectView 
      project={response.data} 
      nextProjectSlug={nextProject?.slug} 
      nextProjectTitle={nextProject?.title} 
    />
  );
}

// Statically generate standard routes at build time
export async function generateStaticParams() {
  const response = await getProjects();
  return response.data.map((project) => ({
    id: project.slug,
  }));
}
