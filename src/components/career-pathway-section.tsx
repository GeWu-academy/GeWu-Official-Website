import { Target, Award, Check, ArrowRight } from 'lucide-react'
import { ScholarSeal } from '@/components/scholar-seal'
import { useI18n } from '@/i18n'
import { useUIStore } from '@/store/use-ui-store'

interface CareerPathwaySectionProps {
  onOpenMaintainer?: () => void
}

export function CareerPathwaySection({ onOpenMaintainer }: CareerPathwaySectionProps) {
  const { t } = useI18n()
  const openMaintainerModal = useUIStore((s) => s.openMaintainerModal)

  const handleOpenMaintainer = () => {
    if (onOpenMaintainer) {
      onOpenMaintainer()
    } else {
      openMaintainerModal()
    }
  }

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 标题 */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <ScholarSeal text={t.career.sealText} subtext={t.career.sealSubtext} size="sm" variant="cinnabar" />
            <span className="font-serif text-xs tracking-widest text-[var(--text-muted)] uppercase">
              {t.career.subtitle}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-heading)] tracking-tight mb-3">
            {t.career.title}
          </h2>
          <p className="font-serif text-sm sm:text-base text-[var(--text-body)] leading-relaxed">
            {t.career.desc}
          </p>
        </div>

        {/* 阶梯路径卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
          {t.career.steps.map((step) => (
            <div
              key={step.num}
              className="scholar-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between"
            >
              <div>
                <span className="font-serif text-xl font-bold text-[var(--accent-seal)] block mb-2">
                  {step.num}
                </span>
                <h3 className="font-serif text-base font-bold text-[var(--text-heading)] mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed font-sans">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-[var(--border)] flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-serif">
                <Target className="w-3.5 h-3.5 opacity-60" />
                <span>{t.career.loopTag}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 对比视窗：传统困境 vs 格物破局 */}
        <div className="scholar-card rounded-3xl p-6 sm:p-8">
          <div className="text-center max-w-lg mx-auto mb-6">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[var(--text-heading)] mb-1">
              {t.career.diffTitle}
            </h3>
            <p className="text-xs text-[var(--text-muted)] font-serif">
              {t.career.diffDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 mb-6">
            {t.career.differences.map((diff, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[var(--theme-tab-bg)] border border-[var(--border)] space-y-2.5 backdrop-blur-sm"
              >
                <div className="text-xs text-[var(--text-muted)] line-through pb-1.5 border-b border-[var(--border)] flex items-start gap-1.5">
                  <span className="text-[10px] font-serif px-1.5 py-0.5 rounded bg-[var(--theme-hover-bg)] text-[var(--text-muted)] shrink-0">
                    {t.career.badTag}
                  </span>
                  <span>{diff.traditional}</span>
                </div>
                <div className="text-xs sm:text-sm text-[var(--text-body)] flex items-start gap-2 pt-0.5">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="font-serif">{diff.gewu}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-serif">
              <Award className="w-4 h-4 opacity-60" />
              <span>{t.career.companionNote}</span>
            </div>
            <button
              onClick={handleOpenMaintainer}
              className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-[var(--text-heading)] hover:text-[var(--accent-seal)] transition-colors cursor-pointer"
            >
              <span>{t.career.mentorCta}</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
