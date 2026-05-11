'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Sparkles, AdaptiveDpr, AdaptiveEvents, PerformanceMonitor } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

/**
 * VineCanvas — fundo 3D do kit IPB.
 * 3 camadas de estrelas em profundidades diferentes + estrelas brilhantes em primeiro plano
 * + sparkles flutuantes + vinhas em espiral + post-processing (bloom + vignette).
 * Mouse follow leve (paralax). PerformanceMonitor auto-ajusta qualidade conforme FPS.
 *
 * Pesa mais que o IpbBackground — carrega via dynamic import com ssr:false.
 */

function useMouse() {
  const m = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const h = (e: MouseEvent) => {
      m.current.x = (e.clientX / window.innerWidth) * 2 - 1
      m.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', h, { passive: true })
    return () => window.removeEventListener('mousemove', h)
  }, [])
  return m
}

function CameraRig() {
  const { camera } = useThree()
  const m = useMouse()
  useFrame((_, d) => {
    camera.position.x += (m.current.x * 1.2 - camera.position.x) * d * 0.6
    camera.position.y += (m.current.y * 0.8 - camera.position.y) * d * 0.6
    camera.lookAt(0, 0, 0)
  })
  return null
}

function StarLayer({ count, spread, zRange, size, speed, opacity }: {
  count: number
  spread: number
  zRange: [number, number]
  size: number
  speed: number
  opacity: number
}) {
  const ref = useRef<THREE.Points>(null)
  const pos = useMemo(() => {
    const a = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * spread
      a[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6
      a[i * 3 + 2] = zRange[0] + Math.random() * (zRange[1] - zRange[0])
    }
    return a
  }, [count, spread, zRange])
  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.y += d * speed
      ref.current.rotation.x += d * speed * 0.4
    }
  })
  return (
    <Points ref={ref} positions={pos} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#ffffff" size={size} sizeAttenuation depthWrite={false} opacity={opacity} />
    </Points>
  )
}

function BrightStars() {
  const ref = useRef<THREE.Points>(null)
  const pos = useMemo(() => {
    const a = new Float32Array(120 * 3)
    for (let i = 0; i < 120; i++) {
      a[i * 3] = (Math.random() - 0.5) * 50
      a[i * 3 + 1] = (Math.random() - 0.5) * 30
      a[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return a
  }, [])
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d * 0.003 })
  return (
    <Points ref={ref} positions={pos} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#ffffff" size={0.12} sizeAttenuation depthWrite={false} opacity={0.9} />
    </Points>
  )
}

function VineTendrils() {
  const ref = useRef<THREE.Group>(null)
  const geo = useMemo(() => {
    const seg: number[] = []
    for (let t = 0; t < 6; t++) {
      const a = (t / 6) * Math.PI * 2
      const pts = Array.from({ length: 24 }, (_, j) => {
        const s = j / 23
        return new THREE.Vector3(
          Math.cos(a + s * 1.4) * (0.1 + s * 2.8),
          s * 6 - 3,
          Math.sin(a + s * 1.4) * (0.1 + s * 2.8),
        )
      })
      const curve = new THREE.CatmullRomCurve3(pts)
      const p = curve.getPoints(36)
      for (let i = 0; i < p.length - 1; i++) {
        seg.push(p[i].x, p[i].y, p[i].z, p[i + 1].x, p[i + 1].y, p[i + 1].z)
      }
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(seg, 3))
    return g
  }, [])
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d * 0.010 })
  return (
    <group ref={ref}>
      <lineSegments geometry={geo}>
        <lineBasicMaterial color="#0d0d0d" transparent opacity={0.4} />
      </lineSegments>
    </group>
  )
}

function Scene({ tier }: { tier: 'high' | 'mid' | 'low' }) {
  return (
    <>
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.01} />
      <CameraRig />
      <StarLayer count={tier === 'high' ? 3000 : 1800} spread={80} zRange={[-60, -20]} size={0.018} speed={0.002} opacity={0.55} />
      <StarLayer count={tier === 'high' ? 800 : 500} spread={55} zRange={[-20, 0]} size={0.035} speed={0.004} opacity={0.7} />
      <StarLayer count={200} spread={30} zRange={[0, 8]} size={0.055} speed={0.007} opacity={0.85} />
      <BrightStars />
      {tier !== 'low' && (
        <Sparkles count={60} scale={18} size={1.6} speed={0.15} opacity={0.55} color="#ffffff" />
      )}
      <VineTendrils />
      {tier !== 'low' && (
        <EffectComposer multisampling={tier === 'high' ? 4 : 0}>
          <Bloom intensity={1.4} luminanceThreshold={0.5} luminanceSmoothing={0.9} mipmapBlur radius={0.8} />
          <Vignette offset={0.2} darkness={0.85} />
        </EffectComposer>
      )}
    </>
  )
}

export default function VineCanvas() {
  const [dpr, setDpr] = useState(1.5)
  const [tier, setTier] = useState<'high' | 'mid' | 'low'>('high')

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 55 }}
        gl={{
          antialias: tier === 'high',
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          stencil: false,
          depth: true,
        }}
        style={{ background: '#000000' }}
        dpr={dpr}
      >
        <PerformanceMonitor
          bounds={() => [40, 60]}
          onIncline={() => { setDpr((d) => Math.min(2, d + 0.25)); setTier('high') }}
          onDecline={() => { setDpr((d) => Math.max(0.75, d - 0.25)); setTier((t) => t === 'high' ? 'mid' : 'low') }}
          flipflops={3}
          onFallback={() => { setDpr(0.75); setTier('low') }}
        />
        <AdaptiveDpr pixelated={false} />
        <AdaptiveEvents />
        <Scene tier={tier} />
      </Canvas>
    </div>
  )
}
