import { FileSystem, FileSystemNode } from "../types"

// File system simulation
export const fileSystem: FileSystem = {
  '/': {
    type: 'directory',
    files: {
      'about.md': {
        type: 'file',
        content: [
          "# About Keanu Harrell",
          "",
          "## 🚀 Professional Summary", 
          "DevOps Engineer with 5+ years of experience in cloud infrastructure,",
          "automation, and scalable system design. Passionate about creating",
          "robust, efficient solutions that drive business growth.",
          "",
          "## 🔧 Core Competencies",
          "• Cloud Infrastructure (AWS, GCP)",
          "• Container Orchestration (Kubernetes, Docker)",
          "• Infrastructure as Code (Terraform, CloudFormation)",
          "• CI/CD Pipeline Design & Implementation",
          "• Monitoring & Observability (Grafana, Prometheus)",
          "• iOS Development (Swift, SwiftUI)"
        ]
      },
      'skills.json': {
        type: 'file',
        content: [
          "{",
          "  \"cloud_platforms\": [\"AWS\", \"Google Cloud Platform\", \"Azure\"],",
          "  \"container_orchestration\": [\"Kubernetes\", \"Docker\", \"Helm\"],",
          "  \"infrastructure_as_code\": [\"Terraform\", \"CloudFormation\", \"Pulumi\"],",
          "  \"programming_languages\": [\"Python\", \"Go\", \"TypeScript\", \"Swift\", \"Bash\"],",
          "  \"monitoring_tools\": [\"Grafana\", \"Prometheus\", \"Datadog\", \"New Relic\"],",
          "  \"mobile_development\": [\"Swift\", \"SwiftUI\", \"Xcode\", \"iOS SDK\"],",
          "  \"databases\": [\"PostgreSQL\", \"MongoDB\", \"Redis\", \"DynamoDB\"]",
          "}"
        ]
      },
      'contact.txt': {
        type: 'file',
        content: [
          "📧 Email: keanu.harrell@example.com",
          "🔗 LinkedIn: linkedin.com/in/keanuharrell", 
          "📱 GitHub: github.com/keanuharrell",
          "🌐 Website: keanuharrell.dev",
          "",
          "💬 Open to:",
          "• DevOps Engineering opportunities",
          "• Cloud Architecture consulting", 
          "• iOS Development projects",
          "• Speaking engagements"
        ]
      },
      'cv.pdf': {
        type: 'file',
        content: ["Binary file (use 'wget cv.pdf' to download)"]
      },
      'projects': {
        type: 'directory',
        files: {
                     'infrastructure': {
             type: 'directory',
             files: {
               'aws-multi-region': { 
                 type: 'file', 
                 content: [
                   "# AWS Multi-Region Infrastructure",
                   "",
                   "**Description:** Highly available multi-region setup with automated failover",
                   "**Category:** Infrastructure",
                   "**Status:** Production",
                   "**Tech Stack:** AWS, Terraform, Kubernetes, Prometheus",
                   "",
                   "## Features:",
                   "🏗️  Multi-region AWS infrastructure with automated failover",
                   "🔄 Cross-region replication for RDS and S3", 
                   "📊 Comprehensive monitoring with Grafana dashboards",
                   "🚀 Zero-downtime deployments with blue-green strategy",
                   "💰 Cost optimization through spot instances and auto-scaling",
                   "🔐 Security best practices with IAM policies and VPC design",
                   "",
                   "🔗 GitHub: https://github.com/keanuharrell/aws-multi-region"
                 ]
               },
               'k8s-monitoring': { 
                 type: 'file', 
                 content: [
                   "# Kubernetes Monitoring Stack",
                   "",
                   "**Description:** Complete observability solution for Kubernetes clusters",
                   "**Category:** Infrastructure", 
                   "**Status:** Production",
                   "**Tech Stack:** Kubernetes, Prometheus, Grafana, Helm",
                   "",
                   "## Features:",
                   "📈 Full-stack monitoring with Prometheus + Grafana",
                   "🔍 Log aggregation with Elasticsearch and Fluentd",
                   "🎯 Custom metrics and alerting rules",
                   "📱 Mobile-friendly dashboards for on-call engineers",
                   "🔔 Integration with Slack and PagerDuty",
                   "💡 Performance optimization insights and recommendations",
                   "",
                   "🔗 GitHub: https://github.com/keanuharrell/k8s-monitoring"
                 ]
               },
               'terraform-modules': { 
                 type: 'file', 
                 content: [
                   "# Terraform Module Collection",
                   "",
                   "**Description:** Reusable infrastructure modules for AWS",
                   "**Category:** Infrastructure",
                   "**Status:** Production",
                   "**Tech Stack:** Terraform, AWS, Docker, GitHub Actions",
                   "",
                   "## Features:",
                   "🧩 Modular infrastructure components for rapid deployment",
                   "🔧 Support for EKS, RDS, VPC, and Lambda",
                   "📋 Comprehensive documentation and examples",
                   "🧪 Automated testing with Terratest",
                   "🚀 CI/CD pipeline with GitHub Actions",
                   "🏷️  Semantic versioning for stable releases",
                   "",
                   "🔗 GitHub: https://github.com/keanuharrell/terraform-modules"
                 ]
               }
             }
           },
           'mobile-apps': {
             type: 'directory', 
             files: {
               'expense-tracker-ios': { 
                 type: 'file', 
                 content: [
                   "# ExpenseTracker iOS",
                   "",
                   "**Description:** Personal finance management app with AI categorization",
                   "**Category:** Mobile",
                   "**Status:** Development",
                   "**Tech Stack:** Swift, SwiftUI, Core Data, CloudKit",
                   "",
                   "## Features:",
                   "💰 Intelligent expense categorization using ML",
                   "📊 Beautiful charts and spending analytics",
                   "☁️  Seamless sync across devices with CloudKit",
                   "🔔 Smart notifications for budget alerts",
                   "📱 Native iOS design with SwiftUI",
                   "🎯 Widget support for quick expense entry",
                   "",
                   "🔗 GitHub: https://github.com/keanuharrell/expense-tracker-ios",
                   "🚀 Demo: https://apps.apple.com/app/expense-tracker"
                 ]
               },
               'fitness-companion': { 
                 type: 'file', 
                 content: [
                   "# FitnessCompanion",
                   "",
                   "**Description:** Workout tracking app with social features",
                   "**Category:** Mobile",
                   "**Status:** Production", 
                   "**Tech Stack:** Swift, HealthKit, Firebase, ARKit",
                   "",
                   "## Features:",
                   "🏋️  Comprehensive workout tracking and planning",
                   "📱 Integration with Apple Health and wearables",
                   "👥 Social features for workout sharing",
                   "📸 AR-powered form checking for exercises",
                   "🎵 Music integration with Apple Music",
                   "🏆 Achievement system and progress tracking",
                   "",
                   "🚀 Demo: https://apps.apple.com/app/fitness-companion"
                 ]
               }
             }
           },
           'web-applications': {
             type: 'directory',
             files: {
                               'analytics-dashboard': { 
                  type: 'file', 
                  content: [
                    "# Real-time Analytics Dashboard",
                    "",
                    "**Description:** High-performance dashboard for business metrics",
                    "**Category:** Web",
                    "**Status:** Production",
                    "**Tech Stack:** TypeScript, React, D3.js, WebSocket",
                    "",
                    "## Features:",
                    "⚡ Real-time data visualization with WebSocket",
                    "📊 Interactive charts using D3.js and React",
                    "🎨 Responsive design with dark/light theme",
                    "🔄 Automatic data refresh and caching",
                    "📱 Mobile-optimized with touch gestures",
                    "🔐 Role-based access control and data filtering",
                    "",
                    "🔗 GitHub: https://github.com/keanuharrell/analytics-dashboard",
                    "🚀 Demo: https://analytics.keanuharrell.dev"
                  ]
                },
                'portfolio-website': { 
                  type: 'file', 
                  content: [
                    "# Portfolio Website",
                    "",
                    "**Description:** Interactive portfolio with terminal interface",
                    "**Category:** Web",
                    "**Status:** Production",
                    "**Tech Stack:** Next.js, TypeScript, Tailwind CSS, SST",
                    "",
                    "## Features:",
                    "💻 Interactive terminal interface for navigation",
                    "🎨 Modern responsive design with dark theme",
                    "⚡ Built with Next.js for optimal performance",
                    "🚀 Deployed on AWS with SST framework",
                    "📱 Mobile-optimized touch interactions",
                    "🔧 TypeScript for type safety",
                    "",
                    "🔗 GitHub: https://github.com/keanuharrell/keanu-portfolio",
                    "🚀 Demo: https://keanuharrell.dev"
                  ]
                }
             }
           }
        }
      }
    }
  }
}

