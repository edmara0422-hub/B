'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function EsgShield() {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)

  // Altura de subida dos detritos dourados
  const speed = 1.0

  // Gera o escudo de compliance via Extrude Shape
  const shieldGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, 0.42)
    shape.quadraticCurveTo(0.22, 0.42, 0.3, 0.2)
    shape.quadraticCurveTo(0.3, -0.15, 0, -0.42)
    shape.quadraticCurveTo(-0.3, -0.15, -0.3, 0.2)
    shape.quadraticCurveTo(-0.22, 0.42, 0, 0.42)

    const extrudeSettings = {
      depth: 0.04,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.015,
      bevelThickness: 0.015
    }
    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    geom.center() // Alinha o centro ao ponto local (0,0,0)
    return geom
  }, [])

  // Gera 50 micro-partículas de poeira de ouro flutuando dentro de um cilindro virtual
  const particlesPos = useMemo(() => {
    const temp = []
    for (let i = 0; i < 50; i++) {
      const theta = Math.random() * Math.PI * 2
      const r = 0.5 + Math.random() * 0.5
      temp.push(
        Math.cos(theta) * r,
        (Math.random() - 0.5) * 1.6, // Coordenada Y
        Math.sin(theta) * r
      )
    }
    return new Float32Array(temp)
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      // Flutuação harmônica vertical e rotação suave
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.06
      groupRef.current.rotation.y = t * 0.18
      groupRef.current.rotation.z = Math.sin(t * 0.45) * 0.04
    }
    if (particlesRef.current) {
      const posAttr = particlesRef.current.geometry.attributes.position
      const positions = posAttr.array as Float32Array
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += 0.0028 * speed // Velocidade de subida gradual
        if (positions[i] > 0.85) {
          positions[i] = -0.85 // Reseta na base
        }
      }
      posAttr.needsUpdate = true
    }
  })

  return (
    <group scale={1.25}>
      {/* Grupo Principal Flutuante (Escudo + Folhas) */}
      <group ref={groupRef}>
        {/* Camada Refrativa Principal - Glassmorphism */}
        <mesh geometry={shieldGeometry}>
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.35}
            roughness={0.12}
            metalness={0.05}
            transmission={0.9} // Transmissão de vidro translúcido refrativo
            thickness={0.15}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
          />
        </mesh>
        
        {/* Contorno Dourado Estilizado do Escudo */}
        <mesh geometry={shieldGeometry} scale={0.93}>
          <meshBasicMaterial
            color="#d4b87a"
            wireframe
            transparent
            opacity={0.22}
          />
        </mesh>

        {/* Três Folhas Metálicas Douradas Flutuantes (Representando a sustentabilidade) */}
        {/* Folha Esquerda */}
        <group position={[-0.09, 0.04, 0.03]} rotation={[0.2, -0.3, 0.35]}>
          <mesh>
            <coneGeometry args={[0.035, 0.12, 4]} />
            <meshStandardMaterial color="#d4b87a" metalness={0.95} roughness={0.2} />
          </mesh>
        </group>
        {/* Folha Direita */}
        <group position={[0.09, 0.04, 0.03]} rotation={[0.2, 0.3, -0.35]}>
          <mesh>
            <coneGeometry args={[0.035, 0.12, 4]} />
            <meshStandardMaterial color="#d4b87a" metalness={0.95} roughness={0.2} />
          </mesh>
        </group>
        {/* Folha Central */}
        <group position={[0, 0.12, 0.03]} rotation={[0.1, 0, 0]}>
          <mesh>
            <coneGeometry args={[0.04, 0.14, 4]} />
            <meshStandardMaterial color="#d4b87a" metalness={0.95} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* 2. Anéis Orbitais de Proteção */}
      <lineLoop rotation={[Math.PI / 2.2, 0.25, 0]}>
        <ringGeometry args={[1.05, 1.06, 36]} />
        <meshBasicMaterial color="#d4b87a" transparent opacity={0.22} side={THREE.DoubleSide} />
      </lineLoop>
      <lineLoop rotation={[Math.PI / -2.4, -0.2, 0]}>
        <ringGeometry args={[1.15, 1.16, 36]} />
        <meshBasicMaterial color="#d4b87a" transparent opacity={0.12} side={THREE.DoubleSide} />
      </lineLoop>

      {/* 3. Poeira Cósmica Flutuante Dourada */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlesPos, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#d4b87a"
          size={0.032}
          transparent
          opacity={0.6}
        />
      </points>
    </group>
  )
}

export function MiniEsg() {
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

  // Índice de Compliance dinâmico afetado pelo estresse de metas da equipe
  const complianceScore = Math.max(70, Math.round(98 - pressaoMetas * 2.8))

  return (
    <>
      {/* 3D WebGL Compliance Shield Background Canvas */}
      {mounted && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-45">
          <Canvas camera={{ position: [0, 0, 2.2], fov: 45 }}>
            <ambientLight intensity={1.5} />
            <EsgShield />
          </Canvas>
        </div>
      )}

      <div className="header-esg relative z-10 select-none">
        <div className="seal">✦</div>
        <div>
          <span>Compliance &amp; ESG</span>
          <b>Sustentabilidade <em>&amp; Gov</em></b>
        </div>
      </div>
      
      <div className="relative z-10 flex flex-col justify-center gap-1.5 my-3" style={{ flex: 1 }}>
        <div className="text-center p-2.5 rounded-xl border border-white/5 bg-black/40 backdrop-blur-md select-none">
          <span className="text-[7.5px] uppercase tracking-wider text-white/35">Compliance Index</span>
          <div className="text-[20px] font-extrabold text-white leading-none mt-1 font-mono">{complianceScore}%</div>
          <span className="text-[8.5px] text-[#d4b87a] mt-0.5 block leading-none font-medium">Auditado 6D · OK</span>
        </div>
      </div>
      
      <div className="ods-row relative z-10 select-none">
        <span><b>03</b>Saúde</span>
        <span><b>04</b>Educ.</span>
        <span><b>09</b>Inov.</span>
      </div>
      
      <div className="features-strip relative z-10 select-none">
        <div className="feat-pill gold"><div className="d" />Offline-First</div>
        <div className="feat-pill gold"><div className="d" />Pegada digital</div>
      </div>
    </>
  )
}
