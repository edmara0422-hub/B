'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import { Globe } from 'lucide-react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Função auxiliar para criar a textura da Terra com continentes dourados procedurais
function createEarthTexture() {
  if (typeof window === 'undefined') return null
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  if (!ctx) return null
  
  // Preenche oceanos com preto profundo e acetinado
  ctx.fillStyle = '#08080a'
  ctx.fillRect(0, 0, 512, 256)
  
  // Desenha os continentes estilizados com a paleta Champagne Gold oficial do cockpit
  ctx.fillStyle = '#d4b87a'
  
  // América do Norte
  ctx.beginPath()
  ctx.moveTo(80, 45)
  ctx.lineTo(120, 35)
  ctx.lineTo(135, 55)
  ctx.lineTo(130, 85)
  ctx.lineTo(110, 95)
  ctx.lineTo(90, 80)
  ctx.closePath()
  ctx.fill()
  
  // América do Sul
  ctx.beginPath()
  ctx.moveTo(125, 98)
  ctx.lineTo(142, 115)
  ctx.lineTo(152, 135)
  ctx.lineTo(132, 180)
  ctx.lineTo(122, 220)
  ctx.lineTo(112, 180)
  ctx.lineTo(112, 125)
  ctx.closePath()
  ctx.fill()
  
  // Eurásia
  ctx.beginPath()
  ctx.moveTo(220, 45)
  ctx.lineTo(310, 30)
  ctx.lineTo(440, 40)
  ctx.lineTo(425, 95)
  ctx.lineTo(385, 120)
  ctx.lineTo(345, 100)
  ctx.lineTo(285, 110)
  ctx.lineTo(245, 85)
  ctx.closePath()
  ctx.fill()
  
  // África
  ctx.beginPath()
  ctx.moveTo(230, 105)
  ctx.lineTo(282, 100)
  ctx.lineTo(298, 125)
  ctx.lineTo(282, 165)
  ctx.lineTo(258, 200)
  ctx.lineTo(242, 165)
  ctx.lineTo(222, 120)
  ctx.closePath()
  ctx.fill()
  
  // Austrália
  ctx.beginPath()
  ctx.moveTo(395, 160)
  ctx.lineTo(435, 170)
  ctx.lineTo(425, 200)
  ctx.lineTo(390, 190)
  ctx.closePath()
  ctx.fill()
  
  // Antártida
  ctx.fillRect(0, 242, 512, 14)
  
  return new THREE.CanvasTexture(canvas)
}

