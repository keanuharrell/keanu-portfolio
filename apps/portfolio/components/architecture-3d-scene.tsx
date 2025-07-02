"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text, Box, Sphere, Cylinder, Html } from "@react-three/drei"
import * as THREE from "three"

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

function ServiceBox({ node, isSelected, onClick, isAnimating }: { 
  node: ServiceNode
  isSelected: boolean
  onClick: () => void
  isAnimating: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current && isAnimating) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.05
    }
  })

  const getColor = () => {
    if (isSelected) return '#3B82F6'
    switch (node.status) {
      case 'healthy': return '#10B981'
      case 'warning': return '#F59E0B'
      case 'error': return '#EF4444'
      default: return '#6B7280'
    }
  }

  const getIcon = () => {
    switch (node.type) {
      case 'compute': return '⚡'
      case 'storage': return '💾'
      case 'network': return '🌐'
      case 'security': return '🛡️'
      case 'database': return '🗄️'
      case 'cdn': return '🌍'
      default: return '📦'
    }
  }

  return (
    <group position={node.position} onClick={onClick}>
      <Box
        ref={meshRef}
        args={[1, 1, 1]}
        scale={isSelected ? 1.2 : 1}
      >
        <meshStandardMaterial 
          color={getColor()} 
          transparent 
          opacity={0.8}
          emissive={getColor()}
          emissiveIntensity={isSelected ? 0.3 : 0.1}
        />
      </Box>
      
      {/* Service Icon */}
      <Html center>
        <div className="text-2xl pointer-events-none">
          {getIcon()}
        </div>
      </Html>
      
      {/* Service Label */}
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {node.name}
      </Text>
      
      {/* Status Indicator */}
      <Sphere position={[0.6, 0.6, 0]} args={[0.1]}>
        <meshBasicMaterial color={getColor()} />
      </Sphere>
    </group>
  )
}

function ConnectionLine({ from, to, nodes }: { from: string, to: string, nodes: ServiceNode[] }) {
  const fromNode = nodes.find(n => n.id === from)
  const toNode = nodes.find(n => n.id === to)
  
  if (!fromNode || !toNode) return null

  const start = new THREE.Vector3(...fromNode.position)
  const end = new THREE.Vector3(...toNode.position)
  const mid = new THREE.Vector3().lerpVectors(start, end, 0.5)

  return (
    <group>
      <Cylinder
        position={[mid.x, mid.y, mid.z]}
        args={[0.02, 0.02, start.distanceTo(end)]}
        rotation={[
          Math.atan2(end.z - start.z, end.y - start.y),
          0,
          -Math.atan2(end.z - start.z, end.x - start.x)
        ]}
      >
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.6} />
      </Cylinder>
    </group>
  )
}

function DataFlow({ from, to, nodes }: { from: string, to: string, nodes: ServiceNode[] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const fromNode = nodes.find(n => n.id === from)
  const toNode = nodes.find(n => n.id === to)
  
  useFrame((state) => {
    if (meshRef.current && fromNode && toNode) {
      const t = (Math.sin(state.clock.elapsedTime * 3) + 1) / 2
      const start = new THREE.Vector3(...fromNode.position)
      const end = new THREE.Vector3(...toNode.position)
      const current = new THREE.Vector3().lerpVectors(start, end, t)
      meshRef.current.position.copy(current)
    }
  })

  if (!fromNode || !toNode) return null

  return (
    <Sphere ref={meshRef} args={[0.05]}>
      <meshBasicMaterial color="#00FF88" />
    </Sphere>
  )
}

export function Scene({ selectedNode, onNodeSelect, isAnimating, showDataFlow }: {
  selectedNode: ServiceNode | null
  onNodeSelect: (node: ServiceNode) => void
  isAnimating: boolean
  showDataFlow: boolean
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 75 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3B82F6" />
        
        {/* Service Nodes */}
        {serviceNodes.map((node) => (
          <ServiceBox
            key={node.id}
            node={node}
            isSelected={selectedNode?.id === node.id}
            onClick={() => onNodeSelect(node)}
            isAnimating={isAnimating}
          />
        ))}
        
        {/* Connections */}
        {serviceNodes.map((node) =>
          node.connections.map((connectionId) => (
            <ConnectionLine
              key={`${node.id}-${connectionId}`}
              from={node.id}
              to={connectionId}
              nodes={serviceNodes}
            />
          ))
        )}
        
        {/* Data Flow Animation */}
        {showDataFlow && serviceNodes.map((node) =>
          node.connections.map((connectionId) => (
            <DataFlow
              key={`flow-${node.id}-${connectionId}`}
              from={node.id}
              to={connectionId}
              nodes={serviceNodes}
            />
          ))
        )}
        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={isAnimating}
          autoRotateSpeed={0.5}
        />
      </Suspense>
    </Canvas>
  )
}