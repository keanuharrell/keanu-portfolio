"use client"

import { DevOpsCommandCenter } from "@/components/devops-command-center"
import { Architecture3DViewer } from "@/components/architecture-3d-viewer"
import { PerformanceAnalyticsDashboard } from "@/components/performance-analytics-dashboard"
import { DevOpsPlayground } from "@/components/devops-playground"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-black">
      <section id="command-center" className="relative z-10 w-full max-w-full">
        <DevOpsCommandCenter />
      </section>
      <section id="architecture" className="relative z-10 w-full max-w-full">
        <Architecture3DViewer />
      </section>
      <section id="analytics" className="relative z-10 w-full max-w-full">
        <PerformanceAnalyticsDashboard />
      </section>
      <section id="playground" className="relative z-10 w-full max-w-full">
        <DevOpsPlayground />
      </section>
      <section id="contact" className="relative z-10 w-full max-w-full">
        <ContactSection />
      </section>
    </div>
  )
}