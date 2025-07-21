"use client"

import { motion } from "framer-motion"
import { ArrowDown, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
      
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight">
            Keanu Harrell
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
            Full Stack Engineer specializing in cloud architecture and scalable systems
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-base font-medium"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-base font-medium gap-2"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/files/keanu-harrell-cv.pdf';
                link.download = 'Keanu_Harrell_CV.pdf';
                link.click();
              }}
            >
              <Download className="w-4 h-4" />
              Download CV
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ArrowDown 
          className="w-5 h-5 text-muted-foreground/50 animate-bounce cursor-pointer"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        />
      </motion.div>
    </section>
  )
}