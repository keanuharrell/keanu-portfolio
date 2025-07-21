"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { 
  Workflow, 
  Palette, 
  Zap, 
  Shield, 
  TrendingUp, 
  Users,
  Code,
  Play,
  MonitorSpeaker
} from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Drag & Drop Builder",
    description: "Visual interface to create complex AI workflows without writing code",
    color: "bg-blue-500",
    delay: 0.1
  },
  {
    icon: Workflow,
    title: "Agent Orchestration",
    description: "Connect multiple AI agents to work together seamlessly",
    color: "bg-green-500",
    delay: 0.2
  },
  {
    icon: Zap,
    title: "One-Click Deployment",
    description: "Deploy your AI crews to the cloud with a single click",
    color: "bg-yellow-500",
    delay: 0.3
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption and compliance for sensitive workflows",
    color: "bg-red-500",
    delay: 0.4
  },
  {
    icon: TrendingUp,
    title: "Real-time Analytics",
    description: "Monitor performance and optimize your AI workflows",
    color: "bg-purple-500",
    delay: 0.5
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share and collaborate on AI workflows with your team",
    color: "bg-cyan-500",
    delay: 0.6
  }
];

const codeExample = `from orchestr import Crew, Agent, Task

# Define your AI agents
researcher = Agent(
    role="Web Researcher",
    tools=[web_search, scraper]
)

writer = Agent(
    role="Content Writer", 
    tools=[openai_gpt4, grammarly]
)

# Create tasks
research_task = Task(
    description="Research AI trends",
    agent=researcher
)

writing_task = Task(
    description="Write blog post",
    agent=writer,
    context=[research_task]
)

# Create and run crew
crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, writing_task]
)

result = crew.kickoff()`;

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const codeRef = useRef(null);
  const codeInView = useInView(codeRef, { once: true });

  return (
    <section className="py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Everything you need to build
            <br />
            <span className="text-gradient">AI-powered workflows</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From visual design to deployment, Orchestr.ai provides all the tools 
            you need to create sophisticated AI agent workflows.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ 
                duration: 0.6, 
                delay: feature.delay,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 group border-2 hover:border-primary/20">
                <div className="flex items-start gap-4">
                  <motion.div
                    className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Code Example Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold">
              Visual Builder
              <br />
              <span className="text-gradient">Generates Code</span>
            </h3>
            
            <p className="text-lg text-muted-foreground">
              Design your workflow visually, and Orchestr.ai automatically 
              generates production-ready code. Export to CrewAI, LangChain, 
              or custom formats.
            </p>

            <div className="flex items-center gap-4">
              <motion.div
                className="flex items-center gap-2 text-sm text-muted-foreground"
                whileHover={{ scale: 1.05 }}
              >
                <Play className="w-4 h-4 text-green-500" />
                <span>Auto-generated</span>
              </motion.div>
              
              <motion.div
                className="flex items-center gap-2 text-sm text-muted-foreground"
                whileHover={{ scale: 1.05 }}
              >
                <Code className="w-4 h-4 text-blue-500" />
                <span>Production-ready</span>
              </motion.div>
              
              <motion.div
                className="flex items-center gap-2 text-sm text-muted-foreground"
                whileHover={{ scale: 1.05 }}
              >
                <MonitorSpeaker className="w-4 h-4 text-purple-500" />
                <span>Deployable</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            ref={codeRef}
            initial={{ opacity: 0, x: 50 }}
            animate={codeInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Code editor mockup */}
            <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-2 p-4 bg-gray-800 border-b border-gray-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <span className="text-gray-400 text-sm ml-4">generated_crew.py</span>
              </div>
              
              {/* Code content */}
              <div className="p-4 font-mono text-sm text-gray-300">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={codeInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.3, duration: 2 }}
                >
                  <pre className="whitespace-pre-wrap">
                    <code className="text-gray-300">{codeExample}</code>
                  </pre>
                </motion.div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium"
              initial={{ scale: 0 }}
              animate={codeInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.8, type: "spring" }}
            >
              ✓ Generated
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}