export function StrategyGlobe({ cenario }: { cenario: string }) {
  const globeRef = useRef<THREE.Group>(null)
  const ringRef1 = useRef<THREE.LineLoop>(null)
  const ringRef2 = useRef<THREE.LineLoop>(null)
  const satRef1 = useRef<THREE.Group>(null)
  const satRef2 = useRef<THREE.Group>(null)
  
  const packetRef1 = useRef<THREE.Mesh>(null)
  const packetRef2 = useRef<THREE.Mesh>(null)

  // Satélites e órbitas giram mais rápido dependendo do boom tecnológico/mercado
  const speed = cenario === 'ia_boom' ? 1.5 : cenario === 'juros_altos' ? 0.6 : 1.0

  // Gera textura procedural da Terra com cache seguro
  const earthTexture = useMemo(() => createEarthTexture(), [])

  // Definição dos Arcos de Dados Globais (NY -> Londres, Tóquio -> Sydney)
  const [dataArcs, cities] = useMemo(() => {
    const list = []
    
    // Coordenadas esféricas de raio 0.72 para os arcos de dados
    const pairs = [
      { start: [0.72, 0, 0], end: [0, 0.72, 0] }, // NY -> Londres
      { start: [-0.5, 0.3, 0.4], end: [0.5, -0.3, 0.4] } // Tóquio -> Sydney
    ]
    
    const computedCities = pairs.map(p => {
      const pStart = new THREE.Vector3(...p.start)
      const pEnd = new THREE.Vector3(...p.end)
      const mid = new THREE.Vector3().addVectors(pStart, pEnd).multiplyScalar(0.5)
      const height = pStart.distanceTo(pEnd) * 0.35
      mid.normalize().multiplyScalar(0.72 + height) // Altura do arco Bezier
      
      const curve = new THREE.QuadraticBezierCurve3(pStart, mid, pEnd)
      const pts = curve.getPoints(20)
      const arr = new Float32Array(pts.length * 3)
      pts.forEach((pt, idx) => {
        arr[idx * 3] = pt.x
        arr[idx * 3 + 1] = pt.y
        arr[idx * 3 + 2] = pt.z
      })
      
      return {
        start: p.start,
        mid: [mid.x, mid.y, mid.z],
        end: p.end,
        positions: arr
      }
    })
    
    return [computedCities.map(c => c.positions), computedCities]
  }, [])

  // Formula do Bezier Quadrático sem gerar lixo
  const getBezierPoint = (t: number, p0: number[], p1: number[], p2: number[]) => {
    const omt = 1 - t
    const x = omt * omt * p0[0] + 2 * omt * t * p1[0] + t * t * p2[0]
    const y = omt * omt * p0[1] + 2 * omt * t * p1[1] + t * t * p2[1]
    const z = omt * omt * p0[2] + 2 * omt * t * p1[2] + t * t * p2[2]
    return [x, y, z]
  }

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime()
    const t = elapsed * speed

    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.12
      globeRef.current.rotation.x = Math.sin(t * 0.2) * 0.05
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.y = t * 0.16
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y = -t * 0.12
    }

    // Satélite 1: Órbita equatorial inclinada
    if (satRef1.current) {
      const orb1 = t * 0.4
      satRef1.current.position.x = Math.cos(orb1) * 1.2
      satRef1.current.position.z = Math.sin(orb1) * 1.2
      satRef1.current.position.y = Math.sin(orb1 * 0.5) * 0.3
      satRef1.current.rotation.y = -orb1
    }

    // Satélite 2: Órbita polar inclinada oposta
    if (satRef2.current) {
      const orb2 = -t * 0.3
      satRef2.current.position.x = Math.sin(orb2) * 1.3
      satRef2.current.position.y = Math.cos(orb2) * 1.3
      satRef2.current.position.z = Math.sin(orb2) * 0.2
      satRef2.current.rotation.z = orb2
    }

    // Fluxo de pacotes de dados
    const tArc = (elapsed * 0.6) % 1
    if (packetRef1.current) {
      const [x, y, z] = getBezierPoint(tArc, cities[0].start, cities[0].mid, cities[0].end)
      packetRef1.current.position.set(x, y, z)
    }
    if (packetRef2.current) {
      const [x, y, z] = getBezierPoint((tArc + 0.5) % 1, cities[1].start, cities[1].mid, cities[1].end)
      packetRef2.current.position.set(x, y, z)
    }
  })

  return (
    <group scale={1.2}>
      {/* 1. Globo Terrestre Procedural de Alta Fidelidade (Mockup NASA style) */}
      <group ref={globeRef}>
        {/* Esfera Realista da Terra */}
        <mesh>
          <sphereGeometry args={[0.72, 32, 32]} />
          {earthTexture ? (
            <meshStandardMaterial
              map={earthTexture}
              roughness={0.22}
              metalness={0.85}
            />
          ) : (
            <meshBasicMaterial color="#d4b87a" wireframe transparent opacity={0.18} />
          )}
        </mesh>
        
        {/* Anel Aramado Geodésico sutil por cima dos continentes */}
        <mesh scale={1.002}>
          <icosahedronGeometry args={[0.72, 3]} />
          <meshBasicMaterial
            color="#d4b87a"
            wireframe
            transparent
            opacity={0.06}
          />
        </mesh>
      </group>

      {/* Camada Fresnel / Brilho de Atmosfera */}
      <mesh scale={1.025}>
        <sphereGeometry args={[0.72, 32, 32]} />
        <meshBasicMaterial
          color="#d4b87a"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* 2. Anéis Orbitais de Dados de Alta Resolução */}
      <lineLoop ref={ringRef1} rotation={[0.6, 0.4, 0]}>
        <ringGeometry args={[1.05, 1.06, 48]} />
        <meshBasicMaterial color="#d4b87a" transparent opacity={0.25} side={THREE.DoubleSide} />
      </lineLoop>
      <lineLoop ref={ringRef2} rotation={[-0.5, -0.3, 0]}>
        <ringGeometry args={[1.15, 1.16, 48]} />
        <meshBasicMaterial color="#d4b87a" transparent opacity={0.15} side={THREE.DoubleSide} />
      </lineLoop>

      {/* 3. Arcos de Comunicação Bezier */}
      {dataArcs.map((arc, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[arc, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#d4b87a" transparent opacity={0.32} linewidth={1} />
        </line>
      ))}

      {/* Pacotes de Dados Flutuantes */}
      <mesh ref={packetRef1}>
        <sphereGeometry args={[0.02, 6, 6]} />
        <meshBasicMaterial color="#fff" />
      </mesh>
      <mesh ref={packetRef2}>
        <sphereGeometry args={[0.02, 6, 6]} />
        <meshBasicMaterial color="#fff" />
      </mesh>

      {/* 4. Satélite 1 (Corpo dourado e asas solares azul-NASA) */}
      <group ref={satRef1}>
        {/* Corpo do Satélite */}
        <mesh>
          <boxGeometry args={[0.05, 0.05, 0.05]} />
          <meshBasicMaterial color="#d4b87a" />
        </mesh>
        {/* Painel Solar Esquerdo */}
        <mesh position={[-0.08, 0, 0]}>
          <boxGeometry args={[0.09, 0.025, 0.004]} />
          <meshBasicMaterial color="#60a5fa" transparent opacity={0.85} />
        </mesh>
        {/* Painel Solar Direito */}
        <mesh position={[0.08, 0, 0]}>
          <boxGeometry args={[0.09, 0.025, 0.004]} />
          <meshBasicMaterial color="#60a5fa" transparent opacity={0.85} />
        </mesh>
      </group>

      {/* 5. Satélite 2 */}
      <group ref={satRef2}>
        <mesh>
          <boxGeometry args={[0.04, 0.04, 0.04]} />
          <meshBasicMaterial color="#fff" />
        </mesh>
        <mesh position={[0, 0.07, 0]}>
          <boxGeometry args={[0.022, 0.08, 0.004]} />
          <meshBasicMaterial color="#60a5fa" transparent opacity={0.7} />
        </mesh>
        <mesh position={[0, -0.07, 0]}>
          <boxGeometry args={[0.022, 0.08, 0.004]} />
          <meshBasicMaterial color="#60a5fa" transparent opacity={0.7} />
        </mesh>
      </group>
    </group>
  )
}

