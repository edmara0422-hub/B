'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

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
      <directionalLight position={[3, 8, 2]}  intensity={7.0} color="#ffffff" />
      <directionalLight position={[-2, 2, 4]} intensity={1.0} color="#8899cc" />
      <pointLight position={[0, -5, -1]} intensity={16} color="#1133bb" distance={20} />
      <ambientLight intensity={0.04} color="#050815" />
      <BrainModel compact={compact} />
    </Canvas>
  )
}

function BrainModel({ compact }: { compact: boolean }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.15
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 1.5) * 0.08
    }
  })

  return (
    <group ref={groupRef} scale={compact ? 0.8 : 1.15} position={[0, -0.4, 0]}>
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#060810"
          emissive="#1a40ff"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          wireframe={true}
          transparent={true}
          opacity={0.8}
        />
      </mesh>
    </group>
  )
}
