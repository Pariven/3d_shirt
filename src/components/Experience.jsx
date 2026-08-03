import * as THREE from 'three'
import { useMemo, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Preload } from '@react-three/drei'

const MODEL_URL = '/shirt_baked.glb'

/*
 * Scroll keyframes for the shirt's journey down the page.
 *  p  — overall page scroll progress [0..1]
 *  x  — horizontal drift, normalized (multiplied by viewport width)
 *  y  — vertical drift, normalized (multiplied by viewport height)
 *  z  — depth push
 *  rx/ry — tilt / turntable rotation (ry accumulates a full 360° by section 03)
 *  s  — scale multiplier
 */
const KEYFRAMES = [
  { p: 0.0, x: 0.0, y: -0.03, z: 0.0, rx: 0.06, ry: 0.0, s: 1.0 },
  { p: 0.17, x: 0.62, y: 0.0, z: 0.0, rx: 0.0, ry: -0.85, s: 0.8 },
  { p: 0.33, x: -0.62, y: 0.0, z: 0.0, rx: 0.0, ry: -Math.PI, s: 0.8 },
  { p: 0.5, x: 0.0, y: 0.12, z: -2.0, rx: -0.05, ry: -Math.PI * 2, s: 0.6 },
  { p: 0.66, x: 0.85, y: 0.1, z: -3.0, rx: 0.0, ry: -Math.PI * 2 - 0.7, s: 0.52 },
  { p: 0.82, x: 0.0, y: 0.16, z: -4.2, rx: 0.0, ry: -Math.PI * 3, s: 0.48 },
  { p: 1.0, x: 0.0, y: -0.02, z: 0.0, rx: 0.04, ry: -Math.PI * 4, s: 0.92 },
]

const smoothstep = (t) => t * t * (3 - 2 * t)

function sampleKeyframes(p) {
  let a = KEYFRAMES[0]
  let b = KEYFRAMES[KEYFRAMES.length - 1]
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    if (p >= KEYFRAMES[i].p && p <= KEYFRAMES[i + 1].p) {
      a = KEYFRAMES[i]
      b = KEYFRAMES[i + 1]
      break
    }
  }
  const span = b.p - a.p || 1
  const t = smoothstep(THREE.MathUtils.clamp((p - a.p) / span, 0, 1))
  const L = THREE.MathUtils.lerp
  return {
    x: L(a.x, b.x, t),
    y: L(a.y, b.y, t),
    z: L(a.z, b.z, t),
    rx: L(a.rx, b.rx, t),
    ry: L(a.ry, b.ry, t),
    s: L(a.s, b.s, t),
  }
}

function Shirt() {
  const { scene } = useGLTF(MODEL_URL)
  const outer = useRef() // scroll-driven position / rotation / scale
  const inner = useRef() // mouse-driven tilt on top
  const mouse = useRef({ x: 0, y: 0 })
  const scroll = useRef(0)

  // Normalize the model: center it and scale to a known world height,
  // flatten materials to the monochrome palette but keep the baked texture.
  const { baseScale, offset, materials } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const baseScale = 2.35 / Math.max(size.x, size.y, size.z)
    const materials = []
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.roughness = 0.62
        child.material.metalness = 0.04
        child.material.color = new THREE.Color('#e9e9e9')
        materials.push(child.material)
      }
    })
    return { baseScale, offset: center.multiplyScalar(-1), materials }
  }, [scene])

  const cLight = useMemo(() => new THREE.Color('#e9e9e9'), [])
  const cDark = useMemo(() => new THREE.Color('#6b6b6b'), [])
  const cTmp = useMemo(() => new THREE.Color(), [])

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((state, delta) => {
    const doc = document.documentElement
    const max = Math.max(1, doc.scrollHeight - window.innerHeight)
    const target = THREE.MathUtils.clamp(window.scrollY / max, 0, 1)
    scroll.current = THREE.MathUtils.damp(scroll.current, target, 8, delta)
    const p = scroll.current

    const kf = sampleKeyframes(p)
    const t = state.clock.elapsedTime
    const vw = state.viewport.width
    const vh = state.viewport.height

    // keep the shirt inside narrow viewports
    const fitScale = Math.min(1, vw / 3.4)
    const d = (cur, tgt, l = 6) => THREE.MathUtils.damp(cur, tgt, l, delta)

    const o = outer.current
    if (o) {
      const floatY = Math.sin(t * 1.3) * 0.045 * (1 - p * 0.5)
      o.position.x = d(o.position.x, kf.x * vw * 0.29)
      o.position.y = d(o.position.y, kf.y * vh * 0.35 + floatY)
      o.position.z = d(o.position.z, kf.z)
      o.rotation.x = d(o.rotation.x, kf.rx)
      o.rotation.y = d(o.rotation.y, kf.ry, 5)
      o.rotation.z = Math.sin(t * 0.5) * 0.02
      const s = baseScale * kf.s * fitScale
      o.scale.setScalar(d(o.scale.x, s))
    }

    // mouse "turn around" — strong on the hero, subtle once scrolling
    const heroWeight = 1 - smoothstep(THREE.MathUtils.clamp(p / 0.16, 0, 1)) * 0.7
    const i = inner.current
    if (i) {
      i.rotation.y = d(i.rotation.y, mouse.current.x * (0.35 + 0.95 * heroWeight), 4.5)
      i.rotation.x = d(i.rotation.x, mouse.current.y * (0.1 + 0.22 * heroWeight), 4.5)
    }

    // the shirt sinks toward charcoal as it enters the void (finale)
    const mix = smoothstep(THREE.MathUtils.clamp((p - 0.84) / 0.14, 0, 1))
    cTmp.lerpColors(cLight, cDark, mix)
    for (const m of materials) m.color.copy(cTmp)
  })

  return (
    <group ref={outer}>
      <group ref={inner}>
        <primitive object={scene} position={offset} />
      </group>
    </group>
  )
}

useGLTF.preload(MODEL_URL)

export default function Experience() {
  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 30 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 6, 6]} intensity={1.5} />
        <directionalLight position={[-6, 3, -5]} intensity={0.8} />
        <directionalLight position={[0, -4, 4]} intensity={0.3} />
        <Shirt />
        <Preload all />
      </Canvas>
    </div>
  )
}
