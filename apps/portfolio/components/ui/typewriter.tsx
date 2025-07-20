"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TypewriterProps {
  text: string | string[]
  className?: string
  speed?: number
  delay?: number
  loop?: boolean
  cursor?: boolean
  cursorChar?: string
}

export function Typewriter({ 
  text, 
  className, 
  speed = 50, 
  delay = 0, 
  loop = false, 
  cursor = true,
  cursorChar = "|"
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  const textArray = Array.isArray(text) ? text : [text]
  const currentText = textArray[currentTextIndex]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!isTyping) return

    if (currentIndex < currentText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + currentText[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    } else if (loop && textArray.length > 1) {
      // If we're looping and have multiple texts, wait then move to next text
      const timer = setTimeout(() => {
        setDisplayedText("")
        setCurrentIndex(0)
        setCurrentTextIndex(prev => (prev + 1) % textArray.length)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [currentIndex, currentText, isTyping, loop, speed, textArray])

  // Cursor blinking effect
  useEffect(() => {
    if (!cursor) return

    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorTimer)
  }, [cursor])

  return (
    <motion.span
      className={cn("inline-block", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: delay / 1000 }}
    >
      {displayedText}
      {cursor && (
        <motion.span
          className="inline-block text-primary"
          animate={{ opacity: showCursor ? 1 : 0 }}
          transition={{ duration: 0.1 }}
        >
          {cursorChar}
        </motion.span>
      )}
    </motion.span>
  )
}

interface TypewriterEffectProps {
  words: string[]
  className?: string
  speed?: number
  loop?: boolean
}

export function TypewriterEffect({ 
  words, 
  className, 
  speed = 100, 
  loop = true 
}: TypewriterEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const word = words[currentWordIndex]
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < word.length) {
          setCurrentText(word.slice(0, currentText.length + 1))
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false)
          setCurrentWordIndex(prev => 
            loop ? (prev + 1) % words.length : Math.min(prev + 1, words.length - 1)
          )
        }
      }
    }, isDeleting ? speed / 2 : speed)

    return () => clearTimeout(timer)
  }, [currentText, currentWordIndex, isDeleting, words, speed, loop])

  return (
    <span className={cn("inline-block", className)}>
      {currentText}
      <motion.span
        className="inline-block text-primary ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        |
      </motion.span>
    </span>
  )
}