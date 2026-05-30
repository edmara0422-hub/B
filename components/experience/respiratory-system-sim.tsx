'use client'

import { useEffect, useRef, useCallback, useState, useMemo } from 'react'
import { 
  Play, 
  Pause, 
  Wind, 
  Activity, 
  Eye, 
  Heart, 
  Sparkles,
  RefreshCw,
  Info
} from 'lucide-react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

/* ─────────────────────── types ─────────────────────── */

interface RespiratorySystemSimProps {
  className?: string
}

type AirwayPart = 'nose' | 'pharynx' | 'larynx' | 'trachea' | 'bronchi' | 'alveoli' | 'diaphragm' | 'lungs' | null
type ViewMode = 'all' | 'airway' | 'hematosis' | 'mechanics'

/* ─────────────────────── constants ─────────────────────── */

const COL_BG = '#040610' // Deep immersive biomedical blue-black
const COL_CONDUCT = 'rgba(45, 212, 191, 0.65)' // Teal
const COL_RESP = 'rgba(250, 204, 21, 0.65)' // Yellow
const COL_LUNG_STROKE = 'rgba(20, 184, 166, 0.5)' // Cyanish
const COL_DIAPHRAGM = 'rgba(244, 63, 94, 0.65)' // Coral Red

const PART_INFO: Record<string, { title: string; zone: string; desc: string; details: string[] }> = {
  nose: {
    title: 'Nariz e Cavidade Nasal',
    zone: 'Zona Condutora',
    desc: 'Filtra, aquece e umidifica o ar inspirado.',
    details: ['Pelos nasais (vibrissas) filtram partículas', 'Conchas nasais ↑ turbulência', 'Muco captura patógenos', 'Aquece o ar a 37°C antes do pulmão'],
  },
  pharynx: {
    title: 'Faringe',
    zone: 'Zona Condutora',
    desc: 'Via comum compartilhada para ar e alimento.',
    details: ['Nasofaringe (somente ar)', 'Orofaringe e Laringofaringe', 'Tecido linfóide (tonsilas faríngeas)', 'Úvula impede entrada de alimento na nasofaringe'],
  },
  larynx: {
    title: 'Laringe',
    zone: 'Zona Condutora',
    desc: 'Pregas vocais e epiglote (proteção das vias).',
    details: ['Cartilagem tireóidea (pomo de Adão)', 'Epiglote fecha na deglutição', 'Pregas vocais: fonação', 'Glote: abertura física de passagem'],
  },
  trachea: {
    title: 'Traqueia',
    zone: 'Zona Condutora',
    desc: '16-20 anéis cartilaginosos em C para suporte. Epitélio mucociliar.',
    details: ['Anéis de cartilagem hialina em C', 'Músculo traqueal na parte posterior', 'Cílios movem muco para a faringe', 'Espaço morto anatômico (~150 mL)'],
  },
  bronchi: {
    title: 'Brônquios e Bronquíolos',
    zone: 'Condutora → Respiratória',
    desc: '23 gerações de ramificação dicotômica até os alvéolos.',
    details: ['Brônquio D mais vertical e largo', 'Músculo liso substituindo cartilagem', '23 gerações de divisões', 'Bronquíolos: Ø < 1mm, muito responsivos'],
  },
  alveoli: {
    title: 'Alvéolos Pulmonares',
    zone: 'Zona Respiratória',
    desc: '300-500 milhões de alvéolos. Superfície total de ~70-100 m².',
    details: ['Pneumócito I: troca gasosa (hematose)', 'Pneumócito II: secreta surfactante', 'Membrana respiratória de 0,2 µm', 'Envolvidos por rede de capilares'],
  },
  diaphragm: {
    title: 'Diafragma',
    zone: 'Motor Primário',
    desc: 'Músculo esquelético principal da inspiração. Inervado pelo nervo frênico (C3-C5).',
    details: ['Contração → desce → ↑ volume torácico', 'Relaxamento → sobe → ↓ volume torácico', 'Responsável por 75% da ventilação', 'Inervação: Nervo Frênico (C3-C5)'],
  },
  lungs: {
    title: 'Pulmões',
    zone: 'Órgão Central',
    desc: 'Órgãos esponjosos e elásticos. Direito: 3 lobos. Esquerdo: 2 lobos + incisura cardíaca.',
    details: ['Pulmão D: sup/méd/inf (3 lobos)', 'Pulmão E: sup/inf (2 lobos)', 'Hilo: entrada de brônquios e vasos', 'Pleura visceral e parietal com líquido'],
  },
}

