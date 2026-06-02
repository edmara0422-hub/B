'use client'

import { motion } from 'framer-motion'
import { GlassCard } from './glass-card'
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts'
import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Mock VM data
const vmData = [
  { time: 0, pressure: 5, volume: 0, flow: 50 },
  { time: 1, pressure: 20, volume: 200, flow: 40 },
  { time: 2, pressure: 25, volume: 400, flow: 10 },
  { time: 3, pressure: 22, volume: 450, flow: -20 },
  { time: 4, pressure: 10, volume: 300, flow: -40 },
  { time: 5, pressure: 5, volume: 100, flow: -30 },
  { time: 6, pressure: 5, volume: 0, flow: 0 },
]

// 3D Procedural Holographic Brain Particle Mesh Component
function HolographicBrain({ activeColor = '#d2af5a' }: { activeColor?: string }) {
  const pointsRef = useRef<THREE.Points>(null)
  const groupRef = useRef<THREE.Group>(null)

  // Procedural 3D vertex generation representing a 6D neural brain hemisphere structure
  const [particles, connections] = useMemo(() => {
    const pts = []
    const conn = []
    const numPoints = 280

    for (let i = 0; i < numPoints; i++) {
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      
      // Deformation algorithm to sculpt a double-lobed brain structure
      const isLeft = theta > Math.PI
      const lobeSeparation = isLeft ? -0.18 : 0.18
      const r = 1.0 + Math.sin(theta * 2.0) * 0.15 + Math.cos(phi * 3.0) * 0.1
      
      const x = r * Math.sin(phi) * Math.cos(theta) * 0.72 + lobeSeparation
      const y = r * Math.sin(phi) * Math.sin(theta) * 1.0 // vertical lobe elongation
      const z = r * Math.cos(phi) * 0.65 // horizontal width

      pts.push(new THREE.Vector3(x, y, z))
    }

    // Connect near nodes to represent neural synapses
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < 0.38 && Math.random() > 0.76) {
          conn.push([pts[i], pts[j]])
        }
      }
    }

    return [pts, conn]
  }, [])

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime()
    
    // Slow rotational telemetry and heartbeat oscillation
    if (groupRef.current) {
      groupRef.current.rotation.y = elapsed * 0.22
      groupRef.current.rotation.x = Math.sin(elapsed * 0.1) * 0.08
    }

    // Wave-like animation of individual neural points
    if (pointsRef.current) {
      const geo = pointsRef.current.geometry
      const pos = geo.attributes.position
      
      for (let i = 0; i < particles.length; i++) {
        const offset = Math.sin(elapsed * 2.0 + particles[i].x * 3.0) * 0.02
        pos.setY(i, particles[i].y + offset)
      }
      pos.needsUpdate = true
    }
  })

  // Format array for three.js buffer attributes
  const positionsArr = useMemo(() => {
    const arr = new Float32Array(particles.length * 3)
    particles.forEach((p, idx) => {
      arr[idx * 3] = p.x
      arr[idx * 3 + 1] = p.y
      arr[idx * 3 + 2] = p.z
    })
    return arr
  }, [particles])

  return (
    <group ref={groupRef}>
      {/* Interactive Glowing Core */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color={activeColor} transparent opacity={0.16} wireframe />
      </mesh>

      {/* Glowing neural particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positionsArr, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={activeColor}
          size={0.038}
          sizeAttenuation={true}
          transparent
          opacity={0.88}
        />
      </points>

      {/* Glowing neural synaptic connection lines */}
      {connections.map((line, idx) => (
        <line key={idx}>
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([
                line[0].x, line[0].y, line[0].z,
                line[1].x, line[1].y, line[1].z
              ]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={activeColor}
            transparent
            opacity={0.18}
            linewidth={0.5}
          />
        </line>
      ))}
    </group>
  )
}

// 3D Canvas visualizer wrapper (with SSR safety check)
function Brain3DVisual({ activeColor = '#d2af5a' }: { activeColor?: string }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full aspect-square max-w-[200px] mx-auto flex items-center justify-center bg-black/40 border border-white/5 rounded-2xl relative select-none">
        <span className="text-[7.5px] font-mono text-white/20 uppercase tracking-widest animate-pulse">
          Carregando Telemetria 3D...
        </span>
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-square max-w-[200px] mx-auto bg-black/30 border border-white/5 rounded-2xl overflow-hidden select-none">
      
      {/* Dynamic Gold Radial Glow behind the canvas */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(210,175,90,0.05),transparent_70%)] pointer-events-none" />

      <Canvas camera={{ position: [0, 0, 2.6], fov: 50 }} className="relative z-10 w-full h-full">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <HolographicBrain activeColor={activeColor} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>

      {/* Grid overlay markers styled like space systems */}
      <div className="absolute top-2 right-2 border border-white/10 bg-black/60 text-[6.5px] font-mono text-white/40 px-1.5 py-0.5 rounded uppercase tracking-widest pointer-events-none">
        Active 6D Hologram
      </div>
      
      <div className="absolute bottom-2 left-2 text-[6.5px] font-mono text-white/30 uppercase tracking-widest pointer-events-none">
        SYS_BRAIN_MESH_PROJ
      </div>
    </div>
  )
}

// VM Charts mini component
function VMCharts() {
  return (
    <div className="mt-4 pt-4 border-t border-white/5 select-none">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] tracking-wider text-silver-light/60 uppercase">Mechanical Ventilation (VM)</span>
        <div className="flex gap-3 text-[8px] text-silver-light/50">
          <span>FR: <span className="text-white">14</span></span>
          <span>Vol: <span className="text-white">450</span></span>
          <span>FIO2: <span className="text-white">40%</span></span>
          <span>PEEP: <span className="text-white">8</span></span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {/* Pressure */}
        <div className="h-12">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={vmData}>
              <YAxis hide domain={[0, 30]} />
              <Line
                type="monotone"
                dataKey="pressure"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth={1}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-[7px] text-silver-light/40 text-center mt-0.5 font-mono">Pressao</p>
        </div>
        
        {/* Volume */}
        <div className="h-12">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={vmData}>
              <YAxis hide domain={[0, 500]} />
              <Line
                type="monotone"
                dataKey="volume"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth={1}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-[7px] text-silver-light/40 text-center mt-0.5 font-mono">Volume</p>
        </div>
        
        {/* Flow */}
        <div className="h-12">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={vmData}>
              <YAxis hide domain={[-50, 60]} />
              <Line
                type="monotone"
                dataKey="flow"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth={1}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-[7px] text-silver-light/40 text-center mt-0.5 font-mono">Fluxo</p>
        </div>
      </div>
    </div>
  )
}

export function BioneuralPanel() {
  return (
    <GlassCard className="p-4 relative overflow-hidden">
      <div className="flex items-center justify-between mb-3 select-none">
        <h3 className="text-xs tracking-wider text-silver-light/80 uppercase font-medium">
          Analise Bioneural (6D)
        </h3>
      </div>
      
      <Brain3DVisual />
      <VMCharts />
    </GlassCard>
  )
}
