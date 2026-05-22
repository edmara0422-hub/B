'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Clip plane: hide everything below y = -1.40 in world space (shows cerebellum, cuts long brainstem)
const CLIP_PLANE = new THREE.Plane(new THREE.Vector3(0, 1, 0), 1.40)

export function BrainHeroScene({
  compact = false,
  transparent = false,
}: {
  compact?: boolean
  transparent?: boolean
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, compact ? 3.8 : 4.4], fov: compact ? 46 : 42 }}
      gl={{ alpha: transparent, antialias: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
    >
      {!transparent ? <color attach="background" args={['#07080f']} /> : null}
      {/* Strong key from top-right — white hot on top edges */}
      <directionalLight position={[3, 8, 2]}  intensity={7.0} color="#ffffff" />
      {/* Softer fill from front-left */}
      <directionalLight position={[-2, 2, 4]} intensity={1.0} color="#8899cc" />
      {/* Blue rim from below — creates blue glow on shadow edges */}
      <pointLight position={[0, -5, -1]} intensity={16} color="#1133bb" distance={20} />
      <ambientLight intensity={0.04} color="#050815" />
      <BrainModel compact={compact} />
    </Canvas>
  )
}

// Pre-load for faster first render
useGLTF.preload('/cerebro.glb')

function BrainModel({ compact }: { compact: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/cerebro.glb')

  const { gl } = useThree()
  useEffect(() => { gl.localClippingEnabled = true }, [gl])

  // Use a smooth, organic holographic material instead of heavy wireframes
  const organicMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#3b82f6', // soft blue core
    emissive: '#1d4ed8',
    emissiveIntensity: 0.3,
    roughness: 0.2,
    metalness: 0.8,
    transparent: true,
    opacity: 0.9,
    clippingPlanes: [CLIP_PLANE],
  }), [])

  // Normalize scene scale+center, apply simple smooth material
  const normScene = useMemo(() => {
    const root = scene.clone()

    const box = new THREE.Box3().setFromObject(root)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)

    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 3.2 / maxDim
    root.scale.setScalar(scale)
    root.position.sub(center.multiplyScalar(scale))

    root.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return
      if (child.name.toLowerCase().includes('cube')) {
        child.visible = false
        return
      }
      child.material = organicMat
    })

    return root
  }, [scene, organicMat])

  // Slow rotation — matching the reference video speed
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime
      // Side-view: 1.57 rad = 90° lateral view
      groupRef.current.rotation.y = 1.57 + t * 0.18
      groupRef.current.rotation.x = Math.sin(t * 0.14) * 0.04
    }
  })

  const s = compact ? 0.85 : 1.00

  return (
    <group ref={groupRef} scale={s} rotation={[0.10, 1.20, 0]} position={[0, -0.10, 0]}>
      <primitive object={normScene} />
    </group>
  )
}
