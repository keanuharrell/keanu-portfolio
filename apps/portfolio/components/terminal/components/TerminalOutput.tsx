"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { TerminalLine } from '../types'

interface TerminalOutputProps {
  lines: TerminalLine[]
}

export function TerminalOutput({ lines }: TerminalOutputProps) {
  return (
    <AnimatePresence>
      {lines.map((line) => (
        <motion.div
          key={line.id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-1 ${
            line.type === 'command' 
              ? 'text-green-400' 
              : line.type === 'ascii'
              ? 'text-cyan-400'
              : line.type === 'output'
              ? 'text-gray-300'
              : 'text-blue-400'
          }`}
        >
          <pre className={
            line.type === 'ascii' 
              ? 'ascii-art' 
              : 'whitespace-pre-wrap font-mono'
          }>{line.content}</pre>
        </motion.div>
      ))}
    </AnimatePresence>
  )
} 