/* ─────────────────────── helpers ─────────────────────── */

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function inferPartFromName(name: string): AirwayPart {
  const n = name.toLowerCase()
  if (n.includes('trachea') || n.includes('traqueia')) return 'trachea'
  if (n.includes('bronch') || n.includes('bronqu')) return 'bronchi'
  if (n.includes('diaph') || n.includes('diafrag')) return 'diaphragm'
  return 'lungs'
}

/* ─────────────────────── subcomponents ─────────────────────── */

useGLTF.preload('/lungs.glb')

interface Lungs3DModelProps {
  respiratoryRate: number
  viewMode: ViewMode
  isPaused: boolean
  hoveredPart: AirwayPart
  selectedPart: AirwayPart
  setHoveredPart: (part: AirwayPart) => void
  setSelectedPart: (part: AirwayPart) => void
  onBreathUpdate: (inhale: boolean, volume: number, expand: number) => void
}

function Lungs3DModel({
  respiratoryRate,
  viewMode,
  isPaused,
  hoveredPart,
  selectedPart,
  setHoveredPart,
  setSelectedPart,
  onBreathUpdate,
}: Lungs3DModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/lungs.glb')
  
  const elapsedRef = useRef(0)
  const lastHudUpdateRef = useRef(0)

  // Standard flat shaders with vertex-colored wireframe overlays for premium hologram look
  const solidMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#060810',
    roughness: 1.0,
    metalness: 0.0,
    flatShading: true,
    emissive: new THREE.Color('#030810'),
    emissiveIntensity: 1.0,
  }), [])

  const edgeMat = useMemo(() => new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.88,
  }), [])

  // Clone and normalize 3D meshes to build normalized scene bounds
  const normScene = useMemo(() => {
    const root = scene.clone(true)
    const box = new THREE.Box3().setFromObject(root)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)

    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 2.8 / maxDim // normalized dimensions
    root.scale.setScalar(scale)
    root.position.sub(center.multiplyScalar(scale))

    // Position adjustment to center trachea in the viewport
    root.position.y += 0.38

    root.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return
      
      const geo = child.geometry.index ? child.geometry.toNonIndexed() : child.geometry
      geo.computeVertexNormals()
      child.geometry = geo
      child.material = solidMat.clone()

      // Wireframe overlay lines
      const edges = new THREE.EdgesGeometry(geo, 15)
      const pos = edges.attributes.position
      let minY = Infinity, maxY = -Infinity
      for (let v = 0; v < pos.count; v++) {
        const y = pos.getY(v)
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
      const rangeY = maxY - minY || 1
      const colors = new Float32Array(pos.count * 3)
      for (let v = 0; v < pos.count; v++) {
        const t = Math.pow((pos.getY(v) - minY) / rangeY, 0.55)
        // bottom = deep cyan (0.05, 0.70, 1.0) → top = white (1.0, 1.0, 1.0)
        colors[v*3]   = t * 0.95 + 0.05   // R
        colors[v*3+1] = t * 0.30 + 0.70   // G
        colors[v*3+2] = 1.0                // B
      }
      edges.setAttribute('color', new THREE.BufferAttribute(colors, 3))
      
      const edgeSegMat = edgeMat.clone()
      const seg = new THREE.LineSegments(edges, edgeSegMat)
      child.add(seg)
    })

    return root
  }, [scene, solidMat, edgeMat])

  const activePart = selectedPart || hoveredPart

  // Map viewMode to mesh transparency dynamically
  useEffect(() => {
    normScene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return
      
      const name = child.name.toLowerCase()
      let inferred: AirwayPart = 'lungs'
      if (name.includes('trachea')) inferred = 'trachea'
      else if (name.includes('bronch') || name.includes('bronqu')) inferred = 'bronchi'
      
      const isActive = activePart === inferred

      let opacity = 1.0
      let emissive = '#030810'
      let emissiveInt = 1.0

      if (viewMode === 'airway') {
        const isAir = inferred === 'trachea' || inferred === 'bronchi'
        opacity = isAir ? 1.0 : 0.06
        if (isAir) {
          emissive = isActive ? '#22d3ee' : '#0891b2'
          emissiveInt = isActive ? 3.0 : 1.5
        }
      } else if (viewMode === 'hematosis') {
        const isLungs = inferred === 'lungs'
        opacity = isLungs ? 1.0 : 0.06
        if (isLungs) {
          emissive = isActive ? '#38bdf8' : '#082f49'
          emissiveInt = isActive ? 2.5 : 1.0
        }
      } else if (viewMode === 'mechanics') {
        opacity = inferred === 'lungs' ? 0.35 : 0.06
      } else {
        // all
        opacity = 1.0
        if (isActive) {
          emissive = '#14b8a6'
          emissiveInt = 2.0
        }
      }

      if (child.material instanceof THREE.MeshStandardMaterial) {
        child.material.transparent = opacity < 1.0
        child.material.opacity = opacity
        child.material.emissive.set(new THREE.Color(emissive))
        child.material.emissiveIntensity = emissiveInt
        child.material.needsUpdate = true
      }

      child.children.forEach(sub => {
        if (sub instanceof THREE.LineSegments && sub.material instanceof THREE.LineBasicMaterial) {
          sub.material.transparent = true
          sub.material.opacity = opacity * 0.88
          sub.material.needsUpdate = true
        }
      })
    })
  }, [normScene, viewMode, activePart])

  useFrame((state) => {
    const delta = state.clock.getDelta()
    if (!isPaused) {
      elapsedRef.current += delta
    }

    const t = elapsedRef.current
    const period = 60 / respiratoryRate
    const ph = (t % period) / period

    // Physiological expansion calculations
    let expand = 0
    let isInhale = true
    if (ph < 0.45) {
      // Inhale
      const pt = ph / 0.45
      expand = easeInOut(pt) * 0.12
      isInhale = true
    } else if (ph < 0.50) {
      // Hold
      expand = 0.12
      isInhale = true
    } else if (ph < 0.95) {
      // Exhale
      const pt = (ph - 0.50) / 0.45
      expand = (1 - easeInOut(pt)) * 0.12
      isInhale = false
    } else {
      // Pause
      expand = 0
      isInhale = false
    }

    const volumeMl = Math.round(2400 + expand * 3750) // maps volume to 2400-6900 mL range

    // Scale lungs based on breathing expansion
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.04) * 0.05
      groupRef.current.rotation.x = Math.sin(t * 0.03) * 0.02
      
      const b = 1.0 + expand
      groupRef.current.scale.set(b * 1.05, 1.0 + expand * 0.4, b * 0.95)
    }

    // Trigger callback throttled to avoid React re-render flooding
    if (state.clock.getElapsedTime() - lastHudUpdateRef.current > 0.08) {
      lastHudUpdateRef.current = state.clock.getElapsedTime()
      onBreathUpdate(isInhale, volumeMl, expand)
    }
  })

  // Raycasting click and hover detection
  const handlePointerOver = useCallback((e: any) => {
    e.stopPropagation()
    const part = inferPartFromName(e.object.name)
    setHoveredPart(part)
  }, [setHoveredPart])

  const handlePointerOut = useCallback((e: any) => {
    e.stopPropagation()
    setHoveredPart(null)
  }, [setHoveredPart])

  const handleClick = useCallback((e: any) => {
    e.stopPropagation()
    const part = inferPartFromName(e.object.name)
    setSelectedPart(selectedPart === part ? null : part)
  }, [selectedPart, setSelectedPart])

  return (
    <group 
      ref={groupRef} 
      position={[0, -0.2, 0]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <primitive object={normScene} />
    </group>
  )
}

