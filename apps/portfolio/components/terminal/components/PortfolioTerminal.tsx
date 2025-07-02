"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Terminal } from "lucide-react"
import { useTerminal } from '../hooks/useTerminal'
import { TerminalInput } from './TerminalInput'
import { TerminalOutput } from './TerminalOutput'
import { QuickCommands } from './QuickCommands'
import { TerminalErrorBoundary } from './TerminalErrorBoundary'
import { allCommands } from '../commands/index'
import { useState, useEffect } from 'react'
import { terminalStorage, TerminalPreferences } from '../core/terminalStorage'

export function PortfolioTerminal() {
  const {
    lines,
    currentInput,
    setCurrentInput,
    isTyping,
    commandHistory,
    historyIndex,
    setHistoryIndex,
    terminalRef,
    executeCommand,
    handleTabCompletion
  } = useTerminal()

  const [preferences, setPreferences] = useState<TerminalPreferences>(terminalStorage.getPreferences())

  // Update preferences when they change
  useEffect(() => {
    const handleStorageChange = () => {
      setPreferences(terminalStorage.getPreferences())
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Generate CSS variables based on preferences
  const getCSSVariables = () => {
    const fontSize = {
      small: '12px',
      medium: '14px',
      large: '16px'
    }[preferences.fontSize]

    const animationDuration = {
      slow: '150ms',
      normal: '100ms',
      fast: '50ms'
    }[preferences.animationSpeed]

    return {
      '--terminal-font-size': fontSize,
      '--terminal-animation-duration': animationDuration,
    } as React.CSSProperties
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentInput.trim() || isTyping) return
    
    
    await executeCommand(currentInput)
    setCurrentInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {

    if (e.key === 'Tab') {
      e.preventDefault()
      if (preferences.autoComplete) {
        handleTabCompletion()
      }
      return
    }
    
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCurrentInput("")
      }
    }
  }

  const handleQuickCommand = async (command: { command: string }) => {
    if (isTyping) return
    setCurrentInput(command.command)
    await executeCommand(command.command)
    setCurrentInput("")
  }

  // Convert allCommands to quick commands format
  const quickCommands = Object.values(allCommands)
    .filter(cmd => ['portfolio', 'navigation'].includes(cmd.category))
    .slice(0, 8)
    .map(cmd => ({
      command: cmd.name,
      description: cmd.description,
      category: cmd.category as 'system' | 'portfolio' | 'social' | 'navigation'
    }))

  return (
    <TerminalErrorBoundary>
      <section 
        className="fixed inset-0 bg-black text-green-400 font-mono overflow-hidden"
        style={getCSSVariables()}
      >
        <div className="h-full w-full px-4 py-4 flex flex-col">
          <div className="grid lg:grid-cols-4 gap-6 flex-1 min-h-0">
            {/* Main Terminal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3 flex flex-col min-h-0"
            >
              <Card className="bg-gray-900 border-green-500/30 flex-1 flex flex-col min-h-0">
                <CardHeader className="pb-3 border-b border-green-500/20 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <CardTitle className="text-green-400 flex items-center gap-2 font-mono">
                      <Terminal className="h-5 w-5" />
                      keanu@portfolio:~$
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden min-h-0">
                  <div 
                    ref={terminalRef}
                    className="h-full max-h-full bg-black p-4 font-mono overflow-y-auto overflow-x-hidden terminal-scrollbar"
                    style={{
                      fontSize: `var(--terminal-font-size, 14px)`
                    }}
                    onClick={(e) => {
                      const selection = window.getSelection()
                      if (!selection || selection.toString().length === 0) {
                        if (!isTyping) {
                          e.preventDefault()
                          const inputElement = terminalRef.current?.querySelector('input')
                          inputElement?.focus()
                        }
                      }
                    }}
                  >
                    <TerminalOutput lines={lines} />
                    
                    <TerminalInput
                      currentInput={currentInput}
                      setCurrentInput={setCurrentInput}
                      onSubmit={handleSubmit}
                      onKeyDown={handleKeyDown}
                      isTyping={isTyping}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Commands Sidebar */}
            <TerminalErrorBoundary>
              <QuickCommands
                commands={quickCommands}
                onCommandClick={handleQuickCommand}
                isTyping={isTyping}
              />
            </TerminalErrorBoundary>
          </div>
        </div>

      </section>
    </TerminalErrorBoundary>
  )
}