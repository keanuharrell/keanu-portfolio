"use client"

import dynamic from "next/dynamic"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const LiveInfrastructureDashboard = dynamic(
  () => import("./live-infrastructure-dashboard").then(mod => ({ default: mod.LiveInfrastructureDashboard })),
  {
    ssr: false,
    loading: () => (
      <section className="py-20 bg-gradient-to-br from-blue-50/50 via-indigo-50/50 to-purple-50/50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-80 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto mb-6" />
            <div className="flex items-center justify-center gap-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-8 w-32" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <div>
                      <Skeleton className="h-3 w-16 mb-2" />
                      <Skeleton className="h-6 w-12" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <Skeleton className="h-8 w-48 mb-4" />
                  <Skeleton className="h-[300px] w-full" />
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-8 w-32 mb-4" />
                <Skeleton className="h-[200px] w-full" />
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-8 w-32 mb-4" />
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <Skeleton key={j} className="h-16 w-full" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }
)

export function InfrastructureDashboardWrapper() {
  return <LiveInfrastructureDashboard />
}