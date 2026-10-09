import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import {
  Bot,
  Layers,
  Cpu,
  Palette,
  CheckCircle2,
  ArrowRight,
  BookOpen,
} from 'lucide-react'
import { TECH_STACK_DIRECTIONS } from '@/data/community-data'
import { ScholarSeal } from '@/components/scholar-seal'

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

  const tabClassicalNames: Record<string, { seal: string; label: string }> = {
    'ai-agent': { seal: '智能', label: 'AI & 智能体架构' },
    'typescript-fullstack': { seal: '全栈', label: '现代全栈工法' },
    'systems-engineering': { seal: '系统', label: '系统与高并发' },
    'ui-ux-design': { seal: '体验', label: '体验设计架构' },
  }

  // 切换 Tab 时优雅淡入
  useEffect(() => {
    if (!contentRef.current) return
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    )
  }, [activeTab])

  return (
    <section id="tech-directions" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 顶部标题 */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <ScholarSeal text="研习" subtext="方向" size="sm" variant="cinnabar" />
            <span className="font-serif text-xs tracking-widest text-[var(--text-muted)] uppercase">
              STUDY DISCIPLINES
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-heading)] tracking-tight mb-4">
            格物四修 · 研习方向
          </h2>
          <p className="font-serif text-sm sm:text-base text-[var(--text-body)] leading-relaxed">
            删繁就简，直面生产级系统本质。从前沿 AI 协同到高并发底座，沉淀真实硬核实力。
          </p>
        </div>

        {/* 选项卡按钮组 */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
          {TECH_STACK_DIRECTIONS.map((dir) => {
            const Icon = tabIcons[dir.id] || Bot
            const meta = tabClassicalNames[dir.id]
            const isActive = dir.id === activeTab

            return (
              <button
                key={dir.id}
                onClick={() => setActiveTab(dir.id)}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-2xl font-serif text-xs sm:text-sm transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md scale-[1.02]'
                    : 'bg-[var(--theme-tab-bg)] hover:bg-[var(--theme-hover-bg)] text-[var(--text-body)] hover:text-[var(--text-heading)] border border-[var(--border)] shadow-sm'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'opacity-60'}`} />
                <span className="font-medium">{meta?.label || dir.title}</span>
              </button>
            )
          })}
        </div>

        {/* 核心卡片展开视窗 */}
        <div
          ref={contentRef}
          className="scholar-card rounded-3xl p-6 sm:p-10 shadow-sm transition-all"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* 左侧：方向概旨与实作项目 */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[var(--theme-tab-bg)] text-[var(--text-body)] border border-[var(--border)]">
                    {currentDir.category}
                  </span>
                  <span className="text-xs font-serif text-[var(--text-muted)]">
                    {currentDir.badge}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-heading)] mb-3">
                  {currentDir.title}
                </h3>

                <p className="font-serif text-xs sm:text-sm text-[var(--text-muted)] mb-5 italic">
                  {currentDir.subtitle}
                </p>

                <p className="font-serif text-sm sm:text-base text-[var(--text-body)] leading-relaxed mb-6">
                  {currentDir.description}
                </p>
              </div>

              {/* 代表实作与号召 */}
              <div className="pt-6 border-t border-[var(--border)]">
                <div className="text-xs font-serif text-[var(--text-muted)] mb-2 font-medium">
                  书院研习产出实作：
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentDir.productionPractices.slice(0, 2).map((item, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1.5 rounded-xl bg-[var(--theme-tab-bg)] text-[var(--text-heading)] font-sans border border-[var(--border)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <button
                  onClick={onOpenMaintainer}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-serif font-bold text-[var(--text-heading)] hover:text-[var(--accent-seal)] transition-colors cursor-pointer group"
                >
                  <span>与此方向山长交流研习计划</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* 右侧：重点攻坚亮点与技术胶囊 */}
            <div className="lg:col-span-5 flex flex-col gap-6 bg-[var(--theme-tab-bg)] p-6 sm:p-7 rounded-2xl border border-[var(--border)]">
              <div>
                <h4 className="font-serif font-bold text-sm text-[var(--text-heading)] mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 opacity-70" />
                  <span>核心攻坚实战</span>
                </h4>
                <div className="space-y-2.5">
                  {currentDir.highlights.map((hl, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-body)] font-sans"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border)]">
                <h4 className="font-serif font-semibold text-xs text-[var(--text-muted)] mb-2.5">
                  研习技术矩阵
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {currentDir.coreTechnologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[var(--card-elevated)] text-[var(--text-body)] border border-[var(--border)] shadow-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
