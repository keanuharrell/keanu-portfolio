"use client"

import { motion } from "framer-motion"

export function AboutSection() {
  return (
    <section id="about" className="py-32">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold">About</h2>
          
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              I'm a Full Stack Engineer with over 3 years of experience building scalable web applications 
              and cloud infrastructure. I specialize in modern JavaScript frameworks, cloud architecture, 
              and creating exceptional user experiences.
            </p>
            
            <p>
              My expertise spans from frontend development with React and TypeScript to backend systems 
              with Node.js and Go, deployed on AWS infrastructure. I'm passionate about clean code, 
              performance optimization, and continuous learning.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
            <div>
              <div className="text-2xl font-semibold">3+</div>
              <div className="text-sm text-muted-foreground mt-1">Years Experience</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">50+</div>
              <div className="text-sm text-muted-foreground mt-1">Projects Completed</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">10+</div>
              <div className="text-sm text-muted-foreground mt-1">Technologies</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">5⭐</div>
              <div className="text-sm text-muted-foreground mt-1">Client Reviews</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}