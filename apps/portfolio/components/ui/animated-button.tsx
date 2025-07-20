"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Heart, Star, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps {
  type: "like" | "star" | "view"
  count?: number
  className?: string
  onClick?: () => void
}

export function AnimatedButton({ 
  type, 
  count = 0, 
  className, 
  onClick 
}: AnimatedButtonProps) {
  const [isAnimated, setIsAnimated] = useState(false)
  const [currentCount, setCurrentCount] = useState(count)

  const icons = {
    like: Heart,
    star: Star,
    view: Eye
  }

  const Icon = icons[type]

  const handleClick = () => {
    setIsAnimated(true)
    setCurrentCount(prev => prev + 1)
    setTimeout(() => setIsAnimated(false), 600)
    onClick?.()
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      className={cn(
        "flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors",
        className
      )}
    >
      <motion.div
        animate={isAnimated ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Icon 
          className={cn(
            "w-4 h-4",
            type === "like" && isAnimated && "fill-red-500 text-red-500",
            type === "star" && isAnimated && "fill-yellow-500 text-yellow-500"
          )}
        />
      </motion.div>
      <motion.span
        key={currentCount}
        initial={{ scale: 1 }}
        animate={isAnimated ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.3 }}
        className="text-sm"
      >
        {currentCount}
      </motion.span>
    </Button>
  )
}