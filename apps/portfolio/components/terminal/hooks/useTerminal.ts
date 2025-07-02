'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { TerminalLine } from '../types'
import { asciiArt, easterEggCommands, allCommands } from '../commands/index'
import { executeCommand as executeRealCommand } from '../core/commandParser'
import { getCurrentDir } from '../core/fileSystem'
import { TabCompletion } from '../core/tabCompletion'

export function useTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [showWelcome, setShowWelcome] = useState(true)
  
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const addLine = (type: TerminalLine['type'], content: string) => {
    setLines(prev => [...prev, {
      id: Date.now() + Math.random(),
      type,
      content,
      timestamp: new Date()
    }])
  }

  const simulateTyping = async (outputLines: string[]) => {
    setIsTyping(true)
    
    for (const line of outputLines) {
      await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 70))
      addLine('output', line)
    }
    
    setIsTyping(false)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  const displayWelcome = async () => {
    setIsTyping(true)
    
    for (const line of asciiArt) {
      await new Promise(resolve => setTimeout(resolve, 100))
      addLine('ascii', line)
    }
    
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const welcomeMessages = [
      "Welcome to Keanu's Portfolio Terminal v3.0.0",
      "Type 'help' to see available commands",
      "Ready to explore? Try 'whoami' to start!",
      ""
    ]
    
    for (const msg of welcomeMessages) {
      await new Promise(resolve => setTimeout(resolve, 200))
      addLine('output', msg)
    }
    
    setIsTyping(false)
    setShowWelcome(false)
  }

  const handleTabCompletion = () => {
    const result = TabCompletion.complete(currentInput)
    
    if (result.completed !== currentInput) {
      setCurrentInput(result.completed)
    }
    
    if (result.showSuggestions && result.suggestions.length > 0) {
      const formattedSuggestions = TabCompletion.formatSuggestions(result.suggestions)
      const suggestionLines = [
        "", // Empty line before suggestions
        ...formattedSuggestions,
        "" // Empty line after suggestions
      ]
      
      suggestionLines.forEach(line => addLine('output', line))
    }
  }

  const executeCommand = async (command: string) => {
    const trimmedCommand = command.trim()
    
    if (trimmedCommand && !commandHistory.includes(trimmedCommand)) {
      setCommandHistory(prev => [...prev, trimmedCommand])
    }
    setHistoryIndex(-1)
    
    const currentDir = getCurrentDir()
    const prompt = currentDir === '/' ? '~' : currentDir.replace('/', '')
    addLine('command', `keanu@portfolio:${prompt}$ ${command}`)
    
    if (trimmedCommand.toLowerCase() === 'clear') {
      setLines([])
      return
    }
    
    if (trimmedCommand.toLowerCase() === 'exit') {
      await simulateTyping([
        "Goodbye! Returning to portfolio...",
        "Connection to keanu@portfolio closed."
      ])
      
      setTimeout(() => {
        router.push('/')
      }, 1500)
      return
    }

    if (trimmedCommand.toLowerCase() === 'history') {
      const hasEasterEgg = Math.random() < 0.3
      const easterEggCmd = easterEggCommands[Math.floor(Math.random() * easterEggCommands.length)]
      
      const historyOutput = [
        "Command history:",
        ...commandHistory.map((cmd, idx) => `${idx + 1}  ${cmd}`),
      ]
      
      if (hasEasterEgg && commandHistory.length > 3) {
        historyOutput.push(`${commandHistory.length + 1}  ${easterEggCmd} # 🤫 You didn't see this...`)
        historyOutput.push("")
        historyOutput.push("⚠️  Warning: Some commands may be... fictional 😉")
      }
      
      historyOutput.push("")
      
      await simulateTyping(historyOutput)
      return
    }
    
    try {
      const output = await executeRealCommand(trimmedCommand, allCommands)
      
      if (output.includes('__CLEAR_TERMINAL__')) {
        setLines([])
        return
      }
      
      if (output.length > 0) {
        await simulateTyping(output)
      }
    } catch (error) {
      await simulateTyping([
        `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        ""
      ])
    }
  }

  useEffect(() => {
    if (showWelcome) {
      displayWelcome()
    }
  }, [showWelcome])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])
  
  useEffect(() => {
    const handleClick = () => {
      if (!isTyping) {
        inputRef.current?.focus()
      }
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isTyping && !['Tab', 'Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) {
        inputRef.current?.focus()
      }
    }
    
    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isTyping])

  return {
    lines,
    currentInput,
    setCurrentInput,
    isTyping,
    commandHistory,
    historyIndex,
    setHistoryIndex,
    terminalRef,
    inputRef,
    executeCommand,
    handleTabCompletion
  }
}


