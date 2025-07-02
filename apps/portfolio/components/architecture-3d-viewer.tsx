"use client"

import { Suspense, useRef, useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  RotateCcw, 
  Play, 
  Pause, 
  Maximize2, 
  Database, 
  Server, 
  Cloud, 
  Network,
  Shield,
  Globe,
  Cpu,
  HardDrive,
  Wifi,
  Eye,
  Info
} from "lucide-react"

// Dynamic import for 3D Scene to avoid SSR issues
const Scene = dynamic(() => import("./architecture-3d-scene").then(mod => ({ default: mod.Scene })), {
  ssr: false,
  loading: () => (
    <div className="h-96 lg:h-[500px] bg-black rounded-lg flex items-center justify-center">
      <div className="text-white">Loading 3D Scene...</div>
    </div>
  )
})

// Fallback component when 3D is not available
const SceneFallback = () => (
  <div className="h-96 lg:h-[500px] bg-black rounded-lg flex flex-col items-center justify-center">
    <div className="text-white text-center">
      <div className="text-4xl mb-4">🏗️</div>
      <h3 className="text-lg font-medium mb-2">3D Architecture View</h3>
      <p className="text-gray-400 text-sm">Interactive 3D infrastructure diagram</p>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="bg-gray-800 rounded p-2">CloudFront CDN</div>
        <div className="bg-gray-800 rounded p-2">Load Balancer</div>
        <div className="bg-gray-800 rounded p-2">Lambda Functions</div>
        <div className="bg-gray-800 rounded p-2">DynamoDB</div>
      </div>
    </div>
  </div>
)

interface ServiceNode {
  id: string
  name: string
  type: 'compute' | 'storage' | 'network' | 'security' | 'database' | 'cdn'
  position: [number, number, number]
  status: 'healthy' | 'warning' | 'error'
  connections: string[]
  metrics: {
    cpu?: number
    memory?: number
    requests?: number
    latency?: number
  }
  description: string
}

const serviceNodes: ServiceNode[] = [
  {
    id: 'cloudfront',
    name: 'CloudFront CDN',
    type: 'cdn',
    position: [0, 3, 0],
    status: 'healthy',
    connections: ['alb', 's3'],
    metrics: { requests: 15420, latency: 12 },
    description: 'Global content delivery network'
  },
  {
    id: 'alb',
    name: 'Application Load Balancer',
    type: 'network',
    position: [0, 1.5, 0],
    status: 'healthy',
    connections: ['lambda', 'ecs'],
    metrics: { requests: 8960, latency: 45 },
    description: 'Routes traffic to backend services'
  },
  {
    id: 'lambda',
    name: 'Lambda Functions',
    type: 'compute',
    position: [-2, 0, 0],
    status: 'healthy',
    connections: ['dynamodb', 'rds'],
    metrics: { cpu: 23, memory: 45, requests: 5230 },
    description: 'Serverless compute functions'
  },
  {
    id: 'ecs',
    name: 'ECS Fargate',
    type: 'compute',
    position: [2, 0, 0],
    status: 'warning',
    connections: ['rds', 's3'],
    metrics: { cpu: 78, memory: 82, requests: 3730 },
    description: 'Containerized application services'
  },
  {
    id: 'dynamodb',
    name: 'DynamoDB',
    type: 'database',
    position: [-2, -1.5, 0],
    status: 'healthy',
    connections: [],
    metrics: { requests: 12450, latency: 8 },
    description: 'NoSQL database for high-performance applications'
  },
  {
    id: 'rds',
    name: 'RDS PostgreSQL',
    type: 'database',
    position: [2, -1.5, 0],
    status: 'healthy',
    connections: [],
    metrics: { cpu: 34, memory: 67, requests: 2180 },
    description: 'Relational database for structured data'
  },
  {
    id: 's3',
    name: 'S3 Storage',
    type: 'storage',
    position: [0, -1.5, 2],
    status: 'healthy',
    connections: [],
    metrics: { requests: 8920 },
    description: 'Object storage for static assets'
  },
  {
    id: 'waf',
    name: 'AWS WAF',
    type: 'security',
    position: [0, 2.5, -1],
    status: 'healthy',
    connections: ['cloudfront'],
    metrics: { requests: 15420 },
    description: 'Web application firewall protection'
  }
]

