"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Terminal, Play, Pause, RotateCcw, Info, Zap } from "lucide-react"

interface Command {
  command: string
  description: string
  output: string[]
  category: 'aws' | 'kubernetes' | 'docker' | 'monitoring' | 'terraform'
}

const availableCommands: Command[] = [
  {
    command: "aws lambda list-functions",
    description: "List all Lambda functions",
    category: "aws",
    output: [
      "Functions:",
      "├── portfolio-api           Runtime: nodejs18.x  Size: 2.1MB",
      "├── image-processor         Runtime: python3.9   Size: 45MB", 
      "├── analytics-collector     Runtime: nodejs18.x  Size: 1.8MB",
      "└── auth-service           Runtime: nodejs18.x  Size: 3.2MB",
      "",
      "Total: 4 functions | Combined size: 52.1MB"
    ]
  },
  {
    command: "aws cloudwatch get-metric-statistics",
    description: "Get Lambda invocation metrics",
    category: "aws",
    output: [
      "Metric: Invocations | Period: 1h",
      "┌─────────────────────┬──────────────┬─────────────┐",
      "│ Function            │ Invocations  │ Avg Duration│",
      "├─────────────────────┼──────────────┼─────────────┤",
      "│ portfolio-api       │ 847          │ 89ms        │",
      "│ image-processor     │ 23           │ 1,245ms     │",
      "│ analytics-collector │ 156          │ 203ms       │",
      "│ auth-service        │ 312          │ 156ms       │",
      "└─────────────────────┴──────────────┴─────────────┘"
    ]
  },
  {
    command: "kubectl get pods -n production",
    description: "List Kubernetes pods in production",
    category: "kubernetes",
    output: [
      "NAME                                READY   STATUS    RESTARTS   AGE",
      "portfolio-api-6b8f9d4c5-x7h2j      1/1     Running   0          12d",
      "portfolio-api-6b8f9d4c5-m9k4n      1/1     Running   0          12d",
      "redis-master-0                     1/1     Running   0          45d",
      "monitoring-grafana-7f8c9b-q5w3e    1/1     Running   0          8d",
      "prometheus-server-5d6c8f-r2t7y     1/1     Running   0          8d"
    ]
  },
  {
    command: "docker ps --format table",
    description: "Show running Docker containers",
    category: "docker",
    output: [
      "CONTAINER ID   IMAGE                    STATUS       PORTS                    NAMES",
      "a1b2c3d4e5f6   portfolio:latest         Up 2 hours   0.0.0.0:3000->3000/tcp   portfolio-web",
      "f6e5d4c3b2a1   redis:7-alpine          Up 12 days   0.0.0.0:6379->6379/tcp   redis-cache",
      "9h8g7f6e5d4c   postgres:15             Up 12 days   5432/tcp                 postgres-db",
      "c3b2a1f6e5d4   grafana/grafana:latest  Up 8 days    0.0.0.0:3001->3000/tcp   monitoring"
    ]
  },
  {
    command: "terraform plan",
    description: "Show Terraform deployment plan",
    category: "terraform",
    output: [
      "Terraform will perform the following actions:",
      "",
      "  # aws_lambda_function.portfolio_api will be updated in-place",
      "  ~ resource \"aws_lambda_function\" \"portfolio_api\" {",
      "      ~ last_modified      = \"2024-06-28T10:15:30.000+0000\" -> (known after apply)",
      "      ~ source_code_hash   = \"abc123...\" -> \"def456...\"",
      "        # (12 unchanged attributes hidden)",
      "    }",
      "",
      "Plan: 0 to add, 1 to change, 0 to destroy.",
      "",
      "Changes to Outputs:",
      "  ~ api_endpoint = \"https://api.old.com\" -> \"https://api.new.com\""
    ]
  },
  {
    command: "curl -s localhost:3000/health | jq",
    description: "Check application health status",
    category: "monitoring",
    output: [
      "{",
      "  \"status\": \"healthy\",", 
      "  \"timestamp\": \"2024-06-30T14:25:30Z\",",
      "  \"checks\": {",
      "    \"database\": \"ok\",",
      "    \"redis\": \"ok\",",
      "    \"external_apis\": \"ok\"",
      "  },",
      "  \"metrics\": {",
      "    \"uptime\": \"12d 4h 30m\",",
      "    \"memory_usage\": \"45%\",",
      "    \"response_time_avg\": \"89ms\"",
      "  }",
      "}"
    ]
  },
  {
    command: "htop",
    description: "Show system resource usage",
    category: "monitoring",
    output: [
      "  1  [||||||||||||||||||||||||||||||||||||||||60.0%]",
      "  2  [|||||||||||||||||||||||||||||||||45.2%]",
      "  3  [|||||||||||||||||||||||||||||||||||||||||||65.8%]",
      "  4  [||||||||||||||||||||||||||||38.9%]",
      "Mem[|||||||||||||||||||||||||||||||||||2.1G/4.0G]",
      "Swp[|                              45.2M/2.0G]",
      "",
      "  PID USER      PRI  NI  VIRT   RES   SHR S CPU% MEM%   TIME+  Command",
      "12847 app        20   0  674M  156M  12.1M S 12.3  3.9  4:23.45 node portfolio",
      "  891 redis      20   0   64M   8.2M  4.1M S  2.1  0.2  1:45.23 redis-server",
      " 1205 postgres   20   0  245M  42.1M  8.8M S  1.8  1.1  2:15.67 postgres"
    ]
  }
]

