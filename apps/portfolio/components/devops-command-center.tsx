"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Activity, 
  Zap, 
  Globe, 
  TrendingUp, 
  Server, 
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Rocket,
  Monitor,
  Scale,
  Terminal,
} from "lucide-react"

interface LiveMetric {
  id: string
  label: string
  value: string
  change: string
  trend: 'up' | 'down' | 'stable'
  color: string
  icon: any
}

interface Alert {
  id: string
  type: 'info' | 'warning' | 'error' | 'success'
  message: string
  service: string
  timestamp: Date
}

interface Region {
  id: string
  name: string
  code: string
  status: 'healthy' | 'warning' | 'degraded'
  services: number
  latency: number
  x: number
  y: number
}

const regions: Region[] = [
  { id: '1', name: 'US East (N. Virginia)', code: 'us-east-1', status: 'healthy', services: 12, latency: 89, x: 25, y: 35 },
  { id: '2', name: 'EU West (Ireland)', code: 'eu-west-1', status: 'healthy', services: 8, latency: 45, x: 50, y: 25 },
  { id: '3', name: 'Asia Pacific (Tokyo)', code: 'ap-northeast-1', status: 'warning', services: 6, latency: 156, x: 85, y: 40 },
  { id: '4', name: 'US West (Oregon)', code: 'us-west-2', status: 'healthy', services: 10, latency: 78, x: 15, y: 40 },
  { id: '5', name: 'EU Central (Frankfurt)', code: 'eu-central-1', status: 'healthy', services: 7, latency: 52, x: 55, y: 22 }
]

