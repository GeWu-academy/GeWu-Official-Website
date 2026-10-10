import { useState } from 'react'
import {
  GitPullRequest,
  MessageCircle,
  Copy,
  Check,
  Calendar,
  ArrowRight,
} from 'lucide-react'
import { GithubIcon } from '@/components/icons/github-icon'
import { ScholarSeal } from '@/components/scholar-seal'
import { preloadMaintainerAssets } from '@/lib/preload'
import { COMMUNITY_INFO } from '@/data/community-data'
import { useI18n } from '@/i18n'
import { useUIStore } from '@/store/use-ui-store'

interface CollaborationSectionProps {
  onOpenMaintainer?: () => void
}

export function CollaborationSection({ onOpenMaintainer }: CollaborationSectionProps) {
  const [copiedWechat, setCopiedWechat] = useState(false)
  const { t } = useI18n()
  const openMaintainerModal = useUIStore((s) => s.openMaintainerModal)

  const handleOpenMaintainer = () => {
    if (onOpenMaintainer) {
      onOpenMaintainer()
    } else {
      openMaintainerModal()
    }
  }

  const handleCopyWechat = () => {
    navigator.clipboard.writeText(COMMUNITY_INFO.maintainerContact.wechat)
    setCopiedWechat(true)
    setTimeout(() => setCopiedWechat(false), 2000)
  }

  return (
    <section id="collaboration" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 标头 */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <ScholarSeal text={t.collaboration.sealText} subtext={t.collaboration.sealSubtext} size="sm" variant="cinnabar" />
            <span className="font-serif text-xs tracking-widest text-[var(--text-muted)] uppercase">
              {t.collaboration.subtitle}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-heading)] tracking-tight mb-3">
            {t.collaboration.title}
          </h2>
          <p className="font-serif text-sm sm:text-base text-[var(--text-body)] leading-relaxed">
            {t.collaboration.desc}
          </p>
        </div>

        {/* 双翼核心协作卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* 左侧通道：GitHub 开源协作 */}
          <div className="scholar-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="p-3 rounded-xl bg-[var(--theme-tab-bg)] text-[var(--text-heading)] border border-[var(--border)]">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <span className="text-xs font-serif px-2.5 py-1 rounded bg-[var(--theme-tab-bg)] text-[var(--text-muted)] border border-[var(--border)]">
                  {t.collaboration.githubCard.tag}
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-heading)] mb-2">
                {t.collaboration.githubCard.title}
              </h3>
              <p className="font-serif text-xs sm:text-sm text-[var(--text-body)] leading-relaxed mb-6">
                {t.collaboration.githubCard.desc}
              </p>

              <div className="space-y-2 mb-6 text-xs sm:text-sm text-[var(--text-body)] font-serif">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] shrink-0" />
                  <span>{t.collaboration.githubCard.point1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] shrink-0" />
                  <span>{t.collaboration.githubCard.point2}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border)]">
              <a
                href="https://github.com/gewu-academy"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 font-serif text-xs sm:text-sm font-medium flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <GitPullRequest className="w-4 h-4 text-amber-300 dark:text-[var(--primary-foreground)] opacity-95" />
                <span>{t.collaboration.githubCard.btn}</span>
              </a>
            </div>
          </div>

          {/* 右侧通道：联系组织山长 Maintainer */}
          <div className="scholar-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="p-3 rounded-xl bg-[var(--accent-seal)]/10 text-[var(--accent-seal)] border border-[var(--accent-seal)]/20">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <ScholarSeal text={t.collaboration.maintainerCard.sealText} subtext={t.collaboration.maintainerCard.sealSubtext} size="sm" variant="cinnabar" />
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-heading)] mb-2">
                {t.collaboration.maintainerCard.title}
              </h3>
              <p className="font-serif text-xs sm:text-sm text-[var(--text-body)] leading-relaxed mb-6">
                {t.collaboration.maintainerCard.desc}
              </p>

              {/* 微信复制栏 */}
              <div className="p-3 rounded-xl bg-[var(--code-box-bg)] border border-[var(--border)] flex items-center justify-between gap-3 mb-6">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-serif text-[var(--text-muted)]">
                      {t.collaboration.maintainerCard.wechatLabel}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--theme-tab-bg)] text-[var(--text-muted)] font-serif border border-[var(--border)]">
                      {COMMUNITY_INFO.maintainerContact.region}
                    </span>
                  </div>
                  <span className="font-mono text-sm font-bold text-[var(--text-heading)]">
                    {COMMUNITY_INFO.maintainerContact.wechat}
                  </span>
                </div>
                <button
                  onClick={handleCopyWechat}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--card-elevated)] hover:bg-[var(--theme-hover-bg)] text-xs font-serif text-[var(--text-body)] border border-[var(--border)] shadow-xs transition-all cursor-pointer"
                >
                  {copiedWechat ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400">{t.collaboration.maintainerCard.copiedBtn}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 opacity-60" />
                      <span>{t.collaboration.maintainerCard.copyBtn}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border)]">
              <button
                onClick={handleOpenMaintainer}
                onMouseEnter={preloadMaintainerAssets}
                onTouchStart={preloadMaintainerAssets}
                className="w-full py-2.5 rounded-xl bg-[var(--card-elevated)] hover:bg-[var(--theme-hover-bg)] text-[var(--text-heading)] border border-[var(--border)] font-serif text-xs sm:text-sm font-medium flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <span>{t.collaboration.maintainerCard.viewQrBtn}</span>
                <ArrowRight className="w-4 h-4 opacity-60" />
              </button>
            </div>
          </div>
        </div>

        {/* 每周常例圆桌说明 */}
        <div className="rounded-2xl bg-[var(--theme-tab-bg)] border border-[var(--border)] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-[var(--text-body)] shrink-0" />
            <div>
              <span className="font-serif font-bold text-sm text-[var(--text-heading)] block">
                {t.collaboration.weeklySync.title}
              </span>
              <span className="text-xs text-[var(--text-muted)] font-serif">
                {t.collaboration.weeklySync.desc}
              </span>
            </div>
          </div>
          <span className="text-xs font-serif text-[var(--text-body)] px-3 py-1.5 rounded-lg bg-[var(--card-elevated)] border border-[var(--border)] shrink-0">
            {t.collaboration.weeklySync.tag}
          </span>
        </div>
      </div>
    </section>
  )
}
