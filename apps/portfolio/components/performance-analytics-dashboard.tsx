"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar
} from "recharts"
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Zap,
  Target,
  Activity,
  BarChart3,
  PieChart as PieChartIcon,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  AlertCircle,
  XCircle,
  Server,
  Database,
  Network,
  Shield
} from "lucide-react"

interface SLIMetric {
  name: string
  current: number
  target: number
  status: 'healthy' | 'warning' | 'breached'
  trend: 'up' | 'down' | 'stable'
  errorBudget: number
  burnRate: number
}

interface Incident {
  id: string
  title: string
  severity: 'P1' | 'P2' | 'P3' | 'P4'
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved'
  startTime: Date
  resolvedTime?: Date
  impact: string
  services: string[]
  mttr: number // Mean Time To Recovery in minutes
}

interface DORAMetric {
  metric: string
  value: string
  change: string
  trend: 'up' | 'down' | 'stable'
  benchmark: 'elite' | 'high' | 'medium' | 'low'
  description: string
}

const sliMetrics: SLIMetric[] = [
  {
    name: 'API Availability',
    current: 99.97,
    target: 99.95,
    status: 'healthy',
    trend: 'up',
    errorBudget: 78.5,
    burnRate: 0.2
  },
  {
    name: 'Response Time P95',
    current: 89,
    target: 100,
    status: 'healthy',
    trend: 'down',
    errorBudget: 85.2,
    burnRate: 0.1
  },
  {
    name: 'Error Rate',
    current: 0.03,
    target: 0.05,
    status: 'healthy',
    trend: 'stable',
    errorBudget: 92.1,
    burnRate: 0.05
  },
  {
    name: 'Throughput',
    current: 1247,
    target: 1000,
    status: 'healthy',
    trend: 'up',
    errorBudget: 95.8,
    burnRate: 0.0
  }
]

const incidents: Incident[] = [
  {
    id: '1',
    title: 'Database Connection Pool Exhaustion',
    severity: 'P2',
    status: 'resolved',
    startTime: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    resolvedTime: new Date(Date.now() - 3.5 * 60 * 60 * 1000),
    impact: 'Increased response times on API endpoints',
    services: ['API Gateway', 'PostgreSQL RDS'],
    mttr: 32
  },
  {
    id: '2',
    title: 'CDN Cache Miss Rate Spike',
    severity: 'P3',
    status: 'resolved',
    startTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    resolvedTime: new Date(Date.now() - 23 * 60 * 60 * 1000),
    impact: 'Slightly increased page load times',
    services: ['CloudFront', 'S3'],
    mttr: 45
  },
  {
    id: '3',
    title: 'Lambda Cold Start Latency',
    severity: 'P4',
    status: 'monitoring',
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    impact: 'Occasional slow responses on serverless functions',
    services: ['Lambda Functions'],
    mttr: 0
  }
]

const doraMetrics: DORAMetric[] = [
  {
    metric: 'Deployment Frequency',
    value: '4.2/day',
    change: '+18%',
    trend: 'up',
    benchmark: 'elite',
    description: 'Multiple deployments per day'
  },
  {
    metric: 'Lead Time for Changes',
    value: '2.3 hours',
    change: '-15%',
    trend: 'down',
    benchmark: 'high',
    description: 'Time from commit to production'
  },
  {
    metric: 'Mean Time to Recovery',
    value: '28 minutes',
    change: '-22%',
    trend: 'down',
    benchmark: 'high',
    description: 'Time to recover from incidents'
  },
  {
    metric: 'Change Failure Rate',
    value: '2.1%',
    change: '+0.3%',
    trend: 'up',
    benchmark: 'elite',
    description: 'Percentage of changes causing incidents'
  }
]

// Mock time series data
const generatePerformanceData = () => {
  const data = []
  const now = new Date()
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      availability: 99.95 + Math.random() * 0.04,
      responseTime: 75 + Math.random() * 30,
      errorRate: Math.random() * 0.1,
      throughput: 800 + Math.random() * 400
    })
  }
  return data
}

const capacityData = [
  { resource: 'CPU', current: 67, allocated: 100, trend: 12 },
  { resource: 'Memory', current: 78, allocated: 100, trend: -5 },
  { resource: 'Storage', current: 45, allocated: 100, trend: 8 },
  { resource: 'Network', current: 34, allocated: 100, trend: 15 }
]

const costOptimizationData = [
  { category: 'Reserved Instances', savings: 1247, percentage: 35 },
  { category: 'Spot Instances', savings: 892, percentage: 25 },
  { category: 'Right-sizing', savings: 634, percentage: 18 },
  { category: 'Storage Classes', savings: 423, percentage: 12 },
  { category: 'Auto-scaling', savings: 356, percentage: 10 }
]

