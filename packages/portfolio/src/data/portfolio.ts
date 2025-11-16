import type { PortfolioData, Experience } from "../types/portfolio";
import { ExperienceType, CertificationStatus } from "../types/portfolio";

// Helper function to format date range for display
const formatPeriod = (startDate: Date, endDate: Date | null): string => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : "Present";

  return `${start} - ${end}`;
};

// Helper to process experience data
const processExperience = (
  exp: Omit<Experience, "period" | "current">,
): Experience => ({
  ...exp,
  period: formatPeriod(exp.startDate, exp.endDate),
  current: exp.endDate === null || exp.endDate > new Date(),
});

export const portfolioData: PortfolioData = {
  personal: {
    name: "Keanu Harrell",
    title: "Cloud & Platform Engineer",
    tagline: "AWS & Kubernetes Enthusiast",
    location: "France",
    email: "keanuharrell@icloud.com",
    phone: "+48 572 263 316",
    linkedin: "https://linkedin.com/in/keanuharrell",
    github: "https://github.com/keanuharrell",
    website: "https://www.keanuharrell.com",
    bio: "Cloud Engineer with 3+ years building and optimizing cloud infrastructure, CI/CD pipelines, and container orchestration. Expert in AWS Cloud DevOps, Docker, Kubernetes, and infrastructure as code.",
    avatar: "/avatar.jpg",
    availability: {
      isAvailable: true,
      message: "Open to new opportunities",
    },
  },

  experience: [
    {
      id: "cto-untitled",
      title: "CTO / DevOps Architect",
      company: "Untitled, Grand Nancy Innovation",
      location: "Nancy, France",
      startDate: new Date("2024-11-01"),
      endDate: new Date("2025-10-31"),
      type: ExperienceType.FREELANCE,
      highlights: [
        "Architected multi-tenant SaaS platform using Clean Architecture with SST v3/IaC, deploying 3 separate apps on AWS serverless",
        "Implemented event-driven microservices with tRPC, TypeScript monorepo (Bun), achieving sub-100ms API response times",
        "Built authentication service with Better-Auth, JWT tokens, magic links, and role-based access control",
        "Deployed CI/CD pipelines with GitHub Actions, automated testing (Vitest), and infrastructure monitoring using CloudWatch",
      ],
      technologies: [
        "AWS",
        "SST",
        "TypeScript",
        "tRPC",
        "DynamoDB",
        "GitHub Actions",
        "CloudWatch",
      ],
    },
    {
      id: "devops-orisha",
      title: "DevOps Engineer / Platform Engineer",
      company: "Orisha Healthcare France",
      location: "Villers-lès-Nancy, France",
      startDate: new Date("2022-08-01"),
      endDate: new Date("2025-10-31"),
      type: ExperienceType.FULL_TIME,
      highlights: [
        "Managed Kubernetes-based microservices platform hosting 15+ healthcare services on AWS EKS ensuring HDS compliance",
        "Architected GitOps workflow using ArgoCD, Terraform (3-layer IaC), and Kustomize for multi-environment deployments",
        "Built comprehensive CI/CD pipelines (GitLab CI) automating Docker image builds and deployments",
        "Deployed Trino data lakehouse (2TB) with Apache Superset dashboards, reducing reporting time by 70%",
        "Established monitoring stack with Prometheus, Grafana, and metrics-server for cluster observability",
      ],
      technologies: [
        "Kubernetes",
        "AWS EKS",
        "Terraform",
        "ArgoCD",
        "GitLab CI",
        "Prometheus",
        "Grafana",
        "Trino",
      ],
    },
    {
      id: "automation-warsaw",
      title: "Automation Engineer Intern",
      company: "University of Warsaw",
      location: "Warsaw, Poland",
      startDate: new Date("2024-06-01"),
      endDate: new Date("2024-10-31"),
      type: ExperienceType.INTERNSHIP,
      highlights: [
        "Developed Python automation scripts for scientific computing workflows, reducing manual tasks by 40%",
        "Built automated testing framework for computational models using Python and bash scripting",
        "Implemented version control and documentation standards for research codebase",
      ],
      technologies: ["Python", "Bash", "Git", "Scientific Computing"],
    },
  ].map(processExperience),

  projects: [
    {
      id: "a9s-cli",
      title: "a9s - AWS Terminal UI",
      description: "k9s-inspired Terminal UI for AWS management",
      longDescription:
        "Built a powerful terminal interface for AWS resource management, inspired by k9s. Features real-time EC2, IAM, and S3 management with security audit capabilities.",
      highlights: [
        "k9s-inspired Terminal UI for AWS using Go and BubbleTea",
        "Dual-mode interface (TUI + CLI) with AWS SDK v2 integration",
        "Security audit features for IAM roles and S3 cleanup recommendations",
      ],
      technologies: ["Go", "BubbleTea", "AWS SDK", "GoReleaser"],
      github: "https://github.com/keanuharrell/a9s",
      demo: null,
      featured: true,
      date: "August 2025",
      icon: "Terminal",
    },
    {
      id: "k8s-platform",
      title: "Kubernetes Microservices Platform",
      description: "Production-ready K8s platform with auto-scaling",
      longDescription:
        "Deployed containerized microservices on Kubernetes cluster with comprehensive monitoring and CI/CD automation.",
      highlights: [
        "Deployed on Kubernetes with auto-scaling, achieving 99.9% uptime",
        "Jenkins CI/CD pipeline with automated testing and <5 min deployments",
        "Prometheus + Grafana stack for monitoring and alerting",
        "Helm charts and ArgoCD for GitOps workflow",
      ],
      technologies: [
        "Kubernetes",
        "Docker",
        "Jenkins",
        "Prometheus",
        "Grafana",
        "Helm",
        "ArgoCD",
      ],
      github: null,
      demo: null,
      featured: true,
      date: "April 2024",
      icon: "Cloud",
    },
    {
      id: "gaming-infra",
      title: "High-Performance Gaming Infrastructure",
      description: "Scalable infrastructure serving 150K+ users",
      longDescription:
        "Maintained and optimized production gaming infrastructure with automated scaling and monitoring.",
      highlights: [
        "Infrastructure serving 150K users with automated scaling",
        "GitLab CI/CD pipeline with containerization",
        "Reduced system crashes by 30% through performance tuning",
        "Automated incident response using Bash/Python scripting",
      ],
      technologies: ["Java", "Docker", "GitLab CI", "Linux", "Python", "Bash"],
      github: null,
      demo: null,
      featured: false,
      date: "June 2022 - July 2023",
      icon: "Gamepad2",
    },
  ],

  skills: {
    "Cloud & DevOps": [
      { name: "AWS", level: 90, icon: "Cloud" },
      { name: "Docker", level: 95, icon: "Package" },
      { name: "Kubernetes", level: 85, icon: "Boxes" },
      { name: "Terraform", level: 80, icon: "FileCode" },
      { name: "SST/IaC", level: 85, icon: "Code" },
    ],
    "CI/CD & Automation": [
      { name: "Jenkins", level: 85, icon: "GitBranch" },
      { name: "GitHub Actions", level: 90, icon: "Github" },
      { name: "GitLab CI", level: 85, icon: "GitBranch" },
      { name: "Python/Bash", level: 90, icon: "Terminal" },
    ],
    Monitoring: [
      { name: "Prometheus", level: 80, icon: "Activity" },
      { name: "Grafana", level: 80, icon: "BarChart" },
      { name: "CloudWatch", level: 85, icon: "Eye" },
      { name: "ELK Stack", level: 75, icon: "Database" },
    ],
    Languages: [
      { name: "Python", level: 90, icon: "Code" },
      { name: "Go", level: 85, icon: "Code" },
      { name: "JavaScript/TypeScript", level: 85, icon: "Code" },
      { name: "Java", level: 80, icon: "Coffee" },
    ],
    Databases: [
      { name: "PostgreSQL", level: 85, icon: "Database" },
      { name: "MongoDB", level: 80, icon: "Database" },
      { name: "DynamoDB", level: 85, icon: "Database" },
      { name: "Redis", level: 80, icon: "Zap" },
    ],
  },

  education: [
    {
      degree: "Master of Computer Science",
      school: "CESI Engineering School",
      location: "Villers-lès-Nancy, France",
      period: "Oct 2022 - Sep 2025",
      track: "Cloud & Data Engineering Track",
      current: true,
    },
    {
      degree: "Associate Degree in Computer Science (DUT)",
      school: "Nancy-Charlemagne Institute of Technology",
      location: "Nancy, France",
      period: "Sep 2020 - Jul 2022",
      current: false,
    },
  ],

  certifications: [
    {
      name: "AWS Certified DevOps Engineer",
      status: CertificationStatus.PURSUING,
    },
  ],

  interests: [
    "Open-source contributions",
    "Infrastructure automation",
    "Cloud architecture",
    "Gaming infrastructure",
  ],
};
