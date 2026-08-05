import { useEffect, useRef, useState } from "react"

type ThreeModule = typeof import("three")
type WebGLState = "loading" | "ready" | "fallback"

const FALLBACK_WEBP = "/images/home-hero-20260521.webp"
const FALLBACK_JPG = "/images/home-hero-20260521.jpg"

function createBitcoinTexture(THREE: ThreeModule) {
  const canvas = document.createElement("canvas")
  canvas.width = 512
  canvas.height = 512

  const context = canvas.getContext("2d")
  if (!context) {
    throw new Error("Canvas 2D context is unavailable")
  }

  const face = context.createRadialGradient(196, 142, 32, 256, 256, 286)
  face.addColorStop(0, "#f7c47a")
  face.addColorStop(0.48, "#d9862e")
  face.addColorStop(1, "#ad5c1c")

  context.fillStyle = face
  context.fillRect(0, 0, 512, 512)

  context.strokeStyle = "rgba(255, 247, 225, 0.58)"
  context.lineWidth = 9
  context.beginPath()
  context.arc(256, 256, 220, 0, Math.PI * 2)
  context.stroke()

  context.fillStyle = "#fff8e8"
  context.font = '700 290px "Geist Variable", Arial, sans-serif'
  context.textAlign = "center"
  context.textBaseline = "middle"
  context.shadowColor = "rgba(92, 45, 12, 0.26)"
  context.shadowBlur = 12
  context.shadowOffsetY = 8
  context.fillText("₿", 256, 270)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4
  return texture
}

