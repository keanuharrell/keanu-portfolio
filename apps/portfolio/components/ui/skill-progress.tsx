"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface SkillProgressProps {
  skill: string
  level: number
  category: string
  className?: string
}

export function SkillProgress({ 
  skill, 
  level, 
  category, 
  className 
}: SkillProgressProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return 'from-blue-500 to-cyan-500'
      case 'backend':
        return 'from-green-500 to-emerald-500'
      case 'cloud':
        return 'from-purple-500 to-violet-500'
      case 'database':
        return 'from-orange-500 to-red-500'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <motion.div
      className={cn("space-y-2", className)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium">{skill}</span>
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
        </div>
        <motion.span
          className="text-sm text-muted-foreground"
          animate={{ opacity: isHovered ? 1 : 0.7 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <motion.div
          className={cn(
            "h-full rounded-full bg-gradient-to-r",
            getCategoryColor(category)
          )}
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  )
}