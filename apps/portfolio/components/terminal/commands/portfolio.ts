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
        "Role: Full Stack Engineer | Cloud & Platform Engineer", 
        "Location: Nancy, France | Warszawa, Poland (French-American)",
        "Phone: +33 6 95 09 83 51 (FR) | +48 572 263 316 (PL)",
        "Experience: 3+ years in cloud-native development",
        "Specialties: React/TypeScript, Golang/C#, AWS, CI/CD",
        "",
        "$ Expert in designing scalable microservices and data platforms"
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
          "☁️  Cloud & DevOps Technologies:",
          "├── AWS (Lambda, DynamoDB, Aurora, SQS, SES, ECS)",
          "├── Docker, Kubernetes, Helm, Kustomize",
          "├── Terraform, Infrastructure as Code (IaC)",
          "├── Jenkins, GitOps, ArgoCD",
          "└── Prometheus, Grafana (Observability)"
        ]
      }
      
      if (category === 'fullstack') {
        return [
          "🌐 Full Stack Development:",
          "├── Frontend: React, Vue.js, TypeScript",
          "├── Backend: Node.js, Express, .NET, C#",
          "├── Styling: Tailwind CSS, Shadcn UI",
          "└── Tools: Storybook, Git, CI/CD"
        ]
      }
      
      // Default: show all skills
      return [
        "🚀 Technical Skills Overview:",
        "",
        "💻 Programming Languages:",
        "    TypeScript, JavaScript, Golang, C#, SQL, VB",
        "",
        "🌐 Frontend Frameworks:",
        "    React, Vue.js, Tailwind CSS, Shadcn UI, Storybook",
        "",
        "🔧 Backend Technologies:",
        "    Express, Node.js, .NET, ASP.NET",
        "",
        "☁️  Cloud & DevOps:",
        "    AWS (Lambda, DynamoDB, Aurora, SQS, SES, ECS)",
        "    Docker, Kubernetes, Git, GitOps, Terraform",
        "",
        "🗄️  Databases:",
        "    PostgreSQL, MongoDB, NoSQL, DynamoDB",
        "",
        "📊 Monitoring & Tools:",
        "    Grafana, Prometheus, Jenkins, ArgoCD, Helm",
        "",
        "Use 'skills <category>' for detailed view (cloud, fullstack)"
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
          "🏢 CTO (Freelance/Part-time) @ Untitled, Grand Nancy Innovation",
          "📅 Nov 2024 - Present | Nancy, France",
          "🎯 Leading serverless architecture and team development",
          "",
          "Key Achievements:",
          "• Architected AWS serverless microservices (<1s P99 latency)",
          "• Built multi-tenant API with Auth0 & Stripe integration",
          "• Led 2-engineer team with agile delivery & OKR planning",
          "• Achieved zero-downtime releases with SST & Lambda"
        ]
      }
      
      return [
        "💼 Professional Experience:",
        "",
        "🏢 CTO (Freelance/Part-time) @ Untitled, Grand Nancy Innovation",
        "   📅 Nov 2024 - Present | Nancy, France",
        "   🎯 AWS serverless architecture & team leadership",
        "",
        "🏢 Software Engineer Apprentice @ Orisha Healthcare",
        "   📅 Aug 2022 - Present | Villers-lès-Nancy, France",
        "   🎯 Data platforms, React UI library, GitFlow implementation",
        "",
        "🏢 Research Intern @ University of Warsaw",
        "   📅 Jun 2024 - Oct 2024 | Warsaw, Poland",
        "   🎯 Crystallography automation & Python development",
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
        "🌐 CLOUD & PLATFORM (3 projects)",
        "├── cesi-eats           - Kubernetes microservices platform",
        "├── analytics-lakehouse  - 2TB Trino SQL engine data platform",  
        "└── serverless-api      - AWS multi-tenant SaaS backend",
        "",
        "🎮 GAMING & COMMUNITY (1 project)", 
        "└── stelerio-plugins    - Minecraft plugins for 150K players",
        "",
        "🔬 RESEARCH & AUTOMATION (1 project)",
        "└── crystallography     - Python automation for crystal analysis",
        "",
        "💼 CURRENT PORTFOLIO",
        "└── portfolio-terminal  - Interactive terminal portfolio",
        ""
      ]
    }
  },

  education: {
    name: 'education',
    description: 'Display educational background',
    category: 'portfolio',
    usage: 'education',
    examples: ['education'],
    handler: async () => {
      return [
        "🎓 Educational Background:",
        "",
        "🏫 CESI Engineering School",
        "   📍 Villers-lès-Nancy, France",
        "   📅 Oct 2022 - Expected Sep 2025",
        "   🎯 Master of Computer Science",
        "   📚 Cloud & Data Engineering Track",
        "",
        "🏫 Nancy-Charlemagne Institute of Technology", 
        "   📍 Nancy, France",
        "   📅 Sep 2020 - Jul 2022",
        "   🎯 Associate Degree in Computer Science (DUT)",
        "",
        "🌟 Additional Information:",
        "• French-American nationality",
        "• Trained first-aid responder",
        "• Interests: Guitar, team sports (swimming, tennis, basketball)",
        ""
      ]
    }
  }
} 