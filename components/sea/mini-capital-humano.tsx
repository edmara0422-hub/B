'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import { Users } from 'lucide-react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function BrainParticles({ pressaoMetas }: { pressaoMetas: number }) {
  const groupRef = useRef<THREE.Group>(null)
  
  // Acelera a rotação conforme a pressão de metas aumenta
  const speed = 0.25 + pressaoMetas * 0.15

  // Cor transiciona de champagne gold para um âmbar quente caso o estresse passe de 6
  const isHighStress = pressaoMetas > 6
  const color = isHighStress ? '#e5af65' : '#d4b87a'

  // Gera partículas detalhadas distribuídas imitando lobos cerebrais e cerebelo
  const [positions, linePositions] = useMemo(() => {
    const pts: [number, number, number][] = []
    const countPerLobe = 100
    
    // Lobo esquerdo
    for (let i = 0; i < countPerLobe; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)
      const r = 0.35 + Math.random() * 0.45
      const x = r * Math.sin(phi) * Math.cos(theta) * 0.42 - 0.16
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.72
      const z = r * Math.cos(phi) * 0.42
      pts.push([x, y, z])
    }
    
    // Lobo direito
    for (let i = 0; i < countPerLobe; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)
      const r = 0.35 + Math.random() * 0.45
      const x = r * Math.sin(phi) * Math.cos(theta) * 0.42 + 0.16
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.72
      const z = r * Math.cos(phi) * 0.42
      pts.push([x, y, z])
    }
    
    // Cerebelo (base traseira inferior)
    const cerebellumCount = 45
    for (let i = 0; i < cerebellumCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)
      const r = 0.22 + Math.random() * 0.22
      const x = r * Math.sin(phi) * Math.cos(theta) * 0.35
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.35 - 0.38
      const z = r * Math.cos(phi) * 0.35 - 0.22
      pts.push([x, y, z])
    }

    const posArray = new Float32Array(pts.length * 3)
    pts.forEach((p, idx) => {
      posArray[idx * 3] = p[0]
      posArray[idx * 3 + 1] = p[1]
      posArray[idx * 3 + 2] = p[2]
    })

    // Fibras sinápticas (linhas que conectam nós próximos)
    const lines: number[] = []
    const maxDist = 0.25
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i][0] - pts[j][0]
        const dy = pts[i][1] - pts[j][1]
        const dz = pts[i][2] - pts[j][2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (dist < maxDist) {
          lines.push(...pts[i], ...pts[j])
        }
      }
    }

    return [posArray, new Float32Array(lines)]
  }, [])

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime()
    const currentSpeed = speed * 0.15
    if (groupRef.current) {
      // Rotação orbital
      groupRef.current.rotation.y = elapsed * currentSpeed
      groupRef.current.rotation.x = Math.sin(elapsed * 0.3) * 0.05
      
      // Pulso orgânico de respiração sináptica
      const breathing = 1.0 + Math.sin(elapsed * 1.5) * 0.03
      groupRef.current.scale.set(breathing, breathing, breathing)
    }
  })

  return (
    <group ref={groupRef}>
      {/* Neurônios / Partículas */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={color}
          size={0.038}
          sizeAttenuation
          transparent
          opacity={0.7}
        />
      </points>

      {/* Fibras Neurais de Conexão */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.16}
          linewidth={1}
        />
      </lineSegments>
    </group>
  )
}

export function MiniCapitalHumano() {
  const [pressaoMetas, setPressaoMetas] = useState(5)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleTelemetry = () => {
      const telemetry = (window as any).IPBTelemetry
      if (telemetry) {
        setPressaoMetas(telemetry.pressaoMetas ?? 5)
      }
    }

    handleTelemetry()

    window.addEventListener('ipb-telemetry', handleTelemetry)
    return () => window.removeEventListener('ipb-telemetry', handleTelemetry)
  }, [])

  const burnoutEEB = Math.round(Math.min(98, 5 + Math.pow(pressaoMetas, 2.1)))
  const turnoverAnual = Math.min(75, 10 + Math.pow(pressaoMetas, 1.8))
  const climaIndex = 100 - burnoutEEB

  return (
    <>
      {/* 3D WebGL Neural Background Canvas */}
      {mounted && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-45">
          <Canvas camera={{ position: [0, 0, 2.4], fov: 45 }}>
            <ambientLight intensity={1.5} />
            <BrainParticles pressaoMetas={pressaoMetas} />
          </Canvas>
        </div>
      )}

      <div className="live-tag relative z-10">
        <div className="dot" />
        <span>Pulse Surveys · Estresse · LIVE</span>
      </div>
      
      {/* Fallback Static SVG rings behind text only when not mounted yet */}
      {!mounted && (
        <div className="mini-bg-art">
          <Users size={48} strokeWidth={1} className="opacity-20" />
        </div>
      )}

      <div className="hud-vitals relative z-10 select-none">
        <div><span>Burnout EEB:</span><b>{burnoutEEB}%</b></div>
        <div><span>Turnover:</span><b>{Number(turnoverAnual).toFixed(0)}%</b></div>
        <div><span>Clima Index:</span><b>{climaIndex}/100</b></div>
      </div>
      
      <div className="title-area relative z-10 select-none">
        <span>Comportamento & ESG</span>
        <h2><div className="indicator-box" /> Cap. Humano</h2>
      </div>
      
      <div className="badge relative z-10 select-none">EEB {burnoutEEB}%</div>
    </>
  )
}
