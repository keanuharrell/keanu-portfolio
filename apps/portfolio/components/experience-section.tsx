"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

const experiences = [
  {
    role: "Senior Full Stack Engineer",
    company: "Tech Corp",
    period: "2022 - Present",
    description: "Leading development of cloud-native applications using React, Node.js, and AWS. Architected microservices handling 1M+ daily requests.",
    technologies: ["React", "TypeScript", "Node.js", "AWS", "Docker"]
  },
  {
    role: "Full Stack Developer", 
    company: "Digital Agency",
    period: "2021 - 2022",
    description: "Developed scalable web applications and RESTful APIs. Improved application performance by 40% through optimization.",
    technologies: ["Vue.js", "Python", "PostgreSQL", "Redis"]
  },
  {
    role: "Junior Developer",
    company: "Startup Inc",
    period: "2020 - 2021", 
    description: "Built responsive web interfaces and integrated third-party APIs. Collaborated in agile teams to deliver features on schedule.",
    technologies: ["JavaScript", "React", "Express", "MongoDB"]
  }
]

const skills = {
  "Languages": ["TypeScript", "JavaScript", "Python", "Go", "C#"],
  "Frontend": ["React", "Next.js", "Vue.js", "Tailwind CSS"],
  "Backend": ["Node.js", "Express", "Django", "GraphQL"],
  "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "CI/CD"],
  "Databases": ["PostgreSQL", "MongoDB", "Redis", "DynamoDB"]
}

export function ExperienceSection() {
  return (
    <section id="experience" className="py-32 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="space-y-16"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-12">Experience</h2>
            
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{exp.role}</h3>
                        <p className="text-muted-foreground">{exp.company}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 md:mt-0">{exp.period}</p>
                    </div>
                    <p className="text-muted-foreground mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-8">Technical Skills</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(skills).map(([category, items], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6">
                    <h4 className="font-semibold mb-4 text-lg">{category}</h4>
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div key={item} className="text-muted-foreground">
                          {item}
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}