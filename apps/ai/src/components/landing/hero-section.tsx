"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Play, 
  Workflow,
  Bot,
  Zap,
  Brain,
  GitBranch,
  Sparkles
} from "lucide-react";

const agentTypes = [
  { name: "Web Researcher", color: "text-blue-500", icon: "🔍" },
  { name: "Content Writer", color: "text-green-500", icon: "✍️" },
  { name: "Data Analyst", color: "text-purple-500", icon: "📊" },
  { name: "Code Generator", color: "text-red-500", icon: "💻" },
  { name: "Email Assistant", color: "text-cyan-500", icon: "📧" },
];

const workflowSteps = [
  "Research trending topics",
  "Generate content outline", 
  "Write engaging article",
  "Optimize for SEO",
  "Schedule publication"
];

export function HeroSection() {
  const [currentAgent, setCurrentAgent] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const agentInterval = setInterval(() => {
      setCurrentAgent(prev => (prev + 1) % agentTypes.length);
    }, 2500);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % workflowSteps.length);
    }, 1800);

    return () => {
      clearInterval(agentInterval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth || 0,
              y: Math.random() * window.innerHeight || 0,
            }}
            animate={{
              x: Math.random() * (window.innerWidth || 1200),
              y: Math.random() * (window.innerHeight || 800),
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left side - Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="mb-4 gap-2">
                <Sparkles className="w-3 h-3" />
                Now in Beta
              </Badge>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-gradient">Orchestrate</span>
              <br />
              AI Agents
              <br />
              <span className="text-muted-foreground">Visually</span>
            </motion.h1>

            <motion.p 
              className="text-xl text-muted-foreground max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Build powerful AI workflows by connecting specialized agents. 
              No code required - just drag, drop, and deploy.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button 
              size="lg" 
              className="rounded-full px-8 py-6 text-lg font-medium gap-3"
            >
              Start Building
              <ArrowRight className="w-5 h-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full px-8 py-6 text-lg font-medium gap-3"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-8 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div>
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Agent Types</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">1M+</div>
              <div className="text-sm text-muted-foreground">Workflows Run</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right side - Interactive Demo */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative"
        >
          {/* Main demo container */}
          <div className="relative bg-card border border-border rounded-2xl p-6 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Workflow className="w-5 h-5 text-primary" />
                <span className="font-medium">Content Marketing Crew</span>
              </div>
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-red-400 rounded-full" />
                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                <div className="w-3 h-3 bg-green-400 rounded-full" />
              </div>
            </div>

            {/* Animated workflow */}
            <div className="space-y-4">
              {/* Current agent display */}
              <motion.div
                className="p-4 bg-muted/50 rounded-lg border-2 border-dashed border-primary/50"
                key={currentAgent}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-xl">
                      {agentTypes[currentAgent].icon}
                    </span>
                  </div>
                  <div>
                    <div className={`font-medium ${agentTypes[currentAgent].color}`}>
                      {agentTypes[currentAgent].name}
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-muted-foreground"
                      >
                        {workflowSteps[currentStep]}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <motion.div
                    className="ml-auto"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Brain className="w-5 h-5 text-primary" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Connection lines */}
              <div className="flex items-center justify-center">
                <motion.div
                  className="w-px h-8 bg-gradient-to-b from-primary to-transparent"
                  animate={{ scaleY: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>

              {/* Output preview */}
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-500">Output Generated</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  ✓ SEO-optimized blog post created
                  <br />
                  ✓ Social media content generated  
                  <br />
                  ✓ Email campaign drafted
                </div>
              </div>
            </div>
          </div>

          {/* Floating icons */}
          <motion.div
            className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Bot className="w-6 h-6 text-white" />
          </motion.div>

          <motion.div
            className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            <GitBranch className="w-6 h-6 text-white" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}