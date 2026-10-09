import { useRef, useEffect } from 'react'
import { ArrowRight, Feather, GitPullRequest } from 'lucide-react'
import { ScholarSeal } from '@/components/scholar-seal'
import { GewuArmillarySphere } from '@/components/three/gewu-armillary-sphere'
import { COMMUNITY_INFO } from '@/data/community-data'
import { useI18n } from '@/i18n'
import { useUIStore } from '@/store/use-ui-store'
import { gsap, AnimatedCounter } from '@/animation'

interface HeroSectionProps {
  onOpenMaintainer?: () => void
  onExploreDirections?: () => void
}

export function HeroSection({
  onOpenMaintainer,
  onExploreDirections,
}: HeroSectionProps) {
  const { t } = useI18n()
  const openMaintainerModal = useUIStore((s) => s.openMaintainerModal)
  const metrics = t.hero?.metrics || COMMUNITY_INFO.metrics
  const containerRef = useRef<HTMLDivElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)
  const titleLinesRef = useRef<HTMLHeadingElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const metricsRef = useRef<HTMLDivElement>(null)

  const handleOpenMaintainer = () => {
    if (onOpenMaintainer) {
      onOpenMaintainer()
    } else {
      openMaintainerModal()
    }
  }

  const handleExploreDirections = () => {
    if (onExploreDirections) {
      onExploreDirections()
    } else {
      const el = document.getElementById('tech-directions')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        leftColRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.05 }
      )
        .fromTo(
          titleLinesRef.current?.children || [],
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
          '-=0.6'
        )
        .fromTo(
          rightColRef.current,
          { scale: 0.94, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.1, ease: 'expo.out' },
          '-=0.7'
        )
        .fromTo(
          ctaRef.current?.children || [],
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          '-=0.5'
        )
        .fromTo(
          metricsRef.current?.children || [],
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.06 },
          '-=0.4'
        )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] pt-20 sm:pt-24 pb-16 lg:pt-28 lg:pb-24 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* 左侧：宋韵文心 · 宗旨题辞 */}
        <div
          ref={leftColRef}
          className="lg:col-span-6 flex flex-col items-start text-left z-10"
        >
          {/* 标牌：朱砂印泥与学社定位 */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[var(--theme-tab-bg)] border border-[var(--border)] text-[var(--text-body)] mb-6 shadow-xs backdrop-blur-sm">
            <ScholarSeal text={t.hero.sealText || '格物'} subtext="" size="sm" variant="cinnabar" />
            <span className="font-serif text-xs tracking-wider text-[var(--text-muted)]">
              {t.hero.badge}
            </span>
          </div>

          {/* 书院名训：宋体金石大字 */}
          <h1
            ref={titleLinesRef}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-heading)] leading-[1.2] mb-6"
          >
            <span className="block">{t.hero.titleLine1}</span>
            <span className="block mt-1 sm:mt-2 text-[var(--text-body)]">
              {t.hero.titleLine2}
            </span>
          </h1>

          {/* 凝练初衷：控制信息密度，留白舒朗 */}
          <p className="font-serif text-base sm:text-lg text-[var(--text-body)] leading-relaxed mb-8 max-w-xl">
            {t.hero.descriptionQuote}
            <br />
            {t.hero.descriptionBody}
          </p>

          {/* 核心 CTA 行动按钮组 */}
          <div
            ref={ctaRef}
            className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 w-full sm:w-auto"
          >
            <button
              onClick={handleExploreDirections}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 font-serif text-sm font-medium shadow-[0_4px_16px_rgba(56,189,248,0.2)] dark:shadow-[0_4px_24px_rgba(56,189,248,0.3)] transition-all cursor-pointer"
            >
              <span>{t.hero.exploreBtn}</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={handleOpenMaintainer}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[var(--card-elevated)] hover:bg-[var(--theme-hover-bg)] text-[var(--text-heading)] border border-[var(--border)] font-serif text-sm font-medium shadow-xs transition-all cursor-pointer"
            >
              <Feather className="w-4 h-4 text-[var(--accent-seal)]" />
              <span>{t.hero.maintainerBtn}</span>
            </button>

            <a
              href="https://github.com/gewu-academy"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl text-[var(--text-muted)] hover:text-[var(--text-heading)] font-serif text-sm transition-colors"
            >
              <GitPullRequest className="w-4 h-4 opacity-60" />
              <span>{t.hero.prBtn}</span>
            </a>
          </div>

          {/* 简雅学社指标：4 枚极简指标卡片 */}
          <div
            ref={metricsRef}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-[var(--border)] w-full"
          >
            {metrics.map((m) => (
              <div key={m.label} className="flex flex-col">
                <div className="font-serif text-2xl font-bold text-[var(--text-heading)]">
                  <AnimatedCounter value={m.value} />
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
