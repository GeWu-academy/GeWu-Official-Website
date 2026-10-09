import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export function LiquidOrbBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const orb1Ref = useRef<HTMLDivElement>(null)
  const orb2Ref = useRef<HTMLDivElement>(null)
  const orb3Ref = useRef<HTMLDivElement>(null)
  const orb4Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const orb1 = orb1Ref.current
    const orb2 = orb2Ref.current
    const orb3 = orb3Ref.current
    const orb4 = orb4Ref.current
    if (!orb1 || !orb2 || !orb3 || !orb4) return

    // 为 4 个流体光球创建平滑随机漫游动画
    const ctx = gsap.context(() => {
      // Orb 1: 青色微光 (Cyan)
      gsap.to(orb1, {
        x: 'random(-80, 80)',
        y: 'random(-60, 60)',
        scale: 'random(0.9, 1.25)',
        duration: 9,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      // Orb 2: 靛蓝紫 (Indigo)
      gsap.to(orb2, {
        x: 'random(-100, 100)',
        y: 'random(-70, 70)',
        scale: 'random(0.85, 1.3)',
        duration: 12,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      // Orb 3: 翡翠青绿 (Emerald)
      gsap.to(orb3, {
        x: 'random(-70, 70)',
        y: 'random(-50, 50)',
        scale: 'random(0.8, 1.2)',
        duration: 10,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      // Orb 4: 琥珀金光 (Amber)
      gsap.to(orb4, {
        x: 'random(-60, 60)',
        y: 'random(-40, 40)',
        scale: 'random(0.9, 1.15)',
        duration: 14,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    }, containerRef)

    // 鼠标全局推力视差
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const normX = (e.clientX / innerWidth - 0.5) * 40
      const normY = (e.clientY / innerHeight - 0.5) * 40

      gsap.to(orb1, {
        xOffset: normX * 0.8,
        yOffset: normY * 0.8,
        duration: 1.5,
        ease: 'power2.out',
      })
      gsap.to(orb2, {
        xOffset: -normX * 0.6,
        yOffset: -normY * 0.6,
        duration: 2,
        ease: 'power2.out',
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#07090e]"
    >
      {/* 极简网格底纹 */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* 渐变暗角暗场 */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80" />

      {/* 流体光斑 1: 青色 */}
      <div
        ref={orb1Ref}
        className="absolute -top-[10%] left-[20%] h-[550px] w-[550px] rounded-full bg-cyan-500/12 blur-[130px] will-change-transform"
      />

      {/* 流体光斑 2: 靛紫星云 */}
      <div
        ref={orb2Ref}
        className="absolute top-[35%] right-[10%] h-[600px] w-[600px] rounded-full bg-indigo-600/10 blur-[150px] will-change-transform"
      />

      {/* 流体光斑 3: 翡翠青玉 */}
      <div
        ref={orb3Ref}
        className="absolute top-[65%] left-[10%] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[140px] will-change-transform"
      />

      {/* 流体光斑 4: 琥珀晚霞 */}
      <div
        ref={orb4Ref}
        className="absolute top-[85%] right-[25%] h-[480px] w-[480px] rounded-full bg-amber-500/8 blur-[120px] will-change-transform"
      />

      {/* 顶部中央微妙聚光灯 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[380px] w-[800px] bg-gradient-to-b from-cyan-400/10 to-transparent blur-3xl opacity-60" />
    </div>
  )
}
