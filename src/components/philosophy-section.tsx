import { Users, Cpu, Compass, TrendingUp, CheckCircle2 } from 'lucide-react'
import { ScholarSeal } from '@/components/scholar-seal'
import { useI18n } from '@/i18n'
import { useScrollReveal } from '@/animation'

export function PhilosophySection() {
  const { t } = useI18n()
  const sectionRef = useScrollReveal<HTMLElement>({
    selector: '.scholar-card',
    stagger: 0.14,
    y: 32,
    start: 'top 82%',
  })

  const iconMap: Record<string, React.ElementType> = {
    Users,
    Cpu,
    Compass,
    TrendingUp,
  }

  const p = t.philosophy

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* 顶部标题区：极简宋体留白 */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <ScholarSeal text={p.sealText} subtext={p.sealSubtext} size="sm" variant="cinnabar" />
            <span className="font-serif text-xs tracking-widest text-[var(--text-muted)] uppercase">
              {p.subtitle}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-heading)] tracking-tight mb-4">
            {p.title}
          </h2>
          <p className="font-serif text-sm sm:text-base text-[var(--text-body)] leading-relaxed">
            {p.originStory}
          </p>
        </div>

        {/* 四大支柱卡片（宣纸质感，低信息密度，间距开阔，适配暗色） */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-12">
          {p.pillars.map((pillar) => {
            const Icon = iconMap[pillar.iconName] || Users

            return (
              <div
                key={pillar.number}
                className="scholar-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  {/* 顶栏序号与宋风题签 */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-serif text-xs font-semibold text-[var(--accent-seal)] tracking-wider">
                      {pillar.prefix}
                    </span>
                    <span className="text-[11px] font-mono text-[var(--text-muted)]">
                      {pillar.tag}
                    </span>
                  </div>

                  {/* 核心主标题 */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="p-2.5 rounded-xl bg-[var(--theme-tab-bg)] text-[var(--text-heading)] shrink-0 border border-[var(--border)]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[var(--text-heading)]">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] font-serif mt-0.5">
                        {pillar.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* 简要说明 */}
                  <p className="text-sm text-[var(--text-body)] leading-relaxed mb-6 font-serif">
                    {pillar.description}
                  </p>
                </div>

                {/* 落地清单：极简 3 条 */}
                <div className="pt-4 border-t border-[var(--border)] space-y-2">
                  {pillar.details.map((detail, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs sm:text-sm text-[var(--text-body)]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="font-sans">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* 底部文人雅句横幅 */}
        <div className="scholar-card rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <ScholarSeal text={p.bannerSealText} subtext={p.bannerSealSubtext} size="md" variant="outline" />
            <div>
              <h4 className="font-serif font-bold text-base text-[var(--text-heading)]">
                {p.bannerTitle}
              </h4>
              <p className="text-xs text-[var(--text-muted)] font-serif mt-0.5">
                {p.bannerDesc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-serif text-[var(--text-body)]">
            <span className="px-3 py-1.5 rounded-lg bg-[var(--theme-tab-bg)] border border-[var(--border)]">
              {p.bannerTag1}
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-[var(--theme-tab-bg)] border border-[var(--border)]">
              {p.bannerTag2}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
