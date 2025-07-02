import { CommandHandler, ParsedCommand } from '../core/commandParser'

export const portfolioCommands: Record<string, CommandHandler> = {
  whoami: {
    name: 'whoami',
    description: 'Display current user information',
    category: 'portfolio',
    usage: 'whoami',
    examples: ['whoami'],
    handler: async () => {
      return [
        "Keanu Harrell",
        "Role: DevOps Engineer & iOS Developer", 
        "Location: Remote",
        "Experience: 5+ years in cloud infrastructure",
        "Specialties: AWS, Kubernetes, Swift, TypeScript",
        "",
        "$ Passionate about automation and scalable systems"
      ]
    }
  },

  wget: {
    name: 'wget',
    description: 'Download files from web',
    category: 'portfolio',
    usage: 'wget [URL]',
    examples: ['wget cv.pdf', 'wget resume.pdf'],
    handler: async (parsed: ParsedCommand) => {
      const url = parsed.args[0]
      if (!url) {
        return ["wget: missing URL"]
      }
      
      if (url === 'cv.pdf' || url === 'resume.pdf') {
        return [
          "--2025-07-01 14:25:30--  https://keanuharrell.dev/cv.pdf",
          "Resolving keanuharrell.dev... 185.199.108.153",
          "Connecting to keanuharrell.dev|185.199.108.153|:443... connected.",
          "HTTP request sent, awaiting response... 200 OK",
          "Length: 245760 (240K) [application/pdf]",
          "Saving to: 'keanu-harrell-cv.pdf'",
          "",
          "keanu-harrell-cv.pdf  100%[===================>] 240.00K  1.85MB/s    in 0.1s",
          "",
          "2025-07-01 14:25:30 (1.85 MB/s) - 'keanu-harrell-cv.pdf' saved [245760/245760]",
          "",
          "✅ CV downloaded successfully!"
        ]
      }
      
      return [`wget: cannot resolve ${url}`]
    }
  },

  skills: {
    name: 'skills',
    description: 'Display technical skills overview',
    category: 'portfolio',
    usage: 'skills [CATEGORY]',
    examples: ['skills', 'skills cloud', 'skills mobile'],
    handler: async (parsed: ParsedCommand) => {
      const category = parsed.args[0]?.toLowerCase()
      
      if (category === 'cloud') {
        return [
          "☁️  Cloud Platforms & Services:",
          "├── AWS (EC2, S3, Lambda, EKS, RDS)",
          "├── Google Cloud Platform (GKE, Cloud Run)",
          "├── Azure (AKS, App Service)",
          "└── Multi-cloud architecture design"
        ]
      }
      
      if (category === 'mobile') {
        return [
          "📱 Mobile Development:",
          "├── Swift & SwiftUI",
          "├── iOS SDK & Frameworks",
          "├── Xcode & Development Tools",
          "└── App Store deployment"
        ]
      }
      
      // Default: show all skills
      return [
        "🚀 Technical Skills Overview:",
        "",
        "☁️  Cloud Platforms:",
        "    AWS, Google Cloud Platform, Azure",
        "",
        "🐳 Container & Orchestration:",
        "    Kubernetes, Docker, Helm",
        "",
        "🏗️  Infrastructure as Code:",
        "    Terraform, CloudFormation, Pulumi",
        "",
        "💻 Programming Languages:",
        "    Python, Go, TypeScript, Swift, Bash",
        "",
        "📊 Monitoring & Observability:",
        "    Grafana, Prometheus, Datadog, New Relic",
        "",
        "📱 Mobile Development:",
        "    Swift, SwiftUI, Xcode, iOS SDK",
        "",
        "🗄️  Databases:",
        "    PostgreSQL, MongoDB, Redis, DynamoDB",
        "",
        "Use 'skills <category>' for detailed view (cloud, mobile)"
      ]
    }
  },

  experience: {
    name: 'experience',
    description: 'Display work experience',
    category: 'portfolio',
    usage: 'experience [COMPANY]',
    examples: ['experience', 'experience current'],
    handler: async (parsed: ParsedCommand) => {
      const filter = parsed.args[0]?.toLowerCase()
      
      if (filter === 'current') {
        return [
          "📍 Current Position:",
          "",
          "🏢 Senior DevOps Engineer @ TechCorp",
          "📅 2023 - Present",
          "🎯 Leading cloud infrastructure modernization",
          "",
          "Key Achievements:",
          "• Reduced deployment time by 75% with CI/CD automation",
          "• Migrated 50+ services to Kubernetes",
          "• Implemented multi-region disaster recovery",
          "• Built observability stack serving 10M+ requests/day"
        ]
      }
      
      return [
        "💼 Professional Experience:",
        "",
        "🏢 Senior DevOps Engineer @ TechCorp",
        "   📅 2023 - Present",
        "   🎯 Leading cloud infrastructure and automation",
        "",
        "🏢 DevOps Engineer @ CloudStart",
        "   📅 2021 - 2023",
        "   🎯 Built scalable cloud infrastructure from scratch",
        "",
        "🏢 Junior DevOps Engineer @ StartupXYZ",
        "   📅 2020 - 2021",
        "   🎯 Automated deployment pipelines and monitoring",
        "",
        "🏢 iOS Developer @ FreelanceWork",
        "   📅 2019 - 2020",
        "   🎯 Developed mobile applications for various clients",
        "",
        "Use 'experience current' for detailed current role info"
      ]
    }
  },

  projects: {
    name: 'projects',
    description: 'List all projects with quick navigation',
    category: 'portfolio',
    usage: 'projects [CATEGORY]',
    examples: ['projects', 'projects infrastructure', 'projects mobile', 'projects web'],
    handler: async (parsed: ParsedCommand) => {
      const category = parsed.args[0]?.toLowerCase()
      
      if (category) {
        const categoryMap: Record<string, string> = {
          'infrastructure': 'infrastructure',
          'infra': 'infrastructure',
          'mobile': 'mobile-apps',
          'mobile-apps': 'mobile-apps',
          'ios': 'mobile-apps',
          'web': 'web-applications',
          'web-applications': 'web-applications'
        }
        
        const targetDir = categoryMap[category]
        if (!targetDir) {
          return [
            `projects: Unknown category '${category}'`,
            "Available categories: infrastructure, mobile, web"
          ]
        }
        
        return [
          `📁 ${targetDir.replace('-', ' ').toUpperCase()} Projects:`,
          "",
          `Use 'cd projects/${targetDir}' to navigate`,
          `Use 'ls projects/${targetDir}' to list projects`,
          `Use 'cat projects/${targetDir}/<project-name>' to view details`,
          ""
        ]
      }
      
      return [
        "🚀 Portfolio Projects Overview",
        "",
        "📁 INFRASTRUCTURE (3 projects)",
        "├── aws-multi-region     - Multi-region AWS setup",
        "├── k8s-monitoring       - Kubernetes monitoring stack",  
        "└── terraform-modules    - Reusable Terraform modules",
        "",
        "📱 MOBILE APPS (2 projects)", 
        "├── expense-tracker-ios  - AI-powered expense tracking",
        "└── fitness-companion    - Workout tracking with AR",
        "",
        "🌐 WEB APPLICATIONS (2 projects)",
        "├── analytics-dashboard  - Real-time business metrics",
        "└── portfolio-website    - This interactive portfolio",
        ""
      ]
    }
  }
} 