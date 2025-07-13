"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React / Next.js", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Tailwind CSS", level: 85 },
        { name: "Framer Motion", level: 80 }
      ],
      color: "text-blue-400"
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Golang", level: 85 },
        { name: "C#/.NET", level: 80 },
        { name: "Python", level: 75 }
      ],
      color: "text-green-400"
    },
    {
      title: "Cloud & DevOps",
      skills: [
        { name: "AWS", level: 90 },
        { name: "Docker", level: 85 },
        { name: "Kubernetes", level: 80 },
        { name: "Terraform", level: 85 }
      ],
      color: "text-orange-400"
    },
    {
      title: "Bases de données",
      skills: [
        { name: "PostgreSQL", level: 85 },
        { name: "MongoDB", level: 80 },
        { name: "Redis", level: 85 },
        { name: "DynamoDB", level: 80 }
      ],
      color: "text-purple-400"
    },
    {
      title: "Outils & Méthodes",
      skills: [
        { name: "Git / GitHub", level: 95 },
        { name: "CI/CD", level: 90 },
        { name: "Microservices", level: 85 },
        { name: "Agile / Scrum", level: 80 }
      ],
      color: "text-pink-400"
    }
  ]

  return (
    <section id="skills" className="py-20 bg-gray-900/30">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Compétences Techniques
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Un éventail de technologies maîtrisées pour créer des solutions complètes 
            et performantes du frontend au déploiement cloud.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/50 border-gray-700 hover:border-gray-600 transition-colors h-full">
                <CardHeader>
                  <CardTitle className={`${category.color} text-xl font-bold`}>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm font-medium">
                          {skill.name}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                          viewport={{ once: true }}
                          className={`h-2 rounded-full bg-gradient-to-r ${
                            category.title === 'Frontend' ? 'from-blue-500 to-blue-400' :
                            category.title === 'Backend' ? 'from-green-500 to-green-400' :
                            category.title === 'Cloud & DevOps' ? 'from-orange-500 to-orange-400' :
                            category.title === 'Bases de données' ? 'from-purple-500 to-purple-400' :
                            'from-pink-500 to-pink-400'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-8 border border-gray-600">
            <h3 className="text-2xl font-bold text-white mb-4">
              Apprentissage Continu
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              La technologie évolue rapidement, et je maintiens une veille active pour rester 
              à jour avec les dernières innovations et bonnes pratiques de l'industrie.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {["AI/ML", "Web3", "Serverless", "Edge Computing", "GraphQL"].map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-700/50 border border-gray-600 rounded-full text-gray-300 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}