import { useState, useRef } from 'react'
import { RefreshCw, BookmarkCheck, Check, Feather } from 'lucide-react'
import { ScholarSeal } from '@/components/scholar-seal'
import { useI18n } from '@/i18n'
import { animateOracleCast, useCardTilt } from '@/animation'

export function GewuOracleLot() {
  const { t } = useI18n()
  const lots = t.oracle.lots
  const [currentLotIndex, setCurrentLotIndex] = useState(0)
  const [isCasting, setIsCasting] = useState(false)
  const [copied, setCopied] = useState(false)

  const cardRef = useCardTilt<HTMLDivElement>({ maxRotation: 4, scale: 1.01 })
  const sealRef = useRef<HTMLDivElement>(null)

  const lot = lots[currentLotIndex] || lots[0]

  const handleCastLot = () => {
    if (isCasting || !cardRef.current) return
    setIsCasting(true)

    animateOracleCast(cardRef.current, sealRef.current, () => {
      let nextIndex = Math.floor(Math.random() * lots.length)
      if (nextIndex === currentLotIndex) {
        nextIndex = (currentLotIndex + 1) % lots.length
      }
      setCurrentLotIndex(nextIndex)
    }).eventCallback('onComplete', () => {
      setIsCasting(false)
    })
  }

  const handleCopyMotto = () => {
    const text = `【${t.nav.title}·${lot.tier}】「${lot.motto}」—— ${lot.principle} (${t.oracle.dosLabel}: ${lot.dos} / ${t.oracle.dontsLabel}: ${lot.donts})`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* 宣纸竹简与黑曜晶石自适应卡片主体 */}
      <div
        ref={cardRef}
        className="relative rounded-3xl bg-gradient-to-b from-[#fbfbfa] to-[#f4f2ea] dark:from-[#131722] dark:to-[#0a0d14] border border-stone-200/90 dark:border-white/[0.08] p-6 sm:p-8 shadow-[0_12px_40px_rgba(28,25,23,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.08)] overflow-hidden transition-all duration-500 backdrop-blur-md"
      >
        {/* 背景素淡花窗水墨晕边 */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-[var(--border)]/30 to-transparent rounded-bl-full pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-gradient-to-tr from-[var(--accent-seal)]/5 dark:from-[var(--accent-cyan)]/10 to-transparent rounded-tr-full pointer-events-none" />

        {/* 顶部标题栏：印章与签次 */}
        <div className="relative z-10 flex items-center justify-between pb-5 border-b border-[var(--border)] mb-6">
          <div className="flex items-center gap-3">
            <div ref={sealRef}>
              <ScholarSeal text={t.oracle.sealText} subtext={t.oracle.sealSubtext} size="md" variant="cinnabar" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg text-[var(--text-heading)] tracking-wide">
                  {t.oracle.cardTitle}
                </h3>
                <span className="px-2 py-0.5 rounded text-[11px] font-serif font-medium bg-[var(--accent-seal)]/10 text-[var(--accent-seal)] border border-[var(--accent-seal)]/20">
                  {lot.tier}
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] font-serif">
                {t.oracle.todayMottoTag}
              </p>
            </div>
          </div>

          <button
            onClick={handleCastLot}
            disabled={isCasting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--card-elevated)] text-xs font-serif text-[var(--text-body)] border border-[var(--border)] hover:text-[var(--text-heading)] hover:bg-[var(--theme-hover-bg)] shadow-xs transition-all cursor-pointer active:scale-95 disabled:opacity-50"
            title={t.oracle.redrawBtn}
          >
            <RefreshCw
              className={`w-3.5 h-3.5 text-[var(--text-muted)] ${isCasting ? 'animate-spin' : ''}`}
            />
            <span>{isCasting ? t.oracle.redrawingBtn : t.oracle.redrawBtn}</span>
          </button>
        </div>

        {/* 核心竹简签文区 */}
        <div
          className={`relative z-10 transition-all duration-500 ${
            isCasting ? 'opacity-30 scale-95 blur-[1px]' : 'opacity-100 scale-100'
          }`}
        >
          {/* 经典名言金句 */}
          <div className="p-5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] mb-5 relative shadow-xs backdrop-blur-sm">
            <Feather className="absolute top-3.5 right-3.5 w-4 h-4 text-[var(--text-muted)] opacity-40 pointer-events-none" />
            <blockquote className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-heading)] tracking-wide leading-relaxed mb-2">
              “{lot.motto}”
            </blockquote>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-[var(--text-muted)] font-serif">
              <span>{t.oracle.sourcePrefix} {lot.source}</span>
              <span className="text-[var(--text-body)] font-medium">
                {t.oracle.disciplinePrefix}{lot.direction}
              </span>
            </div>
          </div>

          {/* 宜忌研析 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-xs font-serif">
            <div className="p-3.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/20 dark:border-emerald-500/25 flex flex-col gap-1">
              <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 shrink-0" />
                {t.oracle.dosLabel}
              </span>
              <span className="text-[var(--text-body)] leading-relaxed font-sans text-[13px]">
                {lot.dos}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/20 dark:border-amber-500/25 flex flex-col gap-1">
              <span className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 shrink-0" />
                {t.oracle.dontsLabel}
              </span>
              <span className="text-[var(--text-body)] leading-relaxed font-sans text-[13px]">
                {lot.donts}
              </span>
            </div>
          </div>

          {/* 底部操作与书院印记 */}
          <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
            <button
              onClick={handleCopyMotto}
              className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-heading)] font-serif transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-sans">{t.oracle.savedBtn}</span>
                </>
              ) : (
                <>
                  <BookmarkCheck className="w-3.5 h-3.5 opacity-60" />
                  <span>{t.oracle.saveBtn}</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)] font-serif">
              <span className="italic">{t.oracle.footerQuote}</span>
              <ScholarSeal text={t.oracle.footerSealText} subtext={t.oracle.footerSealSubtext} size="sm" variant="outline" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
