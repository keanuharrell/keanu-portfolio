"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Editor from "@monaco-editor/react"

// Dynamic import for ReactFlow to avoid SSR issues
const ReactFlow = dynamic(() => import('react-flow-renderer'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-gray-900 rounded-lg flex items-center justify-center">
      <div className="text-white">Loading Pipeline Builder...</div>
    </div>
  )
})
import { 
  Play, 
  Save, 
  Download, 
  Upload, 
  Code, 
  Box, 
  GitBranch, 
  Zap,
  Settings,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader,
  Terminal,
  Cloud,
  Database,
  Server,
  Network,
  Shield,
  Cpu,
  HardDrive,
  Activity
} from "lucide-react"

// Import types separately
import type { 
  Node, 
  Edge, 
  ConnectionMode
} from 'react-flow-renderer'

interface DeploymentResult {
  status: 'success' | 'error' | 'warning'
  message: string
  resources: {
    name: string
    type: string
    status: 'created' | 'updated' | 'destroyed' | 'error'
  }[]
  cost: number
  duration: number
}

interface PipelineStep {
  id: string
  name: string
  status: 'pending' | 'running' | 'success' | 'failed'
  duration?: number
  logs: string[]
}

const terraformTemplate = `# AWS Infrastructure Configuration
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Configure AWS Provider
provider "aws" {
  region = var.aws_region
}

# Variables
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "eu-west-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "dev"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "portfolio"
}

# Lambda Function
resource "aws_lambda_function" "api" {
  filename         = "api.zip"
  function_name    = "\${var.project_name}-\${var.environment}-api"
  role            = aws_iam_role.lambda_role.arn
  handler         = "index.handler"
  runtime         = "nodejs18.x"
  timeout         = 30

  environment {
    variables = {
      ENVIRONMENT = var.environment
      DYNAMODB_TABLE = aws_dynamodb_table.main.name
    }
  }

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

# IAM Role for Lambda
resource "aws_iam_role" "lambda_role" {
  name = "\${var.project_name}-\${var.environment}-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# DynamoDB Table
resource "aws_dynamodb_table" "main" {
  name           = "\${var.project_name}-\${var.environment}-data"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

# API Gateway
resource "aws_api_gateway_rest_api" "main" {
  name = "\${var.project_name}-\${var.environment}-api"
  
  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

# S3 Bucket for static assets
resource "aws_s3_bucket" "assets" {
  bucket = "\${var.project_name}-\${var.environment}-assets-\${random_id.bucket_suffix.hex}"
}

resource "random_id" "bucket_suffix" {
  byte_length = 4
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "main" {
  origin {
    domain_name = aws_s3_bucket.assets.bucket_regional_domain_name
    origin_id   = "S3-\${aws_s3_bucket.assets.id}"
  }

  enabled = true
  
  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-\${aws_s3_bucket.assets.id}"
    compress              = true
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

# Outputs
output "lambda_function_arn" {
  description = "ARN of the Lambda function"
  value       = aws_lambda_function.api.arn
}

output "dynamodb_table_name" {
  description = "Name of the DynamoDB table"
  value       = aws_dynamodb_table.main.name
}

output "api_gateway_url" {
  description = "URL of the API Gateway"
  value       = aws_api_gateway_rest_api.main.execution_arn
}

output "cloudfront_domain" {
  description = "CloudFront distribution domain"
  value       = aws_cloudfront_distribution.main.domain_name
}

output "s3_bucket_name" {
  description = "Name of the S3 bucket"
  value       = aws_s3_bucket.assets.bucket
}`