/* ── Upper Airway Floating Nodes & Ribs/Diaphragm ── */

interface LungsMechanicsProps {
  expand: number
  viewMode: ViewMode
  hoveredPart: AirwayPart
  selectedPart: AirwayPart
  setHoveredPart: (part: AirwayPart) => void
  setSelectedPart: (part: AirwayPart) => void
}

function LungsMechanics({
  expand,
  viewMode,
  hoveredPart,
  selectedPart,
  setHoveredPart,
  setSelectedPart,
}: LungsMechanicsProps) {
  
  const activePart = selectedPart || hoveredPart

  const getAlpha = (part: AirwayPart | 'ribs') => {
    if (viewMode === 'all') return 1.0
    if (viewMode === 'airway') {
      return (part === 'nose' || part === 'pharynx' || part === 'larynx') ? 1.0 : 0.0
    }
    if (viewMode === 'hematosis') {
      return (part === 'alveoli') ? 1.0 : 0.0
    }
    if (viewMode === 'mechanics') {
      return (part === 'diaphragm' || part === 'ribs') ? 1.0 : 0.0
    }
    return 1.0
  }

  return (
    <group>
      {/* 3D Nose / Nasal Cavity (Glowing wireframe cage) */}
      {getAlpha('nose') > 0.01 && (
        <group 
          position={[0, 1.75, 0.1]} 
          onPointerOver={(e) => { e.stopPropagation(); setHoveredPart('nose') }}
          onPointerOut={(e) => { e.stopPropagation(); setHoveredPart(null) }}
          onClick={(e) => { e.stopPropagation(); setSelectedPart(selectedPart === 'nose' ? null : 'nose') }}
        >
          <mesh scale={[0.15, 0.20, 0.20]}>
            <coneGeometry args={[1, 1.8, 4]} />
            <meshStandardMaterial 
              color={activePart === 'nose' ? '#22d3ee' : '#0d9488'} 
              transparent 
              opacity={activePart === 'nose' ? 0.8 : (viewMode === 'all' ? 0.35 : 0.05)}
              emissive={activePart === 'nose' ? '#22d3ee' : '#0f766e'}
              emissiveIntensity={activePart === 'nose' ? 2.5 : 0.8}
              wireframe
            />
          </mesh>
          <mesh position={[0, 0, 0.1]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshBasicMaterial color={activePart === 'nose' ? '#22d3ee' : '#0d9488'} />
          </mesh>
        </group>
      )}

      {/* 3D Pharynx (Glowing cylindrical vertical duct) */}
      {getAlpha('pharynx') > 0.01 && (
        <group 
          position={[0, 1.4, 0.02]} 
          onPointerOver={(e) => { e.stopPropagation(); setHoveredPart('pharynx') }}
          onPointerOut={(e) => { e.stopPropagation(); setHoveredPart(null) }}
          onClick={(e) => { e.stopPropagation(); setSelectedPart(selectedPart === 'pharynx' ? null : 'pharynx') }}
        >
          <mesh scale={[0.11, 0.40, 0.11]}>
            <cylinderGeometry args={[1, 0.9, 1, 16, 2, true]} />
            <meshStandardMaterial 
              color={activePart === 'pharynx' ? '#22d3ee' : '#14b8a6'} 
              transparent 
              opacity={activePart === 'pharynx' ? 0.75 : (viewMode === 'all' ? 0.32 : 0.05)}
              emissive={activePart === 'pharynx' ? '#22d3ee' : '#0f766e'}
              emissiveIntensity={activePart === 'pharynx' ? 2.2 : 0.6}
              wireframe
            />
          </mesh>
          <mesh position={[0, 0, 0.1]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshBasicMaterial color={activePart === 'pharynx' ? '#22d3ee' : '#0d9488'} />
          </mesh>
        </group>
      )}

      {/* 3D Larynx with movable Epiglottis and vibrating/opening Vocal Cords */}
      {getAlpha('larynx') > 0.01 && (
        <group 
          position={[0, 1.05, 0.0]} 
          onPointerOver={(e) => { e.stopPropagation(); setHoveredPart('larynx') }}
          onPointerOut={(e) => { e.stopPropagation(); setHoveredPart(null) }}
          onClick={(e) => { e.stopPropagation(); setSelectedPart(selectedPart === 'larynx' ? null : 'larynx') }}
        >
          <mesh scale={[0.14, 0.24, 0.14]}>
            <cylinderGeometry args={[1, 1, 1, 16, 1, true]} />
            <meshStandardMaterial 
              color={activePart === 'larynx' ? '#22d3ee' : '#0d9488'} 
              transparent 
              opacity={activePart === 'larynx' ? 0.8 : (viewMode === 'all' ? 0.38 : 0.05)}
              emissive={activePart === 'larynx' ? '#22d3ee' : '#0f766e'}
              emissiveIntensity={activePart === 'larynx' ? 2.4 : 0.6}
              wireframe
            />
          </mesh>

          {/* Epiglottis (3D active flap) */}
          <mesh 
            position={[0, 0.14, 0.05]} 
            rotation={[0.35 + expand * 0.45, 0, 0]} 
            scale={[0.11, 0.015, 0.15]}
          >
            <boxGeometry />
            <meshStandardMaterial 
              color="#facb20" 
              transparent 
              opacity={activePart === 'larynx' ? 0.85 : (viewMode === 'all' ? 0.55 : 0.05)}
              emissive="#b45309"
              emissiveIntensity={activePart === 'larynx' ? 2.0 : 0.5}
            />
          </mesh>

          {/* Vocal Cords (Pregas Vocais) opening/closing actively in 3D */}
          <mesh 
            position={[-0.025 - expand * 0.035, -0.05, 0.0]} 
            rotation={[0, 0, -0.2 - expand * 0.4]} 
            scale={[0.01, 0.07, 0.07]}
          >
            <boxGeometry />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.85} />
          </mesh>
          <mesh 
            position={[0.025 + expand * 0.035, -0.05, 0.0]} 
            rotation={[0, 0, 0.2 + expand * 0.4]} 
            scale={[0.01, 0.07, 0.07]}
          >
            <boxGeometry />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.85} />
          </mesh>

          <mesh position={[0, 0.06, 0.1]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshBasicMaterial color={activePart === 'larynx' ? '#22d3ee' : '#0d9488'} />
          </mesh>
        </group>
      )}

      {/* Alveolar functional cluster representation (Yellow spheres in hematosis mode) */}
      {getAlpha('alveoli') > 0.01 && Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const radius = 0.5 + Math.random() * 0.15
        const x = Math.cos(angle) * radius + (i % 2 === 0 ? 0.55 : -0.55)
        const y = -0.3 + Math.sin(angle) * 0.4
        const z = Math.sin(angle) * 0.25
        const alvScale = 1.0 + expand * 2.2
        return (
          <group key={i} position={[x, y, z]} scale={[alvScale, alvScale, alvScale]}>
            <mesh
              onPointerOver={(e) => { e.stopPropagation(); setHoveredPart('alveoli') }}
              onPointerOut={(e) => { e.stopPropagation(); setHoveredPart(null) }}
              onClick={(e) => { e.stopPropagation(); setSelectedPart(selectedPart === 'alveoli' ? null : 'alveoli') }}
            >
              <sphereGeometry args={[0.065, 8, 8]} />
              <meshStandardMaterial 
                color={activePart === 'alveoli' ? '#fbbf24' : '#d97706'} 
                emissive={activePart === 'alveoli' ? '#fbbf24' : '#b45309'} 
                emissiveIntensity={activePart === 'alveoli' ? 2.5 : 0.8}
                transparent 
                opacity={viewMode === 'all' ? 0.35 : (activePart === 'alveoli' ? 0.8 : 0.22)} 
              />
            </mesh>
          </group>
        )
      })}

      {/* 3D Diaphragm (Glowing hemi-sphere squashed dome) */}
      {getAlpha('diaphragm') > 0.01 && (
        <mesh 
          position={[0, -1.22 - expand * 0.25, -0.05]} 
          rotation={[Math.PI / 2, 0, 0]} 
          scale={[1.35, 0.95, 0.38]}
          onPointerOver={(e) => { e.stopPropagation(); setHoveredPart('diaphragm') }}
          onPointerOut={(e) => { e.stopPropagation(); setHoveredPart(null) }}
          onClick={(e) => { e.stopPropagation(); setSelectedPart(selectedPart === 'diaphragm' ? null : 'diaphragm') }}
        >
          <sphereGeometry args={[1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial 
            color="#f43f5e" 
            transparent 
            opacity={activePart === 'diaphragm' ? 0.72 : (viewMode === 'mechanics' ? 0.65 : 0.35)}
            emissive="#be123c"
            emissiveIntensity={activePart === 'diaphragm' ? 2.5 : 0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* 3D Rib Cage Ellipses */}
      {getAlpha('ribs') > 0.01 && Array.from({ length: 6 }).map((_, i) => {
        const ry = -1.0 + i * 0.36
        const scale = (1 + expand * 0.08) * (1 - Math.abs(i - 2.5) * 0.07)
        return (
          <mesh key={i} position={[0, ry, -0.05]} scale={[1.65 * scale, 0.1, 1.25 * scale]}>
            <torusGeometry args={[0.78, 0.012, 8, 32]} />
            <meshBasicMaterial 
              color="#38bdf8" 
              transparent 
              opacity={viewMode === 'mechanics' ? 0.32 : 0.20}
            />
          </mesh>
        )
      })}
    </group>
  )
}

/* ── Gas Flow Particles 3D Component ── */

interface FlowParticles3DProps {
  isInhale: boolean
  isPaused: boolean
  viewMode: ViewMode
  respiratoryRate: number
  expand: number
}

function FlowParticles3D({
  isInhale,
  isPaused,
  viewMode,
  respiratoryRate,
  expand,
}: FlowParticles3DProps) {
  const particleCount = 24
  
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }).map((_, i) => ({
      phase: Math.random(),
      speed: 0.012 + Math.random() * 0.016,
      type: i < 15 ? 'o2' : 'co2', // More oxygen representation
      side: i % 2 === 0 ? 'left' : 'right',
      wobble: Math.random() * 10,
      size: 0.025 + Math.random() * 0.015,
    }))
  }, [])

  const pointsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!pointsRef.current || isPaused) return
    const elapsed = state.clock.getElapsedTime()
    const rateFactor = respiratoryRate / 14

    pointsRef.current.children.forEach((child, i) => {
      const p = particles[i]
      
      // Advance phase based on direction
      if (p.type === 'o2') {
        p.phase += p.speed * 0.38 * rateFactor * (isInhale ? 2.2 : 0.4)
        if (p.phase > 1) p.phase = 0
      } else {
        p.phase += p.speed * 0.38 * rateFactor * (!isInhale ? 2.2 : 0.4)
        if (p.phase > 1) p.phase = 0
      }

      const t = p.type === 'o2' ? p.phase : (1 - p.phase)

      // Calculate path: Nose -> Pharynx -> Larynx -> Trachea -> Bronchi -> Lung lobes
      let x = 0
      let y = 1.75
      let z = 0

      if (t < 0.2) {
        // Nose to pharynx
        const pt = t / 0.2
        y = lerp(1.75, 1.4, pt)
        x = Math.sin(elapsed * 5 + p.wobble) * 0.03
      } else if (t < 0.4) {
        // pharynx to larynx
        const pt = (t - 0.2) / 0.2
        y = lerp(1.4, 1.05, pt)
        x = Math.sin(elapsed * 5 + p.wobble) * 0.03
      } else if (t < 0.6) {
        // larynx to trachea
        const pt = (t - 0.4) / 0.2
        y = lerp(1.05, 0.4, pt)
        x = Math.sin(elapsed * 5 + p.wobble) * 0.03
      } else if (t < 0.8) {
        // trachea to bronchi
        const pt = (t - 0.6) / 0.2
        y = lerp(0.4, -0.05, pt)
        x = lerp(0, p.side === 'left' ? -0.22 : 0.22, pt)
      } else {
        // bronchi to lungs
        const pt = (t - 0.8) / 0.2
        const lungExpansion = 1.0 + expand * 0.4
        y = lerp(-0.05, -0.65, pt)
        x = lerp(p.side === 'left' ? -0.22 : 0.22, p.side === 'left' ? -0.72 * lungExpansion : 0.72 * lungExpansion, pt)
        z = lerp(0, 0.08, pt)
      }

      // Wobble
      x += Math.sin(elapsed * 4 + p.wobble) * 0.04

      child.position.set(x, y, z)
    })
  })

  // Disable particles if view mode is strictly mechanics
  if (viewMode === 'mechanics') return null

  const getOpacity = (type: string) => {
    if (viewMode === 'all') return 0.8
    if (viewMode === 'airway') {
      return type === 'o2' ? 0.8 : 0.15
    }
    if (viewMode === 'hematosis') {
      return 0.8
    }
    return 0.8
  }

  return (
    <group ref={pointsRef}>
      {particles.map((p, i) => (
        <mesh key={i}>
          <sphereGeometry args={[p.size, 8, 8]} />
          <meshBasicMaterial 
            color={p.type === 'o2' ? '#22d3ee' : '#f43f5e'} 
            transparent 
            opacity={getOpacity(p.type)}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ─────────────────────── main component ─────────────────────── */

export function RespiratorySystemSim({ className }: RespiratorySystemSimProps) {
  const [hoveredPart, setHoveredPart] = useState<AirwayPart>(null)
  const [selectedPart, setSelectedPart] = useState<AirwayPart>(null)

  // Physiological Controls (No mechanical ventilation)
  const [respiratoryRate, setRespiratoryRate] = useState(14) // 12 to 30 rpm (physiological)
  const [viewMode, setViewMode] = useState<ViewMode>('all') // view filters
  const [isPaused, setIsPaused] = useState(false)
  const [liveVolume, setLiveVolume] = useState(2400)
  const [isInhale, setIsInhale] = useState(true)
  const [expandAmount, setExpandAmount] = useState(0)

  const handleReset = () => {
    setRespiratoryRate(14)
    setViewMode('all')
    setIsPaused(false)
    setSelectedPart(null)
    setHoveredPart(null)
  }

  // Throttled update from inside 3D simulation scene
  const handleBreathUpdate = useCallback((inhale: boolean, volume: number, expand: number) => {
    setIsInhale(inhale)
    setLiveVolume(volume)
    setExpandAmount(expand)
  }, [])

  const activePart = selectedPart || hoveredPart
  const info = activePart ? PART_INFO[activePart] : null

  const getAlpha = (part: AirwayPart) => {
    if (viewMode === 'all') return 1.0
    if (viewMode === 'airway') {
      return (part === 'nose' || part === 'pharynx' || part === 'larynx' || part === 'trachea' || part === 'bronchi') ? 1.0 : 0.08
    }
    if (viewMode === 'hematosis') {
      return (part === 'alveoli' || part === 'lungs') ? 1.0 : 0.08
    }
    if (viewMode === 'mechanics') {
      return (part === 'diaphragm' || part === 'lungs') ? 1.0 : 0.08
    }
    return 1.0
  }

  const hudLabels: { text: string; part: AirwayPart; color: string }[] = [
    { text: 'NARIZ E CAV. NASAL', part: 'nose', color: COL_CONDUCT },
    { text: 'FARINGE (VIA COMUM)', part: 'pharynx', color: COL_CONDUCT },
    { text: 'LARINGE (EPIGLOTE)', part: 'larynx', color: COL_CONDUCT },
    { text: 'TRAQUEIA (C-RINGS)', part: 'trachea', color: COL_CONDUCT },
    { text: 'BRÔNQUIOS / BRONQUÍOLOS', part: 'bronchi', color: COL_CONDUCT },
    { text: 'ALVÉOLOS (HEMATOSE)', part: 'alveoli', color: COL_RESP },
    { text: 'PULMÕES (D / E)', part: 'lungs', color: COL_LUNG_STROKE },
    { text: 'DIAFRAGMA (MOTOR INSP)', part: 'diaphragm', color: COL_DIAPHRAGM },
  ]

  return (
    <div 
      className={`relative rounded-2xl overflow-hidden bg-[#040610] border border-white/5 shadow-2xl flex flex-col justify-end ${className ?? ''}`}
      style={{ height: '340px', width: '100%' }}
    >
      
      {/* Canvas 3D (R3F) */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 4.2], fov: 38 }}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <ambientLight intensity={0.14} color="#050815" />
          <directionalLight position={[3, 8, 2]} intensity={9.0} color="#ffffff" />
          <directionalLight position={[0, 0, 6]} intensity={3.0} color="#ddf4ff" />
          <directionalLight position={[-2, 2, 4]} intensity={2.0} color="#88bbcc" />
          <pointLight position={[0, -5, -1]} intensity={20} color="#0088bb" distance={20} />
          
          <OrbitControls enableZoom={true} enablePan={true} maxPolarAngle={Math.PI / 2 + 0.1} minPolarAngle={0.2} />

          <Lungs3DModel 
            respiratoryRate={respiratoryRate}
            viewMode={viewMode}
            isPaused={isPaused}
            hoveredPart={hoveredPart}
            selectedPart={selectedPart}
            setHoveredPart={setHoveredPart}
            setSelectedPart={setSelectedPart}
            onBreathUpdate={handleBreathUpdate}
          />

          <LungsMechanics 
            expand={expandAmount}
            viewMode={viewMode}
            hoveredPart={hoveredPart}
            selectedPart={selectedPart}
            setHoveredPart={setHoveredPart}
            setSelectedPart={setSelectedPart}
          />

          <FlowParticles3D 
            isInhale={isInhale}
            isPaused={isPaused}
            viewMode={viewMode}
            respiratoryRate={respiratoryRate}
            expand={expandAmount}
          />
        </Canvas>
      </div>

      {/* 3D functional grid backdrop effect (HTML CSS Overlay) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(56,189,248,0.03),transparent)] z-0" />

      {/* Floating HUD Overlay Labels on top of 3D Scene */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-1.5 pointer-events-auto bg-[#040610]/70 backdrop-blur-md p-3 rounded-xl border border-white/5 max-w-[220px]">
        <span className="text-[7px] font-mono text-white/35 uppercase tracking-widest font-black mb-1 block leading-none">Estruturas Fisiológicas</span>
        {hudLabels.map(lbl => {
          const active = activePart === lbl.part
          const visible = getAlpha(lbl.part) > 0.1
          return (
            <button
              key={lbl.part}
              onClick={() => setSelectedPart(prev => prev === lbl.part ? null : lbl.part)}
              onMouseEnter={() => setHoveredPart(lbl.part)}
              onMouseLeave={() => setHoveredPart(null)}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-lg border text-left transition-all duration-150 cursor-pointer ${
                active 
                  ? 'bg-sky-500/15 border-sky-500/40 text-sky-400 font-bold shadow-[0_0_10px_rgba(56,189,248,0.1)]' 
                  : visible
                    ? 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10 hover:text-white'
                    : 'opacity-25 bg-transparent border-transparent text-white/30 hover:opacity-50'
              }`}
            >
              <div className="h-1.5 w-1.5 rounded-full shrink-0" style={{
                background: lbl.color,
                boxShadow: active ? `0 0 6px ${lbl.color}` : 'none'
              }} />
              <span className="text-[8px] font-mono tracking-wide uppercase truncate leading-none">{lbl.text}</span>
            </button>
          )
        })}
      </div>

      {/* Top-Left Sim Title */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none flex flex-col gap-1">
        <span className="text-[9px] font-mono font-black text-sky-400 block tracking-wider leading-none">PNEUMO.3D.HOLOGRAM</span>
        <span className="text-[7.5px] font-mono text-white/35 tracking-widest leading-none">▸ FISIOLOGIA ATIVA</span>
      </div>

      {/* Selected / Hovered anatomy information overlay (Floats on left, above Capacity Bar) */}
      {info && (
        <div className="absolute bottom-16 left-4 z-20 max-w-[280px] rounded-xl border border-sky-500/20 bg-[#040610]/95 backdrop-blur-md px-4 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="h-2 w-2 rounded-full shrink-0 animate-pulse" style={{
              background: info.zone.includes('Respiratória') ? COL_RESP
                : info.zone.includes('Motor') ? COL_DIAPHRAGM
                : info.zone.includes('Órgão') ? COL_LUNG_STROKE
                : COL_CONDUCT
            }} />
            <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider font-mono">{info.title}</span>
            <span className="text-[7.5px] font-mono text-white/40 ml-auto bg-white/5 px-1 py-0.5 rounded uppercase">{info.zone}</span>
          </div>
          <p className="text-[9px] text-white/60 mb-2 leading-relaxed font-sans">{info.desc}</p>
          <div className="flex flex-col gap-1 border-t border-white/5 pt-1.5">
            {info.details.map((d, i) => (
              <span key={i} className="text-[8px] font-mono text-sky-300/70 leading-tight">▸ {d}</span>
            ))}
          </div>
        </div>
      )}

      {/* Bottom-Left Live Ventilation Stats */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-none flex flex-col gap-1">
        <span className="text-[10px] font-mono font-bold leading-none" style={{
          color: isPaused ? '#ef4444' : (isInhale ? '#22d3ee' : '#f43f5e')
        }}>
          {isPaused ? 'SIMULAÇÃO PAUSADA' : (isInhale ? 'INSPIRAÇÃO (ATIVO)' : 'EXPIRAÇÃO (PASSIVO)')}
        </span>
        
        <div className="flex flex-col gap-1">
          <div className="w-[125px] h-1 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-75"
              style={{
                width: `${((liveVolume - 2400) / 4500) * 100}%`,
                background: isInhale ? 'rgba(34, 211, 238, 0.7)' : 'rgba(244, 63, 94, 0.6)'
              }}
            />
          </div>
          <span className="text-[8px] font-mono text-white/45 leading-none">Capacidade: {liveVolume} mL</span>
        </div>
      </div>

      {/* Modern Segmented Controller for Structure Filters */}
      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1 bg-[#040610]/75 backdrop-blur-md p-1 rounded-xl border border-white/5 shadow-2xl">
        {[
          { id: 'all', label: 'Tudo' },
          { id: 'airway', label: 'Condutora' },
          { id: 'hematosis', label: 'Respiratória' },
          { id: 'mechanics', label: 'Mecânica' }
        ].map((mode) => {
          const active = viewMode === mode.id
          return (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id as ViewMode)}
              className={`px-3 py-1.5 rounded-lg border text-[9px] font-mono tracking-wider font-bold transition-all duration-200 cursor-pointer ${
                active 
                  ? 'bg-sky-500/15 border-sky-500/35 text-sky-400 font-black shadow-[0_0_10px_rgba(56,189,248,0.15)]' 
                  : 'bg-transparent border-transparent text-white/50 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              {mode.label.toUpperCase()}
            </button>
          )
        })}
      </div>

    </div>
  )
}
