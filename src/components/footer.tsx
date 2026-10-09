import { ArrowUp, Heart } from 'lucide-react'
import { GithubIcon } from '@/components/icons/github-icon'
import logoImg from '@/assets/329871518.png'
import { COMMUNITY_INFO } from '@/data/community-data'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/10 pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#05070a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* 左侧：Logo 与使命 */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl overflow-hidden p-0.5 border border-white/20 bg-white shadow-md">
                <img
                  src={logoImg}
                  alt="格物书院"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <span className="font-bold text-white text-lg tracking-wide">
                  格物书院
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 block">
                  GEWU ACADEMY
                </span>
              </div>
            </div>

            <p className="text-xl font-serif text-zinc-200 tracking-wide pt-1">
              {COMMUNITY_INFO.motto}
            </p>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed">
              面向开发者与设计师的实践社区。同行互帮互助，打磨硬核实战能力，消除求职与技术信息差，助力成员更好就业。
            </p>
          </div>

          {/* 中间：实践方向链接 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-300">
              实践方向
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
              <li>
                <a href="#tech-directions" className="hover:text-cyan-300 transition-colors">
                  AI & Agent 开发
                </a>
              </li>
              <li>
                <a href="#tech-directions" className="hover:text-cyan-300 transition-colors">
                  TypeScript 全栈
                </a>
              </li>
              <li>
                <a href="#tech-directions" className="hover:text-cyan-300 transition-colors">
                  多语言全栈与系统工程
                </a>
              </li>
              <li>
                <a href="#tech-directions" className="hover:text-cyan-300 transition-colors">
                  UI/UX 设计与体验架构
                </a>
              </li>
            </ul>
          </div>

          {/* 右侧：快速导航与开源 */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-300">
              社区与协作
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
              <li>
                <a
                  href="https://github.com/gewu-academy"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub 组织主页</span>
                </a>
              </li>
              <li>
                <a href="#collaboration" className="hover:text-cyan-300 transition-colors">
                  提交 Issue 与 Pull Request
                </a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-cyan-300 transition-colors">
                  初心理念与四维矩阵
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-300 transition-colors">
                  加入常见疑问解答
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 底栏版权与返回顶部 */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-300">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} 格物书院 (Gewu Academy). All rights reserved.</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              以开源精神共筑 <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
          >
            <span>返回顶部</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
