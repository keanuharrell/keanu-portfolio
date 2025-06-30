"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Cloud, 
  Database, 
  Shield, 
  Zap, 
  BarChart3, 
  Globe, 
  Server, 
  MonitorSpeaker,
  ArrowRight,
  ExternalLink
} from "lucide-react"

const architectureComponents = [
  {
    id: "cdn",
    title: "CDN & Edge",
    description: "Cloudflare CDN with edge computing",
    icon: Globe,
    position: { top: "10%", left: "10%" },
    connections: ["loadbalancer"],
    tech: ["Cloudflare", "Edge Workers", "WAF"]
  },
  {
    id: "loadbalancer",
    title: "Load Balancer",
    description: "High-availability load balancing",
    icon: Zap,
    position: { top: "10%", left: "45%" },
    connections: ["kubernetes"],
    tech: ["AWS ALB", "NGINX", "Traefik"]
  },
  {
    id: "kubernetes",
    title: "Kubernetes Cluster",
    description: "Multi-node K8s cluster with auto-scaling",
    icon: Server,
    position: { top: "10%", left: "80%" },
    connections: ["database", "monitoring"],
    tech: ["K8s", "Docker", "Helm"]
  },
  {
    id: "database",
    title: "Database Layer",
    description: "Highly available database cluster",
    icon: Database,
    position: { top: "50%", left: "80%" },
    connections: ["backup"],
    tech: ["PostgreSQL", "Redis", "MongoDB"]
  },
  {
    id: "monitoring",
    title: "Monitoring Stack",
    description: "Comprehensive observability platform",
    icon: BarChart3,
    position: { top: "50%", left: "45%" },
    connections: ["alerting"],
    tech: ["Prometheus", "Grafana", "ELK"]
  },
  {
    id: "backup",
    title: "Backup & Storage",
    description: "Automated backup and disaster recovery",
    icon: Shield,
    position: { top: "80%", left: "80%" },
    connections: [],
    tech: ["AWS S3", "Velero", "Restic"]
  },
  {
    id: "alerting",
    title: "Alerting System",
    description: "Intelligent alerting and incident response",
    icon: MonitorSpeaker,
    position: { top: "80%", left: "45%" },
    connections: [],
    tech: ["PagerDuty", "Slack", "Webhook"]
  }
]

const infrastructureStats = [
  { label: "Multi-Cloud Regions", value: "6", description: "AWS, GCP, Azure regions" },
  { label: "Kubernetes Nodes", value: "12", description: "Auto-scaling worker nodes" },
  { label: "Monitored Services", value: "25+", description: "Applications and services" },
  { label: "Average Response", value: "<50ms", description: "Global response time" }
]

export function ArchitectureSection() {
  return (
    <section id="architecture" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Infrastructure Architecture</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A high-level overview of my multi-cloud infrastructure setup with emphasis on scalability, 
            reliability, and cost optimization.
          </p>
        </motion.div>

        {/* Interactive Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="p-8 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
            <div className="relative h-96 md:h-[500px] overflow-hidden">
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                {architectureComponents.map((component) =>
                  component.connections.map((connectionId) => {
                    const target = architectureComponents.find(c => c.id === connectionId);
                    if (!target) return null;
                    
                    return (
                      <motion.line
                        key={`${component.id}-${connectionId}`}
                        x1={`${parseFloat(component.position.left) + 5}%`}
                        y1={`${parseFloat(component.position.top) + 5}%`}
                        x2={`${parseFloat(target.position.left) + 5}%`}
                        y2={`${parseFloat(target.position.top) + 5}%`}
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        strokeOpacity="0.3"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true }}
                      />
                    );
                  })
                )}
              </svg>

              {/* Architecture Components */}
              {architectureComponents.map((component, index) => (
                <motion.div
                  key={component.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{ 
                    top: component.position.top, 
                    left: component.position.left,
                    zIndex: 10
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="relative">
                    <div className="w-20 h-20 bg-background border-2 border-primary/20 rounded-full flex items-center justify-center shadow-lg group-hover:border-primary/50 transition-colors">
                      <component.icon className="h-8 w-8 text-primary" />
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-popover border rounded-lg shadow-lg p-3 text-sm min-w-48">
                        <h4 className="font-semibold mb-1">{component.title}</h4>
                        <p className="text-muted-foreground text-xs mb-2">{component.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {component.tech.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Data Flow Animation */}
              <motion.div
                className="absolute w-2 h-2 bg-primary rounded-full"
                animate={{
                  left: ["10%", "45%", "80%"],
                  top: ["15%", "15%", "15%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear"
                }}
                style={{ zIndex: 20 }}
              />
            </div>
          </Card>
        </motion.div>

        {/* Infrastructure Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {infrastructureStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium mb-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.description}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Architecture Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-primary" />
                Multi-Cloud Strategy
              </CardTitle>
              <CardDescription>
                Leveraging multiple cloud providers for maximum reliability and cost optimization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  Primary: AWS for compute and storage
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  Secondary: GCP for data analytics
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  CDN: Cloudflare for global edge delivery
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  Backup: Azure for disaster recovery
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Security & Compliance
              </CardTitle>
              <CardDescription>
                Enterprise-grade security measures and compliance standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  Zero-trust network architecture
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  End-to-end encryption in transit and at rest
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  Automated security scanning and compliance checks
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  Regular penetration testing and audits
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" className="group">
            <ExternalLink className="mr-2 h-4 w-4 group-hover:rotate-45 transition-transform" />
            View Live Infrastructure
          </Button>
        </motion.div>
      </div>
    </section>
  )
}