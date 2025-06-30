"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cloud, Code, Smartphone, BarChart3, Database, Shield } from "lucide-react"

const skillCategories = [
  {
    title: "Cloud Platforms",
    icon: Cloud,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "AWS", level: 95 },
      { name: "Google Cloud", level: 90 },
      { name: "Azure", level: 85 },
      { name: "Cloudflare", level: 88 },
      { name: "DigitalOcean", level: 80 }
    ]
  },
  {
    title: "DevOps & Infrastructure",
    icon: Shield,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Kubernetes", level: 95 },
      { name: "Docker", level: 98 },
      { name: "Terraform", level: 92 },
      { name: "Ansible", level: 88 },
      { name: "Jenkins", level: 85 }
    ]
  },
  {
    title: "iOS Development",
    icon: Smartphone,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "Swift", level: 92 },
      { name: "SwiftUI", level: 90 },
      { name: "UIKit", level: 88 },
      { name: "Xcode", level: 92 },
      { name: "Core Data", level: 85 }
    ]
  },
  {
    title: "Monitoring & Observability",
    icon: BarChart3,
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "Grafana", level: 95 },
      { name: "Prometheus", level: 92 },
      { name: "ELK Stack", level: 88 },
      { name: "DataDog", level: 85 },
      { name: "New Relic", level: 80 }
    ]
  },
  {
    title: "Programming Languages",
    icon: Code,
    color: "from-indigo-500 to-purple-500",
    skills: [
      { name: "TypeScript", level: 92 },
      { name: "Python", level: 90 },
      { name: "Go", level: 85 },
      { name: "Swift", level: 92 },
      { name: "Bash", level: 88 }
    ]
  },
  {
    title: "Databases",
    icon: Database,
    color: "from-teal-500 to-green-500",
    skills: [
      { name: "PostgreSQL", level: 88 },
      { name: "MongoDB", level: 85 },
      { name: "Redis", level: 90 },
      { name: "InfluxDB", level: 85 },
      { name: "DynamoDB", level: 82 }
    ]
  }
]

const certifications = [
  "AWS Solutions Architect Professional",
  "Google Cloud Professional Cloud Architect",
  "Certified Kubernetes Administrator (CKA)",
  "Apple Developer Program Member"
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels across different domains.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color} text-white`}>
                      <category.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: (index * 0.1) + (skillIndex * 0.05) }}
                        viewport={{ once: true }}
                        className="group/skill"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium group-hover/skill:text-primary transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full bg-gradient-to-r ${category.color} transition-all duration-300`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: (index * 0.1) + (skillIndex * 0.05) }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-6">Certifications</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Badge 
                  variant="outline" 
                  className="text-sm px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                >
                  {cert}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">5+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">Technologies Mastered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">4</div>
                  <div className="text-sm text-muted-foreground">Certifications</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}