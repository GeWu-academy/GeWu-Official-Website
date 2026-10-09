import { useState } from 'react'
import { Menu, X, ArrowUpRight, MessageCircle, Feather } from 'lucide-react'
import { GithubIcon } from '@/components/icons/github-icon'
import { ScholarSeal } from '@/components/scholar-seal'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { useI18n } from '@/i18n'
import logoImg from '@/assets/329871518.png'

interface NavbarProps {
  onOpenMaintainer: () => void
}

export function Navbar({ onOpenMaintainer }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useI18n()

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-40 py-2 sm:py-3">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
          <nav className="mx-auto flex items-center justify-between rounded-xl px-3 py-1.5 sm:px-4 sm:py-1.5 bg-white/80 border border-stone-200/80 shadow-[0_2px_8px_rgba(28,25,23,0.03)] backdrop-blur-sm transition-all">
            {/* Logo 区域 */}
            <a
              href="#"
              className="flex items-center gap-2 group select-none cursor-pointer"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              <div className="relative h-7 w-7 sm:h-8 sm:w-8 rounded-lg overflow-hidden p-0.5 border border-stone-200 bg-white shadow-xs group-hover:border-stone-400 transition-colors">
                <img
                  src={logoImg}
                  alt={`${t.nav.title} Logo`}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-sm sm:text-base text-stone-900 tracking-wide group-hover:text-red-900 transition-colors">
                  {t.nav.title}
                </span>
                <ScholarSeal text={t.nav.sealText} subtext={t.nav.sealSubtext} size="sm" variant="cinnabar" className="hidden sm:inline-flex scale-90 origin-left" />
              </div>
            </a>

            {/* 桌面端导航链接 */}
            <div className="hidden lg:flex items-center gap-1">
              {t.nav.links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="px-2.5 py-1 text-xs font-serif text-stone-600 hover:text-stone-950 rounded-md hover:bg-stone-100/70 transition-all cursor-pointer whitespace-nowrap"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-2">
              {/* 主题切换器（白色、米白、暗色） */}
              <ThemeSwitcher variant="segmented" />

              <a
                href="https://github.com/gewu-academy"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-serif text-stone-700 hover:text-stone-900 rounded-lg bg-stone-100/70 hover:bg-stone-200/60 border border-stone-200 transition-all"
                title={t.nav.githubOrg}
              >
                <GithubIcon className="w-3 h-3 text-stone-700" />
                <span>{t.nav.github}</span>
                <ArrowUpRight className="w-2.5 h-2.5 text-stone-400" />
              </a>

              <button
                onClick={onOpenMaintainer}
                className="flex items-center gap-1 px-3 py-1 text-xs font-serif font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg shadow-xs hover:shadow transition-all cursor-pointer"
              >
                <Feather className="w-3 h-3 text-amber-200" />
                <span>{t.nav.maintainer}</span>
              </button>
            </div>

            {/* 移动端汉堡切换与主题切换 */}
            <div className="flex sm:hidden items-center gap-1.5">
              <ThemeSwitcher variant="compact" />

              <button
                onClick={onOpenMaintainer}
                className="px-2 py-0.5 text-[11px] rounded-md bg-[var(--accent-seal)] text-white font-serif font-medium shadow-xs"
              >
                {t.nav.join}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1 text-[var(--text-body)] hover:text-[var(--text-heading)] rounded-lg bg-[var(--theme-tab-bg)] border border-[var(--border)]"
                aria-label="切换菜单"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* 移动端抽屉菜单 */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-x-4 top-20 rounded-2xl bg-[var(--dialog-bg)] p-6 border border-[var(--border)] shadow-xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <img src={logoImg} alt="Logo" className="w-7 h-7 rounded bg-white p-0.5 border border-[var(--border)]" />
                <span className="font-serif font-bold text-[var(--text-heading)] text-sm">{t.nav.title}</span>
              </div>
              <ScholarSeal text={t.nav.sealText} subtext="致知" size="sm" variant="cinnabar" />
            </div>

            {/* 抽屉内主题切换器 */}
            <ThemeSwitcher variant="drawer" />

            <div className="flex flex-col gap-1 pt-1 border-t border-stone-200">
              {t.nav.links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="flex items-center justify-between w-full p-2.5 text-left text-sm font-serif text-stone-700 hover:text-stone-950 rounded-xl hover:bg-stone-50 transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-200 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenMaintainer()
                }}
                className="w-full py-2.5 rounded-xl bg-stone-900 text-stone-50 font-serif font-medium text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-amber-200" />
                <span>{t.nav.apply}</span>
              </button>

              <a
                href="https://github.com/gewu-academy"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200/80 text-stone-700 font-serif text-sm flex items-center justify-center gap-2 border border-stone-200"
              >
                <GithubIcon className="w-4 h-4" />
                <span>{t.nav.githubOrg}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
