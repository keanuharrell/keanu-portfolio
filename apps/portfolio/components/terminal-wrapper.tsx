"use client"

import dynamic from "next/dynamic"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const InteractiveTerminal = dynamic(
  () => import("./interactive-terminal").then(mod => ({ default: mod.InteractiveTerminal })),
  {
    ssr: false,
    loading: () => (
      <section className="py-20 bg-gradient-to-br from-gray-900 via-slate-900/90 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-96 mx-auto mb-4 bg-gray-700" />
            <Skeleton className="h-6 w-[500px] mx-auto bg-gray-700" />
          </div>
          
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card className="bg-black border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-6 w-48 bg-gray-700" />
                    <div className="flex gap-2">
                      <Skeleton className="h-3 w-3 rounded-full bg-red-500" />
                      <Skeleton className="h-3 w-3 rounded-full bg-yellow-500" />
                      <Skeleton className="h-3 w-3 rounded-full bg-green-500" />
                    </div>
                  </div>
                  <div className="h-96 lg:h-[500px] bg-black rounded-lg p-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-64 bg-gray-800" />
                      <Skeleton className="h-4 w-48 bg-gray-800" />
                      <div className="flex items-center gap-2 mt-4">
                        <span className="text-green-400">$</span>
                        <Skeleton className="h-4 w-32 bg-gray-800" />
                        <span className="text-yellow-400 animate-pulse">⚡</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-gray-900/50 border-gray-700">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-32 mb-4 bg-gray-700" />
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-3 w-20 bg-gray-800" />
                        <Skeleton className="h-4 w-12 bg-gray-800" />
                      </div>
                      <Skeleton className="h-3 w-32 bg-gray-800" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }
)

export function TerminalWrapper() {
  return <InteractiveTerminal />
}