const kubernetesTemplate = `# Kubernetes Deployment Configuration
apiVersion: apps/v1
kind: Deployment
metadata:
  name: portfolio-api
  namespace: production
  labels:
    app: portfolio-api
    version: v1.0.0
spec:
  replicas: 3
  selector:
    matchLabels:
      app: portfolio-api
  template:
    metadata:
      labels:
        app: portfolio-api
        version: v1.0.0
    spec:
      containers:
      - name: api
        image: portfolio/api:v1.0.0
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: database-secret
              key: url
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: portfolio-api-service
  namespace: production
spec:
  selector:
    app: portfolio-api
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: ClusterIP

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: portfolio-api-ingress
  namespace: production
  annotations:
    kubernetes.io/ingress.class: "nginx"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/rate-limit: "100"
spec:
  tls:
  - hosts:
    - api.keanuharrell.dev
    secretName: portfolio-api-tls
  rules:
  - host: api.keanuharrell.dev
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: portfolio-api-service
            port:
              number: 80

---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: portfolio-api-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: portfolio-api
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80`

const dockerTemplate = `# Multi-stage Docker build for Node.js application
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \\
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \\
  elif [ -f package-lock.json ]; then npm ci; \\
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \\
  else echo "Lockfile not found." && exit 1; \\
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Security: run as non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set environment variables
ENV PORT 3000
ENV NODE_ENV production

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start the application
CMD ["node", "server.js"]`

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Git Repository' },
    position: { x: 100, y: 100 },
    style: { background: '#10B981', color: 'white' }
  },
  {
    id: '2',
    data: { label: 'Build & Test' },
    position: { x: 300, y: 100 },
    style: { background: '#3B82F6', color: 'white' }
  },
  {
    id: '3',
    data: { label: 'Security Scan' },
    position: { x: 500, y: 100 },
    style: { background: '#8B5CF6', color: 'white' }
  },
  {
    id: '4',
    data: { label: 'Deploy to Staging' },
    position: { x: 300, y: 200 },
    style: { background: '#F59E0B', color: 'white' }
  },
  {
    id: '5',
    data: { label: 'Integration Tests' },
    position: { x: 500, y: 200 },
    style: { background: '#EF4444', color: 'white' }
  },
  {
    id: '6',
    type: 'output',
    data: { label: 'Deploy to Production' },
    position: { x: 400, y: 300 },
    style: { background: '#059669', color: 'white' }
  }
]

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4', animated: true },
  { id: 'e3-5', source: '3', target: '5', animated: true },
  { id: 'e4-6', source: '4', target: '6', animated: true },
  { id: 'e5-6', source: '5', target: '6', animated: true }
]

