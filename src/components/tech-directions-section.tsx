import { useRef, useEffect } from 'react'
import {
  Bot,
  Layers,
  Cpu,
  Palette,
  CheckCircle2,
  ArrowRight,
  BookOpen,
} from 'lucide-react'
import { ScholarSeal } from '@/components/scholar-seal'
import { preloadMaintainerAssets } from '@/lib/preload'
import { useI18n } from '@/i18n'
import { useUIStore } from '@/store/use-ui-store'
import { animateTabSwitch, useScrollReveal } from '@/animation'

interface TechDirectionsSectionProps {
  onOpenMaintainer?: () => void
}

export function TechDirectionsSection({ onOpenMaintainer }: TechDirectionsSectionProps) {
  const { t } = useI18n()
  const activeTab = useUIStore((s) => s.activeDirectionTab)
  const setActiveTab = useUIStore((s) => s.setActiveDirectionTab)
  const openMaintainerModal = useUIStore((s) => s.openMaintainerModal)
  const contentRef = useRef<HTMLDivElement>(null)

  const sectionRef = useScrollReveal<HTMLElement>({
    selector: '.scholar-card',
    y: 28,
    duration: 0.8,
    start: 'top 82%',
  })

  const td = t.techDirections
  const currentDir =
    td.directions.find((d) => d.id === activeTab) || td.directions[0]

  const tabIcons: Record<string, React.ElementType> = {
    'ai-agent': Bot,
    'typescript-fullstack': Layers,
    'systems-engineering': Cpu,
    'ui-ux-design': Palette,
  }

  const handleOpenMaintainer = () => {
    if (onOpenMaintainer) {
      onOpenMaintainer()
    } else {
      openMaintainerModal()
    }
  }

  // 切换 Tab 时屏风折扇般优雅展开
  useEffect(() => {
    if (!contentRef.current) return
    const tween = animateTabSwitch(contentRef.current)
    return () => {
      tween.kill()
    }
  }, [activeTab])

  return (
    <section
      ref={sectionRef}
      id="tech-directions"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* 顶部标题 */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <ScholarSeal text={td.sealText} subtext={td.sealSubtext} size="sm" variant="cinnabar" />
            <span className="font-serif text-xs tracking-widest text-[var(--text-muted)] uppercase">
              {td.subtitle}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-heading)] tracking-tight mb-4">
            {td.title}
          </h2>
          <p className="font-serif text-sm sm:text-base text-[var(--text-body)] leading-relaxed">
            {td.desc}
          </p>
        </div>

        {/* 极简宋风折扇/屏风选项卡 */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
          {td.directions.map((dir) => {
            const Icon = tabIcons[dir.id] || Bot
            const isActive = dir.id === activeTab

            return (
              <button
                key={dir.id}
                onClick={() => setActiveTab(dir.id)}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-2xl font-serif text-xs sm:text-sm transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md dark:shadow-[0_4px_16px_rgba(255,255,255,0.18)] scale-[1.02] font-semibold'
                    : 'bg-[var(--theme-tab-bg)] hover:bg-[var(--theme-hover-bg)] text-[var(--text-body)] hover:text-[var(--text-heading)] border border-[var(--border)] shadow-xs'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-amber-300 dark:text-[var(--primary-foreground)]' : 'text-[var(--text-muted)]'
                  }`}
                />
                <span className="font-medium">{dir.tabLabel || dir.title}</span>
              </button>
            )
          })}
        </div>

        {/* 核心屏风展开视窗（宣纸与黑曜晶石质感自适应、留白充裕） */}
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
                <div className="text-xs font-serif text-[var(--text-muted)] mb-2.5 font-medium">
                  {td.practicesTitle}
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentDir.productionPractices.slice(0, 3).map((item, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1.5 rounded-xl bg-[var(--theme-tab-bg)] text-[var(--text-body)] font-sans border border-[var(--border)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <button
                  onClick={handleOpenMaintainer}
                  onMouseEnter={preloadMaintainerAssets}
                  onTouchStart={preloadMaintainerAssets}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-serif font-bold text-[var(--text-heading)] hover:text-[var(--accent-seal)] transition-colors cursor-pointer group"
                >
                  <span>{td.exploreWithMaintainer}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* 右侧：重点攻坚亮点与技术胶囊 */}
            <div className="lg:col-span-5 flex flex-col gap-6 bg-[var(--theme-tab-bg)] p-6 sm:p-7 rounded-2xl border border-[var(--border)] backdrop-blur-sm">
              <div>
                <h4 className="font-serif font-bold text-sm text-[var(--text-heading)] mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[var(--text-muted)]" />
                  <span>{td.coreCombatTitle}</span>
                </h4>
                <div className="space-y-2.5">
                  {currentDir.highlights.map((hl, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-body)] font-sans"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border)]">
                <h4 className="font-serif font-semibold text-xs text-[var(--text-muted)] mb-2.5">
                  {td.techMatrixTitle}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {currentDir.coreTechnologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[var(--card-elevated)] text-[var(--text-body)] border border-[var(--border)] shadow-2xs"
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
