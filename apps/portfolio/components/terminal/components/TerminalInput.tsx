"use client"

import { useRef, useEffect } from 'react'

interface TerminalInputProps {
  currentInput: string
  setCurrentInput: (input: string) => void
  onSubmit: (e: React.FormEvent) => void
  onKeyDown: (e: React.KeyboardEvent) => void
  isTyping: boolean
}

export function TerminalInput({
  currentInput,
  setCurrentInput,
  onSubmit,
  onKeyDown,
  isTyping
}: TerminalInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Re-focus input after typing is done
  useEffect(() => {
    if (!isTyping) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isTyping])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value)
  }

  return (
    <div className="relative">
      <form onSubmit={onSubmit} className="flex items-center">
        <span className="text-green-400 mr-2">$ </span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={handleInputChange}
          onKeyDown={onKeyDown}
          className="flex-1 bg-transparent text-green-400 outline-none font-mono"
          placeholder={isTyping ? "Processing..." : "Enter command..."}
          disabled={isTyping}
          autoFocus
        />
        {isTyping && (
          <span className="text-yellow-400 animate-pulse ml-2">⚡</span>
        )}
      </form>
    </div>
  )
} 