import { Metadata } from "next"
import { InfrastructureDashboardWrapper } from "@/components/infrastructure-dashboard-wrapper"

export const metadata: Metadata = {
  title: "Live Infrastructure Dashboard | Keanu Harrell",
  description: "Real-time monitoring of my serverless AWS infrastructure with live metrics, cost optimization, and service health status.",
  keywords: ["AWS", "Lambda", "Serverless", "Infrastructure", "Monitoring", "DevOps", "CloudWatch", "DynamoDB"]
}

export default function InfrastructurePage() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Live Infrastructure
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Real-time monitoring of my serverless AWS infrastructure. Watch live metrics, cost optimization, 
            service health, and automated deployments in action.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg px-4 py-2">
              <span className="text-green-400 font-semibold">● Live Status</span>
            </div>
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg px-4 py-2">
              <span className="text-blue-400 font-semibold">Real-time Metrics</span>
            </div>
            <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg px-4 py-2">
              <span className="text-purple-400 font-semibold">Cost Optimized</span>
            </div>
          </div>
        </div>
      </section>

      <div className="pb-16">
        <InfrastructureDashboardWrapper />
      </div>
    </div>
  )
}