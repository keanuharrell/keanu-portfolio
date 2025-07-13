"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function ProjectsSection() {
  const projects = [
    {
      title: "Plateforme E-commerce Cloud-Native",
      description: "Architecture microservices complète avec gestion des paiements, inventaire et analytics en temps réel. Déployée sur AWS avec CI/CD automatisé.",
      technologies: ["React", "TypeScript", "Node.js", "AWS Lambda", "DynamoDB", "API Gateway"],
      github: "https://github.com/keanuharrell/ecommerce-platform",
      demo: "https://demo.keanuharrell.dev",
      featured: true
    },
    {
      title: "Pipeline de Données ML",
      description: "Pipeline ETL automatisé pour traitement de données massives avec modèles de machine learning intégrés pour l'analyse prédictive.",
      technologies: ["Python", "Apache Airflow", "Docker", "AWS S3", "Redshift", "MLflow"],
      github: "https://github.com/keanuharrell/ml-data-pipeline",
      featured: true
    },
    {
      title: "API de Gestion de Contenu",
      description: "API RESTful haute performance avec authentification JWT, rate limiting et documentation OpenAPI automatique.",
      technologies: ["Golang", "PostgreSQL", "Redis", "Docker", "Swagger", "GitHub Actions"],
      github: "https://github.com/keanuharrell/content-api",
      demo: "https://api.keanuharrell.dev/docs"
    },
    {
      title: "Dashboard Analytics Real-time",
      description: "Interface de visualisation de données en temps réel avec WebSockets et graphiques interactifs pour le monitoring business.",
      technologies: ["React", "D3.js", "WebSocket", "Node.js", "InfluxDB", "Grafana"],
      github: "https://github.com/keanuharrell/analytics-dashboard",
      demo: "https://analytics.keanuharrell.dev"
    },
    {
      title: "Infrastructure as Code",
      description: "Templates Terraform pour déploiement automatisé d'infrastructures multi-environnements avec monitoring et logging intégrés.",
      technologies: ["Terraform", "AWS", "Kubernetes", "Helm", "Prometheus", "ELK Stack"],
      github: "https://github.com/keanuharrell/infrastructure-templates"
    },
    {
      title: "Application Mobile Cross-Platform",
      description: "Application mobile pour gestion de tâches avec synchronisation cloud et notifications push. Interface native performante.",
      technologies: ["React Native", "TypeScript", "Firebase", "Redux", "Expo", "Jest"],
      github: "https://github.com/keanuharrell/task-mobile-app"
    }
  ]

  return (
    <section id="projects" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Mes Projets
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Une sélection de projets qui démontrent mon expertise technique et ma capacité 
            à livrer des solutions complètes et scalables.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={project.featured ? "md:col-span-2 lg:col-span-2" : ""}
            >
              <Card className="bg-gray-900/50 border-gray-700 hover:border-green-500/50 transition-all duration-300 h-full group hover:shadow-lg hover:shadow-green-500/10">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-white group-hover:text-green-400 transition-colors">
                      {project.title}
                    </CardTitle>
                    {project.featured && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="outline"
                        className="text-xs border-gray-600 text-gray-300 hover:border-green-500/50"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-gray-600 text-gray-300 hover:border-green-500 hover:text-green-400"
                      onClick={() => window.open(project.github, '_blank')}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                    
                    {project.demo && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400"
                        onClick={() => window.open(project.demo, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
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
            className="border-green-500 text-green-400 hover:bg-green-500 hover:text-black"
            onClick={() => window.open('https://github.com/keanuharrell', '_blank')}
          >
            <Github className="w-5 h-5 mr-2" />
            Voir plus sur GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  )
}