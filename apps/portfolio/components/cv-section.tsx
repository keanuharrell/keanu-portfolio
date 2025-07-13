"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  MapPin, 
  Calendar, 
  ExternalLink,
  Code,
  GraduationCap,
  Briefcase,
  Award,
  Heart,
  Mail,
  Phone,
  Github,
  Linkedin,
  Download
} from "lucide-react"

export function CVSection() {
  const experiences = [
    {
      title: "CTO (Freelance / Part-time)",
      company: "Untitled, Grand Nancy Innovation",
      location: "Nancy, France",
      period: "Nov 2024 – Present",
      achievements: [
        "Architected and deployed AWS serverless micro-services (SST, Lambda, DynamoDB, Aurora, SQS, SES) achieving <1s P99 latency and zero-downtime releases",
        "Shipped a multi-tenant API (Hono + Lambda) integrating auth0 and Stripe billing; onboarded first enterprise customers",
        "Led a 2-engineer team: hiring, agile delivery, mentoring, and quarterly OKR planning"
      ]
    },
    {
      title: "Software Engineer Apprentice",
      company: "Orisha Healthcare",
      location: "Villers-lès-Nancy, France",
      period: "Aug 2022 – Present",
      achievements: [
        "Built a self-service analytics lakehouse (2 TB) using the Trino SQL engine with Apache Superset dashboards; reduced manual reporting time by 70%",
        "Developed React + TypeScript UI library with Storybook, increasing component reuse by 40%",
        "Introduced GitFlow and semantic versioning (PowerShell + TFS); cut release lead-time from 3 hours to 30 minutes"
      ]
    },
    {
      title: "Research Intern – Crystallography Dev.",
      company: "University of Warsaw",
      location: "Warsaw, Poland",
      period: "Jun 2024 – Oct 2024",
      achievements: [
        "Automated crystal stability verification via Python scripts, reducing manual workload by 40%",
        "Implemented initial lattice model selection and tested new lattice dynamical models",
        "Documented code and attended crystallography seminars to support ongoing research"
      ]
    }
  ]

  const projects = [
    {
      title: "CESI Eats",
      technologies: ["React", "Express", "Kubernetes", "Jenkins"],
      period: "Apr 2024",
      achievements: [
        "Implemented micro-services on Kubernetes; sustained 99.9% uptime under load tests",
        "Configured Jenkins delivering production updates in <5 minutes",
        "Instrumented Prometheus + Grafana for real-time alerting and capacity planning"
      ]
    },
    {
      title: "Stelerio",
      technologies: ["API Spigot", "Java", "Maven", "GitLab CI"],
      period: "Jun 2022 – Jul 2023",
      achievements: [
        "Maintained Minecraft plugins for 150K players; reduced crash rate 30%",
        "Automated build and deployment with GitLab CI; eliminated manual release steps",
        "Gathered community feedback and steered feature roadmap with server staff"
      ]
    }
  ]

  const education = [
    {
      degree: "Master of Computer Science",
      specialization: "Cloud & Data Engineering Track",
      institution: "CESI Engineering School",
      location: "Villers-lès-Nancy, France",
      period: "Oct 2022 – Expected Sep 2025"
    },
    {
      degree: "Associate Degree in Computer Science (DUT)",
      institution: "Nancy-Charlemagne Institute of Technology",
      location: "Nancy, France",
      period: "Sep 2020 – Jul 2022"
    }
  ]

  const skills = {
    languages: ["TypeScript", "JavaScript", "Golang", "C#", "SQL (PostgreSQL)", "NoSQL (MongoDB)", "VB"],
    frameworks: ["React", "Vue.js", "Express", "Storybook", "Node.js", ".NET", "ASP.NET", "Tailwind CSS", "Shadcn UI"],
    cloud: ["AWS (Lambda, DynamoDB, Aurora, SQS, SES, ECS)", "Docker", "Kubernetes", "Git", "GitOps", "Terraform", "Kustomize", "Helm", "Jenkins", "Grafana", "Prometheus", "IaC", "ArgoCD"]
  }

  const hobbies = ["Guitar", "Swimming", "Tennis", "Basketball", "Trained first-aid responder"]

  return (
    <section id="cv" className="py-20 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Curriculum <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Vitae</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            French-American Full Stack Engineer specialized in cloud-native architectures and scalable data platforms
          </p>
        </motion.div>

        {/* Header with Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-white mb-2">Keanu Harrell</h1>
                <p className="text-xl text-gray-300 mb-4">Full Stack Engineer | Cloud & Platform Engineer</p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    French-American
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    +33 6 95 09 83 51
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    keanuharrell@icloud.com
                  </div>
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    linkedin.com/in/keanuharrell
                  </div>
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    github.com/keanuharrell
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
                <p className="text-gray-300 text-center">
                  <strong>3+ years</strong> designing and shipping cloud-native microservices on AWS and scalable data platforms. 
                  Expert in React/TypeScript, Golang/C#, CI/CD and observability (Prometheus/Grafana).
                </p>
              </div>

              <div className="flex justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Briefcase className="w-5 h-5 mr-2 text-blue-400" />
                    Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {experiences.map((exp, index) => (
                    <div key={index} className="border-l-2 border-blue-500/30 pl-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-white">{exp.title}</h3>
                          <p className="text-blue-400 font-medium">{exp.company}</p>
                          <p className="text-sm text-gray-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {exp.location}
                          </p>
                        </div>
                        <Badge variant="outline" className="border-gray-600 text-gray-400">
                          {exp.period}
                        </Badge>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-300">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <GraduationCap className="w-5 h-5 mr-2 text-green-400" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-green-500/30 pl-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-white">{edu.degree}</h3>
                          {edu.specialization && (
                            <p className="text-green-400 text-sm">{edu.specialization}</p>
                          )}
                          <p className="text-gray-300">{edu.institution}</p>
                          <p className="text-sm text-gray-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {edu.location}
                          </p>
                        </div>
                        <Badge variant="outline" className="border-gray-600 text-gray-400">
                          {edu.period}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Projects */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Code className="w-5 h-5 mr-2 text-purple-400" />
                    Projects
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {projects.map((project, index) => (
                    <div key={index} className="border-l-2 border-purple-500/30 pl-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-white">{project.title}</h3>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {project.technologies.map((tech, i) => (
                              <Badge key={i} variant="secondary" className="text-xs bg-purple-500/20 text-purple-300">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Badge variant="outline" className="border-gray-600 text-gray-400">
                          {project.period}
                        </Badge>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-300">
                        {project.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Technical Skills */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Award className="w-5 h-5 mr-2 text-orange-400" />
                    Technical Skills
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.languages.map((skill, i) => (
                        <Badge key={i} variant="outline" className="border-orange-500/30 text-orange-300">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">Frameworks & Libraries</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.frameworks.map((skill, i) => (
                        <Badge key={i} variant="outline" className="border-orange-500/30 text-orange-300">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">Cloud & DevOps</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.cloud.map((skill, i) => (
                        <Badge key={i} variant="outline" className="border-orange-500/30 text-orange-300">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Hobbies & Interests */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Heart className="w-5 h-5 mr-2 text-pink-400" />
                    Hobbies & Interests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {hobbies.map((hobby, i) => (
                      <Badge key={i} variant="outline" className="border-pink-500/30 text-pink-300">
                        {hobby}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}