export function PerformanceAnalyticsDashboard() {
  const [performanceData, setPerformanceData] = useState(generatePerformanceData())
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h')
  const [isRealTime, setIsRealTime] = useState(true)
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)

  // Update real-time data
  useEffect(() => {
    if (!isRealTime) return

    const interval = setInterval(() => {
      setPerformanceData(prev => {
        const newData = [...prev.slice(1)]
        const now = new Date()
        newData.push({
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          availability: 99.95 + Math.random() * 0.04,
          responseTime: 75 + Math.random() * 30,
          errorRate: Math.random() * 0.1,
          throughput: 800 + Math.random() * 400
        })
        return newData
      })
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [isRealTime])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'P1': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'P2': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'P3': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'P4': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'text-green-400'
      case 'monitoring': return 'text-yellow-400'
      case 'investigating': return 'text-red-400'
      case 'identified': return 'text-orange-400'
      default: return 'text-gray-400'
    }
  }

  const getBenchmarkColor = (benchmark: string) => {
    switch (benchmark) {
      case 'elite': return 'text-green-400'
      case 'high': return 'text-blue-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="bg-green-600/20 text-green-400 border-green-600/30 mb-4">
            <BarChart3 className="w-3 h-3 mr-1" />
            Performance Analytics
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            SRE Dashboard
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive monitoring of Service Level Indicators (SLIs), DORA metrics, 
            incident management, and infrastructure performance.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-between mb-8 gap-4"
        >
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {['1h', '6h', '24h', '7d'].map((timeframe) => (
                <Button
                  key={timeframe}
                  size="sm"
                  variant={selectedTimeframe === timeframe ? "default" : "outline"}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className="border-gray-600"
                >
                  {timeframe}
                </Button>
              ))}
            </div>
            <Button
              size="sm"
              variant={isRealTime ? "default" : "outline"}
              onClick={() => setIsRealTime(!isRealTime)}
              className="bg-green-600 hover:bg-green-700"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRealTime ? 'animate-spin' : ''}`} />
              Real-time
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </motion.div>

        <Tabs defaultValue="sli-slo" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
            <TabsTrigger value="sli-slo" className="data-[state=active]:bg-blue-600">SLI/SLO</TabsTrigger>
            <TabsTrigger value="dora" className="data-[state=active]:bg-green-600">DORA Metrics</TabsTrigger>
            <TabsTrigger value="incidents" className="data-[state=active]:bg-red-600">Incidents</TabsTrigger>
            <TabsTrigger value="capacity" className="data-[state=active]:bg-purple-600">Capacity</TabsTrigger>
          </TabsList>

          {/* SLI/SLO Tab */}
          <TabsContent value="sli-slo" className="space-y-6">
            
            {/* SLI Overview Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {sliMetrics.map((metric, index) => (
                <motion.div
                  key={metric.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Target className="w-5 h-5 text-blue-400" />
                        <Badge variant="outline" className={
                          metric.status === 'healthy' ? 'border-green-500/50 text-green-400' :
                          metric.status === 'warning' ? 'border-yellow-500/50 text-yellow-400' :
                          'border-red-500/50 text-red-400'
                        }>
                          {metric.status}
                        </Badge>
                      </div>
                      
                      <h3 className="text-white font-medium mb-1">{metric.name}</h3>
                      <div className="flex items-baseline space-x-2 mb-2">
                        <span className="text-2xl font-bold text-white">
                          {metric.name.includes('Rate') ? `${metric.current}%` : 
                           metric.name.includes('Time') ? `${metric.current}ms` :
                           metric.name.includes('Throughput') ? metric.current :
                           `${metric.current}%`}
                        </span>
                        <span className="text-sm text-gray-400">
                          Target: {metric.name.includes('Rate') ? `${metric.target}%` : 
                                  metric.name.includes('Time') ? `${metric.target}ms` :
                                  metric.name.includes('Throughput') ? metric.target :
                                  `${metric.target}%`}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Error Budget</span>
                          <span className="text-white">{metric.errorBudget}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                          <div 
                            className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${metric.errorBudget}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Burn Rate</span>
                          <span className="text-white">{metric.burnRate}x</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Performance Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-green-400" />
                      Availability & Response Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="time" stroke="#9CA3AF" />
                        <YAxis yAxisId="left" stroke="#9CA3AF" />
                        <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: '#1F2937',
                            border: '1px solid #374151',
                            borderRadius: '8px'
                          }}
                        />
                        <Line 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="availability" 
                          stroke="#10B981" 
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="responseTime" 
                          stroke="#3B82F6" 
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
                      Error Rate & Throughput
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="time" stroke="#9CA3AF" />
                        <YAxis yAxisId="left" stroke="#9CA3AF" />
                        <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: '#1F2937',
                            border: '1px solid #374151',
                            borderRadius: '8px'
                          }}
                        />
                        <Area 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="errorRate" 
                          stackId="1"
                          stroke="#EF4444" 
                          fill="#EF4444"
                          fillOpacity={0.3}
                        />
                        <Area 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="throughput" 
                          stackId="2"
                          stroke="#8B5CF6" 
                          fill="#8B5CF6"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* DORA Metrics Tab */}
          <TabsContent value="dora" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {doraMetrics.map((metric, index) => (
                <motion.div
                  key={metric.metric}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Zap className="w-5 h-5 text-green-400" />
                        <Badge variant="outline" className={getBenchmarkColor(metric.benchmark)}>
                          {metric.benchmark.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <h3 className="text-white font-medium mb-2">{metric.metric}</h3>
                      <div className="flex items-baseline space-x-2 mb-2">
                        <span className="text-2xl font-bold text-white">{metric.value}</span>
                        <span className={`text-sm flex items-center ${
                          metric.trend === 'up' ? 'text-green-400' : 
                          metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                        }`}>
                          {metric.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> :
                           metric.trend === 'down' ? <TrendingDown className="w-3 h-3 mr-1" /> : null}
                          {metric.change}
                        </span>
                      </div>
                      
                      <p className="text-xs text-gray-400">{metric.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Incidents Tab */}
          <TabsContent value="incidents" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              
              {/* Incident Timeline */}
              <div className="lg:col-span-2">
                <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
                      Incident Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {incidents.map((incident, index) => (
                        <motion.div
                          key={incident.id}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start space-x-4 p-4 rounded-lg border border-gray-700 hover:bg-gray-700/30 transition-colors cursor-pointer"
                          onClick={() => setSelectedIncident(incident)}
                        >
                          <div className={`flex-shrink-0 w-3 h-3 rounded-full mt-2 ${
                            incident.status === 'resolved' ? 'bg-green-500' :
                            incident.status === 'monitoring' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`} />
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-white font-medium">{incident.title}</h4>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className={getSeverityColor(incident.severity)}>
                                  {incident.severity}
                                </Badge>
                                <Badge variant="outline" className={`border-gray-600 ${getStatusColor(incident.status)}`}>
                                  {incident.status}
                                </Badge>
                              </div>
                            </div>
                            
                            <p className="text-gray-400 text-sm mb-2">{incident.impact}</p>
                            
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>Started: {incident.startTime.toLocaleString()}</span>
                              {incident.resolvedTime && (
                                <span>Resolved: {incident.resolvedTime.toLocaleString()}</span>
                              )}
                              <span>MTTR: {incident.mttr || 'N/A'} min</span>
                            </div>
                            
                            <div className="flex flex-wrap gap-1 mt-2">
                              {incident.services.map((service) => (
                                <Badge key={service} variant="secondary" className="text-xs">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Incident Details */}
              <div>
                <AnimatePresence mode="wait">
                  {selectedIncident ? (
                    <motion.div
                      key={selectedIncident.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="text-white text-sm">Incident Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="text-white font-medium mb-2">{selectedIncident.title}</h4>
                            <p className="text-gray-400 text-sm">{selectedIncident.impact}</p>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Severity:</span>
                              <Badge variant="outline" className={getSeverityColor(selectedIncident.severity)}>
                                {selectedIncident.severity}
                              </Badge>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Status:</span>
                              <span className={getStatusColor(selectedIncident.status)}>
                                {selectedIncident.status}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">MTTR:</span>
                              <span className="text-white">{selectedIncident.mttr || 'N/A'} min</span>
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="text-white font-medium mb-2">Affected Services</h5>
                            <div className="space-y-1">
                              {selectedIncident.services.map((service) => (
                                <div key={service} className="flex items-center text-sm">
                                  <Server className="w-3 h-3 mr-2 text-gray-400" />
                                  <span className="text-gray-300">{service}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                        <CardContent className="p-6 text-center">
                          <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                          <h3 className="text-white font-medium mb-2">Select an Incident</h3>
                          <p className="text-gray-400 text-sm">
                            Click on an incident in the timeline to see detailed information.
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </TabsContent>

          {/* Capacity Tab */}
          <TabsContent value="capacity" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              
              {/* Resource Utilization */}
              <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
                    Resource Utilization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {capacityData.map((resource, index) => (
                      <motion.div
                        key={resource.resource}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">{resource.resource}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-white">{resource.current}%</span>
                            <span className={`text-xs ${resource.trend > 0 ? 'text-red-400' : 'text-green-400'}`}>
                              {resource.trend > 0 ? '+' : ''}{resource.trend}%
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              resource.current > 80 ? 'bg-red-500' :
                              resource.current > 60 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${resource.current}%` }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Cost Optimization */}
              <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <PieChartIcon className="w-5 h-5 mr-2 text-green-400" />
                    Cost Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={costOptimizationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="savings"
                      >
                        {costOptimizationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={[
                            '#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'
                          ][index]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`€${value}`, 'Savings']} />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  <div className="space-y-2 mt-4">
                    {costOptimizationData.map((item, index) => (
                      <div key={item.category} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: [
                              '#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'
                            ][index] }}
                          />
                          <span className="text-gray-300">{item.category}</span>
                        </div>
                        <span className="text-white font-medium">€{item.savings}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Total Monthly Savings</span>
                      <span className="text-green-400 font-bold text-lg">
                        €{costOptimizationData.reduce((sum, item) => sum + item.savings, 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}