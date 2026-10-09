import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ArrowRight, Feather, GitPullRequest } from 'lucide-react'
import { ScholarSeal } from '@/components/scholar-seal'
import { GewuArmillarySphere } from '@/components/three/gewu-armillary-sphere'
import { COMMUNITY_INFO } from '@/data/community-data'

interface HeroSectionProps {
  onOpenMaintainer: () => void
  onExploreDirections: () => void
}

export function HeroSection({
  onOpenMaintainer,
  onExploreDirections,
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        leftColRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.1 }
      ).fromTo(
        rightColRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'expo.out' },
        '-=0.7'
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] pt-28 pb-16 lg:py-32 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* 左侧：宋韵文心 · 宗旨题辞 */}
        <div
          ref={leftColRef}
          className="lg:col-span-6 flex flex-col items-start text-left z-10"
        >
          {/* 标牌：朱砂印泥与学社定位 */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[var(--theme-tab-bg)] border border-[var(--border)] text-[var(--text-body)] mb-6 shadow-sm">
            <ScholarSeal text="格物" subtext="" size="sm" variant="cinnabar" />
            <span className="font-serif text-xs tracking-wider text-[var(--text-body)]">
              面向开发者与设计师的实践学社
            </span>
          </div>

          {/* 书院名训：宋体金石大字 */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-heading)] leading-[1.2] mb-6">
            <span className="block">穷理而格物</span>
            <span className="block mt-1 sm:mt-2 text-[var(--text-body)]">
              知行以致远
            </span>
          </h1>

          {/* 凝练初衷：控制信息密度，留白舒朗 */}
          <p className="font-serif text-base sm:text-lg text-[var(--text-body)] leading-relaxed mb-8 max-w-xl">
            「致知在格物，物格而后知至。」
            <br />
            同行互帮互助，打磨硬核实战能力，消除技术与求职信息差，助力成员更好立身与就业。
          </p>

          {/* 核心 CTA 行动按钮组 */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 w-full sm:w-auto">
            <button
              onClick={onExploreDirections}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[var(--primary)] text-[var(--primary-foreground)] font-serif text-sm font-medium shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:opacity-90 hover:shadow-lg transition-all cursor-pointer"
            >
              <span>问道研习方向</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={onOpenMaintainer}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[var(--card-elevated)] hover:bg-[var(--theme-hover-bg)] text-[var(--text-heading)] border border-[var(--border)] font-serif text-sm font-medium shadow-sm transition-all cursor-pointer"
            >
              <Feather className="w-4 h-4 text-[var(--accent-seal)]" />
              <span>拜谒山长 / 申请入阁</span>
            </button>

            <a
              href="https://github.com/gewu-academy"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl text-[var(--text-muted)] hover:text-[var(--text-heading)] font-serif text-sm transition-colors"
            >
              <GitPullRequest className="w-4 h-4 opacity-70" />
              <span>共建 PR</span>
            </a>
          </div>

          {/* 简雅学社指标：4 枚极简指标卡片 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-[var(--border)] w-full">
            {COMMUNITY_INFO.metrics.map((m) => (
              <div key={m.label} className="flex flex-col">
                <div className="font-serif text-2xl font-bold text-[var(--text-heading)]">
                  {m.value}
                </div>
                <div className="text-xs text-[var(--text-muted)] font-serif mt-0.5">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧：Three.js 格物乾坤仪装置 */}
        <div
          ref={rightColRef}
          id="celestial-lab"
          className="lg:col-span-6 relative w-full h-[380px] sm:h-[460px] lg:h-[500px]"
        >
          <GewuArmillarySphere interactive={true} showControls={true} />
        </div>
      </div>
    </section>
  )
}
