"use client"

import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TypewriterEffect } from "@/components/ui/typewriter"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  // Pre-defined particle positions to avoid hydration issues
  const particlePositions = [
    { x: 100, y: 200, duration: 15 },
    { x: 300, y: 150, duration: 20 },
    { x: 500, y: 300, duration: 12 },
    { x: 700, y: 100, duration: 18 },
    { x: 900, y: 400, duration: 14 },
    { x: 200, y: 500, duration: 16 },
    { x: 600, y: 250, duration: 22 },
    { x: 800, y: 350, duration: 13 },
    { x: 400, y: 450, duration: 17 },
    { x: 150, y: 350, duration: 19 },
    { x: 750, y: 200, duration: 21 },
    { x: 350, y: 100, duration: 11 }
  ]

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/50" />
      
      {/* Floating particles */}
      {mounted && (
        <div className="absolute inset-0">
          {particlePositions.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              initial={{
                x: particle.x,
                y: particle.y,
              }}
              animate={{
                x: particle.x + Math.sin(i) * 100,
                y: particle.y + Math.cos(i) * 100,
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Hi, I'm <span className="text-primary">Keanu</span>
          </h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8"
          >
            <TypewriterEffect
              words={[
                "Full Stack Engineer",
                "Cloud Architect", 
                "DevOps Engineer",
                "Tech Enthusiast"
              ]}
              speed={100}
              loop={true}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            I build modern web applications and scalable cloud architectures. 
            Passionate about innovative technologies and user experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button
              size="lg"
              className="px-8 py-3"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </Button>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open('https://github.com/keanuharrell', '_blank')}
              >
                <Github className="w-5 h-5" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open('https://linkedin.com/in/keanu-harrell', '_blank')}
              >
                <Linkedin className="w-5 h-5" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="animate-bounce"
          >
            <ArrowDown 
              className="w-6 h-6 text-muted-foreground mx-auto cursor-pointer hover:text-foreground transition-colors"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}