// Current working directory state
let currentDir = '/'

export const getCurrentDir = () => currentDir
export const setCurrentDir = (dir: string) => { currentDir = dir }

// File system helpers
export const resolvePath = (path: string): string => {
  if (path.startsWith('/')) return path
  if (currentDir === '/') return `/${path}`
  return `${currentDir}/${path}`
}

export const getFileSystemNode = (path: string): FileSystemNode | null => {
  const resolvedPath = resolvePath(path)
  const parts = resolvedPath.split('/').filter(Boolean)
  
  let current = fileSystem['/']
  for (const part of parts) {
    if (current.files && current.files[part]) {
      current = current.files[part]
    } else {
      return null
    }
  }
  return current
}

export const listDirectory = (path: string = currentDir, flags: Record<string, boolean> = {}): string[] => {
  const node = getFileSystemNode(path)
  if (!node || node.type !== 'directory') {
    return [`ls: ${path}: No such file or directory`]
  }
  
  const files = Object.entries(node.files || {})
  const result: string[] = []
  
  if (flags.l || flags.a) {
    // Long format
    if (flags.a) {
      result.push("total 42")
      result.push("drwxr-xr-x  1 keanu  staff   256 Jul  1 2025 .")
      result.push("drwxr-xr-x  1 keanu  staff   128 Jul  1 2025 ..")
    }
    
    files.forEach(([name, node]: [string, FileSystemNode]) => {
      const type = node.type === 'directory' ? 'd' : '-'
      const permissions = node.type === 'directory' ? 'rwxr-xr-x' : 'rw-r--r--'
      const size = node.type === 'directory' ? '256' : '1024'
      result.push(`${type}${permissions}  1 keanu  staff  ${size} Jul  1 2025 ${name}`)
    })
  } else {
    // Simple format
    const fileNames = files.map(([name, node]: [string, FileSystemNode]) => 
      node.type === 'directory' ? `${name}/` : name
    )
    
    // Display in columns (simplified)
    result.push(fileNames.join('  '))
  }
  
  return result
} 