export function DevOpsPlayground() {
  const [selectedTemplate, setSelectedTemplate] = useState('terraform')
  const [code, setCode] = useState(terraformTemplate)
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentResult, setDeploymentResult] = useState<DeploymentResult | null>(null)
  const [pipelineSteps, setPipelineSteps] = useState<PipelineStep[]>([])
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

  const templates = {
    terraform: { name: 'Terraform', code: terraformTemplate, icon: Cloud },
    kubernetes: { name: 'Kubernetes', code: kubernetesTemplate, icon: Box },
    docker: { name: 'Docker', code: dockerTemplate, icon: Server }
  }

  useEffect(() => {
    setCode(templates[selectedTemplate as keyof typeof templates].code)
  }, [selectedTemplate])

  const simulateDeployment = async () => {
    setIsDeploying(true)
    setDeploymentResult(null)
    
    const steps: PipelineStep[] = [
      { id: '1', name: 'Validating Configuration', status: 'running', logs: [] },
      { id: '2', name: 'Planning Resources', status: 'pending', logs: [] },
      { id: '3', name: 'Applying Changes', status: 'pending', logs: [] },
      { id: '4', name: 'Verifying Deployment', status: 'pending', logs: [] }
    ]
    
    setPipelineSteps(steps)

    // Simulate step execution
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setPipelineSteps(prev => prev.map((step, index) => {
        if (index === i) {
          return { 
            ...step, 
            status: 'success', 
            duration: Math.floor(Math.random() * 30) + 10,
            logs: [
              `✓ ${step.name} completed successfully`,
              `Duration: ${Math.floor(Math.random() * 30) + 10}s`,
              'No errors detected'
            ]
          }
        } else if (index === i + 1) {
          return { ...step, status: 'running' }
        }
        return step
      }))
    }

    // Final result
    const result: DeploymentResult = {
      status: 'success',
      message: 'Infrastructure deployed successfully',
      resources: [
        { name: 'aws_lambda_function.api', type: 'Lambda Function', status: 'created' },
        { name: 'aws_dynamodb_table.main', type: 'DynamoDB Table', status: 'created' },
        { name: 'aws_s3_bucket.assets', type: 'S3 Bucket', status: 'created' },
        { name: 'aws_cloudfront_distribution.main', type: 'CloudFront', status: 'created' }
      ],
      cost: 47.23,
      duration: 156
    }

    setDeploymentResult(result)
    setIsDeploying(false)
  }

  const getStepIcon = (status: PipelineStep['status']) => {
    switch (status) {
      case 'pending': return <div className="w-4 h-4 rounded-full bg-gray-500" />
      case 'running': return <Loader className="w-4 h-4 text-blue-400 animate-spin" />
      case 'success': return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'failed': return <XCircle className="w-4 h-4 text-red-400" />
    }
  }

  const getStatusColor = (status: DeploymentResult['status']) => {
    switch (status) {
      case 'success': return 'border-green-500/50 bg-green-500/10 text-green-400'
      case 'error': return 'border-red-500/50 bg-red-500/10 text-red-400'
      case 'warning': return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400'
    }
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
          <Badge className="bg-orange-600/20 text-orange-400 border-orange-600/30 mb-4">
            <Code className="w-3 h-3 mr-1" />
            Interactive Playground
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            DevOps Playground
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experiment with infrastructure as code, build CI/CD pipelines, and deploy to the cloud. 
            All in a safe, interactive environment.
          </p>
        </motion.div>

        <Tabs defaultValue="code-editor" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
            <TabsTrigger value="code-editor" className="data-[state=active]:bg-orange-600">
              Infrastructure as Code
            </TabsTrigger>
            <TabsTrigger value="pipeline-builder" className="data-[state=active]:bg-blue-600">
              CI/CD Pipeline
            </TabsTrigger>
            <TabsTrigger value="deployment" className="data-[state=active]:bg-green-600">
              Live Deployment
            </TabsTrigger>
          </TabsList>

          {/* Code Editor Tab */}
          <TabsContent value="code-editor" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              
              {/* Code Editor */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center">
                        <Code className="w-5 h-5 mr-2 text-orange-400" />
                        Infrastructure Editor
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={simulateDeployment}
                          disabled={isDeploying}
                          className="bg-orange-600 hover:bg-orange-700"
                        >
                          {isDeploying ? (
                            <Loader className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <Play className="w-4 h-4 mr-2" />
                          )}
                          Deploy
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-96 lg:h-[600px]">
                      <Editor
                        height="100%"
                        language={selectedTemplate === 'kubernetes' ? 'yaml' : selectedTemplate === 'docker' ? 'dockerfile' : 'hcl'}
                        value={code}
                        onChange={(value) => setCode(value || '')}
                        theme="vs-dark"
                        options={{
                          minimap: { enabled: false },
                          scrollBeyondLastLine: false,
                          fontSize: 14,
                          lineNumbers: 'on',
                          roundedSelection: false,
                          scrollbar: {
                            vertical: 'auto',
                            horizontal: 'auto',
                          },
                          automaticLayout: true,
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Template Selector & Actions */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                
                {/* Template Selector */}
                <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-sm">Templates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {Object.entries(templates).map(([key, template]) => (
                      <Button
                        key={key}
                        variant={selectedTemplate === key ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTemplate(key)}
                        className={`w-full justify-start ${
                          selectedTemplate === key ? 'bg-orange-600 hover:bg-orange-700' : 'border-gray-600 text-gray-300'
                        }`}
                      >
                        <template.icon className="w-4 h-4 mr-2" />
                        {template.name}
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                {/* Deployment Status */}
                <AnimatePresence>
                  {deploymentResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className={`border backdrop-blur-sm ${getStatusColor(deploymentResult.status)}`}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Deployment Result
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm">{deploymentResult.message}</p>
                          
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">Resources Created:</h4>
                            {deploymentResult.resources.map((resource, index) => (
                              <div key={index} className="flex items-center text-xs">
                                <CheckCircle className="w-3 h-3 mr-2" />
                                <span>{resource.name}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex justify-between text-xs pt-2 border-t border-current/20">
                            <span>Duration: {deploymentResult.duration}s</span>
                            <span>Cost: €{deploymentResult.cost}/month</span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Pipeline Status */}
                <AnimatePresence>
                  {pipelineSteps.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-white text-sm flex items-center">
                            <Activity className="w-4 h-4 mr-2" />
                            Pipeline Status
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {pipelineSteps.map((step) => (
                            <div key={step.id} className="flex items-center space-x-3">
                              {getStepIcon(step.status)}
                              <div className="flex-1">
                                <div className="flex justify-between items-center">
                                  <span className="text-white text-sm">{step.name}</span>
                                  {step.duration && (
                                    <span className="text-gray-400 text-xs">{step.duration}s</span>
                                  )}
                                </div>
                                {step.logs.length > 0 && (
                                  <div className="text-xs text-gray-500 mt-1">
                                    {step.logs[0]}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </TabsContent>

          {/* Pipeline Builder Tab */}
          <TabsContent value="pipeline-builder" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center">
                      <GitBranch className="w-5 h-5 mr-2 text-blue-400" />
                      CI/CD Pipeline Builder
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Save className="w-4 h-4 mr-2" />
                        Save Pipeline
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div style={{ height: '500px' }}>
                    <ReactFlow
                      nodes={nodes}
                      edges={edges}
                      fitView
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Deployment Tab */}
          <TabsContent value="deployment" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              
              {/* Live Metrics */}
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
                      Live Environment Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { name: 'Production Pods', status: 'healthy', count: '3/3', icon: Box },
                      { name: 'Database', status: 'healthy', latency: '12ms', icon: Database },
                      { name: 'Load Balancer', status: 'healthy', requests: '1.2k/min', icon: Network },
                      { name: 'CDN', status: 'healthy', cache: '94%', icon: Shield }
                    ].map((service, index) => (
                      <motion.div
                        key={service.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-between p-3 rounded-lg border border-gray-700 hover:bg-gray-700/30 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <service.icon className="w-5 h-5 text-green-400" />
                          <div>
                            <h4 className="text-white font-medium">{service.name}</h4>
                            <p className="text-gray-400 text-sm">
                              {service.count || service.latency || service.requests || service.cache}
                            </p>
                          </div>
                        </div>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Deployment Actions */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white text-sm">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                      <Play className="w-4 h-4 mr-2" />
                      Deploy to Staging
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-gray-600 text-gray-300">
                      <Zap className="w-4 h-4 mr-2" />
                      Run Health Checks
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-gray-600 text-gray-300">
                      <Terminal className="w-4 h-4 mr-2" />
                      Open Terminal
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-gray-600 text-gray-300">
                      <FileText className="w-4 h-4 mr-2" />
                      View Logs
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white text-sm">Resource Usage</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { name: 'CPU', usage: 67, color: 'bg-blue-500' },
                      { name: 'Memory', usage: 78, color: 'bg-green-500' },
                      { name: 'Storage', usage: 45, color: 'bg-yellow-500' },
                      { name: 'Network', usage: 34, color: 'bg-purple-500' }
                    ].map((resource) => (
                      <div key={resource.name} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">{resource.name}</span>
                          <span className="text-white">{resource.usage}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${resource.color}`}
                            style={{ width: `${resource.usage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}