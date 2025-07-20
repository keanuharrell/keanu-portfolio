"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className={cn(
          "relative w-12 h-12 rounded-full border-2 border-border/50",
          "bg-background/50 backdrop-blur-sm shadow-lg",
          "hover:shadow-xl transition-all duration-300",
          "focus:outline-none focus:ring-2 focus:ring-primary/50",
          "overflow-hidden"
        )}
      >
        <Sun className="h-5 w-5 text-yellow-500 absolute inset-0 m-auto" />
        <span className="sr-only">Toggle theme</span>
      </button>
    )
  }

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative w-12 h-12 rounded-full border-2 border-border/50",
        "bg-background/50 backdrop-blur-sm shadow-lg",
        "hover:shadow-xl transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-primary/50",
        "overflow-hidden"
      )}
    >
      {/* Animated background circle */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20"
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 20,
          duration: 0.4
        }}
      />

      {/* Sun icon */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          scale: isDark ? 0 : 1,
          rotate: isDark ? 90 : 0,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 20,
          duration: 0.4
        }}
      >
        <Sun className="h-5 w-5 text-yellow-500" />
      </motion.div>

      {/* Moon icon */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          rotate: isDark ? 0 : -90,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 20,
          duration: 0.4
        }}
      >
        <Moon className="h-5 w-5 text-blue-400" />
      </motion.div>

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary/30"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileTap={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      />

      <span className="sr-only">Toggle theme</span>
    </button>
  )
}