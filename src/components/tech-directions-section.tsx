import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import {
  Bot,
  Layers,
  Cpu,
  Palette,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Code2,
  Workflow,
  Sparkles,
} from 'lucide-react'
import { TECH_STACK_DIRECTIONS } from '@/data/community-data'
import { MagneticButton } from '@/components/magnetic-button'

interface TechDirectionsSectionProps {
  onOpenMaintainer: () => void
}

export function TechDirectionsSection({ onOpenMaintainer }: TechDirectionsSectionProps) {
  const [activeTab, setActiveTab] = useState(TECH_STACK_DIRECTIONS[0].id)
  const contentRef = useRef<HTMLDivElement>(null)

  const currentDir =
    TECH_STACK_DIRECTIONS.find((d) => d.id === activeTab) || TECH_STACK_DIRECTIONS[0]

  const tabIcons: Record<string, React.ElementType> = {
    'ai-agent': Bot,
    'typescript-fullstack': Layers,
    'systems-engineering': Cpu,
    'ui-ux-design': Palette,
  }

  // 切换 Tab 时触发 GSAP 优雅内容重排与淡入
  useEffect(() => {
    if (!contentRef.current) return
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 15, filter: 'blur(4px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.45, ease: 'power2.out' }
    )
  }, [activeTab])

  return (
    <section id="tech-directions" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 标题 */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass-pill text-xs font-mono text-cyan-300 mb-4">
            <Workflow className="w-3.5 h-3.5" />
            <span>PRACTICE & TECH DOMAINS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5">
            技术栈与实践方向
          </h2>
          <p className="text-base sm:text-lg text-zinc-300">
            拒绝蜻蜓点水。聚焦真实工业级生产实践，打磨从底层系统到前沿 Agent 的硬核工程能力。
          </p>
        </div>

        {/* 顶部 Tab 选择器（支持横向滚动，移动端完美适配） */}
        <div className="flex items-center justify-start lg:justify-center gap-2.5 overflow-x-auto pb-4 mb-10 no-scrollbar select-none">
          {TECH_STACK_DIRECTIONS.map((dir) => {
            const Icon = tabIcons[dir.id] || Code2
            const isActive = activeTab === dir.id
            return (
              <button
                key={dir.id}
                onClick={() => setActiveTab(dir.id)}
                className={`relative flex items-center gap-2.5 px-4 sm:px-6 py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? 'liquid-glass-prominent bg-white/[0.1] text-white border-cyan-400/50 shadow-[0_0_25px_rgba(6,182,212,0.25)]'
                    : 'liquid-glass text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <div
                  className={`p-1.5 rounded-lg ${
                    isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/[0.05] text-zinc-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span>{dir.title}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse ml-0.5" />
                )}
              </button>
            )
          })}
        </div>

        {/* 详情内容容器 */}
        <div
          ref={contentRef}
          className="rounded-3xl liquid-glass-prominent p-6 sm:p-10 border border-white/15 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
        >
          {/* 方向头部概要 */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-0.5 text-xs font-mono font-medium rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  {currentDir.badge}
                </span>
                <span className="text-xs text-zinc-400 font-mono tracking-wider">
                  {currentDir.category}
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">
                {currentDir.title}
              </h3>
              <p className="text-sm sm:text-base text-cyan-300/80 font-mono">
                {currentDir.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <MagneticButton
                size="md"
                variant="primary"
                onClick={onOpenMaintainer}
                className="gap-2 shrink-0"
              >
                <Sparkles className="w-4 h-4" />
                <span>加入本方向实践</span>
              </MagneticButton>
            </div>
          </div>

          {/* 核心描述与亮点网格 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
            {/* 左侧：深度实践与架构脉络 */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span>核心实践领域与重点攻坚</span>
                </h4>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
                  {currentDir.description}
                </p>

                <div className="space-y-3">
                  {currentDir.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl liquid-glass bg-white/[0.02] border border-white/10 flex items-start gap-3 hover:bg-white/[0.05] transition-colors"
                    >
                      <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-zinc-200">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 核心工具链 Tags */}
              <div className="pt-4">
                <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
                  CORE TECH STACKS & ECOSYSTEM
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentDir.coreTechnologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-white/[0.04] text-zinc-300 border border-white/10 hover:border-cyan-400/40 hover:text-white transition-all select-none"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 右侧：进阶路线图与架构流动视窗 */}
            <div className="lg:col-span-5 space-y-6">
              {/* 进阶路线图 */}
              <div className="p-5 sm:p-6 rounded-2xl liquid-glass bg-white/[0.02] border border-white/10">
                <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-cyan-400" />
                  <span>3 阶段成长路径演进</span>
                </h4>

                <div className="space-y-4">
                  {currentDir.curriculum.map((step, idx) => (
                    <div key={idx} className="relative pl-6 pb-2 last:pb-0">
                      {/* 时间线连接轴 */}
                      {idx !== currentDir.curriculum.length - 1 && (
                        <div className="absolute left-2.5 top-5 bottom-0 w-px bg-white/10" />
                      )}
                      <div className="absolute left-1 top-1.5 w-3 h-3 rounded-full bg-cyan-400/80 border-2 border-[#090b10]" />

                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/70 px-1.5 py-0.5 rounded border border-cyan-800/60">
                          {step.phase}
                        </span>
                        <h5 className="text-xs sm:text-sm font-semibold text-white">
                          {step.title}
                        </h5>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{step.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 架构节点拓扑预览卡片 */}
              <div className="p-5 sm:p-6 rounded-2xl liquid-glass bg-white/[0.02] border border-white/10">
                <div className="flex items-center justify-between mb-3 text-xs font-mono text-zinc-400">
                  <span className="uppercase">ARCHITECTURE TOPOLOGY</span>
                  <span className="text-cyan-400 text-[10px]">PRODUCTION FLOW</span>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs">
                  <div className="flex flex-wrap items-center gap-1.5 text-zinc-300">
                    {currentDir.architecturePreview.nodes.map((node, i) => (
                      <div key={node} className="flex items-center gap-1.5">
                        <span className="px-2 py-1 rounded bg-white/[0.06] border border-white/15 text-[11px] text-cyan-200">
                          {node}
                        </span>
                        {i < currentDir.architecturePreview.nodes.length - 1 && (
                          <ChevronRight className="w-3 h-3 text-zinc-500 shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 对应孵化项目 */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <span className="text-[11px] font-mono text-zinc-400 block mb-2">
                    书院真实孵化工程参考：
                  </span>
                  <div className="space-y-1.5">
                    {currentDir.productionPractices.map((prac, i) => (
                      <div key={i} className="text-xs text-zinc-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                        <span className="truncate">{prac}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