export function MiniEstrategia() {
  const [cenario, setCenario] = useState<'normal' | 'juros_altos' | 'ia_boom'>('normal')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleTelemetry = () => {
      const telemetry = (window as any).IPBTelemetry
      if (telemetry) {
        setCenario(telemetry.cenario ?? 'normal')
      }
    }

    handleTelemetry()

    window.addEventListener('ipb-telemetry', handleTelemetry)
    return () => window.removeEventListener('ipb-telemetry', handleTelemetry)
  }, [])

  const selic = cenario === 'juros_altos' ? 15.50 : 14.40
  const ipca = 4.39
  const politicoScore = cenario === 'juros_altos' ? 30 : 55
  const economicoScore = cenario === 'juros_altos' ? 20 : 45
  const socialScore = cenario === 'ia_boom' ? 88 : 65
  const tecnologicoScore = cenario === 'ia_boom' ? 98 : 80
  const ecol_legalScore = 75
  const averagePestel = Math.round((politicoScore + economicoScore + socialScore + tecnologicoScore + ecol_legalScore) / 5)

  return (
    <>
      {/* 3D WebGL Strategy Globe Background Canvas */}
      {mounted && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-45">
          <Canvas camera={{ position: [0, 0, 2.2], fof: 45 } as any}>
            <ambientLight intensity={1.5} />
            <StrategyGlobe cenario={cenario} />
          </Canvas>
        </div>
      )}

      <div className="live-tag relative z-10">
        <div className="dot" />
        <span>PESTEL Index · Real-Time · LIVE</span>
      </div>
      
      {/* Fallback Static SVG rings behind text only when not mounted yet */}
      {!mounted && (
        <div className="mini-bg-art">
          <Globe size={48} strokeWidth={1} className="opacity-20" />
        </div>
      )}

      <div className="hud-vitals relative z-10 select-none">
        <div><span>SELIC:</span><b>{Number(selic).toFixed(2)}%</b></div>
        <div><span>IPCA:</span><b>{Number(ipca).toFixed(2)}%</b></div>
        <div><span>PESTEL:</span><b>{averagePestel}%</b></div>
      </div>
      
      <div className="title-area relative z-10 select-none">
        <span>Ambiente & Tendências</span>
        <h2><div className="indicator-box" /> Estratégia</h2>
      </div>
      
      <div className="badge relative z-10 select-none">SELIC {Number(selic).toFixed(1)}%</div>
    </>
  )
}
