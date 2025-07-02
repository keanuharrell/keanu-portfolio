"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Mail, 
  MapPin, 
  Phone, 
  Clock, 
  Send, 
  Github, 
  Linkedin, 
  Twitter,
  MessageSquare
} from "lucide-react"
import { useState } from "react"

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    details: "keanuharrell@icloud.com",
    href: "mailto:keanuharrell@icloud.com"
  },
  {
    icon: Phone,
    title: "Phone (FR)",
    details: "+33 6 95 09 83 51",
    href: "tel:+33695098351"
  },
  {
    icon: Phone,
    title: "Phone (PL)",
    details: "+48 572 263 316",
    href: "tel:+48572263316"
  },
  {
    icon: MapPin,
    title: "Location",
    details: "Nancy, France | Warszawa, Poland",
    href: "https://maps.google.com/?q=Nancy,France"
  },
  {
    icon: Clock,
    title: "Timezone",
    details: "CET (UTC+1)",
    href: null
  }
]

const socialLinks = [
  {
    icon: Github,
    name: "GitHub",
    href: "https://github.com/keanuharrell",
    username: "@keanuharrell"
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    href: "https://linkedin.com/in/keanuharrell",
    username: "Keanu Harrell"
  },
  {
    icon: Twitter,
    name: "Twitter",
    href: "https://twitter.com/keanuharrell",
    username: "@keanuharrell"
  },
  {
    icon: MessageSquare,
    name: "Discord",
    href: "https://discord.com/users/keanuharrell",
    username: "keanuharrell"
  }
]

const projectTypes = [
  "Full Stack Development",
  "Cloud Architecture",
  "DevOps & CI/CD",
  "Data Platform Design",
  "API Development",
  "Team Training",
  "Other"
]

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
    timeline: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log("Form submitted:", formData)
    setIsSubmitting(false)
    
    // Reset form or show success message
    setFormData({
      name: "",
      email: "",
      company: "",
      projectType: "",
      budget: "",
      message: "",
      timeline: ""
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let&apos;s Work Together</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to build your next application or modernize your cloud infrastructure? Let&apos;s discuss how I can help bring your project to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Start a Project</CardTitle>
                <CardDescription>
                  Tell me about your project and I&apos;ll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projectType">Project Type</Label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full p-2 border border-input bg-background rounded-md"
                    >
                      <option value="">Select project type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range</Label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full p-2 border border-input bg-background rounded-md"
                      >
                        <option value="">Select budget</option>
                        <option value="<5k">Less than €5,000</option>
                        <option value="5k-15k">€5,000 - €15,000</option>
                        <option value="15k-50k">€15,000 - €50,000</option>
                        <option value="50k+">€50,000+</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeline">Timeline</Label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full p-2 border border-input bg-background rounded-md"
                      >
                        <option value="">Select timeline</option>
                        <option value="asap">ASAP</option>
                        <option value="1-2months">1-2 months</option>
                        <option value="3-6months">3-6 months</option>
                        <option value="6months+">6+ months</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project, goals, and any specific requirements..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full group" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info & Social */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Feel free to reach out through any of these channels.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-primary/10">
                        <info.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{info.title}</div>
                        {info.href ? (
                          <a 
                            href={info.href} 
                            className="text-muted-foreground hover:text-primary transition-colors"
                            target={info.href.startsWith('http') ? '_blank' : undefined}
                            rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          >
                            {info.details}
                          </a>
                        ) : (
                          <div className="text-muted-foreground">{info.details}</div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle>Connect Online</CardTitle>
                <CardDescription>
                  Follow my work and connect on social platforms.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors group"
                    >
                      <social.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="font-medium text-sm">{social.name}</div>
                        <div className="text-xs text-muted-foreground">{social.username}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle>Current Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Available for new projects</span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>✅ Full-stack development</p>
                  <p>✅ Cloud & platform engineering</p>
                  <p>✅ DevOps consulting & training</p>
                  <p>⏰ Long-term partnerships (Q2 2025)</p>
                </div>
                <div className="mt-4">
                  <Badge variant="secondary" className="text-xs">
                    Response time: &lt; 24 hours
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}