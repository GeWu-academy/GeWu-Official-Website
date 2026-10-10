import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
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
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // 主题判定（须在所有材质构造之前）
    const isDark = theme === 'dark'

    // 环境贴图（丰富渐变天穹模拟 HDRI — 驱动所有物理材质真实反射）
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    const envScene = new THREE.Scene()

    // 天穹渐变球（从底到顶的温暖色调渐变，提供柔和包围反射）
    const skyGeo = new THREE.SphereGeometry(50, 32, 32)
    const skyCanvas = document.createElement('canvas')
    skyCanvas.width = 512
    skyCanvas.height = 512
    const skyCtx = skyCanvas.getContext('2d')!
    const skyGrad = skyCtx.createLinearGradient(0, 0, 0, 512)
    if (isDark) {
      skyGrad.addColorStop(0, '#1a1a2e')
      skyGrad.addColorStop(0.3, '#16213e')
      skyGrad.addColorStop(0.5, '#0f0f1a')
      skyGrad.addColorStop(0.7, '#1a1220')
      skyGrad.addColorStop(1, '#0a0a0f')
    } else {
      skyGrad.addColorStop(0, '#fef9ee')
      skyGrad.addColorStop(0.3, '#fff7ed')
      skyGrad.addColorStop(0.5, '#faf5f0')
      skyGrad.addColorStop(0.7, '#f0ebe4')
      skyGrad.addColorStop(1, '#e8e2d8')
    }
    skyCtx.fillStyle = skyGrad
    skyCtx.fillRect(0, 0, 512, 512)
    const skyTex = new THREE.CanvasTexture(skyCanvas)
    skyTex.mapping = THREE.EquirectangularReflectionMapping
    const skyMat = new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide })
    const skyMesh = new THREE.Mesh(skyGeo, skyMat)
    envScene.add(skyMesh)

    // 模拟多个区域光源 — 产生丰富的高光反射点
    const envLightPositions = [
      { pos: [5, 8, 3], color: isDark ? 0xc8d8f0 : 0xfff8ee, intensity: 2.5 },
      { pos: [-4, 5, -5], color: isDark ? 0xf59e0b : 0xfde68a, intensity: 1.5 },
      { pos: [0, -6, 4], color: isDark ? 0x6366f1 : 0xd4c8a8, intensity: 0.8 },
      { pos: [6, -2, -3], color: isDark ? 0xfb7185 : 0xfecaca, intensity: 0.6 },
      { pos: [-5, 0, 6], color: isDark ? 0x10b981 : 0xa7f3d0, intensity: 0.7 },
    ]
    envLightPositions.forEach(({ pos, color, intensity }) => {
      // 用小型发光球体替代单纯的方向光，产生更自然的面状反射
      const lightSphereGeo = new THREE.SphereGeometry(1.5, 16, 16)
      const lightSphereMat = new THREE.MeshBasicMaterial({ color })
      lightSphereMat.color.multiplyScalar(intensity)
      const lightSphere = new THREE.Mesh(lightSphereGeo, lightSphereMat)
      lightSphere.position.set(pos[0] * 3, pos[1] * 3, pos[2] * 3)
      envScene.add(lightSphere)
    })

    const envAmbient = new THREE.AmbientLight(0xffffff, 0.3)
    envScene.add(envAmbient)

    const envMap = pmremGenerator.fromScene(envScene, 0.02).texture
    envMap.mapping = THREE.EquirectangularReflectionMapping
    scene.environment = envMap
    envScene.dispose()
    pmremGenerator.dispose()

    // 光照系统
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

    // 核心多面体（黑曜晶石与宋瓷温润质感 — 高细分 + 高级物理材质）
    const coreGeo = new THREE.IcosahedronGeometry(1.0, 2)
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0x080808 : 0xfcfaf7,
      metalness: isDark ? 0.45 : 0.08,
      roughness: isDark ? 0.08 : 0.14,
      transmission: isDark ? 0.5 : 0.7,
      thickness: 1.5,
      ior: 1.52,
      transparent: true,
      opacity: isDark ? 0.96 : 0.9,
      reflectivity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      specularIntensity: isDark ? 1.0 : 0.8,
      specularColor: isDark ? new THREE.Color(0xffffff) : new THREE.Color(0xfef3c7),
      sheen: isDark ? 0.3 : 0.15,
      sheenRoughness: 0.2,
      sheenColor: isDark ? new THREE.Color(0xf59e0b) : new THREE.Color(0x0f766e),
      attenuationColor: isDark ? new THREE.Color(0x1a1a2e) : new THREE.Color(0xfef9ee),
      attenuationDistance: 3.0,
      emissive: isDark ? 0x0a0a14 : 0x000000,
      emissiveIntensity: isDark ? 0.15 : 0,
      envMapIntensity: 1.5,
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

    // 内部微型星核（暖金琥珀 / 翡翠青 — 宝石级物理材质）
    const innerGeo = new THREE.OctahedronGeometry(0.45, 1)
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0xf59e0b : 0x0f766e,
      roughness: 0.12,
      metalness: 0.5,
      emissive: isDark ? 0xf59e0b : 0x0f766e,
      emissiveIntensity: isDark ? 0.8 : 0.45,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      sheen: 0.5,
      sheenRoughness: 0.15,
      sheenColor: isDark ? new THREE.Color(0xfbbf24) : new THREE.Color(0x14b8a6),
      reflectivity: 1.0,
      envMapIntensity: 2.0,
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

      // 主圆环体（高精度管径 + 漆金属物理材质）
      const torusGeo = new THREE.TorusGeometry(radius, tubeRadius, 32, 160)
      const torusMat = new THREE.MeshPhysicalMaterial({
        color: colorHex,
        roughness: isDark ? 0.15 : 0.25,
        metalness: isDark ? 0.85 : 0.7,
        emissive: isDark ? colorHex : 0x000000,
        emissiveIntensity: isDark ? 0.25 : 0,
        clearcoat: 0.6,
        clearcoatRoughness: 0.15,
        reflectivity: 0.9,
        sheen: isDark ? 0.2 : 0.1,
        sheenRoughness: 0.3,
        sheenColor: isDark ? new THREE.Color(colorHex).lerp(new THREE.Color(0xffffff), 0.5) : new THREE.Color(0x44403c),
        envMapIntensity: 1.2,
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

    createArmillaryRing(0, 2.3, 0.05, Math.PI / 2, 0, 0, 0.45)
    createArmillaryRing(1, 2.0, 0.045, Math.PI / 4, Math.PI / 6, 0, 0.6)
    createArmillaryRing(2, 1.7, 0.04, 0, Math.PI / 3, Math.PI / 5, 0.4)
    createArmillaryRing(3, 1.35, 0.035, -Math.PI / 5, Math.PI / 2, Math.PI / 7, 0.5)

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
      const nodeGeo = new THREE.SphereGeometry(0.09, 24, 24)
      const nodeMat = new THREE.MeshPhysicalMaterial({
        color: dir.color,
        roughness: 0.12,
        metalness: 0.5,
        emissive: dir.color,
        emissiveIntensity: isDark ? 0.7 : 0.5,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        reflectivity: 1.0,
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

    // 水墨与星辰粒子（柔光星芒 — Canvas 生成径向渐变精灵纹理）
    const particleCount = 220
    const particlePositions = new Float32Array(particleCount * 3)
    const particleSizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.2 + Math.random() * 2.4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      particlePositions[i * 3 + 2] = radius * Math.cos(phi)
      particleSizes[i] = 0.03 + Math.random() * 0.05
    }

    // 生成柔光精灵纹理
    const spriteCanvas = document.createElement('canvas')
    spriteCanvas.width = 64
    spriteCanvas.height = 64
    const spriteCtx = spriteCanvas.getContext('2d')!
    const gradient = spriteCtx.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.15, 'rgba(255, 255, 255, 0.8)')
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.3)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    spriteCtx.fillStyle = gradient
    spriteCtx.fillRect(0, 0, 64, 64)
    const spriteTexture = new THREE.CanvasTexture(spriteCanvas)

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))

    const particleMat = new THREE.PointsMaterial({
      color: isDark ? 0xffffff : 0x8a8078,
      size: 0.06,
      map: spriteTexture,
      transparent: true,
      opacity: isDark ? 0.85 : 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
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

    // 后处理管线：Bloom 辉光效果
    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      isDark ? 0.45 : 0.25,  // 辉光强度
      0.6,                    // 辉光扩散半径
      isDark ? 0.75 : 0.85    // 阈值 — 只有足够亮的区域才泛光
    )
    composer.addPass(bloomPass)

    const outputPass = new OutputPass()
    composer.addPass(outputPass)

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

      composer.render()
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
      composer.setSize(newWidth, newHeight)
      bloomPass.resolution.set(newWidth, newHeight)
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
      spriteTexture.dispose()
      envMap.dispose()
      skyTex.dispose()
      composer.dispose()
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
