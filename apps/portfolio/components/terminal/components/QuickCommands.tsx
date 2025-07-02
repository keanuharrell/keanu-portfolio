"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, User } from "lucide-react"

interface Command {
  command: string
  description: string
  category: 'system' | 'portfolio' | 'social' | 'navigation'
}

interface QuickCommandsProps {
  commands: Command[]
  onCommandClick: (command: Command) => void
  isTyping: boolean
}

const categoryColors = {
  system: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  portfolio: 'bg-green-500/10 text-green-400 border-green-500/20',
  social: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  navigation: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
}

export function QuickCommands({ commands, onCommandClick, isTyping }: QuickCommandsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="space-y-4 flex flex-col min-h-0 overflow-y-auto"
    >
      <Card className="bg-gray-900/80 border-green-500/30 flex-shrink-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-green-400 flex items-center gap-2 font-mono text-sm">
            <Code className="h-4 w-4" />
            Quick Commands
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {commands.map((cmd, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCommandClick(cmd)}
                disabled={isTyping}
                className="w-full justify-start text-left h-auto p-2 hover:bg-green-500/10 font-mono"
              >
                <div className="space-y-1 w-full">
                  <div className="flex items-center justify-between">
                    <code className="text-xs text-green-400">
                      {cmd.command}
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
        </CardContent>
      </Card>

      <Card className="bg-gray-900/80 border-blue-500/30 flex-shrink-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-blue-400 flex items-center gap-2 font-mono text-sm">
            <User className="h-4 w-4" />
            System Info
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs font-mono">
          <div className="text-gray-300">
            <span className="text-blue-400">OS:</span> Portfolio Linux
          </div>
          <div className="text-gray-300">
            <span className="text-blue-400">Shell:</span> /bin/bash
          </div>
          <div className="text-gray-300">
            <span className="text-blue-400">Uptime:</span> 5+ years
          </div>
          <div className="text-gray-300">
            <span className="text-blue-400">Memory:</span> Unlimited ideas
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 