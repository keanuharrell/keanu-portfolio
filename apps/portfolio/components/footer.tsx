"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Heart, 
  ExternalLink,
  MapPin,
  Clock
} from "lucide-react"

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/keanuharrell",
    label: "GitHub"
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/keanuharrell",
    label: "LinkedIn"
  },
  {
    icon: Twitter,
    href: "https://twitter.com/keanuharrell",
    label: "Twitter"
  },
  {
    icon: Mail,
    href: "mailto:keanu@example.com",
    label: "Email"
  }
]

const quickLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" }
]

const services = [
  "Infrastructure Design",
  "Cloud Migration",
  "DevOps Consulting",
  "iOS Development",
  "Monitoring Setup",
  "Team Training"
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-muted/30 border-t border-border/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand & Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Keanu Harrell
              </div>
              <Badge variant="secondary" className="text-xs">
                Available
              </Badge>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              DevOps Engineer & iOS Developer specializing in scalable cloud infrastructure, 
              automation, and native mobile applications. Based in Paris, working globally.
            </p>
            
            {/* Location & Availability */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Paris, France
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                CET (UTC+1)
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg bg-background hover:bg-muted transition-colors"
                >
                  <social.icon className="h-4 w-4" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-1"
                >
                  Resume
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-muted-foreground text-sm">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-border/50 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© {currentYear} Keanu Harrell. Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>using Next.js & Shadcn/ui</span>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => scrollToSection("#contact")}
                className="group"
              >
                Let&apos;s work together
                <ExternalLink className="ml-2 h-3 w-3 group-hover:rotate-45 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}