export function HeroWebGL() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [webGLState, setWebGLState] = useState<WebGLState>("loading")

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const viewportElement: HTMLDivElement = viewport

    let disposed = false
    let destroyScene: (() => void) | undefined

    async function initializeScene() {
      try {
        const THREE = await import("three")
        if (disposed) return

        const canvas = document.createElement("canvas")
        canvas.className = "hero-webgl__canvas"
        canvas.setAttribute("aria-hidden", "true")

        const renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        })
        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.08
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFShadowMap
        renderer.setClearColor(0xeee8dc, 1)
        viewportElement.append(canvas)

        const scene = new THREE.Scene()
        scene.fog = new THREE.Fog(0xeee8dc, 9, 17)

        const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 40)
        camera.position.set(0.25, 0.28, 9.6)
        camera.lookAt(0, -0.08, 0)

        const hemisphere = new THREE.HemisphereLight(0xfffbf0, 0x776951, 2.3)
        scene.add(hemisphere)

        const keyLight = new THREE.DirectionalLight(0xffefd4, 4.5)
        keyLight.position.set(-4.5, 7, 8)
        keyLight.castShadow = true
        keyLight.shadow.mapSize.set(1024, 1024)
        keyLight.shadow.camera.near = 0.5
        keyLight.shadow.camera.far = 24
        keyLight.shadow.camera.left = -7
        keyLight.shadow.camera.right = 7
        keyLight.shadow.camera.top = 7
        keyLight.shadow.camera.bottom = -7
        keyLight.shadow.bias = -0.00035
        scene.add(keyLight)

        const seaFill = new THREE.PointLight(0x8cb4bd, 5.5, 16, 2)
        seaFill.position.set(4.8, 1.3, 4)
        scene.add(seaFill)

        const warmFill = new THREE.PointLight(0xd97824, 2.5, 12, 2)
        warmFill.position.set(-4, -1.5, 3)
        scene.add(warmFill)

        const sculpture = new THREE.Group()
        sculpture.position.set(0.2, 0.05, 0)
        scene.add(sculpture)

        const groundMaterial = new THREE.MeshStandardMaterial({
          color: 0xe8dfd0,
          roughness: 0.98,
          metalness: 0,
        })
        const ground = new THREE.Mesh(
          new THREE.PlaneGeometry(28, 20),
          groundMaterial
        )
        ground.rotation.x = -Math.PI / 2
        ground.position.y = -2.38
        ground.position.z = -0.5
        ground.receiveShadow = true
        scene.add(ground)

        const coinTexture = createBitcoinTexture(THREE)
        const coinAssembly = new THREE.Group()
        coinAssembly.position.set(0, 0.2, 0.15)
        coinAssembly.rotation.set(0.04, -0.2, -0.03)
        sculpture.add(coinAssembly)

        const coinSideMaterial = new THREE.MeshPhysicalMaterial({
          color: 0xb36b24,
          metalness: 0.72,
          roughness: 0.3,
          clearcoat: 0.45,
          clearcoatRoughness: 0.24,
        })
        const coinFaceMaterial = new THREE.MeshPhysicalMaterial({
          map: coinTexture,
          metalness: 0.32,
          roughness: 0.38,
          clearcoat: 0.62,
          clearcoatRoughness: 0.2,
        })
        const coinRimMaterial = new THREE.MeshPhysicalMaterial({
          color: 0xe3a54d,
          metalness: 0.78,
          roughness: 0.22,
          clearcoat: 0.5,
          clearcoatRoughness: 0.18,
        })

        const coinBody = new THREE.Mesh(
          new THREE.CylinderGeometry(1.34, 1.34, 0.3, 96, 1, false),
          coinSideMaterial
        )
        coinBody.rotation.x = Math.PI / 2
        coinBody.castShadow = true
        coinBody.receiveShadow = true
        coinAssembly.add(coinBody)

        const coinFace = new THREE.Mesh(
          new THREE.CircleGeometry(1.25, 96),
          coinFaceMaterial
        )
        coinFace.position.z = 0.156
        coinFace.castShadow = true
        coinAssembly.add(coinFace)

        const coinRim = new THREE.Mesh(
          new THREE.TorusGeometry(1.29, 0.045, 12, 128),
          coinRimMaterial
        )
        coinRim.position.z = 0.178
        coinRim.castShadow = true
        coinAssembly.add(coinRim)

        const orbitSpecs = [
          {
            radius: 2.18,
            rotation: [0.42, 0.2, -0.38] as const,
            color: 0x213f31,
            markerColor: 0x6f7c5f,
            speed: 0.16,
            phase: 0.4,
          },
          {
            radius: 2.72,
            rotation: [-0.3, 0.54, 0.52] as const,
            color: 0x5d8491,
            markerColor: 0xa96b45,
            speed: -0.11,
            phase: 2.1,
          },
        ]
        const orbitMarkers: Array<{
          marker: InstanceType<typeof THREE.Mesh>
          radius: number
          speed: number
          phase: number
        }> = []

        orbitSpecs.forEach((spec, index) => {
          const orbitGroup = new THREE.Group()
          orbitGroup.rotation.set(
            spec.rotation[0],
            spec.rotation[1],
            spec.rotation[2]
          )
          sculpture.add(orbitGroup)

          const ring = new THREE.Mesh(
            new THREE.TorusGeometry(
              spec.radius,
              index === 0 ? 0.022 : 0.016,
              8,
              144
            ),
            new THREE.MeshStandardMaterial({
              color: spec.color,
              roughness: 0.62,
              metalness: 0.18,
              transparent: true,
              opacity: index === 0 ? 0.68 : 0.52,
            })
          )
          orbitGroup.add(ring)

          const marker = new THREE.Mesh(
            new THREE.IcosahedronGeometry(index === 0 ? 0.18 : 0.15, 2),
            new THREE.MeshPhysicalMaterial({
              color: spec.markerColor,
              roughness: 0.72,
              metalness: 0.04,
              clearcoat: 0.12,
            })
          )
          marker.castShadow = true
          orbitGroup.add(marker)
          orbitMarkers.push({
            marker,
            radius: spec.radius,
            speed: spec.speed,
            phase: spec.phase,
          })
        })

        const stoneGeometry = new THREE.IcosahedronGeometry(0.62, 3)
        const stoneSpecs = [
          {
            position: [-2.38, -1.48, 0.42] as const,
            scale: [1.25, 0.62, 0.9] as const,
            color: 0xcdbca5,
          },
          {
            position: [2.38, -1.5, 0.2] as const,
            scale: [1.06, 0.54, 0.78] as const,
            color: 0x6f7c5f,
          },
          {
            position: [2.34, 1.36, -1.05] as const,
            scale: [0.78, 0.42, 0.68] as const,
            color: 0x7597a0,
          },
        ]

        stoneSpecs.forEach((spec, index) => {
          const stone = new THREE.Mesh(
            stoneGeometry,
            new THREE.MeshPhysicalMaterial({
              color: spec.color,
              roughness: index === 0 ? 0.92 : 0.82,
              metalness: 0,
              clearcoat: 0.08,
              clearcoatRoughness: 0.7,
            })
          )
          stone.position.set(
            spec.position[0],
            spec.position[1],
            spec.position[2]
          )
          stone.scale.set(spec.scale[0], spec.scale[1], spec.scale[2])
          stone.rotation.set(index * 0.31, index * 0.54, index * -0.24)
          stone.castShadow = true
          stone.receiveShadow = true
          sculpture.add(stone)

          const path = new THREE.CubicBezierCurve3(
            new THREE.Vector3(0, 0.15, -0.05),
            new THREE.Vector3(spec.position[0] * 0.34, 0.1, 0.38),
            new THREE.Vector3(
              spec.position[0] * 0.72,
              spec.position[1] * 0.55,
              spec.position[2] + 0.28
            ),
            new THREE.Vector3(...spec.position)
          )
          const pathMesh = new THREE.Mesh(
            new THREE.TubeGeometry(path, 42, 0.018, 6, false),
            new THREE.MeshStandardMaterial({
              color: index === 0 ? 0xb98d4b : index === 1 ? 0x213f31 : 0x5d8491,
              roughness: 0.55,
              metalness: 0.2,
              transparent: true,
              opacity: 0.66,
            })
          )
          sculpture.add(pathMesh)
        })

        const oliveBranch = new THREE.Group()
        oliveBranch.position.set(3.45, -1.7, -1.2)
        oliveBranch.rotation.set(0.1, -0.25, 0.4)
        sculpture.add(oliveBranch)

        const branch = new THREE.Mesh(
          new THREE.CylinderGeometry(0.025, 0.04, 2.3, 10),
          new THREE.MeshStandardMaterial({
            color: 0x6b5a3c,
            roughness: 0.88,
          })
        )
        branch.rotation.z = -0.55
        oliveBranch.add(branch)

        const leafGeometry = new THREE.SphereGeometry(0.22, 18, 10)
        const leafMaterial = new THREE.MeshPhysicalMaterial({
          color: 0x526449,
          roughness: 0.72,
          clearcoat: 0.08,
        })
        for (let index = 0; index < 6; index += 1) {
          const leaf = new THREE.Mesh(leafGeometry, leafMaterial)
          const side = index % 2 === 0 ? -1 : 1
          leaf.position.set(
            side * (0.22 + index * 0.018),
            -0.78 + index * 0.31,
            side * 0.04
          )
          leaf.scale.set(1.45, 0.34, 0.72)
          leaf.rotation.z = side * (0.72 + index * 0.035)
          leaf.castShadow = true
          oliveBranch.add(leaf)
        }

        const pointerTarget = new THREE.Vector2(0, 0)
        const pointerCurrent = new THREE.Vector2(0, 0)
        let isIntersecting = true
        let isDocumentVisible = !document.hidden
        const reducedMotionQuery = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        )
        let prefersReducedMotion = reducedMotionQuery.matches

        function renderFrame(time = 0) {
          const seconds = time * 0.001
          pointerCurrent.lerp(pointerTarget, 0.045)

          sculpture.rotation.y =
            Math.sin(seconds * 0.16) * 0.045 + pointerCurrent.x * 0.075
          sculpture.rotation.x = -0.015 + pointerCurrent.y * 0.035
          coinAssembly.position.y = 0.2 + Math.sin(seconds * 0.48) * 0.075
          coinAssembly.rotation.y =
            -0.2 + Math.sin(seconds * 0.23) * 0.1 + pointerCurrent.x * 0.07

          orbitMarkers.forEach(({ marker, radius, speed, phase }, index) => {
            const angle = seconds * speed + phase
            marker.position.set(
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              0
            )
            marker.rotation.set(
              seconds * (0.15 + index * 0.03),
              seconds * (0.22 + index * 0.04),
              0
            )
          })

          renderer.render(scene, camera)
        }

        function syncAnimationLoop() {
          const shouldAnimate =
            !prefersReducedMotion && isIntersecting && isDocumentVisible
          renderer.setAnimationLoop(shouldAnimate ? renderFrame : null)
          if (!shouldAnimate) renderFrame()
        }

        function resizeScene() {
          const bounds = viewportElement.getBoundingClientRect()
          const width = Math.max(1, Math.round(bounds.width))
          const height = Math.max(1, Math.round(bounds.height))
          const isMobile = width < 620

          renderer.setPixelRatio(
            Math.min(window.devicePixelRatio || 1, isMobile ? 1.35 : 1.75)
          )
          renderer.setSize(width, height, false)
          camera.aspect = width / height
          camera.position.set(
            0.25,
            isMobile ? 0.18 : 0.28,
            isMobile ? 11.1 : 9.6
          )
          camera.updateProjectionMatrix()
          sculpture.scale.setScalar(isMobile ? 0.84 : 1)
          sculpture.position.x = isMobile ? 0 : 0.2
          renderFrame()
        }

        function handlePointerMove(event: PointerEvent) {
          if (event.pointerType === "touch") return
          const bounds = viewportElement.getBoundingClientRect()
          pointerTarget.set(
            ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
            -((event.clientY - bounds.top) / bounds.height - 0.5) * 2
          )
        }

        function handlePointerLeave() {
          pointerTarget.set(0, 0)
        }

        function handleVisibilityChange() {
          isDocumentVisible = !document.hidden
          syncAnimationLoop()
        }

        function handleMotionPreference(event: MediaQueryListEvent) {
          prefersReducedMotion = event.matches
          syncAnimationLoop()
        }

        function handleContextLost(event: Event) {
          event.preventDefault()
          renderer.setAnimationLoop(null)
          if (!disposed) setWebGLState("fallback")
        }

        const resizeObserver = new ResizeObserver(resizeScene)
        resizeObserver.observe(viewportElement)

        const intersectionObserver = new IntersectionObserver(
          ([entry]) => {
            isIntersecting = entry.isIntersecting
            syncAnimationLoop()
          },
          { threshold: 0.04 }
        )
        intersectionObserver.observe(viewportElement)

        viewportElement.addEventListener("pointermove", handlePointerMove, {
          passive: true,
        })
        viewportElement.addEventListener("pointerleave", handlePointerLeave)
        document.addEventListener("visibilitychange", handleVisibilityChange)
        reducedMotionQuery.addEventListener("change", handleMotionPreference)
        canvas.addEventListener("webglcontextlost", handleContextLost)

        resizeScene()
        syncAnimationLoop()
        if (!disposed) setWebGLState("ready")

        destroyScene = () => {
          renderer.setAnimationLoop(null)
          resizeObserver.disconnect()
          intersectionObserver.disconnect()
          viewportElement.removeEventListener("pointermove", handlePointerMove)
          viewportElement.removeEventListener(
            "pointerleave",
            handlePointerLeave
          )
          document.removeEventListener(
            "visibilitychange",
            handleVisibilityChange
          )
          reducedMotionQuery.removeEventListener(
            "change",
            handleMotionPreference
          )
          canvas.removeEventListener("webglcontextlost", handleContextLost)

          scene.traverse((object) => {
            if (!(object instanceof THREE.Mesh)) return
            object.geometry.dispose()
            const materials = Array.isArray(object.material)
              ? object.material
              : [object.material]
            materials.forEach((material) => material.dispose())
          })
          coinTexture.dispose()
          renderer.dispose()
          renderer.forceContextLoss()
          canvas.remove()
        }
      } catch {
        if (!disposed) setWebGLState("fallback")
      }
    }

    void initializeScene()

    return () => {
      disposed = true
      destroyScene?.()
    }
  }, [])

  return (
    <div
      className="hero-image-frame hero-webgl"
      data-webgl-state={webGLState}
      role="img"
      aria-label="Mirna 3D skulptura Bitcoin sustava s brončanim tokenom, kamenim osloncima i povezanim putanjama"
    >
      <picture className="hero-webgl__fallback" aria-hidden="true">
        <source srcSet={FALLBACK_WEBP} type="image/webp" />
        <img
          src={FALLBACK_JPG}
          alt=""
          width="1536"
          height="1024"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <div
        ref={viewportRef}
        className="hero-webgl__viewport"
        aria-hidden="true"
      />
    </div>
  )
}
