"use client"

import { motion } from "framer-motion"
import { Code, Cloud, Database, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function AboutSection() {
  const highlights = [
    {
      icon: Code,
      title: "Full Stack Development",
      description: "React, TypeScript, Next.js, Node.js"
    },
    {
      icon: Cloud,
      title: "Cloud Architecture",
      description: "AWS, Microservices, Serverless"
    },
    {
      icon: Database,
      title: "Data Platforms",
      description: "Scalable data pipelines and analytics"
    },
    {
      icon: Zap,
      title: "DevOps & CI/CD",
      description: "Automation and continuous deployment"
    }
  ]

  return (
    <section id="about" className="py-20 bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Me
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Passionate about technology and innovation, I design robust technical solutions 
            that combine performance, scalability, and exceptional user experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">My Journey</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                With over 3 years of experience in full-stack development and cloud engineering, 
                I've had the opportunity to work on diverse projects ranging from modern web applications 
                to complex data architectures.
              </p>
              <p>
                My specialty lies in designing cloud-native microservices and creating 
                scalable data platforms that support business growth.
              </p>
              <p>
                I enjoy solving complex problems with elegant solutions and maintaining 
                constant technological awareness to stay at the forefront of innovations.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((highlight, index) => (
              <Card key={index} className="bg-black/50 border-gray-700 hover:border-green-500/50 transition-colors">
                <CardContent className="p-6 text-center">
                  <highlight.icon className="w-8 h-8 text-green-400 mx-auto mb-4" />
                  <h4 className="text-white font-semibold mb-2">{highlight.title}</h4>
                  <p className="text-gray-400 text-sm">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-4">
              "Technology in service of innovation"
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Every line of code written aims to create value, 
              improve user experience, and contribute to project success.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}