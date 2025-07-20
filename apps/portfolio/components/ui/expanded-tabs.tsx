"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface TabItem {
  id: string
  label: string
  content: ReactNode
  icon?: ReactNode
}

interface ExpandedTabsProps {
  tabs: TabItem[]
  defaultTab?: string
  className?: string
}

export function ExpandedTabs({ tabs, defaultTab, className }: ExpandedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  return (
    <div className={cn("w-full", className)}>
      {/* Tab Navigation */}
      <div className="flex space-x-1 rounded-xl bg-muted/50 p-1 backdrop-blur-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative px-6 py-3 rounded-lg font-medium transition-all duration-300",
              "text-sm focus:outline-none focus:ring-2 focus:ring-primary/50",
              "flex items-center gap-2"
            )}
          >
            {/* Background indicator */}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-background shadow-sm rounded-lg"
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />
            )}
            
            {/* Tab content */}
            <div className="relative flex items-center gap-2">
              {tab.icon && (
                <motion.div
                  animate={{ 
                    scale: activeTab === tab.id ? 1.1 : 1,
                    opacity: activeTab === tab.id ? 1 : 0.7
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {tab.icon}
                </motion.div>
              )}
              <span className={cn(
                "transition-colors duration-200",
                activeTab === tab.id ? "text-foreground" : "text-muted-foreground"
              )}>
                {tab.label}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          {tabs.map((tab) => (
            activeTab === tab.id && (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {tab.content}
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}