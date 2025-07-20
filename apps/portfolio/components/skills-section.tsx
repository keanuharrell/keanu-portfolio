"use client"

import { motion } from "framer-motion"
import { MinimalCard } from "@/components/ui/minimal-card"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, Zap, Award } from "lucide-react"

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Zap className="w-5 h-5" />,
      skills: [
        { name: "React", level: "Expert", years: "3+" },
        { name: "Next.js", level: "Advanced", years: "2+" },
        { name: "TypeScript", level: "Advanced", years: "3+" },
        { name: "Tailwind CSS", level: "Expert", years: "2+" },
        { name: "Framer Motion", level: "Intermediate", years: "1+" }
      ]
    },
    {
      title: "Backend Development",
      icon: <TrendingUp className="w-5 h-5" />,
      skills: [
        { name: "Node.js", level: "Advanced", years: "3+" },
        { name: "Golang", level: "Advanced", years: "2+" },
        { name: "C#/.NET", level: "Intermediate", years: "2+" },
        { name: "Python", level: "Intermediate", years: "2+" },
        { name: "RESTful APIs", level: "Expert", years: "3+" }
      ]
    },
    {
      title: "Cloud & DevOps",
      icon: <Award className="w-5 h-5" />,
      skills: [
        { name: "AWS", level: "Advanced", years: "3+" },
        { name: "Docker", level: "Advanced", years: "2+" },
        { name: "Kubernetes", level: "Intermediate", years: "1+" },
        { name: "Terraform", level: "Advanced", years: "2+" },
        { name: "CI/CD", level: "Expert", years: "3+" }
      ]
    },
    {
      title: "Database Systems",
      icon: <Star className="w-5 h-5" />,
      skills: [
        { name: "PostgreSQL", level: "Advanced", years: "3+" },
        { name: "MongoDB", level: "Advanced", years: "2+" },
        { name: "Redis", level: "Intermediate", years: "2+" },
        { name: "DynamoDB", level: "Intermediate", years: "1+" }
      ]
    }
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      case "Advanced":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  return (
    <section id="skills" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Technical Skills
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to create performant solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <MinimalCard className="h-full">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{skill.name}</span>
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${getLevelColor(skill.level)}`}
                          >
                            {skill.level}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {skill.years}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </MinimalCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}