"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Github } from "lucide-react"
import { Card } from "@/components/ui/card"

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack marketplace with real-time inventory management and payment processing",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
    github: "https://github.com/keanuharrell",
    demo: "https://demo.example.com",
    year: "2024"
  },
  {
    title: "Cloud Infrastructure Automation",
    description: "Terraform-based infrastructure automation for multi-cloud deployments",
    technologies: ["Terraform", "AWS", "Docker", "GitHub Actions"],
    github: "https://github.com/keanuharrell",
    year: "2023"
  },
  {
    title: "Real-time Analytics Dashboard",
    description: "Data visualization platform processing millions of events per day",
    technologies: ["TypeScript", "React", "D3.js", "Redis"],
    github: "https://github.com/keanuharrell",
    demo: "https://demo.example.com",
    year: "2023"
  },
  {
    title: "URL Shortener Service",
    description: "High-performance URL shortening service with analytics and custom domains",
    technologies: ["Next.js", "DynamoDB", "AWS Lambda", "CloudFront"],
    github: "https://github.com/keanuharrell",
    demo: "https://ksh.link",
    year: "2024"
  }
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="space-y-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold">Projects</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full flex flex-col group hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <span className="text-sm text-muted-foreground">{project.year}</span>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="text-sm text-muted-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>View Code</span>
                      </a>
                      
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                        >
                          <span>Live Demo</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}