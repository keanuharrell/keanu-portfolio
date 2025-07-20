"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ImageZoomProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
}

export function ImageZoom({ 
  src, 
  alt, 
  className, 
  width = 400, 
  height = 300 
}: ImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-lg cursor-pointer",
        className
      )}
      style={{ width, height }}
      onHoverStart={() => setIsZoomed(true)}
      onHoverEnd={() => setIsZoomed(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        animate={{
          scale: isZoomed ? 1.1 : 1,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.div
        className="absolute inset-0 bg-black/20"
        animate={{
          opacity: isZoomed ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          opacity: isZoomed ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
          Voir en détail
        </div>
      </motion.div>
    </motion.div>
  )
}