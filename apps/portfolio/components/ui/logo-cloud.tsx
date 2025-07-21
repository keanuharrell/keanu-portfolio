"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoItem {
  name: string
  logo: string
  url?: string
}

interface LogoCloudProps {
  logos: LogoItem[]
  title?: string
  subtitle?: string
  className?: string
  speed?: number
}

export function LogoCloud({ 
  logos, 
  title, 
  subtitle, 
  className, 
  speed = 30 
}: LogoCloudProps) {
  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos]

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl font-bold mb-4"
            >
              {title}
            </motion.h2>
          )}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      )}

      {/* Scrolling logos */}
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-10" />
        
        {/* Logo container */}
        <div className="flex overflow-hidden py-4">
          <motion.div
            className="flex gap-8 items-center"
            animate={{
              x: `-50%`,
            }}
            transition={{
              duration: speed,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: `${200}%`,
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <motion.div
                key={`${logo.name}-${index}`}
                className="flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {logo.url ? (
                  <a
                    href={logo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <LogoItem logo={logo} />
                  </a>
                ) : (
                  <LogoItem logo={logo} />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function LogoItem({ logo }: { logo: LogoItem }) {
  return (
    <div className="flex flex-col items-center justify-center w-32 h-20 px-4 py-3 bg-card/80 backdrop-blur-sm rounded-lg border border-border/50 hover:shadow-md hover:bg-card transition-all duration-300">
      <div className="relative w-8 h-8 mb-1">
        <Image
          src={logo.logo}
          alt={`${logo.name} logo`}
          width={32}
          height={32}
          className="object-contain filter opacity-70 hover:opacity-100 transition-all duration-300"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
          }}
        />
      </div>
      <span className="text-xs text-muted-foreground text-center leading-tight">
        {logo.name}
      </span>
    </div>
  )
}