export function Architecture3DViewer() {
  const [selectedNode, setSelectedNode] = useState<ServiceNode | null>(null)
  const [isAnimating, setIsAnimating] = useState(true)
  const [showDataFlow, setShowDataFlow] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Check if we're on client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Auto-rotate through nodes for demo
  useEffect(() => {
    if (isAnimating && isClient) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * serviceNodes.length)
        setSelectedNode(serviceNodes[randomIndex])
      }, 4000)
      
      return () => clearInterval(interval)
    }
  }, [isAnimating, isClient])

  const resetCamera = () => {
    setSelectedNode(null)
    // Reset camera position logic would go here
  }

  const toggleDataFlow = () => {
    setShowDataFlow(!showDataFlow)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="bg-purple-600/20 text-purple-400 border-purple-600/30 mb-4">
            <Cpu className="w-3 h-3 mr-1" />
            3D Architecture
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Interactive Infrastructure
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore my cloud architecture in 3D. Click on services to see details, 
            watch data flows, and understand how everything connects.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* 3D Viewer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-purple-400" />
                    AWS Infrastructure Diagram
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsAnimating(!isAnimating)}
                      className="border-gray-600 text-gray-300"
                    >
                      {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={toggleDataFlow}
                      className={`border-gray-600 ${showDataFlow ? 'text-green-400' : 'text-gray-300'}`}
                    >
                      <Wifi className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={resetCamera}
                      className="border-gray-600 text-gray-300"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="border-gray-600 text-gray-300"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-96 lg:h-[500px] bg-black relative">
                  <SceneFallback />
                  
                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-gray-800/80 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-2">Service Types</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-gray-300">Healthy</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                        <span className="text-gray-300">Warning</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Service Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              {selectedNode ? (
                <motion.div
                  key={selectedNode.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
                        {selectedNode.name}
                      </CardTitle>
                      <Badge 
                        variant="outline" 
                        className={`w-fit ${
                          selectedNode.status === 'healthy' ? 'border-green-500/50 text-green-400' :
                          selectedNode.status === 'warning' ? 'border-yellow-500/50 text-yellow-400' :
                          'border-red-500/50 text-red-400'
                        }`}
                      >
                        {selectedNode.status.toUpperCase()}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-300 text-sm">{selectedNode.description}</p>
                      
                      {/* Metrics */}
                      <div className="space-y-3">
                        <h4 className="text-white font-medium">Live Metrics</h4>
                        {Object.entries(selectedNode.metrics).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm capitalize">{key}:</span>
                            <span className="text-white font-mono text-sm">
                              {typeof value === 'number' ? (
                                key.includes('cpu') || key.includes('memory') ? `${value}%` :
                                key.includes('latency') ? `${value}ms` :
                                value.toLocaleString()
                              ) : value}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Connections */}
                      {selectedNode.connections.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-white font-medium">Connected Services</h4>
                          <div className="space-y-1">
                            {selectedNode.connections.map((connId) => {
                              const connectedService = serviceNodes.find(n => n.id === connId)
                              return (
                                <div key={connId} className="text-gray-400 text-sm flex items-center">
                                  <Network className="w-3 h-3 mr-2" />
                                  {connectedService?.name || connId}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <Eye className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                      <h3 className="text-white font-medium mb-2">Select a Service</h3>
                      <p className="text-gray-400 text-sm">
                        Click on any service node in the 3D view to see detailed metrics and connections.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Actions */}
            <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <h4 className="text-white font-medium mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full justify-start border-gray-600 text-gray-300"
                    onClick={() => setShowDataFlow(!showDataFlow)}
                  >
                    <Wifi className="w-4 h-4 mr-2" />
                    {showDataFlow ? 'Hide' : 'Show'} Data Flow
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full justify-start border-gray-600 text-gray-300"
                    onClick={() => setIsAnimating(!isAnimating)}
                  >
                    {isAnimating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isAnimating ? 'Pause' : 'Play'} Animation
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full justify-start border-gray-600 text-gray-300"
                  >
                    <Info className="w-4 h-4 mr-2" />
                    View Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}