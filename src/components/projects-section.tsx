import { ExternalLink, GitPullRequest } from 'lucide-react'
import { GithubIcon } from '@/components/icons/github-icon'
import { ScholarSeal } from '@/components/scholar-seal'
import { preloadMaintainerAssets } from '@/lib/preload'
import { useI18n } from '@/i18n'
import { useUIStore } from '@/store/use-ui-store'

interface ProjectsSectionProps {
  onOpenMaintainer?: () => void
}

export function ProjectsSection({ onOpenMaintainer }: ProjectsSectionProps) {
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
    <section id="projects" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 顶部标题栏 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <ScholarSeal text={t.projects.sealText} subtext={t.projects.sealSubtext} size="sm" variant="cinnabar" />
              <span className="font-serif text-xs tracking-widest text-[var(--text-muted)] uppercase">
                {t.projects.subtitle}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-heading)] tracking-tight mb-3">
              {t.projects.title}
            </h2>
            <p className="font-serif text-sm sm:text-base text-[var(--text-body)] leading-relaxed">
              {t.projects.desc}
            </p>
          </div>

          <a
            href="https://github.com/gewu-academy"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--card-elevated)] hover:bg-[var(--theme-hover-bg)] text-[var(--text-body)] border border-[var(--border)] font-serif text-xs sm:text-sm font-medium shadow-xs transition-all"
          >
            <GitPullRequest className="w-4 h-4 opacity-70" />
            <span>{t.projects.browseGithub}</span>
          </a>
        </div>

        {/* 项目卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {t.projects.projects.map((proj) => (
            <div
              key={proj.id}
              className="scholar-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                {/* 顶栏类别与状态 */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-serif px-2.5 py-0.5 rounded-md bg-[var(--theme-tab-bg)] text-[var(--text-body)] border border-[var(--border)]">
                    {proj.category}
                  </span>
                  <span className="text-[11px] font-serif text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20 dark:border-emerald-500/25">
                    ● {proj.status}
                  </span>
                </div>

                {/* 标题与副标 */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-heading)] mb-1.5">
                  {proj.title}
                </h3>
                <p className="font-serif text-xs sm:text-sm text-[var(--text-muted)] mb-4">
                  {proj.tagline}
                </p>

                {/* 描述文案 */}
                <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed mb-5 font-sans">
                  {proj.description}
                </p>

                {/* 核心亮点 */}
                <div className="space-y-1.5 mb-6">
                  {proj.highlights.slice(0, 2).map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[var(--text-body)] font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-seal)] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 底栏技术标签与仓库操作 */}
              <div className="pt-4 border-t border-[var(--border)] space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {proj.techs.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--theme-tab-bg)] text-[var(--text-muted)] border border-[var(--border)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1">
                  {proj.repoUrl ? (
                    <a
                      href={proj.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-heading)] transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>{t.projects.codeRepo || '代码仓库'}</span>
                    </a>
                  ) : (
                    <span className="text-xs font-serif text-[var(--text-muted)]">
                      书院孵化中
                    </span>
                  )}

                  <div className="flex items-center gap-3">
                    {proj.repoUrl && (
                      <a
                        href={proj.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-serif font-bold text-[var(--text-heading)] hover:text-[var(--accent-seal)] transition-colors"
                      >
                        <span>{t.projects.viewCode || '访问项目'}</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                    )}
                    <button
                      onClick={handleOpenMaintainer}
                      onMouseEnter={preloadMaintainerAssets}
                      onTouchStart={preloadMaintainerAssets}
                      className="inline-flex items-center gap-1 text-xs font-serif text-[var(--text-muted)] hover:text-[var(--text-heading)] transition-colors cursor-pointer"
                    >
                      <span>{t.projects.claimIssue}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
