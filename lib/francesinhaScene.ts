// lib/francesinhaScene.ts
// Owns the Three.js scene, camera, renderer, and all mesh objects.
// Exposes a single update(progress: number) function called by GSAP.
// Never imports React — framework-agnostic.

import * as THREE from 'three'

export interface FrancesinhaScene {
  renderer: THREE.WebGLRenderer
  update: (progress: number) => void
  resize: (w: number, h: number) => void
  dispose: () => void
}

export function createFrancesinhaScene(canvas: HTMLCanvasElement): FrancesinhaScene {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
  camera.position.set(0, 2, 5)
  camera.lookAt(0, 0, 0)

  // Warm amber key light (simulates warm restaurant lighting)
  const keyLight = new THREE.PointLight(0xFCB857, 3, 20)
  keyLight.position.set(3, 5, 3)
  scene.add(keyLight)

  // Secondary warm light for fill
  const fillLight = new THREE.PointLight(0xFCA03F, 1.5, 15)
  fillLight.position.set(-4, 3, 2)
  scene.add(fillLight)

  // Cool fill light for contrast
  const rimLight = new THREE.DirectionalLight(0xffeedd, 0.4)
  rimLight.position.set(-3, 2, -2)
  scene.add(rimLight)

  scene.add(new THREE.AmbientLight(0xfff5e0, 0.3))

  // === FRANCESINHA LAYERS ===
  // Each layer is a BoxGeometry with warm tinted materials
  const layers = [
    { name: 'bread_top',  y: 0.60, color: 0xC97420, height: 0.14 },
    { name: 'cheese',     y: 0.45, color: 0xFCB857, height: 0.08 },
    { name: 'ham',        y: 0.35, color: 0xB85C38, height: 0.10 },
    { name: 'egg',        y: 0.22, color: 0xFDE8B3, height: 0.09 },
    { name: 'sausage',    y: 0.10, color: 0x9E5318, height: 0.10 },
    { name: 'sauce',      y: -0.02, color: 0xE8411A, height: 0.06 },
    { name: 'bread_bot',  y: -0.15, color: 0xC97420, height: 0.16 },
  ]

  const meshes: THREE.Mesh[] = layers.map(layer => {
    const geo = new THREE.BoxGeometry(2.4, layer.height, 2.4)
    // Round edges slightly with a bevel-like effect using extra geometry details
    const mat = new THREE.MeshStandardMaterial({
      color: layer.color,
      roughness: 0.65,
      metalness: 0.0,
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.y = layer.y
    mesh.userData = { baseY: layer.y, name: layer.name }
    scene.add(mesh)
    return mesh
  })

  // Plate
  const plateGeo = new THREE.CylinderGeometry(1.7, 1.6, 0.1, 64)
  const plateMat = new THREE.MeshStandardMaterial({ 
    color: 0xf5f0e8, 
    roughness: 0.25, 
    metalness: 0.05 
  })
  const plate = new THREE.Mesh(plateGeo, plateMat)
  plate.position.y = -0.35
  scene.add(plate)

  // Sauce pool on plate
  const saucePoolGeo = new THREE.CylinderGeometry(1.4, 1.3, 0.03, 64)
  const saucePoolMat = new THREE.MeshStandardMaterial({
    color: 0xE8411A,
    roughness: 0.4,
    metalness: 0.1,
  })
  const saucePool = new THREE.Mesh(saucePoolGeo, saucePoolMat)
  saucePool.position.y = -0.28
  scene.add(saucePool)

  // Spread values — how far each layer floats when exploded (index 0 = top)
  const explodeOffsets = [2.0, 1.4, 0.9, 0.5, 0.0, -0.5, -0.2]

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false

  function update(progress: number) {
    if (prefersReducedMotion) {
      // Static render for reduced motion
      renderer.render(scene, camera)
      return
    }

    // === Camera orbit (progress 0.0 → 0.30) ===
    const camProgress = Math.min(progress / 0.3, 1)
    // Smoothstep easing
    const camEased = camProgress * camProgress * (3 - 2 * camProgress)
    const camAngle = camEased * Math.PI * 0.35
    camera.position.x = Math.sin(camAngle) * 5
    camera.position.z = Math.cos(camAngle) * 5
    camera.position.y = 2.5 + camEased * 0.8
    camera.lookAt(0, 0.3, 0)

    // === Explode (progress 0.30 → 0.55) ===
    const explodeProgress = Math.max(0, Math.min((progress - 0.30) / 0.25, 1))
    // Smoothstep easing
    const explodeEased = explodeProgress * explodeProgress * (3 - 2 * explodeProgress)

    meshes.forEach((mesh, i) => {
      const base = mesh.userData.baseY as number
      mesh.position.y = base + explodeEased * explodeOffsets[i]
      // Subtle individual rotation on explode
      mesh.rotation.x = explodeEased * (i % 2 === 0 ? 0.08 : -0.08)
      mesh.rotation.z = explodeEased * ((i - 3) * 0.03)
    })

    // === Hold exploded state (progress 0.55 → 0.70) ===
    // Layers stay in exploded position, gentle float effect
    if (progress >= 0.55 && progress < 0.70) {
      const floatPhase = (progress - 0.55) / 0.15
      meshes.forEach((mesh, i) => {
        const floatOffset = Math.sin(floatPhase * Math.PI * 2 + i * 0.5) * 0.03
        mesh.position.y += floatOffset
      })
    }

    // === Reassemble (progress 0.70 → 0.85) ===
    const reassembleProgress = Math.max(0, Math.min((progress - 0.70) / 0.15, 1))
    const reassembleEased = reassembleProgress * reassembleProgress * (3 - 2 * reassembleProgress)

    if (reassembleProgress > 0) {
      meshes.forEach((mesh, i) => {
        const base = mesh.userData.baseY as number
        const explodedY = base + explodeOffsets[i]
        mesh.position.y = explodedY + (base - explodedY) * reassembleEased
        mesh.rotation.x = (1 - reassembleEased) * (i % 2 === 0 ? 0.08 : -0.08)
        mesh.rotation.z = (1 - reassembleEased) * ((i - 3) * 0.03)
      })
    }

    // === Final hold (progress 0.85 → 1.00) ===
    // Camera pulls back slightly, sauce pool glows
    if (progress >= 0.85) {
      const finalProgress = (progress - 0.85) / 0.15
      camera.position.z = 5 + finalProgress * 1.5
      camera.position.y = 3.3 - finalProgress * 0.5
      camera.lookAt(0, 0.2, 0)
      
      // Sauce pool glow
      const glowIntensity = 0.1 + finalProgress * 0.15
      ;(saucePoolMat as THREE.MeshStandardMaterial).emissive = new THREE.Color(0xE8411A)
      ;(saucePoolMat as THREE.MeshStandardMaterial).emissiveIntensity = glowIntensity
    }

    // Key light warmth pulses with scroll
    keyLight.intensity = 3 + Math.sin(progress * Math.PI * 2) * 0.8
    fillLight.intensity = 1.5 + Math.sin(progress * Math.PI * 2 + 1) * 0.4

    renderer.render(scene, camera)
  }

  function resize(w: number, h: number) {
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  }

  function dispose() {
    renderer.dispose()
    scene.traverse(obj => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose()
        if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose())
        else obj.material.dispose()
      }
    })
  }

  return { renderer, update, resize, dispose }
}
