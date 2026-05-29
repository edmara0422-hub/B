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
import { useGLTF } from '@react-three/drei'
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
      groupRef.current.rotation.y = 1.57 + Math.sin(t * 0.08) * 0.05
      groupRef.current.rotation.x = Math.sin(t * 0.06) * 0.02
      
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

  // Floating Upper Airway Nodes
  const renderFloatingNode = (part: AirwayPart, y: number, z: number, color: string, activeColor: string) => {
    const isNodeActive = activePart === part
    const opacity = getAlpha(part)
    if (opacity <= 0.01) return null

    return (
      <mesh
        position={[0, y, z]}
        onPointerOver={(e) => { e.stopPropagation(); setHoveredPart(part) }}
        onPointerOut={(e) => { e.stopPropagation(); setHoveredPart(null) }}
        onClick={(e) => { e.stopPropagation(); setSelectedPart(selectedPart === part ? null : part) }}
      >
        <sphereGeometry args={[0.075, 16, 16]} />
        <meshStandardMaterial 
          color={isNodeActive ? activeColor : color}
          emissive={isNodeActive ? activeColor : color}
          emissiveIntensity={isNodeActive ? 3.0 : 0.8}
          transparent
          opacity={opacity * 0.9}
        />
      </mesh>
    )
  }

  return (
    <group>
      {/* Upper Airway Nodes */}
      {renderFloatingNode('nose', 1.75, 0.05, '#0d9488', '#22d3ee')}
      {renderFloatingNode('pharynx', 1.4, 0.05, '#0d9488', '#22d3ee')}
      {renderFloatingNode('larynx', 1.05, 0.05, '#0d9488', '#22d3ee')}

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
                opacity={0.8} 
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
            opacity={activePart === 'diaphragm' ? 0.72 : (viewMode === 'mechanics' ? 0.42 : 0.08)}
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
              opacity={viewMode === 'mechanics' ? 0.32 : 0.08}
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
    <div className={`flex flex-col lg:flex-row gap-4 h-full w-full min-h-0 ${className ?? ''}`}>
      
      {/* ── Left main 3D WebGL simulation screen ── */}
      <div className="relative flex-1 min-h-[450px] rounded-2xl overflow-hidden bg-[#040610] border border-white/5 shadow-2xl flex flex-col justify-end">
        
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

        {/* Bottom-Left Live Ventilation Stats */}
        <div className="absolute bottom-4 left-4 z-10 pointer-events-none flex flex-col gap-1.5">
          <span className="text-[12px] font-mono font-black leading-none" style={{
            color: isPaused ? '#ef4444' : (isInhale ? '#22d3ee' : '#f43f5e')
          }}>
            {isPaused ? 'SIMULAÇÃO PAUSADA' : (isInhale ? 'INSPIRAÇÃO (ATIVO)' : 'EXPIRAÇÃO (PASSIVO)')}
          </span>
          
          <div className="flex flex-col gap-1">
            <div className="w-[125px] h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-75"
                style={{
                  width: `${((liveVolume - 2400) / 4500) * 100}%`,
                  background: isInhale ? 'rgba(34, 211, 238, 0.7)' : 'rgba(244, 63, 94, 0.6)'
                }}
              />
            </div>
            <span className="text-[8.5px] font-mono text-white/50 leading-none">Capacidade: {liveVolume} mL</span>
          </div>
        </div>

        {/* Selected / Hovered anatomy information overlay */}
        {info && (
          <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/10 bg-black/85 backdrop-blur-md px-4 py-3 pointer-events-none z-20">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-2 w-2 rounded-full shrink-0" style={{
                background: info.zone.includes('Respiratória') ? COL_RESP
                  : info.zone.includes('Motor') ? COL_DIAPHRAGM
                  : info.zone.includes('Órgão') ? COL_LUNG_STROKE
                  : COL_CONDUCT
              }} />
              <span className="text-[11px] font-semibold text-white/90 uppercase tracking-wider">{info.title}</span>
              <span className="text-[9px] text-white/40 ml-1">{info.zone}</span>
            </div>
            <p className="text-[10px] text-white/50 mb-1 leading-relaxed">{info.desc}</p>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5">
              {info.details.map((d, i) => (
                <span key={i} className="text-[9px] text-white/35">▸ {d}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Right control board (View Filters & Physiological Rhythm) ── */}
      <div className="w-full lg:w-80 flex flex-col gap-4 p-4 rounded-2xl bg-black/55 border border-white/5 backdrop-blur-xl shrink-0 overflow-y-auto max-h-full">
        <div className="border-b border-white/[0.06] pb-2.5">
          <span className="text-[8px] uppercase tracking-[0.2em] font-black text-sky-400 block mb-0.5">FILTROS & CONTROLES</span>
          <h4 className="text-[12px] font-bold text-white/90 font-sans tracking-wide">Anatomofisiologia Respiratória</h4>
        </div>

        {/* View Mode Filters */}
        <div className="space-y-3">
          <span className="text-[7.5px] font-mono text-white/30 uppercase tracking-widest font-black block">Filtros de Estrutura</span>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'all', label: 'Tudo (Holograma)', desc: 'Visão completa' },
              { id: 'airway', label: 'Zona Condutora', desc: 'Vias e condução' },
              { id: 'hematosis', label: 'Zona Resp.', desc: 'Lungs e troca' },
              { id: 'mechanics', label: 'Mecânica Musc.', desc: 'Diafragma e costelas' }
            ].map((mode) => {
              const active = viewMode === mode.id
              return (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id as ViewMode)}
                  className={`p-2 rounded-lg border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between h-[52px] ${
                    active 
                      ? 'bg-sky-500/10 border-sky-500/30 text-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.05)]' 
                      : 'bg-white/[0.01] border-white/5 text-white/60 hover:border-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-[9px] font-bold leading-tight flex items-center gap-1">
                    <Eye className="h-3 w-3" /> {mode.label}
                  </span>
                  <span className="text-[7px] text-white/30 truncate leading-none">{mode.desc}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Physiological Rhythm Controller */}
        <div className="space-y-4 flex-1">
          <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
            <div className="flex justify-between items-center text-[9px] font-mono text-white/70">
              <span className="flex items-center gap-1.5"><Activity className="h-3.5 w-3.5 text-sky-400" /> RITMO FISIOLÓGICO</span>
              <span className="font-bold text-sky-400">
                {respiratoryRate} <span className="text-[8px] text-white/40">rpm</span>
              </span>
            </div>
            <input 
              type="range" 
              min="12" 
              max="30" 
              value={respiratoryRate} 
              onChange={(e) => setRespiratoryRate(Number(e.target.value))}
              className="w-full accent-sky-400 h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[7.5px] font-mono text-white/30 pt-0.5 leading-none">
              <span>Repouso (12 rpm)</span>
              <span>Esforço (30 rpm)</span>
            </div>
            <span className="text-[7.5px] font-mono text-white/35 block leading-normal pt-1">
              Ajusta o ritmo do ciclo de expansão pulmonar e o fluxo de ar ($O_2$/$CO_2$) simulando repouso ou exercício físico leve.
            </span>
          </div>

          {/* Quick Info card explaining the selected filter */}
          <div className="p-2.5 rounded-lg border border-white/5 bg-white/[0.01] flex gap-2 items-start mt-2">
            <Info className="h-3.5 w-3.5 text-sky-400 shrink-0 mt-0.5" />
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] font-bold text-white/80 uppercase tracking-wider font-mono">Dica Anatômica</span>
              <p className="text-[7.5px] text-white/45 leading-normal mt-0.5">
                {viewMode === 'all' && 'Use o menu interativo ou interaja diretamente com as malhas 3D para destacar e estudar cada estrutura anatômica detalhadamente.'}
                {viewMode === 'airway' && 'O espaço morto anatômico é de ~150 mL nas vias condutoras (nariz à traqueia), onde NÃO ocorre hematose.'}
                {viewMode === 'hematosis' && 'A hematose ocorre na zona respiratória (ductos e alvéolos pulmonares) através de uma delicada membrana de apenas 0,2 µm.'}
                {viewMode === 'mechanics' && 'A inspiração é um processo ativo coordenado pelo diafragma. Em repouso, a expiração é um processo passivo gerado pela retração pulmonar.'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[7.5px] font-mono text-white/30 uppercase leading-none">Simulação</span>
            <span className="text-[9px] font-mono text-white/70 font-semibold">{isPaused ? 'Espera' : 'Operando'}</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleReset}
              className="p-1.5 text-[8.5px] uppercase font-mono tracking-wider text-white/50 border border-white/10 hover:border-white/20 hover:text-white rounded-lg transition-all flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" /> Reset
            </button>
            <button 
              onClick={() => setIsPaused(!isPaused)}
              className={`px-3 py-1.5 text-[9px] uppercase font-mono tracking-wider font-bold rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                isPaused 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20' 
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
              }`}
            >
              {isPaused ? <Play className="h-3 w-3 fill-emerald-400" /> : <Pause className="h-3 w-3 fill-amber-400" />}
              {isPaused ? 'Ligar' : 'Pausar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
