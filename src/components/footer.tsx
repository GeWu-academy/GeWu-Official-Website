import { ArrowUp, Heart } from 'lucide-react'
import { GithubIcon } from '@/components/icons/github-icon'
import { ScholarSeal } from '@/components/scholar-seal'
import logoImg from '@/assets/329871518.png'
import { useI18n } from '@/i18n'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  const { t } = useI18n()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-[var(--border)] pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-[var(--footer-bg)]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[var(--border)]">
          {/* 左侧：Logo 与使命 */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl overflow-hidden p-0.5 border border-[var(--border)] bg-[var(--card-elevated)] shadow-2xs">
                <img
                  src={logoImg}
                  alt={t.nav.title}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-[var(--text-heading)] text-lg tracking-wide">
                  {t.nav.title}
                </span>
                <ScholarSeal text={t.footer.sealText} subtext={t.footer.sealSubtext} size="sm" variant="cinnabar" />
              </div>
            </div>

            <p className="font-serif text-lg text-[var(--text-heading)] tracking-wider">
              {t.footer.motto}
            </p>

            <p className="text-xs sm:text-sm text-[var(--text-muted)] font-serif max-w-md leading-relaxed">
              {t.footer.desc}
            </p>
          </div>

          {/* 中间：研习方向 */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="font-serif text-xs font-bold text-[var(--text-heading)] tracking-wider">
              {t.footer.colTechTitle}
            </h4>
            <ul className="space-y-1.5 text-xs font-serif text-[var(--text-body)]">
              {t.techDirections.directions.map((dir) => (
                <li key={dir.id}>
                  <a href="#tech-directions" className="hover:text-[var(--text-heading)] transition-colors">
                    {dir.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 右侧：社区与开源 */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="font-serif text-xs font-bold text-[var(--text-heading)] tracking-wider">
              {t.footer.colCommunityTitle}
            </h4>
            <ul className="space-y-1.5 text-xs font-serif text-[var(--text-body)]">
              <li>
                <a
                  href="https://github.com/gewu-academy"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-[var(--text-heading)] transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>{t.footer.linkGithub}</span>
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[var(--text-heading)] transition-colors">
                  {t.footer.linkProjects}
                </a>
              </li>
              <li>
                <a href="#oracle-lot" className="hover:text-[var(--text-heading)] transition-colors">
                  {t.footer.linkOracle}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[var(--text-heading)] transition-colors">
                  {t.footer.linkFaq}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 底栏版权与返回顶部 */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-serif text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span>© {CURRENT_YEAR} {t.footer.copyright}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              {t.footer.builtWith} <Heart className="w-3 h-3 text-[var(--accent-seal)] fill-[var(--accent-seal)]" />
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--card-elevated)] hover:bg-[var(--theme-hover-bg)] text-[var(--text-body)] hover:text-[var(--text-heading)] border border-[var(--border)] transition-colors cursor-pointer shadow-xs"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
