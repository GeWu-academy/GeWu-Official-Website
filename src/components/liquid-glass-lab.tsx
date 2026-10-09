import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { Sliders, Sparkles, Move, Eye, Code, Zap } from 'lucide-react'

export function LiquidGlassLab() {
  const [activePreset, setActivePreset] = useState<'frost' | 'prismatic' | 'aqua' | 'obsidian'>('prismatic')
  const [blurAmount, setBlurAmount] = useState(24)
  const [refractionScale, setRefractionScale] = useState(1.15)
  const [chromaticShift, setChromaticShift] = useState(4)

  const labAreaRef = useRef<HTMLDivElement>(null)
  const lensRef = useRef<HTMLDivElement>(null)
  const lensAuraRef = useRef<HTMLDivElement>(null)

  const presets = [
    {
      id: 'prismatic',
      name: '流体虹光 · 棱镜折射',
      blur: 28,
      refraction: 1.2,
      chromatic: 6,
      border: 'border-cyan-400/40',
      aura: 'bg-gradient-to-tr from-cyan-400/20 via-pink-400/20 to-blue-500/20',
    },
    {
      id: 'frost',
      name: '凝霜冰玉 · 哑光磨砂',
      blur: 36,
      refraction: 1.05,
      chromatic: 2,
      border: 'border-white/30',
      aura: 'bg-white/10',
    },
    {
      id: 'aqua',
      name: '水玉清流 · 超透高亮',
      blur: 16,
      refraction: 1.25,
      chromatic: 3,
      border: 'border-cyan-300/60',
      aura: 'bg-cyan-400/15',
    },
    {
      id: 'obsidian',
      name: '黑曜晶石 · 深邃反光',
      blur: 32,
      refraction: 1.1,
      chromatic: 5,
      border: 'border-indigo-400/30',
      aura: 'bg-indigo-600/15',
    },
  ]

  const handlePresetChange = (presetId: 'frost' | 'prismatic' | 'aqua' | 'obsidian') => {
    setActivePreset(presetId)
    const p = presets.find((item) => item.id === presetId)
    if (!p) return

    // 用 GSAP 平滑插值动画过渡状态
    const dummy = {
      blur: blurAmount,
      refraction: refractionScale,
      chromatic: chromaticShift,
    }

    gsap.to(dummy, {
      blur: p.blur,
      refraction: p.refraction,
      chromatic: p.chromatic,
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: () => {
        setBlurAmount(Math.round(dummy.blur))
        setRefractionScale(Number(dummy.refraction.toFixed(2)))
        setChromaticShift(Math.round(dummy.chromatic))
      },
    })
  }

  // 鼠标在实验室移动时，驱动透镜跟随与 GSAP 物理惯性阻尼
  useEffect(() => {
    const area = labAreaRef.current
    const lens = lensRef.current
    const aura = lensAuraRef.current
    if (!area || !lens) return

    // 初始位置居中
    const rect = area.getBoundingClientRect()
    gsap.set(lens, {
      x: rect.width / 2 - 80,
      y: rect.height / 2 - 80,
    })

    const handleMouseMove = (e: MouseEvent) => {
      const areaRect = area.getBoundingClientRect()
      const targetX = e.clientX - areaRect.left - 80
      const targetY = e.clientY - areaRect.top - 80

      // 限制在容器内
      const clampedX = Math.max(0, Math.min(areaRect.width - 160, targetX))
      const clampedY = Math.max(0, Math.min(areaRect.height - 160, targetY))

      gsap.to(lens, {
        x: clampedX,
        y: clampedY,
        duration: 0.5,
        ease: 'power3.out',
      })

      if (aura) {
        gsap.to(aura, {
          x: clampedX - 20,
          y: clampedY - 20,
          duration: 0.8,
          ease: 'power2.out',
        })
      }
    }

    area.addEventListener('mousemove', handleMouseMove)
    return () => area.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section id="liquid-lab" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 标题 */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass-pill text-xs font-mono text-cyan-300 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE GSAP OPTICS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5">
            透明液态玻璃 · 交互实验室
          </h2>
          <p className="text-base sm:text-lg text-zinc-300">
            体验 GSAP 物理阻尼与液态高光折射。在下方工作台中移动鼠标，探索折射透镜对底层架构代码的光学扭曲与色散。
          </p>
        </div>

        {/* 实验室核心工作台 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 左侧控制台 Controls */}
          <div className="lg:col-span-4 p-6 rounded-3xl liquid-glass-prominent border border-white/15 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 font-semibold text-white text-sm">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>光学物理控制台</span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">GSAP DAMPING</span>
            </div>

            {/* 预设切换 */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-2.5">
                液态玻璃材质预设
              </label>
              <div className="grid grid-cols-1 gap-2">
                {presets.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handlePresetChange(p.id as any)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-left transition-all cursor-pointer ${
                      activePreset === p.id
                        ? 'liquid-glass bg-cyan-500/15 text-white border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                        : 'bg-white/[0.02] text-zinc-400 hover:text-white hover:bg-white/[0.06] border border-white/5'
                    }`}
                  >
                    <span>{p.name}</span>
                    {activePreset === p.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 参数微调 Sliders */}
            <div className="space-y-4 pt-2 border-t border-white/10">
              {/* 模糊度 */}
              <div>
                <div className="flex justify-between text-xs font-mono text-zinc-300 mb-1.5">
                  <span>高斯模糊 (Blur)</span>
                  <span className="text-cyan-400">{blurAmount}px</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="48"
                  value={blurAmount}
                  onChange={(e) => setBlurAmount(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-white/10 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              {/* 折射放大 */}
              <div>
                <div className="flex justify-between text-xs font-mono text-zinc-300 mb-1.5">
                  <span>折射率倍率 (Refraction)</span>
                  <span className="text-cyan-400">{refractionScale}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="1.35"
                  step="0.01"
                  value={refractionScale}
                  onChange={(e) => setRefractionScale(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-white/10 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              {/* 色散位移 */}
              <div>
                <div className="flex justify-between text-xs font-mono text-zinc-300 mb-1.5">
                  <span>色散分离 (Chromatic)</span>
                  <span className="text-cyan-400">{chromaticShift}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={chromaticShift}
                  onChange={(e) => setChromaticShift(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-white/10 h-1.5 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-[11px] text-zinc-400 flex items-start gap-2">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                支持移动端触控拖动，GSAP 阻尼引擎保障 60fps 丝滑插值与零跳帧。
              </span>
            </div>
          </div>

          {/* 右侧交互展示区域 Viewport */}
          <div className="lg:col-span-8">
            <div
              ref={labAreaRef}
              className="relative h-[480px] sm:h-[520px] rounded-3xl liquid-glass-prominent border border-white/15 overflow-hidden select-none cursor-crosshair shadow-2xl"
            >
              {/* 顶部指示条 */}
              <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-300">
                  <Move className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span>在区域内滑动鼠标移动折射透镜</span>
                </div>
                <span className="text-[11px] font-mono text-cyan-400/90 hidden sm:inline-block">
                  ACTIVE: {activePreset.toUpperCase()}
                </span>
              </div>

              {/* 背景被折射的内容：代码拓扑与东方书院铭文 */}
              <div className="absolute inset-0 p-8 sm:p-12 font-mono text-xs overflow-hidden flex flex-col justify-between opacity-85">
                <div className="space-y-3 pointer-events-none">
                  <div className="text-cyan-400/90 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    <span>// Gewu Academy Core Runtime: Agent Loop & Knowledge Engine</span>
                  </div>
                  <pre className="text-zinc-400 text-[11px] sm:text-xs leading-relaxed font-mono">
{`async function exploreTruth() {
  const quest = new Quest({ motto: "穷理而格物，知行以致远" });
  const agentMesh = await MultiAgentMesh.spawn({
    roles: ["AI & Agent Architect", "TypeScript Master", "Systems Engineer", "UI/UX Designer"],
    protocol: "Peer-to-Peer Mutual Aid"
  });

  const productionStream = agentMesh.execute({
    target: "Hardcore Production Project",
    zeroInformationGap: true,
    careerEmpowerment: "Direct Referrals & High-Rate Employment"
  });

  return await productionStream.synthesize();
}`}
                  </pre>
                </div>

                {/* 背景图形元素 */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pointer-events-none pt-6 border-t border-white/10">
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="text-xs text-zinc-400 mb-1">折射状态</div>
                    <div className="text-sm font-semibold text-white">Active Refraction</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="text-xs text-zinc-400 mb-1">物理算法</div>
                    <div className="text-sm font-semibold text-cyan-300">GSAP Elastic Damping</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="text-xs text-zinc-400 mb-1">渲染帧率</div>
                    <div className="text-sm font-semibold text-emerald-300">60 FPS Stable</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="text-xs text-zinc-400 mb-1">书院精神</div>
                    <div className="text-sm font-semibold text-amber-300">知行合一</div>
                  </div>
                </div>
              </div>

              {/* 背后流动的微光 Aura */}
              <div
                ref={lensAuraRef}
                className="pointer-events-none absolute w-[200px] h-[200px] rounded-full bg-cyan-400/20 blur-3xl transition-opacity will-change-transform"
              />

              {/* 核心物理透镜组件：GSAP 驱动位置与形变 */}
              <div
                ref={lensRef}
                style={{
                  backdropFilter: `blur(${blurAmount}px) saturate(200%)`,
                  WebkitBackdropFilter: `blur(${blurAmount}px) saturate(200%)`,
                  transform: `scale(${refractionScale})`,
                  boxShadow: `
                    0 20px 45px rgba(0, 0, 0, 0.6),
                    inset 0 1px 2px rgba(255, 255, 255, 0.5),
                    inset 0 -1px 2px rgba(0, 0, 0, 0.4),
                    0 0 ${chromaticShift * 4}px rgba(56, 189, 248, 0.3)
                  `,
                }}
                className={`pointer-events-none absolute w-[160px] h-[160px] rounded-full border-2 border-white/30 flex items-center justify-center will-change-transform ${
                  presets.find((p) => p.id === activePreset)?.border || 'border-cyan-400/40'
                }`}
              >
                {/* 透镜中心光斑十字准星 */}
                <div className="relative flex flex-col items-center justify-center text-center">
                  <div className="w-6 h-6 rounded-full border border-cyan-300/60 flex items-center justify-center mb-1 bg-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                    <Eye className="w-3.5 h-3.5 text-cyan-200" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-cyan-200 font-bold drop-shadow">
                    GEWU LENS
                  </span>
                  <span className="text-[9px] font-mono text-zinc-300">
                    {refractionScale}x 折射
                  </span>
                </div>

                {/* 色散外圈光晕 */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none opacity-40 mix-blend-screen"
                  style={{
                    background: `conic-gradient(from 0deg, rgba(239,68,68,0.5), rgba(59,130,246,0.5), rgba(16,185,129,0.5), rgba(239,68,68,0.5))`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