const categoryColors = {
  aws: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  kubernetes: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  docker: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  monitoring: 'bg-green-500/10 text-green-400 border-green-500/20',
  terraform: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
}

const helpOutput = [
  "Available commands:",
  "├── aws lambda list-functions     - List Lambda functions",
  "├── aws cloudwatch get-metrics    - Get CloudWatch metrics", 
  "├── kubectl get pods              - List Kubernetes pods",
  "├── docker ps                     - Show running containers",
  "├── terraform plan                - Show Terraform plan",
  "├── curl localhost:3000/health    - Check app health",
  "├── htop                         - Show system resources",
  "├── clear                        - Clear terminal",
  "└── help                         - Show this help",
  "",
  "Type any command to see simulated output!"
]

interface TerminalLine {
  id: number
  type: 'command' | 'output' | 'prompt'
  content: string
  timestamp: Date
}

export function InteractiveTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 0,
      type: 'output',
      content: "Welcome to Portfolio DevOps Terminal v2.1.0",
      timestamp: new Date()
    },
    {
      id: 1, 
      type: 'output',
      content: "Type 'help' for available commands",
      timestamp: new Date()
    }
  ])
  const [currentInput, setCurrentInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [lineIdCounter, setLineIdCounter] = useState(2)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  const addLine = (type: TerminalLine['type'], content: string) => {
    setLines(prev => [...prev, {
      id: lineIdCounter,
      type,
      content,
      timestamp: new Date()
    }])
    setLineIdCounter(prev => prev + 1)
  }

  const simulateTyping = async (outputLines: string[]) => {
    setIsTyping(true)
    
    for (const line of outputLines) {
      await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100))
      addLine('output', line)
    }
    
    setIsTyping(false)
  }

  const executeCommand = async (command: string) => {
    const trimmedCommand = command.trim().toLowerCase()
    
    // Add command to terminal
    addLine('command', `$ ${command}`)
    
    if (trimmedCommand === 'help') {
      await simulateTyping(helpOutput)
      return
    }
    
    if (trimmedCommand === 'clear') {
      setLines([])
      setLineIdCounter(0)
      return
    }
    
    // Find matching command (partial match)
    const matchingCommand = availableCommands.find(cmd => 
      trimmedCommand.includes(cmd.command.toLowerCase()) ||
      cmd.command.toLowerCase().includes(trimmedCommand)
    )
    
    if (matchingCommand) {
      await simulateTyping(matchingCommand.output)
    } else {
      await simulateTyping([
        `Command not found: ${command}`,
        "Type 'help' to see available commands"
      ])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentInput.trim() || isTyping) return
    
    await executeCommand(currentInput)
    setCurrentInput("")
  }

  const handleQuickCommand = async (command: Command) => {
    if (isTyping) return
    await executeCommand(command.command)
  }

  const clearTerminal = () => {
    setLines([])
    setLineIdCounter(0)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-slate-900/90 to-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Interactive DevOps Terminal</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore my infrastructure with realistic DevOps commands. Try running AWS CLI, Kubernetes, Docker, and monitoring commands.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <Card className="bg-black border-gray-700">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Terminal className="h-5 w-5" />
                    portfolio@devops-terminal
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <Button size="sm" variant="outline" onClick={clearTerminal}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div 
                  ref={terminalRef}
                  className="h-96 lg:h-[500px] bg-black rounded-lg p-4 font-mono text-sm overflow-y-auto"
                >
                  <AnimatePresence>
                    {lines.map((line) => (
                      <motion.div
                        key={line.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mb-1 ${
                          line.type === 'command' 
                            ? 'text-green-400' 
                            : line.type === 'output'
                            ? 'text-gray-300'
                            : 'text-blue-400'
                        }`}
                      >
                        {line.content}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {/* Current input line */}
                  <form onSubmit={handleSubmit} className="flex items-center">
                    <span className="text-green-400 mr-2">$ </span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      className="flex-1 bg-transparent text-white outline-none"
                      placeholder={isTyping ? "Processing..." : "Type a command..."}
                      disabled={isTyping}
                      autoFocus
                    />
                    {isTyping && (
                      <span className="text-yellow-400 animate-pulse ml-2">⚡</span>
                    )}
                  </form>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Commands */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Commands
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {availableCommands.map((cmd, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleQuickCommand(cmd)}
                        disabled={isTyping}
                        className="w-full justify-start text-left h-auto p-3 hover:bg-gray-800"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between w-full">
                            <code className="text-xs text-green-400 font-mono">
                              {cmd.command.slice(0, 20)}...
                            </code>
                            <Badge variant="outline" className={categoryColors[cmd.category]}>
                              {cmd.category}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-400 text-left">
                            {cmd.description}
                          </p>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-6 p-3 bg-blue-950/20 border border-blue-800/30 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-400 mb-2">Tips:</h4>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Type partial commands for auto-completion</li>
                    <li>• Use 'help' to see all commands</li>
                    <li>• 'clear' to clear the terminal</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}