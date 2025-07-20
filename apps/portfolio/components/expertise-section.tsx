"use client"

import { motion } from "framer-motion"
import { CodeBlock } from "@/components/ui/code-block"
import { ExpandedTabs } from "@/components/ui/expanded-tabs"
import { Code, Server, Cloud } from "lucide-react"

export function ExpertiseSection() {
  const codeExamples = [
    {
      id: "frontend",
      label: "Frontend",
      icon: <Code className="w-4 h-4" />,
      content: (
        <CodeBlock
          language="typescript"
          code={`// React Component with TypeScript and Framer Motion
import { motion } from "framer-motion"
import { useState } from "react"

interface UserCardProps {
  user: {
    name: string
    role: string
    avatar: string
  }
}

export function UserCard({ user }: UserCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="p-6 bg-card rounded-lg border"
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.role}</p>
    </motion.div>
  )
}`}
        />
      )
    },
    {
      id: "backend",
      label: "Backend",
      icon: <Server className="w-4 h-4" />,
      content: (
        <CodeBlock
          language="javascript"
          code={`// REST API with Express and TypeScript
import express from 'express'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(['user', 'admin'])
})

app.post('/api/users', async (req, res) => {
  try {
    const userData = userSchema.parse(req.body)
    const user = await prisma.user.create({
      data: userData
    })
    res.json(user)
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' })
  }
})`}
        />
      )
    },
    {
      id: "cloud",
      label: "Cloud/DevOps",
      icon: <Cloud className="w-4 h-4" />,
      content: (
        <CodeBlock
          language="hcl"
          code={`# AWS Infrastructure with Terraform
resource "aws_lambda_function" "api" {
  filename         = "api.zip"
  function_name    = "portfolio-api"
  role            = aws_iam_role.lambda_role.arn
  handler         = "index.handler"
  runtime         = "nodejs18.x"
  timeout         = 30

  environment {
    variables = {
      DATABASE_URL = aws_rds_cluster.main.endpoint
      JWT_SECRET   = var.jwt_secret
    }
  }
}

resource "aws_api_gateway_rest_api" "main" {
  name        = "portfolio-api"
  description = "Portfolio API Gateway"
}

resource "aws_rds_cluster" "main" {
  cluster_identifier = "portfolio-db"
  engine            = "aurora-postgresql"
  master_username   = "admin"
  master_password   = var.db_password
  database_name     = "portfolio"
}`}
        />
      )
    }
  ]

  return (
    <section id="expertise" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Technical Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Code examples and architectures I&apos;ve developed
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <ExpandedTabs 
            tabs={codeExamples}
            defaultTab="frontend"
          />
        </motion.div>
      </div>
    </section>
  )
}