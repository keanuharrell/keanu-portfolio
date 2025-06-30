import { Metadata } from "next"
import { TerminalWrapper } from "@/components/terminal-wrapper"

export const metadata: Metadata = {
  title: "Interactive DevOps Terminal | Keanu Harrell",
  description: "Explore my infrastructure through realistic DevOps commands. Try AWS CLI, Kubernetes, Docker, and monitoring tools in an interactive terminal.",
  keywords: ["DevOps", "Terminal", "AWS CLI", "Kubernetes", "Docker", "Infrastructure", "Command Line", "Automation"]
}

export default function TerminalPage() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono">
            <span className="text-green-400">$</span> DevOps Terminal
          </h1>
          
          {/* Command Examples */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 max-w-2xl mx-auto mb-8 text-left">
            <div className="space-y-2 font-mono text-sm">
              <div className="text-gray-300">
                <span className="text-green-400">$</span> aws lambda list-functions
              </div>
              <div className="text-gray-300">
                <span className="text-green-400">$</span> kubectl get pods
              </div>
              <div className="text-gray-300">
                <span className="text-green-400">$</span> docker ps
              </div>
              <div className="text-gray-300">
                <span className="text-green-400">$</span> help
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg px-3 py-1 text-sm">
              <span className="text-green-400 font-medium">AWS CLI</span>
            </div>
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg px-3 py-1 text-sm">
              <span className="text-blue-400 font-medium">Kubernetes</span>
            </div>
            <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg px-3 py-1 text-sm">
              <span className="text-purple-400 font-medium">Docker</span>
            </div>
          </div>
        </div>
      </section>

      <div className="pb-16">
        <TerminalWrapper />
      </div>
    </div>
  )
}