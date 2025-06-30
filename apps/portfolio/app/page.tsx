"use client"

import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"

export default function Home() {
  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden">
      <section id="home" className="relative z-10 w-full max-w-full">
        <HeroSection />
      </section>
      <section id="about" className="relative z-10 w-full max-w-full">
        <AboutSection />
      </section>
      <section id="projects" className="relative z-10 w-full max-w-full">
        <ProjectsSection />
      </section>
      <section id="skills" className="relative z-10 w-full max-w-full">
        <SkillsSection />
      </section>
      <section id="contact" className="relative z-10 w-full max-w-full">
        <ContactSection />
      </section>
    </div>
  )
}