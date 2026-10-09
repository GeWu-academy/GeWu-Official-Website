import { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight, MessageCircle, Feather } from 'lucide-react'
import { GithubIcon } from '@/components/icons/github-icon'
import { ScholarSeal } from '@/components/scholar-seal'
import { ThemeSwitcher } from '@/components/theme-switcher'
import logoImg from '@/assets/329871518.png'

interface NavbarProps {
  onOpenMaintainer: () => void
}

export function Navbar({ onOpenMaintainer }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: '书院宗要', href: '#philosophy' },
    { label: '乾坤研习', href: '#celestial-lab' },
    { label: '研习方向', href: '#tech-directions' },
    { label: '经世实作', href: '#projects' },
    { label: '格物问策', href: '#oracle-lot' },
    { label: '同窗答疑', href: '#faq' },
  ]

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-2.5 sm:py-3' : 'py-4 sm:py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className={`mx-auto flex items-center justify-between rounded-2xl px-4 py-2.5 sm:px-5 transition-all duration-300 ${
              scrolled
                ? 'bg-[var(--nav-bg-scrolled)] border border-[var(--border)] shadow-[0_8px_24px_rgba(0,0,0,0.06)] backdrop-blur-md'
                : 'bg-[var(--nav-bg)] border border-[var(--border)] shadow-[0_2px_12px_rgba(0,0,0,0.03)] backdrop-blur-sm'
            }`}
          >
            {/* Logo 区域 */}
            <a
              href="#"
              className="flex items-center gap-3 group select-none cursor-pointer"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-xl overflow-hidden p-0.5 border border-[var(--border)] bg-white shadow-sm group-hover:border-[var(--accent-seal)] transition-colors">
                <img
                  src={logoImg}
                  alt="格物书院 Logo"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-base sm:text-lg text-[var(--text-heading)] tracking-wide group-hover:text-[var(--accent-seal)] transition-colors">
                    格物书院
                  </span>
                  <ScholarSeal text="书院" subtext="" size="sm" variant="cinnabar" className="hidden sm:inline-flex" />
                </div>
                <span className="hidden md:inline-block text-[11px] text-[var(--text-muted)] font-serif tracking-wider">
                  穷理而格物 · 知行以致远
                </span>
              </div>
            </a>

            {/* 桌面端导航链接 */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="px-3 py-1.5 text-xs xl:text-sm font-serif text-[var(--text-body)] hover:text-[var(--text-heading)] rounded-lg hover:bg-[var(--theme-tab-bg)] transition-all cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* 右侧操作按钮 */}
            <div className="hidden sm:flex items-center gap-2 sm:gap-2.5">
              {/* 主题切换器 */}
              <ThemeSwitcher variant="segmented" />

              <a
                href="https://github.com/gewu-academy"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-serif text-[var(--text-body)] hover:text-[var(--text-heading)] rounded-xl bg-[var(--theme-tab-bg)] hover:bg-[var(--theme-hover-bg)] border border-[var(--border)] transition-all"
                title="访问 GitHub 组织"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>

              <button
                onClick={onOpenMaintainer}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-serif font-medium text-[var(--primary-foreground)] bg-[var(--primary)] hover:opacity-90 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
              >
                <Feather className="w-3.5 h-3.5 text-amber-300" />
                <span>拜谒山长</span>
              </button>
            </div>

            {/* 移动端汉堡切换与精简主题开关 */}
            <div className="flex sm:hidden items-center gap-2">
              <ThemeSwitcher variant="compact" />

              <button
                onClick={onOpenMaintainer}
                className="px-2.5 py-1 text-xs rounded-lg bg-[var(--accent-seal)] text-white font-serif font-medium shadow-sm cursor-pointer"
              >
                加入
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-[var(--text-body)] hover:text-[var(--text-heading)] rounded-xl bg-[var(--theme-tab-bg)] border border-[var(--border)] cursor-pointer"
                aria-label="切换菜单"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* 移动端全屏抽屉菜单 */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-x-4 top-20 rounded-2xl bg-[var(--dialog-bg)] p-6 border border-[var(--border)] shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <img src={logoImg} alt="Logo" className="w-7 h-7 rounded bg-white p-0.5 border border-[var(--border)]" />
                <span className="font-serif font-bold text-[var(--text-heading)] text-sm">格物书院</span>
              </div>
              <ScholarSeal text="穷理" subtext="致知" size="sm" variant="cinnabar" />
            </div>

            {/* 抽屉内主题切换器 */}
            <ThemeSwitcher variant="drawer" />

            <div className="flex flex-col gap-1 pt-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="flex items-center justify-between w-full p-2.5 text-left text-sm font-serif text-[var(--text-body)] hover:text-[var(--text-heading)] rounded-xl hover:bg-[var(--theme-tab-bg)] transition-colors cursor-pointer"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-[var(--border)] flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenMaintainer()
                }}
                className="w-full py-2.5 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-serif font-medium text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-amber-300" />
                <span>拜谒山长 / 申请加入</span>
              </button>

              <a
                href="https://github.com/gewu-academy"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-[var(--theme-tab-bg)] hover:bg-[var(--theme-hover-bg)] text-[var(--text-body)] font-serif text-sm flex items-center justify-center gap-2 border border-[var(--border)]"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub 组织主页</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
