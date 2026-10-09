import { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight, Sparkles, MessageCircle, Github } from 'lucide-react'
import { MagneticButton } from '@/components/magnetic-button'
import logoImg from '@/assets/329871518.png'

interface NavbarProps {
  onOpenMaintainer: () => void
}

export function Navbar({ onOpenMaintainer }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: '初心理念', href: '#philosophy' },
    { label: '实践方向', href: '#tech-directions' },
    { label: '液态实验室', href: '#liquid-lab' },
    { label: '实战矩阵', href: '#projects' },
    { label: '协作与加入', href: '#collaboration' },
    { label: '常见疑问', href: '#faq' },
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
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className={`mx-auto flex items-center justify-between rounded-2xl px-4 py-2.5 sm:px-6 transition-all duration-300 ${
              scrolled
                ? 'liquid-glass-prominent bg-black/40 border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.6)] backdrop-blur-2xl'
                : 'liquid-glass bg-white/[0.03] border-white/10 backdrop-blur-xl'
            }`}
          >
            {/* Logo 区域 */}
            <a
              href="#"
              className="flex items-center gap-3 group select-none"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              <div className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-xl overflow-hidden p-0.5 border border-white/20 bg-white shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:border-cyan-400/60 transition-colors">
                <img
                  src={logoImg}
                  alt="格物书院 Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-semibold tracking-wider text-base sm:text-lg text-white group-hover:text-cyan-300 transition-colors">
                    格物书院
                  </span>
                  <span className="hidden sm:inline-block text-[10px] uppercase font-mono tracking-widest text-cyan-400/90 bg-cyan-950/60 border border-cyan-800/60 px-1.5 py-0.5 rounded">
                    ACADEMY
                  </span>
                </div>
                <span className="hidden md:inline-block text-[11px] text-zinc-400 font-light tracking-wide">
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
                  className="px-3 py-1.5 text-xs xl:text-sm font-medium text-zinc-300 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* 右侧操作按钮 */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="https://github.com/gewu-academy"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all"
                title="前往 GitHub 组织"
              >
                <Github className="w-3.5 h-3.5 text-zinc-300" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-400 opacity-60" />
              </a>

              <MagneticButton
                size="sm"
                variant="primary"
                onClick={onOpenMaintainer}
                className="gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>加入书院</span>
              </MagneticButton>
            </div>

            {/* 移动端汉堡切换 */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={onOpenMaintainer}
                className="px-2.5 py-1 text-xs rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-medium"
              >
                加入
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-zinc-300 hover:text-white rounded-xl bg-white/[0.05] border border-white/10"
                aria-label="切换菜单"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* 移动端液态玻璃全屏抽屉菜单 */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-x-4 top-20 rounded-2xl liquid-glass-prominent bg-[#0b0e14]/95 p-6 border border-white/20 shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <img src={logoImg} alt="Logo" className="w-7 h-7 rounded bg-white p-0.5" />
                <span className="font-medium text-white text-sm">格物书院 · 探索社区</span>
              </div>
              <span className="text-[11px] text-cyan-400 font-mono">穷理致知</span>
            </div>

            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="flex items-center justify-between w-full p-2.5 text-left text-sm font-medium text-zinc-200 hover:text-white rounded-xl hover:bg-white/[0.08] transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenMaintainer()
                }}
                className="w-full py-3 rounded-xl bg-cyan-500 text-zinc-950 font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30"
              >
                <MessageCircle className="w-4 h-4" />
                <span>联系 Maintainer / 申请加入</span>
              </button>

              <a
                href="https://github.com/gewu-academy"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-200 font-medium text-sm flex items-center justify-center gap-2 border border-white/10"
              >
                <Github className="w-4 h-4" />
                <span>GitHub 组织主页</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
