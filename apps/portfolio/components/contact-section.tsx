"use client"

import { motion } from "framer-motion"
import { Mail, Github, Linkedin, MapPin } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-32 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="space-y-16"
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-semibold">Contact</h2>
            <p className="text-lg text-muted-foreground">
              Let's work together on your next project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <a 
                href="mailto:keanuharrell@icloud.com"
                className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <Mail className="h-5 w-5" />
                <span className="group-hover:underline">keanuharrell@icloud.com</span>
              </a>

              <a 
                href="https://github.com/keanuharrell"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <Github className="h-5 w-5" />
                <span className="group-hover:underline">github.com/keanuharrell</span>
              </a>

              <a 
                href="https://linkedin.com/in/keanu-harrell"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <Linkedin className="h-5 w-5" />
                <span className="group-hover:underline">linkedin.com/in/keanu-harrell</span>
              </a>

              <div className="flex items-center gap-4 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span>Warsaw, Poland / France</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium">Available for freelance work</span>
              </div>
              <p className="text-muted-foreground">
                I'm currently taking on new projects and would love to hear about your ideas. 
                Feel free to reach out if you'd like to work together.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}