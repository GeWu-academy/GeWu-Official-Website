import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RotateCw, Compass } from 'lucide-react'
import { ScholarSeal } from '@/components/scholar-seal'
import { useI18n } from '@/i18n'
import { useThemeStore } from '@/store/use-theme-store'
import { useUIStore, type SphereMode } from '@/store/use-ui-store'

interface GewuArmillarySphereProps {
  className?: string
  interactive?: boolean
  showControls?: boolean
}

export function GewuArmillarySphere({
  className = '',
  interactive = true,
  showControls = true,
}: GewuArmillarySphereProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const theme = useThemeStore((s) => s.theme)
  const activeMode = useUIStore((s) => s.sphereMode)
  const setActiveMode = useUIStore((s) => s.setSphereMode)
  const { t } = useI18n()

  // 内部引用以供交互控制与主题动态响应
  const sceneRef = useRef<THREE.Scene | null>(null)
  const sphereGroupRef = useRef<THREE.Group | null>(null)
  const coreMeshRef = useRef<THREE.Mesh | null>(null)
  const wireMeshRef = useRef<THREE.LineSegments | null>(null)
  const innerMeshRef = useRef<THREE.Mesh | null>(null)
  const torusMeshesRef = useRef<THREE.Mesh[]>([])
  const ringLinesRef = useRef<THREE.LineSegments[]>([])
  const ringsRef = useRef<THREE.Group[]>([])
  const particlesRef = useRef<THREE.Points | null>(null)
  const dirLight1Ref = useRef<THREE.DirectionalLight | null>(null)
  const dirLight2Ref = useRef<THREE.DirectionalLight | null>(null)

  // 1. 初始化 Three.js 场景
  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const width = container.clientWidth || 400
    const height = container.clientHeight || 400

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 0, 7.5)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    container.appendChild(renderer.domElement)

    // 光照系统
    const isDark = theme === 'dark'
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 1.0 : 1.4)
    scene.add(ambientLight)

    const dirLight1 = new THREE.DirectionalLight(isDark ? 0xffffff : 0xfffbf0, isDark ? 2.2 : 2.2)
    dirLight1.position.set(5, 8, 5)
    scene.add(dirLight1)
    dirLight1Ref.current = dirLight1

    const dirLight2 = new THREE.DirectionalLight(isDark ? 0xf59e0b : 0xfef3c7, isDark ? 1.5 : 1.2)
    dirLight2.position.set(-5, -4, -3)
    scene.add(dirLight2)
    dirLight2Ref.current = dirLight2

    // 核心物体组：浑天仪总成
    const mainGroup = new THREE.Group()
    scene.add(mainGroup)
    sphereGroupRef.current = mainGroup

    // 核心多面体（黑曜晶石与宋瓷温润质感）
    const coreGeo = new THREE.IcosahedronGeometry(1.0, 1)
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0x050505 : 0xfaf8f5,
      metalness: isDark ? 0.4 : 0.1,
      roughness: isDark ? 0.12 : 0.2,
      transmission: isDark ? 0.4 : 0.6,
      thickness: 1.2,
      ior: 1.45,
      transparent: true,
      opacity: isDark ? 0.95 : 0.88,
      reflectivity: 0.9,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      emissive: 0x000000,
      emissiveIntensity: 0,
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    mainGroup.add(coreMesh)
    coreMeshRef.current = coreMesh

    // 核心多面体线框（纯白白描线条 / 深墨线）
    const wireGeo = new THREE.WireframeGeometry(coreGeo)
    const wireMat = new THREE.LineBasicMaterial({
      color: isDark ? 0xffffff : 0x44403c,
      transparent: true,
      opacity: isDark ? 0.65 : 0.35,
    })
    const wireLines = new THREE.LineSegments(wireGeo, wireMat)
    coreMesh.add(wireLines)
    wireMeshRef.current = wireLines

    // 内部微型星核（暖金橙黄 / 翡翠青）
    const innerGeo = new THREE.OctahedronGeometry(0.45)
    const innerMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0xf59e0b : 0x0f766e,
      roughness: 0.3,
      metalness: 0.3,
      emissive: isDark ? 0xf59e0b : 0x0f766e,
      emissiveIntensity: isDark ? 0.65 : 0.35,
    })
    const innerMesh = new THREE.Mesh(innerGeo, innerMat)
    coreMesh.add(innerMesh)
    innerMeshRef.current = innerMesh

    // 浑天仪环圈系列
    const ringsGroup: THREE.Group[] = []
    const torusMeshes: THREE.Mesh[] = []
    const ringLines: THREE.LineSegments[] = []

    const ringColorsLight = [0x292524, 0x0f766e, 0x57534e, 0xd97706]
    // 暗色主题：纯白线条勾勒、橙黄、翠绿、桃粉
    const ringColorsDark = [0xffffff, 0xf59e0b, 0x10b981, 0xfb7185]

    const createArmillaryRing = (
      index: number,
      radius: number,
      tubeRadius: number,
      rotX: number,
      rotY: number,
      rotZ: number,
      wireOpacity: number = 0.5
    ) => {
      const ringGroup = new THREE.Group()
      ringGroup.rotation.set(rotX, rotY, rotZ)

      const colorHex = isDark ? ringColorsDark[index] : ringColorsLight[index]

      // 主圆环体
      const torusGeo = new THREE.TorusGeometry(radius, tubeRadius, 16, 120)
      const torusMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        roughness: isDark ? 0.25 : 0.35,
        metalness: isDark ? 0.7 : 0.55,
        emissive: isDark ? colorHex : 0x000000,
        emissiveIntensity: isDark ? 0.2 : 0,
      })
      const torus = new THREE.Mesh(torusGeo, torusMat)
      ringGroup.add(torus)
      torusMeshes.push(torus)

      // 伴生极细星轨辅助线（纯白微光勾勒 / 浅灰水墨）
      const lineGeo = new THREE.RingGeometry(radius - 0.08, radius + 0.08, 64)
      const lineEdges = new THREE.EdgesGeometry(lineGeo)
      const lineMat = new THREE.LineBasicMaterial({
        color: isDark ? 0xffffff : 0x78716c,
        transparent: true,
        opacity: isDark ? 0.35 : wireOpacity,
      })
      const lineSegments = new THREE.LineSegments(lineEdges, lineMat)
      lineSegments.rotation.x = Math.PI / 2
      ringGroup.add(lineSegments)
      ringLines.push(lineSegments)

      mainGroup.add(ringGroup)
      ringsGroup.push(ringGroup)
      return ringGroup
    }

    createArmillaryRing(0, 2.3, 0.02, Math.PI / 2, 0, 0, 0.45)
    createArmillaryRing(1, 2.0, 0.02, Math.PI / 4, Math.PI / 6, 0, 0.6)
    createArmillaryRing(2, 1.7, 0.018, 0, Math.PI / 3, Math.PI / 5, 0.4)
    createArmillaryRing(3, 1.35, 0.015, -Math.PI / 5, Math.PI / 2, Math.PI / 7, 0.5)

    ringsRef.current = ringsGroup
    torusMeshesRef.current = torusMeshes
    ringLinesRef.current = ringLines

    // 四大研习方向节点锚点（橙黄、纯白金石、翠绿、桃粉）
    const nodeDirections = [
      { name: 'AI & 智能体', pos: new THREE.Vector3(2.3, 0, 0), color: isDark ? 0xf59e0b : 0xd97706 },
      { name: '全栈现代架构', pos: new THREE.Vector3(0, 2.0, 0), color: isDark ? 0xffffff : 0x292524 },
      { name: '系统高并发', pos: new THREE.Vector3(-1.7, 0, 1.2), color: isDark ? 0x10b981 : 0x059669 },
      { name: '体验设计美学', pos: new THREE.Vector3(0, -1.35, 1.0), color: isDark ? 0xfb7185 : 0xe11d48 },
    ]

    const nodesGroup = new THREE.Group()
    mainGroup.add(nodesGroup)

    nodeDirections.forEach((dir) => {
      const nodeGeo = new THREE.SphereGeometry(0.09, 16, 16)
      const nodeMat = new THREE.MeshStandardMaterial({
        color: dir.color,
        roughness: 0.2,
        metalness: 0.4,
        emissive: dir.color,
        emissiveIntensity: isDark ? 0.6 : 0.4,
      })
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat)
      nodeMesh.position.copy(dir.pos)
      nodesGroup.add(nodeMesh)

      const pulseGeo = new THREE.RingGeometry(0.12, 0.16, 32)
      const pulseMat = new THREE.MeshBasicMaterial({
        color: dir.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: isDark ? 0.75 : 0.6,
      })
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat)
      pulseMesh.position.copy(dir.pos)
      pulseMesh.lookAt(0, 0, 0)
      nodesGroup.add(pulseMesh)
    })

    // 水墨与星辰粒子（纯白星芒与墨尘）
    const particleCount = 180
    const particlePositions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.2 + Math.random() * 2.2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      particlePositions[i * 3 + 2] = radius * Math.cos(phi)
    }

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))

    const particleMat = new THREE.PointsMaterial({
      color: isDark ? 0xffffff : 0x57534e,
      size: isDark ? 0.045 : 0.045,
      transparent: true,
      opacity: isDark ? 0.65 : 0.55,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    })

    const particles = new THREE.Points(particleGeo, particleMat)
    mainGroup.add(particles)
    particlesRef.current = particles

    // 鼠标交互
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0
    let isDragging = false
    let prevMousePos = { x: 0, y: 0 }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)

      if (isDragging) {
        const deltaX = e.clientX - prevMousePos.x
        const deltaY = e.clientY - prevMousePos.y
        mainGroup.rotation.y += deltaX * 0.008
        mainGroup.rotation.x += deltaY * 0.008
        prevMousePos = { x: e.clientX, y: e.clientY }
      } else {
        targetX = x * 0.35
        targetY = y * 0.35
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      if (!interactive) return
      isDragging = true
      prevMousePos = { x: e.clientX, y: e.clientY }
    }

    const handleMouseUp = () => {
      isDragging = false
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    // 动画循环
    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      mouseX += (targetX - mouseX) * 0.05
      mouseY += (targetY - mouseY) * 0.05

      if (!isDragging) {
        mainGroup.rotation.y += 0.0025
        mainGroup.rotation.x = mouseY * 0.4 + Math.sin(elapsedTime * 0.3) * 0.05
        mainGroup.rotation.z = mouseX * 0.3
      }

      if (coreMeshRef.current) {
        coreMeshRef.current.rotation.y = elapsedTime * 0.2
        coreMeshRef.current.rotation.x = elapsedTime * 0.15
      }

      ringsRef.current.forEach((ring, idx) => {
        const speed = (idx % 2 === 0 ? 1 : -1) * (0.002 + idx * 0.001)
        ring.rotation.z += speed
      })

      if (particlesRef.current) {
        particlesRef.current.rotation.y = -elapsedTime * 0.04
      }

      renderer.render(scene, camera)
    }

    animate()

    // 视口自适应
    const handleResize = () => {
      if (!container) return
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)

    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)

      coreGeo.dispose()
      coreMat.dispose()
      wireGeo.dispose()
      wireMat.dispose()
      particleGeo.dispose()
      particleMat.dispose()
      renderer.dispose()

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [interactive, theme])

  // 2. 模式切换响应
  useEffect(() => {
    if (!coreMeshRef.current || !sphereGroupRef.current) return

    if (activeMode === 'crystal') {
      coreMeshRef.current.scale.set(1.4, 1.4, 1.4)
      ringsRef.current.forEach((r) => r.scale.set(0.85, 0.85, 0.85))
    } else if (activeMode === 'constellation') {
      coreMeshRef.current.scale.set(0.7, 0.7, 0.7)
      ringsRef.current.forEach((r) => r.scale.set(1.15, 1.15, 1.15))
    } else {
      coreMeshRef.current.scale.set(1.0, 1.0, 1.0)
      ringsRef.current.forEach((r) => r.scale.set(1.0, 1.0, 1.0))
    }
  }, [activeMode])

  const handleResetRotation = () => {
    if (sphereGroupRef.current) {
      sphereGroupRef.current.rotation.set(0, 0, 0)
    }
  }

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* 宣纸底衬与轻边框（随主题自适应） */}
      <div className="absolute inset-2 sm:inset-4 rounded-3xl border border-[var(--border)] bg-[var(--card-bg)] pointer-events-none shadow-[var(--card-shadow)] backdrop-blur-md transition-all" />

      {/* 3D 渲染画布挂载容器 */}
      <div
        ref={mountRef}
        className="w-full h-full min-h-[360px] sm:min-h-[460px] cursor-grab active:cursor-grabbing relative z-10"
      />

      {/* 左上角：格物浑天仪印鉴与题旨 */}
      <div className="absolute top-5 left-5 z-20 flex items-center gap-2.5 pointer-events-none">
        <ScholarSeal text={t.armillary.sealText} subtext={t.armillary.sealSubtext} size="sm" variant="cinnabar" />
        <div className="flex flex-col">
          <span className="font-serif text-xs font-semibold text-[var(--text-heading)] tracking-wider">
            {t.armillary.title}
          </span>
          <span className="text-[10px] text-[var(--text-muted)] font-mono tracking-widest uppercase">
            {t.armillary.subtitle}
          </span>
        </div>
      </div>

      {/* 右上角：交互模式切换器 */}
      {showControls && (
        <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 p-1 rounded-xl bg-[var(--card-elevated)] border border-[var(--border)] shadow-xs backdrop-blur-md">
          {(['celestial', 'crystal', 'constellation'] as SphereMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setActiveMode(mode)}
              className={`px-2.5 py-1 text-[11px] rounded-lg font-serif transition-all cursor-pointer ${
                activeMode === mode
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-xs font-medium'
                  : 'text-[var(--text-body)] hover:text-[var(--text-heading)] hover:bg-[var(--theme-tab-bg)]'
              }`}
              title={
                mode === 'celestial'
                  ? t.armillary.celestialTip
                  : mode === 'crystal'
                  ? t.armillary.crystalTip
                  : t.armillary.constellationTip
              }
            >
              {mode === 'celestial'
                ? t.armillary.celestialMode
                : mode === 'crystal'
                ? t.armillary.crystalMode
                : t.armillary.constellationMode}
            </button>
          ))}
          <button
            onClick={handleResetRotation}
            className="p-1 text-[var(--text-muted)] hover:text-[var(--text-heading)] rounded-lg hover:bg-[var(--theme-tab-bg)] transition-colors ml-0.5 cursor-pointer"
            title={t.armillary.resetTip}
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 底部禅意引导文字 */}
      <div className="absolute bottom-4 inset-x-6 z-20 flex items-center justify-between text-[11px] text-[var(--text-muted)] font-serif border-t border-[var(--border)] pt-2.5 pointer-events-none">
        <span className="flex items-center gap-1.5 text-[var(--text-muted)]">
          <Compass className="w-3 h-3 opacity-60" />
          <span>{t.armillary.guideInteraction}</span>
        </span>
        <span className="text-[var(--text-muted)] opacity-80 hidden sm:inline tracking-wider">
          {t.armillary.quote}
        </span>
      </div>
    </div>
  )
}
