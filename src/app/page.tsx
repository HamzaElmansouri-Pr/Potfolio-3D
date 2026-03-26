// src/app/page.tsx
import type { Metadata } from "next";
import { HeroOrbitSlider } from "@/components/sections/HeroOrbitSlider";
import { AboutWrapper } from "@/components/sections/AboutWrapper";
import { Services } from "@/components/sections/Services";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";

export const metadata: Metadata = {
  title: "YourName — Software Engineering Portfolio",
  description:
    "Master's in Software Engineering. Building scalable cloud architectures, enterprise backends, and performant web applications.",
};

export default function HomePage() {
  return (
    <>
      <HeroOrbitSlider />
      <AboutWrapper />
      <Services />
      <FeaturedProjects />
    </>
  );
}