export function DevOpsCommandCenter() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [isLive, setIsLive] = useState(true)

  // Live metrics with real-time updates
  const [metrics, setMetrics] = useState<LiveMetric[]>([
    {
      id: 'uptime',
      label: 'Global Uptime',
      value: '99.97%',
      change: '+0.02%',
      trend: 'up',
      color: 'text-green-500',
      icon: TrendingUp
    },
    {
      id: 'deployments',
      label: 'Deployments Today',
      value: '23',
      change: '+15',
      trend: 'up',
      color: 'text-blue-500',
      icon: Rocket
    },
    {
      id: 'response',
      label: 'Avg Response Time',
      value: '89ms',
      change: '-12ms',
      trend: 'down',
      color: 'text-purple-500',
      icon: Zap
    },
    {
      id: 'cost',
      label: 'Cost Optimization',
      value: '€1,247',
      change: 'saved',
      trend: 'up',
      color: 'text-orange-500',
      icon: DollarSign
    }
  ])

  // Initialize time on client side only
  useEffect(() => {
    setCurrentTime(new Date())
  }, [])

  // Update time and metrics
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      setCurrentTime(new Date())
      
      // Simulate metric updates
      setMetrics(prev => prev.map(metric => {
        const variance = Math.random() * 0.02 - 0.01 // ±1% variance
        let newValue = metric.value
        
        switch (metric.id) {
          case 'uptime':
            const currentUptime = parseFloat(metric.value.replace('%', ''))
            newValue = `${Math.max(99.95, Math.min(99.99, currentUptime + variance)).toFixed(2)}%`
            break
          case 'deployments':
            const currentDeps = parseInt(metric.value)
            if (Math.random() < 0.1) { // 10% chance to increment
              newValue = (currentDeps + 1).toString()
            }
            break
          case 'response':
            const currentResp = parseInt(metric.value.replace('ms', ''))
            newValue = `${Math.max(75, Math.min(120, currentResp + variance * 100)).toFixed(0)}ms`
            break
          case 'cost':
            const currentCost = parseInt(metric.value.replace('€', '').replace(',', ''))
            newValue = `€${(currentCost + Math.floor(Math.random() * 50)).toLocaleString()}`
            break
        }
        
        return { ...metric, value: newValue }
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [isLive])

  // Simulate alerts
  useEffect(() => {
    if (!isLive) return

    const alertMessages = [
      { type: 'success' as const, message: 'Deployment completed successfully', service: 'Portfolio API' },
      { type: 'info' as const, message: 'Auto-scaling triggered', service: 'K8s Cluster' },
      { type: 'warning' as const, message: 'High memory usage detected', service: 'Database' },
      { type: 'success' as const, message: 'SSL certificate renewed', service: 'CloudFront' },
      { type: 'info' as const, message: 'Backup completed', service: 'S3 Storage' }
    ]

    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every 5 seconds
        const randomAlert = alertMessages[Math.floor(Math.random() * alertMessages.length)]
        const newAlert: Alert = {
          id: Date.now().toString(),
          ...randomAlert,
          timestamp: new Date()
        }
        
        setAlerts(prev => [newAlert, ...prev.slice(0, 4)]) // Keep only 5 most recent
        
        // Remove alert after 8 seconds
        setTimeout(() => {
          setAlerts(prev => prev.filter(alert => alert.id !== newAlert.id))
        }, 8000)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isLive])

  const getStatusColor = (status: Region['status']) => {
    switch (status) {
      case 'healthy': return 'bg-green-500'
      case 'warning': return 'bg-yellow-500'
      case 'degraded': return 'bg-red-500'
    }
  }

  const getAlertStyle = (type: Alert['type']) => {
    switch (type) {
      case 'success': return 'border-green-500/50 bg-green-500/10 text-green-400'
      case 'info': return 'border-blue-500/50 bg-blue-500/10 text-blue-400'
      case 'warning': return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400'
      case 'error': return 'border-red-500/50 bg-red-500/10 text-red-400'
    }
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-8">
        
        {/* Header Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-400 font-mono text-sm">LIVE PRODUCTION</span>
            </div>
            <div className="text-gray-400 font-mono text-sm">
              {currentTime?.toLocaleString('en-US', { 
                weekday: 'short',
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit',
                timeZoneName: 'short'
              }) || 'Loading...'}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant={isLive ? "default" : "outline"}
              size="sm"
              onClick={() => setIsLive(!isLive)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Activity className={`w-4 h-4 mr-2 ${isLive ? 'animate-pulse' : ''}`} />
              {isLive ? 'Live' : 'Paused'}
            </Button>
            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
              <Terminal className="w-4 h-4 mr-2" />
              Debug
            </Button>
          </div>
        </motion.div>

        {/* Main Hero Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Left: Hero Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/30">
                <Server className="w-3 h-3 mr-1" />
                Full Stack Engineer
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-green-400">
                  Keanu Harrell
                </span>
              </h1>
              
              <h2 className="text-xl md:text-2xl text-gray-300 font-medium">
                Full Stack Engineer | Cloud & Platform Engineer
              </h2>
              
              <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
                <strong>3+ years</strong> designing and shipping cloud-native microservices on AWS and scalable data platforms. 
                Expert in React/TypeScript, Golang/C#, CI/CD and observability.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Rocket className="w-4 h-4 mr-2" />
                Deploy Infrastructure
              </Button>
              <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Monitor className="w-4 h-4 mr-2" />
                View Monitoring
              </Button>
              <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Scale className="w-4 h-4 mr-2" />
                Auto Scale
              </Button>
            </div>
          </motion.div>

          {/* Right: Live Metrics Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <metric.icon className={`w-5 h-5 ${metric.color}`} />
                        <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                          {metric.change}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
                        <p className="text-sm text-gray-400">{metric.label}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* World Map with Regions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12"
        >
          <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-blue-400" />
                  Global Infrastructure Status
                </h3>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-gray-400">Healthy</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="text-gray-400">Warning</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="text-gray-400">Degraded</span>
                  </div>
                </div>
              </div>
              
              {/* Simplified World Map */}
              <div className="relative bg-gray-900/50 rounded-lg p-8 h-64 overflow-hidden">
                {/* World Map SVG Background */}
                <svg 
                  viewBox="0 0 1000 500" 
                  className="absolute inset-0 w-full h-full opacity-20"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))' }}
                >
                  {/* Simplified world continents */}
                  <path d="M200,150 L300,120 L400,140 L450,180 L400,220 L300,200 L200,180 Z" fill="currentColor" className="text-blue-400/30" />
                  <path d="M500,100 L650,90 L700,130 L650,170 L500,160 Z" fill="currentColor" className="text-blue-400/30" />
                  <path d="M750,150 L850,140 L900,180 L850,220 L750,210 Z" fill="currentColor" className="text-blue-400/30" />
                </svg>
                
                {/* Region Points */}
                {regions.map((region, index) => (
                  <motion.div
                    key={region.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                    className="absolute"
                    style={{ 
                      left: `${region.x}%`, 
                      top: `${region.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onMouseEnter={() => setSelectedRegion(region)}
                    onMouseLeave={() => setSelectedRegion(null)}
                  >
                    <div className="relative">
                      <div className={`w-4 h-4 rounded-full ${getStatusColor(region.status)} animate-pulse cursor-pointer`} />
                      <div className={`absolute inset-0 w-4 h-4 rounded-full ${getStatusColor(region.status)} animate-ping opacity-75`} />
                      
                      {/* Tooltip */}
                      <AnimatePresence>
                        {selectedRegion?.id === region.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 10 }}
                            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm whitespace-nowrap z-10"
                          >
                            <div className="text-white font-medium">{region.name}</div>
                            <div className="text-gray-400">{region.services} services • {region.latency}ms</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Live Alerts */}
        <AnimatePresence>
          {alerts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed bottom-6 right-6 space-y-2 z-50"
            >
              {alerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 300 }}
                  className={`max-w-sm p-4 rounded-lg border backdrop-blur-sm ${getAlertStyle(alert.type)}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {alert.type === 'success' && <CheckCircle className="w-5 h-5" />}
                      {alert.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
                      {alert.type === 'info' && <Activity className="w-5 h-5" />}
                      {alert.type === 'error' && <AlertTriangle className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{alert.message}</p>
                      <p className="text-sm opacity-75">{alert.service}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}