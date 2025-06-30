"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Github, Cloud, Smartphone, BarChart3 } from "lucide-react"

const projectsData = {
  infrastructure: [
    {
      title: "Multi-Cloud Infrastructure",
      description: "Production-grade infrastructure spanning AWS, GCP, and Cloudflare with automated deployment and monitoring.",
      image: "/api/placeholder/400/200",
      tech: ["Terraform", "Kubernetes", "AWS", "GCP", "Cloudflare"],
      github: "https://github.com/keanuharrell/multi-cloud-infra",
      live: "https://monitoring.keanuharrell.com",
      highlights: ["99.9% uptime", "Auto-scaling", "Cost optimization"]
    },
    {
      title: "Kubernetes Cluster Management",
      description: "Self-managed Kubernetes clusters with GitOps workflow, automated backups, and disaster recovery.",
      image: "/api/placeholder/400/200",
      tech: ["Kubernetes", "ArgoCD", "Helm", "Prometheus", "Grafana"],
      github: "https://github.com/keanuharrell/k8s-cluster",
      live: "https://k8s.keanuharrell.com",
      highlights: ["GitOps workflow", "Auto-healing", "Multi-region"]
    },
    {
      title: "CI/CD Pipeline Automation",
      description: "Advanced CI/CD pipelines with security scanning, automated testing, and deployment strategies.",
      image: "/api/placeholder/400/200",
      tech: ["GitHub Actions", "Docker", "Trivy", "SonarQube", "Terraform"],
      github: "https://github.com/keanuharrell/cicd-pipeline",
      highlights: ["Security scanning", "Zero-downtime", "Rollback capability"]
    }
  ],
  ios: [
    {
      title: "DevOps Monitor iOS App",
      description: "Native iOS app for monitoring infrastructure health, deployments, and receiving alerts on-the-go.",
      image: "/api/placeholder/400/200",
      tech: ["Swift", "SwiftUI", "Combine", "CloudKit", "Push Notifications"],
      github: "https://github.com/keanuharrell/devops-monitor-ios",
      live: "https://apps.apple.com/app/devops-monitor",
      highlights: ["Real-time alerts", "Dark mode", "Apple Watch support"]
    },
    {
      title: "Infrastructure Dashboard",
      description: "Comprehensive iOS dashboard for managing cloud resources and viewing real-time metrics.",
      image: "/api/placeholder/400/200",
      tech: ["SwiftUI", "Charts", "Core Data", "WidgetKit", "Shortcuts"],
      github: "https://github.com/keanuharrell/infra-dashboard-ios",
      highlights: ["Interactive charts", "Widget support", "Siri shortcuts"]
    },
    {
      title: "Cost Optimizer App",
      description: "iOS application for tracking and optimizing cloud costs with AI-powered recommendations.",
      image: "/api/placeholder/400/200",
      tech: ["Swift", "Core ML", "SwiftUI", "CloudKit", "Create ML"],
      github: "https://github.com/keanuharrell/cost-optimizer-ios",
      highlights: ["AI recommendations", "Cost predictions", "Budget alerts"]
    }
  ],
  monitoring: [
    {
      title: "Grafana Dashboard Suite",
      description: "Comprehensive monitoring dashboards with custom panels for infrastructure and application metrics.",
      image: "/api/placeholder/400/200",
      tech: ["Grafana", "Prometheus", "InfluxDB", "Elasticsearch", "Alertmanager"],
      github: "https://github.com/keanuharrell/grafana-dashboards",
      live: "https://grafana.keanuharrell.com",
      highlights: ["Custom panels", "Multi-datasource", "Alert rules"]
    },
    {
      title: "Real-time Monitoring System",
      description: "End-to-end monitoring solution with custom metrics collection and intelligent alerting.",
      image: "/api/placeholder/400/200",
      tech: ["Prometheus", "Grafana", "Node Exporter", "Blackbox Exporter", "PagerDuty"],
      github: "https://github.com/keanuharrell/monitoring-system",
      live: "https://status.keanuharrell.com",
      highlights: ["SLA monitoring", "Predictive alerts", "Incident response"]
    },
    {
      title: "Log Analysis Platform",
      description: "Centralized logging platform with advanced search capabilities and automated log parsing.",
      image: "/api/placeholder/400/200",
      tech: ["ELK Stack", "Fluentd", "Kibana", "Elasticsearch", "Logstash"],
      github: "https://github.com/keanuharrell/log-analysis",
      highlights: ["Real-time parsing", "Custom visualizations", "Anomaly detection"]
    }
  ]
}

const tabIcons = {
  infrastructure: Cloud,
  ios: Smartphone,
  monitoring: BarChart3
}

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my work in infrastructure automation, iOS development, and monitoring solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Tabs defaultValue="infrastructure" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {Object.entries(tabIcons).map(([key, Icon]) => (
                <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline capitalize">{key}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(projectsData).map(([category, projects]) => (
              <TabsContent key={category} value={category}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                        <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-t-lg relative overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            {tabIcons[category as keyof typeof tabIcons] && (
                              <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm">
                                {(() => {
                                  const Icon = tabIcons[category as keyof typeof tabIcons];
                                  return <Icon className="h-8 w-8 text-primary" />;
                                })()}
                              </div>
                            )}
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle className="group-hover:text-primary transition-colors">
                            {project.title}
                          </CardTitle>
                          <CardDescription>{project.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          
                          {project.highlights && (
                            <div className="mb-4">
                              <h4 className="text-sm font-medium mb-2">Key Features:</h4>
                              <ul className="text-sm text-muted-foreground space-y-1">
                                {project.highlights.map((highlight) => (
                                  <li key={highlight} className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-primary rounded-full" />
                                    {highlight}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="flex gap-2 mt-auto">
                            {project.github && (
                              <Button size="sm" variant="outline" asChild>
                                <a href={project.github} target="_blank" rel="noopener noreferrer">
                                  <Github className="mr-2 h-4 w-4" />
                                  Code
                                </a>
                              </Button>
                            )}
                            {project.live && (
                              <Button size="sm" asChild>
                                <a href={project.live} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Live
                                </a>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}