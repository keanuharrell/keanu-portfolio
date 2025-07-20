"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnimatedButton } from "@/components/ui/animated-button"
import { SkiperCard } from "@/components/ui/skiper-card"

export function ProjectsSection() {
  const projects = [
    {
      title: "Project 1",
      description: "Project description coming soon. You can detail your achievements and the technologies used here.",
      technologies: ["React", "TypeScript", "Next.js"],
      github: "#",
      demo: "#",
      image: "/api/placeholder/400/250",
      likes: 12,
      views: 156
    },
    {
      title: "Project 2", 
      description: "Project description coming soon. You can detail your achievements and the technologies used here.",
      technologies: ["Node.js", "PostgreSQL", "Docker"],
      github: "#",
      image: "/api/placeholder/400/250",
      likes: 8,
      views: 89
    },
    {
      title: "Project 3",
      description: "Project description coming soon. You can detail your achievements and the technologies used here.",
      technologies: ["Python", "AWS", "Kubernetes"],
      github: "#",
      demo: "#",
      image: "/api/placeholder/400/250",
      likes: 15,
      views: 234
    }
  ]

  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            My Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of projects that demonstrate my technical expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <SkiperCard
                title={project.title}
                description={project.description}
                image={project.image}
                gradient={index % 2 === 0}
                className="h-full"
              >
                <div className="space-y-4">
                  {/* Stats */}
                  <div className="flex gap-4 justify-between items-center">
                    <div className="flex gap-2">
                      <AnimatedButton
                        type="view"
                        count={project.views}
                        className="text-xs"
                      />
                      <AnimatedButton
                        type="like"
                        count={project.likes}
                        className="text-xs"
                      />
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => window.open(project.github, '_blank')}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                    
                    {project.demo && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => window.open(project.demo, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </Button>
                    )}
                  </div>
                </div>
              </SkiperCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.open('https://github.com/keanuharrell', '_blank')}
          >
            <Github className="w-5 h-5 mr-2" />
            View more on GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  )
}