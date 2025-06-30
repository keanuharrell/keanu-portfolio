"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cloud, Smartphone, BarChart3, Zap } from "lucide-react"

const expertise = [
  {
    icon: Cloud,
    title: "Multi-Cloud Architecture",
    description: "Designing and implementing scalable infrastructure across AWS, GCP, and Azure with focus on cost optimization and reliability.",
    skills: ["AWS", "GCP", "Azure", "Terraform", "CloudFormation"]
  },
  {
    icon: Zap,
    title: "DevOps & Automation",
    description: "Building CI/CD pipelines, Infrastructure as Code, and automation tools to streamline development workflows.",
    skills: ["Kubernetes", "Docker", "Jenkins", "GitHub Actions", "Ansible"]
  },
  {
    icon: Smartphone,
    title: "iOS Development",
    description: "Creating native iOS applications with SwiftUI and UIKit, focusing on performance and user experience.",
    skills: ["Swift", "SwiftUI", "UIKit", "Xcode", "TestFlight"]
  },
  {
    icon: BarChart3,
    title: "Monitoring & Observability",
    description: "Implementing comprehensive monitoring solutions with real-time dashboards and alerting systems.",
    skills: ["Grafana", "Prometheus", "ELK Stack", "DataDog", "New Relic"]
  }
]

const stats = [
  { label: "Infrastructure Uptime", value: "99.9%" },
  { label: "Deployments", value: "150+" },
  { label: "Cost Optimized", value: "<50€/month" },
  { label: "Response Time", value: "<100ms" }
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate about building robust, scalable systems and creating innovative mobile experiences. 
            I combine DevOps expertise with iOS development to deliver end-to-end solutions.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Expertise Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {expertise.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Personal touch */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
              <p className="text-muted-foreground leading-relaxed">
                With a passion for both infrastructure automation and mobile development, I&apos;ve spent years 
                mastering the art of building reliable, scalable systems while creating intuitive user experiences. 
                My approach combines the precision of DevOps practices with the creativity of iOS development, 
                always focusing on efficiency, security, and user satisfaction.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}