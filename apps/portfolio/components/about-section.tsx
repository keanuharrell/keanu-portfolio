"use client"

import { motion } from "framer-motion"
import { MinimalCard } from "@/components/ui/minimal-card"
import { Code, Cloud, Database, Users } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate developer with solid experience in building modern web applications 
            and scalable cloud architectures.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <MinimalCard>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                  I'm a full-stack developer with 3+ years of experience in designing 
                  and building cloud-native solutions. My expertise spans the entire 
                  development lifecycle, from modern frontend to microservices architectures.
                </p>
                
                <p className="text-lg leading-relaxed">
                  Passionate about technological innovation, I specialize in creating 
                  performant, scalable applications focused on user experience. 
                  I enjoy solving complex problems and transforming ideas into concrete solutions.
                </p>
              </div>
            </MinimalCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid gap-4"
          >
            <MinimalCard className="group">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Frontend</h4>
                  <p className="text-sm text-muted-foreground">React, TypeScript, Next.js</p>
                </div>
              </div>
            </MinimalCard>

            <MinimalCard className="group">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Backend</h4>
                  <p className="text-sm text-muted-foreground">Node.js, Golang, Python</p>
                </div>
              </div>
            </MinimalCard>

            <MinimalCard className="group">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Cloud & DevOps</h4>
                  <p className="text-sm text-muted-foreground">AWS, Docker, Kubernetes</p>
                </div>
              </div>
            </MinimalCard>

            <MinimalCard className="group">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Collaboration</h4>
                  <p className="text-sm text-muted-foreground">Agile, Leadership, Mentoring</p>
                </div>
              </div>
            </MinimalCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}