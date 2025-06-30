"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  PieChart,
  Pie,
  Cell
} from "recharts"
import { 
  Server, 
  Database, 
  Cloud, 
  Zap, 
  Activity, 
  DollarSign,
  Users,
  Globe,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Cpu,
  HardDrive,
  Wifi,
  RefreshCw
} from "lucide-react"

// Simulated real-time data generators
const generateMetric = (base: number, variance: number) => 
  base + (Math.random() - 0.5) * variance

const generateTimeSeriesData = (hours: number = 24) => {
  const data = []
  const now = new Date()
  for (let i = hours; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      invocations: generateMetric(1200, 800), // Lambda invocations per hour
      duration: generateMetric(85, 40), // Average duration in ms
      errors: generateMetric(0.5, 1), // Error rate percentage
      coldStarts: generateMetric(15, 10) // Cold start percentage
    })
  }
  return data
}

interface ServiceStatus {
  name: string
  status: 'healthy' | 'warning' | 'critical'
  uptime: string
  responseTime: number
  region: string
}

const serviceStatuses: ServiceStatus[] = [
  { name: "Lambda Functions", status: "healthy", uptime: "99.99%", responseTime: 89, region: "eu-west-1" },
  { name: "CloudFront CDN", status: "healthy", uptime: "99.98%", responseTime: 12, region: "global" },
  { name: "DynamoDB", status: "healthy", uptime: "99.99%", responseTime: 8, region: "eu-west-1" },
  { name: "S3 Bucket", status: "healthy", uptime: "99.99%", responseTime: 15, region: "eu-west-1" },
  { name: "Route 53 DNS", status: "healthy", uptime: "100%", responseTime: 5, region: "global" },
  { name: "CloudWatch", status: "healthy", uptime: "99.95%", responseTime: 25, region: "eu-west-1" }
]

const deploymentActivity = [
  { time: "3 min ago", action: "Lambda deployed", service: "Portfolio API", status: "success" },
  { time: "12 min ago", action: "CloudFront invalidated", service: "CDN", status: "success" },
  { time: "45 min ago", action: "DynamoDB table updated", service: "Database", status: "success" },
  { time: "2 hours ago", action: "S3 sync completed", service: "Static Assets", status: "success" },
]

const costData = [
  { name: "Lambda", value: 18, color: "#FF9900" },
  { name: "CloudFront", value: 12, color: "#232F3E" },
  { name: "DynamoDB", value: 8, color: "#3F48CC" },
  { name: "S3 Storage", value: 5, color: "#569A31" },
  { name: "Route 53", value: 2, color: "#9D5025" },
  { name: "CloudWatch", value: 2, color: "#FF4B4B" }
]

export function LiveInfrastructureDashboard() {
  const [metricsData, setMetricsData] = useState(generateTimeSeriesData())
  const [isLive, setIsLive] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [selectedMetric, setSelectedMetric] = useState<'invocations' | 'duration' | 'errors' | 'coldStarts'>('invocations')

  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      setMetricsData(prev => {
        const newData = [...prev.slice(1)]
        const now = new Date()
        newData.push({
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          invocations: generateMetric(1200, 800),
          duration: generateMetric(85, 40),
          errors: generateMetric(0.5, 1),
          coldStarts: generateMetric(15, 10)
        })
        return newData
      })
      setLastUpdate(new Date())
    }, 3000)

    return () => clearInterval(interval)
  }, [isLive])

  const getStatusIcon = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'critical': return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusColor = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'healthy': return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'warning': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'critical': return 'bg-red-500/10 text-red-500 border-red-500/20'
    }
  }

  const metricConfigs = {
    invocations: { color: "#FF9900", label: "Lambda Invocations/hour", icon: Zap },
    duration: { color: "#232F3E", label: "Avg Duration (ms)", icon: Clock },
    errors: { color: "#FF4B4B", label: "Error Rate (%)", icon: AlertTriangle },
    coldStarts: { color: "#3F48CC", label: "Cold Starts (%)", icon: Server }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50/50 via-indigo-50/50 to-purple-50/50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Serverless Dashboard</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Real-time monitoring of my serverless architecture powered by AWS Lambda and cloud services
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              variant={isLive ? "default" : "outline"}
              onClick={() => setIsLive(!isLive)}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isLive ? 'animate-spin' : ''}`} />
              {isLive ? 'Live' : 'Paused'}
            </Button>
            <Badge variant="outline" className="gap-2">
              <Activity className="h-3 w-3" />
              Updated {lastUpdate.toLocaleTimeString()}
            </Badge>
          </div>
        </motion.div>

        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Server className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Functions</p>
                  <p className="text-2xl font-bold text-green-500">8/8</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/5 rounded-bl-full" />
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Globe className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Regions</p>
                  <p className="text-2xl font-bold text-blue-500">3</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-bl-full" />
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <DollarSign className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Cost</p>
                  <p className="text-2xl font-bold text-purple-500">€47</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/5 rounded-bl-full" />
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                  <p className="text-2xl font-bold text-orange-500">99.9%</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/5 rounded-bl-full" />
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Real-time Metrics */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {(() => {
                      const IconComponent = metricConfigs[selectedMetric].icon
                      return <IconComponent className="h-5 w-5" />
                    })()}
                    {metricConfigs[selectedMetric].label}
                  </CardTitle>
                  <div className="flex gap-1">
                    {Object.entries(metricConfigs).map(([key, config]) => (
                      <Button
                        key={key}
                        variant={selectedMetric === key ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedMetric(key as typeof selectedMetric)}
                        className="h-8 px-3"
                      >
                        <config.icon className="h-3 w-3" />
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={metricsData}>
                    <defs>
                      <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={metricConfigs[selectedMetric].color} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={metricConfigs[selectedMetric].color} stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="time" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--popover))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey={selectedMetric}
                      stroke={metricConfigs[selectedMetric].color}
                      fillOpacity={1}
                      fill="url(#colorMetric)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Cost Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Cost Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={costData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {costData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`€${value}`, 'Cost']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {costData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">€{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Service Status */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Service Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {serviceStatuses.map((service, index) => (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center justify-between p-3 rounded-lg border hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        {getStatusIcon(service.status)}
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-xs text-muted-foreground">{service.region}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{service.uptime}</p>
                        <p className="text-xs text-muted-foreground">{service.responseTime}ms</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Deployments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {deploymentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 p-3 rounded-lg border hover:shadow-sm transition-shadow"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.service} • {activity.time}</p>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}