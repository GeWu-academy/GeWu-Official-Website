import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import {
  Sparkles,
  ArrowRight,
  GitPullRequest,
  Bot,
  Layers,
  Cpu,
  Palette,
  Terminal,
  ShieldCheck,
} from 'lucide-react'
import { MagneticButton } from '@/components/magnetic-button'
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
  const badgeRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const metricsRef = useRef<HTMLDivElement>(null)
  const glassHubRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        badgeRef.current,
        { y: -20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, delay: 0.2 }
      )
        .fromTo(
          titleRef.current,
          { y: 30, opacity: 0, filter: 'blur(10px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1 },
          '-=0.5'
        )
        .fromTo(
          descRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          glassHubRef.current,
          { scale: 0.9, opacity: 0, rotateX: 15 },
          { scale: 1, opacity: 1, rotateX: 0, duration: 1.2, ease: 'expo.out' },
          '-=0.7'
        )
        .fromTo(
          metricsRef.current?.children || [],
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
          '-=0.6'
        )

      // 罗盘微动浮动
      if (glassHubRef.current) {
        gsap.to(glassHubRef.current, {
          y: -8,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const stackPills = [
    {
      name: 'AI & Agent 开发',
      desc: 'LLM 工作流 / Multi-Agent',
      icon: Bot,
      color: 'from-cyan-400 to-blue-500',
      border: 'hover:border-cyan-400/50',
    },
    {
      name: 'TypeScript 全栈',
      desc: 'React 19 / Next.js / Node',
      icon: Layers,
      color: 'from-blue-400 to-indigo-500',
      border: 'hover:border-blue-400/50',
    },
    {
      name: '系统工程 & 多语言',
      desc: 'Golang / Rust / 高并发',
      icon: Cpu,
      color: 'from-emerald-400 to-teal-500',
      border: 'hover:border-emerald-400/50',
    },
    {
      name: 'UI/UX 体验架构',
      desc: '设计系统 / 液态微交互',
      icon: Palette,
      color: 'from-pink-400 to-rose-500',
      border: 'hover:border-pink-400/50',
    },
  ]

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* 顶部标牌徽章 */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill mb-6 sm:mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-medium tracking-wide text-zinc-300">
            {COMMUNITY_INFO.subheading}
          </span>
          <span className="text-[11px] text-cyan-300/80 font-mono pl-1 border-l border-white/10 hidden sm:inline">
            GEWU PRACTICE HUB
          </span>
        </div>

        {/* 核心标语：名言 */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-5 sm:mb-6"
        >
          <span className="block text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
            穷理而格物
          </span>
          <span className="block mt-1 sm:mt-2 text-gradient-cyan drop-shadow-[0_10px_35px_rgba(56,189,248,0.25)]">
            知行以致远
          </span>
        </h1>

        {/* 英文副标与哲学 */}
        <p className="text-xs sm:text-sm uppercase tracking-[0.3em] font-mono text-zinc-400 mb-6 font-medium">
          {COMMUNITY_INFO.mottoTranslation}
        </p>

        {/* 初衷与愿景文案 */}
        <p
          ref={descRef}
          className="max-w-2xl text-base sm:text-lg md:text-xl text-zinc-300 font-normal leading-relaxed mb-8 sm:mb-10"
        >
          <span className="text-white font-medium">同行互帮互助</span>，打磨
          <span className="text-cyan-300 font-medium">硬核实战能力</span>，消除求职与技术
          <span className="text-zinc-100 font-medium">信息差</span>，助力成员
          <span className="text-emerald-300 font-medium">更好就业</span>。
        </p>

        {/* 行动号召 CTA 按钮组 */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14"
        >
          <MagneticButton
            size="lg"
            variant="primary"
            onClick={onExploreDirections}
            className="w-full sm:w-auto"
          >
            <span>探索实践方向</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </MagneticButton>

          <MagneticButton
            size="lg"
            variant="glass"
            onClick={onOpenMaintainer}
            className="w-full sm:w-auto"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>联系组织 Maintainer</span>
          </MagneticButton>

          <a
            href="https://github.com/gewu-academy"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto"
          >
            <MagneticButton size="lg" variant="outline" className="w-full">
              <GitPullRequest className="w-4 h-4 text-zinc-400" />
              <span>提交 Issue / PR</span>
            </MagneticButton>
          </a>
        </div>

        {/* 核心交互装置：Liquid Glass Core Hub */}
        <div
          ref={glassHubRef}
          className="w-full max-w-4xl relative p-6 sm:p-8 rounded-3xl liquid-glass-prominent border border-white/15 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] mb-14"
        >
          {/* 玻璃顶部折射装饰条 */}
          <div className="flex items-center justify-between pb-5 mb-5 border-b border-white/10 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <span className="font-mono text-[11px] text-zinc-300 pl-2">
                GEWU-ENGINE // v2.6.0
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-cyan-400">
              <Terminal className="w-3.5 h-3.5" />
              <span>知行合一 · 生产级落地</span>
            </div>
          </div>

          {/* 4 大核心领域轨道卡片 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-left">
            {stackPills.map((pill) => {
              const Icon = pill.icon
              return (
                <div
                  key={pill.name}
                  onClick={onExploreDirections}
                  className={`group/item relative p-4 rounded-xl liquid-glass bg-white/[0.02] border border-white/10 ${pill.border} hover:bg-white/[0.06] transition-all cursor-pointer`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-white/[0.06] border border-white/10 group-hover/item:scale-110 transition-transform">
                      <Icon className="w-4 h-4 text-cyan-300" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest group-hover/item:text-zinc-300">
                      CORE
                    </span>
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-1 group-hover/item:text-cyan-200 transition-colors">
                    {pill.name}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-snug">
                    {pill.desc}
                  </p>
                </div>
              )
            })}
          </div>

          {/* 底部信任徽章提示 */}
          <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
            <div className="flex items-center gap-1.5 text-zinc-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>拒绝形式主义 Demo · 全流程真实生产级代码审查</span>
            </div>
            <span className="font-mono text-[11px] text-cyan-400/90">
              开放 Issue & PR 提交通道
            </span>
          </div>
        </div>

        {/* 社区数据指标 */}
        <div
          ref={metricsRef}
          className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          {COMMUNITY_INFO.metrics.map((m) => (
            <div
              key={m.label}
              className="p-4 rounded-2xl liquid-glass bg-white/[0.02] border border-white/10 text-center"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-white mb-0.5 tracking-tight font-mono">
                {m.value}
              </div>
              <div className="text-xs font-medium text-cyan-400/90 mb-0.5">
                {m.label}
              </div>
              <div className="text-[11px] text-zinc-400">{m.unit}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
