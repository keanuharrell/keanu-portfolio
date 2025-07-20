"use client"

import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { TechnologiesSection } from "@/components/technologies-section"
import { SkillsSection } from "@/components/skills-section"
import { ExpertiseSection } from "@/components/expertise-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <TechnologiesSection />
      <SkillsSection />
      <ExpertiseSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  )
}